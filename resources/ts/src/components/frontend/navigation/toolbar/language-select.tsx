import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'

import { useLanguageContext } from '../../../../app/contexts/language'

export default function LanguageSelect() {
    const { language, setLanguage, languages } = useLanguageContext()

    const selected = language!

    return language === null ? null : (
        <div className="w-full text-secondary-700">
            <Listbox value={selected} onChange={setLanguage}>
                <div className="relative">
                    <Listbox.Button className="relative w-full cursor-default text-left sm:text-sm">
                        {selected && <div className="flex items-center rounded-full py-[5px] md:py-[7px] pl-[6px] md:pl-[9px] w-[108px] md:w-36 cursor-pointer bg-secondary-100">
                            <div className='mr-2'>
                                <div className="w-[23px] md:w-7 h-[23px] md:h-7 rounded-full relative">
                                    <img src={`/images/flags/1x1/${selected.flag}.svg`} alt="Flag" className="rounded-full" />
                                </div>
                            </div>

                            <div className="font-medium text-xs md:text-sm mr-3">{selected.name}</div>

                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronDownIcon className="h-5 w-5 text-secondary-400" aria-hidden="true" />
                            </span>
                        </div>}
                    </Listbox.Button>

                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-xs md:text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {languages?.filter(l => l.abbr !== selected.abbr).map((l, index) => (
                                <Listbox.Option key={index} className={({ active }) => `relative cursor-pointer select-none p-2 ${active ? 'bg-primary/10 text-primary' : 'text-secondary-900'}`} value={l}>
                                    {({ selected }) => (<>
                                        <div className="flex items-center">
                                            <div className='mr-[5.55px]'>
                                                <div className="w-[19.42px] h-[19.42px] relative">
                                                    <img src={`/images/flags/1x1/${l.flag}.svg`} alt="Flag" className="rounded-full" />
                                                </div>
                                            </div>

                                            <div className={`truncate ${selected ? 'font-medium' : 'font-normal'}`}>{l.name}</div>
                                        </div>
                                        {selected ? (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        ) : null}
                                    </>)}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}
