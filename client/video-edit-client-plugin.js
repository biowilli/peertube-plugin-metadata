async function register({ registerVideoField, peertubeHelpers }) {
  //TODO translate('hello');
  //TODO wird mehrmals aufgerufen

  function getData() {
    const fetchUsers = fetch("http://localhost:9000/api/v1/users", {
      method: "GET",
      headers: peertubeHelpers.getAuthHeader(),
    }).then((response) => response.json());

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
      fetchCreator,
      fetchUsers,
      fetchOrganizations,
      fetchGenre,
    ]).then(
      ([
        creatorResponse,
        usersResponse,
        organizationsResponse,
        genreResponse,
      ]) => {
        const creators = creatorResponse.data;
        //const users = usersResponse.data; user not needed now
        const organizations = organizationsResponse.data;
        const genre = genreResponse.data;

        console.log("creators:", creators);
        //console.log("users:", users);
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
            tab: "plugin-settings",
          };

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
              name: "title.title.note",
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
              name: "title.descriptiveTitle.note",
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
              name: "title.discTitle.note",
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
          //Headline Creator
          registerVideoField(
            {
              type: "html",
              html: "<h2>Creator</h2>",
              default: "",
              hidden: false,
              error: false,
            },
            {
              type,
              ...videoFormOptions,
            }
          );
          if (creators.length === 0) {
            registerVideoField(
              {
                type: "html",
                html: "Add a Creator in creator",
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
          }

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
          if (creators.length === 0) {
            registerVideoField(
              {
                type: "html",
                html: "Add a contributor in creators",
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
          }
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
          if (organizations === undefined || organizations.length === 0) {
            registerVideoField(
              {
                type: "html",
                html: "Füge noch in Organization einen Publisher hinzu",
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
            console.log(organizations);
            organizations.map((organisation) => {
              registerVideoField(
                {
                  name:
                    "organization" +
                    "-" +
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
          /*
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
*/
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
              descriptionHTML: "First Issued",
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
              label: "videoInformation.targetgroup",
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
              name: "videoInformation.rating.ratingScaleMaxValue",
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
              name: "rights.cobyright.coverage.startDate",
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
              name: "rights.cobyright.coverage.endDate",
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
              name: "rights.cobyright.coverage.locations",
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
              name: "rights.cobyright.explotationIssues",
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
              name: "rights.cobyright.disclaimer",
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
              name: "rights.cobyright.rightClearanceFlag",
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
              name: "rights.cobyright.rightId",
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

          //TODO Technical Data extract

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
        }
      }
    );
  }

  getData();
}

export { register };
