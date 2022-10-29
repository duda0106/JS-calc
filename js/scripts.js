const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const button = document.querySelectorAll("#button-container button");

class calculator{
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    //adicionar digito na tela da calculadora
    addDigit(digit) {
        //verificar se tem ou não ponto
        if(digit === "." && this.currentOperationText.includes(".")){
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();
    }

    //Todas operações da Calculadora
    processOperation(operation) {
        //verificar se current está vazio
        if(this.currentOperationText.innerText === "") {
            //mudar operação
            if(previousOperationText.innerText !== "") {
                this.changeOperatiopn(operation);
            }
            return;
        }
        //pegar valores dos textos inseridos
        let operationValue
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch (operation) {
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            default:
                 return;
        }
    }

    //mudar valores na tela da calculadora
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ) {
          
          if(operationValue === null){
            this.currentOperationText.innerText += this.currentOperation;
          } else {
              //checar se o valor é zero, se for, colocar valor atual
              if(previous === 0) {
                  operationValue = current;
              }

              //adicionar valor atual no valor anterior
              this.previousOperationText.innerText = `${operationValue} ${operation}`;
              this.currentOperationText.innerText = "";
          }
    }

    //mudar operação matemática
    changeOperation(operation) {

        const mathOperations = ["*", "/", "+", "-"]

        if(!mathOperations.includes(operation)) {
            return
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }
}

const calc = new calculator(previousOperationText, currentOperationText);

button.forEach ((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if(+value >=0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});