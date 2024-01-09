async function register({ registerClientRoute, peertubeHelpers }) {
  //TODO: Video ID sortieren
  //TODO: CHANGE Entitiy Data

  registerClientRoute({
    route: "metadata/videos",
    onMount: ({ rootEl }) => {
      rootEl.innerHTML = `
          <div id="plugincontainer">
          <h1>Videos</h1>
          <div id="formcontainer">
          <div>
          <input style="display: none;" type="text" id="videosname" name="videosname"></input>
          </div>
          </div>
          </br>
          <button style="display: none;" id="myButton">Video suchen</button>
          <div id="videosContainer"></div>
          <table id="myTable">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Version</th>
            </tr>
          </table>
          <div>
        `;

      function getVideos() {
        const host = peertubeHelpers.getWebserverUrl();
        const baseRouterRoute = plugin.getBaseRouterRoute();
        const domain = host + baseRouterRoute;
        const table = rootEl.querySelector("#myTable");
        const tableBody = table.querySelector("tbody");
        if (tableBody) {
          tableBody.remove();
        }
        console.log(`${host}/api/v1/videos`);
        //TODO URL Herausfinden
        fetch(peertubeHelpers.getBaseRouterRoute() + "/videos/all", {
          method: "GET",
          headers: peertubeHelpers.getAuthHeader(),
        })
          .then((res) => res.json())
          .then((data) => {
            var videos = data;
            console.log("videos:", videos);

            const videosContainer = rootEl.querySelector("#videosContainer");
            if (videos.length == 0) {
              videosContainer.textContent = "Noch keine Videos vorhanden";
              return;
            } else {
              videosContainer.textContent = "";
            }
            const newTableBody = document.createElement("tbody");
            const tableHeaderRow = document.createElement("tr");
            tableHeaderRow.innerHTML = `
                  <th>Video ID</th>
                  <th>Ausgewählte Version</th>
                  <th>Verfügbare Versionen</th>
                `;
            newTableBody.appendChild(tableHeaderRow);

            for (const key in videos) {
              const tableRow = document.createElement("tr");
              const videoData = videos[key];

              fetch(`${domain}video/${key}/version`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log("current Version get", data);
                  var indexOptionSelected = data.version;

                  var optionsHTML = `<option value="-1" ${
                    -1 === indexOptionSelected ? "selected" : ""
                  }>Latest</option>`;
                  for (let i = 0; i < videoData.totalVersions; i++) {
                    optionsHTML += `<option value="${i}" ${
                      i === indexOptionSelected ? "selected" : ""
                    }>${i}</option>`;
                  }

                  tableRow.innerHTML = `
                            <td>${key}</td>
                            <td>
                            <select>
                              ${optionsHTML}
                            </select>
                            </td>
                            <td>${videoData.totalVersions}</td>
                          `;

                  const selectElement = tableRow.querySelector("select");

                  selectElement.addEventListener("change", function () {
                    const selectedOption = selectElement.value;
                    const intValue = parseInt(selectedOption, 10);
                    console.log(
                      `Die ausgewählte Option ist: ${selectedOption} und soll die videoId ${key} ändern`
                    );

                    fetch(`${domain}video/${key}/version`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ value: intValue }),
                    })
                      .then((response) => response.json())
                      .then((data) => {
                        console.log("abgespeichert nun als", data);
                      })
                      .catch((error) => {
                        console.error(
                          "Fehler beim Setzen der Videoversion:",
                          error
                        );
                      });
                  });

                  const newRowArray = []; // Create an array to store all new rows
                  tableRow.addEventListener("click", function () {
                    newRowArray.forEach((row) => {
                      if (row.style.display === "none") {
                        row.style.display = "table-row";
                      } else {
                        row.style.display = "none";
                      }
                    });
                  });

                  newTableBody.appendChild(tableRow);

                  for (let i = 0; i < videoData.totalVersions; i++) {
                    const newRow = document.createElement("tr");
                    newRow.style.display = "none"; // Initially hide the versions row

                    var newtable = document.createElement("table");
                    var newtableBody = document.createElement("tbody");

                    for (var videoDataKey in videoData[i]) {
                      if (videoData[i].hasOwnProperty(videoDataKey)) {
                        var value = videoData[i][videoDataKey].value;

                        var row = newtableBody.insertRow();
                        var keyCell = row.insertCell(0);
                        var valueCell = row.insertCell(1);

                        keyCell.textContent = videoDataKey;
                        valueCell.textContent = value;
                      }
                    }

                    newtable.appendChild(newtableBody);

                    newRow.innerHTML = `
                              <td>
                                <table style="width: 100%;">
                                  <tr>
                                    <th style="width: 10%;">Version</th>
                                    <th style="width: 90%;">Daten</th>
                                  <tr>
                                    <td>${i}</td>
                                    <td></td>
                                  </tr>
                                </table>
                              </td>
                            `;

                    // Now, append the newtable to the cell with an empty <td>
                    const tableCell = newRow.querySelector("td:nth-child(2)");
                    tableCell.appendChild(newtable);

                    newRow.style.border = "1px solid #000"; // Add borders to the entire row
                    newRow.querySelector("td:first-child").colSpan = 4; // Merge the first cell to span 3 columns

                    newRowArray.push(newRow); // Add the newRow to the array
                    newTableBody.appendChild(newRow);
                  }
                  table.appendChild(newTableBody);
                })
                .catch((error) => {
                  console.error(
                    "Fehler beim Bekommen der Videoversion:",
                    error
                  );
                });
            }
          })
          .catch((error) => {
            console.log("Error:", error);
          });
      }

      getVideos();
      // CSS-Stile der Seite
      const style = document.createElement("style");
      style.innerHTML = `
                #formcontainer{
                  display: flex;
                  flex-wrap: wrap;
                }
                
                h1 {
                  color: #4CBDC9;
                }
      
                input {
                  background-color: #fff;
                  color: #000;
                }
                
                p {
                  font-size: 18px;
                }
          
                table {
                  width: 100%;
                  border-collapse: collapse;
                  margin: 25px 0;
                  font-size: 0.9em;
                  font-family: sans-serif;
                  min-width: 400px;
                  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
              }
          
              table tr {
                text-align: left;
            }
            table th,
            table td {
              padding: 12px 15px;
          }
              `;
      rootEl.appendChild(style);
    },
  });
}

export { register };
