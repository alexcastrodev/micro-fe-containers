import type { KpiSet, Transaction } from './types';
export declare function fetchSummary(): Promise<KpiSet>;
export declare function fetchTransactions(): Promise<Transaction[]>;
