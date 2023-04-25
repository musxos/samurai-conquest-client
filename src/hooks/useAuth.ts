import { useEffect, useState } from 'react';
import axios from '@/app/axios';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import useAPI from './useAPI';
import { useUser } from './useUser';

export function useAuth() {
  const user = useUser();

  const router = useRouter();
  const route = router.route != '/login' ? router.route : '/';
  const { user: userApi } = useAPI();
  const account = useAccount({
    onConnect: async () => {
      if (route == '/login' || route == '/register') {
        const result = await fetchUser();

        if (result) {
          router.push('/');
        }
      }
    },
    onDisconnect: () => {
      router.push('/login');
      user.reset();
    },
  });

  useEffect(() => {
    if (account.address) {
      fetchUser();
    } else {
      router.push('/login');
    }
  }, [account.address]);

  const fetchUser = async () => {
    const data = await userApi.getUser(account.address);

    if (!data) {
      router.push('/register');
      return false;
    }

    user.update(data);
    user.setLogged(true);

    return true;
  };

  return { user, fetchUser };
}
