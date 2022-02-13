import React, { useContext, useState } from 'react';
import { Flex, Heading, Image, useDisclosure } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import Fuse from 'fuse.js';

import { GET_EVENTS, TEvent } from '../../api/queries/EventQueries';

import EventCard from '../homepage/EventCard';
import Footer from '../homepage/Footer';
import SpacerCard from '../homepage/SpacerCard';
import WelcomeModal from '../homepage/WelcomeModal';
import NavigationBar from '../navigation/NavigationBar';

import DeviceContext from '../../contexts/DeviceContext';

const HomePage = () => {
  const { isMobile } = useContext(DeviceContext);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const [events, setEvents] = useState<TEvent[]>([]);
  const [results, setResults] = useState<TEvent[]>([]);

  // Set results to all events if input is empty,
  // and relevant events otherwise
  const handleSearch = (searchInput: string) => {
    if (searchInput === '') {
      setResults(events);
    } else {
      const options = {
        keys: [
          {
            name: 'name',
            weight: 1,
          },
          {
            name: 'event_type',
            weight: 0.5,
          },
          {
            name: 'start_time',
            weight: 0.2,
          },
          {
            name: 'end_time',
            weight: 0.2,
          },
          {
            name: 'description',
            weight: 0.5,
          },
          {
            name: 'speakers',
            weight: 0.5,
          },
        ],
      };
      const fuse = new Fuse(events, options);
      const searchResults = fuse
        .search(searchInput)
        .map((searchResult) => searchResult.item);
      setResults(searchResults);
    }
  };

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

  // Get events from api endpoint
  useQuery(GET_EVENTS(), {
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      const { sampleEvents } = data;
      const eventsData = [...sampleEvents];
      eventsData.sort(sortEvents);
      setEvents(eventsData);
      setResults(eventsData);
    },
  });

  return (
    <Flex backgroundColor="blue.300" direction="column">
      <WelcomeModal openLogin={onOpen} />
      <NavigationBar
        handleSearch={handleSearch}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      />
      <Flex align="center" direction="column" zIndex="2">
        {isMobile ? (
          <Heading as="h2" margin="80px 0px 180px 0px" size="3xl">
            Events
          </Heading>
        ) : (
          <Heading as="h1" margin="120px 0px 320px 0px" size="4xl">
            Events
          </Heading>
        )}
        {results.length > 0 ? (
          <Flex
            justify="center"
            padding={isMobile ? '10px 10px 30px 10px' : '30px 30px 10px 30px'}
            width="100%"
            wrap="wrap"
          >
            {results.map((event: TEvent) => (
              <EventCard event={event} events={events} key={event.id} />
            ))}
            {[...Array(10)].map((element, i) => (
              <SpacerCard key={i} />
            ))}
          </Flex>
        ) : (
          <Heading
            as="h3"
            marginBottom="50px"
            minHeight={isMobile ? 'calc(100vh - 460px)' : 'calc(100vh - 670px)'}
            size="md"
          >
            No matching events.
          </Heading>
        )}
        <Footer />
      </Flex>
      <Image
        alt="Earth from space"
        height={isMobile ? '230px' : '500px'}
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
