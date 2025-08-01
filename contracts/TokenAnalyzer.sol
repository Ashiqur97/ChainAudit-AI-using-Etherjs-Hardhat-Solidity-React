// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

interface IERC20Extended {
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function owner() external view returns (address);
}

contract TokenAnalyzer is Ownable, ReentrancyGuard {
    struct TokenInfo {
        string name;
        string symbol;
        uint8 decimals;
        uint256 totalSupply;
        address owner;
        bool exists;
    }
    
    struct SecurityFlags {
        bool hasOwner;
        bool hasMintFunction;
        bool hasBurnFunction;
        bool hasPauseFunction;
        bool hasBlacklistFunction;
        bool ownershipRenounced;
    }
    
    event TokenAnalyzed(address indexed token, address indexed analyzer, uint256 timestamp);
    
    mapping(address => TokenInfo) private analyzedTokens;
    mapping(address => SecurityFlags) private securityAnalysis;
    
    constructor() {}
    
    function analyzeToken(address tokenAddress) external nonReentrant returns (TokenInfo memory) {
        require(tokenAddress != address(0), "Invalid token address");
        
        TokenInfo memory info;
        
        try IERC20Extended(tokenAddress).name() returns (string memory name) {
            info.name = name;
        } catch {
            info.name = "Unknown";
        }
        
        try IERC20Extended(tokenAddress).symbol() returns (string memory symbol) {
            info.symbol = symbol;
        } catch {
            info.symbol = "UNKNOWN";
        }
        
        try IERC20Extended(tokenAddress).decimals() returns (uint8 decimals) {
            info.decimals = decimals;
        } catch {
            info.decimals = 18;
        }
        
        try IERC20Extended(tokenAddress).totalSupply() returns (uint256 supply) {
            info.totalSupply = supply;
            info.exists = true;
        } catch {
            info.exists = false;
        }
        
        try IERC20Extended(tokenAddress).owner() returns (address owner) {
            info.owner = owner;
        } catch {
            info.owner = address(0);
        }
        
        analyzedTokens[tokenAddress] = info;
        emit TokenAnalyzed(tokenAddress, msg.sender, block.timestamp);
        
        return info;
    }
    
    function getTokenInfo(address tokenAddress) external view returns (TokenInfo memory) {
        return analyzedTokens[tokenAddress];
    }
    
    function checkSecurityFlags(address tokenAddress) external view returns (SecurityFlags memory) {
        return securityAnalysis[tokenAddress];
    }
    
    function setSecurityFlags(
        address tokenAddress,
        bool hasOwner,
        bool hasMintFunction,
        bool hasBurnFunction,
        bool hasPauseFunction,
        bool hasBlacklistFunction,
        bool ownershipRenounced
    ) external onlyOwner {
        securityAnalysis[tokenAddress] = SecurityFlags({
            hasOwner: hasOwner,
            hasMintFunction: hasMintFunction,
            hasBurnFunction: hasBurnFunction,
            hasPauseFunction: hasPauseFunction,
            hasBlacklistFunction: hasBlacklistFunction,
            ownershipRenounced: ownershipRenounced
        });
    }
    
    function calculateRiskScore(address tokenAddress) external view returns (uint256) {
        SecurityFlags memory flags = securityAnalysis[tokenAddress];
        uint256 riskScore = 0;
        
        if (flags.hasOwner && !flags.ownershipRenounced) riskScore += 20;
        if (flags.hasMintFunction) riskScore += 25;
        if (flags.hasPauseFunction) riskScore += 15;
        if (flags.hasBlacklistFunction) riskScore += 30;
        if (!flags.hasBurnFunction) riskScore += 10;
        
        return riskScore;
    }
    
    function batchAnalyze(address[] calldata tokens) external nonReentrant returns (TokenInfo[] memory) {
        require(tokens.length <= 10, "Too many tokens to analyze at once");
        
        TokenInfo[] memory results = new TokenInfo[](tokens.length);
        
        for (uint256 i = 0; i < tokens.length; i++) {
            results[i] = this.analyzeToken(tokens[i]);
        }
        
        return results;
    }
}