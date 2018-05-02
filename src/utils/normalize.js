
import moment from 'moment';

const upper = value => value && value.toUpperCase()
const lower = value => value && value.toLowerCase()

const lessThan = otherField =>
    (value, previousValue, allValues) => value < allValues[otherField] ? value : previousValue
const greaterThan = otherField =>
    (value, previousValue, allValues) => value > allValues[otherField] ? value : previousValue

const isAfterDate = otherField => (value, previousValue, allValues) => {
    //alert(JSON.stringify(allValues))
    if (allValues[otherField].trim() == null) return value;
    const date1 = moment(value).format("MMMM DD [del] YYYY");
    const date2 = moment().format("MMMM DD [del] YYYY");
    if (!moment(date1).isAfter(moment(date2))) {
        return "";
    }

}
const isSameOrBeforeDate = otherField => (value, previousValue, allValues) => {
    if (allValues[otherField].trim() == null) return value;
    const pattern = /^([a-zA-Z]{4,15}[\s])([0-9]{2}[\s])del([\s][0-9]{4})$/;
    const example = moment(new Date()).format('MMMM DD [del] YYYY');
    if (!pattern.test(value.trim())) return "Fecha incorrecta. Ejem:" + example;
    const date1 = moment(value).format("MMMM DD [del] YYYY");
    const date2 = moment().format("MMMM DD [del] YYYY");
    if (!moment(date1).isSameOrBefore(moment(date2))) {
        return "";
    }
}
export const phone = (value, previousValue) => {
    if (!value) {
        return value
    }
    const onlyNums = value.replace(/[^\d]/g, '');

    if (!previousValue || value.length > previousValue.length) {
        // typing forward
        if (onlyNums.length === 3) {
            return onlyNums + ' '
        }
        if (onlyNums.length === 6) {
            return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3) + '-'
        }
    }
    if (onlyNums.length <= 3) {
        return onlyNums
    }
    if (onlyNums.length <= 6) {
        return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3)
    }
    return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3, 6) + '-' + onlyNums.slice(6, 10)
}
/**
 * Normalize CC
 */
export const numberWithDots = (value, previousValue) => {
    if (!value) {
        return value
    }
    const onlyNums = value.replace(/[^\d]/g, '');
    if (!previousValue || value.length > previousValue.length) {
        if (onlyNums.length === 1) {
            return onlyNums + '.'
        }
        if (onlyNums.length === 2) {
            return onlyNums + '.'
        }
        if (onlyNums.length === 3) {
            return onlyNums + '.'
        }
        if (onlyNums.length === 4) {
            return onlyNums[0] + '.' + onlyNums.slice(1, 4) + '.'
        }
        if (onlyNums.length === 5) {
            return onlyNums.slice(0, 2) + '.' + onlyNums.slice(2, 5) + '.'
        }
        if (onlyNums.length === 6) {
            return onlyNums.slice(0, 3) + '.' + onlyNums.slice(3) + '.'
        }

    }
    if (onlyNums.length <= 3) {
        return onlyNums
    }
    if (onlyNums.length <= 7) {
        return onlyNums[0] + '.' + onlyNums.slice(1, 4) + '.' + onlyNums.slice(4, 7)
    }
    if (onlyNums.length <= 8) {
        return onlyNums.slice(0, 2) + '.' + onlyNums.slice(2, 5) + '.' + onlyNums.slice(5, 8)
    }
    if (onlyNums.length <= 9) {
        return onlyNums.slice(0, 3) + '.' + onlyNums.slice(3, 6) + '.' + onlyNums.slice(6)
    }
    return onlyNums[0] + '.' + onlyNums.slice(1, 4) + '.' + onlyNums.slice(4, 7) + '.' + onlyNums.slice(7, 10)
}
const trim = (value, previousValue, values) => {
    if (!value) {
        return value
    }
    if(typeof value != 'string') return value;
    //   const onlyNums = value.replace(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/g, '');
    return String(value).trim();
}
/**
 * Force after min date
 */
const maxDate = (value, previousValue, values) => {
    const momentMinDate = moment(values.minDate, 'MM-DD-YYYY', true);
    const momentMaxDate = moment(value, 'MM-DD-YYYY', true);
    if (!momentMinDate.isValid() || !momentMaxDate.isValid()) {
        return value;
    }
    if (!momentMaxDate.isAfter(momentMinDate)) {
        return momentMinDate.add(1, 'd').format('MM-DD-YYYY');
    }
    return value;
};

/**
 * Force before max date
 */
const minDate = (value, previousValue, values) => {
    const momentMaxDate = moment(values.maxDate, 'MM-DD-YYYY', true);
    const momentMinDate = moment(value, 'MM-DD-YYYY', true);
    if (!momentMinDate.isValid() || !momentMaxDate.isValid()) {
        return value;
    }
    if (!momentMinDate.isBefore(momentMaxDate)) {
        return momentMaxDate.subtract(1, 'd').format('MM-DD-YYYY');
    }
    return value;
}

export const numeric = (value, previousValue, values) => {
    return value.replace(/[^\d]/g, '');
}

export const normalize = {
    phone,
    upper,
    lower,
    numeric,
    minDate,
    maxDate,
    numberWithDots,
    trim,
    isAfterDate,
    isSameOrBeforeDate
}