// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract AuditRegistry is Ownable, ReentrancyGuard {
    struct AuditRecord {
        address tokenAddress;
        uint256 riskScore;
        bool isScam;
        bool isHoneypot;
        uint256 auditTimestamp;
        address auditor;
        string ipfsHash; // Store detailed audit data on IPFS
    }
    
    struct TokenMetrics {
        uint256 totalTransactions;
        uint256 uniqueHolders;
        uint256 liquidityUSD;
        bool liquidityLocked;
        uint256 lastUpdated;
    }

    mapping (address => AuditRecord) public auditRecords;
    mapping (address => TokenMetrics) public tokenMetrics;
    mapping (address => bool) public authorizedAuditors;
    mapping (address => uint256) public auditCount;

   event AuditCompleted(
    address indexed token,
    address indexed auditor,
    uint256 riskScore,
    bool isScam,
    uint256 timestamp
    );

    event TokenMetricsUpdated(
        address indexed token,
        uint256 transactions,
        uint256 holders,
        uint256 liquidity
    );

 modifier onlyAuthorizedAuditor() {
    require(authorizedAuditors[msg.sender] || msg.sender == owner(), "Not authorized auditor");
    _;
   
    }

    constructor() Ownable(msg.sender) {
    authorizedAuditors[msg.sender] = true;
    
    }

    


}