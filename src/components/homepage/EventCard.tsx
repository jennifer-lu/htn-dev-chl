import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

import { TEvent } from '../../api/queries/EventQueries';

export type EventCardProps = {
  event: TEvent;
};

const EventCard = ({ event }: EventCardProps) => {
  return (
    <Flex direction="column">
      <Text>{event.name}</Text>
      <Text>{event.event_type}</Text>
      {event.permission && <Text>{event.permission}</Text>}
      <Text>{event.start_time}</Text>
      <Text>{event.end_time}</Text>
      {event.description && <Text>{event.description}</Text>}
      <Text>Speakers</Text>
      {event.public_url && <Text>{event.public_url}</Text>}
      <Text>{event.private_url}</Text>
      <Text>Related</Text>
    </Flex>
  );
};

export default EventCard;
