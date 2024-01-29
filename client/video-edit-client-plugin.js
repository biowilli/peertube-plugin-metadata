window.alpineJsElements = ["refCreator", "refContributor", "refOrganization"];
window.allCreator = [];
window.tabHasFocus = false;
window.elementsCreated = false;

const observer = new MutationObserver((mutatiionlist, observer) => {
  if (document.getElementById("refMain")) {
    if (!window.tabHasFocus) {
      window.tabHasFocus = true;
      console.log("MutationObserver");
      elementAvailable();
    }
  } else {
    window.tabHasFocus = false;
    window.elementsCreated = false;
  }
});

async function register({ registerVideoField, peertubeHelpers }) {
  registerVideoField(
    {
      name: "refMain",
      label: "refMain",
      descriptionHTML: "refMain",
      type: "input",
      default: "",
      hidden: function () {
        return true;
      },
    },
    {
      type: "update",
      tab: "plugin-settings",
    }
  );

  /*   registerVideoField(
    {
      type: "html",
      html: "Analyse-Tool (overwrite)",
      default: "",
      hidden: false,
      error: false,
    },
    {
      type: "update",
      tab: "main",
    }
  ); */

  for (const type of ["import-url", "import-torrent", "update", "go-live"]) {
    const videoFormOptions = {
      tab: "main",
    };

    registerVideoField(
      {
        type: "html",
        html: "Analyse-Tool (overwrite)",
        default: "",
        hidden: false,
        error: false,
      },
      {
        type,
        ...videoFormOptions,
      }
    );
    registerVideoField(
      {
        name: "analyseMediainfo",
        label: "with mediainfo",
        type: "input-checkbox",
        hidden: false,
        error: false,
      },
      {
        type,
        ...videoFormOptions,
        value: false,
      }
    );
  }

  function getData() {
    const fetchSettings = peertubeHelpers.getSettings();

    const fetchCreator = fetch(
      peertubeHelpers.getBaseRouterRoute() + "/creator/",
      {
        method: "GET",
        headers: peertubeHelpers.getAuthHeader(),
      }
    )
      .then((response) => response.json())
      .then((result) => (window.allCreator = result));

    const fetchOrganizations = fetch(
      peertubeHelpers.getBaseRouterRoute() + "/organization/",
      {
        method: "GET",
        headers: peertubeHelpers.getAuthHeader(),
      }
    )
      .then((response) => response.json())
      .then((result) => (window.allOrganization = result));

    Promise.all([fetchSettings, fetchCreator, fetchOrganizations]).then(
      ([settingsResponse, creatorResponse, organizationsResponse]) => {
        const creators = creatorResponse;
        const organizations = organizationsResponse;
        for (const type of [
          "upload",
          "import-url",
          "import-torrent",
          "update",
          "go-live",
        ]) {
          const videoFormOptions = {
            tab: "plugin-settings",
          };

          var form = JSON.parse(settingsResponse.form);

          //starts with mediainfo

          for (var i = 0; i < form.length; i++) {
            var field = form[i];

            if (field.visibleVideoEdit == false) {
              continue;
            }

            if (field.type === "line") {
              continue;
            }

            if (field.type == "entity") {
              if (field.mappingname == "refCreator") {
                if (creators == undefined || creators.length == 0) {
                  registerVideoField(
                    {
                      type: "html",
                      html: "Creator hinzufügen",
                      default: "",
                      hidden: false,
                      error: false,
                    },
                    {
                      type,
                      ...videoFormOptions,
                    }
                  );
                  continue;
                }
                //if (creators !== undefined && creators.length > 0) {
                registerVideoField(
                  {
                    name: "refCreator",
                    label: "Creator Field",
                    descriptionHTML: "Creator Field",
                    type: "input",
                    default: "",
                    hidden: () => false,
                  },
                  {
                    type,
                    ...videoFormOptions,
                    value: false,
                  }
                );
              }

              if (field.mappingname == "refContributor") {
                if (creators == undefined || creators.length == 0) {
                  registerVideoField(
                    {
                      type: "html",
                      html: "Add a contributor",
                      default: "",
                      hidden: false,
                      error: false,
                    },
                    {
                      type,
                      ...videoFormOptions,
                    }
                  );
                  continue;
                }

                if (creators !== undefined || creators.length > 0) {
                  registerVideoField(
                    {
                      name: "refContributor",
                      label: "Contributor Field",
                      descriptionHTML: "Contributor Field",
                      type: "input",
                      default: "",
                      hidden: () => false,
                    },
                    {
                      type,
                      ...videoFormOptions,
                      value: false,
                    }
                  );
                  continue;
                }
              }

              if (field.mappingname == "refOrganization") {
                if (organizations === undefined || organizations.length === 0) {
                  registerVideoField(
                    {
                      type: "html",
                      html: "Herausgeber hinzufügen",
                      default: "",
                      hidden: false,
                      error: false,
                    },
                    {
                      type,
                      ...videoFormOptions,
                    }
                  );
                  continue;
                }

                if (organizations !== undefined || organizations.length > 0) {
                  registerVideoField(
                    {
                      name: "refOrganization",
                      label: "Organization Field",
                      descriptionHTML: "Organization Field",
                      type: "input",
                      default: "",
                      hidden: () => false,
                    },
                    {
                      type,
                      ...videoFormOptions,
                      value: false,
                    }
                  );
                }
                continue;
              }
            }

            if (field.visibleVideoEdit && field.type === "checkbox") {
              registerVideoField(
                {
                  name: `${field.mappingname}`,
                  label: `${field.label}`,
                  descriptionHTML: `${field.caption}`,
                  type: "input-checkbox",
                  default: "",
                  hidden: false,
                  error: false,
                },
                {
                  type,
                  ...videoFormOptions,
                }
              );
            }
            if (field.visibleVideoEdit && field.type === "select") {
              registerVideoField(
                {
                  name: `${field.mappingname}`,
                  label: `${field.label}`,
                  descriptionHTML: `${field.caption}`,
                  type: "select",
                  options: field.options,
                  default: "",
                  hidden: false,
                  error: false,
                },
                {
                  type,
                  ...videoFormOptions,
                }
              );
            }
            if (field.visibleVideoEdit && field.type === "header") {
              registerVideoField(
                {
                  type: "html",
                  html: `<h${field.size}>${field.label}</h${field.size} class="test">`,
                  default: "",
                  hidden: false,
                  error: false,
                },
                {
                  type,
                  ...videoFormOptions,
                }
              );
              continue;
            }

            if (
              (field.type == "input" || field.type == "input-textarea") &&
              field.visibleVideoEdit
            ) {
              registerVideoField(
                {
                  name: `${field.mappingname}`,
                  label: `${field.label}`,
                  descriptionHTML: `${
                    field.caption != "" ? field.caption : "-"
                  }`,
                  type: field.type,
                  default: "",
                  error: ({ formValues, value }) => {
                    if (!field.required || value !== "")
                      return { error: false };
                    if (field.required && value == "")
                      return { error: true, text: "This Field ist required" };
                  },
                },
                {
                  type,
                  ...videoFormOptions,
                }
              );
            }
          }
        }
      }
    );
  }

  const script = document.createElement("script");
  script.defer = true;
  script.src = "https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js";
  document.body.append(script);

  getData();
}

// gather elements and data
//TODO: String representing the componenten configuration
//x-data: var creator
//hidden field UI Compente
//append multiselect
//display none hidden reference object

//Thanks to https://github.com/alexpechkarev/alpinejs-multiselect
window.addEventListener("alpine:init", () => {
  window.Alpine = Alpine;
  Alpine.data("alpineMuliSelect", (obj) => ({
    elementId: obj.elementId,
    options: [],
    selected: obj.selected,
    selectedElms: [],
    show: false,
    search: "",
    open() {
      this.show = true;
    },
    close() {
      this.show = false;
    },
    toggle() {
      this.show = !this.show;
    },
    isOpen() {
      return this.show === true;
    },

    // Initializing component

    init() {
      const options = document.getElementById(this.elementId).options;
      for (let i = 0; i < options.length; i++) {
        this.options.push({
          value: options[i].value,
          text: options[i].innerText,
          search: options[i].dataset.search,
          selected: Object.values(this.selected).includes(options[i].value),
        });

        if (this.options[i].selected) {
          this.selectedElms.push(this.options[i]);
        }
      }

      // searching for the given value
      this.$watch("search", (e) => {
        this.options = [];
        const options = document.getElementById(this.elementId).options;
        Object.values(options)
          .filter((el) => {
            var reg = new RegExp(this.search, "gi");
            return el.dataset.search.match(reg);
          })
          .forEach((el) => {
            let newel = {
              value: el.value,
              text: el.innerText,
              search: el.dataset.search,
              selected: Object.values(this.selected).includes(el.value),
            };
            this.options.push(newel);
          });
      });

      this.initUpdateReferences(this.elementId);
    },
    // clear search field
    clear() {
      this.search = "";
    },
    // deselect selected options
    deselect() {
      setTimeout(() => {
        this.selected = [];
        this.selectedElms = [];
        Object.keys(this.options).forEach((key) => {
          this.options[key].selected = false;
        });
      }, 100);
    },
    // select given option
    select(index, event) {
      if (!this.options[index].selected) {
        this.options[index].selected = true;
        this.options[index].element = event.target;
        this.selected.push(this.options[index].value);
        this.selectedElms.push(this.options[index]);
      } else {
        this.selected.splice(this.selected.lastIndexOf(index), 1);
        this.options[index].selected = false;
        Object.keys(this.selectedElms).forEach((key) => {
          if (this.selectedElms[key].value == this.options[index].value) {
            setTimeout(() => {
              this.selectedElms.splice(key, 1);
            }, 100);
          }
        });
      }
      this.updateReferences(this.elementId);
    },
    // remove from selected option
    remove(index, option) {
      this.selectedElms.splice(index, 1);
      Object.keys(this.options).forEach((key) => {
        if (this.options[key].value == option.value) {
          this.options[key].selected = false;
          Object.keys(this.selected).forEach((skey) => {
            if (this.selected[skey] == option.value) {
              this.selected.splice(skey, 1);
            }
          });
        }
      });
    },
    // filter out selected elements
    selectedElements() {
      return this.options.filter((op) => op.selected === true);
    },
    // get selected values
    selectedValues() {
      return this.options
        .filter((op) => op.selected === true)
        .map((el) => el.value);
    },
    selectedValuesString() {
      return this.selectedValues().join(", ");
    },
    selectedElementNamesString() {
      return this.selectedElements()
        .map((el) => el.text)
        .join(", ");
    },
    updateReferences(refId) {
      const selectorIndex = refId.indexOf("Selector");
      var reference = refId.substring(0, selectorIndex);
      var inputElements = document.getElementById(reference + "Values");
      inputElements.innerText = this.selectedElementNamesString();

      var inputValues = document.getElementById(reference);
      inputValues.value = this.selectedValuesString();

      inputValues.dispatchEvent(new Event("input"));
    },
    initUpdateReferences(refId) {
      const selectorIndex = refId.indexOf("Selector");
      var reference = refId.substring(0, selectorIndex);
      var inputValues = document.getElementById(reference);

      if (inputValues.value == undefined) {
        return;
      }
      var valueArray = inputValues.value.split(", ");
      var optionElements = document.getElementById(reference + "Options");

      valueArray.forEach((element) => {
        for (let i = 0; i < optionElements.children.length; i++) {
          const child = optionElements.children[i];
          if (child.firstChild.id === element) {
            child.firstChild.checked = true;
            break;
          }
        }

        for (var op of this.options) {
          if (op.value === element) {
            op.selected = true;
            break;
          }
        }
      });
      var inputElements = document.getElementById(reference + "Values");
      inputElements.innerText = this.selectedElementNamesString();
    },
  }));
});

//TODO: counter 60fps if element can not be found_ wait 30 s / counter = 1800 than return
const elementAvailable = () => {
  for (const element of window.alpineJsElements) {
    if (!document.getElementById(element)) {
      window.requestAnimationFrame(elementAvailable);
      return;
    }
  }
  var refElement = document.getElementById("refCreator");
  const parentElem =
    refElement.parentElement?.parentElement?.parentElement?.parentElement
      ?.parentElement?.parentElement?.parentElement?.parentElement;

  var tabsCollection = parentElem.getElementsByClassName("nav-tabs nav");
  var tabsDiv = tabsCollection[0];
  var lastTab = tabsDiv.lastElementChild;

  lastTab.addEventListener("click", () => {
    window.requestAnimationFrame(setSubElements());
  });
  var tabContent = parentElem.getElementsByClassName("tab-content");
  var tabContentObserver = tabContent[0];

  observer.observe(tabContentObserver, {
    attributes: false,
    childList: true,
    subtree: true,
  });

  setSubElements();
};

const setSubElements = () => {
  if (!window.elementsCreated) {
    registerDropdownElement("refCreator", window.allCreator);
    registerDropdownElement("refContributor", window.allCreator);
    registerDropdownElement("refOrganization", window.allOrganization);
    window.elementsCreated = true;
  }
};

function registerDropdownElement(ref, options, selector) {
  var selector = ref + "Selector";
  var refInput = document.getElementById(ref);
  var div = document.createElement("div");

  var selectedOption = [];
  var allSelectedIds = refInput.value
    .split(",")
    .map((element) => element.trim());
  options.map(function (option, index) {
    if (allSelectedIds.find((id) => id == option.id)) {
      selectedOption.push(index);
    }
  });

  div.setAttribute(
    "x-data",
    `alpineMuliSelect({selected:[${selectedOption}], elementId:'${selector}'})`
  );

  const divForInputs = document.createElement("div");

  divForInputs.id = ref + "Values";
  divForInputs.style.width = "400px";
  divForInputs.style.height = "30px";
  divForInputs.style.border = "1px solid #ccc";
  //TODO:style.overflow.hidden  does not work:
  //divForInputs.style.overflow.hidden = true;
  //divForInputs.style.whiteSpace = "nowrap";

  divForInputs.setAttribute(
    "x-on:click.outside",
    "$refs.divForOptions.style.display = 'none';"
  );

  const divForOptions = document.createElement("div");
  divForOptions.id = ref + "Options";
  divForOptions.style.display = "none";
  divForOptions.style.overflowY = "auto";
  divForOptions.style.maxHeight = "150px";
  divForOptions.style.border = "1px solid #ccc";
  let optionsVisible = false;
  divForOptions.setAttribute("x-ref", "divForOptions");

  divForInputs.addEventListener("click", (event) => {
    optionsVisible = !optionsVisible;

    if (optionsVisible) {
      divForOptions.style.display = "block";
    } else {
      divForOptions.style.display = "none";
    }
  });

  const select = document.createElement("select");
  refInput.parentElement.insertBefore(div, refInput);

  refInput.setAttribute("hidden", "false");
  select.setAttribute("hidden", "true");
  select.id = selector;

  options.forEach(function (creator, index) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = creator.id;
    const label = document.createElement("label");

    label.innerHTML = creator.name;

    const checkboxContainer = document.createElement("div");
    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(label);
    checkbox.setAttribute("x-on:click", "select(" + index + ", $event)");
    checkbox.addEventListener("click", (event) => {
      event.stopPropagation();
    });
    checkboxContainer.setAttribute(
      "x-on:click",
      "select(" + index + ", $event)"
    );
    checkboxContainer.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    checkboxContainer.addEventListener("click", (event) => {
      checkbox.checked = !checkbox.checked;
    });

    divForOptions.appendChild(checkboxContainer);
  });
  div.appendChild(divForInputs);
  div.appendChild(divForOptions);
  options.forEach(function (creator, index) {
    const opt = document.createElement("option");
    opt.value = creator.id;
    opt.innerHTML = creator.name;
    opt.setAttribute("x-on:click", "select(" + index + ", $event)");
    select.appendChild(opt);
  });

  div.append(select);

  refInput.parentElement?.parentElement?.parentElement?.removeAttribute(
    "hidden"
  );

  div.appendChild(refInput);
}

window.addEventListener("load", (event) => {
  var mutationObserver = document.getElementById("content");
  observer.observe(mutationObserver, {
    attributes: false,
    childList: true,
    subtree: true,
  });
});

export { register };
