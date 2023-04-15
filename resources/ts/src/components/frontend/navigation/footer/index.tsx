import { HeartIcon } from "@heroicons/react/24/outline";

export default function Footer() {
    return (
        <footer className="relative bg-primary text-white">
            <div className="py-8">
                <div className="container space-y-3 lg:space-y-0 lg:flex items-center">
                    <div className="flex items-center justify-center space-x-3">
                        <span>
                            &copy; {new Date().getFullYear()}{" "}
                            <span className="font-bold">{"Waspi Rewards"}</span>
                            . Made with{" "}
                            <HeartIcon className="w-4 inline-block" /> by{" "}
                            <span className="font-bold">{"marvinboris"}</span>.
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
