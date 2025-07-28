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

     struct SecurityFlags {
        bool hasOwner;
        bool hasMintFunction;
        bool hasBurnFunction;
        bool hasPuseFunction;
        bool hasBlacklistFunction;
        bool ownershipRenounced;
     }

     event TokenAnalyzed(address indexed token, address indexed analyzer, uint256 timestamp);
    
    mapping(address => TokenInfo) private analyzedTokens;
    mapping(address => SecurityFlags) private securityAnalysis;
}