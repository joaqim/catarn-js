import { Map } from "immutable";
import React, { useState, useEffect, PureComponent } from "react";
import { IDice, ICount } from "../../socket";
import DiceGraph from "./DiceGraph";

const DiceGraphContainer = ({ socket }) => {
  //export default class DiceGraph extends  PureComponent {
  const [counts, setCounts] = useState(Array());
  const [dices, setDices] = useState(Array());
  useEffect(() => {
    const diceListener = (dice: IDice) => {
      const count: ICount = { value: dice.x + dice.y, count: dice.count };
      let newCounts = counts;
      counts.push(count);
      setCounts(newCounts);

      let newDices = dices;
      newDices.push(dice);
      setDices(newDices);
    };

    const countListener = (count: ICount) => {
      setCounts([...counts, ...[count]]);
    };

    socket.on("dice", diceListener);
    socket.on("count", countListener);

    return () => {
      socket.off("dice", diceListener);
      socket.off("count", countListener);
    };
  }, [socket]);

  return (
    <div>
      <button
        onClick={() => {
          socket.emit("rollDice", 5);
        }}
      >
        Roll
      </button>
      <DiceGraph counts={counts} dices={dices} />
    </div>
  );
};
export default DiceGraphContainer;
