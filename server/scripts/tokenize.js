function tokenize(content) {
    return content
        .replace(/[^ሀ-ፖ\/\-]/mgi, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .split(' ')
        .filter(word => word.length > 1);
}

module.exports = {tokenize};