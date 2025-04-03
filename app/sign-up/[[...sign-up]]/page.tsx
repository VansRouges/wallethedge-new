import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='flex justify-center items-center min-h-screen w-full'>
      <div className='w-full max-w-md p-4'>
        <SignUp />
      </div>
    </div>
  )
}