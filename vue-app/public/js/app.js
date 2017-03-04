/**
* this class will represent form validation errors
*/
class Errors {

	/**
	* assign an empty object to errors
	*/
	constructor() {
		this.errors  = {};
	}

	/**
	* get the error message from array offset 0 of specified field name
	*
	* @param field - string
	* @return error message - string
	*/
	get(field) {
		if(this.errors[field]) {
			return this.errors[field][0];
		}
	}

	/**
	* checking if errors array has the specified field name
	*
	* @param field - string
	* @return boolean
	*/
	has(field) {
		return this.errors.hasOwnProperty(field);
	}

	/**
	* checking if errors array is non empty
	*
	* @return boolean
	*/
	any() {
		return Object.keys(this.errors).length > 0;
	}

	/**
	* setting the validation errors
	*
	* @param errors - string array object
	*/
	set(errors) {
		this.errors = errors
	}

	/**
	* Clearing the validation errors
	*
	* @param field - string
	*/
	clear(field) {
		if(field) {			
			delete this.errors[field];

			return;
		}

		this.errors = {};
	}
}

/**
* This class will represent a form and its actions
*/
class Form {

	/**
	* Bind all form field/prameters to this class instance
	*
	* @param data - array object
	*/
	constructor(data) {
		this.originalData = data;

		for(let field in data) {
			this[field] = data[field];
		}

		this.errors = new Errors();
	}	

	/**
	* Bind all form field/prameters to this class instance
	*
	* @param data - array object
	*/
	data() {
		let data = {};

		for(let property in this.originalData) {
			data[property] = this[property];
		}
		/*delete data.originalData;
		delete data.errors;*/

		console.log(data);

		return data;
	}

	submit(requestType, url) {
		return new Promise((resolve, reject) => {
				axios[requestType](url, this.data())
				.then(response => {
					this.onSuccess(response.data);

					resolve(response.data);
				})
				.catch(error => {
					this.onFail(error.response.data);

					reject(error.response.data);
				});
			});
	}

	reset() {
		for(let field in this.originalData) {
			this[field] = '';
		}

		this.errors.clear();
	}

	onSuccess(data) {
		alert(data.message);
		this.reset();
	}

	onFail(error) {
		this.errors.set(error);
	}
}

new Vue({
	el: '#root',
	data: {
		skills: [],

		message: 'Hello',

		form: new Form({
			name: '',
			description: '',		
		}),

		projects: [],

		isSubmiting: false,
	},
	mounted() {
		axios.get("/skills")
		  .then(response => {
		  	this.skills = response.data;
		  });

		this.getProjects();
	},
	methods: {
		onSubmitProject() {
			this.isSubmiting = true;

			this.form.submit('post', '/projects/create')
			.then(data => {
				this.getProjects();

				this.isSubmiting = false;
			})
			.catch(error => {
				console.log(error);

				this.isSubmiting = false;
			});
		},
		getProjects() {
			axios.get("/projects")
			  .then(response => {
			  	this.projects = response.data;
			  });			
		},
	}
});