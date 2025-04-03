import { GoDot } from 'react-icons/go'

const features = [
  {
    name: 'Professional team.',
    icon: GoDot,
  },
  {
    name: 'Trustworthy',
    icon: GoDot,
  },
  {
    name: 'High integrity',
    icon: GoDot,
  },
  {
    name: 'Have been certified',
    icon: GoDot,
  },
  {
    name: 'Quality of our research',
    icon: GoDot,
  },
  {
    name: 'Providing The best service',
    icon: GoDot,
  },
  {
    name: 'Breadth of our capabilities',
    icon: GoDot,
  },
  {
    name: 'Global reach of our business',
    icon: GoDot,
  },
]

export default function Example() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600 capitalize">Welcome To Wallethedge</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl capitalize">We Aim To Be The Best Copy Trading Investment Firm In The World</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Our Team Of Professional traders are more than capable of growing your assets. These are reasons why you should Invest with us:
              </p>
              <dl className="grid max-w-xl grid-cols-2 gap-x-6 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-5 mt-4">
                {features.map((feature) => (
                <div key={feature.name} className="relative pl-8">
                    <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-1 top-1 flex">
                        <feature.icon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                    </div>
                    {feature.name}
                    </dt>
                </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            src="/images/hero.jpg"
            alt="Product screenshot"
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>
  )
}
