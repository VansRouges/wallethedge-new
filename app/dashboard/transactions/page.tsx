"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import { useUser } from '@clerk/nextjs';
import { fetchTransactions } from '@/lib/services/dashboard';
import { TransactionRow } from '@/lib/types/dashboard';

export default function TransactionsPage() {
    const { user } = useUser();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filterType, setFilterType] = useState<'all' | 'credit' | 'debit'>('all');
    const [transactions, setTransactions] = useState<TransactionRow[]>([]);

    const loadTransactions = useCallback(async () => {
        try {
            if (!user?.id) return;
            const results = await fetchTransactions(user.id);
            setTransactions(results);
        } catch (error) {
            console.error("Error fetching transactions:", error instanceof Error ? error.message : 'Unknown error');
        }
    }, [user?.id]);

    useEffect(() => {
        void loadTransactions();
    }, [loadTransactions]);

    const filteredTransactions = transactions.filter(transaction =>
        `${transaction.description} ${transaction.token}`.toLowerCase().includes(searchTerm.toLowerCase()) &&
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
      <div className="grid gap-6">
        <div>
          <h1 className="text-3xl font-semibold">Recent Transactions</h1>
          <p className="text-sm text-muted-foreground">
            Search and review your deposit and withdrawal activity.
          </p>
        </div>
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>View, filter, and monitor request statuses.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-col justify-between space-y-2 md:flex-row md:space-y-0 md:space-x-2">
              <Select value={filterType} onValueChange={(value: 'all' | 'credit' | 'debit') => setFilterType(value)}>
                <SelectTrigger className="w-full rounded-xl md:w-[180px]">
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
                className="w-full rounded-xl md:w-[220px]"
              />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
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
                    <TableCell className="font-normal">{transaction.description}</TableCell>
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
                          <ArrowUpIcon className="mr-1 inline-block h-4 w-4" />
                        ) : (
                          <ArrowDownIcon className="mr-1 inline-block h-4 w-4" />
                        )}
                        ${transaction.amount.toLocaleString()}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredTransactions.length === 0 && (
              <div className="py-4 text-center text-muted-foreground">
                No transactions found.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
}