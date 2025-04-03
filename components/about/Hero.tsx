// import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'

// const features = [
//   {
//     name: 'Professional team.',
//     icon: CloudArrowUpIcon,
//   },
//   {
//     name: 'Trustworthy',
//     icon: LockClosedIcon,
//   },
//   {
//     name: 'High integrity',
//     icon: ServerIcon,
//   },
//   {
//     name: 'Have been certified',
//     icon: ServerIcon,
//   },
//   {
//     name: 'Quality of our research',
//     icon: ServerIcon,
//   },
//   {
//     name: 'Providing The best service',
//     icon: ServerIcon,
//   },
//   {
//     name: 'Breadth of our capabilities',
//     icon: ServerIcon,
//   },
//   {
//     name: 'Global reach of our business',
//     icon: ServerIcon,
//   },
// ]

export default function Example() {
  return (
    <div className="overflow-hidden bg-blue-100 py-24 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:w-[45rem]">
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl capitalize">More about us.</p>
              <p className="mt-6 text-base leading-8 text-gray-600">
                We power success across the financial world for individuals and institutions through unique insights, thinking and actions. Our investment professionals are well positioned to search for differentiated investment ideas, to uncover the story within the story, the hidden risks and the potential rewards:
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl capitalize">Documents</p>
              <p className="mt-6 text-base leading-8 text-gray-600">
                Wallethedge is a registered and regulated company.{" "}
                <a className="underline text-blue-500" href="https://bpvsklhytoplnehaskcs.supabase.co/storage/v1/object/sign/avatars/wallethedge.pdf?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL3dhbGxldGhlZGdlLnBkZiIsImlhdCI6MTY4NjMwNjMyNiwiZXhwIjoxNzE3ODQyMzI2fQ.oTtTEQwoI6P4-sp9aNAC8knbY2HQSarkYNTXoOA_EXQ&t=2023-06-09T10%3A25%3A25.412Z" target='_blank'>View Certificate of incorporation</a>
              </p>
          </div>

          <div className="lg:ml-auto bg-white lg:pr-2 lg:pt-4 lg:w-[65%] rounded-xl border shadow-xl p-5">
            {/* <div className="lg:max-w-lg bg-black"> */}
              <img 
                className="w-72 h-48 m-auto relative bottom-[96px]" 
                src="/images/why-icon.png"
              />
              <p className="-mt-24 text-base leading-8 text-gray-600">
                Most importantly, the glue that holds all of this together is our culture.
                We believe it is the sustainable competitive advantage of our firm, helping us to attract, retain, develop, and motivate great people.
                The shared values of our culture include integrity, collegiality, learning, humility, a sense of humor, respect for diversity of thought, and an unyielding focus on our clients.
              </p>
              
            {/* </div> */}
          </div>

        </div>  
      </div>
    </div>
  )
}
