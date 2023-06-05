
import styles from "./custom.module.css";
import { useEffect, useState, useRef } from "react";
import SingleCard from "./components/SingleCard";
function MemoryCardGame({data}) {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disable, setDisable] = useState(false);
  const [time, setTime] = useState(0);
  const reff = useRef();

  const cardImages = data.questionContent.map((item) => {
    return { src: item.image };
  });
  const shuffleCards = () => {
    const shuffle = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random(), matched: false }));
    setCards(shuffle);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
    setTime(0);
    if (reff.current) {
      clearInterval(reff.current);
    }
    timeStart();
  };
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };
  // compare
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisable(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        reset();
      } else {
        setTimeout(() => reset(), 1000);
      }
    }

    const arrTF = cards.map((e) => e.matched);
    if (arrTF.includes(false)) {
    } else {
      clearInterval(reff.current);
    }
  }, [choiceOne, choiceTwo]);
  const reset = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
    setDisable(false);
  };
  useEffect(() => {
    shuffleCards();
  }, []);
  const timeStart = () => {
    reff.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  };
  return (
    <div>
      <div className={styles.time}>
        Time: &nbsp;
        {time < 60
          ? `0 min : ${time}seconds`
          : `${Math.floor(time / 60)} min : ${time % 60}seconds`}
      </div>
      <div className={styles.moves}>No of moves: {turns}</div>
      {/* <div className={styles.main}> */}
      <div className={styles.grid}>
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disable}
          />
        ))}
      </div>
      {/* </div> */}
    </div>
  );
}

export default MemoryCardGame;