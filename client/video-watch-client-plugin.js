function register({ registerHook, peertubeHelpers }) {
  registerHook({
    target: "action:video-watch.player.loaded",
    handler: ({ videojs, video, playlist }) => {
      function getData() {
        const fetchCategory = fetch(
          peertubeHelpers.getBaseRouterRoute() + "/category/all",
          {
            method: "GET",
            headers: peertubeHelpers.getAuthHeader(),
          }
        ).then((response) => response.json());

        const fetchLanguages = fetch(
          peertubeHelpers.getBaseRouterRoute() + "/language/",
          {
            method: "GET",
            headers: peertubeHelpers.getAuthHeader(),
          }
        ).then((response) => response.json());

        const fetchLicences = fetch(
          peertubeHelpers.getBaseRouterRoute() + "/licence/",
          {
            method: "GET",
            headers: peertubeHelpers.getAuthHeader(),
          }
        ).then((response) => response.json());

        const fetchCreator = fetchAllCreator(
          video.pluginData["refCreator"],
          peertubeHelpers
        );
        const fetchContributor = fetchAllCreator(
          video.pluginData["refContributor"],
          peertubeHelpers
        );
        const fetchOrganization = fetchAllOrganization(
          video.pluginData["refOrganization"],
          peertubeHelpers
        );

        fetch(peertubeHelpers.getBaseRouterRoute() + "/category/all", {
          method: "GET",
          headers: peertubeHelpers.getAuthHeader(),
        }).then((response) => response.json());

        Promise.all([
          fetchCategory,
          fetchLanguages,
          fetchLicences,
          fetchCreator,
          fetchContributor,
          fetchOrganization,
        ]).then(
          ([
            categoryResponse,
            languagesResponse,
            licencesResponse,
            creatorData,
            contributorData,
            organizationData,
          ]) => {
            const categoriesData = categoryResponse;
            const languagesData = languagesResponse;
            const licencesData = licencesResponse;

            peertubeHelpers.getSettings().then((setting) => {
              if (setting["form"]) {
                var form = JSON.parse(setting["form"].replace(/'/g, '"'));
                console.log(form);
                console.log(video.pluginData);
                for (var i = 0; i < form.length; i++) {
                  var field = form[i];
                  if (field.visibleVideoWatch == false) {
                    continue;
                  } else if (field.mappingname == "videoInformation.category") {
                    createVideoInfo(
                      field.label,
                      turnUndefinedIntoString(
                        extractReadablInfo(
                          video.pluginData[field.mappingname],
                          categoriesData
                        )
                      )
                    );
                  } else if (
                    field.mappingname === "videoInformation.language"
                  ) {
                    createVideoInfo(
                      field.label,
                      turnUndefinedIntoString(
                        extractReadablInfo(
                          video.pluginData[field.mappingname],
                          languagesData
                        )
                      )
                    );
                  } else if (field.mappingname === "rights.copyright.rightId") {
                    createVideoInfo(
                      field.label,
                      turnUndefinedIntoString(
                        extractReadablInfo(
                          video.pluginData[field.mappingname],
                          licencesData
                        )
                      )
                    );
                  } else if (field.mappingname === "refCreator") {
                    creatorData.forEach((data) => {
                      createVideoInfo(
                        data.id,
                        turnUndefinedIntoString(data.name)
                      );
                    });
                  } else if (field.mappingname === "refOrganization") {
                    organizationData.forEach((data) => {
                      createVideoInfo(
                        data.id,
                        turnUndefinedIntoString(data.name)
                      );
                    });
                  } else if (field.mappingname === "refContributor") {
                    contributorData.forEach((data) => {
                      createVideoInfo(
                        data.id,
                        turnUndefinedIntoString(data.name)
                      );
                    });
                  } else if (field.type === "header") {
                    createHeaderField(field.label, field.size);
                  } else if (field.type === "line") {
                    createLine();
                  } else if (field.visibleVideoWatch) {
                    createVideoInfo(
                      field.label,
                      turnUndefinedIntoString(
                        video.pluginData[field.mappingname]
                      )
                    );
                  }
                }
              }
            });
          }
        );
      }
      getData();
    },
  });
}
function extractReadablInfo(id, dataStore) {
  if (id == "") {
    return "";
  }
  var info = dataStore[id];
  console.log(
    "extractReadablInfo:",
    info,
    "from id",
    id,
    "datastore",
    dataStore
  );
  if (info) {
    return info;
  } else {
    return id;
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
  const myHeader = document.querySelector("my-video-attributes");
  const newHeader = document.createElement("div");
  newHeader.classList.add("header-field");
  newHeader.innerHTML = `
    <h${headerlevel} class="header-label">${header}</h${headerlevel}>
  `;
  myHeader.appendChild(newHeader);
}

function createVideoInfo(label, value) {
  const myVideoAttributes = document.querySelector("my-video-attributes");
  const newField = document.createElement("div");
  newField.classList.add("attribute-ebu");
  newField.innerHTML = `
    <span class="attribute-label-ebu">${label}</span>
    <span class="attribute-value-ebu">${value}</span>
    `;
  myVideoAttributes.appendChild(newField);
}

function turnUndefinedIntoString(data) {
  const value = data || "";
  return value;
}

async function fetchAllCreator(ids, peertubeHelpers) {
  const storedDataArray = ids
    .trim()
    .split(",")
    .map((id) => id.trim());

  if (storedDataArray[0] !== "") {
    try {
      const creatorData = await Promise.all(
        storedDataArray.map(async (id) => {
          console.log("creatorid");
          console.log(id);

          const response = await fetch(
            peertubeHelpers.getBaseRouterRoute() + "/creator/" + id,
            {
              method: "GET",
              headers: peertubeHelpers.getAuthHeader(),
            }
          );

          const creator = await response.json();

          console.log(creator[0]);
          console.log(creator[0].id);
          console.log(creator[0].name);

          return creator[0];
        })
      );

      return creatorData;
    } catch (error) {
      console.error("Error fetching creator data:", error.message);
      return [];
    }
  } else {
    return [];
  }
}

async function fetchAllOrganization(ids, peertubeHelpers) {
  const storedDataArray = ids
    .trim()
    .split(",")
    .map((id) => id.trim());

  if (storedDataArray[0] !== "") {
    try {
      const organizationData = await Promise.all(
        storedDataArray.map(async (id) => {
          console.log("organizationid");
          console.log(id);

          const response = await fetch(
            peertubeHelpers.getBaseRouterRoute() + "/organization/" + id,
            {
              method: "GET",
              headers: peertubeHelpers.getAuthHeader(),
            }
          );

          const organization = await response.json();

          console.log(organization[0]);
          console.log(organization[0].id);
          console.log(organization[0].name);

          return organization[0];
        })
      );

      return organizationData;
    } catch (error) {
      console.error("Error fetching organization data:", error.message);
      return [];
    }
  } else {
    return [];
  }
}

export { register };
