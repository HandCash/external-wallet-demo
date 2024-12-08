'use client';

import { useWallet } from '@/app/context/WalletContext';
import { VerifyEmail } from '@/components/user/VerifyEmail';
import { Types } from '@handcash/handcash-sdk';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Banknote, Send, History, Mail } from "lucide-react";
import { DepositInfo } from '@/components/wallet/DepositInfo';
import { SendPayment } from '@/components/wallet/SendPayment';
import { TransactionHistory } from '@/components/wallet/TransactionHistory';
import { ToastContainer } from '../Toaster';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface UserPageClientProps {
  user: {
    id: number;
    email: string;
    isAdmin: boolean;
    isVerified: boolean;
  };
  txHistory: Types.PaymentResult[];
  txHistoryError: boolean;
  depositLink: string;
}

export default function UserPageClient({ user, txHistory, depositLink }: UserPageClientProps) {
  const { isWalletConnected } = useWallet();

  if (!user.isVerified) {
    return (
      <div className="container mx-auto py-10">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Verify Your Email
            </CardTitle>
            <CardDescription>
              Before you can create a wallet and start using our services, we need to verify your email address.
              This helps us ensure the security of your account and enables features like:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 mb-6 text-muted-foreground">
              <li>Secure wallet creation</li>
              <li>Send and receive payments</li>
              <li>Access to all platform features</li>
            </ul>
            <VerifyEmail />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isWalletConnected) {
    return (
      <div className="container mx-auto py-10">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Banknote className="h-5 w-5" />
              Connect Your Wallet
            </CardTitle>
            <CardDescription>
              Your email is verified! The next step is to connect your HandCash wallet to access all features:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 mb-6 text-muted-foreground">
              <li>View your balance</li>
              <li>Make deposits and withdrawals</li>
              <li>Send payments to other users</li>
            </ul>
            <div className="flex justify-center">
              <a
                href="https://app.handcash.io/#/authorizeApp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Connect HandCash Wallet
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col lg:flex-row lg:space-x-12">
        <main className="flex-1 mt-8 lg:mt-0">
          <ToastContainer />
          <Tabs defaultValue="deposit" className="space-y-4">
            <TabsList>
              <TabsTrigger value="deposit">
                <Banknote className="mr-2 h-4 w-4" />
                Deposit
              </TabsTrigger>
              <TabsTrigger value="send">
                <Send className="mr-2 h-4 w-4" />
                Send
              </TabsTrigger>
              <TabsTrigger value="history">
                <History className="mr-2 h-4 w-4" />
                History
              </TabsTrigger>
            </TabsList>
            <TabsContent value="deposit">
              <DepositInfo depositLink={depositLink}/>
            </TabsContent>
            <TabsContent value="send">
              <SendPayment />
            </TabsContent>
            <TabsContent value="history">
              <TransactionHistory transactions={txHistory} />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
