import { useRouter } from "next/router";
// import { FaBitcoin } from "react-icons/fa"
// import { FiCopy } from "react-icons/fi"

const Investment = () => {
  const router = useRouter();
  const usdt = "0x6a50F355b90397f1B0f568C0deAEc7db371f089e"
  const bitcoin = "bc1qhsqeuyt9228kkcuqf02czt36ne6t4tmnfl29yz"
  const eth = "0x6a50F355b90397f1B0f568C0deAEc7db371f089e"

  const handleDeposit = async () =>{
    router.push('/dashboard/deposit')
  }
//   const handleWithdrawal = async () =>{
//     router.push('/dashboard/withdrawal')
//   }
  return (
    <div>
        <div className="w-[28rem] lg:w-full py-10 p-2">
          <h1 className="font-bold text-2xl py-2">Investment Plans</h1>
          <div className="space-y-4">
            <div onClick={handleDeposit} className="bg-white hover:bg-gray-200 active:bg-sky-900 active:bg-opacity-75 active:text-white active:ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300
            cursor-pointer h-14 flex justify-between items-center shadow-md rounded-xl px-8 pt-8 pb-8 relative py-4 focus:outline-none">
              <div>
                <p className=" font-medium ">Bronze Plan</p>
                <div className="font-light flex flex-row space-x-1">$100-$5000{" "}
                  <span aria-hidden="true" className="font-bold hidden">&middot;</span>{""}
                  <p className="hidden">5% - 10%</p>{" "}
                  <span aria-hidden="true" className="font-bold hidden">&middot;</span>{" "}
                  <p className="hidden">Low</p>{" "}
                </div>
              </div>
              <div>
                <p className=" font-medium ">Daily ROI</p>
                <p className="font-light">5% - 10%</p>
              </div>
              <div>
                <p className=" font-medium">Risk</p>
                <p className="font-light">Low</p>
              </div>
              <div className="text-white w-16 p-2 bg-cyan-500 rounded-lg">
                Invest
              </div>
            </div>
            <div onClick={handleDeposit} className="bg-white hover:bg-gray-200 active:bg-sky-900 active:bg-opacity-75 active:text-white active:ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300
            cursor-pointer h-14 flex justify-between items-center shadow-md rounded-xl px-8 pt-8 pb-8 relative py-4 focus:outline-none">
              <div>
                <p className=" font-medium ">Silver Plan</p>
                <div className="font-light flex flex-row space-x-1">$5000-$10,000{" "}
                  <span aria-hidden="true" className="font-bold hidden">&middot;</span>{""}
                  <p className="hidden">15% - 20%</p>{" "}
                  <span aria-hidden="true" className="font-bold hidden">&middot;</span>{" "}
                  <p className="hidden">Min</p>{" "}
                </div>
              </div>
              <div>
                <p className=" font-medium ">Daily ROI</p>
                <p className="font-light">15% - 20%</p>
              </div>
              <div>
                <p className=" font-medium">Risk</p>
                <p className="font-light">Min</p>
              </div>
              <div className="text-white w-16 p-2 bg-cyan-500 rounded-lg">
                Invest
              </div>
            </div>
            <div onClick={handleDeposit} className="bg-white hover:bg-gray-200 active:bg-sky-900 active:bg-opacity-75 active:text-white active:ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300
            cursor-pointer h-14 flex justify-between items-center shadow-md rounded-xl px-8 pt-8 pb-8 relative py-4 focus:outline-none">
              <div>
                <p className=" font-medium ">Gold Plan</p>
                <div className="font-light flex flex-row space-x-1">$10,000-Max{" "}
                  <span aria-hidden="true" className="font-bold hidden">&middot;</span>{""}
                  <p className="hidden">25% - 35%</p>{" "}
                  <span aria-hidden="true" className="font-bold hidden">&middot;</span>{" "}
                  <p className="hidden">Min</p>{" "}
                </div>
              </div>
              <div>
                <p className=" font-medium ">Daily ROI</p>
                <p className="font-light">25% - 35%</p>
              </div>
              <div>
                <p className=" font-medium">Risk</p>
                <p className="font-light">Min</p>
              </div>
              <div className="text-white w-16 p-2 bg-cyan-500 rounded-lg">
                Invest
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full mt-5 md:col-span-2 relative lg:h-fit h-[20vh] p-4 border rounded-lg bg-white">
          <p className="font-bold tracking-wide text-lg">Your Wallet</p>
          <div className="w-full h-20 rounded-lg flex justify-between p-4 px-7 my-2">
            <div>
              <h5 className="font-bold">BTC</h5>
            </div>
            <div className="text-xs md:text-base h-fit p-2 font-medium text-gray-500 border rounded-lg flex justify-between">
              <p>{bitcoin}</p>
            </div>
            <div onClick={handleDeposit} className="cursor-pointer text-white w-16 lg:w-20 flex justify-center items-center bg-red-500 rounded-lg h-10">
              Deposit
            </div>
            {/* <button onClick={handleWithdrawal} className="h-10 p-2 text-white bg-green-500">Send</button> */}
          </div>
          <div className="w-full h-20 rounded-lg flex justify-between p-4 px-7 my-2">
            <div>
              <h5 className="font-bold">USDT</h5>
              <h6 className="text-xs">BEP20</h6>
            </div>
            <div className="text-xs md:text-base h-fit p-2 font-medium text-gray-500 border rounded-lg flex justify-between">
                <p>{usdt}</p>
            </div>
            <div onClick={handleDeposit} className="cursor-pointer text-white w-16 lg:w-20 flex justify-center items-center bg-red-500 rounded-lg h-10">
              Deposit
            </div>
            {/* <button onClick={handleWithdrawal} className="h-10 p-2 text-white bg-green-500">Send</button> */}
          </div>
          <div className="w-full h-20 rounded-lg flex justify-between p-4 px-7 my-2">
            <div>
              <h5 className="font-bold">ETH</h5>
              <h6 className="text-xs">ERC20</h6>
            </div>
            <div className="text-xs md:text-base h-fit p-2 font-medium text-gray-500 border rounded-lg flex justify-between">
              <p>{eth}</p>
            </div>
            <div>
            <div onClick={handleDeposit} className="cursor-pointer text-white w-16 lg:w-20 flex justify-center items-center bg-red-500 rounded-lg h-10">
              Deposit
            </div>
            </div>
            {/* <button onClick={handleWithdrawal} className="h-10 p-2 text-white bg-green-500">Send</button> */}
          </div>
        </div>
    </div>
  )
}

export default Investment
