import { ComponentProps } from "react";

export default function Logo(props: ComponentProps<"img">) {
    return (
        <div className="flex items-end gap-1">
            <img
                {...props}
                src="/images/favicon.svg"
                alt="Logo"
                className="h-7 w-auto flex-none"
            />
            <span className="font-semibold text-transparent bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-xl">Waspi Rewards</span>
        </div>
    );
    // return <span className="text-primary font-bold text-3xl flex items-center space-x-1"><span>HIALA</span><TvIcon className="w-8" /></span>
}
