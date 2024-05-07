function register({ registerHook, peertubeHelpers }) {
  // Function to convert file size from Mebibyte to Megabyte
  function convertFileSize(bytes) {
    const megabyte = bytes / (1024 * 1024); // 1 Megabyte = 1024 * 1024 Bytes
    return megabyte.toFixed(2) + " Megabyte";
  }
  // Function to convert overall bit rate from bit/s to Mbit/s
  function convertOverallBitRate(bitRateInBitsPerSecond) {
    const megabit = bitRateInBitsPerSecond / 1000000; // 1 Megabit = 1000000 bits
    return megabit.toFixed(2) + " Mbit/s";
  }

  // Function to convert stream size from Byte to Megabyte
  function convertStreamSize(sizeInBytes) {
    const megabyte = sizeInBytes / (1024 * 1024); // 1 Megabyte = 1024 * 1024 bytes
    return megabyte.toFixed(2) + " Megabyte";
  }

  // Function to convert video bit rate from bit/s to Mbit/s
  function convertVideoBitRate(bitRateInBitsPerSecond) {
    const megabit = bitRateInBitsPerSecond / 1000000; // 1 Megabit = 1000000 bits
    return megabit.toFixed(2) + " Mbit/s";
  }

  // Function to convert audio stream size from Byte to Megabyte
  function convertAudioStreamSize(sizeInBytes) {
    const megabyte = sizeInBytes / (1024 * 1024); // 1 Megabyte = 1024 * 1024 bytes
    return megabyte.toFixed(2) + " Megabyte";
  }

  // Function to convert data size from Byte to Megabyte
  function convertDataSize(sizeInBytes) {
    const megabyte = sizeInBytes / (1024 * 1024); // 1 Megabyte = 1024 * 1024 bytes
    return megabyte.toFixed(2) + " Megabyte";
  }

  // Function to convert audio bit rate from bit/s to kbit/s
  function convertAudioBitRate(bitRateInBitsPerSecond) {
    const kilobit = bitRateInBitsPerSecond / 1000; // 1 Kilobit = 1000 bits
    return kilobit.toFixed(2) + " kbit/s";
  }

  // Function to convert audio sampling rate from Hz to kHz
  function convertAudioSamplingRate(samplingRateInHertz) {
    const kilohertz = samplingRateInHertz / 1000; // 1 Kilohertz = 1000 Hertz
    return kilohertz.toFixed(2) + " kHz";
  }

  registerHook({
    target: "action:video-watch.player.loaded",
    handler: ({ videojs, video, playlist }) => {
      function getData() {
        console.log("pluginData", video.pluginData);

        const fetchCategory = fetch(
          peertubeHelpers.getBaseRouterRoute() + "/category/",
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

        const fetchPresenter = fetchAllCreator(
          video.pluginData["show.role.presenter"],
          peertubeHelpers
        );

        const fetchGuest = fetchAllCreator(
          video.pluginData["show.role.guests"],
          peertubeHelpers
        );

        const fetchContributor = fetchAllCreator(
          video.pluginData["show.role.contributor"],
          peertubeHelpers
        );

        const fetchCrew = fetchAllCreator(
          video.pluginData["show.role.crew"],
          peertubeHelpers
        );

        const fetchOrganization = fetchAllOrganization(
          video.pluginData["show.role.producer"],
          peertubeHelpers
        );

        fetch(peertubeHelpers.getBaseRouterRoute() + "/category/", {
          method: "GET",
          headers: peertubeHelpers.getAuthHeader(),
        }).then((response) => response.json());

        Promise.all([
          fetchCategory,
          fetchLanguages,
          fetchLicences,
          fetchPresenter,
          fetchGuest,
          fetchContributor,
          fetchCrew,
          fetchOrganization,
        ]).then(
          ([
            categoryResponse,
            languagesResponse,
            licencesResponse,
            presenterData,
            guestData,
            contributorData,
            crewData,
            organizationData,
          ]) => {
            const categoriesData = categoryResponse;
            const languagesData = languagesResponse;
            const licencesData = licencesResponse;

            var data = [];

            peertubeHelpers.getSettings().then((setting) => {
              if (setting["form"]) {
                var form = JSON.parse(setting["form"].replace(/'/g, '"'));
                console.log("formated------>", video.pluginData);
                for (var i = 0; i < form.length; i++) {
                  var field = form[i];
                  if (field.visibleVideoWatch == false) {
                    continue;
                  } else if (field.mappingname == "mediainfo.info.fileSize") {
                    var value = video.pluginData[field.mappingname];

                    if (value != undefined) {
                      value = convertFileSize(value);
                    } else {
                      value = "";
                    }

                    console.log(
                      field.label,
                      "mediainfo.info.fileSize",
                      video.pluginData[field.mappingname],
                      "formated------>",
                      value
                    );
                    data.push({
                      mappingname: field.mappingname,
                      label: field.label,
                      value: value,
                    });
                  } else if (
                    field.mappingname == "mediainfo.info.overallBitRate"
                  ) {
                    var value = video.pluginData[field.mappingname];
                    if (value != undefined) {
                      value = convertOverallBitRate(value);
                    } else {
                      value = "";
                    }
                    console.log(
                      field.label,
                      "mediainfo.info.overallBitRate",
                      video.pluginData[field.mappingname],
                      "formated------>",
                      value
                    );

                    data.push({
                      mappingname: field.mappingname,
                      label: field.label,
                      value: value,
                    });
                  } else if (field.mappingname == "mediainfo.info.streamSize") {
                    var value = video.pluginData[field.mappingname];
                    if (value != undefined) {
                      value = convertStreamSize(value);
                    } else {
                      value = "";
                    }

                    console.log(
                      field.label,
                      "mediainfo.info.streamSize",
                      video.pluginData[field.mappingname],
                      "formated------>",
                      value
                    );

                    data.push({
                      mappingname: field.mappingname,
                      label: field.label,
                      value: value,
                    });
                  } else if (field.mappingname == "mediainfo.info.dataSize") {
                    var value = video.pluginData[field.mappingname];
                    if (value != undefined) {
                      value = convertDataSize(value);
                    } else {
                      value = "";
                    }

                    console.log(
                      field.label,
                      "mediainfo.info.dataSize",
                      video.pluginData[field.mappingname],
                      "formated------>",
                      value
                    );

                    data.push({
                      mappingname: field.mappingname,
                      label: field.label,
                      value: value,
                    });
                  } else if (
                    field.mappingname != undefined &&
                    field.mappingname.endsWith("__.bitRate") &&
                    field.mappingname.startsWith("mediainfo.video.__")
                  ) {
                    var value = video.pluginData[field.mappingname];
                    if (value != undefined) {
                      value = convertVideoBitRate(value);
                    } else {
                      value = "";
                    }

                    console.log(
                      field.label,
                      "mediainfo.video.__x__.bitRate",
                      video.pluginData[field.mappingname],
                      "formated------>",
                      value
                    );

                    data.push({
                      mappingname: field.mappingname,
                      label: field.label,
                      value: value,
                    });
                  } else if (
                    field.mappingname != undefined &&
                    field.mappingname.startsWith("mediainfo.audio.__") &&
                    field.mappingname.endsWith("__.streamSize")
                  ) {
                    var value = video.pluginData[field.mappingname];
                    if (value != undefined) {
                      value = convertAudioStreamSize(value);
                    } else {
                      value = "";
                    }

                    console.log(
                      field.label,
                      "mediainfo.audio.__x__.streamSize",
                      video.pluginData[field.mappingname],
                      "formated------>",
                      value
                    );

                    data.push({
                      mappingname: field.mappingname,
                      label: field.label,
                      value: value,
                    });
                  } else if (
                    field.mappingname != undefined &&
                    field.mappingname.startsWith("mediainfo.audio.__") &&
                    field.mappingname.endsWith("__.bitRate")
                  ) {
                    var value = video.pluginData[field.mappingname];
                    if (value != undefined) {
                      value = convertAudioBitRate(value);
                    } else {
                      value = "";
                    }

                    console.log(
                      field.label,
                      "mediainfo.audio.__x__.bitRate",
                      video.pluginData[field.mappingname],
                      "formated------>",
                      value
                    );

                    data.push({
                      mappingname: field.mappingname,
                      label: field.label,
                      value: value,
                    });
                  } else if (
                    field.mappingname != undefined &&
                    field.mappingname.startsWith("mediainfo.audio.__") &&
                    field.mappingname.endsWith("__.samplingRate")
                  ) {
                    var value = video.pluginData[field.mappingname];
                    if (value != undefined) {
                      value = convertAudioSamplingRate(value);
                    } else {
                      value = "";
                    }

                    console.log(
                      field.label,
                      "mediainfo.audio.__x__.samplingRate",
                      video.pluginData[field.mappingname],
                      "formated------>",
                      value
                    );

                    data.push({
                      mappingname: field.mappingname,
                      label: field.label,
                      value: value,
                    });
                  } else if (field.mappingname == "show.category") {
                    var value = turnUndefinedIntoString(
                      extractReadablInfo(
                        video.pluginData[field.mappingname],
                        categoriesData
                      )
                    );
                    console.log("value", value);
                    data.push({
                      mappingname: field.mappingname,
                      label: field.label,
                      value: value,
                    });
                  } else if (field.mappingname === "show.language") {
                    var value = turnUndefinedIntoString(
                      extractReadablInfo(
                        video.pluginData[field.mappingname],
                        languagesData
                      )
                    );
                    console.log("value", value);
                    data.push({
                      mappingname: field.mappingname,
                      label: field.label,
                      value: value,
                    });
                  } else if (field.mappingname === "rights.copyright.rightId") {
                    var value = turnUndefinedIntoString(
                      extractReadablInfo(
                        video.pluginData[field.mappingname],
                        licencesData
                      )
                    );
                    console.log("value", value);
                    data.push({
                      mappingname: field.mappingname,
                      label: field.label,
                      value: value,
                    });
                  } else if (field.mappingname === "show.role.presenter") {
                    var value = getStringWithCommas(presenterData);
                    console.log("value", value);
                    data.push({
                      mappingname: field.mappingname,
                      label: field.label,
                      value: value,
                    });
                  } else if (field.mappingname === "show.role.guests") {
                    var value = getStringWithCommas(guestData);
                    console.log("value", value);
                    data.push({
                      mappingname: field.mappingname,
                      label: field.label,
                      value: value,
                    });
                  } else if (field.mappingname === "show.role.contributor") {
                    var value = getStringWithCommas(contributorData);
                    console.log("value", value);
                    data.push({
                      mappingname: field.mappingname,
                      label: field.label,
                      value: value,
                    });
                  } else if (field.mappingname === "show.role.crew") {
                    var value = getStringWithCommas(crewData);
                    console.log("value", value);
                    data.push({
                      mappingname: field.mappingname,
                      label: field.label,
                      value: value,
                    });
                  } else if (field.mappingname === "show.role.producer") {
                    console.log(organizationData);
                    var value = getStringWithCommas(organizationData);
                    console.log("valueproducer", value);
                    data.push({
                      mappingname: field.mappingname,
                      label: field.label,
                      value: value,
                    });
                  } else if (field.type === "header") {
                    data.push({
                      mappingname: field.type,
                      label: field.label,
                      value: field.size,
                    });
                  } else if (field.type === "line") {
                    data.push({
                      mappingname: field.type,
                      label: field.label,
                      value: field.size,
                    });
                  } else if (field.visibleVideoWatch) {
                    var value = turnUndefinedIntoString(
                      video.pluginData[field.mappingname]
                    );
                    console.log("value", value);
                    data.push({
                      mappingname: field.mappingname,
                      label: field.label,
                      value: value,
                    });
                  }
                }
              }

              console.log("data1212", data);
              createDynamicTable(data);
            });

            createButton("Sidecarfile", async () => {
              await fetch(
                peertubeHelpers.getBaseRouterRoute() +
                  "/sidecarfile/" +
                  video.id,
                {
                  method: "GET",
                  headers: peertubeHelpers.getAuthHeader(),
                }
              ).then(async (response) => {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = video.name + "_sidecarfile.json";
                document.body.appendChild(a);
                a.click();
                a.remove();
              });
            });
          }
        );
      }
      getData();
    },
  });
}

function createDynamicTable(data) {
  const myVideoAttributes = document.querySelector("my-video-attributes");
  const table = document.createElement("table");
  table.classList.add("dynamic-table");

  const maxColumns = 4;

  let currentColumn = 0;
  let currentRow = null;

  // Inserting data
  data.forEach((item, index) => {
    if (item.mappingname === "header") {
      const headerRow = document.createElement("tr");
      const headerCell = document.createElement("th");
      headerCell.colSpan = maxColumns;
      headerCell.textContent = item.label;
      headerRow.appendChild(headerCell);
      table.appendChild(headerRow);
    } else if (item.mappingname === "line") {
      const emptyRow = table.insertRow();
      const emptyCell = emptyRow.insertCell();
      emptyCell.colSpan = maxColumns;
      emptyRow.classList.add("empty-row");
    } else {
      if (currentColumn === 0) {
        currentRow = table.insertRow();
      }

      const labelCell = currentRow.insertCell();
      labelCell.textContent = item.label;
      labelCell.classList.add("label-cell");

      const valueCell = currentRow.insertCell();

      if (item.mappingname == "show.videoLinks") {
        console.log("show.videoLinks");
        const link = document.createElement("a");
        link.setAttribute("class", "attribute-value-ebu");
        link.setAttribute("href", item.value);
        link.textContent = item.value;
        valueCell.innerHTML = "";
        valueCell.appendChild(link);
      } else {
        valueCell.textContent = item.value;
      }

      valueCell.classList.add("value-cell");

      currentColumn += 2;

      if (currentColumn >= maxColumns || index === data.length - 1) {
        currentColumn = 0; // Reset column count for the next row
      }
    }
  });

  myVideoAttributes.appendChild(table);
}

function getStringWithCommas(list) {
  if (list.length === 0) {
    return "";
  }
  if (list.length === 1) {
    return formatName(list[0].name, list[0].familyname);
  } else {
    let result = "";
    for (let i = 0; i < list.length - 1; i++) {
      result += formatName(list[i].name, list[i].familyname) + ", ";
    }
    result += formatName(
      list[list.length - 1].name,
      list[list.length - 1].familyname
    );
    return result;
  }
}

function formatName(name, familyname) {
  return (
    name +
    " " +
    (familyname !== null && familyname !== undefined ? familyname : "")
  );
}

function extractReadablInfo(id, dataStore) {
  if (id == "") {
    return "";
  }
  var info = dataStore[id];

  if (info) {
    return info;
  } else {
    console.log("info is", info, "with id:", id, "in datastore:", dataStore);
    return id;
  }
}

function createButton(name, callback) {
  const button = document.createElement("button");
  button.classList.add("button");
  button.addEventListener("click", callback);
  button.textContent = name;
  const myVideoAttributes = document.querySelector("my-video-attributes");
  myVideoAttributes.appendChild(button);
}

function turnUndefinedIntoString(data) {
  const value = data || "";
  return value;
}

async function fetchAllCreator(ids, peertubeHelpers) {
  if (!ids) {
    return [];
  }
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
          console.log("creator[0]");
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
  console.log("ids", ids);
  if (!ids) {
    return [];
  }

  const storedDataArray = ids
    .trim()
    .split(",")
    .map((id) => id.trim());
  console.log("storedDataArray", storedDataArray);
  if (storedDataArray[0] !== "") {
    try {
      const organizationData = await Promise.all(
        storedDataArray.map(async (id) => {
          const response = await fetch(
            peertubeHelpers.getBaseRouterRoute() + "/organization/" + id,
            {
              method: "GET",
              headers: peertubeHelpers.getAuthHeader(),
            }
          );
          console.log(response);
          const organization = await response.json();
          console.log("organization", organization);
          if (organization == undefined) {
            return "";
          }

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
