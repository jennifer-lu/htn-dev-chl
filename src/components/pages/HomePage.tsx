import React, { useContext, useState } from 'react';
import { Flex, Heading, Image, useDisclosure } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';

import { GET_EVENTS, TEvent } from '../../api/queries/EventQueries';

import EventCard from '../homepage/EventCard';
import Footer from '../homepage/Footer';
import NavigationBar from '../homepage/NavigationBar';
import SpacerCard from '../homepage/SpacerCard';
import WelcomeModal from '../homepage/WelcomeModal';

import AuthContext from '../../contexts/AuthContext';

const HomePage = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const testEvent1: TEvent = {
    id: 1,
    name: 'Hootsuite API Workshop',
    event_type: 'workshop',
    permission: 'public',
    start_time: 1610449200000,
    end_time: 1610451000000,
    description:
      "A Raspberry Pi 4 will be awarded to each member of the winning team who makes the best use of the Hootsuite API to improve how we communicate in today's connected world.",
    speakers: [],
    public_url: 'https://youtu.be/lJ4uGA176HY',
    private_url: 'https://hopin.com/events/hack-the-north-2020',
    related_events: [],
  };

  const testEvent2: TEvent = {
    id: 2,
    name: 'Hootsuite API Workshop',
    event_type: 'workshop',
    permission: 'public',
    start_time: 1610449200000,
    end_time: 1610451000000,
    description:
      "A Raspberry Pi 4 will be awarded to each member of the winning team who makes the best use of the Hootsuite API to improve how we communicate in today's connected world.",
    speakers: [],
    public_url: 'https://youtu.be/lJ4uGA176HY',
    private_url: 'https://hopin.com/events/hack-the-north-2020',
    related_events: [],
  };

  const testEvent3: TEvent = {
    id: 3,
    name: 'Hootsuite API Workshop',
    event_type: 'workshop',
    permission: 'public',
    start_time: 1610449200000,
    end_time: 1610451000000,
    description:
      "A Raspberry Pi 4 will be awarded to each member of the winning team who makes the best use of the Hootsuite API to improve how we communicate in today's connected world.",
    speakers: [],
    public_url: 'https://youtu.be/lJ4uGA176HY',
    private_url: 'https://hopin.com/events/hack-the-north-2020',
    related_events: [],
  };

  const testEvent4: TEvent = {
    id: 4,
    name: 'Hootsuite API Workshop',
    event_type: 'workshop',
    permission: 'public',
    start_time: 1610449200000,
    end_time: 1610451000000,
    description:
      "A Raspberry Pi 4 will be awarded to each member of the winning team who makes the best use of the Hootsuite API to improve how we communicate in today's connected world.",
    speakers: [],
    public_url: 'https://youtu.be/lJ4uGA176HY',
    private_url: 'https://hopin.com/events/hack-the-north-2020',
    related_events: [],
  };

  const [events, setEvents] = useState<TEvent[]>([
    testEvent1,
    testEvent2,
    testEvent3,
    testEvent4,
  ]);

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

  // console.log(events);

  // bgGradient="linear(to-b, blue.300, #002338, #004159, #00616d, #00816f, #00a060, #70bc44, #cad022)"

  // localStorage.setItem('hasVisited', 'false');

  return (
    <Flex backgroundColor="blue.300" direction="column">
      <WelcomeModal openLogin={onOpen} />
      <NavigationBar isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Flex align="center" direction="column" zIndex="2">
        <Heading
          as="h1"
          margin="130px 0px 300px 0px"
          size="4xl"
          textTransform="uppercase"
        >
          Events
        </Heading>
        <Flex padding="30px 30px 10px 30px" width="100%" wrap="wrap">
          {events.map((event: TEvent) => {
            if (isAuthenticated || event.permission === 'public') {
              return (
                <EventCard
                  event={event}
                  events={events}
                  key={event.id}
                  isAuthenticated={isAuthenticated}
                />
              );
            }
            return undefined;
          })}
          {[...Array(10)].map((element, i) => (
            <SpacerCard key={i} />
          ))}
        </Flex>
        <Footer />
      </Flex>
      <Image
        height="500px"
        objectFit="cover"
        objectPosition="bottom"
        position="absolute"
        src="images/earth-background.png"
        width="100%"
      />
    </Flex>
  );
};

export default HomePage;
