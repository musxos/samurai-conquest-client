import { useAppSelector, useAppDispatch } from '@/app/hooks';
import {
  UserState,
  update,
  fetchUser,
  reset,
} from '@/features/user/user-slice';

export const useUser = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  return {
    user,
    reset: () => dispatch(reset()),
    update: (payload: UserState) => dispatch(update(payload)),
    fetchUser: async (id: string) => await dispatch(fetchUser(id)),
  };
};
