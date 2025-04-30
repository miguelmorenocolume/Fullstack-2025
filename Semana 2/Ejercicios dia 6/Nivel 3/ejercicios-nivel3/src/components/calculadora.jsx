import { useState } from 'react'
import './calculadora.css'

const btnValues = [
  [7, 8, 9, "DEL"],
  [4, 5, 6, "+"],
  [1, 2, 3, "-"],
  [".", 0, "/", "x"],
  ["RESET", "="],
]

const Calculadora = () => {

  const [result, setResult] = useState("0")

  const handleClick = (e) => {
    const value = e.target.getAttribute("value");
  
    switch (value) {
      case "DEL":
        setResult(result.slice(0, -1) || "0");
        break;
  
      case "+":
        setResult((prev) => (prev === "0" ? "" : prev) + "+");
        break;
  
      case "-":
        setResult((prev) => (prev === "0" ? "" : prev) + "-");
        break;
  
      case "/":
        setResult((prev) => (prev === "0" ? "" : prev) + "/");
        break;
  
      case "x":
        setResult((prev) => (prev === "0" ? "" : prev) + "*");
        break;
  
      case "RESET":
        setResult("0");
        break;
  
      case "=":
        try {
          setResult(eval(result.replace(/[^-()\d/*+.]/g, "")).toString());
        } catch {
          setResult("Error");
        }
        break;
  
      default:
        setResult((prev) => (prev === "0" ? value : prev + value));
        break;
    }
  }

  return (
    <div className='wrapper'>
      <div className='cal_title'>
        <span>calc</span>
      </div>
      <div className='cal_result mt-10'>
        <span>{result}</span>
      </div>
      <div className='cal_pad mt-10'>
        {
          btnValues.flat().map((item, i) => {
            return (
              <button className={`cal_btn 
              ${item == "DEL" ? 'del' : null}
              ${item == "RESET" ? 'del' : null}
              ${item == "=" ? 'eq' : null}
              `} value={item} key={i} onClick={handleClick}>{item} </button>
            )
          })
        }

      </div>
    </div>
  )
}

export default Calculadora