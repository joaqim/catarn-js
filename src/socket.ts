import { Server, Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";

export interface IDice {
  x: number;
  y: number;
  count: number;
}
export interface ICount {
  value: number;
  count: number;
}

export interface IUser {
  id: string;
  name: string;
}

const defaultUser: IUser = {
  id: "anon",
  name: "Anonymous",
};

const sendDice = (socket: Socket | Server) => (dice: IDice) =>
  socket.emit("dice", dice);
const sendCount = (socket: Socket | Server) => (count: ICount) =>
  socket.emit("count", count);

export default (io: Server) => {
  // const users: Map<Socket, IUser> = new Map();

  /*
  io.use(async (socket, next) => {
    next();
  });
  */
  io.on("connection", (socket) => {
    socket.emit("userConnected", { id: uuidv4() });
    // tslint:disable-next-line:no-console
    console.log("User connected");
    io.on("rollDice", (value: number) => {
      // tslint:disable-next-line:no-console
      console.log("User rolled dice");
      const d: IDice = {
        x: 6,
        y: 6,
        count: value,
      };
      sendDice(io)(d);
    });

    /*
    socket.on("message", (value: string) => {
      const message: IMessage = {
        id: uuidv4(),
        time: new Date(),
        user: users.get(socket) || defaultUser,
        value,
      };

      messages.add(message);

      sendMessage(io)(message);

      setTimeout(() => {
        messages.delete(message);
        io.emit("deleteMessage", message.id);
      }, messageExpirationTimeMS);
    });
    */
  });
};
