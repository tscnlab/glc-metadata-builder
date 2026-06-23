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

const state = {
  activeGroupIndex: 0,
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
const downloadButton = document.querySelector("#download-json");
const copyButton = document.querySelector("#copy-json");
const addTermButton = document.querySelector("#add-term");
const addFileGroupButton = document.querySelector("#add-file-group");

const fields = {
  schemaVersion: document.querySelector("#schema-version"),
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
downloadButton.addEventListener("click", downloadDraft);
copyButton.addEventListener("click", copyPreview);
addTermButton.addEventListener("click", addTerm);
addFileGroupButton.addEventListener("click", addFileGroup);

Object.values(fields).forEach((field) => {
  field.addEventListener("input", () => {
    syncActiveGroupFromControls();
    syncDatetimeControls();
    updatePreview();
  });
  field.addEventListener("change", () => {
    syncActiveGroupFromControls();
    syncDatetimeControls();
    renderVariables();
    updatePreview();
  });
});

function activeGroup() {
  return state.fileGroups[state.activeGroupIndex];
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
    downloadButton.disabled = state.fileGroups.every((entry) => entry.columns.length === 0);
    copyButton.disabled = downloadButton.disabled;
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

  group.columns.forEach((column, index) => {
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
  downloadButton.disabled = false;
  copyButton.disabled = false;
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

  if (group.auxiliary === false) {
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

function updatePreview() {
  const draft = buildDatasetDraft();
  jsonPreview.textContent = JSON.stringify(draft, null, 2);
}

function downloadDraft() {
  const draft = JSON.stringify(buildDatasetDraft(), null, 2);
  const blob = new Blob([draft], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "datasets.json";
  link.click();
  URL.revokeObjectURL(url);
}

async function copyPreview() {
  await navigator.clipboard.writeText(jsonPreview.textContent);
  validationSummary.textContent = "JSON preview copied to clipboard.";
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

renderFileGroups();
syncControlsFromActiveGroup();
renderTerms();
renderVariables();
updatePreview();
