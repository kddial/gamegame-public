#!/bin/bash

# Generate git logs for the past 5 commits
# and serve them inside the static folder
# so I can view which code is live.
# Viewed at gamegame.kevindial.com/gitlog

git log -5 > ./client/gitlog