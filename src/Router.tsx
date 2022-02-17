import { Entity } from '@backstage/catalog-model';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import { MissingAnnotationEmptyState } from '@backstage/core-components';
import { Button } from '@material-ui/core';
import { BitbucketCI } from './components/BitbucketCI';
import { useEntity } from '@backstage/plugin-catalog-react';

const BITBUCKET_ANNOTATION_PROJECT_ID = 'bitbucket.com/project-id';
export const BITBUCKET_ANNOTATION_PROJECT_SLUG = 'bitbucket.com/project-slug';

export const isBitbucketAvailable = (entity: Entity) =>
isBitbucketProjectIDAnnotationAvailable(entity) || isBitbucketSlugAnnotationAvailable(entity)


export const isBitbucketProjectIDAnnotationAvailable = (entity: Entity) =>
	Boolean(entity.metadata.annotations?.[BITBUCKET_ANNOTATION_PROJECT_ID]);

export const isBitbucketSlugAnnotationAvailable = (entity: Entity) =>
	Boolean(entity.metadata.annotations?.[BITBUCKET_ANNOTATION_PROJECT_SLUG]);

type Props = {
	/** @deprecated The entity is now grabbed from context instead */
	entity?: Entity;
};

export const Router = (_props: Props) => {
	const { entity } = useEntity();

	if (
		isBitbucketAvailable(entity)
	) {
		return (
			<Routes>
				<Route path="/" element={<BitbucketCI />} />
			</Routes>
		);
	}

	return (
		<>
			<MissingAnnotationEmptyState annotation={BITBUCKET_ANNOTATION_PROJECT_ID} />
			<MissingAnnotationEmptyState
				annotation={BITBUCKET_ANNOTATION_PROJECT_SLUG}
			/>
			<Button
				variant='contained'
				color='primary'
				href='https://github.com/loblaw-sre/backstage-plugin-bitbucket/blob/main/README.md'
			>
				Read Bitbucket Plugin Docs
			</Button>
		</>
	);
};
