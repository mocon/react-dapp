// Require the Hardhat Runtime Environment explicitly
const hre = require('hardhat')

async function main() {
  // Greeter smart contract
  const Greeter = await hre.ethers.getContractFactory('Greeter')
  const greeter = await Greeter.deploy('Hello, Hardhat!')
  await greeter.deployed()
  console.log(`🏀 Greeter deployed to ${greeter.address}`)

  // Token contract
  const Token = await hre.ethers.getContractFactory('Token')
  const token = await Token.deploy()
  await token.deployed()
  console.log(`🏀 Token deployed to ${token.address}`)

  // ERC20 token contract
  const Erc20Token = await hre.ethers.getContractFactory('Erc20Token')
  const erc20Token = await Erc20Token.deploy('MylesCoin', 'MYLES')
  await erc20Token.deployed()
  console.log(`🏀 ERC20 token deplayed to ${erc20Token.address}`)
}

// Use async/await and handle errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
