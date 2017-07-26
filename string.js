`use strict`

const readline = require('readline');

const eol = require('os').EOL;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
});

const helpText = {
    welcome: "Please enter the Input and press the Ctrl+C to print the result and Ctrl+D to exit.",
    result: "=========== Result =============",
    askRestart: "Do you want to restart?(y/n)\n"
};

const exit = function(code) {
    rl.close(code);
};

let inputData = [];

rl.prompt(true);

console.log(helpText.welcome)

const printResult = (result) => {
    console.log(result);
    exit(0);
}

String.prototype.XyloHack = (n)=>{
    console.log(this, n);
    return (n/2 === 0)?(this.toUpperCase()):(this.toLowerCase());
};

rl.on('SIGINT', () => {
    let data = inputData.splice(1);
    data.forEach((ele)=>{
        console.log("ele==>>", ele);
        printResult(eval(ele));
    })

});


rl.on('line', (input) => {
    if (input && input !== eol && input !== '') {
        inputData.push(input);
    };
});