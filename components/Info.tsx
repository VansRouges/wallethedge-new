import { GiCoins } from 'react-icons/gi';
import { TbDeviceDesktopAnalytics } from 'react-icons/tb';
import { FcAreaChart } from 'react-icons/fc';


  
  export default function Example() {
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
              {/* one */}
            <div className="mx-auto flex max-w-xs text-left flex-col gap-y-2">
              <GiCoins className="text-5xl text-blue-600 order-first ml-3" />
              <dd className="order-second text-3xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                CRYPTO COPY TRADING
              </dd>
              <dt className="text-base leading-7 text-gray-600">
                New to Cryptocurrency? Begin Copy Trading from Professionals around the globe. 
                Cryptocurrency copy trading is an automated strategy that lets one copy an experienced trader’s trading methods. This enables one to buy and sell crypto assets to earn profits without putting in a lot of time for researching or gaining proficiency in crypto trading.
              </dt>
            </div>
            {/* two */}
            <div className="mx-auto flex max-w-xs text-left flex-col gap-y-2">
              <TbDeviceDesktopAnalytics className="text-5xl text-blue-600 order-first ml-3" />
              <dd className="order-second text-3xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                FOREX COPY TRADING
              </dd>
              <dt className="text-base leading-7 text-gray-600">
                Wallethedge is also specialized in Forex Copy-Trading from Professional Traders around the globe.
                Forex Copy trading allows you to directly copy the positions taken by another trader. You decide the amount you wish to invest and simply copy everything they do automatically in real-time. When that trader makes a trade, your account will make that same trade as well.
              </dt>
            </div>
            {/* three */}
            <div className="mx-auto flex max-w-xs text-left flex-col gap-y-2">
              <FcAreaChart className="text-5xl text-blue-600 order-first ml-3" /> 
              <dd className="order-second text-3xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                EXCHANGE TRADING FUNDS(ETFs)
              </dd>
              <dt className="text-base leading-7 text-gray-600">
                Cryptocurrency ETFs provide several benefits to investors, such as significantly lower cryptocurrency ownership costs and outsourcing of the steep learning curve required to trade cryptocurrencies. Wallethedge Investment Firm manages the funds and makes purchases of cryptocurrencies.These funds are traded and ownership of the coins is represented as shares. When purchasing shares in the ETF, investors will indirectly own cryptocurrencies. Thus, owners can gain exposure to cryptocurrencies without the accompanying expense and risk of owning them outright.
              </dt>
            </div>
          </dl>
        </div>
      </div>
    )
  }
  