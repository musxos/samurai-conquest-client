import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { setDeck, setLand, setSamurai } from '@/features/game/game-slice';

export const useGame = () => {
  const dispatch = useAppDispatch();
  const game = useAppSelector((state) => state.game);

  return {
    game,
    setSamurai: (payload: number) => dispatch(setSamurai(payload)),
    setDeck: (payload: number[]) => dispatch(setDeck(payload)),
    setLand: (payload: number) => dispatch(setLand(payload)),
  };
};
