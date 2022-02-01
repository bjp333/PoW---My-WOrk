const {utxos} = require('../db');
// For each transaction we're inputting the UTXOS

class Transactions {
    constructor(inputs, outputs) {
        // inputs and outputs indicate arrays
        this.inputs = inputs;
        this.outputs = outputs;
    }
    /*
        When you execute a transaction, for every input, change the UTXO to spent
        For every output, push the output to our UTXOs array in our database.
    */ 
    execute () {
        //forEach executes the callback function once for each array element
        this.inputs.forEach((input) => {
            input.spent = true;

        });
        this.outputs.forEach((output) => {
            utxos.push(output);
        });
    }
}

module.exports = Transactions;