const inquirer = require('inquirer')
const chalk = require('chalk');

const playWordGame = async () => {

    try {
        let randomWordRes = await wordDisplayService.fetchDataService(null, null);

        randomWordRes = randomWordRes.data;

        let keyword = randomWordRes.word;
        console.log(chalk.yellow("\tKeyword  : "), keyword);
        let defRes = await wordDisplayService.displayDefOfWord(keyword)

        let relateRes = await wordDisplayService.fetchDataService(keyword, 'relatedWords');

        relateRes = relateRes.data;

        let index = relateRes.findIndex(resObj => { return resObj.relationshipType === 'synonym' })
        let index2 = relateRes.findIndex(resObj => { return resObj.relationshipType === 'antonym' })

        let synonyms = [], antonym = [];

        if(index2 !== -1) {
            antonyms = relateRes[index2]["words"];
        }
        if (index !== -1) {
            synonyms = relateRes[index]["words"];
            console.log(chalk.yellow("\tSynonym : ") + synonyms[0]);
        } else {
            console.log(chalk.red("\tNo Synonyms Found "))

            if (index2 != -1) {
                console.log(chalk.yellow("\tAntonyms : ") + antonyms[0]);
                antonyms = antonyms.slice(1);
            }
        }

        let isQuit = false;

        synonyms = synonyms.slice(1)

        let isFound = await isWordFound(synonyms, keyword);

        choiceValue = "";
        if (isFound) {
            return true;
        } else {

            do {

                console.log(chalk.yellow('\tPlease Select Your Choice Below '))
                console.log(chalk.blue('\t1.Try Again\n\t2.Hint\n\t3.Quit\n\t'))
                let questions2 = [
                    { type: "input", name: "choice", message: chalk.yellow(`\tEnter Your Choice Here`) }
                ]

                let answers2 = await inquirer.prompt(questions2);

                choiceValue = answers2["choice"];

                switch (choiceValue) {
                    case "1": {
                        isFound = await isWordFound(synonyms, keyword);
                        if (isFound) {
                            choiceValue = '3';
                        }
                        break;
                    }
                    case "2": {

                        let num = Math.ceil((Math.random() * 4));

                        let defRes = await wordDisplayService.fetchDataService(keyword, 'definitions');
                        defRes = defRes.data;
                        if (num === 1) {
                            let str = keyword;
                            let hintKeyword = str.split('').sort(function () { return 0.5 - Math.random() }).join('');
                            console.log(chalk.green("\t Hint : "), hintKeyword);
                            break;
                        } else if (num === 2) {
                            console.log(chalk.green("\t Hint : "), defRes[0].text);

                        } else if (num === 3) {
                            if (synonyms) {
                                console.log(chalk.green("\t Hint : "), synonyms[0]);
                            } else {

                                console.log(chalk.green("\t Hint : "), defRes[0].text);
                            }
                        } else {
                            if (index2 !== -1) {

                                console.log(chalk.green("\t Hint : "), antonyms[0]);
                            } else {

                                console.log(chalk.green("\t Hint : "), defRes[0].text);
                            }
                        }
                        break;
                    }
                    case "3": {
                        choiceValue = '3';
                        break;
                    } default: {
                        console.log(chalk.red("Invalid Operation is given"));
                    }
                }

            } while (choiceValue != '3');

        }


    } catch (err) {

        throw err;
    }

}

const isWordFound = async (synonyms, keyword) => {

    let questions = [
        { type: "input", name: "word", message: chalk.yellow(`\tEnter The Word Please`) }
    ]
    let answers = await inquirer.prompt(questions);
    let word = answers['word'];

    if (word === keyword || synonyms.includes(word)) {
        console.log(chalk.green("\tCorrect Answer "));
        return true;
    } else {
        console.log(chalk.red("\tSorry Wrong Answer "));
        return false;
    }
}

module.exports.playWordGame = playWordGame;