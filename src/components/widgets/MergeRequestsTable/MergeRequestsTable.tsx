import React from 'react';
import { Table, TableColumn, Progress } from '@backstage/core-components';
import Alert from '@material-ui/lab/Alert';
import { useAsync } from 'react-use';
import { bitbucketAppData, bitbucketAppSlug } from '../../bitbucketAppData';
import { BitbucketCIApiRef } from '../../../api';
import { useApi } from '@backstage/core-plugin-api';
import { MergeRequest } from '../../types';
import { getElapsedTime, getDuration } from '../../utils';
import { createTitleColumn } from './columns';

export const DenseTable = ({ mergeRequests }: any) => {
	const columns: TableColumn[] = [
		{ title: 'ID', field: 'id' },
		createTitleColumn(),
		{ title: 'Creator', field: 'author' },
		{ title: 'State', field: 'state' },
		{ title: 'Created At', field: 'created_date' },
		{ title: 'Duration', field: 'duration' },
	];
	const title = 'Bitbucket Merge Request Status: ' + mergeRequests?.project_name;
	const data = mergeRequests?.data?.map((mergeRequest: MergeRequest) => {
		return {
			id: mergeRequest.id,
			state: mergeRequest.state,
			author: mergeRequest.author.username,
			title: mergeRequest.title,
			web_url: mergeRequest.web_url,
			created_date: getElapsedTime(mergeRequest.created_at),
			duration: getDuration(mergeRequest.created_at, mergeRequest.updated_at),
		};
	});

	return (
		<Table
			title={title}
			options={{ search: true, paging: true }}
			columns={columns}
			data={data}
		/>
	);
};

export const MergeRequestsTable = ({}) => {
	const { project_id } = bitbucketAppData();
	const { project_slug } = bitbucketAppSlug();

	const BitbucketCIAPI = useApi(BitbucketCIApiRef);

	const { value, loading, error } = useAsync(async (): Promise<
		MergeRequest[]
	> => {
		let projectDetails: any = await BitbucketCIAPI.getProjectDetails(project_slug);
		let projectId = project_id ? project_id : projectDetails?.id;
		const bitbucketObj = await BitbucketCIAPI.getMergeRequestsSummary(projectId);
		const data = bitbucketObj?.getMergeRequestsData;
		let renderData: any = { data };
		renderData.project_name = await BitbucketCIAPI.getProjectName(projectId);
		return renderData;
	}, []);

	if (loading) {
		return <Progress />;
	} else if (error) {
		return <Alert severity='error'>{error.message}</Alert>;
	}

	return <DenseTable mergeRequests={value || []} />;
};
