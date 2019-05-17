const inquirer = require('inquirer')

const playWordGame = () => {
    return new Promise((resolve, reject) => {
        console.log('play word game is under processing')
        resolve(true);
    })
}



module.exports.playWordGame = playWordGame;