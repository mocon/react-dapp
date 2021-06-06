//SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

// See https://docs.openzeppelin.com/contracts/4.x
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MylesToken is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 42000000 * (10**18));
    }
}
