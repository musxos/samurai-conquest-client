import { Aside } from "@/components/layout/aside.component";
import { Navbar } from "@/components/layout/navbar.component";

export type DefaultLayoutProps = {
    children: JSX.Element;
}

export function DefaultLayout ({ children }: DefaultLayoutProps)
{
    return <div className="flex min-h-screen h-full">
        <Aside></Aside>
        <main className="grow relative max-w-full">
            <div className="px-6 py-8 flex w-full absolute">
                <Navbar className="w-full"></Navbar>
            </div>
            <div className="w-full min-h-screen">
                {children}
            </div>
        </main>
    </div>
}