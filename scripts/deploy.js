const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying contracts...");

  // Deploy TokenAnalyzer
  const TokenAnalyzer = await ethers.getContractFactory("TokenAnalyzer");
  const tokenAnalyzer = await TokenAnalyzer.deploy();
  await tokenAnalyzer.deployed();
  console.log("TokenAnalyzer deployed to:", tokenAnalyzer.address);

  // Deploy AuditRegistry
  const AuditRegistry = await ethers.getContractFactory("AuditRegistry");
  const auditRegistry = await AuditRegistry.deploy();
  await auditRegistry.deployed();
  console.log("AuditRegistry deployed to:", auditRegistry.address);

  // Deploy ScamDetector
  const ScamDetector = await ethers.getContractFactory("ScamDetector");
  const scamDetector = await ScamDetector.deploy();
  await scamDetector.deployed();
  console.log("ScamDetector deployed to:", scamDetector.address);

  // Save contract addresses
  const fs = require('fs');
  const contractAddresses = {
    TokenAnalyzer: tokenAnalyzer.address,
    AuditRegistry: auditRegistry.address,
    ScamDetector: scamDetector.address,
    network: "localhost"
  };

  fs.writeFileSync(
    './src/contracts/addresses.json',
    JSON.stringify(contractAddresses, null, 2)
  );

  console.log("Contract addresses saved to src/contracts/addresses.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });