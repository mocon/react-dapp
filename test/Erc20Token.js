/* global ethers */
const { expect } = require('chai')

describe('Erc20Token', function () {
  it('Deploy should assign total supply of tokens to owner', async () => {
    const [owner] = await ethers.getSigners()
    const Erc20Token = await ethers.getContractFactory('Erc20Token')
    const hardhatToken = await Erc20Token.deploy('MylesCoin', 'MYLES')
    const ownerBalance = await hardhatToken.balanceOf(owner.address)
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance)
  })

  it('Should transfer tokens between accounts', async () => {
    const [owner, addr1, addr2] = await ethers.getSigners()
    const Erc20Token = await ethers.getContractFactory('Erc20Token')
    const hardhatToken = await Erc20Token.deploy('MylesCoin', 'MYLES')

    // Transfer 50 tokens from owner to addr1
    await hardhatToken.transfer(addr1.address, 50)
    expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50)

    // Transfer 50 tokens from addr1 to addr2
    await hardhatToken.connect(addr1).transfer(addr2.address, 50)
    expect(await hardhatToken.balanceOf(addr2.address)).to.equal(50)
  })
})
