import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';

import EventCard from '../homepage/EventCard';

import { GET_EVENTS } from '../../api/queries/EventQueries';

const HomePage = () => {
  useQuery(GET_EVENTS(), {
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      console.log(data);
    },
    onError: () => {
      console.log('error');
    },
  });

  return (
    <Flex direction="column">
      <Text>Hackathon Global Events</Text>
      <EventCard />
    </Flex>
  );
};

export default HomePage;
