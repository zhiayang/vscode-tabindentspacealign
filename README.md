# Dynamic Tab Insertion

This extension augments the functionality of the 'tab' key. If you're the kind of person to use tabs for indentations and spaces for alignment, then
this is the plugin for you!

## Features

If your 'tab' key inserts spaces, then this plugin will not do anything. Otherwise, when pressing the 'tab' key:

1. Before a non-whitespace character appears on a line (ie. indentation), the tab literal is inserted.
2. After any non-whitespace character appears (ie. inline tabs), spaces are inserted.

The spaces inserted will align you to the nearest tab stop, based on your preferred tab size.

There are no options to configure, but this plugin adds a keybinding to the 'tab' key in the editor.


## Known Issues

1. Not really an issue, but there might be a slight performance impact since VS Code offers no builtin method to get the *column* that the cursor is at,
rather only the character index.
