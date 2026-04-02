import { Server } from "ws";
import { PondService } from "../services/PondService";

export function initSocket(server:any){
  const wss = new Server({server});
  wss.on("connection", (socket)=>{
    const send = () => socket.send(JSON.stringify({type:"realtime", ponds:PondService.list()}));
    send();
    const timer = setInterval(send,5000);
    socket.on("close",()=>clearInterval(timer));
  });
}

