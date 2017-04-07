export default (coords) => {
  const bounds = new window.google.maps.LatLngBounds();
  coords.forEach(coord => {
    bounds.extend(coord);
  });

  const center = bounds.getCenter();
  return {
    lat: center.lat(),
    lng: center.lng(),
  };
};
