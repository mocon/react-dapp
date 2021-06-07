import { useState } from 'react'
import { ethers } from 'ethers'

// Import contract/token ABIs and addresses
// see https://docs.soliditylang.org/en/v0.8.3/abi-spec.html
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'
import Token from './artifacts/contracts/Token.sol/Token.json'

const greeterAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
const tokenAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'

export default function App() {
  const [userGreeting, setUserGreeting] = useState('')
  const [userAccount, setUserAccount] = useState('')
  const [amount, setAmount] = useState(0)

  // Connect to user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
  }

  // Get user's balance
  async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider)
      const balance = await contract.balanceOf(account)
      console.log('🏀 balance =>', balance.toString())
    }
  }

  // Send coins to another user
  async function sendCoins() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer)
      const transaction = await contract.transfer(userAccount, amount)
      await transaction.wait()
      console.log(
        '🏀 transaction =>',
        transaction,
        `${amount} coins successfully sent to ${userAccount}`,
      )
    }
  }

  // Fetch current greeting from smart contract
  async function fetchGreeting() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)

      try {
        const data = await contract.greet()
        console.log('🏀 data =>', data)
      } catch (err) {
        console.log('🏀 error =>', err)
      }
    }
  }

  // Update the greeting using the smart contract
  async function setGreeting() {
    if (!userGreeting) return // Do not overwrite unless there is a new greeting

    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
      const transaction = await contract.setGreeting(userGreeting)
      setUserGreeting('')
      await transaction.wait()
      fetchGreeting()
    }
  }

  return (
    <div className='App'>
      {/* Fetch greeting */}
      <section>
        <button onClick={fetchGreeting}>Fetch Greeting</button>
      </section>

      <hr />

      {/* Update greeting */}
      <section>
        <input
          type='text'
          onChange={(e) => setUserGreeting(e.target.value)}
          value={userGreeting}
          placeholder='Greeting'
        />
        <button onClick={setGreeting} disabled={!userGreeting}>
          Set Greeting
        </button>
      </section>

      <hr />

      {/* Get balance */}
      <section>
        <button onClick={getBalance}>Get Balance</button>
      </section>

      <hr />

      {/* Send coins to another user */}
      <section>
        <input
          type='text'
          onChange={(e) => setUserAccount(e.target.value)}
          value={userAccount}
          placeholder='0x...'
        />
        <input
          type='number'
          onChange={(e) => setAmount(parseInt(e.target.value))}
          placeholder='Amount'
        />
        <button onClick={sendCoins} disabled={!userAccount || !amount}>
          Send Myloshis
        </button>
      </section>
    </div>
  )
}
