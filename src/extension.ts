'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { window, commands, Disposable, TextDocument, ExtensionContext, TextEditorEdit, workspace } from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext)
{
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json

	let disposable = commands.registerCommand('extension.dynamictabkey', () => {
		// The code you place here will be executed every time your command is executed

		// Get the current text editor
		let editor = window.activeTextEditor;
		if(!editor) { return; }

		let doc = editor.document;
		let cursorpos = editor.selection.active;

		let curline = doc.lineAt(cursorpos);
		let k = curline.firstNonWhitespaceCharacterIndex;

		// insert spaces
		let tabsz = (editor.options.tabSize as number);

		// if the first non-whitespace character is after the cursor position, then we insert tabs
		if(k >= cursorpos.character)
		{
			let charactersPerTab = (editor.options.insertSpaces ? tabsz : 1);
			let indentCount = 1;

			if(workspace.getConfiguration("dynamicTab").get<boolean>("indentBasedOnPrecedingLine") && curline.lineNumber > 0)
			{
				let ctr = 0;
				let ln = curline.lineNumber - 1;

				// this might possibly be #not-so-good for performance?
				while(ln >= 0)
				{
					let prevLine = doc.lineAt(ln);
					let currCharIdx = cursorpos.character / charactersPerTab;
					let prevFNWSCI = prevLine.firstNonWhitespaceCharacterIndex / charactersPerTab;

					if(prevLine.text.length > 0)
					{
						indentCount = Math.max(1, prevFNWSCI - currCharIdx);

						if(workspace.getConfiguration("dynamicTab").get<boolean>("extraIndentationInsetIfLastCharacterWasBrace")
							&& prevLine.text.endsWith("{") && prevFNWSCI > currCharIdx)
						{
							indentCount++;
						}

						break;
					}
					else
					{
						if(ctr <= workspace.getConfiguration("dynamicTab").get<number>("numberOfPreviousLinesToSearch"))
						{
							ln -= 1;
							ctr++;
						}
						else
						{
							break;
						}
					}
				}
			}

			if(editor.options.insertSpaces)
			{
				// insert a tab (but the user uses spaces, so just use spaces)
				editor.edit((eb: TextEditorEdit) => {
					editor.selections.forEach(it => {
						eb.delete(it);
						eb.insert(it.start, ' '.repeat(tabsz).repeat(indentCount));
					});
				});
			}
			else
			{
				// insert an actual tab
				editor.edit((eb: TextEditorEdit) => {
					editor.selections.forEach(it => {
						eb.delete(it);
						eb.insert(it.start, '\t'.repeat(indentCount));
					});
				});
			}
		}
		else
		{
			editor.edit((eb: TextEditorEdit) => {
				editor.selections.forEach(it => {
					eb.delete(it);

					let line = editor.document.lineAt(it.start.line).text;

					let cursor = 0;
					for (let idx = 0; idx <= it.start.character; idx++)
					{
						if(line[idx] == '\t') cursor += (cursor % tabsz);
						else                  cursor++;
					}

					let finalpos = Math.ceil(cursor / tabsz) * tabsz;

					// console.log("tab size: %d, cursor: %d / %d, finalpos: %d", tabsz, cursor, it.active.character, finalpos);
					eb.insert(it.start, ' '.repeat(finalpos - cursor + 1));
				});
			});
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate()
{
}
