async function register({ registerVideoField, peertubeHelpers }) {
  //TODO wird mehrmals aufgerufen
  //TODO error Promise
  //Feld Dedinition Hardcoded 4 testing:

  console.log(" i need peertubeHelpers for form design:", peertubeHelpers);

  function getData() {
    const fetchSettings = peertubeHelpers.getSettings();

    const fetchCreator = fetch(
      peertubeHelpers.getBaseRouterRoute() + "/creator/all",
      {
        method: "GET",
        headers: peertubeHelpers.getAuthHeader(),
      }
    ).then((response) => response.json());

    const fetchOrganizations = fetch(
      peertubeHelpers.getBaseRouterRoute() + "/organization/all",
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
//TODO get form from settings: 
        console.log("settingsResponse:", settingsResponse);
        console.log("settingsResponseForm:", settingsResponse.form);
        console.log("settingsResponseFormObject:", );
        //console.log("settingsResponseFormObject:", JSON.parse(settingsResponse.form));
        console.log("creators:", creators);
        console.log("organizations:", organizations);
        console.log("genre:", genre);
        for (const type of [
          "upload",
          "import-url",
          "import-torrent",
          "update",
          "go-live",
        ]) {
          const videoFormOptions = {
            tab: "plugin-settings" 
          }; //"main",

          //TODO set multiple locations
          //TODO Location nach dates.coverage.recordingLocation
          //TODO Issued recordingLocations
          //TODO Video Information Genre
          //TODO Location
          //TODO rights.usageRights.coverage ???
          var form = JSON.parse(settingsResponse.form);
          
          for (var i = 0; i < form.length; i++) {
            var field = form[i];
            console.log(field);

            if (field.visibleVideoEdit == false){
              continue;
            } 

            if (field.type === "line"){ //only frontend
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
                      html: "Add a Creator",
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
                      name: "creator" + "-" + creator.id + "-" + creator.creatorname,
                      label: creator.creatorname,
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
            
              if (field.mappingname == 'contributor') {
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
                        name: "contributor" + "-" + creator.id + "-" + creator.creatorname,
                        label: creator.creatorname,
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

              if (field.mappingname == 'organization') {
                if (organizations === undefined || organizations.length === 0) {
                  registerVideoField(
                    {
                      type: "html",
                      html: "Add a organization",
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
                        name:"organization-" + organisation.id + "-" + organisation.name,
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

            if (field.visibleVideoEdit && field.type === 'checkbox') {
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
              );;
            }
            if (field.visibleVideoEdit && field.type === 'select') {
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
              );;
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
                  descriptionHTML: `${field.caption}`,
                  type: "input",
                  default: "",
                  error: ({ formValues, value }) => {
                    if (!field.required || value !== "") return { error: false }
                    if (field.required && value == "") return { error: true, text: 'This Field ist required' }
                  },
                },
                {
                  type,
                  ...videoFormOptions,
                }
              );
            }
          }
/*
          registerVideoField(
            {
              type: "html",
              html: `<h2>Title</h2>`,
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
              name: "title.title",
              label: "Title",
              descriptionHTML: "Title",
              type: "input",
              default: "",
              hidden: (options) => {
                console.log("hidden:", options);
                //TODO 

                return false;
              },
              error: async (options) => {
                console.log("options:", options);
                //TODO 
                //return
                //null | undefined
                //string error message,
                //error Promise
                return "true";
              },
            },
            {
              type,
              ...videoFormOptions,
            }
          );

          registerVideoField(
            {
              name: "title.titleNote",
              label: "Title Note",
              descriptionHTML: "Title Notiz",
              type: "input",
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
              name: "title.descriptiveTitle",
              label: "Descriptive Title",
              descriptionHTML: "Beschreibender Titel",
              type: "input",
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
              name: "title.descriptiveTitleNote",
              label: "Title Descriptive Note",
              descriptionHTML: "Beschreibender Titel Notiz",
              type: "input",
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
              name: "title.discTitle",
              label: "Alternative Title",
              descriptionHTML: "Untertitel",
              type: "input",
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
              name: "title.discTitleNote",
              label: "Alternative Title Note",
              descriptionHTML: "Untertitel Notiz",
              type: "input",
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
              name: "title.note",
              label: "Note",
              descriptionHTML: "Note",
              type: "input",
              default: "",
              hidden: false,
              error: false,
            },
            {
              type,
              ...videoFormOptions,
            }
          );


          //Headline Contributors
          registerVideoField(
            {
              type: "html",
              html: "<h2>Contributors</h2>",
              default: "",
              hidden: false,
              error: false,
            },
            {
              type,
              ...videoFormOptions,
            }
          );
          
          //Headline Publisher
          registerVideoField(
            {
              type: "html",
              html: "<h2>Publisher</h2>",
              default: "",
              hidden: false,
              error: false,
            },
            {
              type,
              ...videoFormOptions,
            }
          );
          

          //Headline Description
          registerVideoField(
            {
              type: "html",
              html: "<h2>Description</h2>",
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
              name: "description.tags",
              label: "Tags",
              descriptionHTML: "Tags mit ',' trennen",
              type: "input",
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
              name: "description.subject",
              label: "Subject",
              descriptionHTML: "Betreff",
              type: "input",
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
              name: "description.text",
              label: "text",
              descriptionHTML: "Text",
              type: "input",
              default: "",
              hidden: false,
              error: false,
            },
            {
              type,
              ...videoFormOptions,
            }
          );

          //Headline Dates
          registerVideoField(
            {
              type: "html",
              html: "<h2>Dates</h2>",
              default: "",
              hidden: false,
              error: false,
            },
            {
              type,
              ...videoFormOptions,
            }
          );
          //Headline coverage
          registerVideoField(
            {
              type: "html",
              html: "<h3>coverage</h3>",
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
              name: "dates.coverage.daterecorded",
              label: "daterecorded",
              descriptionHTML: "Date recorded",
              type: "input",
              default: "",
              hidden: false,
              error: false,
            },
            {
              type,
              ...videoFormOptions,
            }
          );

          //TODO set multiple locations
          
          organizations.map((organisation, index) => {
            registerVideoField(
              {
                name: "dates.coverage.recordingLocation" + index,
                label: "location" + index,
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

          //Headline Issued
          registerVideoField(
            {
              type: "html",
              html: "<h3>Issued</h3>",
              default: "",
              hidden: false,
              error: false,
            },
            {
              type,
              ...videoFormOptions,
            }
          );
          //TODO dates.coverage.recordingLocation
          registerVideoField(
            {
              name: "dates.issued.firstIssued",
              label: "First issued",
              descriptionHTML: "First issued",
              type: "input",
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
              name: "dates.issued.lastIssued",
              label: "Last issued",
              descriptionHTML: "Last Issued",
              type: "input",
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
              name: "dates.dateDigitalised",
              label: "date digitalised",
              descriptionHTML: "Date digitalised",
              type: "input",
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
              name: "dates.videoLinks",
              label: "video links",
              descriptionHTML: "Video Link(s)",
              type: "input",
              default: "",
              hidden: false,
              error: false,
            },
            {
              type,
              ...videoFormOptions,
            }
          );

          //Headline Publication History
          registerVideoField(
            {
              type: "html",
              html: "<h2>publicationHistory</h2>",
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
              name: "dates.publicationHistory",
              label: "publicationHistory",
              descriptionHTML:
                "Publication History setzen, also eine neue Version der Daten abspeichern",
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

          registerVideoField(
            {
              name: "dates.publicationHistory.firstPublicationDate",
              label: "firstPublicationDate",
              descriptionHTML: "firstPublicationDate",
              type: "input",
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
              name: "dates.publicationHistory.firstPublicationTime",
              label: "firstPublicationTime",
              descriptionHTML: "firstPublicationTime",
              type: "input",
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
              name: "dates.publicationHistory.firstPublicationChannel",
              label: "firstPublicationChannel",
              descriptionHTML: "firstPublicationChannel",
              type: "input",
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
              name: "dates.publicationHistory.repeatChannel",
              label: "repeatChannel",
              descriptionHTML: "repeatChannel",
              type: "input",
              default: "",
              hidden: false,
              error: false,
            },
            {
              type,
              ...videoFormOptions,
            }
          );

          //Headline Issued
          registerVideoField(
            {
              type: "html",
              html: "<h2>Archive</h2>",
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
              name: "dates.archiveData.filesize",
              label: "filesize",
              descriptionHTML: "filesize",
              type: "input",
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
              name: "dates.archiveData.filename",
              label: "filename",
              descriptionHTML: "Filename",
              type: "input",
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
              name: "dates.archiveData.archiveLocation",
              label: "archiveLocation",
              descriptionHTML: "archiveLocation",
              type: "input",
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
              name: "dates.archiveData.archiveFilePath",
              label: "archiveFilePath",
              descriptionHTML: "archiveFilePath",
              type: "input",
              default: "",
              hidden: false,
              error: false,
            },
            {
              type,
              ...videoFormOptions,
            }
          );

          //Headline Video Information
          registerVideoField(
            {
              type: "html",
              html: "<h2>Video Information</h2>",
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
              name: "videoInformation.genre",
              label: "genre",
              descriptionHTML: "Genre",
              type: "input",
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
              name: "videoInformation.targetgroup",
              label: "Target Group",
              descriptionHTML: "Zielgruppe",
              type: "input",
              default: "",
              hidden: false,
              error: false,
            },
            {
              type,
              ...videoFormOptions,
            }
          );

          //Headline ShowType
          registerVideoField(
            {
              type: "html",
              html: "<h3>Show Type</h3>",
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
              name: "videoInformation.showType.series",
              label: "series",
              descriptionHTML: "Series",
              type: "select",
              options: [
                { label: "Season", value: "season" },
                { label: "Episode", value: "episode" },
              ],

              default: "",
              hidden: false,
              error: false,
            },
            {
              type,
              ...videoFormOptions,
            }
          );
          if (genre === undefined || genre.length === 0) {
            registerVideoField(
              {
                label: "genre",
                descriptionHTML: "Genre",
                type: "html",
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
                type: "html",
                html: "Füge noch in Genres einen Genre hinzu",
                default: "",
                hidden: false,
                error: false,
              },
              {
                type,
                ...videoFormOptions,
              }
            );
          } else {
            const genreOptions = genre.map((x) => {
              return { label: x.name, value: x.id };
            });

            registerVideoField(
              {
                name: "videoInformation.showType.type",
                label: "genre",
                descriptionHTML: "genre",
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
          }
          registerVideoField(
            {
              name: "videoInformation.parts",
              label: "Parts",
              descriptionHTML: "Parts",
              type: "input",
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
              name: "videoInformation.version",
              label: "Version",
              descriptionHTML: "Version",
              type: "input",
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
              name: "videoInformation.language",
              label: "Language",
              descriptionHTML: "Language",
              type: "input",
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
              name: "videoInformation.relation",
              label: "Relation",
              descriptionHTML: "Relation",
              type: "input",
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
              name: "videoInformation.source",
              label: "Source",
              descriptionHTML: "Source",
              type: "input",
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
              name: "videoInformation.category",
              label: "category",
              descriptionHTML: "category",
              type: "select",
              options: [
                { label: "Season", value: "season" },
                { label: "Episode", value: "episode" },
              ],
              default: "",
              hidden: false,
              error: false,
            },
            {
              type,
              ...videoFormOptions,
            }
          );

          //Headline Publication History
          registerVideoField(
            {
              type: "html",
              html: "<h2>Rating</h2>",
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
              name: "videoInformation.rating.ratingValue",
              label: "ratingValue",
              descriptionHTML: "ratingValue",
              type: "input",
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
              name: "videoInformation.rating.ratingScaleMinValue",
              label: "ratingScaleMinValue",
              descriptionHTML: "ratingScaleMinValue",
              type: "input",
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
              name: "videoInformation.rating.ratingScaleMaxValue",
              label: "ratingScaleMaxValue",
              descriptionHTML: "ratingScaleMaxValue",
              type: "input",
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
              name: "videoInformation.rating.notes",
              label: "Notes",
              descriptionHTML: "Notes",
              type: "input",
              default: "",
              hidden: false,
              error: false,
            },
            {
              type,
              ...videoFormOptions,
            }
          );

          //Headline Rights
          registerVideoField(
            {
              type: "html",
              html: "<h2>Rights</h2>",
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
              type: "html",
              html: "<h3>Copyright</h3>",
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
              type: "html",
              html: "<h4>Coverage</h4>",
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
              name: "rights.copyright.coverage.startDate",
              label: "startDate",
              descriptionHTML: "Start Datum",
              type: "input",
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
              name: "rights.copyright.coverage.endDate",
              label: "endDate",
              descriptionHTML: "End Datum",
              type: "input",
              default: "",
              hidden: false,
              error: false,
            },
            {
              type,
              ...videoFormOptions,
            }
          );
          //TODO Locations
          registerVideoField(
            {
              name: "rights.copyright.coverage.locations",
              label: "locations",
              descriptionHTML: "locations",
              type: "input",
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
              type: "html",
              html: "<h4>Right Holder</h4>",
              default: "",
              hidden: false,
              error: false,
            },
            {
              type,
              ...videoFormOptions,
            }
          );

          //TODO Organistations for Rights

          registerVideoField(
            {
              name: "rights.copyright.explotationIssues",
              label: "explotationIssues",
              descriptionHTML: "explotationIssues",
              type: "input",
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
              name: "rights.copyright.disclaimer",
              label: "disclaimer",
              descriptionHTML: "disclaimer",
              type: "input",
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
              name: "rights.copyright.rightClearanceFlag",
              label: "Right Clearance Flag?",
              descriptionHTML: "disclaimer",
              type: "input",
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
              name: "rights.copyright.rightId",
              label: "Right ID?",
              descriptionHTML: "rightId",
              type: "input",
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
              type: "html",
              html: "<h3>usage rights</h3>",
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
              name: "rights.usageRights.coverage",
              label: "Coverage",
              descriptionHTML: "Coverage",
              type: "input",
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
              name: "rights.usageRights.coverage",
              label: "Coverage",
              descriptionHTML: "Coverage",
              type: "input",
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
              type: "html",
              html: "<h4>Right Holder</h4>",
              default: "",
              hidden: false,
              error: false,
            },
            {
              type,
              ...videoFormOptions,
            }
          );

          //TODO Organistations for Rights

          registerVideoField(
            {
              name: "rights.usageRights.explotationIssues",
              label: "explotationIssues",
              descriptionHTML: "explotationIssues",
              type: "input",
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
              name: "rights.usageRights.disclaimer",
              label: "disclaimer",
              descriptionHTML: "disclaimer",
              type: "input",
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
              name: "rights.usageRights.rightClearanceFlag",
              label: "Right Clearance Flag?",
              descriptionHTML: "disclaimer",
              type: "input",
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
              name: "rights.usageRights.rightId",
              label: "Right ID?",
              descriptionHTML: "rightId",
              type: "input",
              default: "",
              hidden: false,
              error: false,
            },
            {
              type,
              ...videoFormOptions,
            }
          );

          //Headline Metadata provider
          registerVideoField(
            {
              type: "html",
              html: "<h2>Metadata provider</h2>",
              default: "",
              hidden: false,
              error: false,
            },
            {
              type,
              ...videoFormOptions,
            }
          );

          //TODO Metadata Provider
          //TODO Technical Data extract
          //Headline Technical data
          registerVideoField(
            {
              type: "html",
              html: "<h2>Technical data</h2>",
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
              name: "videoformat",
              label: "videoformat",
              descriptionHTML: "with",
              type: "input",
              default: "",
              hidden: false,
              error: false,
            },
            {
              type,
              ...videoFormOptions,
            }
          );
          */
        }
      }
    );
  }
  getData();
}

export { register };

