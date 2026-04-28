export interface Logger { id:string; deviceId:string; zoneId:string; watts:number; timestamp:string; status:'ok'|'warn'|'error' }
export interface Zone { id:string; name:string; lat:number; lng:number; loggerCount:number }
