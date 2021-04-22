const calculator = {
    displayValue:"0",
    firstOperand:null,
    waitingForSecondOperand:false,
    operator:null
};
//step3
function inputDigit(digit){

    const {displayValue, waitingForSecondOperand} = calculator;
    
    if(waitingForSecondOperand === true){
      calculator.displayValue = digit;
      calculator.waitingForSecondOperand = false;
    } else{
        // Overwrite `displayValue` if the current value is '0' otherwise append to it
  calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
    
  
  console.log(calculator);
}
//step4
function inputDecimal(dot){

if(calculator.waitingForSecondOperand === true){
  calculator.displayValue = "0";
  calculator.waitingForSecondOperand = false;
  return;
}


  // If the `displayValue` property does not contain a decimal point
  if(!calculator.displayValue.includes(dot)){
  // Append the decimal point
    calculator.displayValue += dot;
  };
};
//step5 handle operator

function handleOperator(nextOperator){
   // Destructure the properties on the calculator object
   const { firstOperand, displayValue, operator } = calculator
   // `parseFloat` converts the string contents of `displayValue`
   // to a floating-point number
   const inputValue = parseFloat(displayValue);
if(operator && calculator.waitingForSecondOperand){
  calculator.operator = nextOperator;
  console.log(calculator);
return;
}





  // verify that `firstOperand` is null and that the `inputValue`
  // is not a `NaN` value
  if(firstOperand === null && !isNaN(inputValue)){
    // Update the firstOperand property
    calculator.firstOperand = inputValue;
  } else if(operator){
    const result = calculate(firstOperand,inputValue,operator);
    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }
calculator.waitingForSecondOperand = true;
calculator.operator = nextOperator;

console.log(calculator);
}
// step 6 When the user hits an operator after entering the second operand

function calculate(firstOperand,secondOperand, operator){

  if(operator === "+"){
    return firstOperand + secondOperand;
  } else if(operator === "-"){
    return firstOperand - secondOperand;
  } else if(operator === "*"){
    return firstOperand * secondOperand;
  } else if(operator === "/"){
    return firstOperand / secondOperand;
  }
  return secondOperand;
}
// step 7 Reset the calculator

function resetCalculator(){
calculator.displayValue = "0";
calculator.firstOperand = null;
calculator.waitingForSecondOperand = false;
calculator.operator = null;
console.log(calculator);

}

//step1
function updateDisplay(){
      // select the element with id of `calculator-screen`
      const display = document.getElementById("calculator-screen");
      // update the value of the element with the contents of `displayValue`
      display.innerText  = calculator.displayValue;
};

updateDisplay();

//step2
const keys = document.querySelector(".grid-container");

keys.addEventListener("click",(event)=>{
// Access the clicked element
const { target } = event;
//console.log(target);
  // Check if the clicked element is a button.
  // If not, exit from the function
if(!target.matches("button")){
    return;
}

if(target.classList.contains("operator")){
    //console.log("operator",target.innerText);
    handleOperator(target.value);
    updateDisplay();
    return;
}

if(target.classList.contains("decimal")){
    //console.log("operator",target.innerText);
    inputDecimal(target.value);
    updateDisplay();
    return;
}
if (target.classList.contains('all-clear')) {
   // console.log('clear', target.innerText);
   resetCalculator();
   updateDisplay();
    return;
  }

  //console.log('digit', target.innerText);
  inputDigit(target.innerText);

  updateDisplay();
});