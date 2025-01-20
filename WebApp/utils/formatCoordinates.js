export const formatCoordinates = (url) => {
  const regex = /\(([^)]+)\)/;

  const match = url.match(regex);

  if (match) {
    const coordinates = match[1]
      .split(",")
      .map((coord) => parseFloat(coord.trim()));
    const latitude = coordinates[0];
    const longitude = coordinates[1];

    return { latitude, longitude };
  }
};
