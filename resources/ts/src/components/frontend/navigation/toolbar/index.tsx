import { Link } from "react-router-dom";

import Logo from "../../../ui/logo";

export default function Toolbar() {
    return (
        <header className="sticky w-full top-0 z-40 bg-white/50 backdrop-blur-sm border-b h-[58px] flex items-center">
            <div className="container">
                <div className="flex items-center py-[12px] lg:py-[10px]">
                    <div className="flex justify-start">
                        <Link to="/" className="cursor-pointer">
                            <span className="sr-only">{"Waspi Rewards"}</span>
                            <Logo />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
