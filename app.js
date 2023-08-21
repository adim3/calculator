

// store all information for what's number currently typed here what opereation is it and easiest way to do that use a class

// inside this class we're going to put a construector which is ging to take all inputs for it as well as all the functions for our calculator...

// our constructor is essentily take previous operand text element and our current operand  text elements

class Calculator{

    constructor(prevoperandRes,currentoperandRes){
        this.prevoperandRes = prevoperandRes;
        this.currentoperandRes = currentoperandRes;
        this.clear();
    }

    clear(){
       this.currentoperand = '';
       this.prevoperand = '';
       this.operation = undefined;
    }

    delete(){
     this.currentoperand = this.currentoperand.toString().slice(0,-1);
    }
    
    appendNumber(number){
        // we need only one decimal point (.)
        if(number === '.' && this.currentoperand.includes('.')) return;
      this.currentoperand = this.currentoperand.toString() + number.toString();
    }
     
    chooseOperations(operation){
    //when we click any operation button then content of current operand goes to prev operand section of display and current operand is empty to enter second operand
    if(this.currentoperand === '') return;
    if(this.prevoperand !== ''){
        this.conpute();
    }
      this.operation = operation;
      this.prevoperand = this.currentoperand;
      this.currentoperand = '';
    }

    conpute(){
     let res ;
     let prev = Number(this.prevoperand);
     const currnt = Number(this.currentoperand);
     if(isNaN(prev) || isNaN(currnt)) return;

       switch(this.operation){
        case '+':
            res = prev + currnt;
            break;
         case '-':
            res = prev - currnt;
            break;  
         case '*':
            res = prev * currnt;
            break;   
          case '/':
            res=prev / currnt;
            break;  
          default:
            return;     
       }
       this.currentoperand = res;
       this.prevoperand = '';
       this.operation = undefined;
    }

    updateDisplay(){
        this.currentoperandRes.innerText = this.currentoperand;
        if(this.operation != null){
            this.prevoperandRes.innerText = `${this.prevoperand} ${this.operation}`;
        }
         else
         this.prevoperandRes.innerText = '';
        
    }

}






const numberBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equal]');
const deleteBtn = document.querySelector('[data-delete]');
const clearBtn = document.querySelector('[data-all-clear]');

const prevoperandRes = document.querySelector('[data-prev-operand]');
const currentoperandRes = document.querySelector('[data-current-operand]');



const calculator = new Calculator(prevoperandRes,currentoperandRes)
// for listing which number is type and append it to display...
numberBtns.forEach(button =>{
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})
// for operation function....

operationBtns.forEach(button =>{
 button.addEventListener('click',()=>{
    calculator.chooseOperations(button.innerText);
    calculator.updateDisplay();
 })
})

// equal button..
equalsBtn.addEventListener('click', button =>{
 calculator.conpute();
 calculator.updateDisplay();
})

// for working AC buttons all clear....
 
clearBtn.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
})

// delete btn..
deleteBtn.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
  })
  