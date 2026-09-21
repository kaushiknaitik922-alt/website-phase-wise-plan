import * as migration_20260901_023726_initial from './20260901_023726_initial';
import * as migration_20260921_024338_add_pages from './20260921_024338_add_pages';

export const migrations = [
  {
    up: migration_20260901_023726_initial.up,
    down: migration_20260901_023726_initial.down,
    name: '20260901_023726_initial',
  },
  {
    up: migration_20260921_024338_add_pages.up,
    down: migration_20260921_024338_add_pages.down,
    name: '20260921_024338_add_pages'
  },
];
