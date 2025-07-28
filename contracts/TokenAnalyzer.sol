// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

interface IERC20Extended {
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function owner() external view returns (address);
}

contract TokenAnakyzer is Ownable, ReentrancyGuard {
    struct TokenInfo {
        string name;
        string symbol;
        uint8 decimals;
        uint256 totalSupply;
        address owner;
        bool exists;
    }

     constructor(address initialOwner) Ownable(initialOwner) {}
}