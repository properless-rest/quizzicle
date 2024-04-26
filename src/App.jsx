import React from "react";

import Game from "./components/Game.jsx"
import Intro from "./components/Intro.jsx"


function App() {
  const [modalVisible, setModalVisible] = React.useState(false);  // modal showing when not enough data in the DB;
  const [quizStarted, setQuizStarted] = React.useState(false);
  const [category, setCategory] = React.useState("");
  const [difficulty, setDifficulty] = React.useState("");
  const [amount, setAmount] = React.useState(5);
  return (
      <main className={ quizStarted ? "game-main" : "intro-main" }>
          {
              quizStarted ?
              <Game
                setModalVisible={setModalVisible} 
                setQuizStarted={setQuizStarted}
                setAmount={setAmount} 
                setDifficulty={setDifficulty} 
                setCategory={setCategory}
                amount={amount} 
                difficulty={difficulty} 
                category={category}
              />
              :
              <Intro 
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                setQuizStarted={setQuizStarted} 
                setAmount={setAmount} 
                setDifficulty={setDifficulty} 
                setCategory={setCategory} 
              />
          }
      </main>
  );
}

export default App
