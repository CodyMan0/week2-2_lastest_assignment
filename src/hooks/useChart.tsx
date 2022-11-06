import { useContext } from 'react';
import {
  ChartDispatchContext,
  ChartStateContext,
} from 'context/AdChartContext';
import { useAdTrendValue } from 'hooks/useTrend';
import { TrendEnum } from 'models/types';

type ChartCategory = {
  [index: string]: string;
  ROAS: string;
  광고비: string;
  클릭수: string;
  매출: string;
  '노출 수': string;
  '전환 수': string;
};

const category: ChartCategory = {
  ROAS: 'roas',
  광고비: 'cost',
  클릭수: 'click',
  매출: 'convValue',
  '노출 수': 'imp',
  '전환 수': 'conv ',
};

export const useChartState = () => {
  const state = useContext(ChartStateContext);
  if (!state) throw new Error("Can't find State Provider");
  return state;
};

export const useChartDispatch = () => {
  const dispatch = useContext(ChartDispatchContext);
  if (!dispatch) throw new Error("Can't find Dispatch Provider");
  return dispatch;
};

export const useChartData = () => {
  const data = useAdTrendValue();
  const { first, second } = useChartState();
  if (!data) throw new Error("Can't find TrendProvider");
  if (!first || !second) throw new Error("Can't find ChartProvider");
  const firstData = data.map((item) => {
    return {
      date: item.date,
      [first]: item[category[first]],
    };
  });
  const secondData = data.map((item) => {
    return {
      date: item.date,
      [first]: item[category[second]],
    };
  });
  return [firstData, secondData];
};