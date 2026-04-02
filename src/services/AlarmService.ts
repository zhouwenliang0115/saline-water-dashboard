import { Alarm } from "../models/Alarm";
import { DB } from "../config/database";
import { PondService } from "./PondService";

export const AlarmService = {
  list() { return Array.from(DB.alarms.values()); },
  create(pondId:string, level:"warn"|"critical", message:string){ const alarm: Alarm={id:`alarm-${Date.now()}`, pondId, level, message, timestamp:new Date().toISOString(), acknowledged:false}; DB.alarms.set(alarm.id, alarm); return alarm; },
  ack(id:string){ const a = DB.alarms.get(id); if (!a) return null; a.acknowledged = true; DB.alarms.set(id,a); return a; },
  checkAuto() {
    PondService.list().forEach((p)=>{
      if(p.status === "alert") this.create(p.id, "critical", `${p.name} 传感异常: 温度 ${p.temperature}℃ PH ${p.ph}`);
      else if(p.status==="warn") this.create(p.id,"warn",`${p.name} 状态警告: 关注指标`);
    });
  }
};

