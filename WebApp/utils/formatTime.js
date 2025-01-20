export const formatTime = (timestamp) => {
  const timePart = timestamp.split("-")[1];

  if (timePart) {
    // Extract hours, minutes, and seconds
    const hours = timePart.slice(0, 2);
    const minutes = timePart.slice(2, 4);
    const seconds = timePart.slice(4, 6);

    // Format the time
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    return formattedTime;
  }
};
