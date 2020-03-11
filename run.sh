#!/usr/bin/env sh

# abort on errors
set -e

# spinning up docker
pm2 start npm --name "ulclient" -- start

cd -