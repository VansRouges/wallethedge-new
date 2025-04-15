import React, { useEffect, useState } from 'react';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

interface CryptoData {
  $id?: string;
  token_name: string;
  value: number;
  price_direction: boolean | null;
  price_change: string;
}

interface CryptoPriceBannerProps {
  data?: CryptoData[];
}

export default function CryptoPriceBanner({ data = [] }: CryptoPriceBannerProps) {
    const [prices, setPrices] = useState<CryptoData[]>(data);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        console.log("rendering for crypto-price-banner 1...")
        setPrices(data);
    }, [data]);

    useEffect(() => {
        console.log("rendering for crypto-price-banner 2...")
        if (!prices || prices.length === 0) return;

        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % prices.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [prices]);

    const formatCurrency = (value: number, currency: string = 'USD'): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    if (!prices || prices.length === 0) {
        return (
            <div className="bg-secondary/50 py-1 px-4 text-sm overflow-hidden">
                <p className="text-center text-gray-500">No price data available.</p>
            </div>
        );
    }

    console.log("currentIndex: ", currentIndex)

    return (
        <div className="bg-gray-900 mx-auto py-1 w-[350px] mr-auto md:lg-[550px] lg:w-[1000px] px-4 text-sm overflow-hidden">
            <div className="flex items-center space-x-8 whitespace-nowrap animate-marquee">
                {prices.map((crypto) => (
                    <div key={crypto?.$id} className="flex items-center space-x-2">
                        <span className="font-semibold text-white uppercase">{crypto?.token_name}</span>
                        <span className="text-white font-semibold">{formatCurrency(crypto?.value)}</span>
                        <span
                            className={`flex items-center font-semibold ${
                                crypto?.price_direction === true
                                    ? 'text-green-600'
                                    : crypto?.price_direction === false
                                        ? 'text-orange-600'
                                        : 'text-red-600'
                            }`}
                        >
                            {crypto?.price_direction === true ? (
                                <ArrowUpIcon className="h-3 w-3 mr-1" />
                            ) : crypto?.price_direction === false ? (
                                <ArrowDownIcon className="h-3 w-3 mr-1" />
                            ) : null}
                            {crypto?.price_change}
                        </span>
                    </div>
                ))}

                {prices.map((crypto) => (
                    <div key={`${crypto?.$id}-duplicate`} className="flex items-center space-x-2">
                        <span className="font-semibold text-white uppercase">{crypto?.token_name}</span>
                        <span className="text-white font-semibold">{formatCurrency(crypto?.value)}</span>
                        <span
                            className={`flex items-center font-semibold ${
                                crypto?.price_direction === true
                                    ? 'text-green-600'
                                    : crypto?.price_direction === false
                                        ? 'text-orange-600'
                                        : 'text-red-600'
                            }`}
                        >
                            {crypto?.price_direction === true ? (
                                <ArrowUpIcon className="h-3 w-3 mr-1" />
                            ) : crypto?.price_direction === false ? (
                                <ArrowDownIcon className="h-3 w-3 mr-1" />
                            ) : null}
                            {crypto?.price_change}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}