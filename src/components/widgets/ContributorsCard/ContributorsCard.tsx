import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { InfoCard, Progress } from '@backstage/core-components';
import { BitbucketCIApiRef } from '../../../api';
import { useApi } from '@backstage/core-plugin-api';
import { useAsync } from 'react-use';
import { bitbucketAppData, bitbucketAppSlug } from '../../bitbucketAppData';
import { ContributorsList } from './components/ContributorsList';
import { ContributorData } from '../../types';

const useStyles = makeStyles((theme) => ({
	infoCard: {
		marginBottom: theme.spacing(3),
		'& + .MuiAlert-root': {
			marginTop: theme.spacing(3),
		},
	},
}));

export const ContributorsCard = ({}) => {
	const classes = useStyles();
	const BitbucketCIAPI = useApi(BitbucketCIApiRef);
	const { project_id } = bitbucketAppData();
	const { project_slug } = bitbucketAppSlug();
	/* TODO: to change the below logic to get contributors data*/
	const { value, loading, error } = useAsync(async (): Promise<
		ContributorData
	> => {
		let projectDetails: any = await BitbucketCIAPI.getProjectDetails(project_slug != '' ? project_slug : project_id);
		let projectId = project_id ? project_id : projectDetails?.id;
		const bitbucketObj = await BitbucketCIAPI.getContributorsSummary(projectId);
		const data = bitbucketObj?.getContributorsData;
		let renderData: any = { data };
		renderData.project_web_url = projectDetails?.web_url;
		renderData.project_default_branch = projectDetails?.default_branch;
		return renderData!;
	}, []);

	const project_web_url = value?.project_web_url; 
	const project_default_branch = value?.project_default_branch; 
	
	if (loading) {
		return <Progress />;
	} else if (error) {
		return (
			<Alert severity='error' className={classes.infoCard}>
				{error.message}
			</Alert>
		);
	}
	return (
		<InfoCard title='Contributors'
		deepLink={{
			link: `${project_web_url}/-/graphs/${project_default_branch}`,
			title: 'People',
			onClick: e => {
			  e.preventDefault();
			  window.open(`${project_web_url}/-/graphs/${project_default_branch}`);
			},
		  }} className={classes.infoCard}>
			<ContributorsList contributorsObj={value || { data: [] }} />
		</InfoCard>
	);
};