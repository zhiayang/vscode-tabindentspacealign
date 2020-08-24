## Release Notes

### 1.2.4

Only activate when there's no selection, so you can use tab/shift+tab to indent/unindent

### 1.2.1

Add a feature to additionally inset the indentation by one more level when the previous line ends with a `{`.

### 1.2.0

Add a feature (controlled by `dynamictab.indentBasedOnPrecedingLine`) that inserts the appropriate number of tabs (spaces or tab literals) based on the preceding line. Disabled by default.

### 1.1.2

Fix a bug where the wrong number of spaces would get inserted if there were tab characters after a non-whitespace char (ie. you used tabs to align prior to using this plugin)

### 1.1.1

Not entirely sure what was changed here...

### 1.1.0

Fix a pretty big bug where we weren't respecting the `insertSpaces` option (only found out after all the YAML files broke)

### 1.0.3

Update repository url

### 1.0.1

Name change

### 1.0.0

Initial release
