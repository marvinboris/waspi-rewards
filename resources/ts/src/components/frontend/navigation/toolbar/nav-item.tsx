import React, { ComponentProps, ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { classNames } from '../../../../app/helpers/utils'

interface NavItemProps {
    exact?: boolean
    href: string
    children: ReactNode
    icon?: (props: ComponentProps<'svg'>) => JSX.Element
}

export default function NavItem({ href, icon: Icon, exact, children }: NavItemProps) {
    const location = useLocation()
    const active = exact ? location.pathname === href : location.pathname.startsWith(href)

    const content = <>
        {Icon && <span className='mr-[6.65px]'><Icon className="w-4 text-white/20" /></span>}

        <span className={active ? 'relative after:inline-block after:ml-0.5 after:w-1 after:h-1 after:rounded-full after:bg-yellow' : ''}>{children}</span>
    </>

    return href.startsWith('#') ? <a href={href} className={classNames(active ? 'text-white font-bold scale-105' : 'font-medium text-secondary-300 hover:text-white', "truncate text-sm dark:text-secondary-200 dark:hover:text-white inline-flex items-center hover:font-bold scale-100 hover:scale-105 transition-all duration-200")}>
        {content}
    </a> : <Link to={href} className={classNames(active ? 'text-white font-bold scale-105' : 'font-medium text-secondary-300 hover:text-white', "truncate text-sm dark:text-secondary-200 dark:hover:text-white inline-flex items-center hover:font-bold scale-100 hover:scale-105 transition-all duration-200")}>
        {content}
    </Link>
}