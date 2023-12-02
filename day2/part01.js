const fs = require('fs').promises;

const INPUT_FILE = 'input.txt';

const MAX = {
    'red' : 12,
    'green' : 13,
    'blue' : 14
}


async function parseGames(file = INPUT_FILE) {
    let sum = 0;
    let data;

    try {
        data = await fs.readFile(file, 'utf8');
    } catch (err) {
        console.error(err);
        return;
    }

    data.split('\n').map(line => {
        let blue_max = Math.max(...(line.match(/\d+ blue/g) || []).map(cur => Number(cur.replace(/\D/g, ''))));
        let red_max = Math.max(...(line.match(/\d+ red/g) || []).map(cur => Number(cur.replace(/\D/g, ''))));
        let green_max = Math.max(...(line.match(/\d+ green/g) || []).map(cur => Number(cur.replace(/\D/g, ''))));

        if (blue_max <= MAX['blue'] && red_max <= MAX['red'] && green_max <= MAX['green']) {
            sum += Number(line.match(/Game \d+:/).toString().replace(/\D/g, ''));
        }
    })

    return sum;
}

parseGames().then(sum => console.log(sum))