
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { JsonNodeComponent } from "./json-node.component";
import { JsonTreeComponent } from "./json-tree.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule,
		FormsModule
	],
	providers: [],
	declarations: [
		AppComponent,
		JsonNodeComponent,
		JsonTreeComponent
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}
