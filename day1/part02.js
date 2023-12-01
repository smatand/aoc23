const fs = require('fs').promises;

const INPUT_FILE = 'input.txt';

const NUMBERS = {
    'one' : '1',
    'two' : '2',
    'three' : '3',
    'four' : '4',
    'five' : '5',
    'six' : '6',
    'seven' : '7',
    'eight' : '8',
    'nine' : '9',
}

const NUMBERS_REVERSED = {
    'eno' : '1',
    'owt' : '2',
    'eerht' : '3',
    'ruof' : '4',
    'evif' : '5',
    'xis' : '6',
    'neves' : '7',
    'thgie' : '8',
    'enin' : '9',
}

function remapWordsToDigits(line) {
    let tmp = '';
    let ret = '';

    loop:
    for (let i = 0; i < line.length; i++) {
        tmp += line[i];

        if (tmp.match(/\d/)) {
            break;
        }

        for (let key in NUMBERS) {
            if (tmp.includes(key)) {
                tmp = tmp.replace(key, NUMBERS[key])
                break loop;
            }
        }
    }

    ret = tmp;
    tmp = '';

    loop:
    for (let i = line.length - 1; i >= 0; i--) {
        tmp += line[i];

        if (tmp.match(/\d/)) {
            break;
        }

        for (let key in NUMBERS_REVERSED) {
            if (tmp.includes(key)) {
                tmp = tmp.replace(key, NUMBERS_REVERSED[key])
                break loop;
            }
        }
    
    }

    ret += tmp;

    return ret;
}

var getNumber = (line) => {
    line = remapWordsToDigits(line); 

    var numbers = line.replace(/\D/g, '');

    var len = numbers.length;
    if (len == 1) {
        var ret = numbers[0] + numbers[0];
    } else {
        var ret = numbers[0] + numbers[len - 1];
    }
    
    console.log(ret);
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