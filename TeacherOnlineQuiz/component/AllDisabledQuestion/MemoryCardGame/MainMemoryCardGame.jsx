import React from "react"
import MemoryCardGame from "./MemoryCardGame";
const data = {
    operation: "addition",
    type: "memory_card_game",
    rows: "1",
    cols: "4",
    questionName: "Number Fun",
    questionContent: [
      {
        row: 0,
        col: 0,
        image:
          '\u003cimg src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/DICE/Dice-01.png"\u003e',
        type: "1dice",
      },
      {
        row: 0,
        col: 1,
        image:
          '\u003cimg src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/DICE/Dice-08.png"\u003e',
        type: "2dice",
      },
      {
        row: 0,
        col: 2,
        image:
          '\u003cimg src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/DICE/Dice-15.png"\u003e',
        type: "3dice",
      },
      {
        row: 0,
        col: 3,
        image:
          '\u003cimg src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/DICE/Dice-24.png"\u003e',
        type: "6dice",
      },
      {
        row: 0,
        col: 4,
        image:
          '\u003cimg src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/DICE/Dice-29.png"\u003e',
        type: "5dice",
      },
      {
        row: 0,
        col: 5,
        image:
          '\u003cimg src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/ISL1Q10/ISL1Q10-Q3.png"\u003e',
        type: "2square",
      },
      {
        row: 0,
        col: 6,
        image:
          '\u003cimg src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/LogicalImages/ISL1Q3/ISL1Q3-C.png"\u003e',
        type: "1star",
      },
      {
        row: 0,
        col: 7,
        image:
          '\u003cimg src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/ISL1Q14/ISL1Q14-Q3.png"\u003e',
        type: "4yellow",
      },
    ],
  };
export default function MainMemoryCardGame()
{
    return <MemoryCardGame data={data} />}