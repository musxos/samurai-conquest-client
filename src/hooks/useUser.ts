import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { UserState, update } from '@/features/user-reducer';

export function useUser() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  return {
    user,
    update: (payload: UserState) => dispatch(update(payload)),
  };
}
