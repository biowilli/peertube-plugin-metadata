function register({ registerHook, peertubeHelpers}) {
  registerHook({
    target: "action:video-watch.player.loaded",
    handler: ({ videojs, video, playlist }) => {
      function getData(){
      const fetchCategory = fetch(
        peertubeHelpers.getBaseRouterRoute() + "/category/all",
        {
          method: "GET",
          headers: peertubeHelpers.getAuthHeader(),
        }
      ).then((response) => response.json());

      Promise.all([
        fetchCategory,
      ]).then(
        ([
          categoryResponse,
        ]) => {
  
          const categoriesData = categoryResponse;
        peertubeHelpers.getSettings().then((setting) => {
          var extractIdData = extractIds(video.pluginData);
          if (setting["form"]){
            var form = JSON.parse(setting["form"].replace(/'/g, "\""));

            for (var i = 0; i < form.length; i++) {
              var field = form[i];
              if (field.visibleVideoWatch == false){
                continue;
              } else if (field.mappingname == 'videoInformation.category'){
                var categoryId = video.pluginData[field.mappingname]; 
                var matchedCategory = categoriesData[categoryId];
                if (matchedCategory) {
                  createVideoInfo(field.label, turnUndefinedIntoString(matchedCategory));
                } else {
                  console.log("No match found for category ID: " + categoryId);
                }
              }else if (field.mappingname == 'creator' || field.mappingname == 'organization' || field.mappingname == 'contributor'){
                createList(field.mappingname, extractIdData[field.mappingname]);
              } else if (field.type === "header") {
                createHeaderField(field.label, field.size);
              } else if ((field.type === "line")) {
                createLine();
              }  else if (field.visibleVideoWatch) {
                createVideoInfo(
                  field.label,
                  turnUndefinedIntoString(video.pluginData[field.mappingname])
                );
              }
            }
          }
        })
      })

    }
    getData();
  }
  })
};
      
function extractIds(flatJson) {
  // Extract keys starting with prefixes and store them in a separate JSON
  const contributorJson = extractKeysStartingWithPrefixesAndIsTrue(
    flatJson,
    "contributor"
  );
  const creatorJson = extractKeysStartingWithPrefixesAndIsTrue(
    flatJson,
    "creator"
  ); 
  const organizationJson = extractKeysStartingWithPrefixesAndIsTrue(
    flatJson,
    "organization"
  );
  flatJson.creator = extractValues(creatorJson);
  flatJson.contributor = extractValues(contributorJson);
  flatJson.organization = extractValues(organizationJson);

  return flatJson;
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
  for (const key in keys) {
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

export { register };
