const axios = require('axios')
const chalk = require('chalk');
const config = require('./config/properties.json');

let apiKey = config.apiKey;
let apiUrl = config.apiUrl;

module.exports = wordDisplayService = {};

wordDisplayService.displayDayOfWordDict = async () => {

    try {

        let randomWordRes = await wordDisplayService.fetchDataService(null, null);

        randomWordRes = randomWordRes.data;
        let keyword = randomWordRes.word;
        console.log(chalk.yellow("\tKeyword  : "), keyword);

        if (randomWordRes && randomWordRes.word) {

            let finalRes = await wordDisplayService.displayFullDictOfWord(keyword);

            return true;
        } else {
            throw 'In Random word api, Word is not present';
        }
    } catch (err) {
        throw err;
    }


}

wordDisplayService.displayDefOfWord = async (keyword) => {


    try {
        let defRes = await wordDisplayService.fetchDataService(keyword, 'definitions');
        defRes = defRes.data;
        
        console.log(chalk.yellow("\tDefinitions : "));
        for (const [i, def] of defRes.entries()) {
            console.log(chalk.green(`\t\tDef${i + 1}`), def.text);
        }

        return true;
    } catch (err) {
        throw err;
    }
}

wordDisplayService.displaySynOfWord = async (keyword) => {

    try {
        let synRes = await wordDisplayService.fetchDataService(keyword, 'relatedWords');

        synRes = synRes.data;
        
        let index = synRes.findIndex(resObj => { return resObj.relationshipType === 'synonym' })
        if (index != -1) {
            let synonyms = synRes[index]["words"];
            console.log(chalk.yellow("\tSynonyms : ") + synonyms);
            return true;
        } else {
            console.log(chalk.red("\tNo Synonyms Found "))
            return true;
        }
    } catch (err) {
        throw err;
    }
}

wordDisplayService.displayAntOfWord = async (keyword) => {

    try {
        let antRes = await wordDisplayService.fetchDataService(keyword, 'relatedWords');

        antRes = antRes.data;
        
        let index = antRes.findIndex(resObj => { return resObj.relationshipType === 'antonym' })
        if (index != -1) {
            let antonyms = antRes[index]["words"];
            console.log(chalk.yellow("\tAntonyms : ") + antonyms);
            return true;
        } else {
            console.log(chalk.red("\tNo Antonyms Found "))
            return true;
        }
    } catch (err) {
        throw err;
    }

}

wordDisplayService.displayExmplsOfWord = async (keyword) => {

    try {
        let exmpRes = await wordDisplayService.fetchDataService(keyword, 'examples');

        exmpRes = exmpRes.data;
        
        if (exmpRes && exmpRes.examples && exmpRes.examples.length > 0) {
            let examples = exmpRes["examples"];
            console.log(chalk.yellow("\tExamples : "));
            for (const [i, ex] of examples.entries()) {
                console.log(chalk.green(`\t\tEx${i + 1} : `) + ex.text);
            }
            return true;
        } else {
            console.log(chalk.red("\tNo Examples Found ", keyword))
            return true;
        }
    } catch (err) {
        throw err;
    }

}

wordDisplayService.displayFullDictOfWord = async (keyword) => {

    try {

        let defRes = await wordDisplayService.displayDefOfWord(keyword);
        let synRes = await wordDisplayService.displaySynOfWord(keyword);
        let antRes = await wordDisplayService.displayAntOfWord(keyword);
        let exmpRes = await wordDisplayService.displayExmplsOfWord(keyword);

        return true;

    } catch (err) {
        throw err;
    }


}


wordDisplayService.fetchDataService = async (keyword, type) => {
    let finalUrl = apiUrl + '/word/' + keyword + '/' + type + "?api_key=" + apiKey;
    if (!keyword) {
        finalUrl = apiUrl + '/words/randomWord?api_key=' + apiKey;
    }
    // console.log(finalUrl);
    try {

        let response = await axios.get(finalUrl);
        console.log(response);
        if(response.data) {
            return response ;
        } else {
            throw "Given Word Is Not Found In API"
        }

    } catch (err) {
        console.log(chalk.red("\tWord Is Not Found In The API"));
        process.exit(0);
    }
}


