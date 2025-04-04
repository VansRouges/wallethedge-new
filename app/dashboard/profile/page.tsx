"use client"
import React, { useState } from 'react'
import { FileCheck } from 'lucide-react'
import { storage, ID, Role, Permission, databases } from "@/lib/appwrite";
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
import BaseLayout from '../../../components/BaseLayout';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from '@clerk/nextjs';
import { UserProfile } from '@clerk/clerk-react';

const kycCollectionID = process.env.NEXT_PUBLIC_KYC_COLLECTION_ID || (() => { throw new Error("NEXT_PUBLIC_KYC_COLLECTION_ID is not defined"); })();
const databaseID = process.env.NEXT_PUBLIC_DATABASE_ID || (() => { throw new Error("NEXT_PUBLIC_DATABASE_ID is not defined"); })();
const kycBucketID = process.env.NEXT_PUBLIC_KYC_BUCKET_ID || ""
const projectID = process.env.NEXT_PUBLIC_PROJECT_ID

export default function Index() {
  const { user } =  useUser()
  // const [kycStatus, setKycStatus] = useState('pending'); // Assuming the status is initially 'pending'
  const [idType, setIdType] = useState('Passport');
  const [firstName, setfirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  // const [userInfo, setUserInfo] = useState({
  //   fullName: 'John Doe',
  //   dateOfBirth: '1990-01-01',
  //   address: '123 Main St, City, Country',
  //   phoneNumber: '+1234567890',
  // })
  // const [email, setEmail] = useState('john.doe@example.com')
  const router = useRouter()

  const handleKycSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload ID Document
      if (!frontFile || !backFile) {
        throw new Error("Both front and back ID files must be uploaded.");
      }

      const idFrontResponse = await storage.createFile(
          kycBucketID, // Replace with actual storage bucket ID
          ID.unique(),
          frontFile
      );
      const idBackResponse = await storage.createFile(
          kycBucketID, // Replace with actual storage bucket ID
          ID.unique(),
          backFile
      );

      // Retrieve uploaded file URLs
      const idFrontUrl = `https://cloud.appwrite.io/v1/storage/buckets/${kycBucketID}/files/${idFrontResponse.$id}/view?project=${projectID}`
      const idBackUrl = `https://cloud.appwrite.io/v1/storage/buckets/${kycBucketID}/files/${idBackResponse.$id}/view?project=${projectID}`

      // Construct KYC data object
      const kycData = {
        first_name: firstName, // Replace with actual first name from session or state
        last_name: lastName, // Replace with actual last name from session or state
        id_front_url: idFrontUrl,
        id_back_url: idBackUrl,
        phone: phoneNumber, // Replace with actual phone number from session or state
        userId: user?.id, // Replace with actual user ID
        id_type: idType,
      };

      // Profile object to be saved in Appwrite Database
      // const profileData = {
      //   userId: user?.id,
      //   full_name: user?.fullName,
      //   avatar_url: user?.imageUrl, // Appwrite file URL
      //   account_trader: null,
      //   account_status: null,
      //   btc_balance: null,
      //   eth_balance: null,
      //   usdt_balance: null,
      //   total_investment: null,
      //   current_value: null,
      //   roi: null,
      //   kyc_status: true
      // }

      // Submit KYC data
      const response = await databases.createDocument(
          databaseID,
          kycCollectionID,
          ID.unique(),
          kycData,
          [
            Permission.read(Role.any()) // Allow public read
          ]
      );
      console.log("Profile KYC", response)
      toast.success("KYC information submitted successfully!");
      await router.push("/dashboard")
    } catch (error) {
      console.error("KYC submission error:", error);
      toast.error("Failed to submit KYC. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // const handleUserInfoUpdate = (event) => {
  //   event.preventDefault()
  //   // Here you would typically update the user info in your backend
  //   console.log('User info updated:', userInfo)
  // }

  // const handleEmailChange = (event) => {
  //   event.preventDefault()
  //   // Here you would typically update the email in your backend
  //   console.log('Email changed to:', email)
  // }

  // const handlePasswordReset = (event) => {
  //   event.preventDefault()
  //   // Here you would typically send a password reset request to your backend
  //   console.log('Password reset requested')
  // }


  return (
      <BaseLayout>
        <div className="container mx-auto p-4">
          <ToastContainer position='top-right' autoClose={1000} hideProgressBar={false} theme='light' />
          <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
          <Tabs defaultValue="kyc">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="kyc">KYC</TabsTrigger>
              <TabsTrigger value="info">User Information</TabsTrigger>
            </TabsList>
            <TabsContent value="kyc">
              <Card>
                <CardHeader>
                  <CardTitle>Know Your Customer (KYC)</CardTitle>
                  <CardDescription>Complete your KYC to unlock all features</CardDescription>
                </CardHeader>
                <CardContent>
                  {user?.publicMetadata?.kyc_status === false && (
                      <form onSubmit={handleKycSubmit}>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="idType">ID Type</Label>
                            <select
                                id="idType"
                                className="w-full p-2 border rounded"
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
                                onChange={(e) => setfirstName(e.target.value)}
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
                            <Input id="idUpload" className="rounded-xl" type="file"
                                   onChange={(e) => {
                                     if (e.target.files && e.target.files[0]) {
                                       setFrontFile(e.target.files[0]);
                                     }
                                   }} required/>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="selfie">Upload Back of ID Document</Label>
                            <Input id="selfie" className="rounded-xl" type="file"
                                   onChange={(e) => {
                                     if (e.target.files && e.target.files[0]) {
                                       setBackFile(e.target.files[0]);
                                     }
                                   }} required/>
                          </div>
                        </div>
                        <Button type="submit" className="mt-4 rounded-xl border-none bg-blue-600 hover:bg-blue-800" disabled={loading}>
                          {loading ? 'Submitting...' : 'Submit KYC'}
                        </Button>
                      </form>
                  )}
                  {user?.publicMetadata?.kyc_status === true && (
                      <div className="text-center">
                        <FileCheck className="w-16 h-16 mx-auto text-green-500"/>
                        <p className="mt-4">Your KYC has been submitted and is under review.</p>
                      </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="info">
              <UserProfile />
            </TabsContent>
          </Tabs>
        </div>
      </BaseLayout>
  )
}