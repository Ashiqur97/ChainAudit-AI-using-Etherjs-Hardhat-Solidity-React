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


    function addAuthorizedAuditor(address auditor) external onlyOwner {
        authorizedAuditors[auditor] = true;
    }

    function removeAuthorizedAuditor(address auditor) external onlyOwner {
        authorizedAuditors[auditor]= false;
    }

   function submitAuditResult(
        address tokenAddress,
        uint256 riskScore,
        bool isScam,
        bool isHoneypot,
        string calldata ipfsHash
    ) external onlyAuthorizedAuditor nonReentrant {
        require(tokenAddress != address(0), "Invalid token address");
        require(riskScore <= 100, "Risk score must be <= 100");
        
        auditRecords[tokenAddress] = AuditRecord({
            tokenAddress: tokenAddress,
            riskScore: riskScore,
            isScam: isScam,
            isHoneypot: isHoneypot,
            auditTimestamp: block.timestamp,
            auditor: msg.sender,
            ipfsHash: ipfsHash
        });
        
        auditCount[msg.sender]++;
        
        emit AuditCompleted(tokenAddress, msg.sender, riskScore, isScam, block.timestamp);
    }

}