# Metadata PeerTube plugin

This plugin for the PeerTube platform enables the addition of EBU metadata. The metadata should be able to be added during the video upload and then be displayed below the video.

### EBU Metadata list added

various fields from the ebu metadata set.

### How to use

- Login as admin in your PeerTube instance
- Go to Plugin/Themes in the Administration section
- Search plugins for 'metadata'
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


- compatibel with the ffprobe plugin:

TODO: 


- Licence vorlage Category: https://gitlab.mim-libre.fr/extensions-peertube/categories-management-plugin/
- Required: + Error Message:

- Wenn die Formeinstellungen verändert werden muss die Seite neu geladen werden 
- Es werden bestimmte von Standard Peertube in die Metadata gesynct. Dazu gehören:

| Peertube Standard data   |:fast_forward:| Plugin metadata mappingname |
|:-------------            |:---------------:| -------------:|
| videoEditData.name       | :fast_forward:   | title.title        |
| videoEditData.description| :fast_forward:   | description .text      |
| videoEditData.tags       | :fast_forward:   | description.tags         |
| videoEditData.language   | :fast_forward:   | videoInformation.language    |
| videoEditData.category   | :fast_forward:   | videoInformation.category        |
| videoEditData.licence    | :fast_forward:   | rights.copyright.rightId       |

- wenn gesynced wird dann sollte es nicht dargestellt werden. weil es sonst zu verwirrungen führen kann.

EBU Defaults Object....
{
    "name": 'mappingname',
    "type": 'typename',
    "value": '',
    "changedBy": '',
    "lastModified": '',
}


Formfield Object...
{
  [
    "name": 'mappingname',
    "label": 'labelname',
    "required": true,
    "visibleBackend": true,
    "visibleFrontend": true+//vlt groupierung
  ],
  [
    "name": 'mappingname',
    "label": 'labelname',
    "required": true,
    "visibleBackend": true,
    "visibleFrontend": true
  ],
}