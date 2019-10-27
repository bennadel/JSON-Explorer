
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { demoPayload } from "./demo-data";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<div *ngIf="errorMessage" class="error">
			<strong>An error occurred:</strong> {{ errorMessage }}
		</div>

		<h2>
			JSON Payload
		</h2>

		<form (submit)="processForm()" class="form">

			<textarea
				name="json"
				[(ngModel)]="form.json"
				(keydown.Meta.Enter)="processForm()"
				class="input"
			></textarea>

			<button type="submit" class="button">
				Explore
			</button>

		</form>

		<ng-template [ngIf]="( payload !== undefined )">

			<h2>
				Deserialized Data Structure
			</h2>

			<json-tree [value]="payload"></json-tree>

			<p>
				<strong>Pro Tip:</strong> If a String value contains JSON, you can try
				to parse it by using <strong><code>Meta+Click</code></strong>.
			</p>

		</ng-template>
	`
})
export class AppComponent {

	public errorMessage: string;
	public form: {
		json: string;
	};
	public payload: any;

	// I initialize the app component.
	constructor() {

		this.errorMessage = "";
		this.form = {
			json: this.getFromUrl()
		};
		this.payload = undefined;

		// FOR THE DEMO
		// ------------
		// In order to make the demo a bit more interesting for people, let's default the
		// form value to contain a parseable data-structure. This way, the user doesn't
		// have to paste / enter anything before being able to explore the features.
		if ( ! this.form.json ) {

			this.form.json = JSON.stringify( demoPayload );

		}

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once after the inputs have been bound for the first time.
	public ngOnInit() : void {

		if ( this.form.json ) {

			this.processForm();

		}

	}


	// I attempt to parse the given input as JSON and render the JSON Tree.
	public processForm() : void {

		this.errorMessage = "";
		this.payload = undefined;
		this.setToUrl( this.form.json );

		// If the form is empty, clear the current state.
		if ( ! this.form.json ) {

			return;

		}

		try {

			this.payload = JSON.parse( this.form.json );
			this.setToUrl( this.form.json );

			console.group( "Resultant Data Structure" );
			console.dir( this.payload );
			console.groupEnd();

		} catch ( error ) {

			this.errorMessage = error.message;

		}

	}

	// ---
	// PRIVATE METHODS.
	// ---

	private getFromUrl() : string {

		try {

			return( atob( window.location.hash.slice( 1 ) ) );

		} catch ( error ) {

			console.error( error );
			return( "" );

		}

	}


	private setToUrl( data: string ) : void {

		try {

			window.location.hash = btoa( data );

		} catch ( error ) {

			console.error( error );

		}

	}

}
