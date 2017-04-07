const jsts = require('jsts');
const geoarea = require('geo-area')({ x: 'lng', y: 'lat' });

const geometryFactory = new jsts.geom.GeometryFactory();

const getIntersectionSquare = (outerCoords, innerCoords) => {
  const outerPolygon = createJstsPolygon(outerCoords);
  const innerPolygon = createJstsPolygon(innerCoords);
  const intersection = outerPolygon.intersection(innerPolygon);
  const polygon = intersection.getCoordinates().map(coord => ({
    lat: coord.x,
    lng: coord.y,
  }));
  const square = +(geoarea(polygon) / 10000).toFixed(3);
  return square;
};

const getInnerPolygons = (drawedPolygonCoords, allPolygons) => {
  const resPolygons = [];

  allPolygons.forEach(polygon => {
    const intersectionSquare = getIntersectionSquare(
      drawedPolygonCoords,
      polygon.coordinates
    );

    if (intersectionSquare >= (polygon.square / 2)) {
      resPolygons.push(polygon);
    }
  });

  return resPolygons;
};

function createJstsPolygon(polygon) {
  const coordinates = polygon.map(coord => (
    new jsts.geom.Coordinate(coord.lat, coord.lng)
  ));
  coordinates.push(coordinates[0]);
  const shell = geometryFactory.createLinearRing(coordinates);
  return geometryFactory.createPolygon(shell);
}

module.exports = getInnerPolygons;
