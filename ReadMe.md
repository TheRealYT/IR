### Amharic Tokenizer

The Amharic tokenizer is a tool designed to segment
Amharic text into tokens, which are smaller, meaningful units such
as words or phrases. Unlike more complex AI-based text processing tools,
this tokenizer operates based on simpler, rule-based algorithms specifically
to handle the unique characteristics of the Amharic language.

### How to use (steps)

1. Run tokenizer (make sure to remove `token.json` directory if tokenization is repeated on the same documents since it
   appends(counts) the result from there)
   or pass different arguments like these
    - By default, the tokenizer uses `token.json` as an output
    - ```node tokenize.js data\doc.txt``` tokenize one file to `token.json` file
    - ```node tokenize.js data\doc.txt words.json``` save tokens to `words.json` file instead of `token.json`
    - ```node tokenize.js data words.json``` tokenize all files inside data folder to `words.json` file
2. Next any of the following codes can be executed independently
    - The following commands can accept an argument to override the default `token.json` file like
      this `node file.js other_token_file.json`
    - ```node freq.js``` calculate frequency of words
    - ```node rank.js``` calculate rank of words based on frequency
    - ```node freq_rank.js``` calculate the product of rank and frequency
    - ```node plot.js``` plot the graph and open it with a web-browser
    - ```node zipf.js``` calculate `C * 1 / r` for each word

### Zipf's Law

Zipf's Law is a statistical principle that suggests
a small number of words are used very frequently,
while the majority are used rarely. To determine whether
the document follows Zipf's Law, we calculated the product
of the frequency and the rank of each word as implemented
in `freq_rank.js` file. Also `zipf.js` calculates the
frequency of each word and word distribution using the
formula `f = C * 1 / r` to show that if the distribution
follows the Zipf's word distribution.

From the above analysis, a deviation from Zipf's Law
word distribution is observed. When we compare the actual frequency
with the frequency calculated using the formula `C * 1 / r` we get
some gap between the numbers. (implemented in `zipf.js`)

Whereas, the consistent relationship observed between the product of frequency
and rank for each word suggests a conformity to Zipf's Law within the
document. This consistency implies that the frequency distribution
follows the expected pattern outlined by Zipf's Law, and further
supported by the graphical representation of frequency-rank.

### Luhn's Idea

According to Luhn's idea we examined the frequency-rank
graph to decide which words should be excluded from the
index terms by determining the upper cutoff and the lower
cutoff in terms of the given rank of words.

[//]: # (TODO decide cutoff)