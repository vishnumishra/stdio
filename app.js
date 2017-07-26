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
    countError: "\n\nNumber of file not found or invalid. Please Check the file data\n",
    press: "",
    result: "=========== Result =============",
    askRestart: "Do you want to restart?(y/n)\n"
};

const exit = function(code) {
    rl.close(code);
};

let inputFileData = [],
    resultData;

rl.prompt(true);

console.log(helpText.welcome)

try {

    const printResult = (result) => {
        console.log(helpText.result + eol);
        console.log(result.toString());
        exit(0);
    }

    const reset = () => {
        inputFileData = [];
        console.log(helpText.welcome);
    }

    const getFileCount = () => {
        let count = inputFileData[0] && inputFileData[0].trim();
        if (+count > 0) {
            return count
        }
        throw new Error(helpText.countError);
    }

    const getExt = (data) => {
        return data.trim().split('.')[1] && data.trim().split('.')[1].toLowerCase();
    };

    const getFileExt = (data) => {
        let ext = getExt(data[1]);
        return ext;
    }

    const replaceString = (data) => {
        return data.replace(/[$]/gi, '');
    }

    const getFilterData = (data, fileExt) => {
        let result = [];
        data.forEach((ele, i) => {
            if ((i != 0) && (getExt(ele) !== fileExt) && (ele.trim() !== '') && (ele != eol)) {
                result.push(replaceString(ele));
            }
        });
        return result;
    }

    const getFileName = (data) => {
        let result = [];
        data.forEach((ele, i) => {
            let fileName = ele.trim().split('.')[0];
            if (i === 0) {
                result.push(fileName);
            } else {
                result.push(fileName.charAt(0).toUpperCase() + fileName.substring(1).toLowerCase());
            }
        })
        return result.join("");
    }

    const getResult = () => {
        try {
            var result = {};
            result.totalFile = getFileCount();
            result.fileExt = getFileExt(inputFileData);
            result.getAllFileName = inputFileData.filter((ele) => {
                return (getExt(ele) === result.fileExt);
            });
            result.allFileNameString = getFileName(result.getAllFileName);

            result.restData = getFilterData(inputFileData, result.fileExt);

            return result;

        } catch (e) {
            console.log(e.message);
            askRestart();
        }
    }

    rl.on('SIGINT', () => {
        let result = getResult();
        if(result && +result.totalFile > 0){
        	printResult(`${result.allFileNameString}.${result.fileExt}${eol}${result.restData.join(eol)}`);
        }
    });


    rl.on('line', (input) => {
        if (input && input !== eol && input !== '') {
            inputFileData.push(input);
        };
    });

    const askRestart = () => {
        rl.question(helpText.askRestart, (answer) => {
            if (answer.trim().toLowerCase() === 'y') {
                reset();
            } else {
            	console.log("bye");
                rl.close(1);
            }
        });
    }

} catch (e) {
    console.log(e.message);
    askRestart();
}