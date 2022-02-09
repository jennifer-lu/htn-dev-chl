import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

import { TEvent, TSpeaker } from '../../api/queries/EventQueries';

export type EventCardProps = {
  event: TEvent;
  events: TEvent[];
};

const EventCard = ({ event, events }: EventCardProps) => {
  return (
    <Flex direction="column">
      <Text>{event.name}</Text>
      <Text>{event.event_type}</Text>
      {event.permission && <Text>{event.permission}</Text>}
      <Text>{event.start_time}</Text>
      <Text>{event.end_time}</Text>
      {event.description && <Text>{event.description}</Text>}
      {event.speakers.map((speaker: TSpeaker) => {
        return (
          <Flex key={`${event.id}-${speaker.name}`}>
            <Text>{speaker.name}</Text>
            {speaker.profile_pic && <Text>{speaker.profile_pic}</Text>}
          </Flex>
        );
      })}
      {event.public_url && <Text>{event.public_url}</Text>}
      <Text>{event.private_url}</Text>
      <Text>Related</Text>
      {events.map((relatedEvent: TEvent) => {
        if (event.related_events.includes(relatedEvent.id)) {
          return (
            <Flex key={`${event.id}-${relatedEvent.id}`}>
              <Text>{relatedEvent.name}</Text>
              {relatedEvent.public_url && (
                <Text>{relatedEvent.public_url}</Text>
              )}
              <Text>{relatedEvent.private_url}</Text>
            </Flex>
          );
        }
        return null;
      })}
    </Flex>
  );
};

export default EventCard;
