
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { demoPayload } from "./demo-data";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	templateUrl: "./app.component.html"
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
			json: ""
		};
		this.payload = undefined;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once after the inputs have been bound for the first time.
	public ngOnInit() : void {

		this.form.json = this.getFromUrl();

		// FOR THE DEMO
		// ------------
		// In order to make the demo a bit more interesting for people, let's default the
		// form value to contain a parseable data-structure. This way, the user doesn't
		// have to paste / enter anything before being able to explore the features.
		if ( ! this.form.json ) {

			this.form.json = JSON.stringify( demoPayload );

		}

		if ( this.form.json ) {

			this.processForm();

		}

	}


	// I attempt to parse the given input as JSON and render the JSON Tree.
	public processForm() : void {

		this.errorMessage = "";
		this.payload = undefined;
		this.setToUrl( this.form.json );

		// If the form is empty, leave the current state cleared.
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

	// I try get the data persisted in the URL (otherwise returns empty string).
	private getFromUrl() : string {

		try {

			return( atob( window.location.hash.slice( 1 ) ) );

		} catch ( error ) {

			console.error( error );
			return( "" );

		}

	}


	// I try to persist the given data to the URL (fails silently).
	private setToUrl( data: string ) : void {

		try {

			window.location.hash = btoa( data );

		} catch ( error ) {

			console.error( error );

		}

	}

}
