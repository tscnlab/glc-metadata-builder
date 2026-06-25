# GLC metadata builder

A browser-based metadata builder for creating GLC/GLEAM metadata packages without hand-editing JSON and CSV files.

Open the hosted builder here:

```text
https://tscnlab.github.io/glc-metadata-builder/
```

The builder runs in the browser. Files selected by users are read locally by the browser and are not uploaded to a server.

## What it does

The builder helps data owners create a draft GLC metadata package by guiding them through:

- project setup
- study metadata
- participants and participant characteristics
- devices
- device and sensor datasheets
- participant-level datasets
- dataset file groups and variables
- export and soft validation

It currently supports schema release `2.0.0`.

## What it exports

The builder can download individual metadata files:

- `datapackage.json`
- `study.json`
- `participants.csv`
- `participant_characteristics.csv`, when rows are present
- `devices.json`
- `device_datasheet.json`
- `datasets.json`

It can also download a metadata package `.zip`.

The zip contains:

- generated metadata files
- the `schemas/2.0.0/` schema bundle referenced by `datapackage.json`
- a short `README.txt`

The zip does not include the original data files selected in the dataset file assistant. Those files still need to be added to the exported package before running the full validator.

## Required resources

The GLEAM datapackage profile requires these core resources:

- `study`
- `participants`
- `datasets`
- `devices`
- `device_datasheets`

The recognized optional resource is:

- `participant_characteristics`

Additional supporting resources, such as scripts, README files, raw-data folders, or codebooks, are allowed by the profile but are not yet exposed in this builder UI.

## Key features

- Schema version fixed to `2.0.0`
- Required fields marked with red asterisks
- Hover help from local schema descriptions
- JSON/CSV/TSV imports where practical
- Cross-reference dropdowns for study, participant, device, and datasheet IDs
- Multiple dataset records per study
- Dataset file groups for same-structure files and auxiliary files
- Header detection for selected CSV/TXT/TSV dataset files
- Auto-detected dataset variables from file headers
- File-group-level variable terms, labels, units, calibration notes, semantic-term dropdowns, and primary-variable selection
- Soft validation panel on the Export page
- Individual metadata downloads and zip export

## Dataset model

The builder treats one dataset record as one participant-level measurement dataset.

Use a new dataset record when the participant, primary device, body/device location, or primary modality changes.

Use a dataset file group when files belong to the same participant measurement context and share a structure, or when a file is auxiliary to the primary measurement.

Examples:

- Wrist light data and its wear log can be one dataset record with two file groups.
- Wrist light data and chest light data for the same participant should usually be two dataset records.
- A standalone questionnaire dataset should usually be its own dataset record unless it is only auxiliary to interpreting the primary measurement.

## Soft validation

The Export page includes a soft validation panel. It does not block downloads.

The panel currently checks for common issues, including:

- missing required study fields
- missing required participants
- missing required device fields
- missing required datasheet fields
- missing dataset IDs and cross-references
- missing dataset file groups, files, columns, datetime metadata, and primary variables
- duplicate dataset IDs
- cross-reference mismatches between datasets, participants, devices, and study

The Python validator remains the authoritative validation step.

## Schema bundle

A local copy of the schema bundle is included at:

```text
schemas/2.0.0/
```

This lets the builder show schema descriptions as hover help and lets users download schema files directly from the UI.

The repository also contains:

```text
schemas/2.0.0/device_datasheet.generalized-draft.schema.json
```

That file is a discussion draft for a more general device/sensor datasheet model. The builder currently continues to use `device_datasheet.schema.json`.

## Development

For local development, serve the static files from this repository:

```bash
python3 -m http.server 8766
```

Then open:

```text
http://localhost:8766
```

If changes do not appear immediately, hard refresh the browser.
