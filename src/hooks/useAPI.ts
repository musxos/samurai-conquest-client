import * as landApi from '@/features/api/land.api';
import * as boxApi from '@/features/api/box.api';

export default function useAPI() {
  return {
    land: {
      ...landApi,
    },
    box: {
      ...boxApi,
    },
  };
}
