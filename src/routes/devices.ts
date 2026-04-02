import { Router } from "express";
import { DeviceService } from "../services/DeviceService";

const r = Router();

r.get("/pond/:pondId", (req,res)=>res.json({devices:DeviceService.listByPond(req.params.pondId)}));

r.post("/:id/control", (req,res)=>{ const action=req.body.action; if(action!=="on"&&action!="off") return res.status(400).json({message:"invalid action"}); const device=DeviceService.control(req.params.id,action); if(!device) return res.status(404).json({message:"device not found"}); res.json({device}); });

export default r;

