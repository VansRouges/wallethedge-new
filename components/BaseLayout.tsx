"use client"
import React, { useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
    History,
    // ChevronDown,
    CreditCard,
    DollarSign,
    Home,
    Settings,
} from 'lucide-react';
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarProvider,
    SidebarTrigger,
    SidebarInset
} from "../components/ui/sidebar";
import { useSidebarContext } from "@/context/SidebarContext";
import { databases, Query } from "@/lib/appwrite";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Card, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import CryptoPriceBanner from "./crypto-price-banner";
import { useUser } from '@clerk/nextjs';
import { SignedIn, UserButton } from '@clerk/nextjs';
// import { Models } from 'appwrite';

interface MenuItem {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    href: string;
}

interface BaseLayoutProps {
    children: React.ReactNode;
}

// interface CryptoData {
//     $id?: string;
//     token_name: string;
//     value: number;
//     price_direction: boolean | null;
//     price_change: string;
//   }

const menuItems: MenuItem[] = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: DollarSign, label: 'Deposit', href: '/dashboard/deposit' },
    { icon: CreditCard, label: 'Withdraw', href: '/dashboard/withdrawal' },
    { icon: History, label: 'History', href: '/dashboard/transactions' },
    { icon: Settings, label: 'Profile', href: '/dashboard/profile' },
];

export default function BaseLayout({ children }: BaseLayoutProps) {
    const { user } = useUser();
    const {
        priceActions,
        setPriceActions
    } = useSidebarContext();
    // const router = useRouter();
    const pathname = usePathname();

    // Function to fetch price actions
    const fetchPriceActions = useCallback(async () => {
        try {
            const response = await databases.listDocuments(
                process.env.NEXT_PUBLIC_DATABASE_ID!,
                process.env.NEXT_PUBLIC_CRYPTO_BANNER_COLLECTION_ID!,
                [
                    Query.orderAsc("$createdAt")
                ]
            );

            console.log("Price Actions log", response);
            setPriceActions(response.documents.map(doc => ({
                $id: doc.$id,
                token_name: doc.token_name,
                value: doc.value,
                price_direction: doc.price_direction,
                price_change: doc.price_change,
            })) || []);
        } catch (error) {
            console.error("Error fetching price actions information:", error instanceof Error ? error.message : 'Unknown error');
        }
    }, [setPriceActions]);

    useEffect(() => {
        fetchPriceActions();
    }, [fetchPriceActions]);

    return (
        <SidebarProvider className="overflow-hidden">
            <Sidebar className="w-64 bg-white shadow-lg">
                <SidebarHeader className="p-6 flex flex-row items-center justify-between">
                    <Image
                        width={80}
                        height={80}
                        className="w-9 h-9 object-contain rounded-2xl"
                        src="/images/logo-icon.png"
                        alt="logo"
                        unoptimized={true}
                    />
                    <h1 className="text-2xl font-bold uppercase text-blue-800">Wallethedge</h1>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarMenu className="px-2">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <SidebarMenuItem key={item.label}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            href={item.href}
                                            className={`flex items-center gap-4 px-8 py-7 rounded-xl transition-colors ${
                                                isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                        >
                                            <Icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                                            <span className="font-semibold">{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarContent>
            </Sidebar>

            <SidebarInset>
                <header className="flex items-center justify-between px-6 py-4 bg-white border-b shadow">
                    <div className="flex items-center">
                        <SidebarTrigger className="mr-4 border-none md:hidden" />
                        <h2 className="text-xl font-bold uppercase text-blue-800">Wallethedge</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <SignedIn>
                            <UserButton afterSignOutUrl="/sign-in" />
                        </SignedIn>
                    </div>
                </header>

                <div className="lg:w-[70%] lg:ml-[20%] flex flex-1 flex-col gap-4 px-2 sm:p-4">
                    <div className="my-3">
                        <div className="mb-2">
                            <CryptoPriceBanner data={priceActions || undefined} />
                        </div>
                        <Card className="rounded-xl border-none bg-gradient-to-r from-blue-500 to-blue-600">
                            <CardHeader>
                                <CardTitle className="text-lg md:text-2xl font-bold text-white">
                                    Welcome back, {user?.firstName ?? ""}!
                                </CardTitle>
                                <CardDescription className="text-blue-100 flex space-x-3">
                                    <span className="font-bold">
                                        Account Trader: {user?.publicMetadata?.account_trader?.toString() ?? ""}
                                    </span>
                                    <span className="font-bold">
                                        Account Status:{" "}
                                        <span className={`${user?.publicMetadata?.account_status ? 'text-green-600' : 'text-red-600'}`}>
                                            {user?.publicMetadata?.account_status ? "Active" : "Inactive"}
                                        </span>
                                    </span>
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}