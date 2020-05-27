const casual = require('casual')

const FIN = ['A380', 'A310', 'A320', 'A400M']
const SFIN = ['Wings', 'Tail', 'Nose', 'Body']
const RAW = ['Steel pipe', 'Wires', 'Screw', 'Coating']

//prepare generator
casual.define('rawmaterial', function () {
    return {
        materialID: casual.integer(1e10, 2e10),
        description: casual.random_element(RAW),
        type: 'RAW',
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

const createRawMaterials = () => {
    const aRawMaterials = []
    for (let i = 0; i < 10; i++) {
        aRawMaterials.push(casual.rawmaterial)
    }
    return aRawMaterials
}

const createSFINMaterial = (aRawMaterials) => {
    const aSFINMaterials = []
    for (let i = 0; i < 10; i++) {
        aSFINMaterials.push(casual.sfinmaterial(aRawMaterials))
    }
    return aSFINMaterials
}

const createFINMaterial = (aMaterials) => {
    const aFINMaterials = []
    for (let i = 0; i < 10; i++) {
        aFINMaterials.push(casual.finmaterial(aMaterials))
    }
    return aFINMaterials
}

const createMaterials = () => {
    const aRawMaterials = createRawMaterials()
    const aSFINMaterials = createSFINMaterial(aRawMaterials)
    const aFINMaterials = createFINMaterial([
        ...aRawMaterials,
        ...aSFINMaterials,
    ])
    return [...aFINMaterials, ...aRawMaterials, ...aSFINMaterials]
}
module.exports.generateMaterials = function () {
    return createMaterials()
}
