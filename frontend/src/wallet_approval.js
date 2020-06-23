/* /frontend/src/wallet_approval.js   */

const approvalRequest = {
    appName: 'JEFF TOKEN',
    description: 'Welcome to the only site on the internet where you can trade JEFF TOKEN! Please approve this site to start trading!',
    contractName: 'con_jeff_token',
    networkType: 'testnet'
}

approvalRequest.logo = 'wallet/logo.png'
approvalRequest.background = 'wallet/background.png'

approvalRequest.charms = [{
    name: 'JEFF TOKENS',
    variableName: "S",
    key: "<wallet vk>",
    formatAs: "number",
    iconPath: "wallet/icon.png"
}]

export { approvalRequest };
