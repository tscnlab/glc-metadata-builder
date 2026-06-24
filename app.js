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
  spectralSensitivityText: "450,0.85\n555,1.0",
  linearity: "",
  directionalResponse: "",
  range: "",
  channelsText: "",
});

const state = {
  activeStep: "project",
  activeGroupIndex: 0,
  studyGroups: [],
  contributors: [],
  participants: [createParticipant()],
  characteristics: [],
  devices: [createDevice()],
  datasheets: [createDatasheet()],
  fileGroups: [createFileGroup()],
};

const fileInput = document.querySelector("#file-input");
const fileSummary = document.querySelector("#file-summary");
const fileWarning = document.querySelector("#file-warning");
const variablesTable = document.querySelector("#variables-table");
const termsList = document.querySelector("#terms-list");
const fileGroupsList = document.querySelector("#file-groups-list");
const validationSummary = document.querySelector("#validation-summary");
const jsonPreview = document.querySelector("#json-preview");
const previewTitle = document.querySelector("#preview-title");
const packageSummary = document.querySelector("#package-summary");
const downloadButton = document.querySelector("#download-json");
const copyButton = document.querySelector("#copy-json");
const addTermButton = document.querySelector("#add-term");
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
const devicesList = document.querySelector("#devices-list");
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
clearContributorsImportButton.addEventListener("click", clearContributorsImport);
downloadButton.addEventListener("click", () => downloadText("datasets.json", JSON.stringify(buildDatasetDraft(), null, 2), "application/json"));
copyButton.addEventListener("click", copyPreview);
addTermButton.addEventListener("click", addTerm);
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
document.querySelector("#add-datasheet").addEventListener("click", addDatasheet);
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
  syncActiveGroupFromControls();
  updateCrossrefOptions();
  syncDatetimeControls();
  updatePreview();
}

function handleFormChange() {
  syncActiveGroupFromControls();
  updateCrossrefOptions();
  syncDatetimeControls();
  renderVariables();
  updatePreview();
}

function setStep(step) {
  syncActiveGroupFromControls();
  state.activeStep = step;
  document.querySelectorAll(".builder-step").forEach((section) => {
    section.classList.toggle("active", section.dataset.step === step);
  });
  document.querySelectorAll("[data-step-link]").forEach((item) => {
    item.classList.toggle("active", item.dataset.stepLink === step);
  });
  updateCrossrefOptions();
  updatePreview();
}

function activeGroup() {
  return state.fileGroups[state.activeGroupIndex];
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
  setSelectOptions(fields.studyId, getStudyId() ? [getStudyId()] : [], "Add study ID first");
  setSelectOptions(fields.participantId, getParticipantIds(), "Add participant first");
  setSelectOptions(fields.deviceId, getDeviceIds(), "Add device first");
  document.querySelectorAll(".participant-select").forEach((select) => {
    setSelectOptions(select, getParticipantIds(), "Select participant");
  });
  document.querySelectorAll(".datasheet-select").forEach((select) => {
    setSelectOptions(select, getDatasheetIds(), "Select datasheet");
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
    const [studySchema, contributorSchema, participantsSchema, characteristicsSchema] = await Promise.all([
      fetch("schemas/2.0.0/study.schema.json").then((response) => response.json()),
      fetch("schemas/2.0.0/contributor.schema.json").then((response) => response.json()),
      fetch("schemas/2.0.0/participants.schema.json").then((response) => response.json()),
      fetch("schemas/2.0.0/participant_characteristics.schema.json").then((response) => response.json()),
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
    card.className = "record-card";
    card.innerHTML = `
      <div class="record-card-heading">
        <h3>Device ${index + 1}</h3>
        <button type="button" class="remove-row" ${state.devices.length === 1 ? "disabled" : ""}>Remove</button>
      </div>
      <div class="grid">
        <label>Device ID <span class="required">*</span><input data-field="id" value="${escapeHtml(device.id)}" placeholder="D001" /></label>
        <label>Manufacturer <span class="required">*</span><input data-field="manufacturer" value="${escapeHtml(device.manufacturer)}" placeholder="ActLumus" /></label>
        <label>Model <span class="required">*</span><input data-field="model" value="${escapeHtml(device.model)}" placeholder="Model name" /></label>
        <label>Serial number <span class="required">*</span><input data-field="serialNumber" value="${escapeHtml(device.serialNumber)}" placeholder="SN123" /></label>
        <label>Calibration date <span class="required">*</span><input data-field="calibrationDate" value="${escapeHtml(device.calibrationDate)}" placeholder="YYYY-MM-DD or blank if unknown" /></label>
        <label>Firmware version<input data-field="firmwareVersion" value="${escapeHtml(device.firmwareVersion)}" placeholder="v1.2.3" /></label>
        <label class="wide">Datasheet ID <span class="required">*</span><select class="datasheet-select" data-field="datasheetId"></select></label>
        <label class="wide">Sensors, one per line<textarea data-field="sensorsText" rows="2" placeholder="photopic light sensor | sensor-datasheet-id">${escapeHtml(device.sensorsText)}</textarea></label>
      </div>
    `;
    const select = card.querySelector("select");
    setSelectOptions(select, getDatasheetIds(), "Add datasheet first");
    select.value = device.datasheetId;
    card.querySelectorAll("input, textarea, select").forEach((input) => {
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

function renderDatasheets() {
  datasheetsList.innerHTML = "";
  state.datasheets.forEach((datasheet, index) => {
    const card = document.createElement("div");
    card.className = "record-card";
    card.innerHTML = `
      <div class="record-card-heading">
        <h3>Datasheet ${index + 1}</h3>
        <button type="button" class="remove-row" ${state.datasheets.length === 1 ? "disabled" : ""}>Remove</button>
      </div>
      <div class="grid">
        <label>Datasheet ID <span class="required">*</span><input data-field="id" value="${escapeHtml(datasheet.id)}" placeholder="actlumus-v1.0" /></label>
        <label>Version<input data-field="version" value="${escapeHtml(datasheet.version)}" placeholder="1.0" /></label>
        <label>Manufacturer <span class="required">*</span><input data-field="manufacturer" value="${escapeHtml(datasheet.manufacturer)}" placeholder="ActLumus" /></label>
        <label>Type <span class="required">*</span><input data-field="type" value="${escapeHtml(datasheet.type)}" placeholder="Wearable light sensor" /></label>
        <label>Model <span class="required">*</span><input data-field="model" value="${escapeHtml(datasheet.model)}" placeholder="Model name" /></label>
        <label>Calibration interval, days <span class="required">*</span><input data-field="calibrationInterval" type="number" min="0" value="${escapeHtml(datasheet.calibrationInterval)}" placeholder="365" /></label>
        <label class="wide">Spectral sensitivity <span class="required">*</span><textarea data-field="spectralSensitivityText" rows="3" placeholder="One wavelength,relative pair per line: 450,0.85">${escapeHtml(datasheet.spectralSensitivityText)}</textarea></label>
        <label>Linearity <span class="required">*</span><input data-field="linearity" value="${escapeHtml(datasheet.linearity)}" placeholder="Example: +/-2%" /></label>
        <label>Directional response <span class="required">*</span><input data-field="directionalResponse" value="${escapeHtml(datasheet.directionalResponse)}" placeholder="Example: cosine corrected" /></label>
        <label>Calibration range <span class="required">*</span><input data-field="range" value="${escapeHtml(datasheet.range)}" placeholder="Example: 0-100000 lux" /></label>
        <label class="wide">Channels, one per line<textarea data-field="channelsText" rows="2" placeholder="1 | broadband | lux | Broadband visible light">${escapeHtml(datasheet.channelsText)}</textarea></label>
      </div>
    `;
    card.querySelectorAll("input, textarea").forEach((input) => {
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
  const columns = group.columns || [];
  const options = ['<option value="">None / collection date value</option>'].concat(
    columns.map((column) => `<option value="${escapeHtml(column)}">${escapeHtml(column)}</option>`),
  );
  fields.datetimeDate.innerHTML = options.join("");
  fields.datetimeTime.innerHTML = options.join("");
}

function renderVariables() {
  const group = activeGroup();
  variablesTable.innerHTML = "";

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

function buildDatasetDraft() {
  syncActiveGroupFromControls();
  const datetimeGroup = state.fileGroups.find((group) => !group.auxiliary) || state.fileGroups[0];

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

  return [
    {
      schema_version: fields.schemaVersion.value || "2.0.0",
      dataset_internal_id: fields.datasetId.value || "",
      dataset_instructions: fields.instructions.value || "",
      dataset_crossref: {
        dataset_crossref_study_id: fields.studyId.value || "",
        dataset_crossref_participant_id: fields.participantId.value || "",
        dataset_crossref_device_id: fields.deviceId.value || "",
      },
      dataset_device_location: fields.deviceLocation.value || "",
      dataset_sampling_interval: fields.samplingInterval.value === "" ? null : Number(fields.samplingInterval.value),
      dataset_datetime: datasetDatetime,
      dataset_timezone: fields.datasetTimezone.value || "",
      dataset_location: [fields.latitude.value || "", fields.longitude.value || ""],
      dataset_variable_terms: getDatasetVariableTerms(),
      dataset_file: state.fileGroups.map(buildDatasetFile),
    },
  ];
}

function getDatasetVariableTerms() {
  const byTerm = new Map();
  state.fileGroups.forEach((group) => {
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

function buildDevicesDraft() {
  return state.devices
    .filter((entry) => entry.id || entry.manufacturer || entry.model || entry.serialNumber)
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

function buildDatasheetsDraft() {
  return state.datasheets
    .filter((entry) => entry.id || entry.manufacturer || entry.model)
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
    .split(/\r?\n/)
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
    .split(/\r?\n/)
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
    .split(/\r?\n/)
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
  if (state.activeStep === "devices") return buildDevicesDraft();
  if (state.activeStep === "datasheets") return buildDatasheetsDraft();
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
}

function downloadText(filename, text, type) {
  const blob = new Blob([text], { type });
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
renderFileGroups();
syncControlsFromActiveGroup();
renderTerms();
renderVariables();
updateCrossrefOptions();
updatePreview();
loadSchemaHelp();
