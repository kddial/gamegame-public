import SOCKET_CONSTANTS from './socket-constants';
const {
  MSG_SELF,
  MSG_PLAYER,
  MSG_BROADCAST,
  MSG_TYPE_DELIM,
  MSG_PLAYER_NAME,
  MSG_CHAT_MESSAGE,
} = SOCKET_CONSTANTS;

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

export const formatPlayerName = (id: number, playerName: string) => {
  return `${MSG_PLAYER_NAME}${MSG_TYPE_DELIM}${id}__${playerName}${MSG_TYPE_DELIM}`;
};

export const formatBroadcastMessage = (broadcastMessage: string) => {
  return `${MSG_BROADCAST}${MSG_TYPE_DELIM}${broadcastMessage}`;
};

export const formatPlayerChatMessages = (
  id: number,
  messages: Array<string>,
) => {
  const concatMessages = messages.join('__');
  return `${MSG_CHAT_MESSAGE}${MSG_TYPE_DELIM}${id}__${concatMessages}${MSG_TYPE_DELIM}`;
};
