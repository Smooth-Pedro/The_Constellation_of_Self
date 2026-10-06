#!/bin/bash
# Temporary preview server for browser verification — kill via port 3000 when done.
exec >> /c/Users/pudlo/preview-tarot.log 2>&1
set -x
export PATH="/c/Users/pudlo/AppData/Roaming/kimi-desktop/daimon-share/daimon/command-process-owner/bin:$PATH"
cd "C:/Users/pudlo/OneDrive/Documents/Kimi/Workspaces/Site de Tarot Birth Card and Numerology/app" || exit 1
node node_modules/vite/bin/vite.js preview --port 3000 --strictPort
