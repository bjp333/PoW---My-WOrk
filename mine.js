const db = require('./db');
const Block = require('./models/Block');
const TARGET_DIFFICULTY = BigInt("0x000" + "F".repeat(62));
const Transaction = require('./models/Transactions');
const UTXO = require('./models/UTXO');
const SHA256 = require('crypto-js/sha256');
const {PUBLIC_KEY} = require('./config');
const Transactions = require('./models/Transactions');
const BLOCK_REWARD = 10;


let mining = false;



function startMining() {
    mining = true;
    mine();
}
function stopMining() {
    mining = false;
}
function mine() {
    if(!mining) return;

    const block = new Block();

    // TODO:  add transactions from the mempool
    // coinbaseUTXO is a UTXO that takes in the user and amount
    const coinbaseUTXO = new UTXO(PUBLIC_KEY, BLOCK_REWARD);
    // coinbaseTX is a Transaction that takes in inputs as an array and outputs the coinbase UTXO
    const coinbaseTX = new Transaction([], [coinbaseUTXO]);
    block.addTransactions(coinbaseTX);

    while(BigInt("0x" + block.hash()) >= TARGET_DIFFICULTY) {
        block.nonce++;
    }

    //block.execute();
    
    db.blockchain.addBlock(block);

    console.log(`Just mined block #${db.blockchain.blockHeight()} with a hash of ${block.hash()} at nonce: ${block.nonce}`);

    setTimeout(mine, 2500);
}

mine();
module.exports = {startMining, stopMining};