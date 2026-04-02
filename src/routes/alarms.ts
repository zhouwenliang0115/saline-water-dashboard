import { Router } from "express";
import { AlarmService } from "../services/AlarmService";

const r = Router();

r.get("/", (req,res)=>res.json({alarms:AlarmService.list()}));

r.post("/:id/ack", (req,res)=>{ const alarm=AlarmService.ack(req.params.id); if(!alarm) return res.status(404).json({message:"not found"}); res.json({alarm}); });

export default r;

