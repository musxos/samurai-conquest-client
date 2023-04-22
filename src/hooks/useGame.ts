import { useAppSelector, useAppDispatch } from '@/app/hooks';
import {
  SamuraiState,
  setDeck,
  setLand,
  setSamurai,
} from '@/features/game/game-slice';

export const useGame = () => {
  const dispatch = useAppDispatch();
  const game = useAppSelector((state) => state.game);

  return {
    game,
    setSamurai: (payload: SamuraiState) => dispatch(setSamurai(payload)),
    setDeck: (payload: SamuraiState[]) => dispatch(setDeck(payload)),
    setLand: (payload: number) => dispatch(setLand(payload)),
  };
};
