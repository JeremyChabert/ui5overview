const casual = require('casual')

//prepare generator
casual.define('customer', function () {
    return {
        customerId: casual.integer(1e5, 4e5),
        name: casual.company_name,
        phone: casual.phone,
        street: casual.street,
        city: casual.city,
        country: casual.country,
        website: casual.url,
    }
})

const createCustomers = (max) => {
    const aCustomers = []
    for (let i = 0; i < max; i++) {
        const customer = casual.customer
        aCustomers.push(customer)
    }
    return aCustomers
}

module.exports.generateCustomers = function (max) {
    return createCustomers(max)
}
