const hre = require('hardhat');

async function main() {
  // We get the contract to deploy
  const Greeter = await hre.ethers.getContractFactory('Greeter');
  const greeter = await Greeter.deploy('Hello Hardhat!');
  
  await greeter.deployed();
  console.log('Greeter deployed to:', greeter.address);
  
  await greeter.deployTransaction.wait(5);

  await hre.run(`verify:verify`, {
    address: greeter.address,
    constructorArguments: ['Hello Hardhat!']
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
