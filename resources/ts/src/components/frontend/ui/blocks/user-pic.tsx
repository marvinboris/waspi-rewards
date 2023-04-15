import { classNames } from "../../../../app/helpers/utils";
import UserType from "../../../../app/types/models/user";

type UserPicProps = {
    user: UserType;
    size?: "sm" | "xl" | "2xl";
};

export default function UserPic({ user, size = "sm" }: UserPicProps) {
    return (
        <div
            className={classNames(
                "aspect-square flex-none flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary/50 text-white font-bold",
                size === "2xl"
                    ? "w-14 text-2xl"
                    : size === "xl"
                    ? "w-12 text-xl"
                    : "w-8 text-sm"
            )}
        >
            {user.name
                .split(" ")
                .filter((w, i) => i < 2)
                .map((w) => w.charAt(0))
                .join("")}
        </div>
    );
}
