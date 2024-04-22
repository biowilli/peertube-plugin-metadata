async function register({ registerClientRoute, peertubeHelpers }) {
  if (peertubeHelpers.isLoggedIn()) {
    registerClientRoute({
      route: "metadata/organizations",
      onMount: ({ rootEl }) => {
        const pluginContainer = createPluginContainer();
        rootEl.appendChild(pluginContainer);

        const organizationContainer = pluginContainer.querySelector(
          "#organizationContainer"
        );
        const table = pluginContainer.querySelector("#myTable");

        function createPluginContainer() {
          const container = document.createElement("div");
          container.id = "plugincontainer";
          container.innerHTML = getPluginContainerHTML();

          const button = container.querySelector("#myButton");
          button.addEventListener("click", onAddOrganizationClick);

          return container;
        }

        function getPluginContainerHTML() {
          return `
                <h1>Herausgeber</h1>
                <div id="formcontainer">
                  ${generateInputField("Name", "organizationname")}
                  ${generateInputField(
                    "Herausgeberabkürzung",
                    "organizationabbrev"
                  )}
                </div>
                <br>
                <button id="myButton" class="iconButton" title="Add Publisher">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#4CBDC9" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12 5l0 14" />
                    <path d="M5 12l14 0" />
                  </svg>
                </button>
                <div id="organizationContainer"></div>
                <table id="myTable">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Herausgeberabkürzung</th>
                    <th></th>
                  </tr>
                </table>
              `;
        }

        function generateInputField(label, id) {
          return `
                <div>
                  <label for="${id}">${label}</label><br>
                  <input type="text" id="${id}" name="${id}">
                </div>`;
        }

        function onAddOrganizationClick() {
          const organizationNameInput =
            pluginContainer.querySelector("#organizationname");
          const organizationAbbrevInput = pluginContainer.querySelector(
            "#organizationabbrev"
          );

          if (!organizationNameInput.value) {
            console.log("Please fill in the required name field.");
            return;
          }

          const newOrganizationData = {
            name: organizationNameInput.value,
            abbrev: organizationAbbrevInput.value,
          };

          fetch(`${peertubeHelpers.getBaseRouterRoute()}/organization`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...peertubeHelpers.getAuthHeader(),
            },
            body: JSON.stringify(newOrganizationData),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("Successfully added organization:", data);
              getOrganization();
            })
            .catch((error) => {
              console.log("Error adding organization:", error);
            });
        }

        function updateTableRowToEditable(tableRow) {
          const cells = tableRow.querySelectorAll("td");

          cells.forEach((cell, index) => {
            if (index !== 0 && index !== cells.length - 1) {
              const cellValue = cell.textContent.trim();
              const input = document.createElement("input");
              input.value = cellValue;
              input.id = `${tableRow.cells[index].id}Input`;
              cell.innerHTML = "";
              cell.appendChild(input);
            }
          });

          cells[cells.length - 1].innerHTML = "";
          cells[cells.length - 2].innerHTML = "";
          const saveButton = document.createElement("div");
          saveButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-device-floppy" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#4CBDC9" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
              <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M14 4l0 4l-6 0l0 -4" />
            </svg>
        `;
          saveButton.title = "save";
          saveButton.classList.add("saveButton");
          saveButton.addEventListener("click", () =>
            saveTableRowChanges(tableRow)
          );
          cells[cells.length - 2].appendChild(saveButton);

          const cancelButton = document.createElement("div");
          cancelButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#4CBDC9" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M18 6l-12 12" />
              <path d="M6 6l12 12" />
            </svg>
        `;
          cancelButton.title = "cancel";
          cancelButton.classList.add("cancelButton");
          cancelButton.addEventListener("click", () => getOrganization());
          cells[cells.length - 1].appendChild(cancelButton);
        }

        function saveTableRowChanges(tableRow) {
          const inputs = tableRow.querySelectorAll("input");
          const updatedData = Array.from(inputs).reduce((data, input) => {
            const key = input.id.replace("CellInput", "");
            data[key] = input.value;
            return data;
          }, {});

          const organizationId = tableRow.querySelector("td").textContent;
          console.log(updatedData);
          fetch(
            `${peertubeHelpers.getBaseRouterRoute()}/organization/${organizationId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                ...peertubeHelpers.getAuthHeader(),
              },
              body: JSON.stringify(updatedData),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              console.log("Successfully updated:", data);
              getOrganization();
            })
            .catch((error) => {
              console.log("Error updating:", error);
            });
        }

        function getOrganization() {
          const tableBody = table.querySelector("tbody");
          if (tableBody) {
            tableBody.remove();
          }

          fetch(peertubeHelpers.getBaseRouterRoute() + "/organization/", {
            method: "GET",
            headers: peertubeHelpers.getAuthHeader(),
          })
            .then((res) => res.json())
            .then((organizations) => {
              if (organizations.length === 0) {
                organizationContainer.textContent =
                  "No publishers available yet";
                return;
              } else {
                organizationContainer.textContent = "";
              }
              const newTableBody = document.createElement("tbody");
              const tableHeaderRow = document.createElement("tr");
              tableHeaderRow.innerHTML = `
                        <th>ID</th>
                        <th>Name</th>
                        <th>Publisher Abbreviation</th>
                        <th></th>
                      `;
              newTableBody.appendChild(tableHeaderRow);

              organizations.forEach((organization) => {
                const tableRow = document.createElement("tr");
                tableRow.innerHTML = `
                          <td id="idCell">${organization.id}</td>
                          <td id="nameCell">${organization.name}</td>
                          <td id="abbrevCell">${organization.abbrev}</td>
                          <td>
                            <div class="modifyButton" data-id="${organization.id}">
                              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#4CBDC9" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                                <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                                <path d="M16 5l3 3" />
                              </svg>
                            </div>
                          </td>
                          <td>
                            <div class="deleteButton" data-id="${organization.id}">
                              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#4CBDC9" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M4 7l16 0" />
                                <path d="M10 11l0 6" />
                                <path d="M14 11l0 6" />
                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                              </svg>
                            </div>
                          </td>
                        `;
                newTableBody.appendChild(tableRow);
              });

              table.appendChild(newTableBody);

              const modifyButtons =
                pluginContainer.querySelectorAll(".modifyButton");
              modifyButtons.forEach((button) => {
                button.addEventListener("click", () => {
                  const organizationId = button.dataset.id;
                  console.log("Editing publisher with ID:", organizationId);
                  const tableRow = button.closest("tr");
                  updateTableRowToEditable(tableRow);
                });
              });

              const deleteButtons =
                pluginContainer.querySelectorAll(".deleteButton");
              deleteButtons.forEach((button) => {
                button.addEventListener("click", () => {
                  const organizationId = button.dataset.id;
                  const table = rootEl.querySelector("#myTable");
                  const existingConfirmationBoxes =
                    document.querySelectorAll("#confirmationBox");
                  existingConfirmationBoxes.forEach((box) => {
                    box.parentNode.removeChild(box);
                  });

                  const confirmationBox = document.createElement("div");
                  confirmationBox.id = "confirmationBox";
                  confirmationBox.innerHTML = `
                      <p>Sind Sie sicher, dass Sie die Organization löschen möchten?</p>
                      <p>ID: ${organizationId}</p>
                      <button id="confirmDeleteButton">Ja</button>
                      <button id="cancelDeleteButton">Nein</button>
                  `;
                  table.appendChild(confirmationBox);

                  const confirmButton = rootEl.querySelector(
                    "#confirmDeleteButton"
                  );
                  confirmButton.addEventListener("click", () => {
                    console.log(
                      "Löschen der Organization mit ID:",
                      organizationId
                    );

                    fetch(
                      peertubeHelpers.getBaseRouterRoute() +
                        "/organization/" +
                        organizationId,
                      {
                        method: "DELETE",
                        headers: peertubeHelpers.getAuthHeader(),
                      }
                    )
                      .then((res) => res.json())
                      .then((data) => {
                        console.log("Successfully deleted:", data);
                        getOrganization();
                        table.removeChild(confirmationBox);
                      })
                      .catch((error) => {
                        console.log("Error deleting:", error);
                      });
                  });

                  const cancelButton = rootEl.querySelector(
                    "#cancelDeleteButton"
                  );
                  cancelButton.addEventListener("click", () => {
                    table.removeChild(confirmationBox);
                  });
                });
              });
            })
            .catch((error) => {
              console.log("Error:", error);
            });
        }

        function initialize() {
          getOrganization();

          const style = document.createElement("style");
          style.innerHTML = `
                #plugincontainer {
                  max-width: 100%;
                  padding: 5px;
                } 
      
                #formcontainer {
                  display: flex;
                  flex-wrap: wrap;
                }
                
                h1 {
                  color: #4CBDC9;
                }
      
                .modifyButton, .saveButton, .cancelButton, .deleteButton {
                  cursor: pointer;
                  padding: 20px;
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

                table td:nth-last-child(-n+2) {
                  width: 50px;
                  padding: 12px;
                  text-align: center;
                }

                #confirmationBox {
                  position: fixed;
                  top: 50%;
                  left: 50%;
                  background-color: #4CBDC9;
                  transform: translate(-50%, -50%);
                  padding: 20px;
                  border-radius: 5px;
                  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                }
                
                #confirmationBox p {
                  margin-bottom: 20px;
                }
                
                #confirmationBox button {
                  margin-right: 10px;
                  padding: 8px 16px;
                  border: none;
                  border-radius: 3px;
                  background-color: #4CBDC9;
                  color: #fff;
                  cursor: pointer;
                }
                
                #confirmationBox button:hover {
                  background-color: #2c3e50;
                }
              `;
          rootEl.appendChild(style);
        }

        initialize();
      },
    });
  }
}

export { register };
