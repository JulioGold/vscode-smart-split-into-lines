'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-smart-split-into-lines" is now active!');

	context.subscriptions.push(vscode.commands.registerCommand('smart.splitIntoLines', () => {
		
		let textEditor = vscode.window.activeTextEditor;
		let selections = textEditor.selections;
		let document = textEditor.document;
		let splitedSelections = new Array<vscode.Selection>();

		selections.forEach((selection) => {
			if(selection.isSingleLine) {
				splitedSelections.push(new vscode.Selection(selection.start, selection.end));
			} else {
				// Para cada linha selecionada
				for (var i = selection.start.line; i <= selection.end.line; i++) {
					let positionEnd = new vscode.Position(i, document.lineAt(i).range.end.character);
					let positionStart = new vscode.Position(i, document.lineAt(i).range.start.character);
					if (i === selection.start.line) {
						//first line
						splitedSelections.push(new vscode.Selection(selection.start, positionEnd));
					} else if (i === selection.end.line) {
						//last line
						splitedSelections.push(new vscode.Selection(positionStart, selection.end));
					} else{
						splitedSelections.push(new vscode.Selection(positionStart, positionEnd));
					}
				}
			}
		});
		if(splitedSelections.length > 1) {
			let lastSelection = splitedSelections[splitedSelections.length - 1];
			if (lastSelection.isEmpty && lastSelection.end.character === 0 ) {
				//strip the last empty selection
				splitedSelections.pop();
			}
		}
		if (splitedSelections.length > 0) {
			// Coloca o que foi feito no editor e pronto, valeu falows...
			textEditor.selections = splitedSelections;
		}
	}));
}

// this method is called when your extension is deactivated
export function deactivate() {
}
