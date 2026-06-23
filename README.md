# GLC metadata builder proof-of-concept

This is a tiny browser-based proof of concept for the GLC metadata builder.

It demonstrates one workflow:

1. Enter the fields required by `dataset.schema.json` for one participant-level dataset record
2. Define variable terms for each file group, including `other`
3. Select one or more CSV/TXT/TSV files for a dataset file group
4. Detect delimiter, header row, and column names
5. Draft `dataset_file_variables`
6. Choose each variable's semantic term from the user-defined term list
7. Explicitly select up to four `primary_variables` for non-auxiliary files
8. Add or remove file groups for auxiliary files or different file structures
9. Download a draft `datasets.json`

## How to open

Open `index.html` in a browser.

No build step is required.

## What this showcases

This is a focused demo of the dataset-file assistant idea. It is meant to show how users could generate metadata from actual data files without hand-editing JSON.

In this proof of concept, one dataset record is treated as one participant's dataset. Each `dataset_file` group can contain multiple physical files only when those files share the same structure.

Required fields are marked with `*`. Example values are shown as placeholders rather than silently filled into the output.

Variable terms and datetime metadata are collected in the active file group because users usually understand both in relation to a specific file structure. The current 2.0.0 schema still exports top-level `dataset_variable_terms` and one top-level `dataset_datetime` object, so this proof of concept merges file-group terms and uses the first non-auxiliary file group's datetime metadata for the exported 2.0.0 JSON.

## Next steps

This is not the full metadata builder. It does not yet include:

- fully generated schema-driven forms
- study/device/participant forms
- package zip export
- Python validator integration
- semantic term lookup
- real cross-reference dropdowns
- a future schema update that moves file-specific datetime metadata under each `dataset_file` group
- final validator support for collection-date metadata when a file has no datetime column


