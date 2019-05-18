
// custom modules
const wordDisplayService = require('./word-display-service');
const wordPlayService = require('./word-play-service');
const chalk = require('chalk');

const start = async () => {
    console.log(chalk.blue("******** Hello, User Welcome to CommandLineDictionary  ********"))
    try {
        const args = process.argv.slice(2);
    
        // console.log(args);
    
        if (args[0] === './dict') {
            if (args.length === 1) {
                return await wordDisplayService.displayDayOfWordDict();
            } else {
                let operation = args[1];
                let keyword = args[2];
                
                switch (operation) {
                    case 'def': {
                        if (keyword) {
                            console.log(chalk.yellow("\tKeyword  : "), keyword);
                            return await wordDisplayService.displayDefOfWord(keyword);
                            break;
                        } else {
                            throw "Word Must be Given";
                        }
                    }
                    case 'syn': {
                        if (keyword) {
                            console.log(chalk.yellow("\tKeyword : "), keyword);
                            return await wordDisplayService.displaySynOfWord(keyword);
                            break;
                        } else {
                            throw "Word Must be Given";
                        }
    
                    }
                    case 'ant': {
                        if (keyword) {
                            console.log(chalk.yellow("\tKeyword   : "), keyword);
                            return await wordDisplayService.displayAntOfWord(keyword);
                            break;
                        } else {
                            throw "Word Must be Given";
                        }
    
                    }
                    case 'ex': {
                        if (keyword) {
                            console.log(chalk.yellow("\tKeyword  : "), keyword);
                            return await wordDisplayService.displayExmplsOfWord(keyword);
                            break;
                        } else {
                            throw "Word Must be Given";
                        }
    
                    }
                    case 'dict': {
                        if (keyword) {
                            console.log(chalk.yellow("\tKeyword  : "), keyword);
                            return await wordDisplayService.displayFullDictOfWord(keyword);
                            break;
                        } else {
                            throw "Word Must be Given";
                        }
                    }
                    case 'play': {
                        if(!keyword) {
                           
                            return await wordPlayService.playWordGame();
                            break;
                        } else {
                            throw "Invalid Third Argument Given";
                        }
                    }
                    default: {
                        keyword = args[1];
                        if(!args[2]) {
                            console.log(chalk.yellow("\tKeyword  : "), keyword);
                            return await wordDisplayService.displayFullDictOfWord(keyword);
                        } else {
                            throw "Invalid Third Argument Given";
                        }
                    }
                }
            }
        } else {
            throw "Invalid Command Line Argument is given";
        }

    } catch (err) {
        throw err;
    }

}

// starting of word dictionary
start()
    .then(message => console.log(chalk.blue("******** Thank You User, Hope To See You Again ********")))
    .catch(err => console.log(chalk.red("Error is ::::::: "+err)));


