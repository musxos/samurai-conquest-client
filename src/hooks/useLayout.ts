import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { LayoutState, update } from '@/features/layout/layout-slice';

export const useLayout = () => {
  const dispatch = useAppDispatch();
  const layout = useAppSelector((state) => state.layout);

  return {
    layout,
    update: (payload: LayoutState) => dispatch(update(payload)),
  };
};
