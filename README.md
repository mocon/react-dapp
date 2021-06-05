# React dApp

Uses [ethers](https://github.com/ethers-io/ethers.js) and [Hardhat](https://hardhat.org). This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Hardhat commands

See https://hardhat.org/getting-started.

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
yarn start # Runs the app in the development mode on http://localhost:3000
yarn test # Launches the test runner in the interactive watch mode
yarn build # Builds the app for production to the `build` folder
```
