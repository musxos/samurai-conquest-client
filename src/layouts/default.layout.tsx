import { Aside } from "@/components/layout/aside.component";
import { Navbar } from "@/components/layout/navbar.component";

export type DefaultLayoutProps = {
    children: JSX.Element;
}

export function DefaultLayout ({ children }: DefaultLayoutProps)
{
    return <div className="flex min-h-full">
        <Aside></Aside>
        <main className="grow relative max-w-full">
            <div className="px-6 py-8 flex w-full absolute">
                <Navbar className="w-full" wallet={true} profile={true} messages={true} notifications={true}></Navbar>
            </div>
            <div className="w-full min-h-full">
                {children}
            </div>
        </main>
    </div>
}