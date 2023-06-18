<template>
  <div id="App">
    <div class="Page" id="StartPage">
      <div class="StartPageObject" id="StartPageContinue">スタート</div>
      <div id="StartPageMain">
        <div class="StartPageObject" id="PickerContainer">
          <div class="PickerContainers" id="DigitsPickerContainer">
            <input class="Picker" id="DigitsPicker" type="text">
            <div class="PickerText" id="DigitsText">桁</div>
          </div>
          <div class="PickerContainers" id="NumberPickerContainer">
            <input class="Picker" id="NumberPicker" type="text">
            <div class="PickerText" id="NumberText">口</div>
          </div>
          <div class="PickerContainers" id="IntervalPickerContainer">
            <div class="PickerText" id="IntervalText1">約</div>
            <input class="Picker" id="IntervalPicker" type="text">
            <div class="PickerText" id="IntervalText2">秒</div>
          </div>
        </div>
        <div class="StartPageObject" id="PickerInfoBar">
          <div class="PickerInfoBarObject" id="DigitsInfo">表示桁数</div>
          <div class="PickerInfoBarObject" id="NumbersInfo">表示口数</div>
          <div class="PickerInfoBarObject" id="IntervalInfo">表示速度</div>
        </div>
        <div class="StartPageObject" id="InformationDisplay">情報表示</div>
      </div>
      <div class="StartPageRedirect" id="StartPageStartPageRedirect">スタート画面</div>
    </div>
    <div class="Page" id="ConfirmPage">
      <div class="ConfirmPageObject" id="ConfirmPageMain">
        <div class="ConfirmPageObject" id="ConfirmInformation">
          <div id="ConfirmInformationText"></div>
        </div>
      </div>
      <div class="StartPageRedirect" id="ConfirmPageStartPageRedirect">レベル変更</div>
    </div>
    <div class="Page" id="GamePage">
      <div class="GamePageObject" id="GameNumbers"></div>
    </div>
    <div class="Page" id="GuessPage">
      <div id="GuessPageMain">
        <input class="GuessPageObject" id="GuessInput" type="text">
        <div class="GuessPageObject" id="GuessInformation">
          <div id="GuessInformationText">答えを入力し、［答入力完了」ボタンを押して下さい</div>
        </div>
      </div>
      <div id="GuessInformationConfirmButton">答入力完了</div>
    </div>
    <div class="Page" id="CorrectPage">
      <div class="StartPageRedirect" id="CorrectPageStartPageRedirect">次へ</div>
      <div id="CorrectPageMain"></div>
    </div>
    <div class="Page" id="IncorrectPage">
      <div class="StartPageRedirect" id="IncorrectPageStartPageRedirect">次へ</div>
      <div id="IncorrectPageMain">
        <div id="IncorrectPageBar">
          <div id="IncorrectPageCorrectAnswer"></div>
        </div>
        <div id="IncorrectPageNumbers"></div>
      </div>
    </div>
  </div>
</template>


<script>
  export default ({
    mounted() {
      let mode = 1;  // 1: start screen, 2: confirm screen, 3: game screen, 4: guessing screen, 5: result screen
      let interval = 0;
      let count = 0;
      let digits = 0;
      let sum = 0;

      const delay = ms => new Promise(res => setTimeout(res, ms));

      function isStringConvertibleToInt(str) {
        if (typeof str != "string") return false;
        return !isNaN(str) &&
              !isNaN(parseFloat(str));
      }

      function generateNumber(n) {
        if (n <= 0) {
          alert("Invalid digit count: the number of digits should be greater than zero.");
        }

        const min = Math.pow(10, n - 1);
        const max = Math.pow(10, n) - 1;
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      function StartGuess() {
        mode = 4;
        const GamePagePointer = document.querySelector('#GamePage');
        const GuessPagePointer = document.querySelector('#GuessPage');

        GamePagePointer.style.visibility = 'hidden';
        GuessPagePointer.style.visibility = 'visible';
      }

      function GuessPageEnterPressed() {
        const GuessInputPointer = document.querySelector('#GuessInput');

        if (isStringConvertibleToInt(GuessInputPointer.value) == false) {
          GuessInputPointer.value = '';
          alert('Invalid Answer: answer needs to be a number');
        }
        else if (GuessInputPointer.value == sum) {
          GuessInputPointer.value = '';
          CorrectAnswer();
        }
        else {
          GuessInputPointer.value = '';
          IncorrectAnswer();
        }
      }

      function CorrectAnswer() {
        mode = 5;
        const GuessPagePointer = document.querySelector('#GuessPage');
        const CorrectPagePointer = document.querySelector('#CorrectPage');
        const CorrectPageStartPageRedirectPointer = document.querySelector('#CorrectPageStartPageRedirect');

        GuessPagePointer.style.visibility = 'hidden';
        CorrectPagePointer.style.visibility = 'visible';

        CorrectPageStartPageRedirectPointer.addEventListener('click', function(event) {
          mode = 1;
          const StartPagePointer = document.querySelector('#StartPage');
          const CorrectPagePointer = document.querySelector('#CorrectPage');

          StartPagePointer.style.visibility = 'visible';
          CorrectPagePointer.style.visibility = 'hidden';
        });
      }

      function IncorrectAnswer() {
        mode = 5;
        const GuessPagePointer = document.querySelector('#GuessPage');
        const IncorrectPagePointer = document.querySelector('#IncorrectPage');
        const IncorrectPageCorrectAnswerPointer = document.querySelector('#IncorrectPageCorrectAnswer');
        const IncorrectPageStartPageRedirectPointer = document.querySelector('#IncorrectPageStartPageRedirect');

        GuessPagePointer.style.visibility = 'hidden';
        IncorrectPagePointer.style.visibility = 'visible';
        IncorrectPageCorrectAnswerPointer.innerHTML = sum;

        IncorrectPageStartPageRedirectPointer.addEventListener('click', function(event) {
          mode = 1;
          const StartPagePointer = document.querySelector('#StartPage');
          const IncorrectPagePointer = document.querySelector('#IncorrectPage');

          StartPagePointer.style.visibility = 'visible';
          IncorrectPagePointer.style.visibility = 'hidden';
        });
      }

      async function StartGame() {
        mode = 3;
        const ConfirmPagePointer = document.querySelector('#ConfirmPage');
        const GamePagePointer = document.querySelector('#GamePage');
        const GameNumbersPointer = document.querySelector('#GameNumbers');

        GameNumbersPointer.innerHTML = '';
        ConfirmPagePointer.style.visibility = 'hidden';
        GamePagePointer.style.visibility = 'visible';

        for (var i=0; i<2; i++) {
          //PlayCountdownSound()
          await delay(1000);
        }

        sum = 0;

        if (mode == 3) {
          for (var i=0; i<count; i++) {
            let randomNumber = generateNumber(digits);
            sum += randomNumber;
            GameNumbersPointer.innerHTML = randomNumber;
            await delay(interval*5000/6);

            GameNumbersPointer.innerHTML = '';
            await delay(interval*1000/6);
          }

          StartGuess();
        }
      }

      function ConfirmScreenWait() {
        mode = 2;
        const StartPagePointer = document.querySelector('#StartPage');
        const ConfirmPagePointer = document.querySelector('#ConfirmPage');
        const ConfirmInformationTextPointer = document.querySelector('#ConfirmInformation');

        ConfirmInformationTextPointer.innerHTML = digits.toString() + '桁' + count.toString() + '口約' + interval.toString() + '秒'
        StartPagePointer.style.visibility = 'hidden';
        ConfirmPagePointer.style.visibility = 'visible';

        setTimeout(function() {
          if (mode == 2) {
            StartGame();
          }
        }, 3000)
      }


      // Move from Start Screen to Confirm Screen 
      document.addEventListener('keydown', function(event) {
        if (event.code == 'Enter') {
          if (mode == 1) {
            const DigitsPickerPointer = document.querySelector('#DigitsPicker');
            const NumberPickerPointer = document.querySelector('#NumberPicker');
            const IntervalPickerPointer = document.querySelector('#IntervalPicker');

            if (isStringConvertibleToInt(DigitsPickerPointer.value) == true && isStringConvertibleToInt(NumberPickerPointer.value) == true && isStringConvertibleToInt(IntervalPickerPointer.value) == true) {
              digits = DigitsPickerPointer.value;
              count = NumberPickerPointer.value;
              interval = IntervalPickerPointer.value;
              ConfirmScreenWait();
            }
            else {
              alert('Invalid Answer: all input values must be numbers');
            }
          }
        }
      });

      // Returning to Start Page via Escape Button 
      document.addEventListener('keydown', function(event) {
        if (event.code == 'Escape' && mode == 2) {
          mode = 1;
          const StartPagePointer = document.querySelector('#StartPage');
          const ConfirmPagePointer = document.querySelector('#ConfirmPage');

          StartPagePointer.style.visibility = 'visible';
          ConfirmPagePointer.style.visibility = 'hidden';
        }
        else if (event.code == 'Escape' && mode == 5) {
          mode = 1;
          const StartPagePointer = document.querySelector('#StartPage');
          const CorrectPagePointer = document.querySelector('#CorrectPage');
          const IncorrectPagePointer = document.querySelector('#IncorrectPage');

          StartPagePointer.style.visibility = 'visible';
          CorrectPagePointer.style.visibility = 'hidden';
          IncorrectPagePointer.style.visibility = 'hidden';
        }
      });

      // EventListener for enter button for Guess Page
      document.addEventListener('keydown', function(event) {
        if (event.code == 'Enter' && mode == 4) {
          GuessPageEnterPressed();
        }
      });

      // EventListener for click on GuessInformationConfirmButton
      const GuessInformationConfirmButtonPointer = document.querySelector('#GuessInformationConfirmButton');
      GuessInformationConfirmButtonPointer.addEventListener('click', function(event) {
        GuessPageEnterPressed();
      })

      // EventListener for click on ConfirmPageStartPageRedirect
      const ConfirmPageStartPageRedirectPointer = document.querySelector('#ConfirmPageStartPageRedirect');
      ConfirmPageStartPageRedirectPointer.addEventListener('click', function(event) {
        if (mode == 2) {
          const StartPagePointer = document.querySelector('#StartPage');
          const ConfirmPagePointer = document.querySelector('#ConfirmPage');
          mode = 1;

          StartPagePointer.style.visibility = 'visible';
          ConfirmPagePointer.style.visibility = 'hidden';
        }
      })
    },
  })
</script>

<style>
  body {
    margin: 0px;
  }

  #StartPage {
    visibility: visible;
    margin: 0px;
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #a3a3bf;
  }

  #StartPageMain {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0px;
    margin: 0px;
    position: absolute;
    width: 100vw;
    height: 90vh;
    left: 0%;
    top: 0%;
  }

  #PickerContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 150px;
    margin: 0px;
    width: 100vw;
    height: 40vh;
  }

  .PickerContainers {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width: 15vw;
    height: 20px;
  }

  .Picker {
    height: 40px;
    width: 80px;
    border: 0px solid;
    color: #2c2c2c;
    overflow: hidden;
    font-size: 35px;
    outline: none;
  }

  .PickerText {
    font-family: sans-serif;
    font-size: 40px;
    color: #2c2c2c;
    user-select: none;
  }

  #PickerInfoBar {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 270px;
    margin: 0px;
    overflow: hidden;
    width: 100vw;
    height: 120px;
    background-color: #c4c0c3;
  }

  .PickerInfoBarObject {
    color: #2c2c2c;
    font-family: sans-serif;
    font-size: 40px;
    user-select: none;
  }

  #InformationDisplay {
    width: 100vh;
    text-align: center;
    color: #3c66bc;
    font-family: sans-serif;
    font-size: 40px;
    padding: 20px;
    user-select: none;
  }

  #StartPageStartPageRedirect {
    margin: 20px;
    position: absolute;
    bottom: 0%;
    right: 0%;
    padding: 20px;
    border-radius: 25px;
    border: 5px solid #ffffff;
    width: 120px;
    height: 22px;
    font-size: 20px;
    user-select: none;
    color: #3c66bc;
    text-align: center;
    font-family: sans-serif;
    transition: 100ms background-color ease-in;
  }

  #StartPageStartPageRedirect:hover {
    background-color: #9d9dbb;
  }

  #StartPageContinue {
    margin: 20px;
    position: absolute;
    top: 0%;
    right: 0%;
    padding: 20px;
    border-radius: 25px;
    border: 5px solid #ffffff;
    width: 120px;
    height: 22px;
    font-size: 20px;
    user-select: none;
    color: #3c66bc;
    text-align: center;
    font-family: sans-serif;
    transition: 100ms background-color ease-in;
    z-index: 1;
  }

  #StartPageContinue:hover {
    background-color: #9d9dbb;
  }


  #ConfirmPage {
    visibility: hidden;
    margin: 0px;
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #a3a3bf;
  }

  #ConfirmPageMain {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0px;
    margin: 0px;
    position: absolute;
    width: 100vw;
    height: 90vh;
    left: 0%;
    top: 0%;
  }

  #ConfirmInformation {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 170px;
    margin: 0px;
    overflow: hidden;
    width: 100vw;
    height: 120px;
    background-color: #ffffff;
    color: #000000;
    font-family: sans-serif;
    text-align: center;
    font-size: 50px;
    font-weight: 400;
    letter-spacing: 3px;
    user-select: none;
  }

  #ConfirmPageStartPageRedirect {
    margin: 20px;
    position: absolute;
    top: 0%;
    right: 0%;
    padding: 20px;
    border-radius: 25px;
    border: 5px solid #ffffff;
    width: 120px;
    height: 22px;
    font-size: 20px;
    user-select: none;
    color: #3c66bc;
    text-align: center;
    font-family: sans-serif;
    transition: 100ms background-color ease-in;
  }

  #ConfirmPageStartPageRedirect:hover {
    background-color: #9d9dbb;
  }

  #GamePage {
    visibility: hidden;
    margin: 0px;
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #000000;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #GameNumbers {
    font-family: sans-serif;
    font-size: 300px;
    color: #02ff00;
    font-weight: 500;
    text-align: center;
    user-select: none;
  }

  #GuessPage {
    visibility: hidden;
    margin: 0px;
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #b1b1b1;
  }

  #GuessPageMain {
    position: absolute;
    height: 80vh;
    width: 100vw;
    left: 0%;
    top: 0%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 120px;
  }

  #GuessInput {
    border: 0px solid;
    width: 55vw;
    height: 100px;
    overflow: hidden;
    font-family: sans-serif;
    color: #2c2c2c;
    font-size: 95px;
    outline: none;
    text-align: center;
  }

  #GuessInformation {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 0px;
    overflow: hidden;
    width: 100vw;
    height: 120px;
    background-color: #ffffff;
  }

  #GuessInformationText {
    color: #000000;
    font-family: sans-serif;
    text-align: center;
    font-size: 50px;
    font-weight: 400;
    letter-spacing: 3px;
    user-select: none;
  }

  #GuessInformationConfirmButton {
    margin: 20px;
    position: absolute;
    top: 0%;
    right: 0%;
    padding: 20px;
    border-radius: 25px;
    border: 5px solid #ffffff;
    width: 120px;
    height: 22px;
    font-size: 20px;
    user-select: none;
    color: #3c66bc;
    text-align: center;
    font-family: sans-serif;
    transition: 100ms background-color ease-in;
  }

  #GuessInformationConfirmButton:hover {
    background-color: #a5a5a5;
  }

  #CorrectPage {
    visibility: hidden;
    margin: 0px;
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #b5ff86;
  }

  #CorrectPageStartPageRedirect {
    margin: 20px;
    position: absolute;
    top: 0%;
    right: 0%;
    padding: 20px;
    border-radius: 25px;
    border: 5px solid #ffffff;
    width: 120px;
    height: 22px;
    font-size: 20px;
    user-select: none;
    color: #3c66bc;
    text-align: center;
    font-family: sans-serif;
    transition: 100ms background-color ease-in;
  }

  #CorrectPageStartPageRedirect:hover {
    background-color: #a4ff6b
  }

  #IncorrectPage {
    visibility: hidden;
    margin: 0px;
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #fc0017;
  }

  #IncorrectPageStartPageRedirect {
    margin: 20px;
    position: absolute;
    top: 0%;
    right: 0%;
    padding: 20px;
    border-radius: 25px;
    border: 5px solid #ffffff;
    width: 120px;
    height: 22px;
    font-size: 20px;
    user-select: none;
    color: #3c66bc;
    text-align: center;
    font-family: sans-serif;
    transition: 100ms background-color ease-in;
  }

  #IncorrectPageStartPageRedirect:hover {
    background-color: #ea0015;
  }
</style>