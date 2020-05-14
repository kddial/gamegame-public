const SESSION_PLAYER_NAME_KEY = 'SESSION_PLAYER_NAME_KEY';

export function saveNameIntoSessionStorage(name: string) {
  sessionStorage.setItem(SESSION_PLAYER_NAME_KEY, name);
}

export function getNameFromSessionStorage() {
  return sessionStorage.getItem(SESSION_PLAYER_NAME_KEY);
}
