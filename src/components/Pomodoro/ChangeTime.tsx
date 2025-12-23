import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import type { TPomodoroMode, TPomodoroOptions } from "../../types/Pomodoro/types";
import type { Dispatch, SetStateAction } from "react";
import { clamp, parseTime } from "../../helpers";


export default function ChangeTime({ min, max, modeTime, isRunning, targetMode, setOptions, setRemaining }:{ min: number, max: number, modeTime: number, isRunning: boolean, targetMode: TPomodoroMode, setOptions: Dispatch<SetStateAction<TPomodoroOptions>>, setRemaining: Dispatch<SetStateAction<number>> }) {
    const ids = {
        label: `${targetMode.toLowerCase()}-label`,
        length: `${targetMode.toLowerCase()}-length`,
        decrement:`${targetMode.toLowerCase()}-decrement`,
        increment:`${targetMode.toLowerCase()}-increment`
    };
    const label = `${targetMode.toUpperCase()}-LENGTH`

    const changeTime = (increase=true) => {
    if (isRunning) return;
    const newTime = increase ? modeTime + 60 : modeTime - 60;
    const clamped = clamp(min, max, newTime);
    setOptions((prev) => {
        const newState = {...prev, [targetMode]: clamped };
        if (prev.lastMode === targetMode) {
            setRemaining(clamped);
        };
        return newState;
    });
    
    
  }

  return (

      <div className="background-primary border border-1">
        <div className="d-flex justify-content-center align-items-center gap-1">
          <button id={ids.decrement} className="btn btn-info" onClick={() => { changeTime(false) }}>
            <FaArrowDown/>
          </button>
            <h4 id={ids.length} className="my-0">{parseTime(modeTime)}</h4>  
          <button id={ids.increment} className="btn btn-info" onClick={() => { changeTime(true) }}>
            <FaArrowUp/>
          </button>
        </div>
        <span id={ids.label} className="basis-100 flex-grow-1 fw-bold">{label}</span>
      </div>
  )
}

