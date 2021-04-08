import { loadRemoteEntry } from 'ng-module-federation';

import { microFrontends } from './micro-frontends';

Promise.all(microFrontends.map((m) => loadRemoteEntry(m.remoteEntry, m.remoteName)))
  .catch((err) => console.error('Error loading remote entries', err))
  .then(() => import('./bootstrap'))
  .catch((err) => console.error(err));
