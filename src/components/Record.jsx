import React from "react";


function Record( { recordID, groupID, question, options, isPlaying, setAnswers } ) {
    
    function updateCorrectAnswers(e) {
        if (isPlaying) {
            const relevantBody = document.getElementById(e.target.htmlFor).value;
            const relevantOption = options.find( option => option.body === relevantBody );
            setAnswers(
                prevAnswers => 
                {   
                    // JS syntax allow to push an element to any spot, even if there's no previous element inside it;
                    prevAnswers[relevantOption.questionIndex] = relevantOption;
                    return prevAnswers;
                }
            );
            
        }
    }
    
    const [opt1, opt2, opt3, opt4] = options;
    return (
        <div className="record">
            <h3 className="question">{question}</h3>
            <div className="options-container">
                <input 
                    type="radio" 
                    name={`group${groupID}`} 
                    id={`record${recordID}option1`} 
                    value={opt1.body}
                    disabled={!isPlaying}
                    className={!isPlaying && opt1.isCorrect ? "correct-option": ""}
                />
                <label 
                    htmlFor={`record${recordID}option1`} 
                    onClick={ (e) => {updateCorrectAnswers(e)} }
                    >
                    {opt1.body}
                </label>
                <input 
                    type="radio" 
                    name={`group${groupID}`} 
                    id={`record${recordID}option2`} 
                    value={opt2.body}
                    disabled={!isPlaying}
                    className={!isPlaying && opt2.isCorrect ? "correct-option": ""}
                />
                <label 
                    htmlFor={`record${recordID}option2`}
                    onClick={ (e) => {updateCorrectAnswers(e)} }
                    >
                    {opt2.body}
                </label>
                <input 
                    type="radio" 
                    name={`group${groupID}`} 
                    id={`record${recordID}option3`} 
                    value={opt3.body}
                    disabled={!isPlaying}
                    className={!isPlaying && opt3.isCorrect ? "correct-option": ""}
                />
                <label 
                    htmlFor={`record${recordID}option3`}
                    onClick={ (e) => {updateCorrectAnswers(e)} }
                    >
                    {opt3.body}
                </label>
                <input 
                    type="radio" 
                    name={`group${groupID}`} 
                    id={`record${recordID}option4`} 
                    value={opt4.body}
                    disabled={!isPlaying}
                    className={!isPlaying && opt4.isCorrect ? "correct-option": ""}
                />
                <label 
                    htmlFor={`record${recordID}option4`}
                    onClick={ (e) => {updateCorrectAnswers(e)} }
                    >
                    {opt4.body}
                </label>
            </div>
            <hr className="record-separator" />
        </div>
    );
}

export default Record;
