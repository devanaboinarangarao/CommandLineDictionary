
// custom modules
const wordDisplayService = require('./word-display-service');
const wordPlayService = require('./word-play-service');

const start = async () => {
    
    try {
        const args = process.argv.slice(2);
    
        console.log(args);
    
        if (args[0] === './dict') {
            if (args.length === 1) {
                return await wordDisplayService.displayDayOfWordDict();
            } else {
                let operation = args[1];
                let keyword = args[2];
    
                switch (operation) {
                    case 'def': {
                        if (keyword) {
                            return await wordDisplayService.displayDefOfWord(keyword);
                            break;
                        } else {
                            throw "Word Must be Given";
                        }
                    }
                    case 'syn': {
                        if (keyword) {
                            return await wordDisplayService.displaySynOfWord(keyword);
                            break;
                        } else {
                            throw "Word Must be Given";
                        }
    
                    }
                    case 'ant': {
                        if (keyword) {
                            return await wordDisplayService.dislayAntOfWord(keyword);
                            break;
                        } else {
                            throw "Word Must be Given";
                        }
    
                    }
                    case 'ex': {
                        if (keyword) {
                            return await wordDisplayService.displayExmplsOfWord(keyword);
                            break;
                        } else {
                            throw "Word Must be Given";
                        }
    
                    }
                    case 'dict': {
                        if (keyword) {
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
    .then(message => console.log("******** Thank You User Hope To See You Again ********"))
    .catch(err => console.log(err))


