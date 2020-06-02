<script>
	import { goto } from '@sapper/app';

	let user = ""
	const login = async () => {
		if (user) await goto(`/users/${user.toLowerCase()}`);
	}
</script>

<style>
	*{
		text-align: center;
	}
	input{
		margin-right: 20px;
	}
</style>

<svelte:head>
	<title>My Token Website</title>
</svelte:head>

<h1>Welcome to My Token</h1>

<form on:submit|preventDefault={login}>
	<input type="text" bind:value={user}/>
	<input class="button" type="submit" value="sign in"/>
</form>

