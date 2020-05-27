const casual = require('casual')

const createOrderItems = (orderRef, max, materialList) => {
    //prepare generator
    const aMaterialID = materialList.map((x) => x.materialID)
    casual.define('orderItem', function () {
        return {
            materialID: casual.random_element(aMaterialID),
            quantity: casual.integer(1, 20),
            netValue: casual.double(0, 1000).toFixed(2),
        }
    })

    //generate
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

const createOrders = (max, customerList, materialList) => {
    //prepare generator
    const aCustomerId = customerList.map((x) => x.customerId)
    casual.define('order', function () {
        return {
            orderID: casual.uuid,
            currency: casual.currency_code,
            soldTo: casual.random_element(aCustomerId),
            createdAt: casual.date('YYYY-MM-DD'),
        }
    })

    //generate
    const aOrders = []
    let aOrderItems = []
    for (let i = 0; i < max; i++) {
        const order = casual.order
        aOrders.push(order)
        aOrderItems = aOrderItems.concat(
            createOrderItems(order, casual.integer(0, 10), materialList)
        )
    }
    return { aOrders, aOrderItems }
}

module.exports.generateOrders = function (max, customerList, materialList) {
    return createOrders(max, customerList, materialList)
}
