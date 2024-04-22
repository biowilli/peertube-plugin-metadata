window.alpineJsElements = [
  "show.role.presenter",
  "show.role.guests",
  "show.role.contributor",
  "show.role.crew",
  "show.role.producer",
];
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
      hidden: () => {
        return true;
      },
    },
    {
      type: "update",
      tab: "plugin-settings",
    }
  );

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

          registerVideoField(
            {
              name: "refMain",
              label: "refMain",
              descriptionHTML: "refMain",
              type: "input",
              default: "",
              hidden: () => {
                return true;
              },
            },
            {
              type,
              ...videoFormOptions,
            }
          );

          var form = JSON.parse(settingsResponse.form);
          window.form = form;
          for (var i = 0; i < form.length; i++) {
            var field = form[i];

            if (field.type === "line") {
              continue;
            }

            if (field.type == "entity") {
              if (
                field.mappingname == "show.role.presenter" ||
                field.mappingname == "show.role.guests" ||
                field.mappingname == "show.role.contributor" ||
                field.mappingname == "show.role.crew"
              ) {
                if (creators == undefined || creators.length == 0) {
                  const currentFieldCreator = field;
                  registerVideoField(
                    {
                      type: "html",
                      html: "Creator hinzufügen",
                      default: "",
                      error: false,
                      hidden: () => {
                        return !currentFieldCreator.visibleVideoEdit;
                      },
                    },
                    {
                      type,
                      ...videoFormOptions,
                    }
                  );
                  continue;
                }

                registerVideoField(
                  {
                    name: field.mappingname,
                    label: field.label,
                    descriptionHTML: `${
                      field.caption != "" ? field.caption : "-"
                    }`,
                    type: "input",
                    default: "",
                  },
                  {
                    type,
                    ...videoFormOptions,
                    value: false,
                  }
                );
              }

              if (field.mappingname == "show.role.producer") {
                const currentFieldProducer = field;
                if (organizations === undefined || organizations.length === 0) {
                  registerVideoField(
                    {
                      type: "html",
                      html: "Herausgeber hinzufügen",
                      default: "",
                      error: false,
                      hidden: () => {
                        return !currentFieldProducer.visibleVideoEdit;
                      },
                    },
                    {
                      type,
                      ...videoFormOptions,
                    }
                  );
                  continue;
                }

                registerVideoField(
                  {
                    name: field.mappingname,
                    label: field.label,
                    descriptionHTML: `${
                      field.caption != "" ? field.caption : "-"
                    }`,
                    type: "input",
                    default: "",
                  },
                  {
                    type,
                    ...videoFormOptions,
                    value: false,
                  }
                );
              }
            }

            if (field.type === "checkbox") {
              const currentFieldCheckbox = field;
              registerVideoField(
                {
                  name: `${field.mappingname}`,
                  label: `${field.label}`,
                  descriptionHTML: `${
                    field.caption != "" ? field.caption : "-"
                  }`,
                  type: "input-checkbox",
                  default: "",
                  error: false,
                  hidden: () => {
                    return !currentFieldCheckbox.visibleVideoEdit;
                  },
                },
                {
                  type,
                  ...videoFormOptions,
                }
              );
            }
            if (field.type === "select") {
              const currentFieldSelect = field;
              registerVideoField(
                {
                  name: `${field.mappingname}`,
                  label: `${field.label}`,
                  descriptionHTML: `${
                    field.caption != "" ? field.caption : "-"
                  }`,
                  type: "select",
                  options: field.options,
                  default: "",
                  error: false,
                  hidden: () => {
                    return !currentFieldSelect.visibleVideoEdit;
                  },
                },
                {
                  type,
                  ...videoFormOptions,
                }
              );
            }
            if (field.type === "header") {
              const currentFieldHeader = field;
              registerVideoField(
                {
                  type: "html",
                  html: `<h${field.size}>${field.label}</h${field.size} class="test">`,
                  default: "",
                  error: false,
                  hidden: () => {
                    return !currentFieldHeader.visibleVideoEdit;
                  },
                },
                {
                  type,
                  ...videoFormOptions,
                }
              );
              continue;
            }

            if (field.type == "input" || field.type == "input-textarea") {
              const currentFieldInput = field;
              registerVideoField(
                {
                  name: `${field.mappingname}`,
                  label: `${field.label}`,
                  descriptionHTML: `${
                    field.caption != "" ? field.caption : "-"
                  }`,
                  type: field.type,
                  default: "",
                  hidden: () => {
                    return !currentFieldInput.visibleVideoEdit;
                  },
                  error: ({ formValues, value }) => {
                    console.log(currentFieldInput.mappingname);
                    console.log(
                      currentFieldInput.mappingname,
                      "required",
                      currentFieldInput.required
                    );
                    if (!currentFieldInput.required || value !== "")
                      return { error: false };
                    if (currentFieldInput.required && value == "")
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
      var noOptionSelected = true;

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
            noOptionSelected = false;
            break;
          }
        }
      });

      if (reference === "show.role.producer") {
        if (noOptionSelected) {
          for (var op of this.options) {
            if (op.text === "FS1") {
              op.selected = true;
              for (let i = 0; i < optionElements.children.length; i++) {
                const child = optionElements.children[i];
                if (child.firstChild.id === op.value) {
                  child.firstChild.checked = true;
                  break;
                }
              }

              var inputElements = document.getElementById(
                "show.role.producer" + "Values"
              );
              inputElements.innerText = this.selectedElementNamesString();

              var inputValues = document.getElementById(reference);
              inputValues.value = this.selectedValuesString();

              inputValues.dispatchEvent(new Event("input"));
              break;
            }
          }
        }
      }

      var inputElements = document.getElementById(reference + "Values");
      inputElements.innerText = this.selectedElementNamesString();
    },
  }));
});

const elementAvailable = () => {
  for (const element of window.alpineJsElements) {
    if (!document.getElementById(element)) {
      window.requestAnimationFrame(elementAvailable);
      return;
    }
  }
  var refElement = document.getElementById("show.role.presenter");
  /*   const parentElem =
    refElement.parentElement?.parentElement?.parentElement?.parentElement
      ?.parentElement?.parentElement?.parentElement?.parentElement; */
  var parentElem = refElement.parentElement;
  if (refElement && refElement.parentElement) {
    const firstParent = refElement.parentElement;
    if (firstParent.parentElement) {
      const secondParent = firstParent.parentElement;
      if (secondParent.parentElement) {
        const thirdParent = secondParent.parentElement;
        if (thirdParent.parentElement) {
          const fourthParent = thirdParent.parentElement;
          if (fourthParent.parentElement) {
            const fifthParent = fourthParent.parentElement;
            if (fifthParent.parentElement) {
              const sixthParent = fifthParent.parentElement;
              if (sixthParent.parentElement) {
                const seventhParent = sixthParent.parentElement;
                if (seventhParent.parentElement) {
                  const eightParent = seventhParent.parentElement;
                  if (eightParent.parentElement) {
                    parentElem = eightParent.parentElement;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

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
    registerDropdownElement("show.role.presenter", window.allCreator);
    registerDropdownElement("show.role.guests", window.allCreator);
    registerDropdownElement("show.role.contributor", window.allCreator);
    registerDropdownElement("show.role.crew", window.allCreator);
    registerDropdownElement(
      "show.role.producer",
      window.allOrganization,
      "FS1"
    );

    //CHECK ALL ELEMENTS FIELDS

    /*    for (var i = 0; i < window.form.length; i++) {
      var field = form[i];

      if (!field.visibleVideoEdit) {
        var elementId = field.mappingname;
        var element = document.getElementById(elementId);

        if (element) {
          var parentElement = element.parentElement.parentElement.parentElement;

          if (parentElement) {
            parentElement.style.display = "none";
          } else {
            console.log(
              "Das Elternelement des Elements mit der ID '" +
                elementId +
                "' wurde nicht gefunden."
            );
          }
        } else {
          console.log(
            "Das Element mit der ID '" + elementId + "' wurde nicht gefunden."
          );
        }
      } 
    } */

    window.elementsCreated = true;
  }
};

function registerDropdownElement(ref, options, defaultSelected) {
  var selector = ref + "Selector";
  var refInput = document.getElementById(ref);
  var div = document.createElement("div");

  options.sort((a, b) => a.name.localeCompare(b.name));

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

    var lastname =
      creator.familyname !== null && creator.familyname !== undefined
        ? creator.familyname
        : "";
    var fullname = creator.name + " " + lastname;
    label.innerHTML = fullname;

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
    var lastname =
      creator.familyname !== null && creator.familyname !== undefined
        ? creator.familyname
        : "";
    var fullname = creator.name + " " + lastname;
    opt.innerHTML = fullname;
    opt.setAttribute("x-on:click", "select(" + index + ", $event)");
    select.appendChild(opt);
  });

  div.append(select);

  var element = refInput.parentElement;

  if (element && element.parentElement) {
    const firstParent = element.parentElement;
    if (firstParent.parentElement) {
      const secondParent = firstParent.parentElement;
      if (secondParent.parentElement) {
        const thirdParent = secondParent.parentElement;
        if (thirdParent.parentElement) {
          thirdParent.removeAttribute("hidden");
        }
      }
    }
  }
  /* 
  refInput.parentElement?.parentElement?.parentElement?.removeAttribute(
    "hidden"
  ); */

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
