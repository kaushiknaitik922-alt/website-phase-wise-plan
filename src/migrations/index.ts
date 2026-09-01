import * as migration_20260901_023726_initial from './20260901_023726_initial';

export const migrations = [
  {
    up: migration_20260901_023726_initial.up,
    down: migration_20260901_023726_initial.down,
    name: '20260901_023726_initial'
  },
];
