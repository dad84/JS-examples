// Import the required libraries and dependencies
const SHA256 = require("crypto-js/sha256");
const Block = require("./block");

// Create a new blockchain class
class Blockchain {
  // Initialize the blockchain with the Genesis block
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  // Create the Genesis block
  createGenesisBlock() {
    return new Block(0, "01/10/2022", "Genesis block", "0");
  }

  // Get the latest block in the blockchain
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  // Add a new block to the blockchain
  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
    this.chain.push(newBlock);
  }

  // Check if the blockchain is valid
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

// Create a new blockchain instance
const myCoin = new Blockchain();

// Add some blocks to the blockchain
myCoin.addBlock(new Block(1, "12/12/2022", { amount: 4 }));
myCoin.addBlock(new Block(2, "14/12/2022", { amount: 10 }));

// Check if the blockchain is valid
console.log(`Is blockchain valid? ${myCoin.isChainValid()}`);

// Tamper with the second block
myCoin.chain[1].data = { amount: 100 };
myCoin.chain[1].hash = myCoin.chain[1].calculateHash();

// Check if the blockchain is valid again
console.log(`Is blockchain valid? ${myCoin.isChainValid()}`);
