const casual = require('casual');

casual.define('group', (index) => ({
    key: index,
    title: `Group ${index}`,
}));

casual.define('node', (index, groups) => ({
    key: index,
    title: casual.title,
    // for statuses: https://sapui5.hana.ondemand.com/#/api/sap.suite.ui.commons.networkgraph.ElementStatus:
    status: casual.random_element(['Error', 'Information', 'Standard', 'Success', 'Warning']),
    icon: 'sap-icon://' + casual.random_element(['factory', 'machine', 'product', 'shipping-status', 
        'employee-approvals', 'employee-rejections', 'wrench', 'customize', 'source-code', 'laptop',
        'it-system', 'camera', 'touch', 'accidental-leave', 'action', 'away', 'bar-code', 'batch-payements',
        'cart', 'car-rental', 'citizen-connect', 'compare', 'delete', 'e-care']),
    group: casual.random_element(groups).key,
}));

const generateNodes = (max, groups) => {
    const nodes = [];
    for (let i = 0; i < max; i++) {
        nodes.push(casual.node(i, groups));
    }
    return nodes;
};

const generateLines = () => {};

const generateGroups = (max) => {
    const groups = [];
    for (let i = 0; i < max; i++) {
        groups.push(casual.group(i));
    }
    return groups;
};

// const groups = generateGroups(5);
// const nodes = generateNodes(30, groups);
// console.log(nodes);

module.exports = {
    generateNodes,
    generateLines,
    generateGroups,
};