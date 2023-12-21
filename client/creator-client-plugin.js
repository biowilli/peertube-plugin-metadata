// TODO: English form names
// Name
// Familyname
// Username
// Occupation
// E-Mail
// URL
// Address
// Delivery Code
// City
// State
// Country
// Telephone
// Mobile Phone
// Stage
// Related Contact
// Role

async function register({ registerClientRoute, peertubeHelpers }) {
  registerClientRoute({
    route: "metadata/creators",
    onMount: ({ rootEl }) => {
      rootEl.innerHTML = `
          <div id="plugincontainer">
          <h1>Creator</h1>
          <div id="formcontainer">
          <div>
          <label for="name">Vorname</label></br>
          <input type="text" id="name" name="name">
          </div>
          <div>
          <label for="familyname">Nachname</label></br>
          <input type="text" id="familyname" name="familyname">
          </div>
          <div>
          <label for="username">Sendungsmacher Kürzel</label></br>
          <input type="text" id="username" name="username">
          </div>
          <div>
          <label for="occupation">Beruf</label></br>
          <input type="text" id="occupation" name="occupation">
          </div>
          <div>
          <label for="email">E-Mail</label></br>
          <input type="text" id="email" name="email">
          </div>
          <div>
          <label for="url">Website URL</label></br>
          <input type="text" id="url" name="url">
          </div>
          <div>
          <label for="address">Adresse</label></br>
          <input type="text" id="address" name="address">
          </div>
          <div>
          <label for="deliverycode">Postleitzahl</label></br>
          <input type="text" id="deliverycode" name="deliverycode">
          </div>
          <div>
          <label for="city">Stadt</label></br>
          <input type="text" id="city" name="city">
          </div>
          <div>
          <label for="state">Bundesland</label></br>
          <input type="text" id="state" name="state">
          </div>
          <div>
          <label for="country">Land</label></br>
          <input type="text" id="country" name="country">
          </div>
          <div>
          <label for="telephone">Telefonnummer</label></br>
          <input type="text" id="telephone" name="telephone">
          </div>
          <div>
          <label for="mobile">Mobiltelefonnummer</label></br>
          <input type="text" id="mobile" name="mobile">
          </div>
          <div>
          <label for="stage">Bühnenname</label></br>
          <input type="text" id="stage" name="stage">
          </div>
          <div>
          <label for="contacts">Vernetzter Kontakt</label></br>
          <input type="text" id="contacts" name="contacts">        
          </div>
          <div>
          <label for="role">Role</label></br>
          <input type="text" id="role" name="role">       
          </div>
          </div>
          </br>
          <button id="myButton">Add Creator</button>
          <span id="errorMessage" style='color:red;'></span>
          <div id="creatorContainer"></div>
          <table id="myTable">
            <tr>
              <th>ID</th>
              <th>Vorname</th>
              <th>Nachname</th>
              <th>Sendungsmacher Kürzel</th>
              <th>Beruf</th>
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
            </tr>
          </table>
          <div>
        `;

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
          .then((data) => {
            var creator = data.data;
            const creatorContainer = rootEl.querySelector("#creatorContainer");
            if (creator.length == 0) {
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
                <th>Beruf</th>
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
                `;
            newTableBody.appendChild(tableHeaderRow);
            creator.forEach((creator) => {
              const tableRow = document.createElement("tr");
              tableRow.innerHTML = `
                    <td>${creator.id}</td>
                    <td>${creator.name}</td>
                    <td>${creator.familyname}</td>
                    <td>${creator.username}</td>
                    <td>${creator.occupation}</td>
                    <td>${creator.email}</td>
                    <td>${creator.url}</td>
                    <td>${creator.address}</td>
                    <td>${creator.deliverycode}</td>      
                    <td>${creator.city}</td>
                    <td>${creator.state}</td>
                    <td>${creator.country}</td>
                    <td>${creator.telephone}</td>
                    <td>${creator.mobile}</td>
                    <td>${creator.stage}</td>
                    <td>${creator.contacts}</td>
                    <td>${creator.role}</td>
                    <td>
                      <button class="deleteButton" data-id="${creator.id}">Löschen</button>
                    </td>
                  `;
              newTableBody.appendChild(tableRow);
            });

            table.appendChild(newTableBody);

            const deleteButtons = rootEl.querySelectorAll(".deleteButton");
            deleteButtons.forEach((button) => {
              button.addEventListener("click", () => {
                const creatorId = button.dataset.id;
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
                    getCreator();
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
      getCreator();
      const button = rootEl.querySelector("#myButton");
      button.addEventListener("click", () => {
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

        //required
        console.log(username);
        if (username.value == "") {
          errorMessage.textContent = "Sendungskürzel ist ein Pflichtfeld";
          return;
        }

        const creatorsData = {
          name: nameInput.value,
          familyname: familynameInput.value,
          username: usernameInput.value,
          occupation: occupationInput.value,
          email: emailInput.value,
          url: urlInput.value,
          address: addressInput.value,
          city: cityInput.value,
          state: stateInput.value,
          country: countryInput.value,
          deliverycode: deliverycodeInput.value,
          telephone: telephoneInput.value,
          mobile: mobileInput.value,
          stage: stageInput.value,
          contacts: contactsInput.value,
          role: roleInput.value,
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
      });

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
