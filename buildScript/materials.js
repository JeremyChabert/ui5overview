const casual = require('casual')

const FIN = ['A380', 'A310', 'A320', 'A400M']
const SFIN = ['Wings', 'Tail', 'Nose', 'Body']
const RAW = ['Steel pipe', 'Wires', 'Screw', 'Coating']

const financial = (x) => {
    return parseFloat(Number.parseFloat(x).toFixed(2))
}

//prepare generator
casual.define('rawmaterial', function () {
    return {
        materialID: casual.integer(1e10, 2e10),
        description: casual.random_element(RAW),
        type: 'RAW',
        unitPrice: financial(casual.double((from = 10), (to = 10000))),
    }
})

casual.define('sfinmaterial', function (aComponents) {
    return {
        materialID: casual.integer(3e10, 4e10),
        description: casual.random_element(SFIN),
        type: 'SFIN',
        components: generateListOfComp(aComponents),
    }
})

casual.define('finmaterial', function (aComponents) {
    return {
        materialID: casual.integer(5e10, 9e10),
        description: casual.random_element(FIN),
        type: 'FIN',
        components: generateListOfComp(aComponents),
    }
})

const generateListOfComp = (aComponents) => {
    const aMaterialID = aComponents.map((x) => x.materialID)
    const aSubMaterials = []
    for (let i = 0; i < casual.integer(1, 5); i++) {
        aSubMaterials.push(casual.random_element(aMaterialID))
    }
    return aSubMaterials
}

const createRawMaterials = (limit) => {
    const aRawMaterials = []
    for (let i = 0; i < limit; i++) {
        aRawMaterials.push(casual.rawmaterial)
    }
    return aRawMaterials
}

const createSFINMaterial = (aRawMaterials, limit) => {
    let aSFINMaterials = []
    for (let i = 0; i < limit; i++) {
        aSFINMaterials.push(casual.sfinmaterial(aRawMaterials))
    }
    aSFINMaterials.map((x) => {
        x.unitPrice = financial(
            x.components
                .map((a) => {
                    const component = aRawMaterials.find(
                        (el) => el.materialID === a
                    )
                    return component.unitPrice
                })
                .reduce((a, b) => {
                    return a + b
                })
        )
        return x
    })
    return aSFINMaterials
}

const createFINMaterial = (aMaterials, limit) => {
    let aFINMaterials = []
    for (let i = 0; i < limit; i++) {
        aFINMaterials.push(casual.finmaterial(aMaterials))
    }
    aFINMaterials = aFINMaterials.map((x) => {
        x.unitPrice = financial(
            x.components
                .map((a) => {
                    const component = aMaterials.find(
                        (el) => el.materialID === a
                    )
                    return component.unitPrice
                })
                .reduce((a, b) => {
                    return a + b
                })
        )
        return x
    })
    return aFINMaterials
}

const createMaterials = (limit) => {
    const aRawMaterials = createRawMaterials(limit)
    const aSFINMaterials = createSFINMaterial(aRawMaterials, limit)
    const aFINMaterials = createFINMaterial(
        [...aRawMaterials, ...aSFINMaterials],
        limit
    )
    return [...aFINMaterials, ...aRawMaterials, ...aSFINMaterials]
}
module.exports.generateMaterials = function (limit) {
    return createMaterials(limit)
}
