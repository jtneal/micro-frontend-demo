import { MicroFrontend } from 'ng-module-federation';

export const microFrontends: MicroFrontend[] = [
  {
    remoteEntry: 'http://localhost:4210/remoteEntry.js',
    remoteName: 'mfe1',
    route: 'mfe1',
    ngModuleName: 'Mfe1Module',
  },
  {
    remoteEntry: 'http://localhost:4220/remoteEntry.js',
    remoteName: 'mfe2',
    route: 'mfe2',
    ngModuleName: 'Mfe2Module',
  },
  {
    remoteEntry: 'http://localhost:4230/remoteEntry.js',
    remoteName: 'mfe3',
    route: 'mfe3',
    ngModuleName: 'Mfe3Module',
  },
];
