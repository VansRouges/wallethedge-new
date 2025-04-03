"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
// import { Button } from "../../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import BaseLayout from "@/components/BaseLayout";
import { databases, Query } from "@/lib/appwrite";
import { Models } from 'appwrite';
import { Input } from '@/components/ui/input';

interface Transaction {
    id: string;
    date: string;
    status: boolean | null;
    description: string;
    amount: number;
    type: 'credit' | 'debit';
    token: string;
}

interface DepositDocument extends Models.Document {
    deposit_btc?: number;
    deposit_eth?: number;
    deposit_usdt?: number;
    status?: boolean;
}

interface WithdrawalDocument extends Models.Document {
    btc_amount?: number;
    eth_amount?: number;
    usdt_amount?: number;
    status?: boolean;
}

export default function TransactionsPage() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filterType, setFilterType] = useState<'all' | 'credit' | 'debit'>('all');
    const [deposits, setDeposits] = useState<DepositDocument[]>([]);
    const [withdrawals, setWithdrawals] = useState<WithdrawalDocument[]>([]);

    // Function to fetch deposits by userId
    const fetchDeposits = useCallback(async () => {
        try {
            const userId = localStorage.getItem("userId");
            if (!userId) return;

            const response = await databases.listDocuments(
                process.env.NEXT_PUBLIC_DATABASE_ID!,
                process.env.NEXT_PUBLIC_DEPOSITS_COLLECTION_ID!,
                [
                    Query.orderAsc("$createdAt"),
                    Query.equal("userId", userId),
                ]
            );
            setDeposits(response?.documents as DepositDocument[] || []);
        } catch (error) {
            console.error("Error fetching deposit information:", error instanceof Error ? error.message : 'Unknown error');
        }
    }, []);

    // Function to fetch withdrawal by userId
    const fetchWithdrawals = useCallback(async () => {
        try {
            const userId = localStorage.getItem("userId");
            if (!userId) return;

            const response = await databases.listDocuments(
                process.env.NEXT_PUBLIC_DATABASE_ID!,
                process.env.NEXT_PUBLIC_WITHDRAWALS_COLLECTION_ID!,
                [
                    Query.orderAsc("$createdAt"),
                    Query.equal("userId", userId),
                ]
            );
            setWithdrawals(response?.documents as WithdrawalDocument[] || []);
        } catch (error) {
            console.error("Error fetching withdrawal information:", error instanceof Error ? error.message : 'Unknown error');
        }
    }, []);

    // Fetch deposits and withdrawals on component mount
    useEffect(() => {
        fetchDeposits();
        fetchWithdrawals();
    }, [fetchDeposits, fetchWithdrawals]);

    // Transform deposits and withdrawals into a unified transactions format
    const transactions: Transaction[] = [
        ...deposits.map(deposit => ({
            id: deposit.$id,
            date: deposit.$createdAt,
            status: deposit.status ?? null,
            description: 'Deposit',
            amount: deposit.deposit_btc || deposit.deposit_eth || deposit.deposit_usdt || 0,
            type: 'credit' as const,
            token: deposit.deposit_btc ? 'BTC' : deposit.deposit_eth ? 'ETH' : 'USDT'
        })),
        ...withdrawals.map(withdrawal => ({
            id: withdrawal.$id,
            date: withdrawal.$createdAt,
            status: withdrawal.status ?? null,
            description: 'Withdrawal',
            amount: withdrawal.btc_amount || withdrawal.eth_amount || withdrawal.usdt_amount || 0,
            type: 'debit' as const,
            token: withdrawal.btc_amount ? 'BTC' : withdrawal.eth_amount ? 'ETH' : 'USDT'
        }))
    ];

    // Filter transactions based on search term and filter type
    const filteredTransactions = transactions.filter(transaction =>
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterType === 'all' || transaction.type === filterType)
    );

    const getStatusStyle = (status: boolean | null): React.CSSProperties => {
        if (status === true) {
            return { color: 'green' };
        } else if (status === false) {
            return { color: 'orange' };
        } else {
            return { color: 'red' };
        }
    };

    return (
        <BaseLayout>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">Recent Transactions</h1>
                <Card>
                    <CardHeader>
                        <CardTitle>Transaction History</CardTitle>
                        <CardDescription>View and search your recent transactions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col md:flex-row justify-between mb-4 space-y-2 md:space-y-0 md:space-x-2">
                            <Select value={filterType} onValueChange={(value: 'all' | 'credit' | 'debit') => setFilterType(value)}>
                                <SelectTrigger className="w-full md:w-[180px]">
                                    <SelectValue placeholder="Filter by type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Transactions</SelectItem>
                                    <SelectItem value="credit">Credits</SelectItem>
                                    <SelectItem value="debit">Debits</SelectItem>
                                </SelectContent>
                            </Select>
                            <Input
                                placeholder="Search transactions..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full md:w-[200px]"
                            />
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Token</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredTransactions.map((transaction) => (
                                    <TableRow key={transaction.id}>
                                        <TableCell className="font-normal">
                                            {new Date(transaction.date).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="font-normal">{transaction.token}</TableCell>
                                        <TableCell style={getStatusStyle(transaction.status)} className="font-normal">
                                            {transaction.status === true
                                                ? 'Completed'
                                                : transaction.status === false
                                                    ? 'Pending'
                                                    : 'Failed'}
                                        </TableCell>
                                        <TableCell className="text-right font-normal">
                                            <span className={transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}>
                                                {transaction.type === 'credit' ? (
                                                    <ArrowUpIcon className="inline-block mr-1 h-4 w-4" />
                                                ) : (
                                                    <ArrowDownIcon className="inline-block mr-1 h-4 w-4" />
                                                )}
                                                ${transaction.amount.toLocaleString()}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {filteredTransactions.length === 0 && (
                            <div className="text-center py-4 text-muted-foreground">
                                No transactions found.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </BaseLayout>
    );
}