import React, { useContext, useState } from 'react';
import {
  Flex,
  Heading,
  Icon,
  IconButton,
  Link,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';

import { TEvent } from '../../api/queries/EventQueries';

import SpeakerList from './SpeakerList';
import RelatedEventList from './RelatedEventList';

import AuthContext from '../../contexts/AuthContext';
import DeviceContext from '../../contexts/DeviceContext';

export type EventCardProps = {
  event: TEvent;
  events: TEvent[];
};

const EventCard = ({ event, events }: EventCardProps) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { isMobile } = useContext(DeviceContext);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Convert string from snake case to sentence case
  const snakeToSentenceCase = (snakeCaseString: string) => {
    const sentenceCaseString = snakeCaseString.replaceAll('_', ' ');
    return (
      sentenceCaseString.charAt(0).toUpperCase() + sentenceCaseString.slice(1)
    );
  };

  // Convert number from unix time to string time
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

  return isAuthenticated || event.permission === 'public' ? (
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
      <SpeakerList eventId={event.id} speakers={event.speakers} />
      <RelatedEventList
        eventId={event.id}
        events={events}
        relatedEvents={event.related_events}
      />
    </Flex>
  ) : null;
};

export default EventCard;
