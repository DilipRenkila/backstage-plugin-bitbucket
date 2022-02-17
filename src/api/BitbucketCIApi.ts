import { createApiRef } from '@backstage/core-plugin-api';
import {
	ContributorData,
	MergeRequest,
	PipelineObject,
} from '../components/types';

export interface PipelineSummary {
	getPipelinesData: PipelineObject[];
}

export interface ContributorsSummary {
	getContributorsData: ContributorData[];
}

export interface MergeRequestsSummary {
	getMergeRequestsData: MergeRequest[];
}

export interface MergeRequestsStatusSummary {
	getMergeRequestsStatusData: MergeRequest[];
}

export interface LanguagesSummary {
	getLanguagesData: any;
}

export const BitbucketCIApiRef = createApiRef<BitbucketCIApi>({
	id: 'plugin.bitbucketci.service',
});

export type BitbucketCIApi = {
	getPipelineSummary(projectID: string): Promise<PipelineSummary | undefined>;
	getContributorsSummary(
		projectID: string,
	): Promise<ContributorsSummary | undefined>;
	getMergeRequestsSummary(
		projectID: string,
	): Promise<MergeRequestsSummary | undefined>;
	getMergeRequestsStatusSummary(
		projectID: string,
		count: number,
	): Promise<MergeRequestsStatusSummary | undefined>;
	getProjectName(projectID: string): Promise<string | undefined>;
	getLanguagesSummary(projectID: string): Promise<LanguagesSummary | undefined>;
	retryPipelineBuild(
		projectID: string,
		pipelineID: string,
	): Promise<Object | undefined>;
	getProjectDetails(projectSlug: string): Promise<Object | undefined>;
};
