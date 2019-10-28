
interface DemoPayload {
	type: string,
	name: string,
	children: {
		type: string,
		name: string,
		age: number,
		nicknames: string[],
		isAdorable: boolean
	}[],
	age: number,
	metadata: string,
	alternateEgo: null

}

export var demoPayload: DemoPayload = {
	type: "hooman",
	name: "Ben",
	children: [
		{
			type: "dogo",
			name: "Lucy",
			age: 8,
			nicknames: [ 
				"Lucy Goosey",
				"Goose-Face Killa'",
				"Pooper"
			],
			isAdorable: true
		}
	],
	age: 39,
	metadata: `{ "_id": "c-349dk39", "createdAt": 12345.34399 }`,
	alternateEgo: null 
};
