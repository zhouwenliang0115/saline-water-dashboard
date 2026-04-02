import { Router } from "express";
import { PondService } from "../services/PondService";

const r = Router();

r.get("/", (req,res)=>res.json({ponds:PondService.list()}));

r.get("/:id", (req,res)=>{ const pond=PondService.get(req.params.id); if(!pond) return res.status(404).json({message:"not found"}); res.json({pond}); });

r.patch("/:id", (req,res)=>{ const updated=PondService.update(req.params.id, req.body); if(!updated) return res.status(404).json({message:"not found"}); res.json({pond:updated}); });

r.get("/:id/history", (req,res)=>{ res.json({history:PondService.historical(req.params.id)}); });

export default r;

