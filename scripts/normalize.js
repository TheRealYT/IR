const path = require('node:path');
const fs = require('node:fs/promises');
const ABBR_PATH = path.join(__dirname, '..', 'am-abbr.json');

async function normalize(termLoc) {
    const abbrList = JSON.parse((await fs.readFile(ABBR_PATH)).toString());
    Object.keys(termLoc).forEach((word) => {
        const normalWord = normalizeAbbr(normalizeChar(word), abbrList);

        if (normalWord === word) return;

        if (normalWord in termLoc) {
            for (const doc in termLoc[word]) {
                let f = termLoc[word][doc];

                if (doc in termLoc[normalWord])
                    f += termLoc[normalWord][doc];

                termLoc[normalWord][doc] = f;
            }
        } else {
            termLoc[normalWord] = termLoc[word];
        }

        delete termLoc[word];
    });
    // TODO: save to file
}

function normalizeAbbr(word, abbrList) {
    if (word in abbrList)
        return abbrList[word];

    return word;
}

function normalizeChar(word) {
    return word
        .replace(/[ሃኅኃሐሓኻ]/g, 'ሀ')
        .replace(/[ሑኁዅ]/g, 'ሁ')
        .replace(/[ኂሒኺ]/g, 'ሂ')
        .replace(/[ኌሔዄ]/g, 'ሄ')
        .replace(/[ሕኅ]/g, 'ህ')
        .replace(/[ኆሖኾ]/g, 'ሆ')
        .replace(/ሠ/g, 'ሰ')
        .replace(/ሡ/g, 'ሱ')
        .replace(/ሢ/g, 'ሲ')
        .replace(/ሣ/g, 'ሳ')
        .replace(/ሤ/g, 'ሴ')
        .replace(/ሥ/g, 'ስ')
        .replace(/ሦ/g, 'ሶ')
        .replace(/[ዓኣዐ]/g, 'አ')
        .replace(/ዑ/g, 'ኡ')
        .replace(/ዒ/g, 'ኢ')
        .replace(/ዔ/g, 'ኤ')
        .replace(/ዕ/g, 'እ')
        .replace(/ዖ/g, 'ኦ')
        .replace(/ጸ/g, 'ፀ')
        .replace(/ጹ/g, 'ፁ')
        .replace(/ጺ/g, 'ፂ')
        .replace(/ጻ/g, 'ፃ')
        .replace(/ጼ/g, 'ፄ')
        .replace(/ጽ/g, 'ፅ')
        .replace(/ጾ/g, 'ፆ')
        .replace(/(ሉ[ዋአ])/g, 'ሏ')
        .replace(/(ሙ[ዋአ])/g, 'ሟ')
        .replace(/(ቱ[ዋአ])/g, 'ቷ')
        .replace(/(ሩ[ዋአ])/g, 'ሯ')
        .replace(/(ሱ[ዋአ])/g, 'ሷ')
        .replace(/(ሹ[ዋአ])/g, 'ሿ')
        .replace(/(ቁ[ዋአ])/g, 'ቋ')
        .replace(/(ቡ[ዋአ])/g, 'ቧ')
        .replace(/(ቹ[ዋአ])/g, 'ቿ')
        .replace(/(ሁ[ዋአ])/g, 'ኋ')
        .replace(/(ኑ[ዋአ])/g, 'ኗ')
        .replace(/(ኙ[ዋአ])/g, 'ኟ')
        .replace(/(ኩ[ዋአ])/g, 'ኳ')
        .replace(/(ዙ[ዋአ])/g, 'ዟ')
        .replace(/(ጉ[ዋአ])/g, 'ጓ')
        .replace(/(ደ[ዋአ])/g, 'ዷ')
        .replace(/(ጡ[ዋአ])/g, 'ጧ')
        .replace(/(ጩ[ዋአ])/g, 'ጯ')
        .replace(/(ጹ[ዋአ])/g, 'ጿ')
        .replace(/(ፉ[ዋአ])/g, 'ፏ');
}

module.exports = {normalize};