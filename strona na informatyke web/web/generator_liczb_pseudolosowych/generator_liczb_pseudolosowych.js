let generateBtn = document.getElementById("generate");

function randomNum(){
  let min = document.getElementById("min");
  let max = document.getElementById("max");
  let minValue = Number(min.value);
  let maxValue = Number(max.value);
  //console.log(minValue, maxValue);// do usuniecia
  if(minValue > maxValue) {
    [minValue, maxValue] = [maxValue, minValue];
    min.value = minValue;
    max.value = maxValue;
  }
  let num = Math.floor(Math.random() * (maxValue - minValue + 1))+minValue;
  document.getElementById("result").innerText = num;
}
window.addEventListener("load", randomNum());
generateBtn.addEventListener("click", randomNum);