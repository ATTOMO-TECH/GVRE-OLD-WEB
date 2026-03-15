import zones from "./zones.json";

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
  // 1. Aseguramos que zoneName sea siempre un array para poder usar .includes()
  const searchList = Array.isArray(zoneName) ? zoneName : [zoneName];

  let filteredZones = [];

  zones.forEach((zoneObj) => {
    // Comprobamos si lo que buscamos coincide con:
    // - El ID (Caso Urbanizaciones A-1 donde ya mandamos IDs)
    // - El Nombre (Caso "Aravaca", "La Florida", etc)
    // - El campo zone (Para filtros por departamento si fuera necesario)
    const isMatch =
      searchList.includes(zoneObj._id) ||
      searchList.includes(zoneObj.name) ||
      searchList.includes(zoneObj.zone);

    if (isMatch) {
      // Evitamos duplicar IDs en el array final
      if (!filteredZones.includes(zoneObj._id)) {
        filteredZones.push(zoneObj._id);
      }
    }
  });

  return filteredZones;
};
