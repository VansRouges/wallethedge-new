import { Models } from "appwrite";
import { databases, ID, Permission, Query, Role, storage } from "@/lib/appwrite";
import { BannerPrice, DepositPayload, TokenSymbol, TransactionRow, WithdrawalPayload } from "@/lib/types/dashboard";

const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID as string;
const depositsCollectionId = process.env.NEXT_PUBLIC_DEPOSITS_COLLECTION_ID as string;
const withdrawalsCollectionId = process.env.NEXT_PUBLIC_WITHDRAWALS_COLLECTION_ID as string;
const bannerCollectionId = process.env.NEXT_PUBLIC_CRYPTO_BANNER_COLLECTION_ID as string;
const kycCollectionId = process.env.NEXT_PUBLIC_KYC_COLLECTION_ID as string;
const kycBucketId = process.env.NEXT_PUBLIC_KYC_BUCKET_ID as string;
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;

export async function fetchBannerPrices(): Promise<BannerPrice[]> {
  const response = await databases.listDocuments(databaseId, bannerCollectionId, [Query.orderAsc("$createdAt")]);
  return response.documents.map((doc) => ({
    $id: doc.$id,
    token_name: doc.token_name,
    value: doc.value,
    price_direction: doc.price_direction,
    price_change: doc.price_change,
  }));
}

export async function createDeposit(payload: DepositPayload) {
  const data = {
    userId: payload.userId,
    full_name: payload.full_name,
    status: false,
    deposit_btc: payload.symbol === "BTC" ? payload.amount : null,
    deposit_eth: payload.symbol === "ETH" ? payload.amount : null,
    deposit_usdt: payload.symbol === "USDT" ? payload.amount : null,
  };

  return databases.createDocument(databaseId, depositsCollectionId, ID.unique(), data, [
    Permission.read(Role.any()),
  ]);
}

export async function createWithdrawal(payload: WithdrawalPayload) {
  const data = {
    userId: payload.userId,
    full_name: payload.full_name,
    status: false,
    btc_address: payload.symbol === "BTC" ? payload.address : null,
    eth_address: payload.symbol === "ETH" ? payload.address : null,
    usdt_address: payload.symbol === "USDT" ? payload.address : null,
    btc_amount: payload.symbol === "BTC" ? payload.amount : null,
    eth_amount: payload.symbol === "ETH" ? payload.amount : null,
    usdt_amount: payload.symbol === "USDT" ? payload.amount : null,
  };

  return databases.createDocument(databaseId, withdrawalsCollectionId, ID.unique(), data, [
    Permission.read(Role.any()),
  ]);
}

function getTokenAndAmountFromDeposit(doc: Models.Document): { token: TokenSymbol; amount: number } {
  if (doc.deposit_btc) return { token: "BTC", amount: doc.deposit_btc };
  if (doc.deposit_eth) return { token: "ETH", amount: doc.deposit_eth };
  return { token: "USDT", amount: doc.deposit_usdt ?? 0 };
}

function getTokenAndAmountFromWithdrawal(doc: Models.Document): { token: TokenSymbol; amount: number } {
  if (doc.btc_amount) return { token: "BTC", amount: doc.btc_amount };
  if (doc.eth_amount) return { token: "ETH", amount: doc.eth_amount };
  return { token: "USDT", amount: doc.usdt_amount ?? 0 };
}

export async function fetchTransactions(userId: string): Promise<TransactionRow[]> {
  const [depositsResponse, withdrawalsResponse] = await Promise.all([
    databases.listDocuments(databaseId, depositsCollectionId, [Query.orderAsc("$createdAt"), Query.equal("userId", userId)]),
    databases.listDocuments(databaseId, withdrawalsCollectionId, [Query.orderAsc("$createdAt"), Query.equal("userId", userId)]),
  ]);

  const depositRows: TransactionRow[] = depositsResponse.documents.map((doc) => {
    const { token, amount } = getTokenAndAmountFromDeposit(doc);
    return {
      id: doc.$id,
      date: doc.$createdAt,
      status: doc.status ?? null,
      description: "Deposit",
      amount,
      type: "credit",
      token,
    };
  });

  const withdrawalRows: TransactionRow[] = withdrawalsResponse.documents.map((doc) => {
    const { token, amount } = getTokenAndAmountFromWithdrawal(doc);
    return {
      id: doc.$id,
      date: doc.$createdAt,
      status: doc.status ?? null,
      description: "Withdrawal",
      amount,
      type: "debit",
      token,
    };
  });

  return [...depositRows, ...withdrawalRows].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function submitKyc(payload: {
  firstName: string;
  lastName: string;
  phone: string;
  idType: string;
  userId: string;
  frontFile: File;
  backFile: File;
}) {
  const [frontResponse, backResponse] = await Promise.all([
    storage.createFile(kycBucketId, ID.unique(), payload.frontFile),
    storage.createFile(kycBucketId, ID.unique(), payload.backFile),
  ]);

  const idFrontUrl = `https://cloud.appwrite.io/v1/storage/buckets/${kycBucketId}/files/${frontResponse.$id}/view?project=${projectId}`;
  const idBackUrl = `https://cloud.appwrite.io/v1/storage/buckets/${kycBucketId}/files/${backResponse.$id}/view?project=${projectId}`;

  return databases.createDocument(
    databaseId,
    kycCollectionId,
    ID.unique(),
    {
      first_name: payload.firstName,
      last_name: payload.lastName,
      id_front_url: idFrontUrl,
      id_back_url: idBackUrl,
      phone: payload.phone,
      userId: payload.userId,
      id_type: payload.idType,
    },
    [Permission.read(Role.any())]
  );
}
