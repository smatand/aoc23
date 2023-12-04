const fs = require('fs').promises;

const INPUT_FILE = 'input.txt';

function getPoints(cards: string) {
    let sum: number = 0;
    cards.split('\n').forEach((card) => {
        const [_, cardNumbers] = card.split(':');
        const [winningNumbersStr, myNumbersStr] = cardNumbers.split('|');

        let winningNumbers = winningNumbersStr.split(' ')
            .map((num) => {
                return Number(num.match(/\d+/g));
            })
            .filter((num) => num)

        let myNumbers = myNumbersStr.split(' ')
            .map((num) => {
                return Number(num.match(/\d+/g));
            })
            .filter((num) => num)

        let points = 0;
        myNumbers.forEach((num) => {
            if (winningNumbers.includes(num)) {
                if (points) {
                    points *= 2;
                } else {
                    points = 1;
                }
            }
        });
        
        sum += points;
    })

    return sum;
}

async function processInput(file = INPUT_FILE) {
    let data;

    try {
        data = await fs.readFile(file, 'utf8');
    } catch (err) {
        console.error(err);
    }

    console.log(getPoints(data));
}

processInput();