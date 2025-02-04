let currentOperand="", prevOperand="", operator="";

function operate(){
    if(currentOperand==="" || prevOperand==="" || operator==="")
        return;
    let result;
    switch(operator){
        case "+":
            result=Number(prevOperand) + Number(currentOperand);
            break;
        case "-":
            result=Number(prevOperand) - Number(currentOperand);
            break;
        case "*":
            result=Number(prevOperand) * Number(currentOperand);
            break;
        case "/":
            if(Number(currentOperand) === 0) {
                currentOperand = "Error";
                prevOperand = "";
                operator = "";
                return;
            }
            result=Number(prevOperand) / Number(currentOperand);
    }
    currentOperand=String(result);
    prevOperand="";
    operator="";
}


function appendNumber(s){
    if(s==="." && currentOperand.includes(".")) return;
    if (currentOperand === "Error")
        currentOperand = "";
    currentOperand+=s;
}

function appendOperator(oper){
    if(currentOperand === "Error" || (prevOperand === "" && currentOperand === ""))
        return;
    if(prevOperand !== "" && currentOperand === ""){
        operator=oper;
        return;
    }
    if(operator!=="")
        operate();
    if(currentOperand !== "Error"){
        operator=oper;
        prevOperand=currentOperand;
        currentOperand="";
    }
}

function updateDisplay(){
    document.querySelector("div.currentScreen").textContent=currentOperand;
    document.querySelector("div.prevScreen").textContent=prevOperand+operator;
}

function del(){
    if(currentOperand==="" || currentOperand==="Error") return;
    currentOperand=currentOperand.slice(0, currentOperand.length-1);
}

function clear(){
    currentOperand="";
    prevOperand="";
    operator="";
}

function changeSign(){
    if(currentOperand==="")
        currentOperand="-";
    else{
        if(currentOperand==="-")
            currentOperand="";
        else
            currentOperand = String(-Number(currentOperand));
    }
}

function percent(){
    if(currentOperand==="") return;
    currentOperand = String(Number(currentOperand)*0.01);
}


document.querySelector("div.buttons").addEventListener('click', (e)=>{
    if(e.target.classList.contains("digit"))
        appendNumber(e.target.textContent);
    else if(e.target.classList.contains("operator"))
        appendOperator(e.target.textContent);
    else if(e.target.classList.contains("equal"))
        operate();
    else if(e.target.classList.contains("del"))
        del();
    else if(e.target.classList.contains("clear"))
        clear();
    else if(e.target.classList.contains("sign"))
        changeSign();
     else if(e.target.classList.contains("percent"))
        percent();
     updateDisplay();
});

const digits=['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const operators=["+", "-", "*", "/"];
document.addEventListener('keydown', (e)=>{
    if(digits.includes(e.key))
        appendNumber(e.key);
    else if(operators.includes(e.key)){
        if(e.key==="-" && currentOperand==="")
            appendNumber(e.key);
        else
            appendOperator(e.key);
    }
    else if(e.key==="Enter")
        operate();
    else if(e.key==="Backspace")
        del();
    updateDisplay();
});