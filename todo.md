todos:

- [ ] send bytes instead of strings, might be faster? but it takes some time to parse things, so maybe not, worth a try.
- [ ] the client needs to stop sending websocket messages when the server dies, loses connection after a few seconds
- [x] there is something wrong with PlayerSprites when rendering for other players, it needs to do a NEW IMAGE LOAD every time,
      move the image loading into its own class, so the sprites can reference the loaded blobs.
      ! It happens when client 1 and client 2 are both showing messages, and the client 2 player keeps flickering.
      Solved: it was because it was sendingMessages every game loop step, and whenever we get a broadcast that is not "player", we reset otherPlayers info to an empty array. We should only edit other players info when broadcast message is "player".
