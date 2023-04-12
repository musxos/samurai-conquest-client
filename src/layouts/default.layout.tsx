import { Aside } from '@/components/layout/aside.component';
import { Navbar } from '@/components/layout/navbar.component';

export type DefaultLayoutProps = {
  children: JSX.Element;
};

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <div className="sticky top-10 mx-auto flex h-full w-full max-w-screen-lg justify-center">
        <div className="absolute h-[500px] w-[500px] bg-violet-500 blur-[500px]"></div>
      </div>
      <div className="flex">
        <Aside></Aside>
        <main className="flex flex-col relative max-w-full grow">
          <div className="absolute flex w-full px-6 py-8">
            <Navbar className="w-full"></Navbar>
          </div>
          <div className="grow">{children}</div>
        </main>
      </div>
    </>
  );
}
