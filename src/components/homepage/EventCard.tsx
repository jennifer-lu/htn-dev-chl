import React, { useState } from 'react';
import {
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Link,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';

import { TEvent, TSpeaker } from '../../api/queries/EventQueries';

export type EventCardProps = {
  event: TEvent;
  events: TEvent[];
  isAuthenticated: boolean;
  isMobile: boolean;
};

const EventCard = ({
  event,
  events,
  isAuthenticated,
  isMobile,
}: EventCardProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

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
      height={isMobile ? (isExpanded ? '' : '200px') : '500px'}
      margin={isMobile ? '10px' : '30px'}
      overflow={isMobile ? 'hidden' : 'auto'}
      padding="30px"
      width="500px"
    >
      <Flex>
        <Heading as="h2" color="blue.100" marginBottom="5px" size="lg">
          {event.name}
        </Heading>
        <Spacer />
        {isMobile && (
          <IconButton
            aria-label="Expand"
            background="transparent"
            icon={<Icon as={isExpanded ? MdExpandLess : MdExpandMore} />}
            onClick={() => setIsExpanded(!isExpanded)}
          />
        )}
      </Flex>
      <Text as="i" color="blue.100">
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
                      alt={speaker.name}
                      borderRadius="full"
                      boxSize="50px"
                      marginBottom="5px"
                      objectFit="cover"
                      src={speaker.profile_pic}
                    />
                  ) : (
                    <Flex
                      align="flex-end"
                      backgroundColor="blue.100"
                      borderRadius="full"
                      color="blue.200"
                      height="50px"
                      justify="center"
                      width="50px"
                    >
                      <Icon as={FaUser} boxSize="40px" />
                    </Flex>
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
              if (
                event.related_events.includes(relatedEvent.id) &&
                (isAuthenticated || relatedEvent.public_url)
              ) {
                return (
                  <Link
                    color="blue.50"
                    href={
                      isAuthenticated
                        ? relatedEvent.private_url
                        : relatedEvent.public_url
                    }
                    isExternal
                    key={`${event.id}-${relatedEvent.id}`}
                  >
                    {relatedEvent.name}
                  </Link>
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
