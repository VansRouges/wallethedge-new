"use client"
import { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Bitcoin, Coins, DollarSign, Copy, Check, ShieldCheck } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useUser } from '@clerk/nextjs';
import { createDeposit } from '@/lib/services/dashboard';
import { TokenSymbol } from '@/lib/types/dashboard';
import { Badge } from '@/components/ui/badge';

interface CryptoOption {
  name: string;
  symbol: TokenSymbol;
  icon: React.ComponentType<{ className?: string }>;
  address: string;
  imageUrl: string;
}

const cryptoOptions: CryptoOption[] = [
  { name: 'Bitcoin', symbol: 'BTC', icon: Bitcoin, address: 'bc1qhsqeuyt9228kkcuqf02czt36ne6t4tmnfl29yz', imageUrl: '/images/QR Code/btc.jpg' },
  { name: 'Ethereum', symbol: 'ETH', icon: Coins, address: '0x6a50F355b90397f1B0f568C0deAEc7db371f089e', imageUrl: '/images/QR Code/eth.jpg' },
  { name: 'Tether', symbol: 'USDT', icon: DollarSign, address: '0x6a50F355b90397f1B0f568C0deAEc7db371f089e', imageUrl: '/images/QR Code/usdt.jpg' },
];

export default function Deposit() {
  const { user } = useUser()
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoOption | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [copiedAddress, setCopiedAddress] = useState<string>('');

  // Function to handle copying wallet address
  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(''), 3000);
  };

  // Function to handle deposit submission
  const handleDeposit = async () => {
    if (!amount || !selectedCrypto) {
      toast.error("Please enter an amount and select a cryptocurrency.");
      return;
    }

    try {
      if (!user?.id || !user?.fullName) {
        toast.error("You must be signed in before creating a deposit.");
        return;
      }

      await createDeposit({
        userId: user.id,
        full_name: user.fullName,
        symbol: selectedCrypto.symbol,
        amount: parseFloat(amount),
      });
      toast.success("Deposit successfully created!");
      setAmount('');
      setSelectedCrypto(null);
    } catch (error) {
      console.error("Error creating deposit:", error);
      toast.error("Failed to create deposit. Please try again.");
    }
  };

  return (
    <div className="grid gap-6">
      <ToastContainer position='top-right' autoClose={1000} hideProgressBar={false} theme='light' />
      <Card className="rounded-2xl border-0 brand-gradient text-primary-foreground">
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-2xl">Deposit Funds</CardTitle>
            <CardDescription className="text-blue-100">
              Choose an asset, transfer to the official address, and submit your amount for verification.
            </CardDescription>
          </div>
          <Badge className="rounded-full bg-white/20 text-white hover:bg-white/20">
            <ShieldCheck className="mr-1 h-4 w-4" />
            Verified wallets
          </Badge>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cryptoOptions.map((crypto) => {
          const CryptoIcon = crypto.icon;
          return (
            <Card key={crypto.symbol} className="rounded-2xl border-border/70 transition-colors hover:bg-secondary/40">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-2">
                  <CryptoIcon className="h-6 w-6 text-primary" />
                  <span>{crypto.name}</span>
                </CardTitle>
                <CardDescription>Deposit {crypto.symbol}</CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full rounded-xl bg-primary hover:bg-blue-700"
                      onClick={() => setSelectedCrypto(crypto)}
                    >
                      Deposit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[460px]">
                    <DialogHeader>
                      <DialogTitle>Deposit {crypto.name}</DialogTitle>
                      <div className="space-y-3 text-center">
                        <Image
                          src={crypto.imageUrl}
                          alt={`${crypto.name} QR Code`}
                          className="mx-auto h-44 w-44 rounded-xl object-cover"
                          width={2140}
                          height={1240}
                          unoptimized
                        />
                        <p className="text-sm text-muted-foreground">
                          Enter your deposit amount and transfer to the wallet below.
                        </p>
                      </div>
                    </DialogHeader>
                    <div className="grid gap-4 py-2">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amount" className="text-right">Amount</Label>
                        <Input
                          id="amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="0.00"
                          className="col-span-3 rounded-xl"
                          type="number"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="address" className="text-right">Address</Label>
                        <div className="col-span-3 flex gap-2">
                          <Input
                            id="address"
                            value={crypto.address}
                            readOnly
                            className="flex-grow rounded-xl"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleCopyAddress(crypto.address)}
                          >
                            {copiedAddress === crypto.address ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Button onClick={handleDeposit} className="rounded-xl bg-primary hover:bg-blue-700">
                      Confirm Deposit
                    </Button>
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