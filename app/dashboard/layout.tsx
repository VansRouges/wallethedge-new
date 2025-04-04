"use client"
import { SidebarProvider } from "@/context/SidebarContext";
import { Geist, Geist_Mono } from 'next/font/google'
import { useEffect } from 'react';
import { useUser } from "@clerk/nextjs";
import { updateUserMetadata } from "@/lib/role";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// export const metadata: Metadata = {
//   title: 'WalletHedge',
//   description: 'the new way to invest funds',
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { user } = useUser();
  
   // Initialize metadata if it doesn't exist
   useEffect(() => {
    const initializeMetadata = async () => {
      if (user) {
        const metadata = user.publicMetadata;

        // Check if metadata is empty
        if (Object.keys(metadata).length === 0) {
          try {
            // Update metadata with default values
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
            console.log("Metadata initialized successfully");
          } catch (err) {
            console.error("Failed to initialize metadata:", err);
          }
        }
      }
    };

    initializeMetadata();
  }, [user]);

  return (
    <SidebarProvider>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </SidebarProvider>
  )
}