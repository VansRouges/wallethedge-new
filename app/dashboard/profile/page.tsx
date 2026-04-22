"use client"
import React, { useState } from 'react'
import { FileCheck, ShieldCheck } from 'lucide-react'
import { Button } from "../../../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from '@clerk/nextjs';
import { UserProfile } from '@clerk/nextjs';
import { submitKyc } from '@/lib/services/dashboard';
import { Badge } from '@/components/ui/badge';

export default function Index() {
  const { user } =  useUser()
  const [idType, setIdType] = useState('Passport');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const handleKycSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!frontFile || !backFile) {
        throw new Error("Both front and back ID files must be uploaded.");
      }
      if (!user?.id) {
        throw new Error("You must be signed in before submitting KYC.");
      }

      await submitKyc({
        firstName,
        lastName,
        phone: phoneNumber,
        idType,
        userId: user.id,
        frontFile,
        backFile,
      });
      toast.success("KYC information submitted successfully!");
      await router.push("/dashboard")
    } catch (error) {
      console.error("KYC submission error:", error);
      toast.error("Failed to submit KYC. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6">
      <ToastContainer position='top-right' autoClose={1000} hideProgressBar={false} theme='light' />
      <Card className="rounded-2xl border-0 brand-gradient text-primary-foreground">
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <CardTitle className="text-2xl">Profile & Compliance</CardTitle>
            <CardDescription className="text-blue-100">
              Manage your account profile and submit KYC verification documents.
            </CardDescription>
          </div>
          <Badge className="rounded-full bg-white/20 text-white hover:bg-white/20">
            <ShieldCheck className="mr-1 h-4 w-4" />
            Secure account center
          </Badge>
        </CardHeader>
      </Card>
      <Tabs defaultValue="kyc">
        <TabsList className="grid w-full max-w-md grid-cols-2 rounded-xl">
          <TabsTrigger value="kyc">KYC</TabsTrigger>
          <TabsTrigger value="info">User Information</TabsTrigger>
        </TabsList>
        <TabsContent value="kyc">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Know Your Customer (KYC)</CardTitle>
              <CardDescription>Complete verification to unlock all portfolio actions.</CardDescription>
            </CardHeader>
            <CardContent>
              {user?.publicMetadata?.kyc_status === false && (
                <form onSubmit={handleKycSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="idType">ID Type</Label>
                      <select
                        id="idType"
                        className="w-full rounded-xl border px-3 py-2"
                        value={idType}
                        onChange={(e) => setIdType(e.target.value)}
                      >
                        <option>Passport</option>
                        <option>Driver&#39;s License</option>
                        <option>National ID</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        className="rounded-xl"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        className="rounded-xl"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        className="rounded-xl"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="idUpload">Upload Front of ID Document</Label>
                      <Input
                        id="idUpload"
                        className="rounded-xl"
                        type="file"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setFrontFile(e.target.files[0]);
                          }
                        }}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="selfie">Upload Back of ID Document</Label>
                      <Input
                        id="selfie"
                        className="rounded-xl"
                        type="file"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setBackFile(e.target.files[0]);
                          }
                        }}
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="mt-4 rounded-xl bg-primary hover:bg-blue-700" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit KYC'}
                  </Button>
                </form>
              )}
              {user?.publicMetadata?.kyc_status === true && (
                <div className="text-center">
                  <FileCheck className="mx-auto h-16 w-16 text-green-500" />
                  <p className="mt-4">Your KYC has been submitted and is under review.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="info">
          <Card className="rounded-2xl p-3">
            <UserProfile />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}