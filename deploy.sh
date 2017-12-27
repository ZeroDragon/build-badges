#!/bin/bash
rsync -azP --exclude node_modules/ --exclude *.DS_Store ./ root@$1:/root/buildBadges/
