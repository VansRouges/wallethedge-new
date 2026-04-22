"use client"
import { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bitcoin, Coins, DollarSign, ArrowUpRight, Shield } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useUser } from '@clerk/nextjs';
import { createWithdrawal } from '@/lib/services/dashboard';
import { TokenSymbol } from '@/lib/types/dashboard';
import { CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CryptoOption {
  name: string;
  symbol: TokenSymbol;
  icon: React.ComponentType<{ className?: string }>;
}

const cryptoOptions: CryptoOption[] = [
    { name: 'Bitcoin', symbol: 'BTC', icon: Bitcoin },
    { name: 'Ethereum', symbol: 'ETH', icon: Coins },
    { name: 'Tether', symbol: 'USDT', icon: DollarSign },
];

export default function Withdraw() {
    const { user } = useUser()
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedCrypto, setSelectedCrypto] = useState<CryptoOption | null>(null);
    const [amount, setAmount] = useState<string>('');
    const [withdrawalAddress, setWithdrawalAddress] = useState<string>('');

    const handleWithdrawal = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedCrypto && amount && withdrawalAddress) {
            void submitWithdrawal(selectedCrypto, amount, withdrawalAddress);
        } else {
            toast.error("Please fill in all required fields.");
        }
    };

    const submitWithdrawal = async (crypto: CryptoOption, amountValue: string, address: string) => {
        setLoading(true);
        try {
            if (!user?.id || !user?.fullName) {
                throw new Error("User information is missing");
            }

            await createWithdrawal({
                userId: user.id,
                full_name: user.fullName,
                symbol: crypto.symbol,
                amount: parseFloat(amountValue),
                address,
            });
            toast.success(`Withdrawal request for ${crypto.name} submitted successfully!`);
            setAmount('');
            setWithdrawalAddress('');
        } catch (error) {
            console.error("Error submitting withdrawal:", error);
            toast.error("Failed to submit withdrawal request. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
      <div className="grid gap-6">
        <ToastContainer position="top-right" autoClose={1000} theme="light" />
        <Card className="rounded-2xl border-0 brand-gradient text-primary-foreground">
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">Withdraw Funds</CardTitle>
              <CardDescription className="text-blue-100">
                Submit secure withdrawal requests and send assets to your personal wallets.
              </CardDescription>
            </div>
            <Badge className="rounded-full bg-white/20 text-white hover:bg-white/20">
              <Shield className="mr-1 h-4 w-4" />
              Security checks enabled
            </Badge>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {cryptoOptions.map((crypto) => {
            const CryptoIcon = crypto.icon;
            return (
              <Card key={crypto.symbol} className="rounded-2xl border-border/70 hover:bg-secondary/40">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center space-x-2">
                    <CryptoIcon className="h-6 w-6 text-primary" />
                    <span>{crypto.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="w-full rounded-xl bg-primary hover:bg-blue-700"
                        onClick={() => setSelectedCrypto(crypto)}
                      >
                        Withdraw
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] rounded-2xl">
                      <DialogHeader>
                        <DialogTitle>Withdraw {crypto.name}</DialogTitle>
                        <DialogDescription>
                          Enter the amount and destination wallet address for this transfer.
                        </DialogDescription>
                      </DialogHeader>
                      <form className="grid gap-4 py-4" onSubmit={handleWithdrawal}>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="amount" className="text-right">Amount</Label>
                          <Input
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder={`0.00 ${crypto.symbol}`}
                            className="col-span-3 rounded-xl"
                            required
                            type="number"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="address" className="text-right">To Address</Label>
                          <Input
                            id="address"
                            value={withdrawalAddress}
                            onChange={(e) => setWithdrawalAddress(e.target.value)}
                            placeholder="Enter destination address"
                            className="col-span-3 rounded-xl"
                            required
                          />
                        </div>
                        <Button
                          type="submit"
                          className="mt-4 w-full rounded-xl bg-primary hover:bg-blue-700"
                          disabled={loading}
                        >
                          {loading ? 'Processing...' : 'Confirm Withdrawal'}
                          <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
}