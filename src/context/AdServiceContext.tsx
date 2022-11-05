import { AdService } from 'models/interface';
import { CategoryType, AdType } from 'models/types';
import { createContext, useState, useMemo, useContext } from 'react';

const AdServiceContext = createContext<AdService | null>(null);
export const useAds = () => useContext(AdServiceContext);

export const AdsServiceProvider = ({
  children,
  adService,
}: {
  children: React.ReactNode;
  adService: AdService;
}) => {
  const getAdList = adService.getAdList.bind(adService);
  const value = useMemo(() => {
    return { getAdList };
  }, [getAdList]);
  return (
    <AdServiceContext.Provider value={value}>
      {children}
    </AdServiceContext.Provider>
  );
};
