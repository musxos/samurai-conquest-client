import classNames from "classnames";
import Link from "next/link"
import { useState } from "react";

export type AsideProps = {
    className?: string;
}

export function Aside ({ className }: AsideProps = {})
{
    const [modal, setModal] = useState(false)

    function handleModal() {
        setModal(!modal)
    }

    return (<>
        <aside
            className={`sticky top-0 min-h-screen h-full w-16 bg-neutral-900 flex flex-col items-center px-4 py-6 z-10 border-r border-r-neutral-800 text-neutral-600 ${className}`}
        >
            <Link
                active-class="!text-violet-500"
                href="/"
                className="w-12 h-12 hover:bg-neutral-800 rounded-full flex items-center justify-center"
            >
                <i className="ri-gamepad-line text-2xl"></i>
            </Link>
            <Link
                active-class="!text-violet-500"
                href="/marketplace"
                className="w-12 h-12 hover:bg-neutral-800 rounded-full flex items-center justify-center"
            >
                <i className="ri-store-2-line text-2xl"></i>
            </Link>
            <Link
                active-class="!text-violet-500"
                href="/inventory"
                className="w-12 h-12 hover:bg-neutral-800 rounded-full flex items-center justify-center"
            >
                <i className="ri-briefcase-3-line text-2xl"></i>
            </Link>
            <button onClick={handleModal} className="w-12 h-12 hover:bg-neutral-800 rounded-full flex items-center justify-center">
                <i className="ri-indent-increase text-2xl"></i>
            </button>
            <button className="w-12 h-12 hover:bg-neutral-800 rounded-full flex items-center justify-center">
                <i className="ri-global-line text-2xl"></i>
            </button>
            <button className="w-12 h-12 hover:bg-neutral-800 rounded-full flex items-center justify-center mt-auto">
                <i className="ri-question-mark text-violet-500 text-2xl"></i>
            </button>
        </aside >

        <div>
            <div
                className={classNames("absolute h-full transform transition-all right-0 top-0 z-50", {
                    "translate-x-0": modal, 
                    "translate-x-full": !modal,
                })}
            >
                <div className="bg-neutral-900 h-full px-6 py-8 min-w-[332px] border-l border-indigo-500/20">
                    <h1 className="text-2xl font-semibold text-neutral-300">COLLECTIONS</h1>
                    <p className="text-neutral-600 font-medium">CHECK IT OUT</p>

                    <div className="flex flex-col mt-4 gap-4">
                        <button className="overflow-hidden border-2 border-violet-500/50 rounded-2xl">
                            <img className="h-24 w-full object-cover opacity-50" src="/29.png" alt="" />
                        </button>
                        <button className="overflow-hidden border-2 border-violet-500/50 rounded-2xl">
                            <img className="h-24 w-full object-cover opacity-50" src="/30.png" alt="" />
                        </button>
                        <button className="overflow-hidden border-2 border-violet-500/50 rounded-2xl">
                            <img className="h-24 w-full object-cover opacity-50" src="/31.png" alt="" />
                        </button>
                        <button className="overflow-hidden border-2 border-violet-500/50 rounded-2xl">
                            <img className="h-24 w-full object-cover opacity-50" src="/32.png" alt="" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
