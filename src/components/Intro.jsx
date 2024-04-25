import React from "react";


export default function Intro( { setQuizStarted, setAmount, setDifficulty, setCategory } ) {
    

    function startQuiz() {
        setQuizStarted(true);
    }

    
    return (
        <>
            <h1 className="intro-title">Quizzical</h1>
            <h2 className="intro-descr">Play the best Quizzes right now!</h2>
            
            <div className="div-select">
                <label htmlFor="category">Choose the quiz category:</label>
                <select id="category" name="category" size="1" onChange={ e => setCategory(e.target.value) }>
                    <option value="">Any Category</option>
                    <option value="9">General Knowledge</option>
                    <option value="12">Music</option>
                    <option value="14">Television</option>
                    <option value="15">Video Games</option>
                    <option value="17">Science & Nature</option>
                    <option value="22">Geography</option>
                    <option value="23">History</option>
                    <option value="27">Animals</option>
                </select>
            </div>

            <div className="div-select">
                <label htmlFor="difficulty">Choose difficulty:</label>
                <select id="difficulty" name="difficulty" size="1" onChange={ e => setDifficulty(e.target.value) }>
                    <option value="">Any</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>

            <div className="div-select">
                <label htmlFor="amount">Choose the number of questions:</label>
                <select id="amount" name="amount" size="1" on onChange={ e => setAmount(e.target.value) }>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>

            <button className="intro-btn-start" onClick={startQuiz}>Start Quiz</button>
        </>
    );
}
