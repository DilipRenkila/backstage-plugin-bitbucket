// @ts-ignore TS1259: Module can only be default-imported using the 'esModuleInterop' flag
import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { bitbucketPlugin, EntityBitbucketContent } from '../src/plugin';

createDevApp()
  .registerPlugin(bitbucketPlugin)
  .addPage({
    element: <EntityBitbucketContent />,
    title: 'Root Page',
    path: '/backstage-plugin-bitbucket'
  })
  .render();
