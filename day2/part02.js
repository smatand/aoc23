const fs = require('fs').promises;

const INPUT_FILE = 'input.txt';

async function parseGames(file = INPUT_FILE) {
    let power = 0;
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

        power += blue_max * red_max * green_max;
    })

    return power;
}

parseGames('input.txt').then(power => console.log(power))