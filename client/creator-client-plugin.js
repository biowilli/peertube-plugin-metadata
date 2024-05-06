async function register({ registerClientRoute, peertubeHelpers }) {
  if (peertubeHelpers.isLoggedIn()) {
    registerClientRoute({
      route: "metadata/creators",
      onMount: ({ rootEl }) => {
        rootEl.innerHTML = getPluginContainerHTML();

        const button = rootEl.querySelector("#myButton");
        button.addEventListener("click", onAddCreatorClick);

        function getPluginContainerHTML() {
          return `
          <div id="plugincontainer">
            <h1>Creator</h1>
            <div id="formcontainer">
              ${generateInputField("Vorname", "name")}
              ${generateInputField("Nachname", "familyname")}
              ${generateInputField("Sendungsmacher Kürzel", "username")}
              <!--
              ${generateInputField("Beruf", "occupation")}
              ${generateInputField("E-Mail", "email")}
              ${generateInputField("Website URL", "url")}
              ${generateInputField("Adresse", "address")}
              ${generateInputField("Postleitzahl", "deliverycode")}
              ${generateInputField("Stadt", "city")}
              ${generateInputField("Bundesland", "state")}
              ${generateInputField("Land", "country")}
              ${generateInputField("Telefonnummer", "telephone")}
              ${generateInputField("Mobiltelefonnummer", "mobile")}
              ${generateInputField("Bühnenname", "stage")}
              ${generateInputField("Vernetzter Kontakt", "contacts")} 
              ${generateInputField("Role", "role")} -->
            </div>
            <br>
            <button id="myButton" class="iconButton" title="Add Creator">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#4CBDC9" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 5l0 14" />
                <path d="M5 12l14 0" />
              </svg>
            </button>
            <span id="errorMessage" style='color:red;'></span>
            <div id="creatorContainer"></div>
            <table id="myTable">
              <tr>
                <th>ID</th>
                <th>Vorname</th>
                <th>Nachname</th>
                <th>Sendungsmacher Kürzel</th>

                <!-- <th>Beruf</th>
                <th>E-Mail</th>
                <th>Website URL</th>
                <th>Adresse</th>
                <th>Postleitzahl</th>
                <th>Stadt</th>
                <th>Bundesland</th>
                <th>Land</th>
                <th>Telefonnummer</th>
                <th>Mobiltelefonnummer</th>
                <th>Bühnenname</th>
                <th>Vernetzter Kontakt</th>
                <th>Role</th>
                -->
              </tr>
            </table>
          </div>
        `;
        }

        function generateInputField(label, id) {
          return `
          <div>
            <label for="${id}">${label}</label><br>
            <input type="text" id="${id}" name="${id}">
          </div>`;
        }

        function onAddCreatorClick() {
          var errorMessage = rootEl.querySelector("#errorMessage");
          errorMessage.textContent = "";
          var nameInput = rootEl.querySelector("#name");
          var familynameInput = rootEl.querySelector("#familyname");
          var usernameInput = rootEl.querySelector("#username");
          var occupationInput = rootEl.querySelector("#occupation");
          var emailInput = rootEl.querySelector("#email");
          var urlInput = rootEl.querySelector("#url");
          var addressInput = rootEl.querySelector("#address");
          var cityInput = rootEl.querySelector("#city");
          var stateInput = rootEl.querySelector("#state");
          var countryInput = rootEl.querySelector("#country");
          var deliverycodeInput = rootEl.querySelector("#deliverycode");
          var telephoneInput = rootEl.querySelector("#telephone");
          var mobileInput = rootEl.querySelector("#mobile");
          var stageInput = rootEl.querySelector("#stage");
          var contactsInput = rootEl.querySelector("#contacts");
          var roleInput = rootEl.querySelector("#role");

          if (nameInput.value == "") {
            errorMessage.textContent = "Vorname ist ein Pflichtfeld";
            return;
          }

          if (familynameInput.value == "") {
            errorMessage.textContent = "Nachname ist ein Pflichtfeld";
            return;
          }

          const creatorsData = {
            name: nameInput ? nameInput.value : "",
            familyname: familynameInput ? familynameInput.value : "",
            username: usernameInput ? usernameInput.value : "",
            occupation: occupationInput ? occupationInput.value : "",
            email: emailInput ? emailInput.value : "",
            url: urlInput ? urlInput.value : "",
            address: addressInput ? addressInput.value : "",
            city: cityInput ? cityInput.value : "",
            state: stateInput ? stateInput.value : "",
            country: countryInput ? countryInput.value : "",
            deliverycode: deliverycodeInput ? deliverycodeInput.value : "",
            telephone: telephoneInput ? telephoneInput.value : "",
            mobile: mobileInput ? mobileInput.value : "",
            stage: stageInput ? stageInput.value : "",
            contacts: contactsInput ? contactsInput.value : "",
            role: roleInput ? roleInput.value : "",
          };

          fetch(peertubeHelpers.getBaseRouterRoute() + "/creator", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...peertubeHelpers.getAuthHeader(),
            },
            body: JSON.stringify(creatorsData),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("Erfolgreich erstellt:", data);
              getCreator();
            })
            .catch((error) => {
              console.log("Fehler beim Erstellen:", error);
            });
        }

        function updateTableRowToEditable(tableRow) {
          const cells = tableRow.querySelectorAll("td");

          cells.forEach((cell, index) => {
            if (index !== 0 && index !== cells.length - 2) {
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
          cancelButton.addEventListener("click", () => getCreator());
          cells[cells.length - 1].appendChild(cancelButton);
        }

        function saveTableRowChanges(tableRow) {
          const inputs = tableRow.querySelectorAll("input");
          const updatedData = Array.from(inputs).reduce((data, input) => {
            const key = input.id.replace("CellInput", "");
            data[key] = input.value;
            return data;
          }, {});

          const creatorId = tableRow.querySelector("#idCell").textContent;
          console.log(updatedData);
          fetch(
            `${peertubeHelpers.getBaseRouterRoute()}/creator/${creatorId}`,
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
              getCreator();
            })
            .catch((error) => {
              console.log("Error updating:", error);
            });
        }

        function getCreator() {
          const table = rootEl.querySelector("#myTable");
          const tableBody = table.querySelector("tbody");
          if (tableBody) {
            tableBody.remove();
          }

          fetch(peertubeHelpers.getBaseRouterRoute() + "/creator/", {
            method: "GET",
            headers: peertubeHelpers.getAuthHeader(),
          })
            .then((res) => res.json())
            .then((creators) => {
              const creatorContainer =
                rootEl.querySelector("#creatorContainer");
              if (creators.length == 0) {
                creatorContainer.textContent = "No Creator yet";
                return;
              } else {
                creatorContainer.textContent = "";
              }
              const newTableBody = document.createElement("tbody");
              const tableHeaderRow = document.createElement("tr");
              tableHeaderRow.innerHTML = `
                <th>ID</th>
                <th>Vorname</th>
                <th>Nachname</th>
                <th>Sendungsmacher Kürzel</th>
                <!-- <th>Beruf</th>
                <th>E-Mail</th>
                <th>Website URL</th>
                <th>Adresse</th>
                <th>Postleitzahl</th>
                <th>Stadt</th>
                <th>Bundesland</th>
                <th>Land</th>
                <th>Telefonnummer</th>
                <th>Mobiltelefonnummer</th>
                <th>Bühnenname</th>
                <th>Vernetzter Kontakt</th>
                <th>Role</th> -->
              `;
              newTableBody.appendChild(tableHeaderRow);
              creators.forEach((creator) => {
                const tableRow = document.createElement("tr");
                tableRow.innerHTML = `
              <td id="idCell">${creator.id}</td>
                    <td id="nameCell">${creator.name}</td>
                    <td id="familynameCell">${creator.familyname}</td>
                    <td id="usernameCell">${creator.username}</td>
                    <!-- <td id="occupationCell">${creator.occupation}</td>
                    <td id="emailCell">${creator.email}</td>
                    <td id="urlCell">${creator.url}</td>
                    <td id="addressCell">${creator.address}</td>
                    <td id="deliverycodeCell">${creator.deliverycode}</td>
                    <td id="cityCell">${creator.city}</td>
                    <td id="stateCell">${creator.state}</td>
                    <td id="countryCell">${creator.country}</td>
                    <td id="telephoneCell">${creator.telephone}</td>
                    <td id="mobileCell">${creator.mobile}</td>
                    <td id="stageCell">${creator.stage}</td>
                    <td id="contactsCell">${creator.contacts}</td> 
                    <td id="roleCell">${creator.role}</td>-->
                    <td>
                      <div class="modifyButton" data-id="${creator.id}" title="edit">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#4CBDC9" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                          <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                          <path d="M16 5l3 3" />
                        </svg>
                      </div>
                    </td>
                    <td>
                      <div class="deleteButton" data-id="${creator.id}" title="delete">
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

              const modifyButtons = rootEl.querySelectorAll(".modifyButton");
              modifyButtons.forEach((button) => {
                button.addEventListener("click", () => {
                  const creatorId = button.dataset.id;
                  console.log("Modify der Creator mit ID:", creatorId);
                  const tableRow = button.closest("tr");
                  updateTableRowToEditable(tableRow);
                });
              });

              const deleteButtons = rootEl.querySelectorAll(".deleteButton");
              deleteButtons.forEach((button) => {
                button.addEventListener("click", () => {
                  const creatorId = button.dataset.id;
                  const table = rootEl.querySelector("#myTable");
                  const existingConfirmationBoxes =
                    document.querySelectorAll("#confirmationBox");
                  existingConfirmationBoxes.forEach((box) => {
                    box.parentNode.removeChild(box);
                  });

                  const confirmationBox = document.createElement("div");
                  confirmationBox.id = "confirmationBox";
                  confirmationBox.innerHTML = `
                    <p>Sind Sie sicher, dass Sie den Creator löschen möchten?</p>
                    <p>ID: ${creatorId}</p>
                    <button id="confirmDeleteButton">Ja</button>
                    <button id="cancelDeleteButton">Nein</button>
                `;
                  table.appendChild(confirmationBox);

                  const confirmButton = rootEl.querySelector(
                    "#confirmDeleteButton"
                  );
                  confirmButton.addEventListener("click", () => {
                    console.log("Löschen der Creator mit ID:", creatorId);

                    fetch(
                      peertubeHelpers.getBaseRouterRoute() +
                        "/creator/" +
                        creatorId,
                      {
                        method: "DELETE",
                        headers: peertubeHelpers.getAuthHeader(),
                      }
                    )
                      .then((res) => res.json())
                      .then((data) => {
                        console.log("Erfolgreich gelöscht:", data);
                        table.removeChild(confirmationBox);
                        getCreator();
                      })
                      .catch((error) => {
                        console.log("Fehler beim Löschen:", error);
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
          getCreator();

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
                  transform: translate(-50%, -50%);
                  background-color: #4CBDC9;
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
