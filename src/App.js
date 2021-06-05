import { useState } from 'react'
import { ethers } from 'ethers'
import './App.css'

// Import Greeter contract ABI (see https://docs.soliditylang.org/en/v0.8.3/abi-spec.html) and address
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'
const greeterAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3'

export default function App() {
  const [userGreeting, setUserGreeting] = useState('')

  // Connect to user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
  }

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
      <section>
        <div>
          <button onClick={fetchGreeting}>Fetch Greeting</button>
        </div>

        <div>
          <input
            type='text'
            onChange={(e) => setUserGreeting(e.target.value)}
            value={userGreeting}
            placeholder='Greeting'
          />
          <button onClick={setGreeting} disabled={!userGreeting}>
            Set Greeting
          </button>
        </div>
      </section>
    </div>
  )
}
