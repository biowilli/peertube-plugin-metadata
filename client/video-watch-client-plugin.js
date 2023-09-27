function register({ registerHook, peertubeHelpers }) {
  registerHook({
    target: "action:video-watch.player.loaded",
    handler: ({ videojs, video, playlist }) => {
      console.log("soll sotiert werden:");
      console.log(video.pluginData);
      var json = extractIds(video.pluginData);
      var sortedJson = sortedData(json);

      peertubeHelpers.getSettings().then((setting) => {
        if (setting["title-block-view-active"]) {
          //Title
          createHeaderField("Title", 2);
          if (setting["title-note-element-view-active"])
            createVideoInfo(
              "Titlenotiz",
              turnUndefinedIntoString(sortedJson["title.note"])
            );
          if (setting["title-element-view-active"])
            createVideoInfo(
              "Title",
              turnUndefinedIntoString(sortedJson["title.title"])
            );
          if (setting["title-element-note-view-active"])
            createVideoInfo(
              "TitleElementNote",
              turnUndefinedIntoString(sortedJson["title.titleNote"])
            );
          if (setting["descriptiveTitle-element-view-active"])
            createVideoInfo(
              "descriptiveTitle",
              turnUndefinedIntoString(sortedJson["title.descriptiveTitle"])
            );
          if (setting["descriptiveTitle-element-note-view-active"])
            createVideoInfo(
              "descriptiveTitleNote",
              turnUndefinedIntoString(sortedJson["title.descriptiveTitleNote"])
            );
          if (setting["discTitle-element-view-active"])
            createVideoInfo(
              "discTitle",
              turnUndefinedIntoString(sortedJson["title.discTitle"])
            );
          if (setting["discTitle-element-note-view-active"])
            createVideoInfo(
              "discTitleNote",
              turnUndefinedIntoString(sortedJson["title.discTitleNote"])
            );
          createLine();
        }

        if (setting["description-block-view-active"]) {
          //Description
          createHeaderField("Description", 2);
          if (setting["subject-element-view-active"])
            createVideoInfo(
              "Subject",
              turnUndefinedIntoString(sortedJson["description.subject"])
            );
          if (setting["text-element-view-active"])
            createVideoInfo(
              "Text",
              turnUndefinedIntoString(sortedJson["description.text"])
            );
          if (setting["tags-element-view-active"])
            createVideoInfo(
              "Tags",
              turnUndefinedIntoString(sortedJson["description.tags"])
            );
          createLine();
        }

        if (setting["creator-block-view-active"]) {
          //creator
          if (setting["creator-element-view-active"])
            createList("Creator", sortedJson["creator"]);
        }
        if (setting["contributor-block-view-active"]) {
          //contributor
          if (setting["contributor-element-view-active"])
            createList("Contributor", sortedJson["contributor"]);
        }
        if (setting["publisher-block-view-active"]) {
          //publisher
          if (setting["publisher-element-view-active"])
            createList("Publisher", sortedJson["organization"]);
        }
        if (setting["dates-block-view-active"]) {
          //Dates
          createHeaderField("Dates", 2);
          if (setting["dateDigitalised-element-view-active"])
            createVideoInfo(
              "Date Digitalisied",
              turnUndefinedIntoString(sortedJson["dates.dateDigitalised"])
            );
          if (setting["videLinks-element-view-active"])
            createVideoInfo(
              "Video Links",
              turnUndefinedIntoString(sortedJson["dates.videoLinks"])
            ); //TODO stimmt das
          createHeaderField("Issued", 3);
          if (setting["firstIssued-element-view-active"])
            createVideoInfo(
              "First Issued",
              turnUndefinedIntoString(sortedJson["dates.issued.firstIssued"])
            );
          if (setting["lastIssued-element-view-active"])
            createVideoInfo(
              "Last Issued",
              turnUndefinedIntoString(sortedJson["dates.issued.lastIssued"])
            );

          createHeaderField("Coverage", 3);
          if (setting["daterecorded-element-view-active"])
            createVideoInfo(
              "Date Recorded",
              turnUndefinedIntoString(sortedJson["dates.coverage.daterecorded"])
            );
          if (setting["recordingLocation0-element-view-active"])
            createVideoInfo(
              "Location",
              turnUndefinedIntoString(
                sortedJson["dates.coverage.locations"]
              )
            );

          createHeaderField("PublicationHistory", 3);
          if (setting["firstPublicationChannel-element-view-active"])
            createVideoInfo(
              "Date Recorded",
              turnUndefinedIntoString(
                sortedJson["dates.publicationHistory.firstPublicationChannel"]
              )
            );
          if (setting["firstPublicationTime-element-view-active"])
            createVideoInfo(
              "Time",
              turnUndefinedIntoString(
                sortedJson["dates.publicationHistory.firstPublicationTime"]
              )
            );
          if (setting["firstPublicationDate-element-view-active"])
            createVideoInfo(
              "Date",
              turnUndefinedIntoString(
                sortedJson["dates.publicationHistory.firstPublicationDate"]
              )
            );
          if (setting["repeatChannel-element-view-active"])
            createVideoInfo(
              "ReapeatChannel",
              turnUndefinedIntoString(
                sortedJson["dates.publicationHistory.repeatChannel"]
              )
            );

          createHeaderField("ArchiveData", 3);
          if (setting["archiveFilePath-element-view-active"])
            createVideoInfo(
              "File Path",
              turnUndefinedIntoString(
                sortedJson["dates.archiveData.archiveFilePath"]
              )
            );
          if (setting["filesize-element-view-active"])
            createVideoInfo(
              "Filesize",
              turnUndefinedIntoString(sortedJson["dates.archiveData.filesize"])
            );
          if (setting["filename-element-view-active"])
            createVideoInfo(
              "Filename",
              turnUndefinedIntoString(sortedJson["dates.archiveData.filename"])
            );
          if (setting["archiveLocation-element-view-active"])
            createVideoInfo(
              "ArchiveLocation",
              turnUndefinedIntoString(
                sortedJson["dates.archiveData.archiveLocation"]
              )
            );
          createLine();
        }

        if (setting["videoInformation-block-view-active"]) {
          createHeaderField("Video Information", 2);
          if (setting["category-element-view-active"])
            createVideoInfo(
              "Category",
              turnUndefinedIntoString(
                sortedJson["videoInformation.category"]
              )
            );
          if (setting["genre-element-view-active"])
            createVideoInfo(
              "Genre",
              turnUndefinedIntoString(sortedJson["videoInformation.genre"])
            );
          if (setting["language-element-view-active"])
            createVideoInfo(
              "Language",
              turnUndefinedIntoString(sortedJson["videoInformation.language"])
            );
          if (setting["parts-element-view-active"])
            createVideoInfo(
              "Parts",
              turnUndefinedIntoString(sortedJson["videoInformation.parts"])
            );
          if (setting["relation-element-view-active"])
            createVideoInfo(
              "Relation",
              turnUndefinedIntoString(sortedJson["videoInformation.relation"])
            );
          if (setting["serie-element-view-active"])
            createVideoInfo(
              "Show Type",
              turnUndefinedIntoString(
                sortedJson["videoInformation.showType.series"]
              )
            );
          if (setting["source-element-view-active"])
            createVideoInfo(
              "Source",
              turnUndefinedIntoString(sortedJson["videoInformation.source"])
            );
          if (setting["targetGroup-element-view-active"])
            createVideoInfo(
              "Target Group",
              turnUndefinedIntoString(
                sortedJson["videoInformation.targetgroup"]
              )
            );
          if (setting["version-element-view-active"])
            createVideoInfo(
              "Version",
              turnUndefinedIntoString(sortedJson["videoInformation.version"])
            );
          createLine();
        }

        if (setting["rating-block-view-active"]) {
          createHeaderField("Rating", 3);
          if (setting["notes-element-view-active"])
            createVideoInfo(
              "Notes",
              turnUndefinedIntoString(
                sortedJson["videoInformation.rating.notes"]
              )
            );
          if (setting["ratingScaleMinValue-element-view-active"])
            createVideoInfo(
              "ratingScaleMinValue",
              turnUndefinedIntoString(
                sortedJson["videoInformation.rating.ratingScaleMinValue"]
              )
            );
          if (setting["ratingScaleMaxValue-element-view-active"])
            createVideoInfo(
              "ratingScaleMaxValue",
              turnUndefinedIntoString(
                sortedJson["videoInformation.rating.ratingScaleMaxValue"]
              )
            );
          if (setting["ratingValue-element-view-active"])
            createVideoInfo(
              "ratingValue",
              turnUndefinedIntoString(
                sortedJson["videoInformation.rating.ratingValue"]
              )
            );
          createLine();
        }

        if (setting["rights-block-view-active"]) {
          createHeaderField("Rights", 2);
          createHeaderField("Cobyright", 3);
          if (setting["cobyrightRightId-element-view-active"])
            createVideoInfo(
              "rightId",
              turnUndefinedIntoString(sortedJson["rights.cobyright.rightId"])
            );
          if (setting["cobyrightRightClearanceFlag-element-view-active"])
            createVideoInfo(
              "rightClearanceFlag",
              turnUndefinedIntoString(
                sortedJson["rights.cobyright.rightClearanceFlag"]
              )
            );
          if (setting["cobyrightExplotationIssues-element-view-active"])
            createVideoInfo(
              "explotationIssues",
              turnUndefinedIntoString(
                sortedJson["rights.cobyright.explotationIssues"]
              )
            );
          if (setting["cobyrightDisclaimer-element-view-active"])
            createVideoInfo(
              "disclaimer",
              turnUndefinedIntoString(sortedJson["rights.cobyright.disclaimer"])
            );
          createHeaderField("coverage", 4);
          //createVideoInfo("coverage", turnUndefinedIntoString(sortedJson["rights.cobyright.coverage"]));
        }

        createHeaderField("usageRights", 3);
        if (setting["usageRightsRightId-element-view-active"])
          createVideoInfo(
            "rightId",
            turnUndefinedIntoString(sortedJson["rights.usageRights.rightId"])
          );
        if (setting["usageRightsRightClearanceFlag-element-view-active"])
          createVideoInfo(
            "rightClearanceFlag",
            turnUndefinedIntoString(
              sortedJson["rights.usageRights.rightClearanceFlag"]
            )
          );
        if (setting["usageRightsExplotationIssues-element-view-active"])
          createVideoInfo(
            "explotationIssues",
            turnUndefinedIntoString(
              sortedJson["rights.usageRights.explotationIssues"]
            )
          );
        if (setting["usageRightsDisclaimer-element-view-active"])
          createVideoInfo(
            "disclaimer",
            turnUndefinedIntoString(sortedJson["rights.usageRights.disclaimer"])
          );
        createHeaderField("coverage", 4);
        //createVideoInfo("coverage", turnUndefinedIntoString(sortedJson["rights.cobyright.coverage"]);
        createLine();
      });
    },
  });
}

function extractIds(flatJson) {
  // Extract keys starting with prefixes and store them in a separate JSON
  const contributorJson = extractKeysStartingWithPrefixesAndIsTrue(
    flatJson,
    "contributor"
  );
  const creatorJson = extractKeysStartingWithPrefixesAndIsTrue(
    flatJson,
    "creator"
  ); //TODO sollten creator sein
  const organizationJson = extractKeysStartingWithPrefixesAndIsTrue(
    flatJson,
    "organization"
  );
  flatJson.creator = extractValues(creatorJson);
  flatJson.contributor = extractValues(contributorJson);
  flatJson.organization = extractValues(organizationJson);

  return flatJson;
}

function sortedData(pluginData) {
  const order = [
    "title",
    "creator",
    "contributor",
    "organization",
    "description",
    "dates",
    "videoInformation",
    "rights",
    "metadataProvider",
    "technicalData",
  ];
  let sortedJson = {};
  order.forEach((key) => {
    Object.keys(pluginData).forEach((dataKey) => {
      if (dataKey.toLowerCase().startsWith(key.toLowerCase())) {
        sortedJson[dataKey] = pluginData[dataKey];
      }
    });
  });
  return sortedJson;
}

function extractKeysStartingWithPrefixesAndIsTrue(flatJson, prefix) {
  const extractedJson = {};

  for (const key in flatJson) {
    if (key.startsWith(prefix)) {
      if (flatJson[key] === "true") {
        extractedJson[key] = flatJson[key];
      }
      delete flatJson[key];
    }
  }

  return extractedJson;
}

function extractValues(keys) {
  const result = [];
  console.log(keys);
  for (const key in keys) {
    console.log(key);
    if (keys.hasOwnProperty(key)) {
      const id = extractId(key);
      const name = extractName(key);

      if (id !== null && name !== null) {
        result.push({ id, name });
      }
    }
  }

  return result;
}

//TODO checken ob es passt, nochmal neu
function extractId(key) {
  const idParts = key.split("-");
  const extractedId =
    idParts[1] +
    "-" +
    idParts[2] +
    "-" +
    idParts[3] +
    "-" +
    idParts[4] +
    "-" +
    idParts[5];
  return extractedId;
}

function extractName(key) {
  const nameParts = key.split("-");
  return nameParts[nameParts.length - 1];
}

function createList(listname, array) {
  createHeaderField(listname, 2);
  if (array.length === 0) {
    createVideoInfo(listname, "");
    createLine();
  } else {
    array.map((element) => {
      createVideoInfo("Id", element.id);
      createVideoInfo("Name", element.name);
      createLine();
    });
  }
}

function createLine() {
  const myLine = document.querySelector("my-video-attributes");
  const newLine = document.createElement("div");
  newLine.classList.add("line");
  newLine.innerHTML = `<hr>`;
  myLine.appendChild(newLine);
}

function createHeaderField(header, headerlevel) {
  // Wähle das Element aus, zu dem du das neue Feld hinzufügen möchtest
  const myHeader = document.querySelector("my-video-attributes");

  // Erstelle das neue Feld
  const newHeader = document.createElement("div");
  newHeader.classList.add("header-field");

  // Füge den Inhalt des neuen Feldes hinzu
  newHeader.innerHTML = `
    <h${headerlevel} class="header-label">${header}</h${headerlevel}>
  `;

  // Füge das neue Header am Ende des my-header-Elements hinzu
  myHeader.appendChild(newHeader);
}

function createVideoInfo(label, value) {
  // Wähle das Element aus, zu dem du das neue Feld hinzufügen möchtest
  const myVideoAttributes = document.querySelector("my-video-attributes");

  // Erstelle das neue Feld
  const newField = document.createElement("div");
  newField.classList.add("attribute-ebu");

  // Füge den Inhalt des neuen Feldes hinzu
  newField.innerHTML = `
<span class="attribute-label-ebu">${label}</span>
<span class="attribute-value-ebu">${value}</span>
`;

  // Füge das neue Feld am Ende des my-video-attributes-Elements hinzu
  myVideoAttributes.appendChild(newField);
}

function turnUndefinedIntoString(data) {
  const value = data || "";
  return value;
}

/* function translate(key){
  return peertubeHelpers.translate(key);
} */

export { register };
