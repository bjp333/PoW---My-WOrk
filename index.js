
const jayson = require('jayson');
const {startMining, stopMining} = require('./mine');
const {PORT} = require('./config');
const SHA256 = require('crypto-js/sha256');
const {utxos} = require('./db');

const server = new jayson.Server({
    startMining: function(_, callback) {
        callback(null, 'success!');
        startMining();  
      
    },
    stopMining: function(_, callback) {
        callback(null, 'success!');
        stopMining();  
        
    },
    getBalance: function([address], callback) {
        console.log(utxos.length);
        const ourUTXOs = utxos.filter(x => {
            return x.owner === address && !x.spent;
        });
        const sum = ourUTXOs.reduce((p,c) => p + c.amount, 0);
        callback(null, sum);   
    }
  });
  
  server.http().listen(PORT);





