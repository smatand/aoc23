const fs = require('fs').promises;

const INPUT_FILE = 'input.txt';

function getPoints(cards: string) {
    let cardCopies: { [key: number]: number } = {};
    let sum: number = 0;

    let cardLines = cards.split('\n');
    cardLines.forEach((_, index) => {
        cardCopies[index + 1] = 1;
    });

    for (let index = 0; index < cardLines.length; index++) {
        const card = cardLines[index];
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

        let matches = myNumbers.filter(num => winningNumbers.includes(num)).length;

        for (let i = index + 1; i <= index + matches && i < cardLines.length; i++) {
            cardCopies[i + 1] += cardCopies[index + 1];
        }
    }

    for (let num in cardCopies) {
        sum += cardCopies[num];
    }

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