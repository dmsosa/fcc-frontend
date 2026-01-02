import { useState, type MouseEvent } from "react";
const KEYS = ['7','8','9','4','5','6', '1','2','3', '+/-', '0', '.'];
const OPERATIONS  = ['+','-','x','÷', '='];
const ACTIONS = ['%', 'AC', '<', '1/x', 'x^2', 'sqr'];
const MAX_DIGIT_LENGTH = 25;
const isOperation = /([x/+\-÷])/ ,endsWithOperation = /[x+\-/÷]$/;

//Ersts, input als undefinded setzen
function CalculatorApp() {
  const [input, setInput] = useState<string>('0');
  const [display, setDisplay] = useState<string>('0');
  const [evaluated, setEvaluated] = useState<boolean>(false);

  const maxDigitWarning = () =>  {
      setInput("Digit Limit Met");
      setTimeout(() => {
        setInput(input);
      }, 1000 )      
    }
  const evalErrorMessage = () =>  {
      setInput("Error");
      setTimeout(() => {
        if (input !== 'Error') setInput(input);
      }, 1000 )      
    }
  const handleDigit = (e: MouseEvent<HTMLButtonElement>) => {
    if (!input.includes('Error') && !input.includes('Limit') ) {
      if (input.length > MAX_DIGIT_LENGTH) {
        maxDigitWarning();
        return;
      }
      const digit = e.currentTarget.dataset.value;
      if (!digit) return;
      //Wenn berechnet, starten sie ein neues Input an: Input is gleich nummer, das Display ist gleich Input wenn es nicht 0 ist.
      if (input === "0" && digit === "0") return;
      if (evaluated) {
        setInput(digit);
        setDisplay(digit);
      } else {
          setInput((prev) => prev === "0" ? digit : isOperation.test(prev) ? digit : prev + digit);
          setDisplay((prev) => prev === "0" ? digit : prev + digit);
      }
      setEvaluated(false);
    }
  };
  const handleDecimal = (e: MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.dataset.value;
    if (!value || value !== '.') return;
    if (!input.includes('.') && !input.includes('Limit') && !input.includes('Error')) {
      //Prufen, ob das Grenzen nicht erreicht ist
      if (input.length > MAX_DIGIT_LENGTH) {
        maxDigitWarning();
        return;
      }
      setEvaluated(false);
      if (evaluated) {
          setInput((prev) => (prev === '0' ? '0.' : prev + '.'));
          setDisplay((prev) => (prev === '' ? '0.' : prev + '.'));
        } else {
          setInput((prev) => (prev === '0' || isOperation.test(prev) ? '0.' : prev + '.'));
          setDisplay((prev) => (prev === '0' ? '0.' : endsWithOperation.test(prev) ? prev + '0.' : prev + '.'));
        }
        };
  };

  const reset = () => {
    setInput('0');
    setDisplay('0');
    setEvaluated(false);
  };
//Wenn click, setOperation, setPrevInput to currInput
//setInput('')
//
  const handleOperation = (e: MouseEvent<HTMLButtonElement>) => {
    const pressedKey = e.currentTarget.dataset.value;
    if (!pressedKey) return;
    //Wenn berechnet, starten sie ein neues Input an: Input is gleich nummer, das Display ist gleich Input wenn es nicht 0 ist.
    setInput(pressedKey);
    setEvaluated(false);
    // Prufen, ob es schon berechnet ist,
    //Ja ? dann setzen Input und Formel an.
    //Nein ? dann prufen, ob es bein Negatives Zeichnen endest.
    if (evaluated ) { setDisplay(input + pressedKey); return;};
    if (!endsWithOperation.test(display)) { setDisplay((prev) => prev + pressedKey); return; };
    //Es hat ein Operation am Ende des Strings, dann sollen wir prufen, ob aktuelles pressedKey minus ist.
    if (pressedKey === '-')  {
      //Erlauben Sie nicht, mehr als zwei minus Zeichnen nacheinander zu folgen

      if (['x', '÷', '/', '+', '-'].includes(display[display.length - 1]) && ['x', '÷', '/', '+', '-'].includes(display[display.length - 2])) return;
      setDisplay((prev) => prev + pressedKey);
    } else {
      //Es konnte passieren, dass unsere Display ein Operation (+, -, /, x) oder zwei (+-, --, /-, etc... haben) am Ende hat, also entfernen sie allen, um sie zu substituieren
      const numbers = /[0-9]+/g;
      const numbersPart = numbers.exec(display);
      if (!numbersPart) return;
      setDisplay(numbersPart + pressedKey);
    }

    
  };

  const handleActions = (e: MouseEvent<HTMLButtonElement>) => {
    const action = e.currentTarget.dataset.value;
    switch (action) {
      case '%': ; handlePercentage(); break;
      case 'AC': reset(); break;
      case '<': handleDelete(); break;
      case '1/x': ; break;
      case 'x^2':  ; break;
      case 'sqr': ; break;
      default: return;
    }

  };

  const handleEvaluate = () => {
    if (!evaluated && !input.includes('Limit')) {
      let expression = display;
      let result: number | undefined;
      for (; endsWithOperation.test(expression);  ){
        //Alle Zeichnen von Ende entfernen.
        expression = expression.slice(0, -1)
      };
      try {
        result = eval(expression.replace(/x/g, "*").replace(/÷/g, "/").replace(/-/g, "-").replace(/--/g,'+'));
      } catch (e) {
          evalErrorMessage();
          console.warn('Error bei rechnung:' + e);
          return;
      }
      setInput(String(result));
      setDisplay(`${expression}=${result}`);
      setEvaluated(true);
    }
  };

  const handleDelete = () => {
    if (input !== '0' && !input.includes('Limit') && !input.includes('Error')) {
      setInput(input.length === 1 ? '0' : input.slice(0,-1));
    }
  }
  const handlePercentage = () => {
    if (input !== '0' && !input.includes('Limit') && !input.includes('Error')) {
      setInput(String(parseFloat(input)/100));
    }
  }


  

  return (
    <section className="container-fluid vh-100 bg-body-secondary d-flex justify-content-center align-items-center">
      <div className="calculator position-relative border border-width-1 border-primary">
          <div className="calculator--display">
            <h2 className="text-secondary">{display}</h2>
            <h1 className="">{input}</h1>
          </div>
          <div className="calculator--keys">
            <div className="calculator--keys--symbols">
              {ACTIONS.map((action) => (
                <button className="g-col btn btn-secondary rounded-0" key={action} onClick={handleActions} data-value={action}>
                  {action}
                </button>
              ))}
              </div>
              <div className="calculator--keys--digits">
                {KEYS.map((key) => (
                <button className="g-col btn btn-secondary rounded-0" key={key} onClick={key === '.' ? handleDecimal : key === '+/-' ? handleDigit : handleDigit} data-value={key}>
                  {key}
                </button>
                ))}
              </div>
              
              <div className="calculator--keys--operations">
                {OPERATIONS.map((op) => (
                  <button data-value={op} className={`btn btn-info rounded-0 ${op === '=' ? '' : 'g-col'}`} key={op} onClick={op === '=' ? handleEvaluate : handleOperation}>
                    {op}
                  </button>
                ))}
              </div>
          </div>
        </div>
    </section>
    
  );
}

export default CalculatorApp;

