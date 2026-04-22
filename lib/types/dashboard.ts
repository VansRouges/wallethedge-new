export type TokenSymbol = "BTC" | "ETH" | "USDT";

export interface BannerPrice {
  $id?: string;
  token_name: string;
  value: number;
  price_direction: boolean | null;
  price_change: string;
}

export interface DashboardMetricData {
  totalInvestment: number;
  currentValue: number;
  roi: number;
  accountStatus: boolean;
  accountTrader: string;
}

export interface DepositPayload {
  userId: string;
  full_name: string;
  symbol: TokenSymbol;
  amount: number;
}

export interface WithdrawalPayload {
  userId: string;
  full_name: string;
  symbol: TokenSymbol;
  amount: number;
  address: string;
}

export interface TransactionRow {
  id: string;
  date: string;
  status: boolean | null;
  description: "Deposit" | "Withdrawal";
  amount: number;
  type: "credit" | "debit";
  token: TokenSymbol;
}
