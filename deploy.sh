#!/bin/bash
rsync -azP --exclude .git --exclude deploy.sh --exclude node_modules/ --exclude *.DS_Store ./ root@$1:/root/buildBadges/
