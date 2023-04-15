import { HeadProvider, Link } from "react-head";

interface PageTitleProps {
    title: string;
    subtitle?: string;
}

export default function PageTitle({ title, subtitle }: PageTitleProps) {
    return (
        <div className="relative z-0 py-20">
            <HeadProvider>
                <Link
                    rel="preload"
                    as="image"
                    imageSizes="(max-width: 1400px) 100vw, 1400px"
                    imageSrcSet="
                        /images/frontend/sigmund-r6tyWx_Mm9g-unsplash_ndocc5/sigmund-r6tyWx_Mm9g-unsplash_ndocc5_c_scale,w_200.webp 200w,
                        /images/frontend/sigmund-r6tyWx_Mm9g-unsplash_ndocc5/sigmund-r6tyWx_Mm9g-unsplash_ndocc5_c_scale,w_500.webp 500w,
                        /images/frontend/sigmund-r6tyWx_Mm9g-unsplash_ndocc5/sigmund-r6tyWx_Mm9g-unsplash_ndocc5_c_scale,w_720.webp 720w,
                        /images/frontend/sigmund-r6tyWx_Mm9g-unsplash_ndocc5/sigmund-r6tyWx_Mm9g-unsplash_ndocc5_c_scale,w_1016.webp 1016w,
                        /images/frontend/sigmund-r6tyWx_Mm9g-unsplash_ndocc5/sigmund-r6tyWx_Mm9g-unsplash_ndocc5_c_scale,w_1142.webp 1142w,
                        /images/frontend/sigmund-r6tyWx_Mm9g-unsplash_ndocc5/sigmund-r6tyWx_Mm9g-unsplash_ndocc5_c_scale,w_1262.webp 1262w,
                        /images/frontend/sigmund-r6tyWx_Mm9g-unsplash_ndocc5/sigmund-r6tyWx_Mm9g-unsplash_ndocc5_c_scale,w_1400.webp 1400w"
                    href="/images/frontend/sigmund-r6tyWx_Mm9g-unsplash.webp"
                    className="image-cover"
                />
            </HeadProvider>
            <img
                sizes="(max-width: 1400px) 100vw, 1400px"
                srcSet="
                    /images/frontend/sigmund-r6tyWx_Mm9g-unsplash_ndocc5/sigmund-r6tyWx_Mm9g-unsplash_ndocc5_c_scale,w_200.webp 200w,
                    /images/frontend/sigmund-r6tyWx_Mm9g-unsplash_ndocc5/sigmund-r6tyWx_Mm9g-unsplash_ndocc5_c_scale,w_500.webp 500w,
                    /images/frontend/sigmund-r6tyWx_Mm9g-unsplash_ndocc5/sigmund-r6tyWx_Mm9g-unsplash_ndocc5_c_scale,w_720.webp 720w,
                    /images/frontend/sigmund-r6tyWx_Mm9g-unsplash_ndocc5/sigmund-r6tyWx_Mm9g-unsplash_ndocc5_c_scale,w_1016.webp 1016w,
                    /images/frontend/sigmund-r6tyWx_Mm9g-unsplash_ndocc5/sigmund-r6tyWx_Mm9g-unsplash_ndocc5_c_scale,w_1142.webp 1142w,
                    /images/frontend/sigmund-r6tyWx_Mm9g-unsplash_ndocc5/sigmund-r6tyWx_Mm9g-unsplash_ndocc5_c_scale,w_1262.webp 1262w,
                    /images/frontend/sigmund-r6tyWx_Mm9g-unsplash_ndocc5/sigmund-r6tyWx_Mm9g-unsplash_ndocc5_c_scale,w_1400.webp 1400w"
                src="/images/frontend/sigmund-r6tyWx_Mm9g-unsplash.webp"
                alt="Bannière"
                className="image-cover absolute inset-0 -z-20"
            />
            <div className="absolute inset-0 -z-10 bg-grid-white/[0.05] after:absolute after:inset-0 after:bottom-0 after:-z-20 after:bg-gradient-to-t after:from-primary/70 after:to-primary/30" />

            <div className="container text-center text-white">
                <h1 className="font-display mx-auto max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl">
                    {title}
                </h1>

                {subtitle ? (
                    <p className="mx-auto mt-6 max-w-2xl text-sm tracking-tight sm:text-base">
                        {subtitle}
                    </p>
                ) : null}
            </div>
        </div>
    );
}
