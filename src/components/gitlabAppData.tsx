/*
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 *
 * limitations under the License.
 */

import { useEntity } from '@backstage/plugin-catalog-react';
import { useApi } from '@backstage/core-plugin-api';
import { scmIntegrationsApiRef } from '@backstage/integration-react';
import {
  parseLocationReference,
  LOCATION_ANNOTATION,
  SOURCE_LOCATION_ANNOTATION,
} from '@backstage/catalog-model';

export const BITBUCKET_ANNOTATION_PROJECT_ID = 'bitbucket.com/project-id';
export const BITBUCKET_ANNOTATION_PROJECT_SLUG = 'bitbucket.com/project-slug';
const defaultBitbucketIntegration = {
	hostname: 'bitbucket.com',
	baseUrl: 'https://bitbucket.com/api/v4',
};

export const useEntityBitbucketScmIntegration = () => {
	const { entity } = useEntity();
	const integrations = useApi(scmIntegrationsApiRef);
	if (!entity) {
	  return defaultBitbucketIntegration;
	}

	let location = entity.metadata.annotations?.[SOURCE_LOCATION_ANNOTATION];

	if (!location) {
	  location = entity.metadata.annotations?.[LOCATION_ANNOTATION];
	}

	const { target } = parseLocationReference(location || '');

	const scm = integrations.bitbucket.byUrl(target);
	if (scm) {
	  return {
		hostname: scm.config.host,
		baseUrl: scm.config.apiBaseUrl,
	  };
	}
	return defaultBitbucketIntegration;
};

export const bitbucketAppData = () => {
	const { entity } = useEntity();

	const project_id =
		entity.metadata.annotations?.[BITBUCKET_ANNOTATION_PROJECT_ID] ?? '';

	return { project_id };
};

export const bitbucketAppSlug = () => {
	const { entity } = useEntity();

	const project_slug =
		entity.metadata.annotations?.[BITBUCKET_ANNOTATION_PROJECT_SLUG] ?? '';

	return { project_slug };
};
