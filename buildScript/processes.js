const casual = require('casual')
const chalk = require('chalk')
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

casual.define('group', (index) => ({
    id: index,
    title: casual.title,
}))

casual.define('node', (index, groups) => ({
    id: casual.uuid,
    title: capitalize(casual.word),
    // for statuses: https://sapui5.hana.ondemand.com/#/api/sap.suite.ui.commons.networkgraph.ElementStatus:
    status: casual.random_element([
        'Error',
        'Information',
        'Standard',
        'Success',
        'Warning',
    ]),
    icon:
        'sap-icon://' +
        casual.random_element([
            'factory',
            'machine',
            'product',
            'shipping-status',
            'employee-approvals',
            'employee-rejections',
            'wrench',
            'customize',
            'source-code',
            'laptop',
            'it-system',
            'camera',
            'touch',
            'accidental-leave',
            'action',
            'away',
            'bar-code',
            'batch-payements',
            'cart',
            'car-rental',
            'citizen-connect',
            'compare',
            'delete',
            'e-care',
        ]),
    groupId: casual.random_element(groups).id,
}))

casual.define('line', (index, nodes) => ({
    fromId: index,
    toId: casual.random_element(nodes).id,
}))

const generateNodes = (max, groups) => {
    const nodes = []
    for (let i = 0; i < max; i++) {
        nodes.push(casual.node(i, groups))
    }
    return nodes
}

// const generateLines = (nodes) => {
//     const lines = []
//     const max = nodes.length
//     for (let i = 0; i < max; i++) {
//         lines.push(casual.line(i, nodes))
//     }
//     return lines
// }

const generateLines = (array) => {
    const lines = []
    // const max = nodes.length
    // for (let i = 0; i < max; i++) {
    //     lines.push(casual.line(i, nodes))
    // }
    // return lines
    const aReversedNode = array.reverse()
    for (let i = 0; i < aReversedNode.length - 1; i++) {
        const aNodes = array[i]
        const aFather = array[i + 1]
        aNodes.forEach((x) => {
            lines.push({
                fromId: aFather[casual.integer(0, aFather.length - 1)].id,
                toId: x.id,
            })
        })
    }
    return lines
}

const generateGroups = (max) => {
    const groups = []
    for (let i = 0; i < max; i++) {
        groups.push(casual.group(i))
    }
    return groups
}

module.exports = {
    generateNodes,
    generateLines,
    generateGroups,
}
