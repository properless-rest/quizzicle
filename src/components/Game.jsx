import React from "react";

import Record from "./Record.jsx"

import { decode } from "he";


export default function Game( { setQuizStarted, amount, difficulty, category, setAmount, setDifficulty, setCategory } ) {
  
    function switchPlaying() {
        // this will switch rounds only when "play again" is clicked, bur not when "check answers" is clicked;
        if (!isPlaying) {
            setAnswers([]);  // reset the answers on new round start;
            setFetchedData(null);  // must reset FetcedData for proper reloading between rounds;
            setRoundSwitcher(!roundSwitcher);
        }
        // switch "playing" on every click
        setIsPlaying(!isPlaying);
    }

    function resetToIntro() {
        // reset these states manually, cause "onChange" for relevant input fields won't switch to default values;
        setAmount(5);
        setDifficulty("");
        setCategory("");
        // AFTER that, return to the Intro screen;
        setQuizStarted(false);
    }
    
    const [fetchedData, setFetchedData] = React.useState(null);
    const [isPlaying, setIsPlaying] = React.useState(true);  // this switches between selecting and checking correct answers;
    const [roundSwitcher, setRoundSwitcher] = React.useState(false);  // this reloads new questions on new round start;
    const [answers, setAnswers] = React.useState([]);
    React.useEffect( 
        () =>
        {
            async function fetchData() {
                try {
                    // console.log(`https://opentdb.com/api.php?amount=${amount}&type=multiple&difficulty=${difficulty}`)
                    const response = await fetch(
                        `https://opentdb.com/api.php?amount=${amount}&type=multiple&difficulty=${difficulty}&category=${category}`
                    );
                    if (!response.ok) {
                        fetchData();
                    }
                    const data = await response.json();
                    const transformedData = await data.results.map(
                        (record, index) => {
                            const incorrectOptions = ([...record.incorrect_answers]).map(
                                answer => (
                                    {
                                        questionIndex: index,
                                        body: decode(answer), 
                                        isCorrect: false
                                    }
                                )
                            );
                            const correctOption = 
                                {
                                    questionIndex: index,
                                    body: decode(record.correct_answer),
                                    isCorrect: true  
                                };
                            let options = [...incorrectOptions, correctOption];
                            options.sort( () => Math.random() - 0.5 ) // sort array based on a random value;
                            return {
                                question: decode(record.question),
                                options: options
                            }
                        }
                    );
                    setFetchedData(transformedData);
                } catch (error) {
                    console.error('There was a problem with the fetch operation:', error);
                    throw error;
                }
            }
            fetchData()
        },
        [roundSwitcher]
    )
    // don't form recordElements inside the fetchData; because of useEffect the "isPlaying" state won't be reloaded inside any <Record />;
    const recordElements = 
    fetchedData 
    ? 
    fetchedData.map(
        (record, index) => (
            <Record key={index} 
                    recordID={index} 
                    groupID={index} 
                    isPlaying={isPlaying} 
                    setAnswers={setAnswers} 
                    {...record}
            />
        )
    )
    : 
    <h2 className="fetch-loading">Loading data...</h2>;
    const finalElems = 
        isPlaying ?
        <button onClick={switchPlaying} className="btn-check">
            Check Answers
        </button>
        :
        <div className="div-score">
            <span className="score">You scored {answers.filter( answer => answer.isCorrect ).length}/{amount} answers</span>
            <button onClick={switchPlaying} className="btn-replay">
                Play again
            </button>
        </div>
    ;
    const btnToIntro = <button className="btn-to-index" onClick={resetToIntro}>&#x2190; To starting page</button>
    return (
        <>  
            { fetchedData &&  btnToIntro}
            { recordElements }
            { fetchedData && finalElems }
        </>
    );

}
