"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  CircleDollarSign,
  History,
  LayoutDashboard,
  Menu,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { updateUserMetadata } from "@/lib/role";

type DashboardNavItem = {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const dashboardNavItems: DashboardNavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Deposit", href: "/dashboard/deposit", icon: CircleDollarSign },
  { title: "Withdraw", href: "/dashboard/withdrawal", icon: WalletCards },
  { title: "History", href: "/dashboard/transactions", icon: History },
  { title: "Profile", href: "/dashboard/profile", icon: ShieldCheck },
];

function DashboardSidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <aside className={cn("flex h-full w-full flex-col gap-6 p-5", className)}>
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/images/logo-icon.png"
          alt="WalletHedge logo"
          width={32}
          height={32}
          unoptimized
          style={{ height: "auto" }}
        />
        <span className="text-xl font-semibold tracking-tight text-primary">WalletHedge</span>
      </Link>

      <div className="space-y-2">
        <p className="px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Main Menu</p>
        {dashboardNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </div>

      <Card className="mt-auto rounded-2xl border-border/70 bg-gradient-to-br from-primary/95 to-blue-700 p-4 text-primary-foreground">
        <p className="text-sm font-semibold">Secure Trading Vault</p>
        <p className="mt-2 text-xs text-primary-foreground/85">
          Your crypto portfolio and KYC profile are protected with WalletHedge account controls.
        </p>
      </Card>
    </aside>
  );
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const hasInitializedMetadataRef = useRef(false);
  const userName = user?.firstName || user?.username || "Investor";
  const accountStatus = user?.publicMetadata?.account_status ? "Active" : "Inactive";
  const accountTrader = user?.publicMetadata?.account_trader?.toString() || "Unassigned";

  const subtitle = useMemo(
    () => `Trader: ${accountTrader} | Status: ${accountStatus}`,
    [accountStatus, accountTrader]
  );

  useEffect(() => {
    const initializeMetadata = async () => {
      if (!user || hasInitializedMetadataRef.current) return;

      const metadata = user.publicMetadata ?? {};
      if (Object.keys(metadata).length > 0) {
        hasInitializedMetadataRef.current = true;
        return;
      }

      hasInitializedMetadataRef.current = true;
      try {
        await updateUserMetadata({
          userId: user.id,
          metadata: {
            roi: 0,
            current_value: 0,
            account_status: false,
            account_trader: "",
            kyc_status: false,
            total_investment: 0,
          },
        });
      } catch (error) {
        console.error("Failed to initialize user metadata", error);
      }
    };

    void initializeMetadata();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/40 via-background to-background">
      <div className="mx-auto flex max-w-[1600px]">
        <div className="sticky top-0 hidden h-screen w-72 border-r bg-white/95 backdrop-blur md:block">
          <DashboardSidebar />
        </div>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b bg-white/90 backdrop-blur">
            <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-8">
              <div className="flex items-center gap-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden">
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Open dashboard menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-72 p-0">
                    <DashboardSidebar />
                  </SheetContent>
                </Sheet>
                <div>
                  <h1 className="text-base font-semibold md:text-lg">Dashboard</h1>
                  <p className="text-xs text-muted-foreground md:text-sm">Welcome back, {userName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground sm:block">
                  {subtitle}
                </div>
                {user ? (
                  <UserButton />
                ) : (
                  <Button asChild size="sm" className="rounded-lg">
                    <Link href="/sign-in">Sign in</Link>
                  </Button>
                )}
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
