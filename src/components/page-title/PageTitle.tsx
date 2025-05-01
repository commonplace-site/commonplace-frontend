import { Home } from "lucide-react";
import Link from "next/link";
import { JSX } from "react";

const arrow = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left h-4 w-4 mr-2"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>;

const PageTitle = ({ returnPage, returnPageHref, title = 'Unknown Page', icon = <Home size={22} />, subtitle }: { returnPage?: string, returnPageHref?: string, title?: string, icon?: JSX.Element, subtitle?: string }) => {
    return <div className="mb-4">
        <div className="flex">
            {(returnPage && returnPageHref) && (
                <div className="absolute mt-[3px] border border-[#322945] rounded-xl bg-black/40 p-2 pr-3 bg-clip-padding">
                    <Link className={`flex items-center text-[14px] font-[700] tracking-[-0.05em] text-[#D1D0D5]`} href={`${returnPageHref}`}>{arrow} Return to {returnPage}</Link>
                </div>
            )}
            <div className="w-full flex items-center justify-center">
                <div style={{ color: "#A5B4FB" }} className="mr-2">{icon}</div>
                <div className="title">{title}</div>
            </div>
        </div>
        {subtitle && <div className="subtitle w-fit m-auto">{subtitle}</div>}
    </div>
}

export default PageTitle;