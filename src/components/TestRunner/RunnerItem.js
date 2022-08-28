import { Flex, Text, usePrevious } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { TEST_STATUS } from 'utils/fixture';

const getBgColor = status => {
  switch (status) {
    case TEST_STATUS.failed:
      return 'red';
    case TEST_STATUS.passed:
      return 'green';
    case TEST_STATUS.running:
      return 'orange';
    default:
      return 'gray';
  }
};

const RunnerItem = ({ description, status, runner }) => {
  // status not started => running
  // trigger runDummyTests
  const prevStatus = usePrevious(status);
  useEffect(() => {
    if (
      prevStatus &&
      status &&
      prevStatus === TEST_STATUS.notStarted &&
      status === TEST_STATUS.running
    ) {
      runner(description);
    }
  }, [description, prevStatus, runner, status]);

  return (
    <Flex
      h="40px"
      bg={getBgColor(status)}
      align="center"
      w="full"
      mb={5}
      color="white"
      justify="space-between"
      px="3"
    >
      <Text>{description}</Text>
      <Text>{status}</Text>
    </Flex>
  );
};

RunnerItem.propTypes = {
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  runner: PropTypes.func.isRequired,
};

export default RunnerItem;
