async function register({ registerClientRoute, peertubeHelpers }) {
  registerClientRoute({
    route: "metadata/genres",
    onMount: ({ rootEl }) => {
      rootEl.innerHTML = `
          <div id="plugincontainer">
          <h1>Genre</h1>
          <input type="text" id="genrename" name="genrename"></input>
          <button id="myButton">Genre hinzufügen</button>
          <div id="genreContainer"></div>
          <table id="myTable">
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </table>
          <div>
        `;

      function getGenre() {
        const table = rootEl.querySelector("#myTable");
        const tableBody = table.querySelector("tbody");
        if (tableBody) {
          tableBody.remove();
        }

        fetch(peertubeHelpers.getBaseRouterRoute() + "/genre/all", {
          method: "GET",
          headers: peertubeHelpers.getAuthHeader(),
        })
          .then((res) => res.json())
          .then((data) => {
            var genre = data.data;
            const genreContainer = rootEl.querySelector("#genreContainer");
            if (genre.length == 0) {
              genreContainer.textContent = "Noch keine Genre vorhanden";
              return;
            } else {
              genreContainer.textContent = "";
            }
            const newTableBody = document.createElement("tbody");
            const tableHeaderRow = document.createElement("tr");
            tableHeaderRow.innerHTML = `
                  <th>ID</th>
                  <th>Name</th>
                  <th></th>
                `;
            newTableBody.appendChild(tableHeaderRow);

            genre.forEach((genre) => {
              const tableRow = document.createElement("tr");
              tableRow.innerHTML = `
                    <td>${genre.id}</td>
                    <td>${genre.name}</td>
                    <td>
                      <button class="deleteButton" data-id="${genre.id}">Löschen</button>
                    </td>
                  `;
              newTableBody.appendChild(tableRow);
            });

            table.appendChild(newTableBody);

            const deleteButtons = rootEl.querySelectorAll(".deleteButton");
            deleteButtons.forEach((button) => {
              button.addEventListener("click", () => {
                const genreId = button.dataset.id;
                console.log("Löschen der Genre mit ID:", genreId);

                fetch(
                  peertubeHelpers.getBaseRouterRoute() +
                    "/genre/delete/" +
                    genreId,
                  {
                    method: "DELETE",
                    headers: peertubeHelpers.getAuthHeader(),
                  }
                )
                  .then((res) => res.json())
                  .then((data) => {
                    console.log("Erfolgreich gelöscht:", data);
                    getGenre();
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
      getGenre();
      const button = rootEl.querySelector("#myButton");
      button.addEventListener("click", () => {
        const genreNameInput = rootEl.querySelector("#genrename");
        const genresName = genreNameInput.value;
        console.log(genresName);
        fetch(peertubeHelpers.getBaseRouterRoute() + "/genre/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...peertubeHelpers.getAuthHeader(),
          },
          body: JSON.stringify({ name: genresName }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Erfolgreich erstellt:", data);
            getGenre();
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
