import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { fetchTopClans, fetchTopUsers } from '@/features/top/top-slice';

export const useTopStore = () => {
  const dispatch = useAppDispatch();
  const top = useAppSelector((state) => state.top);

  return {
    top,
    fetchClans: async () => await dispatch(fetchTopClans()),
    fetchUsers: async () => await dispatch(fetchTopUsers()),
  };
};
