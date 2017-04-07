const getCoords = (vertices) => {
  const polygonCoords = [];
  for (let i = 0; i < vertices.getLength(); i++) {
    const pointCoords = vertices.getAt(i);
    polygonCoords.push({ lat: pointCoords.lat(), lng: pointCoords.lng() });
  }
  return polygonCoords;
};


const computeArea = (polygonCoords) => {
  const mapsApi = window.google.maps;
  const coords = polygonCoords.map(coord => new mapsApi.LatLng(coord.lat, coord.lng));
  return +(mapsApi.geometry.spherical.computeArea(coords) / 10000).toFixed(3);
};


export default (googlePolygon) => {
  const coordinates = getCoords(googlePolygon);
  const square = computeArea(coordinates);
  return { coordinates, square };
};
