// import { GiCoins } from 'react-icons/gi';
import { TbChartCandleFilled } from 'react-icons/tb';
import { GiWallet, GiAlliedStar } from 'react-icons/gi';
import { FaGraduationCap } from 'react-icons/fa'
import { BsCoin, BsGraphUpArrow } from 'react-icons/bs'


  
  export default function Example() {
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
              {/* one */}
            <div className="mx-auto flex max-w-xs text-left flex-col gap-y-2">
              <TbChartCandleFilled className="text-5xl text-blue-600 order-first ml-3" />
              <dd className="order-second text-3xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                Driving Innovations
              </dd>
              <dt className="text-sm leading-7 text-gray-600">
                We stand on a constant pursuit of perfection. The introduction of new cutting-edge features and setting trends makes us the industry leaders.
              </dt>
            </div>
            {/* two */}
            <div className="mx-auto flex max-w-xs text-left flex-col gap-y-2">
              <FaGraduationCap className="text-5xl text-blue-600 order-first ml-3" />
              <dd className="order-second text-3xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                Customer Loyalty
              </dd>
              <dt className="text-sm leading-7 text-gray-600">
                Enabling clients to become high-performance traders and creating long-term relationships by being responsive and relevant, and by consistently delivering top-notch service.
              </dt>
            </div>
            {/* three */}
            <div className="mx-auto flex max-w-xs text-left flex-col gap-y-2">
              <BsCoin className="text-5xl text-blue-600 order-first ml-3" /> 
              <dd className="order-second text-3xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                Truly Social
              </dd>
              <dt className="text-sm leading-7 text-gray-600">
                We believe in the community. It drives us, it inspires us. Сomfort and truly social interaction among our customers is our top priority.
              </dt>
            </div>
            {/* four */}
            <div className="mx-auto flex max-w-xs text-left flex-col gap-y-2">
              <BsGraphUpArrow className="text-5xl text-blue-600 order-first ml-3" /> 
              <dd className="order-second text-3xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                Sustainability
              </dd>
              <dt className="text-sm leading-7 text-gray-600">
                Attracting, developing and retaining the best talent for our project, challenging our people, demonstrating a can-do attitude and fostering a collaborative and supportive environment.
              </dt>
            </div>
            {/* five */}
            <div className="mx-auto flex max-w-xs text-left flex-col gap-y-2">
              <GiWallet className="text-5xl text-blue-600 order-first ml-3" /> 
              <dd className="order-second text-3xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                Integrity
              </dd>
              <dt className="text-sm leading-7 text-gray-600">
                Personal integrity and legal compliance are essential to our operation as a global enterprise. We are committed to international policies and practices that benefit our company and its clients.
              </dt>
            </div>
            {/* six */}
            <div className="mx-auto flex max-w-xs text-left flex-col gap-y-2">
              <GiAlliedStar className="text-5xl text-blue-600 order-first ml-3" /> 
              <dd className="order-second text-3xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                Shared Success 
              </dd>
              <dt className="text-sm leading-7 text-gray-600">
                Our mission is to bring easy and accessible trading to customers worldwide, making possible to benefit from financial markets anytime and anywhere.
              </dt>
            </div>
          </dl>
        </div>
      </div>
    )
  }
  