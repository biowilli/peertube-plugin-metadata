async function register({ registerVideoField, peertubeHelpers }) {
  //TODO: error Promise for
  //TODO: Fetch Language id instead nice to have

  console.log("check how often this is called");
  for (const type of ["import-url", "import-torrent", "update", "go-live"]) {
    const videoFormOptions = {
      tab: "main",
    };
    console.log("check how often this is called 2");
    //TODO: wenn dies gesynced wird dann wird es überschrieben von der Datenbank
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
    ).then((response) => response.json());

    const fetchOrganizations = fetch(
      peertubeHelpers.getBaseRouterRoute() + "/organization/",
      {
        method: "GET",
        headers: peertubeHelpers.getAuthHeader(),
      }
    ).then((response) => response.json());

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
          for (var i = 0; i < form.length; i++) {
            var field = form[i];

            if (field.visibleVideoEdit == false) {
              continue;
            }

            if (field.type === "line") {
              continue;
            }

            if (field.type == "entity") {
              if (field.mappingname == "creator") {
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
                if (creators !== undefined || creators.length > 0) {
                  creators.map((creator) => {
                    registerVideoField(
                      {
                        name: "creator" + "-" + creator.id + "-" + creator.name,
                        label: creator.name,
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
                  });
                  continue;
                }
              }

              if (field.mappingname == "contributor") {
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
                  creators.map((creator) => {
                    registerVideoField(
                      {
                        name:
                          "contributor" + "-" + creator.id + "-" + creator.name,
                        label: creator.name,
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
                  });
                  continue;
                }
              }

              if (field.mappingname == "organization") {
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
                  organizations.map((organisation) => {
                    registerVideoField(
                      {
                        name:
                          "organization-" +
                          organisation.id +
                          "-" +
                          organisation.name,
                        label: organisation.name,
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
                  });
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
                  html: `<h${field.size}>${field.label}</h${field.size}>`,
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
  getData();
}
// TODO:

export { register };
