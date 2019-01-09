const handleSeconds = seconds => {
  let mins = 0;
  let hours = 0;

  if (seconds > 59) {
    mins++;
  }
  if (mins > 59) {
    seconds = 0;
    hours++;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (mins < 10) {
    mins = "0" + mins;
  }
  if (hours > 23) {
    hours = 0;
  }

  return `${hours}:${mins}:${seconds}`;
};

export default handleSeconds;
