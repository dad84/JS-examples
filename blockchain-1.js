const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(timestamp, data) {
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = "0";
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
  }

  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
  }

  createGenesisBlock() {
    return new Block(Date.parse("2022-12-14"), "Genesis block");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

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

let myCoin = new Blockchain();
myCoin.addBlock(new Block(Date.parse("2022-12-14"), { amount: 4 }));
myCoin.addBlock(new Block(Date.parse("2022-12-15"), { amount: 10 }));

console.log(JSON.stringify(myCoin, null, 4));
console.log("Is blockchain valid? " + myCoin.isChainValid());

// In this example, a Block class is defined to represent a single block in the blockchain, 
// and a Blockchain class is defined to represent the entire blockchain. 
// The Blockchain class includes methods for adding new blocks to the chain, mining blocks, 
// and checking the validity of the chain. The example creates a new Blockchain instance called myCoin and adds two blocks to it,
// then prints the blockchain and checks its validity.
