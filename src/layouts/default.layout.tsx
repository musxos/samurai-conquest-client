import { Aside } from '@/components/layout/aside.component';
import { Navbar } from '@/components/layout/navbar.component';

export type DefaultLayoutProps = {
  children: JSX.Element;
};

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <div className="sticky top-10 mx-auto max-w-screen-lg h-full w-full flex justify-center">
        <div className="w-[500px] h-[500px] bg-violet-500 absolute blur-[500px]"></div>
      </div>
      <div className="flex">
        <Aside></Aside>
        <main className="grow relative max-w-full">
          <div className="px-6 py-8 flex w-full absolute">
            <Navbar className="w-full"></Navbar>
          </div>
          <div className="w-full min-h-screen">{children}</div>
        </main>
      </div>
    </>
  );
}
