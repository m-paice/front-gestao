export interface RequestTransactionsToYear {
  year?: number;
}

export interface TransactionsToYearResponse {
  _id: string;
  in: number;
  out: number;
}

export interface LasTransactionsResponse {
  _id: string;
  in: number;
  out: number;
}

export interface RequestTransactionsByMonth {
  month: number;
}

export interface TransactionsByMonthResponse {
  _id: string;
  type: string;
  value: number;
  description: string;
  client: string | null;
  when: string;
  accountId: string;
}

export interface RequestCreateTransaction {
  type: string;
  month: number;
  value: number;
  description: string;
  client: string | null;
}
