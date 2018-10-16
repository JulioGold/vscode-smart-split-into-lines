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
		let selection = textEditor.selection;

		if(!selection.isEmpty) {

			let document = textEditor.document;
			let selections = new Array<vscode.Selection>();
			
			// Para cada linha selecionada
			for (var i = selection.start.line; i <= selection.end.line; i++) {
				
				// Inserir o cursor em cada linha sempre no final da linha
				if(i !== selection.end.line) {

					let position = new vscode.Position(i, document.lineAt(i).range.end.character);
					selections.push(new vscode.Selection(position, position));
					
				} else if( selection.end.character > 0 ) {
					
					selections.push(new vscode.Selection(selection.end,selection.end));
				}
			}

			// Coloca o que foi feito no editor e pronto, valeu falows...
			textEditor.selections = selections;
		}
	}));
}

// this method is called when your extension is deactivated
export function deactivate() {
}