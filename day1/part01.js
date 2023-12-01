const fs = require('fs').promises;

const INPUT_FILE = 'input.txt';

var getNumber = (line) => {
    var numbers = line.replace(/\D/g, '');

    var len = numbers.length;
    if (len == 1) {
        var ret = numbers[0] + numbers[0];
    } else {
        var ret = numbers[0] + numbers[len - 1];
    }
    
    return Number(ret);
}

async function getSum(file = INPUT_FILE) {
    let data;

    try {
        data = await fs.readFile(file, 'utf8');
    } catch (err) {
        console.error(err);
        return;
    }

    const nums = data.split('\n').map(line => getNumber(line));

    let sum = 0;
    nums.forEach(num => sum += num);

    return sum;
}

getSum().then(sum => console.log(sum));