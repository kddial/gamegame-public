// duplicate file should be the SAME content in client and server

// message types
const SOCKET_CONSTANTS = {
  MSG_SELF: 'MSG_SELF',
  MSG_BROADCAST: 'MSG_BROADCAST',
  MSG_PLAYER: 'MSG_PLAYER',
  MSG_SET_NAME: 'MSG_SET_NAME',
  MSG_PLAYER_NAME: 'MSG_PLAYER_NAME',
  MSG_CHAT_MESSAGE: 'MSG_CHAT_MESSAGE',
  MSG_TYPE_DELIM: '::',
  MSG_DATA_DELIM: '__',
};

export default SOCKET_CONSTANTS;
