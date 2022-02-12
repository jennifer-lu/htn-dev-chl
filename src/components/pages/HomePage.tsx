import React, { useContext, useState } from 'react';
import { Flex, Heading, Image, useDisclosure } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import Fuse from 'fuse.js';

import { GET_EVENTS, TEvent } from '../../api/queries/EventQueries';

import EventCard from '../homepage/EventCard';
import Footer from '../homepage/Footer';
import NavigationBar from '../homepage/NavigationBar';
import SpacerCard from '../homepage/SpacerCard';
import WelcomeModal from '../homepage/WelcomeModal';

import AuthContext from '../../contexts/AuthContext';

export type HomePageProps = {
  isMobile: boolean;
};

const HomePage = ({ isMobile }: HomePageProps) => {
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

  const [results, setResults] = useState<TEvent[]>(events);

  const handleSearch = (searchInput: string) => {
    if (searchInput !== '') {
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
    } else {
      setResults(events);
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
  //
  useQuery(GET_EVENTS(), {
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      const { sampleEvents } = data;
      const eventsData = [...sampleEvents];
      eventsData.sort(sortEvents);
      setEvents(eventsData);
      setResults(eventsData);
      console.log('here');
    },
  });

  // console.log(events);

  // bgGradient="linear(to-b, blue.300, #002338, #004159, #00616d, #00816f, #00a060, #70bc44, #cad022)"

  // localStorage.setItem('hasVisited', 'false');
  //
  // background: linear-gradient(90deg, #000314, #2a1f39, #602f56, #9e3d62, #d6555c, #fd7d47, #ffb325, #ffee00);

  return (
    <Flex
      backgroundColor="blue.300"
      // backgroundImage="url(images/stars.gif)"
      // bgGradient="linear(to-b, #000314, #000314, #000314, #000314, #000314, #2a1f39, #602f56, #9e3d62, #d6555c, #fd7d47, #ffb325, #ffee00)"
      direction="column"
    >
      <WelcomeModal openLogin={onOpen} />
      <NavigationBar
        handleSearch={handleSearch}
        isMobile={isMobile}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
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
        <Flex
          padding={isMobile ? '10px 10px 30px 10px' : '30px 30px 10px 30px'}
          width="100%"
          wrap="wrap"
        >
          {results.map((event: TEvent) => {
            if (isAuthenticated || event.permission === 'public') {
              return (
                <EventCard
                  event={event}
                  events={events}
                  key={event.id}
                  isAuthenticated={isAuthenticated}
                  isMobile={isMobile}
                />
              );
            }
            return undefined;
          })}
          {[...Array(10)].map((element, i) => (
            <SpacerCard key={i} />
          ))}
        </Flex>
        <Footer isMobile={isMobile} />
      </Flex>
      {isMobile ? (
        <Image
          alt=""
          height="230px"
          objectFit="cover"
          objectPosition="bottom"
          position="absolute"
          src="images/earth-background.png"
          width="100%"
        />
      ) : (
        <Image
          alt=""
          height="500px"
          objectFit="cover"
          objectPosition="bottom"
          position="absolute"
          src="images/earth-background.png"
          width="100%"
        />
      )}
    </Flex>
  );
};

export default HomePage;
