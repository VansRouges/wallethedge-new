"use client"
import React, { useState } from "react";
import {
    ChevronRight,
    Check,
    CreditCard,
    DollarSign,
    Bitcoin,
    Coins,
    Copy,
} from 'lucide-react';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Button } from "@/components/ui/button";
// import { useSidebarContext } from '@/context/SidebarContext';
import BaseLayout from '@/components/BaseLayout';
import {
    TooltipProvider,
    TooltipTrigger,
    TooltipContent,
    Tooltip
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

interface ChartData {
    name: string;
    total: number;
}

interface InvestmentPlan {
    name: string;
    description: string;
    price: string;
    features: string[];
    recommended: boolean;
}

interface WalletAddress {
    currency: string;
    address: string;
    icon: React.ComponentType<{ className?: string }>;
}

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

const data: ChartData[] = [
    { name: 'Jan', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Feb', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Mar', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Apr', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'May', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Jun', total: Math.floor(Math.random() * 5000) + 1000 },
];

const plans: InvestmentPlan[] = [
    {
        name: "Bronze Plan",
        description: "Perfect for beginners",
        price: "$100 - $5000",
        features: ["Daily ROI: 5%-10%", "Risk: Low"],
        recommended: false,
    },
    {
        name: "Silver Plan",
        description: "For serious investors",
        price: "$5000 - $10,000",
        features: ["Daily ROI: 15%-20%", "Risk: Min"],
        recommended: true,
    },
    {
        name: "Gold Plan",
        description: "For professional traders",
        price: "$10,000 - Max",
        features: ["Daily ROI: 25%-35%", "Risk: Min"],
        recommended: false,
    },
];

const walletAddresses: WalletAddress[] = [
    {
        currency: 'Bitcoin (BTC)',
        address: 'bc1qhsqeuyt9228kkcuqf02czt36ne6t4tmnfl29yz',
        icon: Bitcoin
    },
    {
        currency: 'Tether (USDT)',
        address: '0x6a50F355b90397f1B0f568C0deAEc7db371f089e',
        icon: DollarSign
    },
    {
        currency: 'Ethereum (ETH)',
        address: '0x6a50F355b90397f1B0f568C0deAEc7db371f089e',
        icon: Coins
    }
];

export default function Dashboard() {
    const { user } = useUser() as { user: { publicMetadata: { total_investment?: number; current_value?: number; roi?: number } } }
    const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
    const router = useRouter();
    console.log("User", user)

    const handleCopyClick = (address: string) => {
        navigator.clipboard.writeText(address);
        setCopiedAddress(address);
        setTimeout(() => setCopiedAddress(null), 2000);
    };

    return (
        <BaseLayout>
            {/* Top Cards */}
            <div className="grid p-2 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="rounded-xl">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(user?.publicMetadata.total_investment ?? 0)}</div>
                        <p className="text-xs text-muted-foreground">+{user?.publicMetadata?.roi ?? 0}%</p>
                    </CardContent>
                </Card>
                <Card className="rounded-xl">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Current Value</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(user?.publicMetadata?.current_value ?? 0)}</div>
                        <p className="text-xs text-muted-foreground">+{user?.publicMetadata?.roi ?? 0}%</p>
                    </CardContent>
                </Card>
                <Card className="rounded-xl">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">ROI</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent className="flex space-x-3">
                        <div className="text-2xl font-bold">+{user?.publicMetadata?.roi ?? 0}%</div>
                    </CardContent>
                </Card>
            </div>
            
            {/* Bar chart */}
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols- p-2 rounded-xl">
                <Card className="col-span-4">
                    <CardContent className="pl-2">
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={data}>
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false}
                                    tickFormatter={(value) => `$${value}`}/>
                                <Bar dataKey="total" fill="#ADD8E6" radius={[4, 4, 0, 0]}/>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
            
            {/* Investment Plans */}
            <div className="p-2">
                <h1 className="font-bold text-2xl py-2">Investment Plans</h1>
                <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
                    {plans.map((plan) => (
                        <Card
                            key={plan.name}
                            className={`flex rounded-xl flex-col p- mx-auto max-w- text-center ${plan.recommended ? 'border-blue-400 border-2' : ''}`}
                        >
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                                {plan.recommended && (
                                    <Badge variant="secondary" className="mx-auto mt-2">
                                        Recommended
                                    </Badge>
                                )}
                                <CardDescription className="font-light text-muted-foreground text-sm">
                                    {plan.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-center items-baseline my-8">
                                    <span className="mr-2 text-3xl font-extrabold">{plan.price}</span>
                                </div>
                                <ul role="list" className="mb-8 space-y-4 text-left">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center space-x-3">
                                            <Check className="flex-shrink-0 w-5 h-5 text-green-500"/>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter className="flex-grow flex items-end">
                                <Button
                                    className={`w-full rounded-xl ${plan.recommended ? "bg-blue-600 hover:bg-blue-800 border-none" : " text-blue-500 border-blue-400"}`}
                                    variant={plan.recommended ? "default" : "outline"}
                                    onClick={() => {router.push("/dashboard/deposit")}}
                                >
                                    Invest
                                    <ChevronRight className="ml-2 h-4 w-4"/>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
            
            {/* Wallet Addresses*/}
            <Card className="w-full my-3 rounded-xl p-2 mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Your Wallet Addresses</CardTitle>
                    <CardDescription>Manage your cryptocurrency wallet addresses</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {walletAddresses.map((wallet) => (
                            <div key={wallet.currency} className="flex rounded-xl items-center justify-between p-4 rounded-lg bg-secondary">
                                <div className="flex items-center space-x-4">
                                    <div className="p-2 rounded-full bg-primary/10">
                                        <wallet.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{wallet.currency}</h3>
                                        <p className="text-sm text-muted-foreground">{wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}</p>
                                    </div>
                                </div>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className="border-none"
                                                size="icon"
                                                onClick={() => handleCopyClick(wallet.address)}
                                            >
                                                {copiedAddress === wallet.address ? (
                                                    <Check className="h-4 w-4" />
                                                ) : (
                                                    <Copy className="h-4 w-4" />
                                                )}
                                                <span className="sr-only">Copy address</span>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{copiedAddress === wallet.address ? 'Copied!' : 'Copy address'}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </BaseLayout>
    );
}