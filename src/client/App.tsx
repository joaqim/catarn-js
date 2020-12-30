import React, { useEffect, useState, useContext } from "react";
import io from "socket.io-client";

import DiceGraph from "./components/DiceGraph";
import DiceGraphContainer from "./components/DiceGraphContainer";

export default () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(location.origin);
    setSocket(newSocket);
    newSocket.emit("dice", { x: 1, y: 1, count: 1 });
    return () => newSocket.close();
  }, []);

  return (
    socket && (
      <div>
        <DiceGraphContainer socket={socket} />
      </div>
    )
  );
};
