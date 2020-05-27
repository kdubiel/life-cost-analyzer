import 'chart.js';
import { AppStore } from 'interfaces';
import React, { useEffect } from 'react';
import { PieChart } from 'react-chartkick';
import { useDispatch, useSelector } from 'react-redux';
import { CategoryStatistic, fetchStatistics } from 'store/statistics';

interface Props {}

const PopulatedStatisticsChart = (props: Props) => {
  const data = useSelector<AppStore, CategoryStatistic[]>(
    store => store.statistics.categories
  );
  const dispatch = useDispatch();

  const mapped = data.map(({ _id, sum }) => [_id, sum]);

  useEffect(() => {
    dispatch(fetchStatistics());
  }, [dispatch]);

  return <PieChart data={mapped} />;
};

export default PopulatedStatisticsChart;
