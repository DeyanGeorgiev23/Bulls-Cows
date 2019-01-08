const numbresGenerator = () => {
  const validNumbers = [5, 1, 4, 9, 2, 8, 6, 7, 0, 3];
  let leftNumbers = [];

  while (validNumbers.length > 4) {
    let number = validNumbers.splice(Math.floor(Math.random() * 9 + 0), 1);
    leftNumbers.push(number.toString());
  }

  leftNumbers = leftNumbers.filter(n => n !== "").map(Number);

  if (validNumbers[0] === 0) {
    validNumbers[0] = Number(
      leftNumbers.splice(Math.floor(Math.random() * leftNumbers.length), 1)
    );
  }

  return validNumbers;
};

export default numbresGenerator;
