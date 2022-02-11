import React from 'react';
import { Flex, Heading, Icon, Image, Link, Text } from '@chakra-ui/react';
import { HiOutlineUserCircle } from 'react-icons/hi';

import { TEvent, TSpeaker } from '../../api/queries/EventQueries';

export type EventCardProps = {
  event: TEvent;
  events: TEvent[];
  isAuthenticated: boolean;
};

const EventCard = ({ event, events, isAuthenticated }: EventCardProps) => {
  const snakeToSentenceCase = (snakeCaseString: string) => {
    const sentenceCaseString = snakeCaseString.replaceAll('_', ' ');
    return (
      sentenceCaseString.charAt(0).toUpperCase() + sentenceCaseString.slice(1)
    );
  };

  const unixToStringTime = (unixTime: number) => {
    const stringTime = new Date(unixTime * 1000);
    return stringTime.toLocaleTimeString('en-us', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <Flex
      backgroundColor="blue.200"
      borderRadius="10px"
      direction="column"
      grow="1"
      height="400px"
      margin="30px"
      overflow="auto"
      padding="30px"
      width="400px"
    >
      <Heading as="h2" color="yellow.100" marginBottom="5px" size="lg">
        {event.name}
      </Heading>
      <Text as="i" color="yellow.100">
        {`${snakeToSentenceCase(event.event_type)} from ${unixToStringTime(
          event.start_time,
        )} to ${unixToStringTime(event.end_time)}`}
      </Text>
      {(isAuthenticated || event.public_url) && (
        <Link
          color="blue.50"
          href={isAuthenticated ? event.private_url : event.public_url}
          isExternal
          margin="10px 0px"
        >
          View Event
        </Link>
      )}
      {event.description && <Text>{event.description}</Text>}
      {event.speakers.length > 0 && (
        <Flex direction="column">
          <Heading as="h3" margin="20px 0px 10px 0px" size="md">
            Speakers
          </Heading>
          <Flex>
            {event.speakers.map((speaker: TSpeaker) => {
              return (
                <Flex
                  align="center"
                  direction="column"
                  key={`${event.id}-${speaker.name}`}
                  marginRight="10px"
                >
                  {speaker.profile_pic ? (
                    <Image
                      borderRadius="full"
                      boxSize="50px"
                      marginBottom="5px"
                      objectFit="cover"
                      src={speaker.profile_pic}
                    />
                  ) : (
                    <Icon
                      as={HiOutlineUserCircle}
                      boxSize="50px"
                      color="blue.100"
                    />
                  )}
                  <Text>{speaker.name}</Text>
                </Flex>
              );
            })}
          </Flex>
        </Flex>
      )}

      {event.related_events.length > 0 && (
        <Flex direction="column">
          <Heading as="h3" margin="20px 0px 10px 0px" size="md">
            Related Events
          </Heading>
          <Flex direction="column">
            {events.map((relatedEvent: TEvent) => {
              if (event.related_events.includes(relatedEvent.id)) {
                return isAuthenticated || relatedEvent.public_url ? (
                  <Link
                    color="blue.50"
                    href={
                      isAuthenticated
                        ? relatedEvent.private_url
                        : relatedEvent.public_url
                    }
                    isExternal
                  >
                    {relatedEvent.name}
                  </Link>
                ) : (
                  <Text>{relatedEvent.name}</Text>
                );
              }
              return null;
            })}
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default EventCard;
