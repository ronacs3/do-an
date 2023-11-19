import moment, { MomentInput } from 'moment/moment';
import config from '../config';

export const formatDate = (value?: MomentInput | Date, fallback = '-') => {
    if (!value) return fallback;

    const date = moment(value);
    return date.format(config.DATE_FORMAT.DISPLAY_DATE);
};
