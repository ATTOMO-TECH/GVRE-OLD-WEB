import zones from './zones.json'

/*export const getZoneId = (zoneName) => {
    const filterZones = zones.filter(zoneObj => {
        if (!zoneObj.zone === "Residencial" && !zoneObj.zone === "Patrimonio") {
            if (zoneName.includes(zoneObj.zone)) return zoneObj._id
        }
        else { if (zoneName.includes(zoneObj.name)) return zoneObj._id }
    })
    return filterZones.map(zone => zone._id)
}*/

export const getZoneId = (zoneName) => {
    let filteredZones = []
    zones.forEach(zoneObj => {
        if (!zoneObj.zone === "Residencial" && !zoneObj.zone === "Patrimonio") {
            if (zoneName.includes(zoneObj.zone)) filteredZones.push(zoneObj._id)
        }
        //Este else if devuelve tanto los inmuebles de patrimonio como los de residencial
        else if (zoneName.includes(zoneObj.name)) filteredZones.push(zoneObj._id)
    })
    return filteredZones
}