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
  </div>
</template>


<script>
  const fs = require('fs');

  export default ({
    mounted() {
      const gameSettingsFilePath = './../../assets/communication/gamemode.txt'
      let interval = 3000;
      let digits = 2;
      let count = 3;
      let countdown = 3;
      let answerTime = 6000;
      let mode = 1;
      let minimumNumber = 0;
      let maximumNumber = 0;
      let colorOfText = '#08fe03';
      let colorOfCountdown = '#ffffff'
      const CountdownPointer = document.querySelector('#Countdown');
      const NumbersPointer = document.querySelector('#Numbers');
      const AnswerBoxPointer = document.querySelector('#AnswerBox');
      
      NumbersPointer.style.color = colorOfText; 
      CountdownPointer.style.color = colorOfCountdown;

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

      document.addEventListener('keydown', function(event) {
        if (event.code == "Enter" || event.code == "Space") {
          SpaceEnterKeyPressed();
        }
      });

      function GetRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      function delay(duration) {
        return new Promise((resolve) => {
          setTimeout(resolve, duration);
        });
      }

      function SpaceEnterKeyPressed() {
        if (mode == 1 || mode == 3) {
          StartTest();
        }
      }

      async function StartTest() {
        let sum = 0;
        mode = 2;

        for (let i=0; i<countdown; i++) {
          CountdownPointer.innerHTML = 3-i;
          await delay(1000);
        }
        CountdownPointer.innerHTML = "";

        for (let i=0; i<count; i++) {
          let number = GetRandomNumber(minimumNumber, maximumNumber);
          sum += number;
          NumbersPointer.innerHTML = number;
          await delay(interval/2);
          NumbersPointer.innerHTML = "";
          await delay(interval/2);
        }
        AnswerBoxPointer.style.visibility = 'visible';
        document.getElementById('AnswerBox').value = '';
        
        await delay(answerTime);
        let userInput = document.getElementById('AnswerBox').value;
        let answer = sum;

        if (userInput == answer) {
          alert("Correct Answer");
        }
        else {
          alert("Incorrect, the correct answer was " + answer);
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
  }

  #Numbers {
    font-family: sans-serif;
    font-weight: 500;
    font-size: 500px;
    width: 100vw;
    height: 500px;
    user-select: none;
    text-align: center;
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
</style>