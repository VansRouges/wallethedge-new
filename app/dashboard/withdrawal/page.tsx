"use client"
import { useState } from 'react';
import BaseLayout from '@/components/BaseLayout';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bitcoin, Coins, DollarSign, Wallet, ArrowUpRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { databases, ID, Role, Permission } from '@/lib/appwrite';
// import { useSidebarContext } from "@/context/SidebarContext";
// import { Models } from 'appwrite';
import { useUser } from '@clerk/nextjs';

interface CryptoOption {
  name: string;
  symbol: string;
  icon: React.ComponentType<{ className?: string }>;
  balanceKey: string;
}

interface WithdrawalData {
  userId: string;
  full_name: string;
  status: boolean;
  btc_address: string | null;
  eth_address: string | null;
  usdt_address: string | null;
  btc_amount: number | null;
  eth_amount: number | null;
  usdt_amount: number | null;
}

// interface WithdrawProps {
//   session?: Models.Session;
// }

const cryptoOptions: CryptoOption[] = [
    { name: 'Bitcoin', symbol: 'BTC', icon: Bitcoin, balanceKey: 'btc_balance' },
    { name: 'Ethereum', symbol: 'ETH', icon: Coins, balanceKey: 'eth_balance' },
    { name: 'Tether', symbol: 'USDT', icon: DollarSign, balanceKey: 'usdt_balance' },
];

const withdrawalCollectionID = process.env.NEXT_PUBLIC_WITHDRAWALS_COLLECTION_ID as string;
const databaseID = process.env.NEXT_PUBLIC_DATABASE_ID as string;

// Helper function to format USDT balance as currency
// const formatCurrency = (value: number): string => {
//     return new Intl.NumberFormat('en-US', {
//         style: 'currency',
//         currency: 'USD',
//         minimumFractionDigits: 0,
//         maximumFractionDigits: 0
//     }).format(value);
// };

export default function Withdraw() {
    const { user } = useUser()
    // const { loggedInUser, profileInfo } = useSidebarContext();
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedCrypto, setSelectedCrypto] = useState<CryptoOption | null>(null);
    const [amount, setAmount] = useState<string>('');
    const [withdrawalAddress, setWithdrawalAddress] = useState<string>('');
    // const router = useRouter();

    const submitWithdrawal = async (crypto: CryptoOption, amount: string, address: string) => {
        setLoading(true);
        try {
            if (!user?.id || !user?.fullName) {
                throw new Error("User information is missing");
            }

            const data: WithdrawalData = {
                userId: user?.id,
                full_name: user?.fullName,
                status: false, // Assuming false means pending
                btc_address: crypto.symbol === 'BTC' ? address : null,
                eth_address: crypto.symbol === 'ETH' ? address : null,
                usdt_address: crypto.symbol === 'USDT' ? address : null,
                btc_amount: crypto.symbol === 'BTC' ? parseFloat(amount) : null,
                eth_amount: crypto.symbol === 'ETH' ? parseFloat(amount) : null,
                usdt_amount: crypto.symbol === 'USDT' ? parseFloat(amount) : null,
            };

            const response = await databases.createDocument(
                databaseID,
                withdrawalCollectionID,
                ID.unique(),
                data,
                [Permission.read(Role.any())] // Allow public read
            );
            console.log("Withdrawal Response", response);
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

    const handleWithdrawal = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedCrypto && amount && withdrawalAddress) {
            submitWithdrawal(selectedCrypto, amount, withdrawalAddress);
        } else {
            toast.error("Please fill in all required fields.");
        }
    };

    // const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => {
    //     return (
    //         <svg viewBox="0 0 24 24" fill="none" {...props}>
    //             <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2"/>
    //             <path
    //                 d="M7 13l3 3 7-7"
    //                 stroke="#fff"
    //                 strokeWidth={1.5}
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //             />
    //         </svg>
    //     );
    // };

    return (
        <BaseLayout>
            <div className="container mx-auto p-4">
                <ToastContainer position="top-right" autoClose={1000} theme="light" />
                <div className="text-center space-y-2 mb-4">
                    <h2 className="font-bold text-3xl bg-cyan-500 w-20 h-20 m-auto flex justify-center items-center rounded-full text-white">
                        <Wallet />
                    </h2>
                    <h2 className="font-bold text-2xl text-gray-700">You&#39;re almost ready to withdraw!</h2>
                    <p className="text-xs font-light">Send your funds directly to your wallet</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cryptoOptions.map((crypto) => {
                        const CryptoIcon = crypto.icon;
                        return (
                            <Card key={crypto.symbol} className="cursor-pointer rounded-xl hover:bg-secondary/50 transition-colors">
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-center space-x-2">
                                        <CryptoIcon className="h-6 w-6" />
                                        <span>{crypto.name}</span>
                                    </CardTitle>
                                    {/* <CardDescription className="text-center font-semibold">
                                        Balance: {crypto.symbol === 'USDT'
                                        ? formatCurrency(profileInfo?.[crypto.balanceKey as keyof typeof profileInfo] as number ?? 0)
                                        : profileInfo?.[crypto.balanceKey as keyof typeof profileInfo] ?? 0} {crypto.symbol}
                                    </CardDescription> */}
                                </CardHeader>
                                <CardContent>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button 
                                                className="w-full bg-blue-600 hover:bg-blue-800 rounded-xl" 
                                                onClick={() => setSelectedCrypto(crypto)}
                                            >
                                                Withdraw
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px] rounded-2xl">
                                            <DialogHeader>
                                                <DialogTitle>Withdraw {crypto.name}</DialogTitle>
                                                <DialogDescription>
                                                    Enter the amount you want to withdraw and the destination address.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <form className="grid gap-4 py-4">
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
                                                    onClick={handleWithdrawal}
                                                    className="w-full rounded-xl bg-blue-600 hover:bg-blue-800 mt-4"
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
        </BaseLayout>
    );
}