"use client"
import { useState } from 'react';
import BaseLayout from '@/components/BaseLayout';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Bitcoin, Coins, DollarSign, Copy, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useSidebarContext } from "@/context/SidebarContext";
import { databases, ID, Permission, Role } from '@/lib/appwrite';
import { Models } from 'appwrite';
import { useUser } from '@clerk/nextjs';

// Define collection ID for deposits
const depositsID = process.env.NEXT_PUBLIC_DEPOSITS_COLLECTION_ID as string;
const databaseID = process.env.NEXT_PUBLIC_DATABASE_ID as string;

interface CryptoOption {
  name: string;
  symbol: string;
  icon: React.ComponentType<{ className?: string }>;
  address: string;
  imageUrl: string;
}

interface DepositData {
  userId?: string;
  full_name?: string | null;
  status: boolean;
  deposit_btc: number | null;
  deposit_eth: number | null;
  deposit_usdt: number | null;
}

interface DepositProps {
  session?: Models.Session; // Adjust this type based on your session object structure
}

const cryptoOptions: CryptoOption[] = [
  { name: 'Bitcoin', symbol: 'BTC', icon: Bitcoin, address: 'bc1qhsqeuyt9228kkcuqf02czt36ne6t4tmnfl29yz', imageUrl: '/images/QR Code/btc.jpg' },
  { name: 'Ethereum', symbol: 'ETH', icon: Coins, address: '0x6a50F355b90397f1B0f568C0deAEc7db371f089e', imageUrl: '/images/QR Code/eth.jpg' },
  { name: 'Tether', symbol: 'USDT', icon: DollarSign, address: '0x6a50F355b90397f1B0f568C0deAEc7db371f089e', imageUrl: '/images/QR Code/usdt.jpg' },
];

export default function Deposit({ session }: DepositProps) {
  const { user } = useUser()
  const { loggedInUser, profileInfo } = useSidebarContext();
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
      // Prepare deposit data with selected cryptocurrency and user details
      const depositData: DepositData = {
        userId: user?.id,
        full_name: user?.fullName,
        status: false, // Set initial status as false (pending)
        deposit_btc: selectedCrypto.symbol === 'BTC' ? parseFloat(amount) : null,
        deposit_eth: selectedCrypto.symbol === 'ETH' ? parseFloat(amount) : null,
        deposit_usdt: selectedCrypto.symbol === 'USDT' ? parseFloat(amount) : null,
      };

      // Send deposit data to Appwrite backend
      const response = await databases.createDocument(
        databaseID,
        depositsID,
        ID.unique(),
        depositData,
        [
          Permission.read(Role.any()) // Allow public read
        ]
      );
      console.log("Deposit Response", response);
      toast.success("Deposit successfully created!");
      setAmount(''); // Reset amount field
      setSelectedCrypto(null); // Reset selected cryptocurrency
    } catch (error) {
      console.error("Error creating deposit:", error);
      toast.error("Failed to create deposit. Please try again.");
    }
  };

  const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2"/>
        <path
          d="M7 13l3 3 7-7"
          stroke="#fff"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <BaseLayout>
      <div className="container mx-auto p-4">
        <ToastContainer position='top-right' autoClose={1000} hideProgressBar={false} theme='light' />
        <div className="space-y-2 mb-4 text-center">
          <h2 className="font-bold text-2xl">Deposit Funds</h2>
          <h4>via <span className="font-semibold">Crypto Wallet</span></h4>
          <p className="text-xs font-light">Send your payment directly to our wallet</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cryptoOptions.map((crypto) => {
            const CryptoIcon = crypto.icon;
            return (
              <Card key={crypto.symbol} className="cursor-pointer rounded-xl hover:bg-secondary/50 transition-colors">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center space-x-2">
                    <CryptoIcon className="h-6 w-6"/>
                    <span>{crypto.name}</span>
                  </CardTitle>
                  <CardDescription>Deposit {crypto.symbol}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-800 rounded-xl" 
                        onClick={() => setSelectedCrypto(crypto)}
                      >
                        Deposit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Deposit {crypto.name}</DialogTitle>
                        <div className="text-center">
                          <Image 
                            src={crypto.imageUrl} 
                            alt={`${crypto.name} QR Code`} 
                            className="w-44 h-44" 
                            width={2140} 
                            height={1240} 
                          />
                          <p>Enter the amount you want to deposit and use the provided address.</p>
                        </div>
                      </DialogHeader>
                      <div className="grid gap-4 pb-4">
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
                          <div className="col-span-3 flex">
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
                              {copiedAddress === crypto.address ? <Check className="h-4 w-4"/> : <Copy className="h-4 w-4"/>}
                            </Button>
                          </div>
                        </div>
                      </div>
                      <Button onClick={handleDeposit} className="rounded-xl bg-blue-600">
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
    </BaseLayout>
  );
}