// English form names
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
          <label for="creatorname">Vorname</label></br>
          <input type="text" id="creatorname" name="creatorname">
          </div>
          <div>
          <label for="creatorfamilyname">Nachname</label></br>
          <input type="text" id="creatorfamilyname" name="creatorfamilyname">
          </div>
          <div>
          <label for="creatorusername">Sendungsmacher Kürzel</label></br>
          <input type="text" id="creatorusername" name="creatorusername">
          </div>
          <div>
          <label for="creatoroccupation">Beruf</label></br>
          <input type="text" id="creatoroccupation" name="creatoroccupation">
          </div>
          <div>
          <label for="creatoremail">E-Mail</label></br>
          <input type="text" id="creatoremail" name="creatoremail">
          </div>
          <div>
          <label for="creatorurl">Website URL</label></br>
          <input type="text" id="creatorurl" name="creatorurl">
          </div>
          <div>
          <label for="creatoraddress">Adresse</label></br>
          <input type="text" id="creatoraddress" name="creatoraddress">
          </div>
          <div>
          <label for="creatordeliverycode">Postleitzahl</label></br>
          <input type="text" id="creatordeliverycode" name="creatordeliverycode">
          </div>
          <div>
          <label for="creatorcity">Stadt</label></br>
          <input type="text" id="creatorcity" name="creatorcity">
          </div>
          <div>
          <label for="creatorstate">Bundesland</label></br>
          <input type="text" id="creatorstate" name="creatorstate">
          </div>
          <div>
          <label for="creatorcountry">Land</label></br>
          <input type="text" id="creatorcountry" name="creatorcountry">
          </div>
          <div>
          <label for="creatortelephone">Telefonnummer</label></br>
          <input type="text" id="creatortelephone" name="creatortelephone">
          </div>
          <div>
          <label for="creatormobile">Mobiltelefonnummer</label></br>
          <input type="text" id="creatormobile" name="creatormobile">
          </div>
          <div>
          <label for="creatorstage">Bühnenname</label></br>
          <input type="text" id="creatorstage" name="creatorstage">
          </div>
          <div>
          <label for="creatorcontacts">Vernetzter Kontakt</label></br>
          <input type="text" id="creatorcontacts" name="creatorcontacts">        
          </div>
          <div>
          <label for="creatorrole">Role</label></br>
          <input type="text" id="creatorrole" name="creatorrole">       
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
        console.log("getAuthHeader");
        console.log("");
        console.log(peertubeHelpers.getAuthHeader());

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
                <th>Given name</th>
                <th>Family name</th>
                <th>Username</th>
                <th>Occupation</th>
                <th>Email</th>  
                <th>Url</th>  
                <th>Address</th>
                <th>Delivery Code</th>    
                <th>City</th>  
                <th>State</th>  
                <th>Country</th>  
                <th>Telephone Number</th>  
                <th>Mobile Telephone Number</th>  
                <th>Stage name</th>  
                <th>Related contacts</th> 
                <th>Role</th> 
                `;
            newTableBody.appendChild(tableHeaderRow);
            creator.forEach((creator) => {
              const tableRow = document.createElement("tr");
              tableRow.innerHTML = `
                    <td>${creator.id}</td>
                    <td>${creator.creatorname}</td>
                    <td>${creator.creatorfamilyname}</td>
                    <td>${creator.creatorusername}</td>
                    <td>${creator.creatoroccupation}</td>
                    <td>${creator.creatoremail}</td>
                    <td>${creator.creatorurl}</td>
                    <td>${creator.creatoraddress}</td>
                    <td>${creator.creatordeliverycode}</td>      
                    <td>${creator.creatorcity}</td>
                    <td>${creator.creatorstate}</td>
                    <td>${creator.creatorcountry}</td>
                    <td>${creator.creatortelephone}</td>
                    <td>${creator.creatormobile}</td>
                    <td>${creator.creatorstage}</td>
                    <td>${creator.creatorcontacts}</td>
                    <td>${creator.creatorrole}</td>
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
        var creatorNameInput = rootEl.querySelector("#creatorname");
        var creatorFamilynameInput = rootEl.querySelector("#creatorfamilyname");
        var creatorUsernameInput = rootEl.querySelector("#creatorusername");
        var creatorOccupationInput = rootEl.querySelector("#creatoroccupation");
        var creatorEmailInput = rootEl.querySelector("#creatoremail");
        var creatorURLInput = rootEl.querySelector("#creatorurl");
        var creatorAddressInput = rootEl.querySelector("#creatoraddress");
        var creatorCityInput = rootEl.querySelector("#creatorcity");
        var creatorStateInput = rootEl.querySelector("#creatorstate");
        var creatorCountryInput = rootEl.querySelector("#creatorcountry");
        var creatorDeliveryCodeInput = rootEl.querySelector(
          "#creatordeliverycode"
        );
        var creatorTelephoneInput = rootEl.querySelector("#creatortelephone");
        var creatorMobileInput = rootEl.querySelector("#creatormobile");
        var creatorStageInput = rootEl.querySelector("#creatorstage");
        var creatorContactsInput = rootEl.querySelector("#creatorcontacts");
        var creatorRoleInput = rootEl.querySelector("#creatorrole");

        //required
        console.log(creatorusername);
        if (creatorusername.value == ""){
          errorMessage.textContent = "Sendungskürzel ist ein Pflichtfeld";
          return;
        }

        const creatorsData = {
          name: creatorNameInput.value,
          familyname: creatorFamilynameInput.value,
          username: creatorUsernameInput.value,
          occupation: creatorOccupationInput.value,
          email: creatorEmailInput.value,
          url: creatorURLInput.value,
          address: creatorAddressInput.value,
          city: creatorCityInput.value,
          state: creatorStateInput.value,
          country: creatorCountryInput.value,
          deliverycode: creatorDeliveryCodeInput.value,
          telephone: creatorTelephoneInput.value,
          mobile: creatorMobileInput.value,
          creatorstage: creatorStageInput.value,
          contacts: creatorContactsInput.value,
          role: creatorRoleInput.value,
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
