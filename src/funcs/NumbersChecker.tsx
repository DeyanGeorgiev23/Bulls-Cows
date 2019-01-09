import HandleSeconds from "./HandleSeconds";

interface Statistic {
  userNumbers: Array<number>;
  cows: number;
  bulls: number;
  seconds: string;
}

const numbersChecker = (
  numbers: Array<number>,
  userNumbers: Array<number>,
  username: string,
  data: Array<Statistic>,
  seconds: string
) => {
  let cows = 0;
  let bulls = 0;
  let successMessage = "";
  let showInput = true;
  let gameFinished = false;

  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] === Number(userNumbers[i])) {
      bulls++;
    } else if (numbers.toString().includes(userNumbers[i].toString())) {
      cows++;
    }

    if (bulls === 4) {
      gameFinished = true;
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
      seconds = HandleSeconds(seconds);
      savedData.push({ userNumbers, tries, seconds });
      localStorage.setItem("userData", JSON.stringify(savedData));
    }
  }

  data.unshift({ userNumbers, cows, bulls, seconds });

  return {
    newData: data,
    newSuccessMessage: successMessage,
    newShowInput: showInput,
    gameFinish: gameFinished
  };
};

export default numbersChecker;
