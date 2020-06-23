<!-- /frontend/src/routes/users/[user].svelte -->

<script context="module">
	export async function preload({ params, query }) {
		const res = await this.fetch("http://167.172.126.5:18080/contracts/con_jeff_token/S?key=" + params.user)
		const data = await res.json();
		if (data.value === 'undefined') this.error(res.status, data.message);
		if (data.value === null) data.value = 0;
		return { value: data.value, user: params.user };
	}
</script>

<script>
	import { getContext } from 'svelte'
	import { goto } from '@sapper/app';
	import { txResults } from '../../stores'

	const { sendTransaction } = getContext('app_functions')

	export let value;
	export let user;

	let receiver = "";
	let amount = 0;
	let txMessage = ""

	const transfer = async () => {
		const transaction = {
			methodName: 'transfer',
			networkType: 'testnet',
			stampLimit: 50000,
			kwargs: {
				receiver,
				amount
			}
		}
		txMessage = "... Sending Transaction ..."
		sendTransaction(transaction)
	}

	const refreshBalance = async () => {
		const res = await fetch("http://localhost:3737/contracts/my_token/S?key=" + user)
		const data = await res.json();
		value = data.value;
	}

	const clearInputs = () => {
		receiver = ""
		amount = 0
	}

	const logout = () => {
		goto(`.`);
	}

	const processTxResults = (data) => {
		if (typeof data.txBlockResult.status !== 'undefined'){
			if (data.txBlockResult.status == 0) {
				txMessage = "You sent " + amount + " token(s)!";
				refreshBalance();
				clearInputs();
			}else{
				txMessage = "There was a problem sending your transaction :(";
			}
		}
	}

	txResults.subscribe(results => {
		if (results.data) processTxResults(results.data)
	})
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
	h2{
		color: #2B0029;
	}
	button{
		float: right;
	}
</style>

<svelte:head>
	<title>{user + "'s Tokens"}</title>
</svelte:head>

<p><strong>Hello </strong>{user}</p>
<h2>Token Balance: {value}</h2>

<form on:submit|preventDefault={transfer}>
	<h3>Make a transfer</h3>
	<label for="to">To</label>
	<input type="text" name="to" bind:value={receiver} required="true"/>
	<label for="amount">Token Amount</label>
	<input type="number" name="amount" bind:value={amount} required="true"/>
	<p>{txMessage}</p>
	<input class="button" type="submit" value="SEND"/>
</form>


<button class="button" on:click={logout}>sign out </button>
