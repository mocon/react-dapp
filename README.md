# React dApp

Uses [ethers](https://github.com/ethers-io/ethers.js) and [Hardhat](https://hardhat.org). This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running locally

Install dependencies with `yarn`, then open three terminal panes in VS Code. In the first, set up your Hardhat environment with `npx hardhat`, then start the JSON-RPC server with `npx hardhat node`. Using the [MetaMask Chrome extension](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en), import a new account inside MetaMask using the private key for Account #0 from the terminal output. This is the account which deployed the contracts. To add your MYLS tokens, click Add Token and paste the deployed token address from the terminal output.

In the second terminal, compile the smart contracts with `npx hardhat compile`, then deploy them to localhost with `npx hardhat run scripts/deploy.js --network localhost`. Copy the deployed contract addresses to lines 9 & 10 in `/src/App.js`.

In the third terminal, run the React frontend with `yarn start`. You should be able to fetch the smart contract greeting without the need for gas fees, and set it after confirming the transaction and gas fees using the MetaMask popup. To send MYLS tokens to another account, import Account #1 or another one into MetaMask, then copy its address.

## Tests

```shell
npx hardhat test # Test smart contracts
yarn test # Test React frontend
```

## Hardhat commands

```shell
# Set up Hardhat environment
npx hardhat

# Prints the list of accounts
npx hardhat accounts

# Compiles the entire project, building all artifacts
npx hardhat compile

# Deploy smart contracts to local network
npx hardhat run scripts/deploy.js --network localhost

# Deploy smart contracts to Ropsten testnet
npx hardhat run scripts/deploy.js --network ropsten

# Start a JSON-RPC server on top of Hardhat Network
npx hardhat node

# Run mocha tests
npx hardhat test

# Hardhat help
npx hardhat help
```

## React commands

```shell
# Runs the app in the development mode on http://localhost:3000
yarn start

# Launches the test runner in the interactive watch mode
yarn test

# Builds the app for production to the `build` folder
yarn build
```
