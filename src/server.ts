import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";
import pondsRouter from "./routes/ponds";
import devicesRouter from "./routes/devices";
import alarmsRouter from "./routes/alarms";
import { PondService } from "./services/PondService";
import { DeviceService } from "./services/DeviceService";
import { AlarmService } from "./services/AlarmService";
import { initSocket } from "./websocket/socketHandler";

const app = express();
app.use(cors());
app.use(bodyParser.json());

PondService.init(); DeviceService.init(); AlarmService.checkAuto();

app.use("/api/ponds", pondsRouter);
app.use("/api/devices", devicesRouter);
app.use("/api/alarms", alarmsRouter);

app.get("/api/health", (req,res)=>res.json({status:"ok"}));

const server = http.createServer(app);
initSocket(server);

const PORT = process.env.PORT || 4000;
server.listen(PORT, ()=>console.log(`Backend running on http://localhost:${PORT}`));

