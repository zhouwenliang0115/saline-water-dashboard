import { Device } from "../models/Device";
import { DB } from "../config/database";

const makeSnapshot = (pondId:string, type:"cooler"|"aerator"|"pump"|"valve") : Device => ({id:`${pondId}-${type}`,pondId,type,name:`${pondId}-${type}`,status:"off",lastUpdated:new Date().toISOString()});

export const DeviceService = {
  init() {
    for (const pond of ["pond-1","pond-2","pond-3"]) {
      ["cooler","aerator","pump","valve"].forEach(type => {
        const d = makeSnapshot(pond,type as any);
        DB.devices.set(d.id,d);
      });
    }
  },
  listByPond(pondId:string){ return Array.from(DB.devices.values()).filter(d=>d.pondId===pondId); },
  control(deviceId:string, action:"on"|"off"){ const d=DB.devices.get(deviceId); if(!d) return null; d.status = action; d.lastUpdated = new Date().toISOString(); DB.devices.set(deviceId,d); return d; }
};

