import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@/app/store';

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = ((Component as any).getLayout as any) || ((page) => page);

  return (
    <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>
  );
}
