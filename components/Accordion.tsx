"use client"
import { useState } from "react";
// import { Collapse } from "react-collapse";
// import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import AccordionItems from "./AccordionItems";

interface AccordionItem {
  title: string;
  desc: string;
}

const accordionData: AccordionItem[] = [
  {
    title: "First-class investment solutions",
    desc: "Wallethedge provides a diversified portfolio management that spreads investment across different assets class. This helps to minimize risk and maximize returns over the long term.",
  },
  {
    title: "Building the idea of future",
    desc: "Wallethedge considers key factors and trends that shape the current investment landscape. Investment in the blockchain sectors is a driving force in shaping the future.",
  },
  {
    title: "Investment-plan consulting",
    desc: "Wallethedge assesses your financial goals and starts by determining your financial objectives. We assess your risk tolerance by evaluating your ability to handle market fluctuations.",
  },
];

export default function Example() {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (index: number) => {
    if (open === index) {
      return setOpen(null);
    }
    setOpen(index);
  };

  return (
    <div className="overflow-hidden bg-white py-24 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="grid place-items-center">
            <div className="px-4 max-w-[800px]">
              {accordionData.map((data, index) => {
                return (
                  <AccordionItems
                    key={index}
                    title={data.title}
                    desc={data.desc}
                    toggle={() => toggle(index)}
                    open={index === open}
                  />
                );
              })}
            </div>
          </div>
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600 capitalize">
                How We Work
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl capitalize">
                Leading The Best Invest manager Team
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}