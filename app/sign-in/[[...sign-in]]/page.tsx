import { SignIn } from '@clerk/nextjs'
import Link from "next/link"

export default function Page() {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen w-full'>
      <div className='w-full max-w-md p-4'>
        <SignIn />
      </div>
      <Link href="/forgot-password" className="text-sm text-blue-400">
        Tap here if you have Forgotten your Password
      </Link>
    </div>
  )
}