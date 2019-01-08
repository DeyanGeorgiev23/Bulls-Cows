interface Statistic {
  userNumbers: Array<number>;
  cows: number;
  bulls: number;
}

const numbersChecker = (
  numbers: Array<number>,
  userNumbers: Array<number>,
  username: string,
  data: Array<Statistic>
) => {
  let cows = 0;
  let bulls = 0;
  let successMessage = "";
  let showInput = true;

  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] === Number(userNumbers[i])) {
      bulls++;
    } else if (numbers.toString().includes(userNumbers[i].toString())) {
      cows++;
    }

    if (bulls === 4) {
      successMessage = `Well done ${username} you guess the right digits!`;
      showInput = false;
      let savedData = [];
      if (localStorage.getItem("userData")) {
        let localData = localStorage.getItem("userData");
        let data = JSON.parse(localData as string);
        for (let d of data) {
          savedData.push(d);
        }
      }
      const tries = data.length + 1;
      savedData.push({ userNumbers, tries });
      localStorage.setItem("userData", JSON.stringify(savedData));
    }
  }

  data.unshift({ userNumbers, cows, bulls });

  return {
    newData: data,
    newSuccessMessage: successMessage,
    newShowInput: showInput
  };
};

export default numbersChecker;
