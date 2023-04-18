import { useAppSelector, useAppDispatch } from '@/app/hooks';
import {
  MapState,
  fetchLand,
  fetchLands,
  update,
} from '@/features/map/map-slice';

export const useLandStore = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  return {
    user,
    update: (payload: MapState) => dispatch(update(payload)),
    fetchLand: async (id: string) => await dispatch(fetchLand(id)),
    fetchLands: async () => await dispatch(fetchLands()),
  };
};
