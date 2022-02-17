# Backstage Bitbucket Plugin

[![Version](https://img.shields.io/npm/v/@loblaw/backstage-plugin-bitbucket.svg)](https://www.npmjs.com/package/@loblaw/backstage-plugin-bitbucket)
![Contributions welcome](https://img.shields.io/badge/contributions-welcome-orange.svg)
[![Downloads](https://img.shields.io/npm/dm/@loblaw/backstage-plugin-bitbucket.svg)](https://www.npmjs.com/package/@loblaw/backstage-plugin-bitbucket)
[![License](https://img.shields.io/badge/license-Apache_License_2.0-blue.svg)](https://opensource.org/licenses/Apache_License_2.0)
![Stars Badge](https://img.shields.io/github/stars/loblaw-sre/backstage-plugin-bitbucket)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/loblaw-sre/backstage-plugin-bitbucket)

![Build Status](https://github.com/loblaw-sre/backstage-plugin-bitbucket/workflows/Node.js%20Package/badge.svg)
![](https://img.shields.io/github/commit-activity/m/loblaw-sre/backstage-plugin-bitbucket)
![](https://img.shields.io/github/contributors/loblaw-sre/backstage-plugin-bitbucket)
![](https://img.shields.io/github/last-commit/loblaw-sre/backstage-plugin-bitbucket)

![Language](https://img.shields.io/github/languages/top/loblaw-sre/backstage-plugin-bitbucket?color=green&logo=typescript&logoColor=blue)
![](https://img.shields.io/github/issues/loblaw-sre/backstage-plugin-bitbucket)
![](https://img.shields.io/github/issues-closed/loblaw-sre/backstage-plugin-bitbucket)
[![Repo Size](https://img.shields.io/github/repo-size/loblaw-sre/backstage-plugin-bitbucket)](https://github.com/loblaw-sre/backstage-plugin-bitbucket)
[![](https://img.shields.io/github/languages/code-size/loblaw-sre/backstage-plugin-bitbucket)](https://github.com/loblaw-sre/backstage-plugin-bitbucket)
[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Floblaw-sre%2Fbackstage-plugin-bitbucket&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=Visitors&edge_flat=false)](https://hits.seeyoufarm.com)


Website: [https://bitbucket.com/](https://bitbucket.com/)

<img src="https://raw.githubusercontent.com/loblaw-sre/backstage-plugin-bitbucket/main/src/assets/Backstage_Bitbucket_Pipeline_Information.png"  alt="Contributors Languages Pipeline Status"/>
<img src="https://raw.githubusercontent.com/loblaw-sre/backstage-plugin-bitbucket/main/src/assets/Backstage_Bitbucket_Merge_Request_information.png"  alt="Merge Request Information"/>

## Setup

1. If you have a standalone app (you didn't clone this repo), then do

```bash
# From your Backstage root directory
cd packages/app
yarn add @loblaw/backstage-plugin-bitbucket
```


2. Add a new Bitbucket tab to the entity page.

```tsx
// packages/app/src/components/catalog/EntityPage.tsx

import { isBitbucketAvailable, EntityBitbucketContent } from '@loblaw/backstage-plugin-bitbucket';

// Farther down at the serviceEntityPage declaration
const serviceEntityPage = (
  <EntityLayout>
    {/* Place the following section where you want the tab to appear */}
    <EntityLayout.Route if={isBitbucketAvailable} path="/bitbucket" title="Bitbucket">
       <EntityBitbucketContent />
    </EntityLayout.Route>
  </EntityLayout>
);
```
3. Add the Bitbucket cards to the Overview tab on the entity page(Optional).

```tsx
// packages/app/src/components/catalog/EntityPage.tsx

import { 
  isBitbucketAvailable, 
  EntityBitbucketContent, 
  EntityBitbucketLanguageCard, 
  EntityBitbucketContributorsCard, 
  EntityBitbucketMergeRequestsTable, 
  EntityBitbucketMergeRequestStatsCard, 
  EntityBitbucketPipelinesTable 
} from '@loblaw/backstage-plugin-bitbucket';

//Farther down at the overviewContent declaration
//You can add only selected widgets or all of them.
const overviewContent = (
  <Grid container spacing={3} alignItems="stretch">
    <EntitySwitch>
      <EntitySwitch.Case if={isBitbucketAvailable}>
        <Grid item md={6}>
          <EntityBitbucketContributorsCard />
          <EntityBitbucketLanguageCard />
          <EntityBitbucketMergeRequestStatsCard />
          <EntityBitbucketPipelinesTable />
          <EntityBitbucketMergeRequestsTable />
        </Grid> 
      </EntitySwitch.Case>
    </EntitySwitch>
  </Grid>
);
```

4. Add integration:
In `app-config.yaml` add the integration for bitbucket:
```
integrations:
  bitbucket:
    - host: bitbucket.com
      token: ${GITLAB_TOKEN}
```

5. Add proxy config:

```
  '/bitbucketci':
    target: '${GITLAB_URL}/api/v4'
    allowedMethods: ['GET']
    headers:
      PRIVATE-TOKEN: '${GITLAB_TOKEN}'
```

* Default GitLab URL: `https://bitbucket.com`
* GitLab Token should be with of scope `read_api` and can be generated from this [URL](https://bitbucket.com/-/profile/personal_access_tokens)

5. Add a `bitbucket.com/project-id` annotation to your respective `catalog-info.yaml` files, on the [format](https://backstage.io/docs/architecture-decisions/adrs-adr002#format)

```yaml
# Example catalog-info.yaml entity definition file
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  # ...
  annotations:
      bitbucket.com/project-id: 'project-id' #1234. This must be in quotes and can be found under Settings --> General
      or
      bitbucket.com/project-slug: 'project-slug' # group_name/project_name
spec:
  type: service
  # ...
```

**Note:** `spec.type` can take values in ['website','library','service'] but to render GitLab Entity, Catalog must be of type `service`

## Features

- List top 20 builds for a project
- List top 20 Merge Requests for a project
- View Contributors for a project
- View Languages used for a project
- View Pipeline status for a project
- Works for both project and personal tokens
- Pagination for builds
- Pagination for Merge Requests
- Merge Requests Statistics
