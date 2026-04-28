export interface Transaction { id:string; description:string; amount:number; status:'paid'|'pending'|'failed'; date:string; category:string }
export interface KpiSet { revenue:number; expense:number; balance:number; count:number }
