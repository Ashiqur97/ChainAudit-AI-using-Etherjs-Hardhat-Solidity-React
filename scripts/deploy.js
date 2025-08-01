const {ethers} = require('hardhat');

async function main() {
    console.log("Deploying contracts...");

    const  TokenAnalyzer = await ethers.getContractFactory("TokenAnalyzer");
    const tokenAnalyzer = await TokenAnalyzer.deploy();
    await tokenAnalyzer.deployed();
    console.log("TokenAnalyzer deployed to:", tokenAnalyzer.address);

    const AuditRegistery = await ethers.getAccountFactory("AuditRegistery");
    const auditRegistery = await AuditRegistery.deploy();
    await auditRegistery.deployed();
    console.log("AuditRegistery deployed to:", auditRegistery.address);

    const ScamDetector = await ethers.getContractFactory("ScamDetector");
    const scamDetector = await ScamDetector.deploy();
    await scamDetector.deployed();
    console.log("ScamDetector deployed to:", scamDetector.address);

    const fs = require('fs');
    const contractAddresses = {
        TokenAnalyzer: tokenAnalyzer.address,
        AuditRegistery: auditRegistery.address,
        ScamDetector: scamDetector.address,
        network: "localhost"
    };

    fs.writeFileSync(
        './src/contracts/contract-addresses.json',
        JSON.stringify(contractAddresses, null, 2)
    );
    console.log("Contract addresses saved to contract-addresses.json");
}

main() 
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });