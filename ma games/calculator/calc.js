const allbuttons = document.getElementById("allbuttons");
const original = allbuttons.querySelector("#original");
const expansion = allbuttons.querySelector("#expansion");
const ogbutton = original.getElementsByClassName("ogbutton");
const expbutton = expansion.getElementsByClassName("expbutton");
const specialbutton = expansion.getElementsByClassName("specialbutton");

const ansbutton = document.getElementById("ansbutton");
const evalbutton = document.getElementById("evalbutton");
const delbutton = document.getElementById("delbutton");
const textbox = document.getElementById("textbox");

let previousEq = ""; 
const numbers = ['1','2','3','4','5','6','7','8','9','0']
const allowedletters = ['l','o','g','n','e','s','i','c','t','a'];
const allowedcharacters = ['!','%','^','*','(',')','-','+','=','{','}','/','[',']',',','.','<','>',' ', '\b'];



/***** ALL EVENT LISTENERS *****/
// adds functionality to all valid keypresses to add to display
document.addEventListener('keydown', function(event){
    if (document.activeElement != textbox) {
        if(allowedcharacters.includes(event.key) || numbers.includes(event.key) || allowedletters.includes(event.key)){
            event.preventDefault();
            addToDisplay(event.key); 
        } else if (event.key == 'Backspace' && document.activeElement == textbox){
            addToDisplay('\b');
        }
    } else {
        if(!allowedcharacters.includes(event.key) && !numbers.includes(event.key) && !allowedletters.includes(event.key)){
            event.preventDefault();
        }
    }
});

//adds functionality for special function keys
document.addEventListener('keydown', function(event) {
    if (event.key == 'Tab') {
        event.preventDefault(); 
        clearDisplay(); 
    }else if (event.key == 'Enter'){
        event.preventDefault(); 
        clearDisplay(); 
    } else if (event.key == 'Backspace'){
        if(document.activeElement != textbox){
            backspace(); 
        }
    }
});

// disallows the addition of any non-mathematical symbols to the display 
textbox.addEventListener('input', function(event) {
    const blockedcharacters = /[qwryupdfhjk;zxvbm@#$&_|:;'"<>?]/g;
    textbox.value = textbox.value.replace(blockedcharacters, '');
});

// adds functionality for 3 buttons above display bar 
delbutton.addEventListener('click', () => backspace());
ansbutton.addEventListener('click', () => clearDisplay()); 
evalbutton.addEventListener('click', function() {
    previousEq = textbox.value; 
    clearDisplay();
    addToDisplay(breakdown(previousEq));
});

// adds functionality to all other clickable buttons on webpage
Array.from(ogbutton).forEach(button => {
    button.addEventListener('click', function() {
        if(this.innerHTML == 'C'){
            clearDisplay();
        } else {
            addToDisplay(this.innerHTML);
        }
    }); 
}); 
Array.from(expbutton).forEach(button => {
    button.addEventListener('click', function() {
        addToDisplay(this.innerHTML)
    });
});
Array.from(specialbutton).forEach(button => {
    button.addEventListener('click', function() {
        if(this.innerHTML != 'n√'){
            addToDisplay(this.innerHTML + "(");
        } else { 
            addToDisplay("{n}√(");
        }
    })
});


/***** ALL FUNCTIONS *****/

// functions for all display changes 
function addToDisplay(character){
    textbox.value += character; 
}
function clearDisplay(){
    textbox.value = ""; 
}
function backspace(){
    textbox.value = textbox.value.substring(0, textbox.value.length-1);
}
function validExpression(){

}

// function which separates operators from numbers and returns them all as an array of components 
function breakdown(expression){
    let components = []; 

    for(let i = 0; i < expression.length; i++){
        let statement = ""; 
        let curr = expression.charAt(i); 

        if(allowedcharacters.includes(curr)){ // checks if current character is a special symbol
            statement = curr;
            components.push(statement);
        } else if (numbers.includes(curr)){ // checks if current character is a number
            statement += curr;

            for(let j = i+1; j < expression.length; j++, i++){
                let currinNum = expression.charAt(j);
                if(currinNum.charCodeAt(0) >= 48 && currinNum.charCodeAt(0) <= 57){
                    statement += currinNum; 
                } else { 
                    break; 
                }
            }

            components.push(statement);
        } else { // skips over if it is any other character 
            i++; 
        }
        // STILL NEED TO IMPLEMENT SEPARATORS THAT ARE MULTI-CHARACTERED (ex. log, ln, sin, etc.) 
    }
    
    return components;
}

// function which sieves through the broken down array and evaluates said pieces in the correct PEMDAS order
function pemdas(compArray){
   // parenthesis 

   // exponents

   // multiplication / division

   // addition / subtraction
}

// function which decides which simple operational function is called for each smaller expression(s)
function evaluate(expression){
    if(expression){

    }
}

// all single operational functions
function add(n1, n2){
    return n1 + n2; 
}
function subtract(n1, n2){
    return n1 - n2;
}
function multiply(n1, n2){
    return n1 * n2; 
}
function divide(n1, n2){
    return n1 / n2;
}
function sqroot(num){

}
function nthroot(root, num){

}
function exponent(base, power){

}
function factorial(num){
    let ans = 1; 

    for(let i = num; i >= 1; i--) {
        ans *= i; 
    }

    return ans; 
}
function log(base, num){

}
function natlog(num){

}
function sin(num){

}
function cos(num){

}
function tan(num){

}