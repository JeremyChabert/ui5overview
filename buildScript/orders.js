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
        }
        const { unitPrice } = materialList.find(
            (el) => el.materialID === obj.materialID
        )
        obj.netValue = financial(
            unitPrice > 1000
                ? unitPrice * casual.integer(1, 2)
                : unitPrice * casual.integer(1, 20)
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
    const now = new Date()
    const year = now.getFullYear()
    const aYears = []
    for (let i = 0; i < 5; i++) {
        aYears.push(year - i)
    }

    casual.define('order', function () {
        const oTemp = {
            orderID: casual.uuid,
            currency: casual.random_element(['EUR', 'USD', 'CHF']),
            type: casual.random_element(['A', 'B', 'C']),
            soldTo: casual.random_element(aCustomerId),
            year: casual.random_element(aYears),
        }
        oTemp.createdAt = new Date(
            oTemp.year,
            casual.month_number,
            casual.day_of_month
        )
        oTemp.status =
            oTemp.year === year
                ? casual.random_element([
                      'SUSPENDED',
                      'IN PROGRESS',
                      'OPEN',
                      'CLOSED',
                      'DELAYED',
                  ])
                : casual.random_element(['CLOSED', 'CANCELED'])
        return oTemp
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
