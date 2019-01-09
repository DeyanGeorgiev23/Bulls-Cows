const handleSeconds = seconds => {
  let mins = 0;
  let hours = 0;

  mins = Math.floor(seconds / 60) % 60;
  hours = Math.floor(Math.ceil(seconds / 60) / 60);
  seconds = Math.ceil(seconds % 60);

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (mins < 10) {
    mins = "0" + mins;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  return `${hours}:${mins}:${seconds}`;
};

export default handleSeconds;
