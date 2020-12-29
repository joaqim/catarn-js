import { Server, Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";

export interface IUser {
  id: string;
  name: string;
}

const defaultUser: IUser = {
  id: "anon",
  name: "Anonymous",
};

/*
export interface IMessage {
  user: IUser;
  id: string;
  time: Date;
  value: string;
}

const sendMessage = (socket: Socket | Server) => (message: IMessage) =>
  socket.emit("message", message);
  */

export default (io: Server) => {
  const users: Map<Socket, IUser> = new Map();

  io.use(async (socket, next) => {
    next();
  });

  io.on("connection", (socket) => {
    socket.emit("userConnected", { id: uuidv4() });
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
    socket.on("disconnect", () => {
      users.delete(socket);
    });
  });
};
