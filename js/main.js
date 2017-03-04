Vue.component('task-list', {
	template: `
		<div>		
			<task v-for="task in tasks">{{ task.description }}</task>
		</div>
	`,
	data() {
		return {
			tasks: [
				{  description: 'Go to the Bank', completed: true },
				{  description: 'Go to the School', completed: true },
				{  description: 'Go to the Park', completed: true },
				{  description: 'Go to the Restaurant', completed: true },
			]
		}
	}
});

Vue.component('task', {
	template: '<li><slot></slot></li>'
});

new Vue({
	el: '#root'
});