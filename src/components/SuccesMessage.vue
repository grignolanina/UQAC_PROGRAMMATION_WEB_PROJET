<template>
	<div class="succes-container">
		<p :class="{ 'succes-message': true, 'resolved-message': isResolved }">{{ resolvedMessage }}</p>
	</div>
</template>
  
<script>
export default {
	name: "SuccesMessage",
	props: {
		resolvedMessage: String,
		isResolved: Boolean
	}
};
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

.succes-message {
	color: green;
	/* border: 4px solid black; */
	/* background: #62b475; */
}
</style>
  