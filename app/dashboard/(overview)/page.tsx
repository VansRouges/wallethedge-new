"use client"
import React, { useMemo, useState } from "react";
import {
  ArrowUpRight,
  BarChart3,
  Bitcoin,
  Check,
  Coins,
  Copy,
  DollarSign,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface ChartData {
  name: string;
  total: number;
}

interface WalletAddress {
  currency: string;
  address: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface InvestmentPlan {
  name: string;
  description: string;
  price: string;
  features: string[];
  recommended: boolean;
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
  { name: 'Jan', total: 3200 },
  { name: 'Feb', total: 4100 },
  { name: 'Mar', total: 3800 },
  { name: 'Apr', total: 5200 },
  { name: 'May', total: 5700 },
  { name: 'Jun', total: 6100 },
];

const walletAddresses: WalletAddress[] = [
  {
    currency: 'Bitcoin (BTC)',
    address: 'bc1qhsqeuyt9228kkcuqf02czt36ne6t4tmnfl29yz',
    icon: Bitcoin,
  },
  {
    currency: 'Tether (USDT)',
    address: '0x6a50F355b90397f1B0f568C0deAEc7db371f089e',
    icon: DollarSign,
  },
  {
    currency: 'Ethereum (ETH)',
    address: '0x6a50F355b90397f1B0f568C0deAEc7db371f089e',
    icon: Coins,
  },
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

export default function Dashboard() {
  const { user } = useUser() as {
    user: { publicMetadata: { total_investment?: number; current_value?: number; roi?: number; account_status?: boolean } };
  };
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const totalInvestment = user?.publicMetadata.total_investment ?? 0;
  const currentValue = user?.publicMetadata.current_value ?? 0;
  const roi = user?.publicMetadata.roi ?? 0;
  const profit = currentValue - totalInvestment;
  const accountActive = user?.publicMetadata.account_status ?? false;

  const quickStats = useMemo(
    () => [
      { label: "Total Investment", value: formatCurrency(totalInvestment), icon: DollarSign, tone: "text-blue-600" },
      { label: "Current Value", value: formatCurrency(currentValue), icon: Wallet, tone: "text-violet-600" },
      { label: "ROI", value: `${roi}%`, icon: TrendingUp, tone: "text-emerald-600" },
      { label: "Net Gain", value: formatCurrency(profit), icon: BarChart3, tone: "text-sky-600" },
    ],
    [currentValue, profit, roi, totalInvestment]
  );

  const handleCopyClick = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  return (
    <div className="grid gap-6">
      <Card className="overflow-hidden rounded-2xl border-0 brand-gradient text-primary-foreground shadow-lg">
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <CardTitle className="text-2xl">Portfolio Snapshot</CardTitle>
            <CardDescription className="mt-1 text-blue-100">
              Track your investments, growth trend, and account status at a glance.
            </CardDescription>
          </div>
          <Badge variant="secondary" className="rounded-full bg-white/20 text-white hover:bg-white/20">
            {accountActive ? "Account Active" : "Account Pending"}
          </Badge>
        </CardHeader>
      </Card>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {quickStats.map((item) => (
          <Card key={item.label} className="rounded-2xl border-border/70 shadow-sm">
            <CardHeader className="space-y-1 pb-2">
              <div className="flex items-center justify-between">
                <CardDescription>{item.label}</CardDescription>
                <item.icon className={`h-4 w-4 ${item.tone}`} />
              </div>
              <CardTitle className="text-2xl">{item.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <Card className="rounded-2xl xl:col-span-2">
          <CardHeader>
            <CardTitle>Performance Trend</CardTitle>
            <CardDescription>Monthly investment momentum overview.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#64748b"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Bar dataKey="total" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Next Actions</CardTitle>
            <CardDescription>Continue managing your account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full justify-between rounded-xl">
              <Link href="/dashboard/deposit">
                Add Funds
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-between rounded-xl">
              <Link href="/dashboard/withdrawal">
                Withdraw Funds
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" className="w-full justify-between rounded-xl">
              <Link href="/dashboard/transactions">
                Review History
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className={`rounded-2xl ${plan.recommended ? "border-primary shadow-md" : ""}`}>
            <CardHeader>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              {plan.recommended ? <Badge className="w-fit rounded-full">Recommended</Badge> : null}
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-2xl font-semibold">{plan.price}</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full rounded-xl">
                <Link href="/dashboard/deposit">Invest</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Funding Wallet Addresses</CardTitle>
          <CardDescription>Use these official addresses for deposits.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          {walletAddresses.map((wallet) => (
            <div key={wallet.currency} className="flex items-center justify-between rounded-xl border bg-secondary/40 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <wallet.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{wallet.currency}</p>
                  <p className="text-xs text-muted-foreground">{wallet.address}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                title={copiedAddress === wallet.address ? "Copied!" : "Copy address"}
                onClick={() => handleCopyClick(wallet.address)}
              >
                {copiedAddress === wallet.address ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}