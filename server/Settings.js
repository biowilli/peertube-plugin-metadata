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
};

module.exports = {
  initRegisterSettings,
};
