export interface Alarm { id: string; pondId: string; level: "warn"|"critical"; message: string; timestamp: string; acknowledged: boolean; }

