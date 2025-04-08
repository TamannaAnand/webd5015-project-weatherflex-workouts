'use client';
import { Users } from 'lucide-react';
import { MetricCard } from '@/components/Cards/MetricCard';
import { fetchUserCount } from '@/utils/fetchMetricData';
import { useEffect, useState } from 'react';

export const UserCountCard = () => {
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await fetchUserCount();
      if (data) setUserCount(data.count);
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <MetricCard
      title="Total Users"
      value={userCount}
      icon={<Users size={24} color="#3b82f6" />}
      loading={loading}
      className=""
    />
  );
};