# Dynamic Tab Insertion

This extension augments the functionality of the 'tab' key. If you're the kind of person to use tabs for indentations and spaces for alignment, then
this is the plugin for you!

## Features


### Tabs to indent, spaces to align
If your 'tab' key inserts spaces, then this plugin will not do anything. Otherwise, when pressing the 'tab' key:

1. Before a non-whitespace character appears on a line (ie. indentation), the tab literal is inserted.
2. After any non-whitespace character appears (ie. inline tabs), spaces are inserted.

The spaces inserted will align you to the nearest tab stop, based on your preferred tab size.

There are no options to configure, but this plugin adds a keybinding to the 'tab' key in the editor.


### 'Smart' indentation
New since version 1.2.0, there is an option (`dynamictab.indentBasedOnPrecedingLine`, OFF by default) that matches the indentation of previous lines when the tab key is pressed, versus just inserting one single 'Tab Unit' (regardless of spaces or literal tabs).

Since version 1.2.1, the upwards search continues till the first non-empty line is found, for a configurable number of lines.


## Known Issues

1. Not really an issue, but there might be a slight performance impact since VS Code offers no builtin method to get the *column* that the cursor is at,
rather only the character index.
