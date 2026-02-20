const hre = require("hardhat");

async function main() {
  console.log("Deploying ChainRaffle contract...");

  const ChainRaffle = await hre.ethers.getContractFactory("ChainRaffle");
  const chainRaffle = await ChainRaffle.deploy();

  await chainRaffle.waitForDeployment();

  const address = await chainRaffle.getAddress();
  console.log(`ChainRaffle deployed to: ${address}`);
  
  // Wait for a few block confirmations
  console.log("Waiting for block confirmations...");
  await chainRaffle.deploymentTransaction().wait(5);
  
  console.log("Deployment completed!");
  console.log("\nAdd this to your .env.local file:");
  console.log(`NEXT_PUBLIC_CONTRACT_ADDRESS_${hre.network.name.toUpperCase()}=${address}`);
  
  // Verify on Etherscan if not on local network
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("\nVerifying contract on Etherscan...");
    try {
      await hre.run("verify:verify", {
        address: address,
        constructorArguments: [],
      });
      console.log("Contract verified!");
    } catch (error) {
      console.log("Verification failed:", error.message);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
