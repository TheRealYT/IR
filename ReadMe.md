### Amharic Tokenizer
The Amharic tokenizer is a tool designed to segment
Amharic text into tokens, which are smaller, meaningful units such
as words or phrases. Unlike more complex AI-based text processing tools,
this tokenizer operates based on simpler, rule-based algorithms specifically
to handle the unique characteristics of the Amharic language.

### How to use (steps)
1. Run tokenizer (make sure to remove `tmp` directory if tokenization is repeated on the same documents since it appends(counts) the result from there)
   - ```node tokenize.js```
2. Next any of the following codes can be executed independently
   - ```node freq.js``` calculate frequency of words
   - ```node rank.js``` calculate rank of words based on frequency
   - ```node freq_rank.js``` calculate the product of rank and frequency
   - ```node plot.js``` plot the graph and open it with a web-browser

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
is observed when the products of the frequency and
rank do not show consistency. Variations in the product
indicate that the frequency distribution of words does
not align with Zipf's Law.

### Luhn's Idea
According to Luhn's idea we examined the frequency-rank
graph to decide which words should be excluded from the
index terms by determining the upper cutoff and the lower
cutoff in terms of the given rank of words.