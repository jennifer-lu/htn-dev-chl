import React, { useContext, useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';

import AuthContext from '../../contexts/AuthContext';

import EventCard from '../homepage/EventCard';
import NavBar from '../homepage/NavBar';

import { GET_EVENTS, TEvent } from '../../api/queries/EventQueries';

const HomePage = () => {
  const [events, setEvents] = useState<TEvent[]>([]);

  const { isAuthenticated } = useContext(AuthContext);

  // Sort events by start_time, and then by end_time
  const sortEvents = (a: TEvent, b: TEvent) => {
    if (a.start_time < b.start_time) {
      return -1;
    }
    if (a.start_time > b.start_time) {
      return 1;
    }
    if (a.end_time < b.end_time) {
      return -1;
    }
    return 1;
  };

  useQuery(GET_EVENTS(), {
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      const { sampleEvents } = data;
      const eventsData = [...sampleEvents];
      eventsData.sort(sortEvents);
      setEvents(eventsData);
    },
  });

  return (
    <Flex direction="column">
      <NavBar />
      <Text>Events</Text>
      {events.map((event: TEvent) => {
        if (isAuthenticated || event.permission === 'public') {
          return <EventCard key={event.id} event={event} events={events} />;
        }
        return null;
      })}
    </Flex>
  );
};

export default HomePage;
