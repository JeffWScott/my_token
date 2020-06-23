<!-- /frontend/src/routes/index.svelte -->

<script>
	import { goto } from '@sapper/app';
	import { walletInstalled, walletInfo } from '../stores'

	const login = () => {
		goto('/users/' + $walletInfo.wallets[0]);
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
	.download{
		display: flex;
    	max-width: fit-content;
    	margin: 0 auto;
	}
</style>

<svelte:head>
	<title>My Token</title>
</svelte:head>

<h1>Welcome to My Token</h1>

{#if $walletInstalled === 'checking'}
	<h2> ... Checking for Lamden Wallet ...</h2>
{/if}

{#if $walletInstalled === 'installed'}
	{#if $walletInfo.locked == true}
		<h2>Please Unlock Your Lamden Wallet</h2>
	{/if}
	{#if $walletInfo.locked == false}
		<form on:submit|preventDefault={login}>
			<p>Check your token balance</p>
			<p>{$walletInfo.wallets[0]}</p>
			<input class="button" type="submit" value="sign in" />
		</form>
	{/if}
	{#if $walletInfo.locked == undefined}
		<h2>Please Approve My Token website!</h2>
	{/if}
{/if}

{#if $walletInstalled === 'not-installed'}
	<h2>Lamden Wallet Not Installed</h2>
	<a href="https://chrome.google.com/webstore/detail/lamden-wallet-browser-ext/fhfffofbcgbjjojdnpcfompojdjjhdim"
         target="_blank"
         rel="noopener noreferrer"
         class="button download">Download</a>
{/if}
