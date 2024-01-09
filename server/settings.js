const initRegisterSettings = (registerSetting) => {
  registerSetting({
    name: "form",
    label: "Metadata View Design",
    type: "input-textarea",
    descriptionHTML:
      "design your own view: (JSON valid? https://jsonlint.com/)",
    default: "true",
    private: false,
  });

  const settings = [
    { key: "ffprobe-active", label: "FFProbe Active" },
    { key: "mediainfo-active", label: "MediaInfo Active" },
    { key: "mediainfo-ebu-active", label: "MediaInfo EBU Active" },
  ];

  settings.forEach(({ key, label }) => {
    registerSetting({
      name: key,
      label: label,
      type: "input-checkbox",
      descriptionHTML: `enables/disables ${label.toLowerCase()}`,
      default: "true",
      private: false,
    });
  });
};

module.exports = {
  initRegisterSettings,
};
