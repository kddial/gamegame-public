import {
  MSG_SELF,
  MSG_PLAYER,
  MSG_BROADCAST,
  MSG_TYPE_DELIM,
} from './socket-constants';

export const formatPlayerInfo = (
  x: number,
  y: number,
  pose: string,
  horizontalScale: number,
  id: number,
) => {
  return `${MSG_PLAYER}${MSG_TYPE_DELIM}${x}__${y}__${pose}__${horizontalScale}__${id}${MSG_TYPE_DELIM}`;
};

export const formatSelfInfo = (id: number) => {
  return `${MSG_SELF}${MSG_TYPE_DELIM}${id}`;
};

export const formatBroadcastMessage = (broadcastMessage: string) => {
  return `${MSG_BROADCAST}${MSG_TYPE_DELIM}${broadcastMessage}`;
};
