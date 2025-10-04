import { useState, type ChangeEvent, type MouseEvent } from "react";



export default function CustomSelect  ({ currentOption, options }: { currentOption: string, options: string[] } ) {
    const [ selectedOption, setSelectedOption ] = useState<string>(currentOption);
    const [ show, setShow ] = useState<boolean>(true);
    
      const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const value = e.currentTarget.value;
        setSelectedOption(value);
    }

    const handleDropdown = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const value = e.currentTarget.value;
    
    }
    return (
        <div className="c-select-container">
            <div className="c-select current-option c-option" data-value={selectedOption}>{selectedOption}</div>
            <div className={`c-option-container ${show ? 'show':'hide'}`}>
                {options.map((option, index) => (
                    <div key={index} className="c-select c-option">{option}</div>
                ))}
            </div>
        </div>
    
  );
}
