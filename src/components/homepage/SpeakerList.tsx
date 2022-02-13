import React from 'react';
import { Flex, Heading, Icon, Image, Text } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';

import { TSpeaker } from '../../api/queries/EventQueries';

export type SpeakerListProps = {
  eventId: number;
  speakers: TSpeaker[];
};

const SpeakerList = ({ eventId, speakers }: SpeakerListProps) => {
  return speakers.length > 0 ? (
    <Flex direction="column">
      <Heading as="h3" margin="20px 0px 10px 0px" size="md">
        Speakers
      </Heading>
      <Flex>
        {speakers.map((speaker: TSpeaker) => {
          return (
            <Flex
              align="center"
              direction="column"
              key={`${eventId}-${speaker.name}`}
              marginRight="20px"
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
                  <Icon aria-label={speaker.name} as={FaUser} boxSize="40px" />
                </Flex>
              )}
              <Text>{speaker.name}</Text>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  ) : null;
};

export default SpeakerList;
