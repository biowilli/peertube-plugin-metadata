async function register({ registerVideoField, peertubeHelpers }) {
  //TODO wird mehrmals aufgerufen
  //TODO error Promise
  //Feld Dedinition Hardcoded 4 testing:
  //TODO Fetch Language id instead nice to have
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

    const fetchGenre = fetch(
      peertubeHelpers.getBaseRouterRoute() + "/genre/all",
      {
        method: "GET",
        headers: peertubeHelpers.getAuthHeader(),
      }
    ).then((response) => response.json());

    Promise.all([
      fetchSettings,
      fetchCreator,
      fetchOrganizations,
      fetchGenre,
    ]).then(
      ([
        settingsResponse,
        creatorResponse,
        organizationsResponse,
        genreResponse,
      ]) => {
        const creators = creatorResponse.data;
        const organizations = organizationsResponse.data;
        const genre = genreResponse.data;

        for (const type of [
          "upload",
          "import-url",
          "import-torrent",
          "update",
          "go-live",
        ]) {
          const videoFormOptions = {
            tab: "plugin-settings",
          }; //"main",

          //TODO set multiple locations
          //TODO Location nach dates.coverage.recordingLocation
          //TODO Issued recordingLocations
          //TODO Video Information Genre
          //TODO Location
          //TODO rights.usageRights.coverage ???
          var form = JSON.parse(settingsResponse.form);
          console.log("form123123123123123", form);
          for (var i = 0; i < form.length; i++) {
            var field = form[i];
            console.log(field);

            if (field.visibleVideoEdit == false) {
              continue;
            }

            if (field.type === "line") {
              //only frontend
              continue;
            }

            if (field.type == "entity") {
              if (field.mappingname == "videoInformation.showType.type") {
                if (genre === undefined || genre.length === 0) {
                  registerVideoField(
                    {
                      type: "Add a Genre",
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
                } else {
                  const genreOptions = genre.map((x) => {
                    return { label: x.name, value: x.id };
                  });

                  registerVideoField(
                    {
                      name: "videoInformation.showType.type",
                      label: `${field.label}`,
                      descriptionHTML: `${field.caption}`,
                      type: "select",
                      options: genreOptions,
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
              }

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

            if (field.visibleVideoEdit && field.type == "input") {
              registerVideoField(
                {
                  name: `${field.mappingname}`,
                  label: `${field.label}`,
                  descriptionHTML: `${
                    field.caption != "" ? field.caption : "-"
                  }`,
                  type: "input",
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

export { register };
