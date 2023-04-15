import { ReactNode } from 'react'

import Footer from './footer'
import Toolbar from './toolbar'

interface LayoutProps {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return <div className='min-h-screen flex flex-col relative'>
        <Toolbar />

        <div className="main-wrapper sticky top-0 pb-24">
            {children}
        </div>

        <Footer />
    </div>
}