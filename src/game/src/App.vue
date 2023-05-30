<template>
  <div id="App">
    <div class="Page" id="StartPage">
      <div id="StartPageMain">
        <div class="StartPageObject" id="PickerContainer">
          <div class="PickerContainers" id="DigitsPickerContainer">
            <input class="Picker" id="DigitsPicker" type="text">
            <div class="PickerText" id="DigitsText">digits</div>
          </div>
          <div class="PickerContainers" id="NumberPickerContainer">
            <input class="Picker" id="NumberPicker" type="text">
            <div class="PickerText" id="NumberText">numbers</div>
          </div>
          <div class="PickerContainers" id="IntervalPickerContainer">
            <input class="Picker" id="IntervalPicker" type="text">
            <div class="PickerText" id="IntervalText">seconds</div>
          </div>
        </div>
        <div class="StartPageObject" id="PickerInfoBar">
          <div class="PickerInfoBarObject" id="DigitsInfo">Number of Digits</div>
          <div class="PickerInfoBarObject" id="NumbersInfo">Number of Displayed Numbers</div>
          <div class="PickerInfoBarObject" id="IntervalInfo">Interval between Numbers</div>
        </div>
        <div class="StartPageObject" id="InformationDisplay">Information Display</div>
      </div>
      <div class="StartPageRedirect" id="StartPageStartPageRedirect">Start Screen</div>
    </div>
    <div class="Page" id="ConfirmPage">
      <div class="ConfirmPageObject" id="ConfirmInformation"></div>
      <div class="ConfirmPageObject" id="EplipsyWarning"></div>
      <div class="StartPageRedirect" id="ConfirmPageStartPageRedirect"></div>
    </div>
    <div class="Page" id="GamePage"></div>
    <div class="Page" id="GuessPage"></div>
    <div class="Page" id="CorrectPage"></div>
    <div class="Page" id="IncorrectPage"></div>
  </div>
</template>


<script>
  export default ({
    mounted() {
      let mode = 1;  // 1: start screen, 2: confirm screen, 3: game screen, 4: guessing screen, 5: result screen

    },
  })
</script>

<style>
  body {
    margin: 0px;
  }

  .Page {
    visibility: hidden;
    margin: 0px;
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  #StartPage {
    visibility: visible;
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
    font-size: 27px;
    color: #2c2c2c;
    user-select: none;
  }

  #PickerInfoBar {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 170px;
    margin: 0px;
    overflow: hidden;
    width: 100vw;
    height: 120px;
    background-color: #c4c0c3;
  }

  .PickerInfoBarObject {
    color: #2c2c2c;
    font-family: sans-serif;
    font-size: 20px;
    user-select: none;
  }

  #InformationDisplay {
    width: 100vh;
    text-align: center;
    color: #3c66bc;
    font-family: sans-serif;
    font-size: 20px;
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
</style>
