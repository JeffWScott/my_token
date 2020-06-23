<!-- /frontend/src/routes/_layout.svelte -->

<script>
	import { onMount, setContext } from 'svelte'
	import Nav from '../components/Nav.svelte';
	import WalletController from 'lamden_wallet_controller';
	import { walletInstalled, walletInfo, txResults } from '../stores'
	import { approvalRequest } from '../wallet_approval'

	let lwc;

	onMount(() => {
		lwc = new WalletController()
		lwc.events.on('newInfo', handleWalletInfo)
		lwc.events.on('txStatus', handleTxResults)

		lwc.walletIsInstalled()
			.then(installed => {
				if (installed) walletInstalled.set('installed')
				else walletInstalled.set('not-installed')
			})

		return () => {
			lwc.events.removeListener(handleWalletInfo)
			lwc.events.removeListener(handleTxResults)
		}
	})

	setContext('app_functions', {
		sendTransaction: (transaction) => {
			lwc.sendTransaction(transaction)
		}
	})

	const handleWalletInfo = (info) => {
		console.log(info)
		if (info.errors){
			if (info.errors[0].includes('lamdenWalletConnect')){
				lwc.sendConnection(approvalRequest)
			}
		}else{
			walletInfo.set(info)
		}
	}

	const handleTxResults = (results) => txResults.set(results)
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		padding: 0 28px;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<Nav />
<main>
	<slot></slot>
</main>