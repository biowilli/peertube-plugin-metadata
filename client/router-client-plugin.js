async function register({ registerHook, peertubeHelpers }) {
  registerHook({
    target: "filter:left-menu.links.create.result",
    handler: (links) => {
      if (peertubeHelpers.isLoggedIn()) {
        console.log("peertubeHelpers.role?", peertubeHelpers);
        var newlinksection = {
          key: "metadata",
          title: "Metadata Plugin",
          links: [
            {
              icon: "home",
              path: "/p/metadata/creators",
              shortLabel: "Creator",
            },
            {
              icon: "home",
              path: "/p/metadata/organizations",
              shortLabel: "Organizations",
            },
            {
              icon: "home",
              path: "/p/metadata/genres",
              shortLabel: "Genre",
            },
            {
              icon: "home",
              path: "/admin/plugins/show/peertube-plugin-metadata",
              shortLabel: "Settings",
            },
          ],
        };

        links.push(newlinksection);
      }
      return links;
    },
  });
}

export { register };
