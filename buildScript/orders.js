const casual = require('casual')

const financial = (x) => {
    return parseFloat(Number.parseFloat(x).toFixed(2))
}

const createOrderItems = (orderRef, max, materialList) => {
    //prepare generator
    const aMaterialID = materialList.map((x) => x.materialID)
    casual.define('orderItem', function () {
        const obj = {
            materialID: casual.random_element(aMaterialID),
            quantity: casual.integer(1, 20),
        }
        obj.netValue = financial(
            materialList.find((el) => el.materialID === obj.materialID)
                .unitPrice * obj.quantity
        )
        return obj
    })

    //generate
    const aOrderItems = []
    let item = 10

    for (let i = 0; i < max; i++) {
        const orderItem = casual.orderItem
        orderItem.orderID = orderRef.orderID
        orderItem.year = orderRef.year
        orderItem.item = item
        aOrderItems.push(orderItem)
        item += 10
    }
    return aOrderItems
}

const createOrders = (max, customerList, materialList) => {
    //prepare generator
    const aCustomerId = customerList.map((x) => x.customerID)
    casual.define('order', function () {
        return {
            orderID: casual.uuid,
            currency: casual.currency_code,
            soldTo: casual.random_element(aCustomerId),
            createdAt: casual.date('YYYY-MM-DD'),
            year: casual.random_element([2016, 2017, 2018, 2019, 2020]),
        }
    })

    //generate
    const aOrders = []
    let aOrderItems = []
    for (let i = 0; i < max; i++) {
        const order = casual.order
        const items = createOrderItems(
            order,
            casual.integer(1, 10),
            materialList
        )
        order.netValue = financial(
            items
                .map((a) => a.netValue)
                .reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
        )
        aOrders.push(order)
        aOrderItems = aOrderItems.concat(items)
    }
    return { aOrders, aOrderItems }
}

module.exports.generateOrders = function (max, customerList, materialList) {
    return createOrders(max, customerList, materialList)
}
