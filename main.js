const { EBUDefaults } = require("./model/EbuDefaults.js");

const { CreatorDAO } = require("./server/dataAccessObjects/CreatorDAO.js");
const {
  OrganizationDAO,
} = require("./server/dataAccessObjects/OrganizationDAO.js");
const {
  VideoMetadataDAO,
} = require("./server/dataAccessObjects/VideoMetadataDAO.js");
const {
  FfprobeMetadataDAO,
} = require("./server/dataAccessObjects/FfprobeMetadataDAO.js");
const {
  MediainfoMetadataDAO,
} = require("./server/dataAccessObjects/MediainfoMetadataDAO.js");
const {
  MediainfoEbuMetadataDAO,
} = require("./server/dataAccessObjects/MediainfoEbuMetadataDAO.js");
const {
  MetadataEBUDefaultDAO,
} = require("./server/dataAccessObjects/MetadataEBUDefaultDAO.js");

const { initRegisterSettings } = require("./server/settings.js");
const { initCategoryController } = require("./server/controller/category.js");
const { initLanguageController } = require("./server/controller/language.js");
const { initLicenceController } = require("./server/controller/licence.js");
const { initCreatorController } = require("./server/controller/creator.js");
const { initGenreController } = require("./server/controller/genre.js");
const {
  initOrganizationController,
} = require("./server/controller/organization.js");
const { initVideoController } = require("./server/controller/video.js");
const { initMetadataController } = require("./server/controller/metadata.js");

const { initVideoUpdateHooks } = require("./server/hooks/videoUpdateHooks.js");
const { initVideoUploadHooks } = require("./server/hooks/videoUploadHooks.js");
const { initVideoResultHooks } = require("./server/hooks/videoResultHooks.js");
const { SyncHelper } = require("./server/SyncHelper.js");
const MediaInfo = require("./server/tools/Mediainfo.js");
const MediainfoEBU = require("./server/tools/MediainfoEBU.js");
const FFProbe = require("./server/tools/FFprobe.js");

async function register({
  registerHook,
  storageManager,
  getRouter,
  videoLanguageManager,
  videoLicenceManager,
  videoCategoryManager,
  peertubeHelpers,
  registerSetting,
  settingsManager,
  peertubeHelpers: { videos: peertubeVideosHelpers },
}) {
  // init Settings
  initRegisterSettings(registerSetting);
  console.log("Initialized plugin settings");

  // init DataAccessObjects
  var creatorDAO = new CreatorDAO(peertubeHelpers);
  var organizationDAO = new OrganizationDAO(peertubeHelpers);

  var mediainfoMetadataEBUDAO = new MediainfoEbuMetadataDAO(peertubeHelpers);
  var ffprobeMetadataDAO = new FfprobeMetadataDAO(peertubeHelpers);
  var mediainfoMetadataDAO = new MediainfoMetadataDAO(peertubeHelpers);

  var metadataEBUDefaultDAO = new MetadataEBUDefaultDAO(peertubeHelpers);
  var videoMetadataDAO = new VideoMetadataDAO(peertubeHelpers);
  console.log("Initialized data access objects");

  // init Controllers
  var router = getRouter();
  initCreatorController(creatorDAO, router);
  initOrganizationController(organizationDAO, router);

  initLanguageController(router, videoLanguageManager);
  initLicenceController(router, videoLicenceManager);
  initCategoryController(router, videoCategoryManager);

  initGenreController(router, storageManager);

  initVideoController(router, storageManager);
  initMetadataController(router, storageManager);
  console.log("Initialized controllers");

  // init Tools
  const mediaInfo = new MediaInfo();
  const mediainfoEBU = new MediainfoEBU();
  const ffprobe = new FFProbe();
  console.log("Initialized tools");
  var syncHelper = new SyncHelper();
  // init Hooks
  initVideoUploadHooks(
    mediaInfo,
    mediainfoEBU,
    ffprobe,
    registerHook,
    peertubeVideosHelpers,
    mediainfoMetadataDAO,
    mediainfoMetadataEBUDAO,
    ffprobeMetadataDAO,
    metadataEBUDefaultDAO,
    videoMetadataDAO
  );

  initVideoUpdateHooks(
    mediaInfo,
    mediainfoEBU,
    ffprobe,
    EBUDefaults,
    syncHelper,
    peertubeVideosHelpers,
    registerHook,
    storageManager,
    mediainfoMetadataDAO,
    mediainfoMetadataEBUDAO,
    ffprobeMetadataDAO,
    metadataEBUDefaultDAO,
    videoMetadataDAO
  );
  initVideoResultHooks(
    registerHook,
    storageManager,
    creatorDAO,
    organizationDAO
  );
}

module.exports = {
  register,
  unregister,
};

async function unregister() {
  return;
}
