const createFileGroup = (name = "Primary file group") => ({
  name,
  files: [],
  columns: [],
  delimiter: ",",
  headerRow: "",
  fileFormat: "",
  encoding: "",
  fileTimezone: "",
  auxiliary: "",
  preprocessingBol: "",
  preprocessingDesc: "",
  datetimeSource: "column",
  collectionDatetime: "",
  datetimeDate: "",
  datetimeDateformat: "",
  datetimeTime: "",
  datetimeTimeformat: "",
  terms: [{ term: "other", label: "Other" }],
  variableState: {},
});

const createStudyGroup = () => ({ name: "", description: "", size: "", inclusion: "", exclusion: "" });
const createContributor = () => ({
  fullName: "",
  roles: "",
  email: "",
  orcid: "",
  institutionName: "",
  institutionCity: "",
  institutionCountry: "",
});
const createParticipant = () => ({ id: "", age: "", sex: "", gender: "" });
const createCharacteristic = () => ({ participantId: "", name: "", value: "", unit: "", description: "" });
const createDevice = () => ({
  id: "",
  manufacturer: "",
  model: "",
  serialNumber: "",
  calibrationDate: "",
  firmwareVersion: "",
  datasheetId: "",
  sensorsText: "",
});
const createDatasheet = () => ({
  id: "",
  version: "",
  manufacturer: "",
  type: "",
  model: "",
  calibrationInterval: "",
  spectralSensitivityText: "",
  linearity: "",
  directionalResponse: "",
  range: "",
  channelsText: "",
});

const createDatasetRecord = () => ({
  datasetId: "",
  studyId: "",
  participantId: "",
  deviceId: "",
  deviceLocation: "",
  samplingInterval: "",
  datasetTimezone: "",
  latitude: "",
  longitude: "",
  instructions: "",
  fileGroups: [createFileGroup()],
});

const initialDataset = createDatasetRecord();

const state = {
  activeStep: "project",
  activeDatasetIndex: 0,
  activeGroupIndex: 0,
  studyGroups: [],
  contributors: [],
  participants: [createParticipant()],
  characteristics: [],
  devices: [createDevice()],
  datasheets: [createDatasheet()],
  datasheetImportedFiles: [],
  datasets: [initialDataset],
  fileGroups: initialDataset.fileGroups,
};

const fileInput = document.querySelector("#file-input");
const fileSummary = document.querySelector("#file-summary");
const fileWarning = document.querySelector("#file-warning");
const variablesTable = document.querySelector("#variables-table");
const termsList = document.querySelector("#terms-list");
const datasetRecordsList = document.querySelector("#dataset-records-list");
const fileGroupsList = document.querySelector("#file-groups-list");
const validationSummary = document.querySelector("#validation-summary");
const datasetImport = document.querySelector("#dataset-import");
const importDatasetButton = document.querySelector("#import-dataset-button");
const datasetImportFile = document.querySelector("#dataset-import-file");
const datasetImportSummary = document.querySelector("#dataset-import-summary");
const jsonPreview = document.querySelector("#json-preview");
const previewTitle = document.querySelector("#preview-title");
const packageSummary = document.querySelector("#package-summary");
const exportValidationPanel = document.querySelector("#export-validation-panel");
const downloadButton = document.querySelector("#download-json");
const copyButton = document.querySelector("#copy-json");
const addTermButton = document.querySelector("#add-term");
const addDatasetRecordButton = document.querySelector("#add-dataset-record");
const addFileGroupButton = document.querySelector("#add-file-group");
const studyImport = document.querySelector("#study-import");
const studyImportFile = document.querySelector("#study-import-file");
const studyImportSummary = document.querySelector("#study-import-summary");
const contributorsImport = document.querySelector("#contributors-import");
const contributorsImportFile = document.querySelector("#contributors-import-file");
const contributorsImportSummary = document.querySelector("#contributors-import-summary");
const clearContributorsImportButton = document.querySelector("#clear-contributors-import");
const studyGroupsList = document.querySelector("#study-groups-list");
const contributorsList = document.querySelector("#contributors-list");
const participantsImport = document.querySelector("#participants-import");
const participantsImportFile = document.querySelector("#participants-import-file");
const participantsImportSummary = document.querySelector("#participants-import-summary");
const characteristicsImport = document.querySelector("#characteristics-import");
const characteristicsImportFile = document.querySelector("#characteristics-import-file");
const characteristicsImportSummary = document.querySelector("#characteristics-import-summary");
const participantsList = document.querySelector("#participants-list");
const characteristicsList = document.querySelector("#characteristics-list");
const devicesImport = document.querySelector("#devices-import");
const importDevicesButton = document.querySelector("#import-devices-button");
const devicesImportFile = document.querySelector("#devices-import-file");
const devicesImportSummary = document.querySelector("#devices-import-summary");
const devicesList = document.querySelector("#devices-list");
const datasheetsImport = document.querySelector("#datasheets-import");
const importDatasheetsButton = document.querySelector("#import-datasheets-button");
const datasheetsImportFile = document.querySelector("#datasheets-import-file");
const datasheetsImportSummary = document.querySelector("#datasheets-import-summary");
const datasheetsList = document.querySelector("#datasheets-list");

const fields = {
  schemaVersion: document.querySelector("#schema-version"),
  packageName: document.querySelector("#package-name"),
  packageTitle: document.querySelector("#package-title"),
  studyInternalId: document.querySelector("#study-internal-id"),
  studyTitle: document.querySelector("#study-title"),
  studyPreregistration: document.querySelector("#study-preregistration"),
  studyRegistration: document.querySelector("#study-registration"),
  studyType: document.querySelector("#study-type"),
  studyShortDescription: document.querySelector("#study-short-description"),
  studySample: document.querySelector("#study-sample"),
  studySetting: document.querySelector("#study-setting"),
  studyGeographicalLocation: document.querySelector("#study-geographical-location"),
  studyEthics: document.querySelector("#study-ethics"),
  studyIntervention: document.querySelector("#study-intervention"),
  studyFundingSources: document.querySelector("#study-funding-sources"),
  studyKeywords: document.querySelector("#study-keywords"),
  studyDatasetsPreview: document.querySelector("#study-datasets-preview"),
  datasetId: document.querySelector("#dataset-id"),
  studyId: document.querySelector("#study-id"),
  participantId: document.querySelector("#participant-id"),
  deviceId: document.querySelector("#device-id"),
  deviceLocation: document.querySelector("#device-location"),
  samplingInterval: document.querySelector("#sampling-interval"),
  datasetTimezone: document.querySelector("#dataset-timezone"),
  latitude: document.querySelector("#latitude"),
  longitude: document.querySelector("#longitude"),
  instructions: document.querySelector("#instructions"),
  datetimeSource: document.querySelector("#datetime-source"),
  collectionDatetime: document.querySelector("#collection-datetime"),
  datetimeDate: document.querySelector("#datetime-date"),
  datetimeDateformat: document.querySelector("#datetime-dateformat"),
  datetimeTime: document.querySelector("#datetime-time"),
  datetimeTimeformat: document.querySelector("#datetime-timeformat"),
  fileFormat: document.querySelector("#file-format"),
  encoding: document.querySelector("#encoding"),
  headerRow: document.querySelector("#header-row"),
  fileTimezone: document.querySelector("#file-timezone"),
  auxiliary: document.querySelector("#auxiliary"),
  preprocessingBol: document.querySelector("#preprocessing-bol"),
  preprocessingDesc: document.querySelector("#preprocessing-desc"),
};

fileInput.addEventListener("change", handleFileSelection);
studyImport.addEventListener("change", handleStudyImport);
contributorsImport.addEventListener("change", handleContributorsImport);
participantsImport.addEventListener("change", handleParticipantsImport);
characteristicsImport.addEventListener("change", handleCharacteristicsImport);
devicesImport.addEventListener("change", handleDevicesImport);
importDevicesButton.addEventListener("click", () => {
  const file = devicesImport.files?.[0];
  if (!file) {
    devicesImportSummary.textContent = "Choose a devices JSON/CSV/TSV file first, then click Import.";
    devicesImportSummary.className = "import-summary warning";
    return;
  }
  importDevicesFile(file);
});
datasheetsImport.addEventListener("change", handleDatasheetsImport);
importDatasheetsButton.addEventListener("click", () => {
  const files = Array.from(datasheetsImport.files || []);
  if (files.length === 0) {
    datasheetsImportSummary.textContent = "Choose datasheet JSON/CSV/TSV file(s) first, then click Import.";
    datasheetsImportSummary.className = "import-summary warning";
    return;
  }
  importDatasheetsFiles(files);
});
datasetImport.addEventListener("change", handleDatasetImport);
importDatasetButton.addEventListener("click", () => {
  const file = datasetImport.files?.[0];
  if (!file) {
    datasetImportSummary.textContent = "Choose a datasets.json file first, then click Import.";
    datasetImportSummary.className = "import-summary warning";
    return;
  }
  importDatasetFile(file);
});
clearContributorsImportButton.addEventListener("click", clearContributorsImport);
downloadButton.addEventListener("click", () => downloadText("datasets.json", JSON.stringify(buildDatasetDraft(), null, 2), "application/json"));
copyButton.addEventListener("click", copyPreview);
addTermButton.addEventListener("click", addTerm);
addDatasetRecordButton.addEventListener("click", addDatasetRecord);
addFileGroupButton.addEventListener("click", addFileGroup);
document.querySelector("#add-study-group").addEventListener("click", addStudyGroup);
document.querySelector("#add-contributor").addEventListener("click", addContributor);
document.querySelector("#clear-all-contributors").addEventListener("click", () => clearAllContributors());
document.querySelector("#clear-study-page").addEventListener("click", clearStudyPage);
document.querySelector("#add-participant").addEventListener("click", addParticipant);
document.querySelector("#clear-all-participants").addEventListener("click", () => clearAllParticipants());
document.querySelector("#remove-participants-import").addEventListener("click", () => clearAllParticipants("Imported participants file removed. Add rows manually or import another file."));
document.querySelector("#add-characteristic").addEventListener("click", addCharacteristic);
document.querySelector("#clear-all-characteristics").addEventListener("click", () => clearAllCharacteristics());
document.querySelector("#remove-characteristics-import").addEventListener("click", () => clearAllCharacteristics("Imported characteristics file removed. Add rows manually or import another file."));
document.querySelector("#clear-participants-page").addEventListener("click", clearParticipantsPage);
document.querySelector("#add-device").addEventListener("click", addDevice);
document.querySelector("#clear-all-devices").addEventListener("click", () => clearAllDevices());
document.querySelector("#remove-devices-import").addEventListener("click", () => clearAllDevices("Imported devices file removed. Add rows manually or import another file."));
document.querySelector("#clear-devices-page").addEventListener("click", clearDevicesPage);
document.querySelector("#add-datasheet").addEventListener("click", addDatasheet);
document.querySelector("#clear-all-datasheets").addEventListener("click", () => clearAllDatasheets());
document.querySelector("#remove-datasheets-import").addEventListener("click", () => clearAllDatasheets("Imported datasheet file removed. Add rows manually or import another file."));
document.querySelector("#clear-datasheets-page").addEventListener("click", clearDatasheetsPage);
document.querySelector("#remove-dataset-import").addEventListener("click", () => clearDatasetPage("Imported dataset file removed. Add data manually or import another datasets.json file."));
document.querySelector("#clear-dataset-page").addEventListener("click", () => clearDatasetPage());
document.querySelector("#download-package-zip").addEventListener("click", downloadPackageZip);
document.querySelector("#download-datapackage").addEventListener("click", () => downloadText("datapackage.json", JSON.stringify(buildDataPackage(), null, 2), "application/json"));
document.querySelector("#download-study").addEventListener("click", () => downloadText("study.json", JSON.stringify(buildStudyDraft(), null, 2), "application/json"));
document.querySelector("#download-participants").addEventListener("click", () => downloadText("participants.csv", buildParticipantsCsv(), "text/csv"));
document.querySelector("#download-characteristics").addEventListener("click", () => downloadText("participant_characteristics.csv", buildCharacteristicsCsv(), "text/csv"));
document.querySelector("#download-devices").addEventListener("click", () => downloadText("devices.json", JSON.stringify(buildDevicesDraft(), null, 2), "application/json"));
document.querySelector("#download-datasheets").addEventListener("click", () => downloadText("device_datasheet.json", JSON.stringify(buildDatasheetsDraft(), null, 2), "application/json"));
document.querySelector("#download-study-schema").addEventListener("click", () => downloadSchema("study.schema.json"));
document.querySelector("#download-contributor-schema").addEventListener("click", () => downloadSchema("contributor.schema.json"));
document.querySelector("#download-participants-schema").addEventListener("click", () => downloadSchema("participants.schema.json"));
document.querySelector("#download-characteristics-schema").addEventListener("click", () => downloadSchema("participant_characteristics.schema.json"));
document.querySelector("#download-device-schema").addEventListener("click", () => downloadSchema("device.schema.json"));
document.querySelector("#download-datasheet-schema").addEventListener("click", () => downloadSchema("device_datasheet.schema.json"));
document.querySelector("#download-dataset-schema").addEventListener("click", () => downloadSchema("dataset.schema.json"));

document.querySelectorAll("[data-next-step]").forEach((button) => {
  button.addEventListener("click", () => setStep(button.dataset.nextStep));
});
document.querySelectorAll("[data-prev-step]").forEach((button) => {
  button.addEventListener("click", () => setStep(button.dataset.prevStep));
});
document.querySelectorAll("[data-step-link]").forEach((item) => {
  item.addEventListener("click", () => setStep(item.dataset.stepLink));
});

Object.values(fields).forEach((field) => {
  field.addEventListener("input", handleFormInput);
  field.addEventListener("change", handleFormChange);
});

function handleFormInput() {
  syncDatasetControlsIfNeeded();
  updateCrossrefOptions();
  syncDatetimeControls();
  renderDatasetRecords();
  updatePreview();
}

function handleFormChange() {
  syncDatasetControlsIfNeeded();
  updateCrossrefOptions();
  syncDatetimeControls();
  renderDatasetRecords();
  renderVariables();
  updatePreview();
}

function setStep(step) {
  if (state.activeStep === "datasets") {
    syncActiveDatasetFromControls();
  } else {
    syncActiveGroupFromControls();
  }
  state.activeStep = step;
  document.querySelectorAll(".builder-step").forEach((section) => {
    section.classList.toggle("active", section.dataset.step === step);
  });
  document.querySelectorAll("[data-step-link]").forEach((item) => {
    item.classList.toggle("active", item.dataset.stepLink === step);
  });
  updateCrossrefOptions();
  if (step === "datasets") {
    syncControlsFromActiveDataset();
  }
  updatePreview();
}

function activeDataset() {
  return state.datasets[state.activeDatasetIndex];
}

function activeGroup() {
  return state.fileGroups[state.activeGroupIndex];
}

function syncDatasetControlsIfNeeded() {
  if (state.activeStep === "datasets") {
    syncActiveDatasetFromControls();
  }
}

function syncActiveDatasetFromControls() {
  const dataset = activeDataset();
  if (!dataset) {
    return;
  }
  syncActiveGroupFromControls();
  dataset.datasetId = fields.datasetId.value.trim();
  dataset.studyId = fields.studyId.value;
  dataset.participantId = fields.participantId.value;
  dataset.deviceId = fields.deviceId.value;
  dataset.deviceLocation = fields.deviceLocation.value.trim();
  dataset.samplingInterval = fields.samplingInterval.value;
  dataset.datasetTimezone = fields.datasetTimezone.value.trim();
  dataset.latitude = fields.latitude.value.trim();
  dataset.longitude = fields.longitude.value.trim();
  dataset.instructions = fields.instructions.value.trim();
  dataset.fileGroups = state.fileGroups;
}

function syncControlsFromActiveDataset() {
  const dataset = activeDataset();
  if (!dataset) {
    return;
  }

  fields.datasetId.value = dataset.datasetId || "";
  setPendingSelectValue(fields.studyId, dataset.studyId || "");
  setPendingSelectValue(fields.participantId, dataset.participantId || "");
  setPendingSelectValue(fields.deviceId, dataset.deviceId || "");
  fields.deviceLocation.value = dataset.deviceLocation || "";
  fields.samplingInterval.value = dataset.samplingInterval ?? "";
  fields.datasetTimezone.value = dataset.datasetTimezone || "";
  fields.latitude.value = dataset.latitude || "";
  fields.longitude.value = dataset.longitude || "";
  fields.instructions.value = dataset.instructions || "";

  state.fileGroups = dataset.fileGroups?.length ? dataset.fileGroups : [createFileGroup()];
  dataset.fileGroups = state.fileGroups;
  state.activeGroupIndex = Math.min(state.activeGroupIndex, state.fileGroups.length - 1);
  if (state.activeGroupIndex < 0) {
    state.activeGroupIndex = 0;
  }

  syncControlsFromActiveGroup();
  renderDatasetRecords();
  renderFileGroups();
  renderTerms();
  renderVariables();
  updateCrossrefOptions();
}

function getStudyId() {
  return fields.studyInternalId.value.trim();
}

function getParticipantIds() {
  return state.participants.map((entry) => entry.id).filter(Boolean);
}

function getDeviceIds() {
  return state.devices.map((entry) => entry.id).filter(Boolean);
}

function getDatasheetIds() {
  return state.datasheets.map((entry) => entry.id).filter(Boolean);
}

function updateCrossrefOptions() {
  setSelectOptions(fields.studyId, Array.from(new Set([getStudyId(), fields.studyId.value].filter(Boolean))), "Add study ID first");
  setSelectOptions(fields.participantId, Array.from(new Set([...getParticipantIds(), fields.participantId.value].filter(Boolean))), "Add participant first");
  setSelectOptions(fields.deviceId, Array.from(new Set([...getDeviceIds(), fields.deviceId.value].filter(Boolean))), "Add device first");
  document.querySelectorAll(".participant-select").forEach((select) => {
    setSelectOptions(select, Array.from(new Set([...getParticipantIds(), select.value].filter(Boolean))), "Select participant");
  });
  document.querySelectorAll(".datasheet-select").forEach((select) => {
    setSelectOptions(select, Array.from(new Set([...getDatasheetIds(), select.value].filter(Boolean))), "Select datasheet");
  });
}

function setSelectOptions(select, values, placeholder) {
  const previous = select.value;
  select.innerHTML = `<option value="">${escapeHtml(placeholder)}</option>${values
    .map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`)
    .join("")}`;
  if (values.includes(previous)) {
    select.value = previous;
  } else if (values.length === 1) {
    select.value = values[0];
  }
}

function clearStudyPage() {
  [
    fields.studyInternalId,
    fields.studyTitle,
    fields.studyPreregistration,
    fields.studyRegistration,
    fields.studyEthics,
    fields.studyType,
    fields.studyShortDescription,
    fields.studySample,
    fields.studySetting,
    fields.studyGeographicalLocation,
    fields.studyIntervention,
    fields.studyFundingSources,
    fields.studyKeywords,
  ].forEach((field) => {
    field.value = "";
  });

  state.studyGroups = [];
  state.contributors = [];
  studyImport.value = "";
  contributorsImport.value = "";
  hideImportFile(studyImportFile);
  hideImportFile(contributorsImportFile);
  studyImportSummary.textContent = "Optional: import an existing study.json to pre-fill this page.";
  studyImportSummary.className = "";
  contributorsImportSummary.textContent = "Study contributors cleared. Add rows manually or import CSV/TSV/JSON.";
  contributorsImportSummary.className = "import-summary";

  renderStudyGroups();
  renderContributors();
  updateCrossrefOptions();
  updatePreview();
}

async function loadSchemaHelp() {
  try {
    const [studySchema, contributorSchema, participantsSchema, characteristicsSchema, deviceSchema, datasheetSchema, datasetSchema] = await Promise.all([
      fetch("schemas/2.0.0/study.schema.json").then((response) => response.json()),
      fetch("schemas/2.0.0/contributor.schema.json").then((response) => response.json()),
      fetch("schemas/2.0.0/participants.schema.json").then((response) => response.json()),
      fetch("schemas/2.0.0/participant_characteristics.schema.json").then((response) => response.json()),
      fetch("schemas/2.0.0/device.schema.json").then((response) => response.json()),
      fetch("schemas/2.0.0/device_datasheet.schema.json").then((response) => response.json()),
      fetch("schemas/2.0.0/dataset.schema.json").then((response) => response.json()),
    ]);

    applySchemaHelp(studySchema, {
      "study-internal-id": "study_internal_id",
      "study-title": "study_title",
      "study-preregistration": "study_preregistration",
      "study-registration": "study_registration",
      "study-ethics": "study_ethics",
      "study-type": "study_type",
      "study-short-description": "study_short_description",
      "study-sample": "study_sample",
      "study-setting": "study_setting",
      "study-geographical-location": "study_geographical_location",
      "study-intervention": "study_intervention",
      "study-funding-sources": "study_funding_sources",
      "study-keywords": "study_keywords",
      "study-datasets-preview": "study_datasets",
    });

    applyContributorSchemaHelp(contributorSchema);
    applyStudyGroupSchemaHelp(studySchema);
    applyTabularSchemaHelp(participantsSchema, "participantHelp");
    applyTabularSchemaHelp(characteristicsSchema, "characteristicHelp");
    applyDeviceSchemaHelp(deviceSchema);
    applyDatasheetSchemaHelp(datasheetSchema);
    applyDatasetSchemaHelp(datasetSchema);
  } catch (error) {
    console.warn("Schema help could not be loaded.", error);
  }
}

function applySchemaHelp(schema, fieldMap) {
  Object.entries(fieldMap).forEach(([elementId, schemaField]) => {
    const element = document.querySelector(`#${elementId}`);
    const target = element?.closest("label");
    const property = schema?.properties?.[schemaField];
    if (!target || !property) {
      return;
    }
    target.title = `${property.description || schemaField}. Type: ${formatSchemaType(property)}.`;
    addHelpMarker(target, target.title);
  });
}

function applyContributorSchemaHelp(schema) {
  const institution = schema?.properties?.contributor_institution?.properties || {};
  const contributorHelp = {
    fullName: schema?.properties?.contributor_full_name,
    roles: schema?.properties?.contributor_roles,
    email: schema?.properties?.contributor_email,
    orcid: schema?.properties?.contributor_orcid,
    institutionName: institution.contributor_institution_name,
    institutionCity: institution.contributor_institution_city,
    institutionCountry: institution.contributor_institution_country,
  };
  state.contributorHelp = contributorHelp;
  renderContributors();
}

function applyStudyGroupSchemaHelp(schema) {
  const properties = schema?.properties?.study_groups?.items?.properties || {};
  state.studyGroupHelp = properties;
  renderStudyGroups();
}

function applyTabularSchemaHelp(schema, stateKey) {
  state[stateKey] = (schema.fields || []).reduce((fieldsByName, field) => {
    fieldsByName[field.name] = field;
    return fieldsByName;
  }, {});
  renderParticipants();
  renderCharacteristics();
}

function applyDeviceSchemaHelp(schema) {
  state.deviceHelp = schema?.properties || {};
  state.deviceSensorHelp = schema?.properties?.device_sensors?.items?.properties || {};
  renderDevices();
}

function applyDatasheetSchemaHelp(schema) {
  state.datasheetHelp = schema?.properties || {};
  state.datasheetSpectralHelp = schema?.properties?.datasheet_calibration_spectral_sensitivity?.items?.properties || {};
  state.datasheetChannelHelp = schema?.properties?.datasheet_channel?.items?.properties || {};
  renderDatasheets();
}

function applyDatasetSchemaHelp(schema) {
  const properties = schema?.properties || {};
  const crossref = properties.dataset_crossref?.properties || {};
  applySchemaHelp(schema, {
    "dataset-id": "dataset_internal_id",
    "device-location": "dataset_device_location",
    "sampling-interval": "dataset_sampling_interval",
    "dataset-timezone": "dataset_timezone",
    "instructions": "dataset_instructions",
  });

  const fieldHelp = {
    studyId: schemaHelpTitle(crossref.dataset_crossref_study_id, "Internal ID for study"),
    participantId: schemaHelpTitle(crossref.dataset_crossref_participant_id, "Internal ID for participant"),
    deviceId: schemaHelpTitle(crossref.dataset_crossref_device_id, "Internal ID for device"),
    latitude: schemaHelpTitle(properties.dataset_location, "Latitude of data collection"),
    longitude: schemaHelpTitle(properties.dataset_location, "Longitude of data collection"),
  };

  [
    [fields.studyId, fieldHelp.studyId],
    [fields.participantId, fieldHelp.participantId],
    [fields.deviceId, fieldHelp.deviceId],
    [fields.latitude, fieldHelp.latitude],
    [fields.longitude, fieldHelp.longitude],
  ].forEach(([element, helpText]) => {
    const label = element?.closest("label");
    if (!label) return;
    label.title = helpText;
    addHelpMarker(label, helpText);
  });
}

function schemaHelpTitle(property, fallback) {
  if (!property) {
    return fallback;
  }
  return `${property.description || fallback}. Type: ${formatSchemaType(property)}.`;
}

function helpMarker(helpText) {
  return `<span class="help-marker" title="${escapeHtml(helpText)}" aria-label="${escapeHtml(helpText)}">?</span>`;
}

function addHelpMarker(label, helpText) {
  if (!label || label.querySelector(".help-marker")) {
    return;
  }
  const firstControl = label.querySelector("input, textarea, select");
  if (firstControl) {
    firstControl.insertAdjacentHTML("beforebegin", ` ${helpMarker(helpText)}`);
    return;
  }
  label.insertAdjacentHTML("beforeend", ` ${helpMarker(helpText)}`);
}

function formatSchemaType(property) {
  if (Array.isArray(property.type)) {
    return property.type.join(" or ");
  }
  if (property.type) {
    return property.type;
  }
  if (property.oneOf) {
    return property.oneOf.map((entry) => entry.type).filter(Boolean).join(" or ");
  }
  return "unspecified";
}

async function handleStudyImport(event) {
  const file = event.target.files?.[0];
  if (!file) {
    return;
  }

  try {
    const parsed = JSON.parse(await file.text());
    const study = Array.isArray(parsed) ? parsed[0] : parsed;

    if (!study || typeof study !== "object") {
      throw new Error("Expected a study object or an array containing one study object.");
    }

    fields.schemaVersion.value = study.schema_version || fields.schemaVersion.value || "2.0.0";
    fields.studyInternalId.value = study.study_internal_id || "";
    fields.studyTitle.value = study.study_title || "";
    fields.studyPreregistration.value = study.study_preregistration || "";
    fields.studyRegistration.value = study.study_registration || "";
    fields.studyEthics.value = study.study_ethics || "";
    fields.studyType.value = study.study_type || "";
    fields.studyShortDescription.value = study.study_short_description || "";
    fields.studySample.value = study.study_sample || "";
    fields.studySetting.value = study.study_setting || "";
    fields.studyGeographicalLocation.value = study.study_geographical_location || "";
    fields.studyIntervention.value = study.study_intervention || "";
    fields.studyFundingSources.value = (study.study_funding_sources || []).join(", ");
    fields.studyKeywords.value = (study.study_keywords || []).join(", ");

    state.studyGroups = Array.isArray(study.study_groups)
      ? study.study_groups.map((group) => ({
          name: group.study_group_name || "",
          description: group.study_group_description || "",
          size: group.study_group_size ?? "",
          inclusion: (group.study_group_inclusion || []).join("; "),
          exclusion: (group.study_group_exclusion || []).join("; "),
        }))
      : [];
    state.contributors = Array.isArray(study.study_contributors)
      ? study.study_contributors.map(contributorFromSchema)
      : [];

    renderStudyGroups();
    renderContributors();
    updateCrossrefOptions();
    updatePreview();
    showImportFile(studyImportFile, file.name);
    studyImportSummary.textContent = `Imported ${file.name}. Datasets remain generated from the Datasets page.`;
    studyImportSummary.className = "import-summary ok";
  } catch (error) {
    studyImportSummary.textContent = `Could not import ${file.name}: ${error.message}`;
    studyImportSummary.className = "import-summary warning";
  } finally {
    studyImport.value = "";
  }
}

async function handleContributorsImport(event) {
  const file = event.target.files?.[0];
  if (!file) {
    return;
  }

  try {
    const text = await file.text();
    state.contributors = isJsonFile(file)
      ? contributorsFromJson(text)
      : contributorsFromTable(text);

    renderContributors();
    updatePreview();
    showImportFile(contributorsImportFile, file.name);
    contributorsImportSummary.textContent = `Imported ${state.contributors.length} contributor row(s) from ${file.name}.`;
    contributorsImportSummary.className = "import-summary ok";
  } catch (error) {
    contributorsImportSummary.textContent = `Could not import ${file.name}: ${error.message}`;
    contributorsImportSummary.className = "import-summary warning";
  } finally {
    contributorsImport.value = "";
  }
}

function clearContributorsImport() {
  clearAllContributors("Contributor import removed. Add rows manually or import another contributor file.");
}

function clearAllContributors(message = "All contributor rows cleared. Add rows manually or import another contributor file.") {
  message = normalizeStatusMessage(message, "All contributor rows cleared. Add rows manually or import another contributor file.");
  state.contributors = [];
  contributorsImport.value = "";
  hideImportFile(contributorsImportFile);
  contributorsImportSummary.textContent = message;
  contributorsImportSummary.className = "import-summary";
  renderContributors();
  updatePreview();
}

function showImportFile(element, fileName) {
  element.hidden = false;
  element.textContent = `Imported file: ${fileName}`;
}

function hideImportFile(element) {
  element.hidden = true;
  element.textContent = "";
}

function isJsonFile(file) {
  return file.name.toLowerCase().endsWith(".json") || file.type === "application/json";
}

function contributorsFromJson(text) {
  const parsed = JSON.parse(text);
  const contributors = Array.isArray(parsed)
    ? parsed
    : Array.isArray(parsed?.study_contributors)
      ? parsed.study_contributors
      : Array.isArray(parsed?.contributors)
        ? parsed.contributors
        : null;

  if (!contributors) {
    throw new Error("Expected contributors.json as an array, or study.json with study_contributors.");
  }

  return contributors.map(contributorFromSchema);
}

function contributorsFromTable(text) {
  return parseTableText(text).map((row) => ({
    fullName: row.contributor_full_name || row.full_name || row.name || "",
    roles: row.contributor_roles || row.roles || "",
    email: row.contributor_email || row.email || "",
    orcid: row.contributor_orcid || row.orcid || "",
    institutionName: row.contributor_institution_name || row.institution_name || "",
    institutionCity: row.contributor_institution_city || row.institution_city || "",
    institutionCountry: row.contributor_institution_country || row.institution_country || "",
  }));
}

function contributorFromSchema(contributor) {
  const institution = contributor.contributor_institution || {};
  return {
    fullName: contributor.contributor_full_name || "",
    roles: normalizeContributorRoles(contributor.contributor_roles),
    email: contributor.contributor_email || "",
    orcid: contributor.contributor_orcid || "",
    institutionName: institution.contributor_institution_name || "",
    institutionCity: institution.contributor_institution_city || "",
    institutionCountry: institution.contributor_institution_country || "",
  };
}

function normalizeContributorRoles(roles) {
  if (Array.isArray(roles)) {
    return roles.join("; ");
  }
  return roles || "";
}

function renderStudyGroups() {
  studyGroupsList.innerHTML = "";
  state.studyGroups.forEach((group, index) => {
    const row = document.createElement("div");
    row.className = "participant-card";
    const help = state.studyGroupHelp || {};
    const nameHelp = schemaHelpTitle(help.study_group_name, "Group name");
    const descriptionHelp = schemaHelpTitle(help.study_group_description, "Group description");
    const sizeHelp = schemaHelpTitle(help.study_group_size, "Sample size");
    const inclusionHelp = schemaHelpTitle(help.study_group_inclusion, "Inclusion criteria for sample group; separate multiple criteria with semicolons");
    const exclusionHelp = schemaHelpTitle(help.study_group_exclusion, "Exclusion criteria for sample group; separate multiple criteria with semicolons");
    row.innerHTML = `
      <div class="record-card-heading">
        <h3>Study group ${index + 1}</h3>
        <button type="button" class="remove-row">Remove study group</button>
      </div>
      <div class="participant-fields">
        <label title="${escapeHtml(nameHelp)}">Group name <span class="required">*</span> ${helpMarker(nameHelp)}
          <input value="${escapeHtml(group.name)}" data-field="name" placeholder="control" title="${escapeHtml(nameHelp)}" />
        </label>
        <label title="${escapeHtml(descriptionHelp)}">Description ${helpMarker(descriptionHelp)}
          <input value="${escapeHtml(group.description)}" data-field="description" placeholder="Optional group description" title="${escapeHtml(descriptionHelp)}" />
        </label>
        <label title="${escapeHtml(sizeHelp)}">Size ${helpMarker(sizeHelp)}
          <input value="${escapeHtml(group.size)}" data-field="size" type="number" min="0" placeholder="25" title="${escapeHtml(sizeHelp)}" />
        </label>
        <label title="${escapeHtml(inclusionHelp)}">Inclusion criteria ${helpMarker(inclusionHelp)}
          <input value="${escapeHtml(group.inclusion)}" data-field="inclusion" placeholder="18+; healthy adults" title="${escapeHtml(inclusionHelp)}" />
        </label>
        <label class="wide" title="${escapeHtml(exclusionHelp)}">Exclusion criteria ${helpMarker(exclusionHelp)}
          <input value="${escapeHtml(group.exclusion)}" data-field="exclusion" placeholder="Shift work; eye disease" title="${escapeHtml(exclusionHelp)}" />
        </label>
      </div>
    `;
    row.querySelectorAll("input").forEach((input) => {
      input.addEventListener("input", () => {
        group[input.dataset.field] = input.value.trim();
        updatePreview();
      });
    });
    row.querySelector("button").addEventListener("click", () => {
      state.studyGroups.splice(index, 1);
      renderStudyGroups();
      updatePreview();
    });
    studyGroupsList.appendChild(row);
  });
}

function addStudyGroup() {
  state.studyGroups.push(createStudyGroup());
  renderStudyGroups();
  updatePreview();
}

function renderContributors() {
  contributorsList.innerHTML = "";
  state.contributors.forEach((contributor, index) => {
    const row = document.createElement("div");
    row.className = "contributor-card";
    const help = state.contributorHelp || {};
    const fullNameHelp = schemaHelpTitle(help.fullName, "Full name of the contributor");
    const rolesHelp = schemaHelpTitle(help.roles, "Contributor roles. Separate multiple roles with semicolons");
    const emailHelp = schemaHelpTitle(help.email, "Email address");
    const orcidHelp = schemaHelpTitle(help.orcid, "ORCID identifier");
    const institutionNameHelp = schemaHelpTitle(help.institutionName, "Institution name");
    const institutionCityHelp = schemaHelpTitle(help.institutionCity, "Institution city");
    const institutionCountryHelp = schemaHelpTitle(help.institutionCountry, "Institution country");
    row.innerHTML = `
      <div class="record-card-heading">
        <h3>Contributor ${index + 1}</h3>
        <button type="button" class="remove-row">Remove contributor</button>
      </div>
      <div class="contributor-fields">
        <label title="${escapeHtml(fullNameHelp)}">Full name <span class="required">*</span> ${helpMarker(fullNameHelp)}
          <input value="${escapeHtml(contributor.fullName)}" data-field="fullName" placeholder="Jane Doe" title="${escapeHtml(fullNameHelp)}" />
        </label>
        <label title="${escapeHtml(rolesHelp)}">Roles ${helpMarker(rolesHelp)}
          <input value="${escapeHtml(contributor.roles)}" data-field="roles" placeholder="author; data collector" title="${escapeHtml(rolesHelp)}" />
        </label>
        <label title="${escapeHtml(emailHelp)}">Email ${helpMarker(emailHelp)}
          <input value="${escapeHtml(contributor.email)}" data-field="email" placeholder="jane@example.org" title="${escapeHtml(emailHelp)}" />
        </label>
        <label title="${escapeHtml(orcidHelp)}">ORCID <span class="required">*</span> ${helpMarker(orcidHelp)}
          <input value="${escapeHtml(contributor.orcid)}" data-field="orcid" placeholder="0000-0000-0000-0000" title="${escapeHtml(orcidHelp)}" />
        </label>
        <label title="${escapeHtml(institutionNameHelp)}">Institution name ${helpMarker(institutionNameHelp)}
          <input value="${escapeHtml(contributor.institutionName)}" data-field="institutionName" placeholder="Example University" title="${escapeHtml(institutionNameHelp)}" />
        </label>
        <label title="${escapeHtml(institutionCityHelp)}">Institution city ${helpMarker(institutionCityHelp)}
          <input value="${escapeHtml(contributor.institutionCity)}" data-field="institutionCity" placeholder="Berlin" title="${escapeHtml(institutionCityHelp)}" />
        </label>
        <label title="${escapeHtml(institutionCountryHelp)}">Institution country ${helpMarker(institutionCountryHelp)}
          <input value="${escapeHtml(contributor.institutionCountry)}" data-field="institutionCountry" placeholder="Germany" title="${escapeHtml(institutionCountryHelp)}" />
        </label>
      </div>
    `;
    row.querySelectorAll("input").forEach((input) => {
      input.addEventListener("input", () => {
        contributor[input.dataset.field] = input.value.trim();
        updatePreview();
      });
    });
    row.querySelector("button").addEventListener("click", () => {
      state.contributors.splice(index, 1);
      renderContributors();
      updatePreview();
    });
    contributorsList.appendChild(row);
  });
}

function addContributor() {
  state.contributors.push(createContributor());
  renderContributors();
  updatePreview();
}

async function handleParticipantsImport(event) {
  const file = event.target.files?.[0];
  if (!file) {
    return;
  }

  try {
    const text = await file.text();
    state.participants = isJsonFile(file)
      ? participantsFromJson(text)
      : participantsFromTable(text);

    renderParticipants();
    renderCharacteristics();
    updateCrossrefOptions();
    updatePreview();
    showImportFile(participantsImportFile, file.name);
    participantsImportSummary.textContent = `Imported ${state.participants.length} participant row(s) from ${file.name}.`;
    participantsImportSummary.className = "import-summary ok";
  } catch (error) {
    participantsImportSummary.textContent = `Could not import ${file.name}: ${error.message}`;
    participantsImportSummary.className = "import-summary warning";
  } finally {
    participantsImport.value = "";
  }
}

async function handleCharacteristicsImport(event) {
  const file = event.target.files?.[0];
  if (!file) {
    return;
  }

  try {
    const text = await file.text();
    state.characteristics = isJsonFile(file)
      ? characteristicsFromJson(text)
      : characteristicsFromTable(text);

    renderCharacteristics();
    updatePreview();
    showImportFile(characteristicsImportFile, file.name);
    characteristicsImportSummary.textContent = `Imported ${state.characteristics.length} characteristic row(s) from ${file.name}.`;
    characteristicsImportSummary.className = "import-summary ok";
  } catch (error) {
    characteristicsImportSummary.textContent = `Could not import ${file.name}: ${error.message}`;
    characteristicsImportSummary.className = "import-summary warning";
  } finally {
    characteristicsImport.value = "";
  }
}

function participantsFromJson(text) {
  const parsed = JSON.parse(text);
  const rows = Array.isArray(parsed)
    ? parsed
    : Array.isArray(parsed?.participants)
      ? parsed.participants
      : null;

  if (!rows) {
    throw new Error("Expected participants.json as an array, or an object with a participants array.");
  }

  return rows.map(participantFromSchema);
}

function participantsFromTable(text) {
  return parseTableText(text).map(participantFromSchema);
}

function participantFromSchema(row) {
  return {
    id: row.participant_internal_id || row.id || row.participant_id || "",
    age: row.participant_age ?? row.age ?? "",
    sex: row.participant_sex || row.sex || "",
    gender: row.participant_gender || row.gender || "",
  };
}

function characteristicsFromJson(text) {
  const parsed = JSON.parse(text);
  const rows = Array.isArray(parsed)
    ? parsed
    : Array.isArray(parsed?.participant_characteristics)
      ? parsed.participant_characteristics
      : Array.isArray(parsed?.characteristics)
        ? parsed.characteristics
        : null;

  if (!rows) {
    throw new Error("Expected participant characteristics as an array, or an object with participant_characteristics.");
  }

  return rows.map(characteristicFromSchema);
}

function characteristicsFromTable(text) {
  return parseTableText(text).map(characteristicFromSchema);
}

function characteristicFromSchema(row) {
  return {
    participantId: row.participant_internal_id || row.participant_id || "",
    name: row.participant_characteristic_name || row.name || "",
    value: row.participant_characteristic_value || row.value || "",
    unit: row.participant_characteristic_unit || row.unit || "",
    description: row.participant_characteristic_description || row.description || "",
  };
}

function clearParticipantsPage() {
  clearAllParticipants("Participants page cleared. Add rows manually or import participant files.");
  clearAllCharacteristics("Participant characteristics cleared. Add rows manually or import a characteristics file.");
}

function clearAllParticipants(message = "All participant rows cleared. Add rows manually or import another file.") {
  message = normalizeStatusMessage(message, "All participant rows cleared. Add rows manually or import another file.");
  state.participants = [];
  participantsImport.value = "";
  hideImportFile(participantsImportFile);
  participantsImportSummary.textContent = message;
  participantsImportSummary.className = "import-summary";
  renderParticipants();
  renderCharacteristics();
  updateCrossrefOptions();
  updatePreview();
}

function clearAllCharacteristics(message = "All characteristic rows cleared. Add rows manually or import another file.") {
  message = normalizeStatusMessage(message, "All characteristic rows cleared. Add rows manually or import another file.");
  state.characteristics = [];
  characteristicsImport.value = "";
  hideImportFile(characteristicsImportFile);
  characteristicsImportSummary.textContent = message;
  characteristicsImportSummary.className = "import-summary";
  renderCharacteristics();
  updatePreview();
}

async function handleDevicesImport(event) {
  const file = event.target.files?.[0];
  if (!file) {
    return;
  }
  await importDevicesFile(file);
}

async function importDevicesFile(file) {
  devicesImportSummary.textContent = `Reading ${file.name}...`;
  devicesImportSummary.className = "import-summary";

  try {
    const text = await file.text();
    state.devices = isJsonFile(file)
      ? devicesFromJson(text)
      : devicesFromTable(text);

    if (state.devices.length === 0) {
      throw new Error("No device rows were found in the uploaded file.");
    }

    renderDevices();
    updateCrossrefOptions();
    updatePreview();
    showImportFile(devicesImportFile, file.name);
    devicesImportSummary.textContent = `Imported ${state.devices.length} device row(s) from ${file.name}. Datasheet IDs can be finalized after the datasheet step.`;
    devicesImportSummary.className = "import-summary ok";
  } catch (error) {
    devicesImportSummary.textContent = `Could not import ${file.name}: ${error.message}`;
    devicesImportSummary.className = "import-summary warning";
  } finally {
    devicesImport.value = "";
  }
}

function devicesFromJson(text) {
  const parsed = JSON.parse(text);
  const rows = Array.isArray(parsed)
    ? parsed
    : Array.isArray(parsed?.devices)
      ? parsed.devices
      : parsed?.device_internal_id || parsed?.device_id || parsed?.id
        ? [parsed]
        : null;

  if (!rows) {
    throw new Error("Expected devices.json as an array, a single device object, or an object with a devices array.");
  }

  return rows.map(deviceFromSchema);
}

function devicesFromTable(text) {
  return parseTableText(text).map(deviceFromSchema);
}

function deviceFromSchema(row) {
  return {
    id: row.device_internal_id || row.id || row.device_id || "",
    manufacturer: row.device_manufacturer || row.manufacturer || "",
    model: row.device_model || row.model || "",
    serialNumber: row.device_serial_number || row.serial_number || "",
    calibrationDate: row.device_calibration_date || row.calibration_date || "",
    firmwareVersion: row.device_firmware_version || row.firmware_version || "",
    datasheetId: row.device_datasheet_id || row.datasheet_id || "",
    sensorsText: sensorsToText(row.device_sensors || row.sensors || ""),
  };
}

function sensorsToText(sensors) {
  if (Array.isArray(sensors)) {
    return sensors
      .map((sensor) => {
        if (typeof sensor === "string") {
          return sensor.trim();
        }
        const type = sensor?.device_sensor_type || sensor?.sensor_type || "";
        const datasheetId = sensor?.device_sensor_datasheet_id || sensor?.sensor_datasheet_id || "";
        return [type, datasheetId].filter(Boolean).join(" | ");
      })
      .filter(Boolean)
      .join("\n");
  }
  return String(sensors || "")
    .split(";")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .join("\n");
}

function clearDevicesPage() {
  clearAllDevices("Devices page cleared. Add rows manually or import a devices file.");
}

function clearAllDevices(message = "All device rows cleared. Add rows manually or import another file.") {
  message = normalizeStatusMessage(message, "All device rows cleared. Add rows manually or import another file.");
  state.devices = [];
  devicesImport.value = "";
  hideImportFile(devicesImportFile);
  devicesImportSummary.textContent = message;
  devicesImportSummary.className = "import-summary";
  renderDevices();
  updateCrossrefOptions();
  updatePreview();
}

async function handleDatasheetsImport(event) {
  const files = Array.from(event.target.files || []);
  if (files.length === 0) {
    return;
  }
  await importDatasheetsFiles(files);
}

async function importDatasheetsFiles(files) {
  datasheetsImportSummary.textContent = `Reading ${files.length} datasheet file(s)...`;
  datasheetsImportSummary.className = "import-summary";

  try {
    const parsedRows = [];
    for (const file of files) {
      const text = await file.text();
      const rows = isJsonFile(file)
        ? datasheetsFromJson(text)
        : datasheetsFromTable(text);
      parsedRows.push(...rows);
      if (!state.datasheetImportedFiles.includes(file.name)) {
        state.datasheetImportedFiles.push(file.name);
      }
    }

    if (parsedRows.length === 0) {
      throw new Error("No datasheet rows were found in the uploaded file.");
    }

    const result = upsertDatasheets(parsedRows);
    renderDatasheets();
    renderDevices();
    updateCrossrefOptions();
    updatePreview();
    showImportedFiles(datasheetsImportFile, state.datasheetImportedFiles);
    datasheetsImportSummary.textContent = `Imported ${parsedRows.length} datasheet row(s): ${result.added} added, ${result.updated} updated. Types: ${summarizeDatasheetTypes(parsedRows)}.`;
    datasheetsImportSummary.className = "import-summary ok";
  } catch (error) {
    datasheetsImportSummary.textContent = `Could not import datasheet file(s): ${error.message}`;
    datasheetsImportSummary.className = "import-summary warning";
  } finally {
    datasheetsImport.value = "";
  }
}

function upsertDatasheets(rows) {
  let added = 0;
  let updated = 0;
  const hasExistingContent = state.datasheets.some((entry) => entry.id || entry.manufacturer || entry.model || entry.type);

  if (!hasExistingContent) {
    state.datasheets = [];
  }

  rows.forEach((row) => {
    const existingIndex = row.id
      ? state.datasheets.findIndex((entry) => entry.id === row.id)
      : -1;

    if (existingIndex >= 0) {
      state.datasheets[existingIndex] = row;
      updated += 1;
    } else {
      state.datasheets.push(row);
      added += 1;
    }
  });

  return { added, updated };
}

function showImportedFiles(element, fileNames) {
  element.hidden = false;
  element.textContent = `Imported files: ${fileNames.join(", ")}`;
}

function summarizeDatasheetTypes(rows) {
  const types = Array.from(new Set(rows.map((row) => row.type).filter(Boolean)));
  return types.length ? types.join(", ") : "not specified";
}

function datasheetsFromJson(text) {
  const parsed = JSON.parse(text);
  const rows = Array.isArray(parsed)
    ? parsed
    : Array.isArray(parsed?.datasheets)
      ? parsed.datasheets
      : parsed?.datasheet_id || parsed?.id
        ? [parsed]
        : null;

  if (!rows) {
    throw new Error("Expected a datasheet array, a single datasheet object, or an object with a datasheets array.");
  }

  return rows.map(datasheetFromSchema);
}

function datasheetsFromTable(text) {
  return parseTableText(text).map(datasheetFromSchema);
}

function datasheetFromSchema(row) {
  return {
    id: row.datasheet_id || row.id || "",
    version: row.datasheet_version || row.version || "",
    manufacturer: row.datasheet_manufacturer || row.manufacturer || "",
    type: row.datasheet_type || row.type || "",
    model: row.datasheet_model || row.model || "",
    calibrationInterval: row.datasheet_calibration_interval ?? row.calibration_interval ?? "",
    spectralSensitivityText: spectralSensitivityToText(row.datasheet_calibration_spectral_sensitivity || row.spectral_sensitivity || ""),
    linearity: row.datasheet_calibration_linearity || row.linearity || "",
    directionalResponse: row.datasheet_calibration_directional_response || row.directional_response || "",
    range: row.datasheet_calibration_range || row.calibration_range || row.range || "",
    channelsText: channelsToText(row.datasheet_channel || row.channels || ""),
  };
}

function spectralSensitivityToText(value) {
  if (Array.isArray(value)) {
    return value
      .map((entry) => {
        const wavelength = entry?.datasheet_calibration_spectral_sensitivity_wavelength ?? entry?.wavelength ?? "";
        const relative = entry?.datasheet_calibration_spectral_sensitivity_relative ?? entry?.relative ?? "";
        return wavelength !== "" || relative !== "" ? `${wavelength},${relative}` : "";
      })
      .filter(Boolean)
      .join("\n");
  }
  return String(value || "")
    .split(";")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .join("\n");
}

function channelsToText(value) {
  if (Array.isArray(value)) {
    return value
      .map((entry) => {
        const nr = entry?.datasheet_channel_nr ?? entry?.channel_nr ?? "";
        const name = entry?.datasheet_channel_name || entry?.channel_name || "";
        const unit = entry?.datasheet_channel_unit || entry?.channel_unit || "";
        const description = entry?.datasheet_channel_description || entry?.channel_description || "";
        return [nr, name, unit, description].filter((part) => part !== "").join(" | ");
      })
      .filter(Boolean)
      .join("\n");
  }
  return String(value || "")
    .split(";")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .join("\n");
}

function clearDatasheetsPage() {
  clearAllDatasheets("Datasheets page cleared. Add rows manually or import a datasheet file.");
}

function clearAllDatasheets(message = "All datasheet rows cleared. Add rows manually or import another file.") {
  message = normalizeStatusMessage(message, "All datasheet rows cleared. Add rows manually or import another file.");
  state.datasheets = [];
  state.datasheetImportedFiles = [];
  datasheetsImport.value = "";
  hideImportFile(datasheetsImportFile);
  datasheetsImportSummary.textContent = message;
  datasheetsImportSummary.className = "import-summary";
  renderDatasheets();
  renderDevices();
  updateCrossrefOptions();
  updatePreview();
}

async function handleDatasetImport(event) {
  const file = event.target.files?.[0];
  if (!file) {
    return;
  }
  await importDatasetFile(file);
}

async function importDatasetFile(file) {
  datasetImportSummary.textContent = `Reading ${file.name}...`;
  datasetImportSummary.className = "import-summary";

  try {
    const parsed = JSON.parse(await file.text());
    const rows = Array.isArray(parsed)
      ? parsed
      : Array.isArray(parsed?.datasets)
        ? parsed.datasets
        : parsed?.dataset_internal_id
          ? [parsed]
          : null;

    if (!rows || rows.length === 0) {
      throw new Error("Expected datasets.json as an array, a single dataset object, or an object with a datasets array.");
    }

    fields.schemaVersion.value = rows.find((row) => row?.schema_version)?.schema_version || fields.schemaVersion.value || "2.0.0";
    state.datasets = rows.map(datasetRecordFromSchema);
    state.activeDatasetIndex = 0;
    state.activeGroupIndex = 0;
    syncControlsFromActiveDataset();
    showImportFile(datasetImportFile, file.name);
    datasetImportSummary.textContent = `Imported ${rows.length} dataset record(s) from ${file.name}.`;
    datasetImportSummary.className = "import-summary ok";
  } catch (error) {
    datasetImportSummary.textContent = `Could not import ${file.name}: ${error.message}`;
    datasetImportSummary.className = "import-summary warning";
  } finally {
    datasetImport.value = "";
  }
}

function populateDatasetFromSchema(dataset) {
  state.datasets = [datasetRecordFromSchema(dataset)];
  state.activeDatasetIndex = 0;
  state.activeGroupIndex = 0;
  fields.schemaVersion.value = dataset.schema_version || fields.schemaVersion.value || "2.0.0";
  syncControlsFromActiveDataset();
  updatePreview();
}

function datasetRecordFromSchema(dataset) {
  const record = createDatasetRecord();
  record.datasetId = dataset.dataset_internal_id || "";
  record.instructions = dataset.dataset_instructions || "";
  record.studyId = dataset.dataset_crossref?.dataset_crossref_study_id || "";
  record.participantId = dataset.dataset_crossref?.dataset_crossref_participant_id || "";
  record.deviceId = dataset.dataset_crossref?.dataset_crossref_device_id || "";
  record.deviceLocation = dataset.dataset_device_location || "";
  record.samplingInterval = dataset.dataset_sampling_interval ?? "";
  record.datasetTimezone = dataset.dataset_timezone || "";
  record.latitude = Array.isArray(dataset.dataset_location) ? dataset.dataset_location[0] || "" : "";
  record.longitude = Array.isArray(dataset.dataset_location) ? dataset.dataset_location[1] || "" : "";

  const terms = normalizeDatasetTerms(dataset.dataset_variable_terms);
  const datasetFiles = Array.isArray(dataset.dataset_file) && dataset.dataset_file.length
    ? dataset.dataset_file
    : [];

  record.fileGroups = datasetFiles.length
    ? datasetFiles.map((fileGroup, index) => fileGroupFromSchema(fileGroup, terms, `File group ${index + 1}`))
    : [createFileGroup()];

  const datetimeTarget = record.fileGroups.find((group) => !group.auxiliary) || record.fileGroups[0];
  const datasetDatetime = dataset.dataset_datetime || {};
  datetimeTarget.datetimeSource = "column";
  datetimeTarget.datetimeDate = datasetDatetime.dataset_datetime_date || "";
  datetimeTarget.datetimeDateformat = datasetDatetime.dataset_datetime_dateformat || "";
  datetimeTarget.datetimeTime = datasetDatetime.dataset_datetime_time || "";
  datetimeTarget.datetimeTimeformat = datasetDatetime.dataset_datetime_timeformat || "";

  return record;
}

function normalizeDatasetTerms(terms) {
  const normalized = Array.isArray(terms)
    ? terms
      .map((entry) => ({
        term: entry?.term || "",
        label: entry?.label || "",
      }))
      .filter((entry) => entry.term)
    : [];
  if (!normalized.some((entry) => entry.term === "other")) {
    normalized.push({ term: "other", label: "Other" });
  }
  return normalized;
}

function fileGroupFromSchema(fileGroup, datasetTerms, fallbackName) {
  const group = createFileGroup(fallbackName);
  group.files = Array.isArray(fileGroup.dataset_file_names)
    ? fileGroup.dataset_file_names.map((name) => pathBasename(name))
    : [];
  group.columns = Array.isArray(fileGroup.dataset_file_variables)
    ? fileGroup.dataset_file_variables.map((variable) => variable.dataset_file_variables_name).filter(Boolean)
    : [];
  group.fileFormat = fileGroup.dataset_file_format || "";
  group.encoding = Array.isArray(fileGroup.dataset_file_encoding) ? fileGroup.dataset_file_encoding[0] || "" : "";
  group.fileTimezone = fileGroup.dataset_file_timezone || "";
  group.auxiliary = typeof fileGroup.dataset_file_auxiliary === "boolean" ? fileGroup.dataset_file_auxiliary : "";
  group.headerRow = fileGroup.dataset_file_header_row ?? "";
  group.preprocessingBol = typeof fileGroup.dataset_file_preprocessing?.dataset_file_preprocessing_bol === "boolean"
    ? fileGroup.dataset_file_preprocessing.dataset_file_preprocessing_bol
    : "";
  group.preprocessingDesc = Array.isArray(fileGroup.dataset_file_preprocessing?.dataset_file_preprocessing_desc)
    ? fileGroup.dataset_file_preprocessing.dataset_file_preprocessing_desc.join("\n")
    : "";
  group.terms = mergeTermsWithVariables(datasetTerms, fileGroup.dataset_file_variables);
  group.variableState = variableStateFromSchema(fileGroup.dataset_file_variables, fileGroup.primary_variables);
  group.name = group.auxiliary === true ? "Auxiliary file group" : "Primary file group";
  return group;
}

function mergeTermsWithVariables(datasetTerms, variables) {
  const terms = datasetTerms.map((entry) => ({ ...entry }));
  (variables || []).forEach((variable) => {
    const term = variable?.dataset_file_variables_term?.variable_term;
    if (term && !terms.some((entry) => entry.term === term)) {
      terms.push({ term, label: term === "other" ? "Other" : term });
    }
  });
  if (!terms.some((entry) => entry.term === "other")) {
    terms.push({ term: "other", label: "Other" });
  }
  return terms;
}

function variableStateFromSchema(variables, primaryVariables) {
  const primary = new Set(Array.isArray(primaryVariables) ? primaryVariables : []);
  return (variables || []).reduce((stateByColumn, variable) => {
    const column = variable.dataset_file_variables_name;
    if (!column) return stateByColumn;
    const term = variable.dataset_file_variables_term?.variable_term || "other";
    stateByColumn[column] = {
      primary: primary.has(column),
      label: variable.dataset_file_variables_labels || column,
      unit: variable.dataset_file_variables_units || "",
      calibration: variable.dataset_file_variables_calibration || "",
      term,
      variableName: variable.dataset_file_variables_term?.variable_name || column,
    };
    return stateByColumn;
  }, {});
}

function pathBasename(path) {
  return String(path || "").split(/[\\/]/).pop();
}

function setPendingSelectValue(select, value) {
  if (!select) return;
  if (value && !Array.from(select.options).some((option) => option.value === value)) {
    select.insertAdjacentHTML("beforeend", `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`);
  }
  select.value = value || "";
}

function clearDatasetPage(message = "Dataset page cleared. Add data manually or import another datasets.json file.") {
  const next = createDatasetRecord();
  state.datasets = [next];
  state.activeDatasetIndex = 0;
  state.fileGroups = next.fileGroups;
  state.activeGroupIndex = 0;
  datasetImport.value = "";
  hideImportFile(datasetImportFile);
  datasetImportSummary.textContent = normalizeStatusMessage(message, "Dataset page cleared. Add data manually or import another datasets.json file.");
  datasetImportSummary.className = "import-summary";
  syncControlsFromActiveDataset();
  updateCrossrefOptions();
  updatePreview();
}

function normalizeStatusMessage(message, fallback) {
  return typeof message === "string" ? message : fallback;
}

function renderParticipants() {
  participantsList.innerHTML = "";
  state.participants.forEach((participant, index) => {
    const row = document.createElement("div");
    row.className = "participant-card";
    const help = state.participantHelp || {};
    const idHelp = schemaHelpTitle(help.participant_internal_id, "Unique ID for participant");
    const ageHelp = schemaHelpTitle(help.participant_age, "Age of the participant");
    const sexHelp = schemaHelpTitle(help.participant_sex, "Sex of participant");
    const genderHelp = schemaHelpTitle(help.participant_gender, "Gender of participant");
    row.innerHTML = `
      <div class="record-card-heading">
        <h3>Participant ${index + 1}</h3>
        <button type="button" class="remove-row" ${state.participants.length === 1 ? "disabled" : ""}>Remove participant</button>
      </div>
      <div class="participant-fields">
        <label title="${escapeHtml(idHelp)}">Participant ID <span class="required">*</span> ${helpMarker(idHelp)}
          <input value="${escapeHtml(participant.id)}" data-field="id" placeholder="P001" title="${escapeHtml(idHelp)}" />
        </label>
        <label title="${escapeHtml(ageHelp)}">Age <span class="required">*</span> ${helpMarker(ageHelp)}
          <input value="${escapeHtml(participant.age)}" data-field="age" type="number" min="0" max="120" placeholder="35" title="${escapeHtml(ageHelp)}" />
        </label>
        <label title="${escapeHtml(sexHelp)}">Sex ${helpMarker(sexHelp)}
          <input value="${escapeHtml(participant.sex)}" data-field="sex" placeholder="female" title="${escapeHtml(sexHelp)}" />
        </label>
        <label title="${escapeHtml(genderHelp)}">Gender ${helpMarker(genderHelp)}
          <input value="${escapeHtml(participant.gender)}" data-field="gender" placeholder="woman" title="${escapeHtml(genderHelp)}" />
        </label>
      </div>
    `;
    row.querySelectorAll("input").forEach((input) => {
      input.addEventListener("input", () => {
        participant[input.dataset.field] = input.value.trim();
        updateCrossrefOptions();
        renderCharacteristics();
        updatePreview();
      });
    });
    row.querySelector("button").addEventListener("click", () => {
      state.participants.splice(index, 1);
      renderParticipants();
      renderCharacteristics();
      updateCrossrefOptions();
      updatePreview();
    });
    participantsList.appendChild(row);
  });
}

function addParticipant() {
  state.participants.push(createParticipant());
  renderParticipants();
  updateCrossrefOptions();
  updatePreview();
}

function renderCharacteristics() {
  characteristicsList.innerHTML = "";
  state.characteristics.forEach((characteristic, index) => {
    const row = document.createElement("div");
    row.className = "participant-card";
    const help = state.characteristicHelp || {};
    const participantHelp = schemaHelpTitle(help.participant_internal_id, "Linked participant ID");
    const nameHelp = schemaHelpTitle(help.participant_characteristic_name, "Name of the participant characteristic");
    const valueHelp = schemaHelpTitle(help.participant_characteristic_value, "Value of the participant characteristic");
    const unitHelp = schemaHelpTitle(help.participant_characteristic_unit, "Unit of the characteristic value");
    const descriptionHelp = schemaHelpTitle(help.participant_characteristic_description, "Additional notes or description");
    row.innerHTML = `
      <div class="record-card-heading">
        <h3>Characteristic ${index + 1}</h3>
        <button type="button" class="remove-row">Remove characteristic</button>
      </div>
      <div class="participant-fields">
        <label title="${escapeHtml(participantHelp)}">Participant ${helpMarker(participantHelp)}
          <select class="participant-select" data-field="participantId" title="${escapeHtml(participantHelp)}"></select>
        </label>
        <label title="${escapeHtml(nameHelp)}">Name ${helpMarker(nameHelp)}
          <input value="${escapeHtml(characteristic.name)}" data-field="name" placeholder="chronotype" title="${escapeHtml(nameHelp)}" />
        </label>
        <label title="${escapeHtml(valueHelp)}">Value ${helpMarker(valueHelp)}
          <input value="${escapeHtml(characteristic.value)}" data-field="value" placeholder="intermediate" title="${escapeHtml(valueHelp)}" />
        </label>
        <label title="${escapeHtml(unitHelp)}">Unit ${helpMarker(unitHelp)}
          <input value="${escapeHtml(characteristic.unit)}" data-field="unit" placeholder="score" title="${escapeHtml(unitHelp)}" />
        </label>
        <label class="wide" title="${escapeHtml(descriptionHelp)}">Description ${helpMarker(descriptionHelp)}
          <input value="${escapeHtml(characteristic.description)}" data-field="description" placeholder="Optional notes" title="${escapeHtml(descriptionHelp)}" />
        </label>
      </div>
    `;
    const select = row.querySelector("select");
    setSelectOptions(select, getParticipantIds(), "Select participant");
    select.value = characteristic.participantId;
    row.querySelectorAll("input, select").forEach((input) => {
      input.addEventListener("input", () => {
        characteristic[input.dataset.field] = input.value.trim();
        updatePreview();
      });
      input.addEventListener("change", () => {
        characteristic[input.dataset.field] = input.value.trim();
        updatePreview();
      });
    });
    row.querySelector("button").addEventListener("click", () => {
      state.characteristics.splice(index, 1);
      renderCharacteristics();
      updatePreview();
    });
    characteristicsList.appendChild(row);
  });
}

function addCharacteristic() {
  state.characteristics.push(createCharacteristic());
  renderCharacteristics();
  updateCrossrefOptions();
  updatePreview();
}

function renderDevices() {
  devicesList.innerHTML = "";
  state.devices.forEach((device, index) => {
    const card = document.createElement("div");
    card.className = "participant-card";
    const help = state.deviceHelp || {};
    const sensorHelp = state.deviceSensorHelp || {};
    const idHelp = schemaHelpTitle(help.device_internal_id, "Unique internal identifier for the device");
    const manufacturerHelp = schemaHelpTitle(help.device_manufacturer, "Manufacturer of the device");
    const modelHelp = schemaHelpTitle(help.device_model, "Model name or number of the device");
    const serialNumberHelp = schemaHelpTitle(help.device_serial_number, "Serial number assigned to the individual device");
    const calibrationDateHelp = schemaHelpTitle(help.device_calibration_date, "Date of last calibration, or blank if unknown");
    const firmwareHelp = schemaHelpTitle(help.device_firmware_version, "Firmware version installed on the device");
    const datasheetHelp = schemaHelpTitle(help.device_datasheet_id, "Reference to the general device datasheet. This can be completed after the datasheet step.");
    const sensorTypeHelp = schemaHelpTitle(sensorHelp.device_sensor_type, "Sensor type, e.g. photopic light sensor");
    const sensorDatasheetHelp = schemaHelpTitle(sensorHelp.device_sensor_datasheet_id, "Optional sensor-specific datasheet ID");
    const sensorsHelp = `${schemaHelpTitle(help.device_sensors, "List of sensors contained within the device")} Add one row per sensor.`;
    card.innerHTML = `
      <div class="record-card-heading">
        <h3>Device ${index + 1}</h3>
        <button type="button" class="remove-row">Remove device</button>
      </div>
      <div class="participant-fields">
        <label title="${escapeHtml(idHelp)}">Device ID <span class="required">*</span> ${helpMarker(idHelp)}
          <input data-field="id" value="${escapeHtml(device.id)}" placeholder="D001" title="${escapeHtml(idHelp)}" />
        </label>
        <label title="${escapeHtml(manufacturerHelp)}">Manufacturer <span class="required">*</span> ${helpMarker(manufacturerHelp)}
          <input data-field="manufacturer" value="${escapeHtml(device.manufacturer)}" placeholder="ActLumus" title="${escapeHtml(manufacturerHelp)}" />
        </label>
        <label title="${escapeHtml(modelHelp)}">Model <span class="required">*</span> ${helpMarker(modelHelp)}
          <input data-field="model" value="${escapeHtml(device.model)}" placeholder="Model name" title="${escapeHtml(modelHelp)}" />
        </label>
        <label title="${escapeHtml(serialNumberHelp)}">Serial number <span class="required">*</span> ${helpMarker(serialNumberHelp)}
          <input data-field="serialNumber" value="${escapeHtml(device.serialNumber)}" placeholder="SN123" title="${escapeHtml(serialNumberHelp)}" />
        </label>
        <label title="${escapeHtml(calibrationDateHelp)}">Calibration date <span class="required">*</span> ${helpMarker(calibrationDateHelp)}
          <input data-field="calibrationDate" value="${escapeHtml(device.calibrationDate)}" placeholder="YYYY-MM-DD or blank if unknown" title="${escapeHtml(calibrationDateHelp)}" />
        </label>
        <label title="${escapeHtml(firmwareHelp)}">Firmware version ${helpMarker(firmwareHelp)}
          <input data-field="firmwareVersion" value="${escapeHtml(device.firmwareVersion)}" placeholder="v1.2.3" title="${escapeHtml(firmwareHelp)}" />
        </label>
        <label class="wide" title="${escapeHtml(datasheetHelp)}">Datasheet ID <span class="required">*</span> ${helpMarker(datasheetHelp)}
          <select class="datasheet-select" data-field="datasheetId" title="${escapeHtml(datasheetHelp)}"></select>
          <span class="field-help">If the datasheet has not been created yet, leave this blank or keep an imported pending ID and return after the Datasheets step.</span>
        </label>
        <div class="wide nested-editor" title="${escapeHtml(sensorsHelp)}">
          <div class="nested-editor-heading">
            <span>Sensors ${helpMarker(sensorsHelp)}</span>
            <button type="button" class="secondary-button small-button add-sensor-row">Add sensor</button>
          </div>
          <div class="nested-grid nested-grid-two nested-grid-header" aria-hidden="true">
            <span>Device sensor type <span class="required">*</span></span>
            <span>Sensor datasheet ID</span>
            <span></span>
          </div>
          <div class="device-sensors-list"></div>
          <span class="field-help">Sensor type is required. Sensor datasheet ID is optional and can be completed after datasheet records are added.</span>
        </div>
      </div>
    `;
    const select = card.querySelector("select");
    setSelectOptions(select, Array.from(new Set([...getDatasheetIds(), device.datasheetId].filter(Boolean))), "Add or import datasheet first");
    select.value = device.datasheetId;
    setupDeviceSensorEditor(card, device, sensorTypeHelp, sensorDatasheetHelp);
    card.querySelectorAll("input[data-field], textarea[data-field], select[data-field]").forEach((input) => {
      input.addEventListener("input", () => {
        device[input.dataset.field] = input.value.trim();
        updateCrossrefOptions();
        updatePreview();
      });
      input.addEventListener("change", () => {
        device[input.dataset.field] = input.value.trim();
        updateCrossrefOptions();
        updatePreview();
      });
    });
    card.querySelector("button").addEventListener("click", () => {
      state.devices.splice(index, 1);
      renderDevices();
      updateCrossrefOptions();
      updatePreview();
    });
    devicesList.appendChild(card);
  });
}

function addDevice() {
  state.devices.push(createDevice());
  renderDevices();
  updateCrossrefOptions();
  updatePreview();
}

function setupDeviceSensorEditor(card, device, sensorTypeHelp, sensorDatasheetHelp) {
  const list = card.querySelector(".device-sensors-list");
  const addButton = card.querySelector(".add-sensor-row");
  let rows = parseDeviceSensorRows(device.sensorsText);

  const renderRows = () => {
    list.innerHTML = "";
    rows.forEach((row, rowIndex) => {
      const wrapper = document.createElement("div");
      wrapper.className = "nested-grid nested-grid-two nested-row";
      wrapper.innerHTML = `
        <label title="${escapeHtml(sensorTypeHelp)}">
          <span class="sr-only">Device sensor type</span>
          <input data-sensor-field="type" value="${escapeHtml(row.type)}" placeholder="Photopic light sensor" title="${escapeHtml(sensorTypeHelp)}" />
        </label>
        <label title="${escapeHtml(sensorDatasheetHelp)}">
          <span class="sr-only">Sensor datasheet ID</span>
          <select data-sensor-field="datasheetId" title="${escapeHtml(sensorDatasheetHelp)}"></select>
        </label>
        <button type="button" class="remove-row small-button">Remove</button>
      `;
      const datasheetSelect = wrapper.querySelector("select");
      setSelectOptions(datasheetSelect, Array.from(new Set([...getDatasheetIds(), row.datasheetId].filter(Boolean))), "Optional datasheet");
      datasheetSelect.value = row.datasheetId;
      wrapper.querySelectorAll("input, select").forEach((input) => {
        input.addEventListener("input", () => {
          rows[rowIndex][input.dataset.sensorField] = input.value.trim();
          device.sensorsText = deviceSensorRowsToText(rows);
          updatePreview();
        });
        input.addEventListener("change", () => {
          rows[rowIndex][input.dataset.sensorField] = input.value.trim();
          device.sensorsText = deviceSensorRowsToText(rows);
          updatePreview();
        });
      });
      wrapper.querySelector("button").addEventListener("click", () => {
        rows.splice(rowIndex, 1);
        device.sensorsText = deviceSensorRowsToText(rows);
        renderRows();
        updatePreview();
      });
      list.appendChild(wrapper);
    });
  };

  addButton.addEventListener("click", () => {
    rows.push({ type: "", datasheetId: "" });
    device.sensorsText = deviceSensorRowsToText(rows);
    renderRows();
    updatePreview();
  });

  renderRows();
}

function parseDeviceSensorRows(text) {
  const rows = String(text || "")
    .split(/\r?\n|;/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [type, datasheetId] = line.split("|").map((part) => part.trim());
      return { type: type || "", datasheetId: datasheetId || "" };
    });
  return rows.length ? rows : [{ type: "", datasheetId: "" }];
}

function deviceSensorRowsToText(rows) {
  return rows
    .map((row) => [row.type, row.datasheetId].filter(Boolean).join(" | "))
    .filter(Boolean)
    .join("\n");
}

function renderDatasheets() {
  datasheetsList.innerHTML = "";
  state.datasheets.forEach((datasheet, index) => {
    const card = document.createElement("div");
    card.className = "participant-card";
    const help = state.datasheetHelp || {};
    const spectralHelp = state.datasheetSpectralHelp || {};
    const channelHelp = state.datasheetChannelHelp || {};
    const idHelp = schemaHelpTitle(help.datasheet_id, "Datasheet ID referenced by devices");
    const versionHelp = schemaHelpTitle(help.datasheet_version, "Version label for this datasheet");
    const manufacturerHelp = schemaHelpTitle(help.datasheet_manufacturer, "Manufacturer of the sensor or device");
    const typeHelp = schemaHelpTitle(help.datasheet_type, "Type of sensor or device");
    const modelHelp = schemaHelpTitle(help.datasheet_model, "Model of the sensor or device");
    const intervalHelp = schemaHelpTitle(help.datasheet_calibration_interval, "Required device calibration interval in days");
    const spectralHelpText = `${schemaHelpTitle(help.datasheet_calibration_spectral_sensitivity, "Spectral sensitivity calibration values")} Use one wavelength,relative pair per line.`;
    const wavelengthHelp = schemaHelpTitle(spectralHelp.datasheet_calibration_spectral_sensitivity_wavelength, "Wavelength in nm");
    const relativeHelp = schemaHelpTitle(spectralHelp.datasheet_calibration_spectral_sensitivity_relative, "Relative spectral sensitivity");
    const linearityHelp = schemaHelpTitle(help.datasheet_calibration_linearity, "Linearity calibration information");
    const directionalHelp = schemaHelpTitle(help.datasheet_calibration_directional_response, "Directional response calibration information");
    const rangeHelp = schemaHelpTitle(help.datasheet_calibration_range, "Response range information");
    const channelsHelp = `${schemaHelpTitle(help.datasheet_channel, "Information on channels")} Add one row per channel.`;
    const channelNrHelp = schemaHelpTitle(channelHelp.datasheet_channel_nr, "Channel number");
    const channelNameHelp = schemaHelpTitle(channelHelp.datasheet_channel_name, "Channel name as it appears in exported files");
    const channelUnitHelp = schemaHelpTitle(channelHelp.datasheet_channel_unit, "Channel unit");
    const channelDescriptionHelp = schemaHelpTitle(channelHelp.datasheet_channel_description, "Channel description");
    const headingLabel = datasheet.type ? `Datasheet ${index + 1}: ${datasheet.type}` : `Datasheet ${index + 1}`;
    card.innerHTML = `
      <div class="record-card-heading">
        <h3>${escapeHtml(headingLabel)}</h3>
        <button type="button" class="remove-row">Remove datasheet</button>
      </div>
      <div class="participant-fields">
        <label title="${escapeHtml(idHelp)}">Datasheet ID <span class="required">*</span> ${helpMarker(idHelp)}
          <input data-field="id" value="${escapeHtml(datasheet.id)}" placeholder="lumitech-lt100-v1.0" title="${escapeHtml(idHelp)}" />
        </label>
        <label title="${escapeHtml(versionHelp)}">Version ${helpMarker(versionHelp)}
          <input data-field="version" value="${escapeHtml(datasheet.version)}" placeholder="1.0" title="${escapeHtml(versionHelp)}" />
        </label>
        <label title="${escapeHtml(manufacturerHelp)}">Manufacturer <span class="required">*</span> ${helpMarker(manufacturerHelp)}
          <input data-field="manufacturer" value="${escapeHtml(datasheet.manufacturer)}" placeholder="Lumitech" title="${escapeHtml(manufacturerHelp)}" />
        </label>
        <label title="${escapeHtml(typeHelp)}">Type <span class="required">*</span> ${helpMarker(typeHelp)}
          <input data-field="type" value="${escapeHtml(datasheet.type)}" placeholder="Wearable light sensor" title="${escapeHtml(typeHelp)}" />
        </label>
        <label title="${escapeHtml(modelHelp)}">Model <span class="required">*</span> ${helpMarker(modelHelp)}
          <input data-field="model" value="${escapeHtml(datasheet.model)}" placeholder="LT-100" title="${escapeHtml(modelHelp)}" />
        </label>
        <label title="${escapeHtml(intervalHelp)}">Calibration interval, days <span class="required">*</span> ${helpMarker(intervalHelp)}
          <input data-field="calibrationInterval" type="number" min="0" value="${escapeHtml(datasheet.calibrationInterval)}" placeholder="365" title="${escapeHtml(intervalHelp)}" />
        </label>
        <div class="wide nested-editor" title="${escapeHtml(spectralHelpText)}">
          <div class="nested-editor-heading">
            <span>Spectral sensitivity <span class="required">*</span> ${helpMarker(spectralHelpText)}</span>
            <button type="button" class="secondary-button small-button add-spectral-row">Add wavelength row</button>
          </div>
          <div class="nested-grid nested-grid-two nested-grid-header" aria-hidden="true">
            <span>Wavelength, nm <span class="required">*</span></span>
            <span>Relative sensitivity <span class="required">*</span></span>
            <span></span>
          </div>
          <div class="datasheet-spectral-list"></div>
          <span class="field-help">Add one row for each wavelength and its relative sensitivity value.</span>
        </div>
        <label title="${escapeHtml(linearityHelp)}">Linearity <span class="required">*</span> ${helpMarker(linearityHelp)}
          <input data-field="linearity" value="${escapeHtml(datasheet.linearity)}" placeholder="Example: +/-2%" title="${escapeHtml(linearityHelp)}" />
        </label>
        <label title="${escapeHtml(directionalHelp)}">Directional response <span class="required">*</span> ${helpMarker(directionalHelp)}
          <input data-field="directionalResponse" value="${escapeHtml(datasheet.directionalResponse)}" placeholder="Example: cosine corrected" title="${escapeHtml(directionalHelp)}" />
        </label>
        <label title="${escapeHtml(rangeHelp)}">Calibration range <span class="required">*</span> ${helpMarker(rangeHelp)}
          <input data-field="range" value="${escapeHtml(datasheet.range)}" placeholder="Example: 0-100000 lux" title="${escapeHtml(rangeHelp)}" />
        </label>
        <div class="wide nested-editor" title="${escapeHtml(channelsHelp)}">
          <div class="nested-editor-heading">
            <span>Channels ${helpMarker(channelsHelp)}</span>
            <button type="button" class="secondary-button small-button add-channel-row">Add channel</button>
          </div>
          <div class="nested-grid nested-grid-four nested-grid-header" aria-hidden="true">
            <span>Channel nr <span class="required">*</span></span>
            <span>Channel name <span class="required">*</span></span>
            <span>Unit</span>
            <span>Description</span>
            <span></span>
          </div>
          <div class="datasheet-channels-list"></div>
          <span class="field-help">Channel number and channel name are required. Unit and description are optional.</span>
        </div>
      </div>
    `;
    setupDatasheetSpectralEditor(card, datasheet, wavelengthHelp, relativeHelp);
    setupDatasheetChannelEditor(card, datasheet, channelNrHelp, channelNameHelp, channelUnitHelp, channelDescriptionHelp);
    card.querySelectorAll("input[data-field], textarea[data-field]").forEach((input) => {
      input.addEventListener("input", () => {
        datasheet[input.dataset.field] = input.value.trim();
        renderDevices();
        updateCrossrefOptions();
        updatePreview();
      });
    });
    card.querySelector("button").addEventListener("click", () => {
      state.datasheets.splice(index, 1);
      renderDatasheets();
      renderDevices();
      updateCrossrefOptions();
      updatePreview();
    });
    datasheetsList.appendChild(card);
  });
}

function addDatasheet() {
  state.datasheets.push(createDatasheet());
  renderDatasheets();
  updateCrossrefOptions();
  updatePreview();
}

function setupDatasheetSpectralEditor(card, datasheet, wavelengthHelp, relativeHelp) {
  const list = card.querySelector(".datasheet-spectral-list");
  const addButton = card.querySelector(".add-spectral-row");
  let rows = parseDatasheetSpectralRows(datasheet.spectralSensitivityText);

  const renderRows = () => {
    list.innerHTML = "";
    rows.forEach((row, rowIndex) => {
      const wrapper = document.createElement("div");
      wrapper.className = "nested-grid nested-grid-two nested-row";
      wrapper.innerHTML = `
        <label title="${escapeHtml(wavelengthHelp)}">
          <span class="sr-only">Wavelength</span>
          <input data-spectral-field="wavelength" type="number" min="0" step="any" value="${escapeHtml(row.wavelength)}" placeholder="450" title="${escapeHtml(wavelengthHelp)}" />
        </label>
        <label title="${escapeHtml(relativeHelp)}">
          <span class="sr-only">Relative sensitivity</span>
          <input data-spectral-field="relative" type="number" step="any" value="${escapeHtml(row.relative)}" placeholder="0.85" title="${escapeHtml(relativeHelp)}" />
        </label>
        <button type="button" class="remove-row small-button">Remove</button>
      `;
      wrapper.querySelectorAll("input").forEach((input) => {
        input.addEventListener("input", () => {
          rows[rowIndex][input.dataset.spectralField] = input.value.trim();
          datasheet.spectralSensitivityText = datasheetSpectralRowsToText(rows);
          updatePreview();
        });
      });
      wrapper.querySelector("button").addEventListener("click", () => {
        rows.splice(rowIndex, 1);
        datasheet.spectralSensitivityText = datasheetSpectralRowsToText(rows);
        renderRows();
        updatePreview();
      });
      list.appendChild(wrapper);
    });
  };

  addButton.addEventListener("click", () => {
    rows.push({ wavelength: "", relative: "" });
    datasheet.spectralSensitivityText = datasheetSpectralRowsToText(rows);
    renderRows();
    updatePreview();
  });

  renderRows();
}

function parseDatasheetSpectralRows(text) {
  const rows = String(text || "")
    .split(/\r?\n|;/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [wavelength, relative] = line.split(/[|,]/).map((part) => part.trim());
      return {
        wavelength: wavelength || "",
        relative: relative || "",
      };
    });
  return rows.length ? rows : [{ wavelength: "", relative: "" }];
}

function datasheetSpectralRowsToText(rows) {
  return rows
    .map((row) => [row.wavelength, row.relative].filter(Boolean).join(","))
    .filter(Boolean)
    .join("\n");
}

function setupDatasheetChannelEditor(card, datasheet, channelNrHelp, channelNameHelp, channelUnitHelp, channelDescriptionHelp) {
  const list = card.querySelector(".datasheet-channels-list");
  const addButton = card.querySelector(".add-channel-row");
  let rows = parseDatasheetChannelRows(datasheet.channelsText);

  const renderRows = () => {
    list.innerHTML = "";
    rows.forEach((row, rowIndex) => {
      const wrapper = document.createElement("div");
      wrapper.className = "nested-grid nested-grid-four nested-row";
      wrapper.innerHTML = `
        <label title="${escapeHtml(channelNrHelp)}">
          <span class="sr-only">Channel number</span>
          <input data-channel-field="nr" type="number" min="1" value="${escapeHtml(row.nr)}" placeholder="1" title="${escapeHtml(channelNrHelp)}" />
        </label>
        <label title="${escapeHtml(channelNameHelp)}">
          <span class="sr-only">Channel name</span>
          <input data-channel-field="name" value="${escapeHtml(row.name)}" placeholder="broadband" title="${escapeHtml(channelNameHelp)}" />
        </label>
        <label title="${escapeHtml(channelUnitHelp)}">
          <span class="sr-only">Channel unit</span>
          <input data-channel-field="unit" value="${escapeHtml(row.unit)}" placeholder="lux" title="${escapeHtml(channelUnitHelp)}" />
        </label>
        <label title="${escapeHtml(channelDescriptionHelp)}">
          <span class="sr-only">Channel description</span>
          <input data-channel-field="description" value="${escapeHtml(row.description)}" placeholder="Broadband visible light" title="${escapeHtml(channelDescriptionHelp)}" />
        </label>
        <button type="button" class="remove-row small-button">Remove</button>
      `;
      wrapper.querySelectorAll("input").forEach((input) => {
        input.addEventListener("input", () => {
          rows[rowIndex][input.dataset.channelField] = input.value.trim();
          datasheet.channelsText = datasheetChannelRowsToText(rows);
          updatePreview();
        });
      });
      wrapper.querySelector("button").addEventListener("click", () => {
        rows.splice(rowIndex, 1);
        datasheet.channelsText = datasheetChannelRowsToText(rows);
        renderRows();
        updatePreview();
      });
      list.appendChild(wrapper);
    });
  };

  addButton.addEventListener("click", () => {
    rows.push({ nr: "", name: "", unit: "", description: "" });
    datasheet.channelsText = datasheetChannelRowsToText(rows);
    renderRows();
    updatePreview();
  });

  renderRows();
}

function parseDatasheetChannelRows(text) {
  const rows = String(text || "")
    .split(/\r?\n|;/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [nr, name, unit, description] = line.split("|").map((part) => part.trim());
      return {
        nr: nr || "",
        name: name || "",
        unit: unit || "",
        description: description || "",
      };
    });
  return rows.length ? rows : [{ nr: "", name: "", unit: "", description: "" }];
}

function datasheetChannelRowsToText(rows) {
  return rows
    .map((row) => [row.nr, row.name, row.unit, row.description].filter(Boolean).join(" | "))
    .filter(Boolean)
    .join("\n");
}

function detectDelimiter(line) {
  const candidates = [",", ";", "\t", "|"];
  const counts = candidates.map((candidate) => ({
    delimiter: candidate,
    count: (line.match(new RegExp(escapeRegExp(candidate), "g")) || []).length,
  }));
  counts.sort((a, b) => b.count - a.count);
  return counts[0].count > 0 ? counts[0].delimiter : ",";
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function parseDelimitedLine(line, delimiter) {
  const cells = [];
  let current = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === '"' && quoted && next === '"') {
      current += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === delimiter && !quoted) {
      cells.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  cells.push(current.trim());
  return cells;
}

function parseTableText(text) {
  const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length < 2) {
    throw new Error("Expected a header row and at least one data row.");
  }

  const delimiter = detectDelimiter(lines[0]);
  const headers = parseDelimitedLine(lines[0], delimiter).map((header) => header.trim());
  return lines.slice(1).map((line) => {
    const cells = parseDelimitedLine(line, delimiter);
    return headers.reduce((row, header, index) => {
      row[header] = cells[index]?.trim() || "";
      return row;
    }, {});
  });
}

function normalizeHeader(value) {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function findHeaderRow(lines) {
  let best = { index: 0, score: -1, delimiter: "," };
  const scanLimit = Math.min(lines.length, 80);

  for (let index = 0; index < scanLimit; index += 1) {
    const line = lines[index];
    const delimiter = detectDelimiter(line);
    const columns = parseDelimitedLine(line, delimiter).filter(Boolean);
    const normalizedColumns = new Set(columns.map(normalizeHeader).filter(Boolean));
    const score = normalizedColumns.size;

    if (score > best.score && columns.length > 1) {
      best = { index, score, delimiter };
    }
  }

  return best;
}

async function readFileHeader(file) {
  const text = await file.text();
  const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0);
  const detected = findHeaderRow(lines);
  const headerLine = lines[detected.index] || "";
  return {
    fileName: file.name,
    columns: parseDelimitedLine(headerLine, detected.delimiter).filter(Boolean),
    delimiter: detected.delimiter,
    headerRow: detected.index + 1,
  };
}

async function handleFileSelection(event) {
  const files = Array.from(event.target.files || []);
  if (files.length === 0) {
    return;
  }

  const headers = await Promise.all(files.map(readFileHeader));
  const first = headers[0];
  const mismatchedFiles = headers
    .filter((entry) => entry.columns.join("\u001f") !== first.columns.join("\u001f"))
    .map((entry) => entry.fileName);
  const group = activeGroup();

  group.files = files.map((file) => file.name);
  group.columns = first.columns;
  group.delimiter = first.delimiter;
  group.headerRow = first.headerRow;
  group.fileFormat = files[0].name.split(".").pop()?.toLowerCase() || "csv";
  group.name = group.auxiliary === true ? "Auxiliary file group" : "Primary file group";
  group.variableState = seedVariableState(group);
  group.datetimeDate = suggestDatetimeColumn(group.columns);

  syncControlsFromActiveGroup();
  fileSummary.textContent = `${files.length} file(s) selected for this participant file group. ${first.columns.length} columns detected from ${first.fileName}, delimiter "${formatDelimiter(first.delimiter)}", header row ${first.headerRow}.`;
  if (mismatchedFiles.length > 0) {
    fileWarning.hidden = false;
    fileWarning.textContent = `Column mismatch: ${mismatchedFiles.join(", ")} does not match the first file's columns. Create a separate file group for files with different structures.`;
  } else {
    fileWarning.hidden = true;
    fileWarning.textContent = "";
  }

  renderFileGroups();
  renderVariables();
  updatePreview();
}

function formatDelimiter(delimiter) {
  return delimiter === "\t" ? "tab" : delimiter;
}

function renderFileGroups() {
  fileGroupsList.innerHTML = "";
  state.fileGroups.forEach((group, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = `file-group-chip${index === state.activeGroupIndex ? " active" : ""}`;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "file-group-button";
    button.textContent = `${index + 1}. ${group.files.length ? group.files.join(", ") : group.name}`;
    button.addEventListener("click", () => {
      syncActiveGroupFromControls();
      state.activeGroupIndex = index;
      syncControlsFromActiveGroup();
      renderTerms();
      renderFileGroups();
      renderVariables();
      updatePreview();
    });

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "remove-file-group";
    removeButton.textContent = "Remove";
    removeButton.disabled = state.fileGroups.length === 1;
    removeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      removeFileGroup(index);
    });

    wrapper.appendChild(button);
    wrapper.appendChild(removeButton);
    fileGroupsList.appendChild(wrapper);
  });
}

function renderDatasetRecords() {
  if (!datasetRecordsList) {
    return;
  }

  datasetRecordsList.innerHTML = "";
  state.datasets.forEach((dataset, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = `file-group-chip${index === state.activeDatasetIndex ? " active" : ""}`;

    const labelParts = [
      dataset.datasetId || "Untitled dataset",
      dataset.participantId ? `participant ${dataset.participantId}` : "",
    ].filter(Boolean);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "file-group-button";
    button.textContent = `${index + 1}. ${labelParts.join(" / ")}`;
    button.addEventListener("click", () => {
      syncActiveDatasetFromControls();
      state.activeDatasetIndex = index;
      state.activeGroupIndex = 0;
      syncControlsFromActiveDataset();
      updatePreview();
    });

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "remove-file-group";
    removeButton.textContent = "Remove";
    removeButton.disabled = state.datasets.length === 1;
    removeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      removeDatasetRecord(index);
    });

    wrapper.appendChild(button);
    wrapper.appendChild(removeButton);
    datasetRecordsList.appendChild(wrapper);
  });
}

function addDatasetRecord() {
  syncActiveDatasetFromControls();
  const next = createDatasetRecord();
  next.studyId = getStudyId();
  state.datasets.push(next);
  state.activeDatasetIndex = state.datasets.length - 1;
  state.activeGroupIndex = 0;
  syncControlsFromActiveDataset();
  updatePreview();
}

function removeDatasetRecord(index) {
  if (state.datasets.length === 1) {
    return;
  }
  syncActiveDatasetFromControls();
  state.datasets.splice(index, 1);
  if (state.activeDatasetIndex >= state.datasets.length) {
    state.activeDatasetIndex = state.datasets.length - 1;
  } else if (index < state.activeDatasetIndex) {
    state.activeDatasetIndex -= 1;
  }
  state.activeGroupIndex = 0;
  syncControlsFromActiveDataset();
  updatePreview();
}

function addFileGroup() {
  syncActiveGroupFromControls();
  state.fileGroups.push(createFileGroup(`File group ${state.fileGroups.length + 1}`));
  state.activeGroupIndex = state.fileGroups.length - 1;
  syncControlsFromActiveGroup();
  renderTerms();
  renderFileGroups();
  renderVariables();
  updatePreview();
}

function removeFileGroup(index) {
  if (state.fileGroups.length === 1) {
    return;
  }
  state.fileGroups.splice(index, 1);
  if (state.activeGroupIndex >= state.fileGroups.length) {
    state.activeGroupIndex = state.fileGroups.length - 1;
  } else if (index < state.activeGroupIndex) {
    state.activeGroupIndex -= 1;
  }
  syncControlsFromActiveGroup();
  renderTerms();
  renderFileGroups();
  renderVariables();
  updatePreview();
}

function syncControlsFromActiveGroup() {
  const group = activeGroup();
  if (!group) {
    return;
  }
  fields.fileFormat.value = group.fileFormat;
  fields.encoding.value = group.encoding;
  fields.headerRow.value = group.headerRow === "" ? "" : String(group.headerRow);
  fields.fileTimezone.value = group.fileTimezone;
  fields.auxiliary.value = group.auxiliary === "" ? "" : String(Boolean(group.auxiliary));
  fields.preprocessingBol.value = group.preprocessingBol === "" ? "" : String(Boolean(group.preprocessingBol));
  fields.preprocessingDesc.value = group.preprocessingDesc || "";
  fields.datetimeSource.value = group.datetimeSource || "column";
  fields.collectionDatetime.value = group.collectionDatetime || "";
  fields.datetimeDateformat.value = group.datetimeDateformat || "";
  fields.datetimeTimeformat.value = group.datetimeTimeformat || "";
  refreshDatetimeColumnOptions(group);
  fields.datetimeDate.value = group.datetimeDate || "";
  fields.datetimeTime.value = group.datetimeTime || "";
  syncDatetimeControls();
  fileInput.value = "";
  fileSummary.textContent = group.files.length
    ? `${group.files.length} file(s) in active group: ${group.files.join(", ")}.`
    : "No file selected for this group yet.";
  fileWarning.hidden = true;
  fileWarning.textContent = "";
}

function syncActiveGroupFromControls() {
  const group = activeGroup();
  if (!group) {
    return;
  }
  group.fileFormat = fields.fileFormat.value || "";
  group.encoding = fields.encoding.value || "";
  group.headerRow = fields.headerRow.value === "" ? "" : Number(fields.headerRow.value);
  group.fileTimezone = fields.fileTimezone.value || "";
  group.auxiliary = fields.auxiliary.value === "" ? "" : fields.auxiliary.value === "true";
  group.preprocessingBol = fields.preprocessingBol.value === "" ? "" : fields.preprocessingBol.value === "true";
  group.preprocessingDesc = fields.preprocessingDesc.value || "";
  group.datetimeSource = fields.datetimeSource.value || "column";
  group.collectionDatetime = fields.collectionDatetime.value || "";
  group.datetimeDate = fields.datetimeDate.value || "";
  group.datetimeDateformat = fields.datetimeDateformat.value || "";
  group.datetimeTime = fields.datetimeTime.value || "";
  group.datetimeTimeformat = fields.datetimeTimeformat.value || "";
  group.variableState = collectCurrentVariableState(group);
}

function renderTerms() {
  const group = activeGroup();
  if (!group) {
    termsList.innerHTML = "";
    return;
  }
  ensureOtherTerm(group);
  termsList.innerHTML = "";

  group.terms.forEach((entry, index) => {
    const row = document.createElement("div");
    row.className = "term-row";
    row.innerHTML = `
      <input type="text" class="term-token" data-index="${index}" value="${escapeHtml(entry.term)}" placeholder="Example: melEDI" aria-label="Term token" ${entry.term === "other" ? "readonly" : ""} />
      <input type="text" class="term-label" data-index="${index}" value="${escapeHtml(entry.label || "")}" placeholder="Example: Melanopic EDI" aria-label="Term label" />
      <button type="button" class="remove-term" data-index="${index}" ${entry.term === "other" ? "disabled" : ""}>Remove</button>
    `;
    termsList.appendChild(row);
  });

  termsList.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", syncTermsFromInputs);
  });
  termsList.querySelectorAll(".remove-term").forEach((button) => {
    button.addEventListener("click", removeTerm);
  });
}

function ensureOtherTerm(group = activeGroup()) {
  if (!group) {
    return;
  }
  const hasOther = group.terms.some((entry) => entry.term === "other");
  if (!hasOther) {
    group.terms.push({ term: "other", label: "Other" });
  }
}

function syncTermsFromInputs() {
  const group = activeGroup();
  const rows = Array.from(termsList.querySelectorAll(".term-row"));
  group.terms = rows
    .map((row) => ({
      term: row.querySelector(".term-token").value.trim(),
      label: row.querySelector(".term-label").value.trim() || null,
    }))
    .filter((entry) => entry.term.length > 0);
  ensureOtherTerm(group);
  renderVariables();
  updatePreview();
}

function addTerm() {
  const group = activeGroup();
  group.terms.splice(Math.max(group.terms.length - 1, 0), 0, { term: "new term", label: "New term" });
  renderTerms();
  renderVariables();
  updatePreview();
}

function removeTerm(event) {
  const group = activeGroup();
  const index = Number(event.currentTarget.dataset.index);
  if (group.terms[index]?.term === "other") {
    return;
  }
  group.terms.splice(index, 1);
  renderTerms();
  renderVariables();
  updatePreview();
}

function refreshDatetimeColumnOptions(group = activeGroup()) {
  if (!group) {
    fields.datetimeDate.innerHTML = '<option value="">None / collection date value</option>';
    fields.datetimeTime.innerHTML = '<option value="">None / collection date value</option>';
    return;
  }
  const columns = Array.from(new Set([
    ...(group.columns || []),
    group.datetimeDate,
    group.datetimeTime,
  ].filter(Boolean)));
  const options = ['<option value="">None / collection date value</option>'].concat(
    columns.map((column) => `<option value="${escapeHtml(column)}">${escapeHtml(column)}</option>`),
  );
  fields.datetimeDate.innerHTML = options.join("");
  fields.datetimeTime.innerHTML = options.join("");
}

function renderVariables() {
  const group = activeGroup();
  variablesTable.innerHTML = "";

  if (!group) {
    validationSummary.textContent = "Add a dataset file group to detect columns.";
    validationSummary.className = "validation-summary";
    return;
  }

  if (group.columns.length === 0) {
    validationSummary.textContent = "Select file(s) to detect columns for this group.";
    validationSummary.className = "validation-summary";
    return;
  }

  const termOptions = group.terms
    .filter((entry) => entry.term)
    .map((entry) => `<option value="${escapeHtml(entry.term)}">${escapeHtml(entry.term)}</option>`)
    .join("");

  const header = document.createElement("div");
  header.className = "variable-row variable-header";
  header.innerHTML = `
    <span>Primary</span>
    <span>File column</span>
    <span>Label</span>
    <span>Units</span>
    <span>Calibration</span>
    <span>Semantic term</span>
    <span>Other name</span>
  `;
  variablesTable.appendChild(header);

  group.columns.forEach((column) => {
    const saved = group.variableState[column] || {};
    const term = saved.term || guessTerm(column);
    const row = document.createElement("div");
    row.className = "variable-row";
    row.innerHTML = `
      <input type="checkbox" class="primary-check" data-column="${escapeHtml(column)}" aria-label="Select ${escapeHtml(column)} as a primary variable" ${saved.primary ? "checked" : ""} ${group.auxiliary ? "disabled" : ""} />
      <strong>${escapeHtml(column)}</strong>
      <input type="text" class="label-input" data-column="${escapeHtml(column)}" value="${escapeHtml(saved.label || column)}" aria-label="Label for ${escapeHtml(column)}" />
      <input type="text" class="unit-input" data-column="${escapeHtml(column)}" value="${escapeHtml(saved.unit || guessUnit(column))}" aria-label="Unit for ${escapeHtml(column)}" />
      <input type="text" class="calibration-input" data-column="${escapeHtml(column)}" value="${escapeHtml(saved.calibration || "N/A")}" aria-label="Calibration for ${escapeHtml(column)}" />
      <select class="term-select" data-column="${escapeHtml(column)}" aria-label="Semantic term for ${escapeHtml(column)}">${termOptions}</select>
      <input type="text" class="other-name-input" data-column="${escapeHtml(column)}" value="${escapeHtml(saved.variableName || column)}" aria-label="Other variable name for ${escapeHtml(column)}" />
    `;
    variablesTable.appendChild(row);
    row.querySelector(".term-select").value = group.terms.some((entry) => entry.term === term) ? term : "other";
  });

  variablesTable.querySelectorAll("input, select").forEach((input) => {
    input.addEventListener("input", () => {
      group.variableState = collectCurrentVariableState(group);
      updatePreview();
    });
    input.addEventListener("change", enforcePrimaryLimit);
  });

  validationSummary.textContent = `${group.columns.length} variables detected in the active file group. Terms come from this file group's variable terms.`;
  validationSummary.className = "validation-summary ok";
}

function seedVariableState(group) {
  const existing = group.variableState || {};
  const seeded = {};
  group.columns.forEach((column) => {
    seeded[column] = existing[column] || {
      primary: false,
      label: column,
      unit: guessUnit(column),
      calibration: "N/A",
      term: guessTerm(column),
      variableName: column,
    };
  });
  return seeded;
}

function collectCurrentVariableState(group) {
  const current = { ...(group.variableState || {}) };
  document.querySelectorAll(".variable-row").forEach((row) => {
    const column = row.querySelector("[data-column]")?.dataset.column;
    if (!column) {
      return;
    }
    current[column] = {
      primary: row.querySelector(".primary-check")?.checked || false,
      label: row.querySelector(".label-input")?.value || "",
      unit: row.querySelector(".unit-input")?.value || "",
      calibration: row.querySelector(".calibration-input")?.value || "",
      term: row.querySelector(".term-select")?.value || "other",
      variableName: row.querySelector(".other-name-input")?.value || column,
    };
  });
  return current;
}

function enforcePrimaryLimit(event) {
  const selected = getPrimaryVariables(activeGroup());
  if (selected.length > 4 && event.target.classList.contains("primary-check")) {
    event.target.checked = false;
    validationSummary.textContent = "Choose up to four primary variables.";
    validationSummary.className = "validation-summary warning";
  }
  activeGroup().variableState = collectCurrentVariableState(activeGroup());
  updatePreview();
}

function guessUnit(column) {
  const normalized = column.toLowerCase();
  if (normalized.includes("lux") || normalized.includes("light")) return "lx";
  if (normalized.includes("temperature")) return "C";
  if (normalized.includes("time") || normalized.includes("date")) return "N/A";
  return "Unknown";
}

function guessTerm(column) {
  const normalized = column.toLowerCase();
  const terms = activeGroup().terms.map((entry) => entry.term);
  if ((normalized.includes("lux") || normalized === "light") && terms.includes("photopic illuminance")) {
    return "photopic illuminance";
  }
  if ((normalized.includes("medi") || normalized.includes("melanopic")) && terms.includes("melEDI")) {
    return "melEDI";
  }
  return "other";
}

function getPrimaryVariables(group) {
  return Object.entries(group.variableState || {})
    .filter(([, entry]) => entry.primary)
    .map(([column]) => column)
    .filter((column) => group.columns.includes(column));
}

function getVariableMetadata(group) {
  return group.columns.map((column) => {
    const saved = group.variableState[column] || {};
    const term = saved.term || "other";
    const termObject = { variable_term: term };

    if (term === "other") {
      termObject.variable_name = saved.variableName || column;
    }

    return {
      dataset_file_variables_name: column,
      dataset_file_variables_labels: saved.label || column,
      dataset_file_variables_units: saved.unit || "Unknown",
      dataset_file_variables_calibration: saved.calibration || null,
      dataset_file_variables_term: termObject,
    };
  });
}

function buildDatasetFile(group) {
  const preprocessingDesc = group.preprocessingDesc
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const datasetFile = {
    dataset_file_names: group.files.map((fileName) => `data/datasets/${fileName}`),
    dataset_file_format: group.fileFormat || "",
    dataset_file_encoding: [group.encoding || ""],
    dataset_file_timezone: group.fileTimezone || "",
    dataset_file_auxiliary: group.auxiliary === "" ? null : Boolean(group.auxiliary),
    dataset_file_header_row: group.headerRow === "" ? null : Number(group.headerRow),
    dataset_file_preprocessing: {
      dataset_file_preprocessing_bol: group.preprocessingBol === "" ? null : Boolean(group.preprocessingBol),
      dataset_file_preprocessing_desc: group.preprocessingBol === true ? preprocessingDesc : null,
    },
    dataset_file_variables: getVariableMetadata(group),
  };

  if (group.auxiliary !== true) {
    datasetFile.primary_variables = getPrimaryVariables(group);
  }

  return datasetFile;
}

function buildDatasetRecordDraft(record) {
  const fileGroups = record.fileGroups?.length ? record.fileGroups : [createFileGroup()];
  const datetimeGroup = fileGroups.find((group) => !group.auxiliary) || fileGroups[0];

  const datasetDatetime = {
    dataset_datetime_date: datetimeGroup.datetimeSource === "collection"
      ? datetimeGroup.collectionDatetime || ""
      : datetimeGroup.datetimeDate || suggestDatetimeColumn(datetimeGroup.columns),
    dataset_datetime_dateformat: datetimeGroup.datetimeDateformat || "",
    dataset_datetime_time: datetimeGroup.datetimeSource === "collection" ? null : datetimeGroup.datetimeTime || null,
    dataset_datetime_timeformat: datetimeGroup.datetimeSource === "collection"
      ? null
      : datetimeGroup.datetimeTime
        ? datetimeGroup.datetimeTimeformat || null
        : null,
  };

  return {
    schema_version: fields.schemaVersion.value || "2.0.0",
    dataset_internal_id: record.datasetId || "",
    dataset_instructions: record.instructions || "",
    dataset_crossref: {
      dataset_crossref_study_id: record.studyId || "",
      dataset_crossref_participant_id: record.participantId || "",
      dataset_crossref_device_id: record.deviceId || "",
    },
    dataset_device_location: record.deviceLocation || "",
    dataset_sampling_interval: record.samplingInterval === "" ? null : Number(record.samplingInterval),
    dataset_datetime: datasetDatetime,
    dataset_timezone: record.datasetTimezone || "",
    dataset_location: [record.latitude || "", record.longitude || ""],
    dataset_variable_terms: getDatasetVariableTerms(fileGroups),
    dataset_file: fileGroups.map(buildDatasetFile),
  };
}

function buildDatasetDraft() {
  if (state.activeStep === "datasets") {
    syncActiveDatasetFromControls();
  }
  return state.datasets.map(buildDatasetRecordDraft);
}

function getDatasetVariableTerms(fileGroups = state.fileGroups) {
  const byTerm = new Map();
  fileGroups.forEach((group) => {
    ensureOtherTerm(group);
    group.terms
      .filter((entry) => entry.term)
      .forEach((entry) => {
        if (!byTerm.has(entry.term)) {
          byTerm.set(entry.term, {
            term: entry.term,
            label: entry.label || null,
          });
        }
      });
  });
  return Array.from(byTerm.values());
}

function suggestDatetimeColumn(columns) {
  return (
    columns.find((column) => {
      const normalized = column.toLowerCase();
      return normalized.includes("timestamp") || normalized.includes("date/time") || normalized === "date";
    }) ||
    columns[0] ||
    ""
  );
}

function syncDatetimeControls() {
  const usesCollectionDate = fields.datetimeSource.value === "collection";
  fields.collectionDatetime.disabled = !usesCollectionDate;
  fields.datetimeDate.disabled = usesCollectionDate;
  fields.datetimeTime.disabled = usesCollectionDate;
  fields.datetimeTimeformat.disabled = usesCollectionDate || !fields.datetimeTime.value;
}

function buildStudyDraft() {
  const datasetIds = buildDatasetDraft().map((entry) => entry.dataset_internal_id).filter(Boolean);
  if (fields.studyDatasetsPreview) {
    fields.studyDatasetsPreview.value = datasetIds.join(", ");
  }
  return [
    {
      schema_version: fields.schemaVersion.value || "2.0.0",
      study_internal_id: getStudyId(),
      study_title: fields.studyTitle.value || "",
      study_preregistration: fields.studyPreregistration.value || null,
      study_ethics: fields.studyEthics.value || null,
      study_registration: fields.studyRegistration.value || null,
      study_short_description: fields.studyShortDescription.value || "",
      study_sample: fields.studySample.value || "",
      study_groups: buildStudyGroups(),
      study_intervention: fields.studyIntervention.value || null,
      study_setting: fields.studySetting.value || "",
      study_geographical_location: fields.studyGeographicalLocation.value || "",
      study_contributors: buildContributors(),
      study_datasets: datasetIds,
      study_type: fields.studyType.value || null,
      study_funding_sources: splitList(fields.studyFundingSources.value),
      study_keywords: splitList(fields.studyKeywords.value),
    },
  ];
}

function buildStudyGroups() {
  const groups = state.studyGroups
    .filter((entry) => entry.name || entry.description || entry.size || entry.inclusion || entry.exclusion)
    .map((entry) => ({
      study_group_name: entry.name,
      study_group_description: entry.description || null,
      study_group_size: entry.size === "" ? null : Number(entry.size),
      study_group_inclusion: splitSemicolonList(entry.inclusion),
      study_group_exclusion: splitSemicolonList(entry.exclusion),
    }));
  return groups.length ? groups : null;
}

function buildContributors() {
  const contributors = state.contributors
    .filter((entry) => entry.fullName || entry.orcid || entry.email || entry.institutionName)
    .map((entry) => ({
      contributor_full_name: entry.fullName,
      contributor_roles: splitSemicolonList(entry.roles),
      contributor_email: entry.email || null,
      contributor_orcid: entry.orcid,
      contributor_institution: entry.institutionName || entry.institutionCountry
        ? {
            contributor_institution_name: entry.institutionName,
            contributor_institution_city: entry.institutionCity || null,
            contributor_institution_country: entry.institutionCountry,
          }
        : null,
    }));
  return contributors.length ? contributors : null;
}

function buildParticipantsRows() {
  return state.participants
    .filter((entry) => entry.id || entry.age || entry.sex || entry.gender)
    .map((entry) => ({
      participant_internal_id: entry.id,
      participant_age: entry.age === "" ? "" : Number(entry.age),
      participant_sex: entry.sex,
      participant_gender: entry.gender,
    }));
}

function buildCharacteristicsRows() {
  return state.characteristics
    .filter((entry) => entry.participantId || entry.name || entry.value || entry.unit || entry.description)
    .map((entry) => ({
      participant_internal_id: entry.participantId,
      participant_characteristic_name: entry.name,
      participant_characteristic_value: entry.value,
      participant_characteristic_unit: entry.unit,
      participant_characteristic_description: entry.description,
    }));
}

function buildDevicesDraft({ includeEmpty = false } = {}) {
  const devices = includeEmpty && state.devices.length === 0 ? [createDevice()] : state.devices;
  return devices
    .filter((entry) => includeEmpty || entry.id || entry.manufacturer || entry.model || entry.serialNumber)
    .map((entry) => ({
      schema_version: fields.schemaVersion.value || "2.0.0",
      device_internal_id: entry.id,
      device_manufacturer: entry.manufacturer,
      device_model: entry.model,
      device_serial_number: entry.serialNumber,
      device_calibration_date: entry.calibrationDate || null,
      device_firmware_version: entry.firmwareVersion || null,
      device_datasheet_id: entry.datasheetId,
      device_sensors: parseDeviceSensors(entry.sensorsText),
    }));
}

function buildDatasheetsDraft({ includeEmpty = false } = {}) {
  const datasheets = includeEmpty && state.datasheets.length === 0 ? [createDatasheet()] : state.datasheets;
  return datasheets
    .filter((entry) => includeEmpty || entry.id || entry.manufacturer || entry.model)
    .map((entry) => ({
      schema_version: fields.schemaVersion.value || "2.0.0",
      datasheet_id: entry.id,
      datasheet_version: entry.version || null,
      datasheet_manufacturer: entry.manufacturer,
      datasheet_type: entry.type,
      datasheet_model: entry.model,
      datasheet_calibration_interval: entry.calibrationInterval === "" ? null : Number(entry.calibrationInterval),
      datasheet_calibration_spectral_sensitivity: parseSpectralSensitivity(entry.spectralSensitivityText),
      datasheet_calibration_linearity: entry.linearity,
      datasheet_calibration_directional_response: entry.directionalResponse,
      datasheet_calibration_range: entry.range,
      datasheet_channel: parseChannels(entry.channelsText),
    }));
}

function buildDataPackage() {
  const includeCharacteristics = buildCharacteristicsRows().length > 0;
  const resources = [
    {
      name: "study",
      path: "data/study.json",
      profile: "json-entity-resource.json",
      mediatype: "application/json",
      jsonSchema: "schemas/2.0.0/study.schema.json",
    },
    {
      name: "participants",
      path: "data/participants.csv",
      profile: "tabular-data-resource",
      format: "csv",
      mediatype: "text/csv",
      schema: "schemas/2.0.0/participants.schema.json",
    },
    {
      name: "datasets",
      path: "data/datasets.json",
      profile: "json-entity-resource.json",
      mediatype: "application/json",
      jsonSchema: "schemas/2.0.0/dataset.schema.json",
    },
    {
      name: "devices",
      path: "data/devices.json",
      profile: "json-entity-resource.json",
      mediatype: "application/json",
      jsonSchema: "schemas/2.0.0/device.schema.json",
    },
    {
      name: "device_datasheets",
      path: "data/device_datasheet.json",
      profile: "json-entity-resource.json",
      mediatype: "application/json",
      jsonSchema: "schemas/2.0.0/device_datasheet.schema.json",
    },
  ];

  if (includeCharacteristics) {
    resources.push({
      name: "participant_characteristics",
      path: "data/participant_characteristics.csv",
      profile: "tabular-data-resource",
      format: "csv",
      mediatype: "text/csv",
      schema: "schemas/2.0.0/participant_characteristics.schema.json",
    });
  }

  return {
    profile: "schemas/2.0.0/gleam-dp-profile.json",
    schema_version: fields.schemaVersion.value || "2.0.0",
    name: fields.packageName.value || "glc-metadata-package",
    title: fields.packageTitle.value || fields.studyTitle.value || "GLC metadata package",
    resources,
  };
}

function parseDeviceSensors(text) {
  const sensors = text
    .split(/\r?\n|;/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [type, datasheetId] = line.split("|").map((part) => part.trim());
      return {
        device_sensor_type: type,
        device_sensor_datasheet_id: datasheetId || null,
      };
    });
  return sensors.length ? sensors : null;
}

function parseSpectralSensitivity(text) {
  return text
    .split(/\r?\n|;/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [wavelength, relative] = line.split(/[|,]/).map((part) => part.trim());
      return {
        datasheet_calibration_spectral_sensitivity_wavelength: Number(wavelength),
        datasheet_calibration_spectral_sensitivity_relative: Number(relative),
      };
    });
}

function parseChannels(text) {
  const channels = text
    .split(/\r?\n|;/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [nr, name, unit, description] = line.split("|").map((part) => part.trim());
      return {
        datasheet_channel_nr: Number(nr),
        datasheet_channel_name: name,
        datasheet_channel_unit: unit || null,
        datasheet_channel_description: description || null,
      };
    });
  return channels.length ? channels : null;
}

function splitList(value) {
  const items = value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  return items.length ? items : null;
}

function splitSemicolonList(value) {
  const items = value
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean);
  return items.length ? items : null;
}

function buildParticipantsCsv() {
  return rowsToCsv([
    "participant_internal_id",
    "participant_age",
    "participant_sex",
    "participant_gender",
  ], buildParticipantsRows());
}

function buildCharacteristicsCsv() {
  return rowsToCsv([
    "participant_internal_id",
    "participant_characteristic_name",
    "participant_characteristic_value",
    "participant_characteristic_unit",
    "participant_characteristic_description",
  ], buildCharacteristicsRows());
}

function rowsToCsv(headers, rows) {
  return [headers.join(",")]
    .concat(rows.map((row) => headers.map((header) => csvEscape(row[header])).join(",")))
    .join("\n");
}

function csvEscape(value) {
  const normalized = value === null || value === undefined ? "" : String(value);
  if (/[",\n]/.test(normalized)) {
    return `"${normalized.replace(/"/g, '""')}"`;
  }
  return normalized;
}

function getPreviewPayload() {
  if (state.activeStep === "project" || state.activeStep === "export") return buildDataPackage();
  if (state.activeStep === "study") return buildStudyDraft();
  if (state.activeStep === "participants") {
    return {
      "participants.csv": buildParticipantsRows(),
      "participant_characteristics.csv": buildCharacteristicsRows(),
    };
  }
  if (state.activeStep === "devices") return buildDevicesDraft({ includeEmpty: true });
  if (state.activeStep === "datasheets") return buildDatasheetsDraft({ includeEmpty: true });
  return buildDatasetDraft();
}

function getPreviewTitle() {
  const titles = {
    project: "datapackage.json preview",
    study: "study.json preview",
    participants: "participant tables preview",
    devices: "devices.json preview",
    datasheets: "device_datasheet.json preview",
    datasets: "datasets.json preview",
    export: "datapackage.json preview",
  };
  return titles[state.activeStep] || "Package preview";
}

function updatePreview() {
  const payload = getPreviewPayload();
  previewTitle.textContent = getPreviewTitle();
  jsonPreview.textContent = JSON.stringify(payload, null, 2);
  updatePackageSummary();
}

function updatePackageSummary() {
  if (!packageSummary) return;
  packageSummary.className = "validation-summary ok";
  packageSummary.textContent = `${buildParticipantsRows().length} participant row(s), ${buildDevicesDraft().length} device record(s), ${buildDatasheetsDraft().length} datasheet record(s), ${buildDatasetDraft().length} dataset record(s).`;
  renderExportValidationPanel();
}

function validateBuilder() {
  return [
    ...validateStudyForExport(),
    ...validateParticipantsForExport(),
    ...validateDevicesForExport(),
    ...validateDatasheetsForExport(),
    ...validateDatasetsForExport(),
  ];
}

function validationIssue(section, message) {
  return { section, message };
}

function isBlank(value) {
  return value === null || value === undefined || String(value).trim() === "";
}

function hasAnyValue(values) {
  return values.some((value) => !isBlank(value));
}

function validateStudyForExport() {
  const issues = [];
  const datasetIds = buildDatasetDraft().map((entry) => entry.dataset_internal_id).filter(Boolean);
  [
    [getStudyId(), "Study internal ID is missing."],
    [fields.studyTitle.value, "Study title is missing."],
    [fields.studyShortDescription.value, "Study short description is missing."],
    [fields.studySample.value, "Study sample is missing."],
    [fields.studySetting.value, "Study setting is missing."],
    [fields.studyGeographicalLocation.value, "Study geographical location is missing."],
    [datasetIds.join(","), "Study datasets is missing. Add at least one dataset record on the Datasets page."],
  ].forEach(([value, message]) => {
    if (isBlank(value)) {
      issues.push(validationIssue("Study", message));
    }
  });
  return issues;
}

function validateParticipantsForExport() {
  const issues = [];
  const participants = state.participants.filter((entry) => hasAnyValue([entry.id, entry.age, entry.sex, entry.gender]));

  if (participants.length === 0) {
    return [validationIssue("Participants", "At least one participant row is recommended before export.")];
  }

  participants.forEach((participant, index) => {
    const label = participant.id || `row ${index + 1}`;
    if (isBlank(participant.id)) {
      issues.push(validationIssue("Participants", `Participant ${label}: participant ID is missing.`));
    }
    if (isBlank(participant.age)) {
      issues.push(validationIssue("Participants", `Participant ${label}: age is missing.`));
    }
  });

  return issues;
}

function validateDevicesForExport() {
  const issues = [];
  const devices = state.devices.filter((entry) => hasAnyValue([
    entry.id,
    entry.manufacturer,
    entry.model,
    entry.serialNumber,
    entry.calibrationDate,
    entry.datasheetId,
    entry.sensorsText,
  ]));

  if (devices.length === 0) {
    return [validationIssue("Devices", "At least one device record is recommended before export.")];
  }

  devices.forEach((device, index) => {
    const label = device.id || `row ${index + 1}`;
    [
      [device.id, "device ID"],
      [device.manufacturer, "manufacturer"],
      [device.model, "model"],
      [device.serialNumber, "serial number"],
      [device.calibrationDate, "calibration date"],
      [device.datasheetId, "datasheet ID"],
    ].forEach(([value, fieldName]) => {
      if (isBlank(value)) {
        issues.push(validationIssue("Devices", `Device ${label}: ${fieldName} is missing.`));
      }
    });

    const sensors = parseDeviceSensors(device.sensorsText || "");
    if (!sensors || sensors.length === 0) {
      issues.push(validationIssue("Devices", `Device ${label}: at least one sensor type is recommended.`));
    }
    (sensors || []).forEach((sensor, sensorIndex) => {
      if (isBlank(sensor.device_sensor_type)) {
        issues.push(validationIssue("Devices", `Device ${label}, sensor ${sensorIndex + 1}: sensor type is missing.`));
      }
    });
  });

  return issues;
}

function validateDatasheetsForExport() {
  const issues = [];
  const datasheets = state.datasheets.filter((entry) => hasAnyValue([
    entry.id,
    entry.manufacturer,
    entry.type,
    entry.model,
    entry.calibrationInterval,
    entry.spectralSensitivityText,
    entry.linearity,
    entry.directionalResponse,
    entry.range,
    entry.channelsText,
  ]));

  if (datasheets.length === 0) {
    return [validationIssue("Datasheets", "At least one datasheet record is recommended before export.")];
  }

  datasheets.forEach((datasheet, index) => {
    const label = datasheet.id || `row ${index + 1}`;
    [
      [datasheet.id, "datasheet ID"],
      [datasheet.manufacturer, "manufacturer"],
      [datasheet.type, "type"],
      [datasheet.model, "model"],
      [datasheet.calibrationInterval, "calibration interval"],
      [datasheet.linearity, "linearity"],
      [datasheet.directionalResponse, "directional response"],
      [datasheet.range, "calibration range"],
    ].forEach(([value, fieldName]) => {
      if (isBlank(value)) {
        issues.push(validationIssue("Datasheets", `Datasheet ${label}: ${fieldName} is missing.`));
      }
    });

    const spectralRows = parseSpectralSensitivity(datasheet.spectralSensitivityText || "");
    if (spectralRows.length === 0) {
      issues.push(validationIssue("Datasheets", `Datasheet ${label}: spectral sensitivity rows are missing.`));
    }
    spectralRows.forEach((row, rowIndex) => {
      if (Number.isNaN(row.datasheet_calibration_spectral_sensitivity_wavelength) || Number.isNaN(row.datasheet_calibration_spectral_sensitivity_relative)) {
        issues.push(validationIssue("Datasheets", `Datasheet ${label}, spectral row ${rowIndex + 1}: wavelength and relative sensitivity must be numeric.`));
      }
    });

    const channels = parseChannels(datasheet.channelsText || "");
    if (!channels || channels.length === 0) {
      issues.push(validationIssue("Datasheets", `Datasheet ${label}: at least one channel is missing.`));
    }
    (channels || []).forEach((channel, channelIndex) => {
      if (Number.isNaN(channel.datasheet_channel_nr)) {
        issues.push(validationIssue("Datasheets", `Datasheet ${label}, channel ${channelIndex + 1}: channel number is missing or not numeric.`));
      }
      if (isBlank(channel.datasheet_channel_name)) {
        issues.push(validationIssue("Datasheets", `Datasheet ${label}, channel ${channelIndex + 1}: channel name is missing.`));
      }
    });
  });

  return issues;
}

function validateDatasetsForExport() {
  const issues = [];

  if (state.activeStep === "datasets") {
    syncActiveDatasetFromControls();
  }

  const participantIds = new Set(getParticipantIds());
  const deviceIds = new Set(getDeviceIds());
  const studyId = getStudyId();
  const datasetIds = new Set();

  if (state.datasets.length === 0) {
    return [validationIssue("Datasets", "At least one dataset record is recommended before export.")];
  }

  state.datasets.forEach((dataset, datasetIndex) => {
    const label = dataset.datasetId || `record ${datasetIndex + 1}`;

    [
      [dataset.datasetId, "dataset ID"],
      [dataset.studyId, "study ID"],
      [dataset.participantId, "participant ID"],
      [dataset.deviceId, "device ID"],
      [dataset.deviceLocation, "device location"],
      [dataset.samplingInterval, "sampling interval"],
      [dataset.datasetTimezone, "dataset timezone"],
      [dataset.latitude, "dataset location latitude"],
      [dataset.longitude, "dataset location longitude"],
      [dataset.instructions, "dataset instructions"],
    ].forEach(([value, fieldName]) => {
      if (isBlank(value)) {
        issues.push(validationIssue("Datasets", `Dataset ${label}: ${fieldName} is missing.`));
      }
    });

    if (!isBlank(dataset.datasetId)) {
      if (datasetIds.has(dataset.datasetId)) {
        issues.push(validationIssue("Datasets", `Dataset ${label}: dataset ID is duplicated.`));
      }
      datasetIds.add(dataset.datasetId);
    }

    if (!isBlank(dataset.studyId) && studyId && dataset.studyId !== studyId) {
      issues.push(validationIssue("Datasets", `Dataset ${label}: study ID does not match the Study page ID.`));
    }
    if (!isBlank(dataset.participantId) && !participantIds.has(dataset.participantId)) {
      issues.push(validationIssue("Datasets", `Dataset ${label}: participant ID does not match any participant row.`));
    }
    if (!isBlank(dataset.deviceId) && !deviceIds.has(dataset.deviceId)) {
      issues.push(validationIssue("Datasets", `Dataset ${label}: device ID does not match any device record.`));
    }

    const fileGroups = dataset.fileGroups || [];
    if (fileGroups.length === 0) {
      issues.push(validationIssue("Datasets", `Dataset ${label}: at least one file group is missing.`));
      return;
    }

    fileGroups.forEach((group, groupIndex) => {
      const groupLabel = `Dataset ${label}, file group ${groupIndex + 1}`;
      [
        [group.fileFormat, "file format"],
        [group.encoding, "encoding"],
        [group.fileTimezone, "file timezone"],
        [group.auxiliary, "auxiliary file status"],
        [group.datetimeSource, "datetime source"],
        [group.datetimeDateformat, "date/datetime format"],
      ].forEach(([value, fieldName]) => {
        if (isBlank(value)) {
          issues.push(validationIssue("Datasets", `${groupLabel}: ${fieldName} is missing.`));
        }
      });

      if (!group.files || group.files.length === 0) {
        issues.push(validationIssue("Datasets", `${groupLabel}: no data file has been selected or listed.`));
      }
      if (!group.columns || group.columns.length === 0) {
        issues.push(validationIssue("Datasets", `${groupLabel}: no variables/columns are listed.`));
      }
      if (group.datetimeSource === "column" && isBlank(group.datetimeDate)) {
        issues.push(validationIssue("Datasets", `${groupLabel}: date or datetime column is missing.`));
      }
      if (group.datetimeSource === "collection" && isBlank(group.collectionDatetime)) {
        issues.push(validationIssue("Datasets", `${groupLabel}: collection date/time value is missing.`));
      }
      if (group.datetimeTime && isBlank(group.datetimeTimeformat)) {
        issues.push(validationIssue("Datasets", `${groupLabel}: time format is missing for the separate time column.`));
      }
      if (group.preprocessingBol === true && isBlank(group.preprocessingDesc)) {
        issues.push(validationIssue("Datasets", `${groupLabel}: preprocessing description is missing.`));
      }
      if (group.auxiliary !== true && getPrimaryVariables(group).length === 0) {
        issues.push(validationIssue("Datasets", `${groupLabel}: at least one primary variable should be selected.`));
      }
    });
  });

  return issues;
}

function renderExportValidationPanel() {
  if (!exportValidationPanel) {
    return;
  }

  const issues = validateBuilder();
  if (issues.length === 0) {
    exportValidationPanel.className = "export-validation-panel ok";
    exportValidationPanel.innerHTML = `
      <h3>Ready to export</h3>
      <p>No missing required fields were found by the builder checks.</p>
    `;
    return;
  }

  const grouped = issues.reduce((bySection, issue) => {
    if (!bySection[issue.section]) {
      bySection[issue.section] = [];
    }
    bySection[issue.section].push(issue.message);
    return bySection;
  }, {});

  exportValidationPanel.className = "export-validation-panel warning";
  exportValidationPanel.innerHTML = `
    <h3>${issues.length} issue(s) to review before export</h3>
    <p>Soft warning only: downloads are still available, but these fields may fail the full validator.</p>
    ${Object.entries(grouped)
      .map(([section, messages]) => `
        <strong>${escapeHtml(section)}</strong>
        <ul>
          ${messages.map((message) => `<li>${escapeHtml(message)}</li>`).join("")}
        </ul>
      `)
      .join("")}
  `;
}

const ZIP_SCHEMA_FILES = [
  "contributor.schema.json",
  "dataset.schema.json",
  "device.schema.json",
  "device_datasheet.schema.json",
  "gleam-dp-profile.json",
  "participant_characteristics.schema.json",
  "participants.schema.json",
  "study.schema.json",
];

async function downloadPackageZip() {
  try {
    const files = await buildPackageZipFiles();
    const zipBlob = createZipBlob(files);
    downloadBlob("glc-metadata-package.zip", zipBlob);
  } catch (error) {
    if (exportValidationPanel) {
      exportValidationPanel.className = "export-validation-panel warning";
      exportValidationPanel.innerHTML = `
        <h3>Could not create zip</h3>
        <p>${escapeHtml(error.message)}</p>
      `;
    }
  }
}

async function buildPackageZipFiles() {
  const files = [
    {
      path: "datapackage.json",
      text: JSON.stringify(buildDataPackage(), null, 2),
    },
    {
      path: "data/study.json",
      text: JSON.stringify(buildStudyDraft(), null, 2),
    },
    {
      path: "data/participants.csv",
      text: buildParticipantsCsv(),
    },
    {
      path: "data/devices.json",
      text: JSON.stringify(buildDevicesDraft(), null, 2),
    },
    {
      path: "data/device_datasheet.json",
      text: JSON.stringify(buildDatasheetsDraft(), null, 2),
    },
    {
      path: "data/datasets.json",
      text: JSON.stringify(buildDatasetDraft(), null, 2),
    },
    {
      path: "README.txt",
      text: [
        "GLC metadata package generated by the browser metadata builder.",
        "",
        "This zip contains generated metadata files and the schema bundle referenced by datapackage.json.",
        "It does not include the original data files selected in the dataset file assistant.",
        "Before running the full validator, add referenced data files under the paths declared in data/datasets.json.",
      ].join("\n"),
    },
  ];

  if (buildCharacteristicsRows().length > 0) {
    files.push({
      path: "data/participant_characteristics.csv",
      text: buildCharacteristicsCsv(),
    });
  }

  const schemaFiles = await Promise.all(ZIP_SCHEMA_FILES.map(async (filename) => {
    const response = await fetch(`schemas/2.0.0/${filename}`);
    if (!response.ok) {
      throw new Error(`Could not load schema file ${filename}`);
    }
    return {
      path: `schemas/2.0.0/${filename}`,
      text: await response.text(),
    };
  }));

  return files.concat(schemaFiles);
}

function createZipBlob(files) {
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  files.forEach((file) => {
    const nameBytes = encodeText(file.path);
    const dataBytes = encodeText(file.text);
    const crc = crc32(dataBytes);
    const { time, date } = zipDateTime(new Date());

    const localHeader = zipHeader(30);
    writeUint32(localHeader, 0, 0x04034b50);
    writeUint16(localHeader, 4, 20);
    writeUint16(localHeader, 6, 0x0800);
    writeUint16(localHeader, 8, 0);
    writeUint16(localHeader, 10, time);
    writeUint16(localHeader, 12, date);
    writeUint32(localHeader, 14, crc);
    writeUint32(localHeader, 18, dataBytes.length);
    writeUint32(localHeader, 22, dataBytes.length);
    writeUint16(localHeader, 26, nameBytes.length);
    writeUint16(localHeader, 28, 0);

    localParts.push(localHeader, nameBytes, dataBytes);

    const centralHeader = zipHeader(46);
    writeUint32(centralHeader, 0, 0x02014b50);
    writeUint16(centralHeader, 4, 20);
    writeUint16(centralHeader, 6, 20);
    writeUint16(centralHeader, 8, 0x0800);
    writeUint16(centralHeader, 10, 0);
    writeUint16(centralHeader, 12, time);
    writeUint16(centralHeader, 14, date);
    writeUint32(centralHeader, 16, crc);
    writeUint32(centralHeader, 20, dataBytes.length);
    writeUint32(centralHeader, 24, dataBytes.length);
    writeUint16(centralHeader, 28, nameBytes.length);
    writeUint16(centralHeader, 30, 0);
    writeUint16(centralHeader, 32, 0);
    writeUint16(centralHeader, 34, 0);
    writeUint16(centralHeader, 36, 0);
    writeUint32(centralHeader, 38, 0);
    writeUint32(centralHeader, 42, offset);

    centralParts.push(centralHeader, nameBytes);
    offset += localHeader.length + nameBytes.length + dataBytes.length;
  });

  const centralSize = centralParts.reduce((total, part) => total + part.length, 0);
  const endHeader = zipHeader(22);
  writeUint32(endHeader, 0, 0x06054b50);
  writeUint16(endHeader, 4, 0);
  writeUint16(endHeader, 6, 0);
  writeUint16(endHeader, 8, files.length);
  writeUint16(endHeader, 10, files.length);
  writeUint32(endHeader, 12, centralSize);
  writeUint32(endHeader, 16, offset);
  writeUint16(endHeader, 20, 0);

  return new Blob([...localParts, ...centralParts, endHeader], { type: "application/zip" });
}

function encodeText(text) {
  return new TextEncoder().encode(String(text));
}

function zipHeader(size) {
  return new Uint8Array(size);
}

function writeUint16(bytes, offset, value) {
  new DataView(bytes.buffer).setUint16(offset, value, true);
}

function writeUint32(bytes, offset, value) {
  new DataView(bytes.buffer).setUint32(offset, value >>> 0, true);
}

function zipDateTime(value) {
  return {
    time: (value.getHours() << 11) | (value.getMinutes() << 5) | Math.floor(value.getSeconds() / 2),
    date: ((value.getFullYear() - 1980) << 9) | ((value.getMonth() + 1) << 5) | value.getDate(),
  };
}

function crc32(bytes) {
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i += 1) {
    crc = ZIP_CRC_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

const ZIP_CRC_TABLE = Array.from({ length: 256 }, (_, index) => {
  let crc = index;
  for (let bit = 0; bit < 8; bit += 1) {
    crc = crc & 1 ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1;
  }
  return crc >>> 0;
});

function downloadText(filename, text, type) {
  const blob = new Blob([text], { type });
  downloadBlob(filename, blob);
}

function downloadBlob(filename, blob) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

async function downloadSchema(filename) {
  const response = await fetch(`schemas/2.0.0/${filename}`);
  const text = await response.text();
  downloadText(filename, text, "application/json");
}

async function copyPreview() {
  await navigator.clipboard.writeText(jsonPreview.textContent);
  validationSummary.textContent = "Active preview copied to clipboard.";
  validationSummary.className = "validation-summary ok";
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

renderStudyGroups();
renderParticipants();
renderCharacteristics();
renderDatasheets();
renderDevices();
renderDatasetRecords();
syncControlsFromActiveDataset();
renderFileGroups();
renderTerms();
renderVariables();
updateCrossrefOptions();
updatePreview();
loadSchemaHelp();
