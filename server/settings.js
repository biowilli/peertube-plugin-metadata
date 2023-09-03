const initRegisterSettings = (registerSetting) => {
  initBlockViewSettings(registerSetting);
  initElementViewSettings(registerSetting);
};

async function initBlockViewSettings(registerSetting) {
  registerSetting({
    name: "title-block-view-active",
    label: "title-block-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables title block view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "description-block-view-active",
    label: "description-block-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables description block view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "creator-block-view-active",
    label: "creator-block-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables creator block view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "contributor-block-view-active",
    label: "contributor-block-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables contributor block view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "publisher-block-view-active",
    label: "publisher-block-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables publisher block view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "dates-block-view-active",
    label: "dates-block-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables dates block view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "videoInformation-block-view-active",
    label: "videoInformation-block-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables videoInformation block view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "rating-block-view-active",
    label: "rating-block-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables rating block view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "rights-block-view-active",
    label: "rights-block-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables rights block view",
    default: "true",
    private: false,
  });
}

function initElementViewSettings(registerSetting) {
  registerSetting({
    name: "title-note-element-view-active",
    label: "title-note-element-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables title note element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "title-element-view-active",
    label: "title-element-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables title-element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "title-element-note-view-active",
    label: "title-element-note-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables title note element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "descriptiveTitle-element-view-active",
    label: "descriptiveTitle-element-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables descriptiveTitle element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "descriptiveTitle-element-note-view-active",
    label: "descriptiveTitle-element-note-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables descriptiveTitle note element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "discTitle-element-view-active",
    label: "discTitle-element-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables discTitle element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "discTitle-element-note-view-active",
    label: "discTitle-element-note-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables discTitle note element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "subject-element-view-active",
    label: "subject-element-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables subject element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "text-element-view-active",
    label: "text-element-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables text element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "tags",
    label: "tags",
    type: "input-checkbox",
    descriptionHTML: "enables/disables tags element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "creator-element-view-active",
    label: "creator-element-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables creator element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "contributor-element-view-active",
    label: "contributor-element-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables contributor element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "publisher-element-view-active",
    label: "publisher-element-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables publisher element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "dateDigitalised-element-view-active",
    label: "dateDigitalised-element-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables dateDigitalised element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "videLinks-element-view-active",
    label: "videLinks-element-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables videLinks element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "firstIssued-element-view-active",
    label: "firstIssued-element-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables firstIssued element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "lastIssued-element-view-active",
    label: "lastIssued-element-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables lastIssued element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "daterecorded-element-view-active",
    label: "daterecorded-element-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables daterecorded element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "recordingLocation0-element-view-active",
    label: "recordingLocation0-element-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables recordingLocation0 element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "recordingLocation1-element-view-active",
    label: "recordingLocation1-element-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables recordingLocation1 element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "firstPublicationChannel-element-view-active",
    label: "firstPublicationChannel-element-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables firstPublicationChannel element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "firstPublicationTime-element-view-active",
    label: "firstPublicationTime-element-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables firstPublicationTime element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "firstPublicationDate-element-view-active",
    label: "firstPublicationDate-element-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables firstPublicationDate element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "repeatChannel-element-view-active",
    label: "repeatChannel-element-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables repeatChannel element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "archiveFilePath-element-view-active",
    label: "archiveFilePath-element-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables archiveFilePath element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "filesize-element-view-active",
    label: "filesize-element-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables filesize element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "filename-element-view-active",
    label: "filename-element-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables filename element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "archiveLocation-element-view-active",
    label: "archiveLocation-element-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables archiveLocation element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "category-element-view-active",
    label: "category-element-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables category element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "genre-element-view-active",
    label: "genre-element-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables genre element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "language-element-view-active",
    label: "language-element-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables language element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "parts-element-view-active",
    label: "parts-element-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables parts element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "relation-element-view-active",
    label: "relation-element-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables relation element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "serie-element-view-active",
    label: "serie-element-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables serie element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "source-element-view-active",
    label: "source-element-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables source element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "targetGroup-element-view-active",
    label: "targetGroup-element-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables targetGroup element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "version-element-view-active",
    label: "version-element-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables version element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "notes-element-view-active",
    label: "notes-element-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables notes element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "ratingScaleMinValue-element-view-active",
    label: "ratingScaleMinValue-element-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables ratingScaleMinValue element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "ratingScaleMaxValue-element-view-active",
    label: "ratingScaleMaxValue-element-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables ratingScaleMinValue element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "ratingValue-element-view-active",
    label: "ratingValue-element-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables ratingValue element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "rightId",
    label: "rightId",
    type: "input-checkbox",
    descriptionHTML: "enables/disables rightId element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "cobyrightRightClearanceFlag-element-view-active",
    label: "cobyrightRightClearanceFlag-element-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables rightClearanceFlag element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "cobyrightExplotationIssues",
    label: "cobyrightExplotationIssues",
    type: "input-checkbox",
    descriptionHTML: "enables/disables cobyrightExplotationIssues element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "cobyrightDisclaimer-element-view-active",
    label: "cobyrightDisclaimer-element-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables cobyrightDisclaimer element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "usageRightsRightId-element-view-active",
    label: "disclaimer",
    type: "input-checkbox",
    descriptionHTML: "enables/disables disclaimer element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "usageRightsRightClearanceFlag-element-view-active",
    label: "usageRightsRightClearanceFlag-element-view-active",
    type: "input-checkbox",
    descriptionHTML:
      "enables/disables usageRightsRightClearanceFlag element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "usageRightsExplotationIssues-element-view-active",
    label: "usageRightsExplotationIssues-element-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables explotationIssues element view",
    default: "true",
    private: false,
  });

  registerSetting({
    name: "usageRightsDisclaimer-element-view-active",
    label: "usageRightsDisclaimer-element-view-active",
    type: "input-checkbox",
    descriptionHTML: "enables/disables usageRightsDisclaimer element view",
    default: "true",
    private: false,
  });
}

module.exports = {
  initRegisterSettings,
};
