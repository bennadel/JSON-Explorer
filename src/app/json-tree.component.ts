
// Import the core angular services.
import { ChangeDetectionStrategy } from "@angular/core";
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "json-tree",
	inputs: [ "value" ],
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: [ "./json-tree.component.less" ],
	template:
	`
		<json-node [value]="value"></json-node>
	`
})
export class JsonTreeComponent {

	public value!: any;

}
