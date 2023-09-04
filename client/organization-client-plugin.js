async function register({ registerClientRoute, peertubeHelpers }) {
  registerClientRoute({
    route: "metadata/organizations",
    onMount: ({ rootEl }) => {
      rootEl.innerHTML = `
          <div id="plugincontainer">
          <h1>Organization</h1>
          <input type="text" id="organizationname" name="organizationname"></input>
          <button id="myButton">Organization hinzufügen</button>
          <div id="organizationContainer"></div>
          <table id="myTable">
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </table>
          <div>
        `;

      function getOrganization() {
        const table = rootEl.querySelector("#myTable");
        const tableBody = table.querySelector("tbody");
        if (tableBody) {
          tableBody.remove();
        }

        fetch(peertubeHelpers.getBaseRouterRoute() + "/organization/all", {
          method: "GET",
          headers: peertubeHelpers.getAuthHeader(),
        })
          .then((res) => res.json())
          .then((data) => {
            var organization = data.data;
            const organizationContainer = rootEl.querySelector(
              "#organizationContainer"
            );
            if (organization.length == 0) {
              organizationContainer.textContent =
                "Noch keine Organization vorhanden";
              return;
            } else {
              organizationContainer.textContent = "";
            }
            const newTableBody = document.createElement("tbody");
            const tableHeaderRow = document.createElement("tr");
            tableHeaderRow.innerHTML = `
                  <th>ID</th>
                  <th>Name</th>
                  <th></th>
                `;
            newTableBody.appendChild(tableHeaderRow);

            organization.forEach((organization) => {
              const tableRow = document.createElement("tr");
              tableRow.innerHTML = `
                    <td>${organization.id}</td>
                    <td>${organization.name}</td>
                    <td>
                      <button class="deleteButton" data-id="${organization.id}">Löschen</button>
                    </td>
                  `;
              newTableBody.appendChild(tableRow);
            });

            table.appendChild(newTableBody);

            const deleteButtons = rootEl.querySelectorAll(".deleteButton");
            deleteButtons.forEach((button) => {
              button.addEventListener("click", () => {
                const organizationId = button.dataset.id;
                console.log("Löschen der Organization mit ID:", organizationId);

                fetch(
                  peertubeHelpers.getBaseRouterRoute() +
                    "/organization/delete/" +
                    organizationId,
                  {
                    method: "DELETE",
                    headers: peertubeHelpers.getAuthHeader(),
                  }
                )
                  .then((res) => res.json())
                  .then((data) => {
                    console.log("Erfolgreich gelöscht:", data);
                    getOrganization();
                  })
                  .catch((error) => {
                    console.log("Fehler beim Löschen:", error);
                  });
              });
            });
          })
          .catch((error) => {
            console.log("Error:", error);
          });
      }
      getOrganization();
      const button = rootEl.querySelector("#myButton");
      button.addEventListener("click", () => {
        const organizationNameInput = rootEl.querySelector("#organizationname");
        const organizationsName = organizationNameInput.value;
        console.log(organizationsName);
        fetch(peertubeHelpers.getBaseRouterRoute() + "/organization/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...peertubeHelpers.getAuthHeader(),
          },
          body: JSON.stringify({ name: organizationsName }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Erfolgreich erstellt:", data);
            getOrganization();
          })
          .catch((error) => {
            console.log("Fehler beim Erstellen:", error);
          });
      });

      // CSS-Stile der Seite
      const style = document.createElement("style");
      style.innerHTML = `
          #plugincontainer {
            width: fit-content;
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
