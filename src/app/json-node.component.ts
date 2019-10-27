
// Import the core angular services.
import { ChangeDetectionStrategy } from "@angular/core";
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// CAUTION: The value bound this component is ASSUMED to be the result of a JSON.parse()
// call. As such, it does NOT SUPPORT the full set of JavaScript data-types. Instead, it
// only supports those that can be encoded in a JSON payload.
type ValueType = 
	| "Null" 
	| "String" 
	| "Number" 
	| "Boolean"
	| "Array" 
	| "Object"
;

interface CollapsedEntries {
	[ key: string ]: boolean;
}

@Component({
	selector: "json-node",
	inputs: [ "value" ],
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: [ "./json-node.component.less" ],
	templateUrl: "./json-node.component.html"
})
export class JsonNodeComponent {

	public collapsedEntries: CollapsedEntries;
	public entryCount: number;
	public isCollapsed: boolean;
	public value: any;
	public valueType: ValueType;

	// I initialize the json tree component.
	constructor() {

		this.collapsedEntries = Object.create( null );
		this.entryCount = 0;
		this.isCollapsed = false;
		this.value = null;
		this.valueType = this.calculateType( this.value );

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I calculate the Type for the given value.
	public calculateType( target: any ) : ValueType {

		if ( target === null ) {

			return( "Null" );

		}

		if ( typeof( target ) === "string" ) {

			return( "String" );

		}

		if ( typeof( target ) === "number" ) {

			return( "Number" );

		}

		if ( typeof( target ) === "boolean" ) {

			return( "Boolean" );

		}

		if ( Array.isArray( target ) ) {

			return( "Array" );

		}

		return( "Object" );

	}


	// I get called after the inputs bindings have been updated.
	public ngOnChanges() : void {

		this.entryCount = 0;
		this.collapsedEntries = Object.create( null );
		this.isCollapsed = false;
		this.valueType = this.calculateType( this.value );

		if ( this.valueType === "Object" ) {

			this.entryCount = Object.keys( this.value ).length;

		} else if ( this.valueType === "Array" ) {

			this.entryCount = this.value.length;

		}

	}


	// I attempt to parse the current String value as a JSON payload.
	// --
	// NOTE: This overrides the passed-in state at this point in the JSON Tree.
	public parseString( event: any ) : void {

		if ( ! event.metaKey ) {

			return;

		}

		try {

			this.value = JSON.parse( this.value );
			this.ngOnChanges();

		} catch ( error ) {

			console.group( "String Parsing" );
			console.warn( "The value could not be parsed as JSON." );
			console.error( error );
			console.log( this.value );
			console.groupEnd();

		}

	}


	// I toggle the expansion of the given value.
	public toggle( index?: string | number ) : void {

		// Top-level toggle.
		if ( index === undefined ) {

			this.isCollapsed = ! this.isCollapsed;

			// If we're collapsing the top-level value, then reset any settings for the
			// sub-entires (for Struct and Array types only).
			if ( this.isCollapsed ) {

				this.collapsedEntries = Object.create( null );

			}

		// Sub-entry toggle.
		} else {

			this.collapsedEntries[ index ] = ! this.collapsedEntries[ index ];

		}

	}

}
