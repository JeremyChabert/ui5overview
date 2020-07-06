const casual = require('casual')
const chalk = require('chalk')
const fs = require('fs')
const Papa = require('papaparse')
const path = require('path')
const Order = require('./orders')
const Customer = require('./customers')
const Material = require('./materials')
const Process = require('./processes')

const folder = path.resolve(__dirname, '../db/csv/')
const csvConfig = {
    quotes: false, //or array of booleans
    quoteChar: '"',
    escapeChar: '"',
    delimiter: ';',
    header: true,
    newline: '\r\n',
    skipEmptyLines: true, //or 'greedy',
    columns: null, //or array of strings
}

let extension = `.${process.argv.slice(2)[0]}`

const aCustomers = Customer.generateCustomers(10)
const aMaterials = Material.generateMaterials(10)
const { aOrders, aOrderItems } = Order.generateOrders(
    1000,
    aCustomers,
    aMaterials
)
// const aProcessGroups = Process.generateGroups(5);
// const aProcessNodes = Process.generateNodes(30, aProcessGroups);
// const aProcessLines = Process.generateLines(aProcessNodes);
let aNodes = []
const aProcessGroups = []
const aArrayNodes = []
for (let i = 0; i < 7; i++) {
    const oGroup = {
        id: i,
        title: casual.title,
    }
    const aProcessNodes = Process.generateNodes(casual.integer(1, 6), [oGroup])
    aNodes = [...aNodes, ...aProcessNodes]
    aArrayNodes.push(aProcessNodes)
    aProcessGroups.push(oGroup)
}
const aProcessLines = Process.generateLines(aArrayNodes)
const data = {
    customers: aCustomers,
    orders: aOrders,
    orderItems: aOrderItems,
    materials: aMaterials,
    processGroups: aProcessGroups,
    processNodes: aNodes,
    processLines: aProcessLines,
}

switch (true) {
    case /json/.test(extension):
        for (let [key, values] of Object.entries(data)) {
            data[key] = JSON.stringify({ d: values })
        }
        break
    case /csv/.test(extension):
        for (let [key, values] of Object.entries(data)) {
            data[key] = Papa.unparse(values, csvConfig)
        }
        break
    default:
        console.log(
            chalk.red(
                `Format was not provided or is incorrect, please provide argument as json or csv`
            )
        )
        return
}

for (let [key, values] of Object.entries(data)) {
    const fileName = `schema-${key.charAt(0).toUpperCase()}${key.slice(1)}`
    fs.writeFile(
        path.join(folder, `${fileName}${extension}`),
        values,
        (err) => {
            if (err) {
                return console.log(chalk.red(err))
            } else {
                console.log(
                    chalk.green(`Mock ${fileName}(${extension}) generated`)
                )
            }
        }
    )
}
