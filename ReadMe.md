### Amharic Tokenizer
Lorem ipsum dolor sit amet, consectetur adipisicing elit.
Nulla nihil suscipit repellendus exercitationem quasi quod
ipsam consequatur reprehenderit perferendis fuga voluptatibus
quibusdam voluptates optio id, vitae facilis aspernatur officia minus?
Lorem ipsum dolor sit amet, consectetur adipisicing elit.
Nulla nihil suscipit repellendus exercitationem quasi quod
ipsam consequatur reprehenderit perferendis fuga voluptatibus
quibusdam voluptates optio id, vitae facilis aspernatur officia minus?

#### How to use (steps)
1. Run tokenizer (make sure to remove `tmp` directory if tokenization is repeated on the same documents since it appends(counts) the result from there)
   - ```node tokenize.js```
2. Next any of the following codes can be executed
   - ```node count.js``` count word frequency in descending order
   - ```node plot.js``` plot the graph and open it with a web-browser