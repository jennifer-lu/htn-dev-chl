import React, { useContext } from 'react';
import { Flex, Heading, Link } from '@chakra-ui/react';

import { TEvent } from '../../api/queries/EventQueries';

import AuthContext from '../../contexts/AuthContext';
import ColorModeContext from '../../contexts/ColorModeContext';

export type RelatedEventListProps = {
  eventId: number;
  events: TEvent[];
  relatedEvents: number[];
};

const RelatedEventList = ({
  eventId,
  events,
  relatedEvents,
}: RelatedEventListProps) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { isDark } = useContext(ColorModeContext);

  return relatedEvents.length > 0 ? (
    <Flex direction="column">
      <Heading as="h3" margin="20px 0px 10px 0px" size="md">
        Related Events
      </Heading>
      <Flex direction="column">
        {events.map((event: TEvent) => {
          if (
            relatedEvents.includes(event.id) &&
            (isAuthenticated || event.public_url)
          ) {
            return (
              <Link
                color={isDark ? 'blue.50' : 'purple.200'}
                href={isAuthenticated ? event.private_url : event.public_url}
                isExternal
                key={`${eventId}-${event.id}`}
              >
                {event.name}
              </Link>
            );
          }
          return null;
        })}
      </Flex>
    </Flex>
  ) : null;
};

export default RelatedEventList;
