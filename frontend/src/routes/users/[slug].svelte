<script context="module">
	export async function preload({ params, query }) {
		const res = await this.fetch(`http://localhost:3737/contracts/my_token/S?key=${params.slug}`)
		const data = await res.json();
		if (data.value !== 'undefined') this.error(res.status, data.message);
		if (data.value === null) data.value = 0;
		return { value: data.value, user: params.slug };
	}
</script>

<script>
	import { goto } from '@sapper/app';

	export let value;
	export let user;

	let to, amount = 0;

	const logout = async () => {
		await goto(`.`);
	}
	const send = async () => {
		if (!to) return
		if (amount <= 0) return

		let transaction = {
			sender: user,
			contract: 'my_token',
			method: 'transfer',
			args: JSON.stringify({
				receiver: to,
				amount
			})
		}

		let options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(transaction)
		}
		let res = await fetch(`http://localhost:3737/`, options)
		let data = await res.json();
		if (!data.error) {
			clearInputs();
			refreshBalance();
		}
		else alert(data.error)
	}
	const refreshBalance = async () => {
		const res = await fetch(`http://localhost:3737/contracts/my_token/S?key=${user}`)
		let data = await res.json();
		value = data.value;
	}

	const clearInputs = () => {
		to = ""
		amount = 0
	}
</script>

<style>
	form{
		display:flex;
		flex-direction: column;
		padding: 50px;
		border-radius: 28px;
		box-shadow: 10px 10px 51px -35px rgba(0,0,0,0.75);
		background: #5F5E9D;
		color: white;
		margin: 2rem 0;
	}
	form input{
		margin-bottom: 1rem;
	}
	h1{
		text-transform: capitalize;
	}
	h2{
		color: #2B0029;
	}

	button{
		float: right;
	}
</style>

<svelte:head>
	<title>{`${user}'s Tokens`}</title>
</svelte:head>

<h1>{`Hello ${user}`}</h1>
<h2>Token Balance: {value}</h2>

<form on:submit|preventDefault={send}>
	<h3>Make a transfer</h3>
	<label for="to">To</label>
	<input type="text" name="to" bind:value={to} required="true"/>
	<label for="amount">Token Amount</label>
	<input type="number" name="amount" bind:value={amount} required="true"/>
	<input class="button" type="submit" value="SEND"/>
</form>


<button class="button" on:click={logout}>sign out </button>
