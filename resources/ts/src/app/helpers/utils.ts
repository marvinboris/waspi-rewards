import ValidationType from '../types/validation'

export const classNames = (...c: string[]) => c.join(' ')

export const message = (content: string, type: 'danger' | 'warning' | 'success' | 'info' = 'info') => ({ type, content })

export const updateObject = (oldObject: { [key: string | number]: any }, updatedProps: { [key: string | number]: any }) => ({
    ...oldObject, ...updatedProps
});

export const convertDate = (date: string | number | Date) => {
    if (!date) return null;

    const d = new Date(date)
    const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' });

    return dtf.formatToParts(d).map(({ value }) => value).join('');
};

const twoDigits = (number: number) => number < 10 ? '0' + number : number;

export const convertTime = (date: string | number | Date) => {
    const d = new Date(date);
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();

    return `${twoDigits(hours)} : ${twoDigits(minutes)} : ${twoDigits(seconds)}`;
}

export const timeFromTimestamp = (timestamp: number) => {
    const totalSeconds = Math.round(timestamp);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
    const seconds = totalSeconds - hours * 3600 - minutes * 60;

    return `${twoDigits(hours)} : ${twoDigits(minutes)} : ${twoDigits(seconds)}`;
}

export const checkValidity = (value = '', rules: ValidationType) => {
    const validation: { [key: string]: boolean } = {};

    if (rules.required) validation.required = ((typeof value === 'string') && value.trim() !== '') || typeof value === 'number';

    if (rules.confirm) validation.confirm = value === rules.confirm;

    if (rules.minLength) validation.minLength = value.length >= rules.minLength;

    if (rules.maxLength) validation.maxLength = value.length <= rules.maxLength;

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        validation.isEmail = pattern.test(value);
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        validation.isNumeric = pattern.test(value);
    }

    return validation;
};

export const htmlEntities = (str: string) => {
    if ((str === null) || (str === ''))
        return false;
    else
        str = str.toString();

    // Regular expression to identify HTML tags in 
    // the input string. Replacing the identified 
    // HTML tag with a null string.
    return str.replace(/(<([^>]+)>)/ig, '');
}