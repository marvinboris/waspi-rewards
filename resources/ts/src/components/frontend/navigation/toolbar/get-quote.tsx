import {
    BoltIcon,
    CalendarDaysIcon,
    EnvelopeIcon,
    MapPinIcon,
    UserIcon,
    WrenchIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";

import { useContentContext } from "../../../../app/contexts/content";
import { useLanguageContext } from "../../../../app/contexts/language";
import Status from "../../../../app/types/enums/status";
import MessageType from "../../../../app/types/message";

import Alert from "../../ui/alert";
import Button from "../../ui/form/button";
import Input from "../../ui/form/input";
import Select from "../../ui/form/select";
import TextArea from "../../ui/form/text-area";
import View from "../../../ui/view";

const initialState = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    service: "",
    date: "",
    comment: "",
};

export default function GetQuote() {
    const { content } = useContentContext();
    const {
        services,
        cms: {
            frontend: {
                header: { menu },
                components: { quote },
            },
        },
    } = content!;

    const { language } = useLanguageContext();
    const abbr = language?.abbr!;

    const [status, setStatus] = useState(Status.IDLE);
    const [message, setMessage] = useState<MessageType | null>(null);
    const [value, setValue] = useState({ ...initialState });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (status === Status.LOADING) return;
        try {
            setStatus(Status.LOADING);
            const res = await axios.post<{ message: MessageType }>(
                "/api/quote",
                value
            );
            setMessage(res.data.message);
            setStatus(Status.IDLE);
            setValue({ ...initialState });
        } catch (error) {
            setMessage({ type: "danger", content: (error as Error).message });
            setStatus(Status.FAILED);
        }
    };

    const onChange = (
        e: ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => setValue({ ...value, [e.target.name]: e.target.value });

    return (
        <View
            action={
                <Button color="white" size="sm">
                    <span className="sr-only">{menu.quote}</span>
                    <span className="hidden font-medium md:inline">
                        {menu.quote}
                    </span>
                    <span>
                        <BoltIcon className="inline-block w-5 text-primary/60 transition-all duration-200 group-hover:text-primary md:ml-2" />
                    </span>
                </Button>
            }
        >
            <form onSubmit={handleSubmit} className="mx-auto max-w-xl">
                <div className="container">
                    <div className="mb-[17px] text-center text-lg font-bold text-primary md:mb-[5px] md:text-left md:text-3xl">
                        {quote.title}
                    </div>

                    {/* <div className='text-sm md:text-lg text-center md:text-left mb-[30px] md:mb-[22px]'>{quote.subtitle}</div> */}

                    {message && (
                        <Alert className="mb-4" color={message.type}>
                            {message.content}
                        </Alert>
                    )}

                    <div className="mb-[22.8px] grid grid-cols-1 gap-x-[17.34px] gap-y-[13.63px] sm:grid-cols-2">
                        <Input
                            inputSize="sm"
                            name="first_name"
                            icon={UserIcon}
                            value={value.first_name}
                            placeholder={quote.form.first_name}
                            required
                            validation={{ required: true }}
                            onChange={onChange}
                        />
                        <Input
                            inputSize="sm"
                            name="last_name"
                            icon={UserIcon}
                            value={value.last_name}
                            placeholder={quote.form.last_name}
                            required
                            validation={{ required: true }}
                            onChange={onChange}
                        />
                        <Input
                            inputSize="sm"
                            type="email"
                            name="email"
                            icon={EnvelopeIcon}
                            value={value.email}
                            placeholder={quote.form.email}
                            required
                            validation={{ required: true, isEmail: true }}
                            onChange={onChange}
                        />
                        <Input
                            inputSize="sm"
                            addon={
                                <div className="text-sm font-semibold text-primary sm:text-primary/20">
                                    237
                                </div>
                            }
                            type="tel"
                            name="phone"
                            required
                            validation={{ required: true }}
                            onChange={onChange}
                            value={value.phone}
                            placeholder={quote.form.phone}
                        />
                        <Input
                            inputSize="sm"
                            icon={MapPinIcon}
                            name="address"
                            required
                            validation={{ required: true }}
                            onChange={onChange}
                            value={value.address}
                            placeholder={quote.form.address}
                            className="sm:col-span-2"
                        />
                        <Select
                            inputSize="sm"
                            icon={WrenchIcon}
                            name="service"
                            value={value.service}
                            required
                            validation={{ required: true }}
                            onChange={onChange}
                        >
                            <option value="">
                                {quote.form.select_service}
                            </option>
                            {services.map((service) => (
                                <option
                                    key={JSON.stringify(service)}
                                    value={service.id}
                                >
                                    {service.title[abbr]}
                                </option>
                            ))}
                        </Select>
                        <Input
                            inputSize="sm"
                            type="date"
                            icon={CalendarDaysIcon}
                            name="date"
                            required
                            validation={{ required: true }}
                            onChange={onChange}
                            value={value.date}
                            placeholder={quote.form.date}
                        />
                        <TextArea
                            inputSize="sm"
                            name="comment"
                            required
                            validation={{ required: true }}
                            onChange={onChange}
                            value={value.comment}
                            placeholder={quote.form.comment}
                            className="sm:col-span-2"
                        />
                    </div>

                    <div className="text-center">
                        <Button type="submit" status={status}>
                            {quote.form.continue}
                        </Button>
                    </div>
                </div>
            </form>
        </View>
    );
}
