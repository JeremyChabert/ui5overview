const casual = require('casual')
const chalk = require('chalk')
const fs = require('fs')
const Papa = require('papaparse')
const path = require('path')

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

casual.define('order', function () {
    return {
        orderID: casual.uuid,
        currency: casual.currency_code,
        soldTo: casual.company_name,
        createdAt: casual.date((format = 'YYYY-MM-DD')),
    }
})

casual.define('orderItem', function () {
    return {
        materialID: casual.integer((from = 1), (to = 15)),
        netValue: casual.double((from = 0), (to = 1000)).toFixed(2),
    }
})

casual.define('material', function () {
    return {
        materialID: casual.integer((from = 1), (to = 15)),
        description: casual.random_element([
            'A380',
            'A320',
            'A350',
            'A350N',
            'Beluga',
            'Pipes',
            'Papers',
            'Staples',
            'Stamps',
            'Salt',
            'Rock',
            'Paper',
            'Glasses',
        ]),
        type: casual.random_element(['ZAB', 'ZER', 'ZAR', 'ZTE']),
        email: casual.email,
        firstName: casual.first_name,
        lastName: casual.last_name,
    }
})

const generateOrderItems = (orderRef, max) => {
    const aOrderItems = []
    let item = 10
    for (let i = 0; i < max; i++) {
        const orderItem = casual.orderItem
        orderItem.orderID = orderRef.orderID
        orderItem.item = item
        aOrderItems.push(orderItem)
        item += 10
    }
    return aOrderItems
}

const generateOrders = (max) => {
    const aOrders = []
    let aOrderItems = []
    for (let i = 0; i < max; i++) {
        const order = casual.order
        aOrders.push(order)
        aOrderItems = aOrderItems.concat(
            generateOrderItems(order, casual.integer(0, 10))
        )
    }
    return { aOrders, aOrderItems }
}

const generateMaterials = (max) => {
    const aMaterials = []
    for (let i = 0; i < max; i++) {
        aMaterials.push(casual.material)
    }

    return aMaterials
}

const { aOrders, aOrderItems } = generateOrders(10)
const aMaterials = generateMaterials(10)
const data = {}

switch (true) {
    case /json/.test(extension):
        data.orders = JSON.stringify({ d: aOrders })
        data.orderItems = JSON.stringify({ d: aOrderItems })
        data.materials = JSON.stringify({ d: aMaterials })
        break
    case /csv/.test(extension):
        data.orders = Papa.unparse(aOrders, csvConfig)
        data.orderItems = Papa.unparse(aOrderItems, csvConfig)
        data.materials = Papa.unparse(aMaterials, csvConfig)
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
    fs.writeFile(path.join(folder, key + extension), values, (err) => {
        if (err) {
            return console.log(chalk.red(err))
        } else {
            console.log(chalk.green(`Mock ${key}(${extension}) generated`))
        }
    })
}
