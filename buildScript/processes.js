const casual = require('casual');

casual.define('group', (index) => ({
    key: index,
    title: `Group ${index}`,
}));

const generateNodes = (groups, max) => {
    
};

const generateLines = () => {};

const generateGroups = (max) => {
    const groups = [];
    for (let i = 0; i < max; i++) {
        groups.push(casual.group(i));
    }
    return groups;
};

module.exports = {
    generateNodes,
    generateLines,
    generateGroups,
};