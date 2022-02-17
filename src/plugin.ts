import { createPlugin, 
  createRoutableExtension,
  createComponentExtension,
 } from '@backstage/core-plugin-api';

import {
  configApiRef,
  createApiFactory,
  createRouteRef,
  discoveryApiRef,
} from '@backstage/core-plugin-api';
import { BitbucketCIApiRef, BitbucketCIClient } from './api';

export const rootRouteRef = createRouteRef({
  id: 'Bitbucket',
});

export const bitbucketPlugin = createPlugin({
  id: 'Bitbucket',
  apis: [
    createApiFactory({
      api: BitbucketCIApiRef,
      deps: { configApi: configApiRef, discoveryApi: discoveryApiRef },
      factory: ({ configApi, discoveryApi }) =>
        new BitbucketCIClient({
          discoveryApi,
          baseUrl: configApi.getOptionalString('bitbucket.baseUrl'),
        }),
    }),
  ],
});

export const EntityBitbucketContent = bitbucketPlugin.provide(
  createRoutableExtension({
    component: () =>
    import('./Router').then(m => m.Router),
    mountPoint: rootRouteRef,
  }),
);

export const EntityBitbucketLanguageCard = bitbucketPlugin.provide(
  createComponentExtension({
    name: 'EntityBitbucketLanguageCard',
    component: {
      lazy: () =>
        import('./components/widgets/index').then((m) => m.LanguagesCard),
    },
  })
);

export const EntityBitbucketContributorsCard = bitbucketPlugin.provide(
  createComponentExtension({
    name: 'EntityBitbucketContributorsCard',
    component: {
      lazy: () =>
        import('./components/widgets/index').then((m) => m.ContributorsCard),
    },
  })
);

export const EntityBitbucketMergeRequestsTable = bitbucketPlugin.provide(
  createComponentExtension({
    name: 'EntityBitbucketMergeRequestsTable',
    component: {
      lazy: () =>
        import('./components/widgets/index').then((m) => m.MergeRequestsTable),
    },
  })
);

export const EntityBitbucketMergeRequestStatsCard = bitbucketPlugin.provide(
  createComponentExtension({
    name: 'EntityBitbucketMergeRequestStatsCard',
    component: {
      lazy: () =>
        import('./components/widgets/index').then((m) => m.MergeRequestStats),
    },
  })
);

export const EntityBitbucketPipelinesTable = bitbucketPlugin.provide(
  createComponentExtension({
    name: 'EntityBitbucketPipelinesTable',
    component: {
      lazy: () =>
        import('./components/widgets/index').then((m) => m.PipelinesTable),
    },
  })
);