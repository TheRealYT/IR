const {existsSync} = require('node:fs');
const path = require('node:path');
const fs = require('node:fs/promises');

const HA = 4608;
const WORD_END = HA + 346;

const delimiters = [
    ' ',
    '\n',
    '።',
    '፡',
    '፤',
    '፣',
].map(v => v.charCodeAt(0));

const spacedWords = require('./../words.json');

let words = 0;

function wordProcessor() {
    const chars = [];
    let space = false;
    const charsNext = [];

    const am = [];

    return {
        async process(char) {
            if (am.length === 0 && char === 225) {
                am.push(char);
                return;
            } else if (am.length > 0 && am.length < 3) {
                am.push(char);

                if (am.length === 3) {
                    char = Buffer.from(am).toString().charCodeAt(0);
                    am.splice(0);
                } else return;
            }

            if (isLetter(char)) {
                if (space) {
                    const word = chars.join('');
                    charsNext.push(String.fromCharCode(char));

                    for (const nextWord of spacedWords[word]) {
                        if (nextWord.startsWith(charsNext.join(''))) {
                            return;
                        }
                    }

                    await addWord(word);
                    space = false;
                    chars.splice(0);
                    chars.push(...charsNext);
                    charsNext.splice(0);

                    return;
                }

                chars.push(String.fromCharCode(char));
            } else if (chars.length > 0 && delimiters.includes(char)) {
                if (char === 32) {
                    // handle compound word
                    if (space) {
                        chars.push(' ', ...charsNext);
                        space = false;
                        charsNext.splice(0);
                    } else {
                        const word = chars.join('');

                        if (word in spacedWords) {
                            space = true;
                            return;
                        }
                    }
                }

                const word = chars.join('');
                await addWord(word);
                chars.splice(0);
            } else if (space) {
                const word = chars.join('');
                await addWord(word);
                space = false;
                chars.splice(0);
            }
        },
    };
}

function isLetter(ch) {
    return ch >= HA && ch <= WORD_END;
}

const tmpPath = path.join(__dirname, '..', 'tmp');

async function addWord(word) {
    if (!existsSync(tmpPath))
        await fs.mkdir(tmpPath);

    const wordPath = path.join(tmpPath, `${word}.txt`);

    let freq = 1;
    if (existsSync(wordPath))
        freq += +(await fs.readFile(wordPath)).toString();
    await fs.writeFile(wordPath, freq.toString());

    words++;
}

function getWordsCount() {
    return words;
}

module.exports = {wordProcessor, getWordsCount};