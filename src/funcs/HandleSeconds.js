const handleSeconds = seconds => {
  let mins = 0;
  if (seconds > 59) {
    mins++;
  }

  if (mins < 10) {
    mins = "0" + mins;
  }

  return `${mins}:${seconds}`;
};

export default handleSeconds;
