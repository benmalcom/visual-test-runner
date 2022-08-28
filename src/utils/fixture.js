import { runDummyTest } from './testRunner';

export const tests = [
  { description: 'commas are rotated properly', run: runDummyTest },
  { description: 'exclamation points stand up straight', run: runDummyTest },
  { description: "run-on sentences don't run forever", run: runDummyTest },
  { description: 'question marks curl down, not up', run: runDummyTest },
  { description: 'semicolons are adequately waterproof', run: runDummyTest },
  { description: 'capital letters can do yoga', run: runDummyTest },
];

export const TEST_STATUS = {
  running: 'Running',
  failed: 'Failed',
  passed: 'Passed',
  notStarted: 'Not Started Yet',
};
