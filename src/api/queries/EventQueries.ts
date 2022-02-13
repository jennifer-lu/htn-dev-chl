import { gql } from '@apollo/client';

export type TEvent = {
  id: number;
  name: string;
  event_type: TEventType;
  permission?: TPermission;

  start_time: number; // unix timestamp (ms)
  end_time: number; // unix timestamp (ms)

  description?: string; // a paragraph describing the event
  speakers: TSpeaker[]; // a list of speakers for the event

  public_url?: string; // a url to display for the general public
  private_url: string; // a url to display for hackers
  related_events: number[]; // a list ids corresponding to related events
};

export type TEventType = 'workshop' | 'activity' | 'tech_talk';

export type TPermission = 'public' | 'private';

export type TSpeaker = {
  name: string;
  profile_pic?: string; // a url to an image
};

// queries all sampleEvents on all fields
// returns TEvent[]
export const GET_EVENTS = () => gql`
  query GetEvents {
    sampleEvents {
      id
      name
      event_type
      permission
      start_time
      end_time
      description
      speakers {
        name
        profile_pic
      }
      public_url
      private_url
      related_events
    }
  }
`;
