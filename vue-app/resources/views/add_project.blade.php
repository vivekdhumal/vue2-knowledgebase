<!DOCTYPE html>
<html>
	<head>
		<title>Project form</title>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.3.1/css/bulma.min.css">
		<style type="text/css">
			body {
				padding-top: 40px;
			}
		</style>
	</head>
	<body>
		<div id="root" class="container">
			<div class="content" v-if="projects.length">
				<h3>Projects</h3>
				<table class="table is-borderd">
					<thead>
						<tr>
							<th>Name</th>
							<th>Description</th>
						</tr>					
					</thead>
					<tbody>
						<tr v-for="project in projects">
							<td v-text="project.name"></td>
							<td v-text="project.description"></td>
						</tr>
					</tbody>
				</table>
				<hr>				
			</div>
			<form method="post" @submit.prevent="onSubmitProject" @keydown="form.errors.clear($event.target.name)">
				{{ csrf_field() }}
				<label class="label">Name</label>
				<p class="control">
				  <input class="input" type="text" name="name" v-model="form.name" placeholder="">

				  <span class="help is-danger" v-if="form.errors.has('name')" v-text="form.errors.get('name')"></span>
				</p>

				<label class="label">Description</label>
				<p class="control">
				  <input class="input" type="text" name="description" v-model="form.description" placeholder="">

				  <span class="help is-danger" v-if="form.errors.has('description')" v-text="form.errors.get('description')"></span>
				</p>
				
				<div class="control is-grouped">
					<p class="control">
						<button :class="{ 'is-loading': isSubmiting, 'button': true , 'is-primary': true }" :disabled="form.errors.any() || isSubmiting">Submit</button>
					</p>
				</div>
			</form>
		</div>
	</body>

	<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
	<script src="https://unpkg.com/vue/dist/vue.js"></script>
	<script src="/js/app.js"></script>
</html>