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
        // randomWordRes = {
        //     "id": "prime",
        //     "word": "prime"
        // }
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
        // defRes = [
        //     {
        //         "text": "First in excellence, quality, or value. See Usage Note at perfect."
        //     },
        //     {
        //         "text": "First in degree or rank; chief. See Synonyms at chief."
        //     },
        //     {
        //         "text": "First or early in time, order, or sequence; original."
        //     },
        //     {
        //         "text": "Of the highest U.S. government grade of meat."
        //     },
        //     {
        //         "text": "Mathematics   Of, relating to, or being a prime number."
        //     },
        //     {
        //         "text": "The earliest hours of the day; dawn."
        //     },
        //     {
        //         "text": "The first season of the year; spring."
        //     },
        //     {
        //         "text": "The age of ideal physical perfection and intellectual vigor."
        //     },
        //     {
        //         "text": "The period or phase of ideal or peak condition. See Synonyms at bloom1."
        //     },
        //     {
        //         "text": "The first position of thrust and parry in fencing."
        //     }
        // ];

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
        // synRes = [
        //     {
        //         "relationshipType": "synonym",
        //         "words": [
        //             "original",
        //             "primeval",
        //             "primitive",
        //             "primary",
        //             "early",
        //             "blooming",
        //             "lecherous",
        //             "lustful",
        //             "lewd",
        //             "youth"
        //         ]
        //     }
        // ]

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
        // antRes = [
        //     {
        //         "relationshipType": "antonym",
        //         "words": [
        //             "stop",
        //             "originate",
        //             "invent",
        //             "dislocate",
        //             "empty",
        //             "sally",
        //             "lead"
        //         ]
        //     },
        //     {
        //         "relationshipType": "synonym",
        //         "words": [
        //             "begin",
        //             "startle",
        //             "alarm",
        //             "rouse",
        //             "originate",
        //             "invent",
        //             "dislocate",
        //             "empty",
        //             "sally",
        //             "lead"
        //         ]
        //     }
        // ]


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
        // exmpRes =
        //     {
        //         "examples": [
        //             {
        //                 "text": "'Buy'n ony nigs, Kirke?' said the trader, inserting his arm in mine, and leading me away from the shanty: 'I've got a prime lot -- _prime_;' and he smacked his lips together at the last word, in the manner that is common to professional liquor tasters."
        //             },
        //             {
        //                 "text": "At that time, he added the title prime minister to his previous position as president."
        //             },
        //             {
        //                 "text": "PS - What's the betting he defies tradition and refuses to give up the title prime minister?"
        //             },
        //             {
        //                 "text": "The origin of the term prime minister and the question to whom the designation should first be applied have long been issues of scholarly and political debate."
        //             },
        //             {
        //                 "text": "Overpaying for washed up skill players 5 years past their prime is his specialty."
        //             }
        //         ]
        //     }
        if (exmpRes && exmpRes.examples && exmpRes.examples.length > 0) {
            let examples = exmpRes["examples"];
            console.log(chalk.yellow("\tExamples : "));
            for (const [i, ex] of examples.entries()) {
                console.log(chalk.green(`\t\tEx${i + 1} : `) + ex.text);
            }
            return true;
        } else {
            console.log(chalk.red("No Examples Found ", keyword))
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
        return response;

    } catch (err) {
        throw err;
    }
}


