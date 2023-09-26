# Metadata PeerTube plugin

This plugin for the PeerTube platform enables the addition of EBU metadata. The metadata should be able to be added during the video upload and then be displayed below the video.

### EBU Metadata list added

1. title
2. alternativeTitle
3. dateModified
4. note

### How to use

- Login as admin in your PeerTube instance
- Go to Plugin/Themes in the Administration section
- Search plugins for 'ebu'
- Click on Install

### For Dev

- follow local env tutorial: https://github.com/Chocobozzz/PeerTube/blob/develop/.github/CONTRIBUTING.md#prerequisites

- Doc: https://docs.joinpeertube.org/contribute/plugins

- Build the CLI:
  npm run setup:cli

- command for starting the dev Instanz
  NODE_ENV=dev npm start

- Then, you can install or reinstall your local plugin/theme by running:
  peertube-cli plugins install --path /Users/monz/Git/FS1/peertube-plugin-metadata
  or
  node ./dist/server/tools/peertube.js plugins install --path /Users/monz/Git/FS1/peertube-plugin-metadata

-  export NODE_OPTIONS=--openssl-legacy-provider