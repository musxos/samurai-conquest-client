import * as landApi from '@/features/api/land.api';

export default function useAPI() {
  return {
    land: {
      ...landApi,
    },
  };
}
