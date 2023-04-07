import { Aside } from "@/components/layout/aside.component";

export type DefaultLayoutProps = {
    children: JSX.Element;
}

export function DefaultLayout ({ children }: DefaultLayoutProps)
{
    return <div className="flex">
        <Aside></Aside>
        <main className="grow">
            {children}
        </main>
    </div>
}