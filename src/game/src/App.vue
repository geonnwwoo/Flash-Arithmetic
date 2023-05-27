<template>
  <div id="App">
    <div id="CountdownContainer">
      <div id="Countdown"></div>
    </div>
    <div id="NumbersContainer">
      <div id="Numbers"></div>
    </div>

    <div id="AnswerField">
      <input type="text" id="AnswerBox" placeholder="">
    </div>

    <div id="EllipsesWarning">
      <div class="EllipsesWarningPageObject" id="EllipsesWarningText">Flash/Ellipses Warning!</div>
      <img class="EllipsesWarningPageObject" id="EllipsesWarningImg" src="./../../assets/WarningSign.png">
    </div>
  </div>
</template>


<script>
  const fs = require('fs');

  export default ({
    mounted() {
      const gameSettingsFilePath = __dirname + '/../../assets/communication/gamemodesettings.txt';
      let gameSettings = '';

      fs.readFile(gameSettingsFilePath, (err, data) => {
        if (err) {
          throw err;
        }
        const uint8Array = new Uint8Array(data);
        const characterCodes = Array.from(uint8Array);
        const characters = characterCodes.map(code => String.fromCharCode(code));
        const resultData = characters.join('');
        const gameSettings = JSON.parse(resultData)
        interval = gameSettings.interval;
        digits = gameSettings.digits;
        count = gameSettings.numbers;
        countdown = gameSettings.countdown;
        answerTime = 6000;
        mode = 1;
        minimumNumber = 0;
        maximumNumber = 0;
        colorOfText = gameSettings.numbersColor;
        colorOfCountdown = gameSettings.countdownColor;
        StartAll();

        console.log(gameSettings);
      });
      
      let interval = 0;
      let digits = 0;
      let count = 0;
      let countdown = 0;
      let answerTime = 6000;
      let mode = 1;
      let minimumNumber = 0;
      let maximumNumber = 0;
      let colorOfText = '';
      let colorOfCountdown = '';
      const CountdownPointer = document.querySelector('#Countdown');
      const NumbersPointer = document.querySelector('#Numbers');
      const AnswerBoxPointer = document.querySelector('#AnswerBox');
      const EllipsesWarningPointer = document.querySelector('#EllipsesWarning');
      
      if (digits == 1) {
        minimumNumber = 1;
        maximumNumber = 9;
      }
      else if (digits == 2) {
        minimumNumber = 10;
        maximumNumber = 99;
      }
      else if (digits == 3) {
        minimumNumber = 100;
        maximumNumber = 999;
      }
      else if (digits == 4) {
        minimumNumber = 1000;
        maximumNumber = 9999;
      }

      function GetRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      function delay(duration) {
        return new Promise((resolve) => {
          setTimeout(resolve, duration);
        });
      }

      async function StartAll() {
        EllipsesWarningPointer.style.visibility = 'visible';
        await delay(3000);
        EllipsesWarningPointer.style.visibility = 'hidden';
        if (mode == 1 || mode == 3) {
          StartTest();
        }
      }

      async function StartTest() {
        let sum = 0;
        mode = 2;

        CountdownPointer.style.visibility = 'visible';
        for (let i = 0; i < countdown; i++) {
          CountdownPointer.innerHTML = countdown - i;
          await delay(1000);
        }

        CountdownPointer.innerHTML = '';
        CountdownPointer.style.visibility = 'hidden';

        NumbersPointer.style.visibility = 'visible';
        for (let i = 0; i < count; i++) {
          let number = GetRandomNumber(minimumNumber, maximumNumber);
          sum += number;
          NumbersPointer.innerHTML = number;
          await delay(interval / 2);
          NumbersPointer.innerHTML = '';
          await delay(interval / 2);
        }
        NumbersPointer.style.visibility = 'hidden';
        AnswerBoxPointer.style.visibility = 'visible';
        document.getElementById('AnswerBox').value = '';

        await delay(answerTime);
        let userInput = document.getElementById('AnswerBox').value;
        let answer = sum;

        if (userInput == answer) {
          alert('Correct Answer');
        } else {
          alert('Incorrect, the correct answer was ' + answer);
        }

        AnswerBoxPointer.style.visibility = 'hidden';
        mode = 1;
      }
    }
  })
</script>


<style>
  body {
    margin: 0px;
    overflow: hidden;
  }

  #App {
    background-color: #000000;
    width: 100vw;
    height: 100vh;
  }

  #Countdown {
    color: #ffffff;
    font-family: sans-serif;
    font-size: 150px;
    width: 100vw;
    height: 150px;
    font-weight: 500;
    user-select: none;
    text-align: center;
    visibility: hidden;
  }

  #Numbers {
    font-family: sans-serif;
    font-weight: 500;
    font-size: 500px;
    width: 100vw;
    height: 500px;
    user-select: none;
    text-align: center;
    visibility: hidden;
  }

  #CountdownContainer {
    display: flex;
    position: absolute;
    width: 100vw;
    height: 100vh;
    left: 0%;
    top: 0%;
    align-items: center;
    justify-content: center;
  }

  #NumbersContainer {
    display: flex;
    position: absolute;
    width: 100vw;
    height: 100vh;
    left: 0%;
    top: 0%;
    align-items: center;
    justify-content: center;
  }

  #AnswerField {
    visibility: hidden;
    display: flex;
    position: absolute;
    width: 100vw;
    height: 100vh;
    left: 0%;
    top: 0%;
    align-items: center;
    justify-content: center;
  }

  #AnswerBox {
    width: 40%;
    height: 3%;
    font-size: 35px;
    visibility: hidden;
  }

  #EllipsesWarning {
    visibility: hidden;
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100vw;
    height: 100vh;
    background-color: #fefce8;
  }

  #EllipsesWarningText {
    color: #414240;
    font-family: sans-serif;
    font-size: 100px;
  }
</style>