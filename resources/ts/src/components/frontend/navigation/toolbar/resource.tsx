import { Link } from 'react-router-dom'

interface ResourceProps {
    name: string
    href: string
}

export default function Resource({ href, name }: ResourceProps) {
    return <Link to={href}>
        <span className='text-base font-medium text-secondary-900 hover:text-secondary-700 dark:text-secondary-50 dark:hover:text-secondary-200'>{name}</span>
    </Link>
}