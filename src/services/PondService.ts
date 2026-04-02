import { Pond } from "../models/Pond";
import { DB } from "../config/database";

const makeStatus = (p: Pond): "normal"|"warn"|"alert" => {
  if (p.temperature > 30 || p.dissolvedOxygen < 4 || p.ph<6.5 || p.ph>9) return "alert";
  if (p.temperature > 27 || p.dissolvedOxygen < 5 || p.ph<7 || p.ph>8.5) return "warn";
  return "normal";
};

export const PondService = {
  init() {
    const base = [
      {id:"pond-1",name:"盐碱池1",area:"A区",lon:116.38,lat:39.9},
      {id:"pond-2",name:"盐碱池2",area:"A区",lon:116.385,lat:39.905},
      {id:"pond-3",name:"盐碱池3",area:"B区",lon:116.39,lat:39.895}
    ];
    base.forEach((item)=>{
      const p: Pond = {...item, ph:7.3,temperature:26.5,conductivity:650,dissolvedOxygen:6.2,nh3:0.42,turbidity:15,updatedAt:new Date().toISOString(),status:"normal"};
      DB.ponds.set(p.id,p);
    });
  },
  list() { return Array.from(DB.ponds.values()); },
  get(id: string) { return DB.ponds.get(id); },
  update(id: string, updates: Partial<Pond>) { const pond = DB.ponds.get(id); if (!pond) return null; const next = {...pond, ...updates, updatedAt:new Date().toISOString()}; next.status = makeStatus(next); DB.ponds.set(id,next); return next; },
  historical(id: string){ const now = Date.now(); const horiz = Array.from({length:24},(_,i)=>({time:new Date(now-((23-i)*60*60*1000)).toISOString(), temperature:26+Math.sin(i/3), ph:7.3+Math.cos(i/4)*0.2, dissolvedOxygen:5.8+Math.sin(i/2)*0.2, conductivity:650+Math.cos(i/5)*20}));
    return horiz;
  }
};

