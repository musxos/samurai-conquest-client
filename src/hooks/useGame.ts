import { useAppSelector, useAppDispatch } from '@/app/hooks';
import {
  LandState,
  setDeck,
  setLand,
  setSamurai,
} from '@/features/game/game-slice';

export const useGame = () => {
  const dispatch = useAppDispatch();
  const game = useAppSelector((state) => state.game);

  return {
    game,
    setSamurai: (payload: any) => dispatch(setSamurai(payload)),
    setDeck: (payload: any[]) => dispatch(setDeck(payload)),
    setLand: (payload: LandState) => dispatch(setLand(payload)),
  };
};
