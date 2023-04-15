import { CheckIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { ChangeEvent, InputHTMLAttributes, ReactNode, useState } from 'react'

import { checkValidity, classNames } from '../../../../../app/helpers/utils'
import ValidationType from '../../../../../app/types/validation'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    inputSize?: 'sm' | 'lg'
    icon?: (props: React.ComponentProps<'svg'>) => JSX.Element
    label?: ReactNode
    addon?: ReactNode
    append?: ReactNode
    validation?: ValidationType
}

export default function Input({ icon: Icon, label, addon, append, inputSize = 'lg', className, validation, ...props }: InputProps) {
    const [touched, setTouched] = useState(false)

    const valid = validation ? Object.values(checkValidity(props.value as string, validation)).reduce((a, b) => a && b, true) : true

    const onChange = props.onChange ? (e: ChangeEvent<HTMLInputElement>) => {
        setTouched(true)
        props.onChange!(e)
    } : () => { }

    return <div className={className}>
        {label && <label htmlFor={props.id ? props.id : props.name}>{label}</label>}

        <div className={classNames(inputSize === 'sm' ? "h-12" : "h-[60px]", "rounded-[300px] relative bg-secondary-100 flex items-center")}>
            <div>
                {Icon && <div className={classNames(inputSize === 'sm' ? "w-12" : "w-12 md:w-16", "flex relative z-10 justify-center")}>
                    {<Icon className={classNames(inputSize === 'sm' ? "w-4 text-primary" : 'w-6 text-primary md:text-primary/20')} />}
                    {inputSize === 'sm' && <div className='rounded-full w-1 h-1 bg-secondary-700/20 absolute right-1.5 top-1/2 -translate-y-1/2' />}
                </div>}
                {addon && <div className={classNames(inputSize === 'sm' ? "w-12" : "w-12 md:w-16", 'relative z-20 text-center flex items-center justify-center')}>{addon}</div>}
            </div>

            <div className={classNames(inputSize === 'sm' ? classNames(Icon || addon ? '' : 'pl-5', validation ? 'pr-10' : 'pr-5') : classNames(Icon || addon ? '' : 'pl-8', validation ? 'pr-12' : 'pr-8'), 'flex-1 relative z-0 h-full')}>
                <input {...props} onChange={onChange} className={classNames(inputSize === 'sm' ? 'text-sm' : 'text-lg', 'h-full border-none bg-transparent outline-none focus:ring-0 text-inherit w-full placeholder:opacity-30 p-0')} />

                {touched && validation ? <div className="absolute w-12 right-0 inset-y-0 flex items-center justify-center">
                    {valid ? <CheckIcon className='w-4 text-green' /> : <ExclamationCircleIcon className='w-4 text-red' />}
                </div> : null}
            </div>

            {append && <div className='pr-4'>{append}</div>}
        </div>
    </div>
}