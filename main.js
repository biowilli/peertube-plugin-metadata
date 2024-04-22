const { CreatorDAO } = require("./server/dataAccessObjects/CreatorDAO.js");
const {
  OrganizationDAO,
} = require("./server/dataAccessObjects/OrganizationDAO.js");
const {
  SyncedMetadataDAO,
} = require("./server/dataAccessObjects/SyncedMetadataDAO.js");
const { MetadataDAO } = require("./server/dataAccessObjects/MetadataDAO.js");
const { MergeHelper } = require("./server/MergeHelper.js");

const { initRegisterSettings } = require("./server/Settings.js");
const { initCategoryController } = require("./server/controller/category.js");
const { initLanguageController } = require("./server/controller/language.js");
const { initLicenceController } = require("./server/controller/licence.js");
const { initCreatorController } = require("./server/controller/creator.js");
const {
  initOrganizationController,
} = require("./server/controller/organization.js");
const { initMigrateController } = require("./server/controller/migrate.js");
const { initMetadataController } = require("./server/controller/metadata.js");
const {
  initSidecarfileController,
} = require("./server/controller/sidecarfile.js");

const { initVideoUpdateHooks } = require("./server/hooks/videoUpdateHooks.js");
const { initVideoUploadHooks } = require("./server/hooks/videoUploadHooks.js");
const { initVideoResultHooks } = require("./server/hooks/videoResultHooks.js");

async function register({
  registerHook,
  getRouter,
  videoLanguageManager,
  videoLicenceManager,
  videoCategoryManager,
  peertubeHelpers,
  registerSetting,
  peertubeHelpers: { videos: peertubeVideosHelpers },
}) {
  initRegisterSettings(registerSetting);
  console.log("Initialized plugin settings");

  // init DataAccessObjects
  var creatorDAO = new CreatorDAO(peertubeHelpers);
  var organizationDAO = new OrganizationDAO(peertubeHelpers);

  var metadataDAO = new MetadataDAO(peertubeHelpers);
  var syncedMetadataDAO = new SyncedMetadataDAO(peertubeHelpers);

  console.log("Initialized data access objects");

  // init Controllers
  var router = getRouter();
  initCreatorController(creatorDAO, router);
  initOrganizationController(organizationDAO, router);

  initLanguageController(router, videoLanguageManager);
  initLicenceController(router, videoLicenceManager);
  initCategoryController(router, videoCategoryManager);

  initMigrateController(router, metadataDAO, syncedMetadataDAO);
  initMetadataController(router, syncedMetadataDAO);
  initSidecarfileController(
    router,
    syncedMetadataDAO,
    creatorDAO,
    organizationDAO,
    videoLicenceManager
  );
  console.log("Initialized controllers");

  var mergeHelper = new MergeHelper();
  // init Hooks
  initVideoUploadHooks(registerHook, peertubeVideosHelpers, metadataDAO);

  initVideoUpdateHooks(
    registerHook,
    mergeHelper,
    syncedMetadataDAO,
    metadataDAO
  );
  initVideoResultHooks(registerHook, syncedMetadataDAO);
}

module.exports = {
  register,
  unregister,
};

async function unregister() {
  return;
}
