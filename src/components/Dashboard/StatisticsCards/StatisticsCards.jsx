import React, { useEffect } from 'react';
import { Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { loadDashboardStats, loadWalletBalance } from '../../../redux/rtk/features/dashboard/dashboardStatsSlice';

const StatCard = ({ title, value, loading }) => {
  if (loading) {
    return (
      <Card className="ant-shadow h-[120px] bg-slate-100 animate-pulse rounded-lg">
        <div className="h-full"></div>
      </Card>
    );
  }

  return (
    <Card className="ant-shadow h-[120px] rounded-lg">
      <div className="flex flex-col justify-center items-center h-full text-center">
        <h2 className="text-3xl font-semibold text-[#E7906B] mb-2">{value || 0}</h2>
        <p className="text-gray-600 font-medium text-sm">{title}</p>
      </div>
    </Card>
  );
};

const StatisticsCards = () => {
  const dispatch = useDispatch();
  const { stats, loading, walletBalance } = useSelector((state) => state.dashboardStats);

  useEffect(() => {
    dispatch(loadDashboardStats());
    dispatch(loadWalletBalance());
  }, [dispatch]);

  const statsData = [
    { title: 'TOTAL REVENUE', value: stats?.totalRevenue },
    { title: 'TOTAL ONLINE REVENUE', value: stats?.totalOnlineRevenue },
    { title: 'TOTAL POS REVENUE', value: stats?.totalPosRevenue },
    { title: 'TOTAL INVENTORY SALES VALUE', value: stats?.totalInventorySalesValue },
    { title: 'TOTAL PAY OUT', value: stats?.totalPayout },
    { title: 'PENDING PAYOUT', value: stats?.pendingPayout },
    { title: 'TOTAL SHORTAGE PRODUCT', value: stats?.totalShortageProduct },
    { title: 'WALLET BALANCE', value: walletBalance?.balance },
  ];

  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          loading={loading}
        />
      ))}
    </div>
  );
};

export default StatisticsCards;