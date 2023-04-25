import { useState } from 'react';
import axios from '@/app/axios';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import useAPI from './useAPI';

export function useAuth() {
  const router = useRouter();
  const route = router.route != '/login' ? router.route : '/';
  const { user: userApi } = useAPI();
  const account = useAccount({
    onConnect: () => {
      if (route == '/login' || route == '/register') {
        router.push('/');
      }
    },
    onDisconnect: () => {
      router.push('/login?redirect=' + route);
    },
  });

  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const { data } = await userApi.getUser(account.address);
    setUser(data);
  };

  return { user, fetchUser };
}
