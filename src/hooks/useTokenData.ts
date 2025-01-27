import { useState, useEffect } from 'react';
import axios from 'axios';

interface TokenData {
  marketCap: string;
  price: string;
  volume24h: string;
  isLoading: boolean;
  error: string | null;
}

const PUMP_FUN_TOKEN_ADDRESS = '5BYrEaDL7NhFjJ9gmyZqVQoAUBg3PqruqPa7fnsWpump';

// Fallback values in case of API issues
const FALLBACK_DATA = {
  marketCap: '$7.1K',
  price: '$0.000142',
  volume24h: '$1.2K'
};

export const useTokenData = (): TokenData => {
  const [data, setData] = useState<TokenData>({
    ...FALLBACK_DATA,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    let isMounted = true;

    // Function to fetch data
    const fetchData = async () => {
      try {
        console.log('🔄 Fetching token data from DexScreener...');
        const response = await axios.get(
          `https://api.dexscreener.com/latest/dex/tokens/${PUMP_FUN_TOKEN_ADDRESS}`
        );

        if (!isMounted) return;

        console.log('📊 Raw DexScreener response:', response.data);

        if (response.data.pairs && response.data.pairs.length > 0) {
          const pair = response.data.pairs[0]; // Get the first/main pair
          console.log('💰 Found pair data:', {
            marketCap: pair.marketCap,
            price: pair.priceUsd,
            volume24h: pair.volume?.h24
          });
          
          setData({
            marketCap: new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              notation: 'compact',
              maximumFractionDigits: 1
            }).format(pair.marketCap || 7100),
            price: new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 6,
              maximumFractionDigits: 6
            }).format(parseFloat(pair.priceUsd) || 0.000142),
            volume24h: new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              notation: 'compact',
              maximumFractionDigits: 1
            }).format(pair.volume?.h24 || 1200),
            isLoading: false,
            error: null
          });
        } else {
          console.log('⚠️ No pairs found in DexScreener response, using fallback data');
          setData({
            ...FALLBACK_DATA,
            isLoading: false,
            error: null
          });
        }
      } catch (error: any) {
        console.error('❌ Error fetching token data:', error);
        if (error.response) {
          console.error('❌ Error response:', error.response.data);
        }
        if (isMounted) {
          setData(prev => ({
            ...prev,
            isLoading: false,
            error: 'Failed to fetch token data'
          }));
        }
      }
    };

    // Initial fetch
    fetchData();

    // Set up interval for subsequent fetches
    const interval = setInterval(fetchData, 15000); // Fetch every 15 seconds

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return data;
}; 