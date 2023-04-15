import { CheckIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { ChangeEvent, InputHTMLAttributes, ReactNode, useState } from 'react'

import { checkValidity, classNames } from '../../../../app/helpers/utils'
import ValidationType from '../../../../app/types/validation'

type InputProps = InputHTMLAttributes<HTMLTextAreaElement> & {
    inputSize?: 'sm' | 'lg'
    label?: ReactNode
    validation?: ValidationType
}

export default function TextArea({ label, inputSize = 'lg', validation, ...props }: InputProps) {
    const [touched, setTouched] = useState(false)

    const valid = validation ? Object.values(checkValidity(props.value as string, validation)).reduce((a, b) => a && b, true) : true

    const onChange = props.onChange ? (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTouched(true)
        props.onChange!(e)
    } : () => { }

    return <div className={props.className}>
        {label && <label className='truncate block' htmlFor={props.id ? props.id : props.name}>{label}</label>}

        <div className={classNames(inputSize === 'sm' ? 'rounded-[24px]' : 'rounded-[30px]', "bg-secondary-100 relative")}>
            <textarea {...props} onChange={onChange} className={classNames(inputSize === 'sm' ? classNames('text-sm min-h-[100px] p-4', validation ? 'pr-12' : 'pr-4') : classNames('text-lg min-h-[200px] py-5 pl-8', validation ? 'pr-12' : 'pr-8'), 'border-none bg-transparent outline-none focus:ring-0 placeholder:opacity-30 text-inherit w-full')} />

            {touched && validation ? <div className={classNames("absolute w-12 top-0 right-0 flex items-center justify-center", inputSize === 'sm' ? 'h-12' : 'h-[60px]')}>
                {valid ? <CheckIcon className='w-4 text-green' /> : <ExclamationCircleIcon className='w-4 text-red' />}
            </div> : null}
        </div>
    </div>
}