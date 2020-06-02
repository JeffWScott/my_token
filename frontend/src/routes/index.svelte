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
		margin-bottom: 1rem;
	}
</style>

<svelte:head>
	<title>My Token Website</title>
</svelte:head>

<h1>Welcome to My Token</h1>
<p>Check your token balance</p>

<form on:submit|preventDefault={login}>
	<input type="text" bind:value={user}/>
	<input class="button" type="submit" value="sign in" />
</form>

