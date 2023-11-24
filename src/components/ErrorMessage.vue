<template>
	<div class="error-container">
		<p class="error-message">{{ result }}</p>
	</div>
</template>
<script>

export default {
	props: {
		result: String
	},

}
</script>

<style scoped>
.error-container {
	display: flex;
}

.error-message {
	width: 80%;
	border: 1px solid red;
	background: #f8d7da;
}
</style>