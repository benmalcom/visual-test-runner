import { Button, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import RunnerItem from 'components/TestRunner/RunnerItem';
import { TEST_STATUS, tests } from 'utils/fixture';
import { runDummyTest } from 'utils/testRunner';

const Runner = () => {
  const [testStatus, setTestStatus] = useState(() => {
    const current = {};
    tests.forEach(test => {
      current[test.description] = TEST_STATUS.notStarted;
    });
    return current;
  });
  const resetTestStatus = () =>
    setTestStatus(obj => {
      const current = { ...obj };
      tests.forEach(test => {
        current[test.description] = TEST_STATUS.notStarted;
      });
      return current;
    });

  useEffect(() => {
    return () => {
      resetTestStatus();
    };
  }, []);

  const handleTestsStart = () => {
    setTestStatus(obj => {
      const current = { ...obj };
      tests.forEach(test => {
        current[test.description] = TEST_STATUS.running;
      });
      return current;
    });
  };

  const handleRunner = id => {
    runDummyTest(passed =>
      setTestStatus(obj => ({
        ...obj,
        [id]: passed ? TEST_STATUS.passed : TEST_STATUS.failed,
      }))
    );
  };

  const runningCount = Object.values(testStatus).filter(
    item => item === TEST_STATUS.running
  ).length;

  const failedCount = Object.values(testStatus).filter(
    item => item === TEST_STATUS.failed
  ).length;

  const passedCount = Object.values(testStatus).filter(
    item => item === TEST_STATUS.passed
  ).length;

  const isFinished = Object.values(testStatus).every(
    item => item === TEST_STATUS.passed || item === TEST_STATUS.failed
  );

  const getSortedTests = items => {
    const groupedTests = Object.keys(testStatus).reduce((acc, key) => {
      const testItem = items.find(item => item.description === key);
      const status = testStatus[key];
      const testItemWithStatus = {
        ...testItem,
        status: testStatus[testItem.description],
      };
      acc[status] = acc[status]
        ? [...acc[status], testItemWithStatus]
        : [testItemWithStatus];
      return acc;
    }, {});

    const result = [];
    if (groupedTests[TEST_STATUS.running])
      result.push(...groupedTests[TEST_STATUS.running]);
    if (groupedTests[TEST_STATUS.passed])
      result.push(...groupedTests[TEST_STATUS.passed]);
    if (groupedTests[TEST_STATUS.failed])
      result.push(...groupedTests[TEST_STATUS.failed]);
    if (groupedTests[TEST_STATUS.notStarted])
      result.push(...groupedTests[TEST_STATUS.notStarted]);
    return result;
  };

  const sortedTests = getSortedTests(tests);

  return (
    <Flex direction="column" p={5} w="500px">
      <Flex justify="space-between" align="center">
        <Button onClick={handleTestsStart} w="fit-content">
          Start Tests
        </Button>
        <Text>Running: {runningCount}</Text>
        <Text>Passed: {passedCount}</Text>
        <Text>Failed: {failedCount}</Text>

        {isFinished && <Text color="green">Finished</Text>}
      </Flex>

      <Flex direction="column" my={4}>
        {sortedTests.map(({ description, status }) => (
          <RunnerItem
            key={description}
            description={description}
            status={status}
            runner={() => handleRunner(description)}
          />
        ))}
      </Flex>
    </Flex>
  );
};
export default Runner;
