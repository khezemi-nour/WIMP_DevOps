#!/bin/bash

find packages -name "node_modules" -type d -prune -exec rm -rf '{}' +
