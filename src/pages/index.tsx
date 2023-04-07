import { Map } from '@/components/map.component'
import { DefaultLayout } from '@/layouts/default.layout'
import Head from 'next/head'

export default function Home ()
{
  return (
    <>
      <Head>
        <title>Samurai Conquest</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Map></Map>
    </>
  )
}

Home.getLayout = (page: JSX.Element) =>
{
  return <DefaultLayout>{page}</DefaultLayout>
}
