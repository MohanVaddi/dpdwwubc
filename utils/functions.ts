export function tConvert(time: any) {
    time += ':00';
    time = time
        .toString()
        .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) {
        time = time.slice(1);
        time[3] = ' ';
        time[5] = +time[0] < 12 ? 'AM' : 'PM';
        time[0] = +time[0] % 12 || 12;
    }
    return time.join('');
}
export function isAvailable(startTime: string, endTime: string) {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getTime());
    startDate.setHours(parseInt(startTime.split(':')[0]));
    startDate.setMinutes(parseInt(startTime.split(':')[1]));
    startDate.setSeconds(parseInt(startTime.split(':')[2]));
    const endDate = new Date(currentDate.getTime());
    endDate.setHours(parseInt(endTime.split(':')[0]));
    endDate.setMinutes(parseInt(endTime.split(':')[1]));
    endDate.setSeconds(parseInt(endTime.split(':')[2]));
    const valid = startDate < currentDate && endDate > currentDate;
    return valid;
}

export function truncateAndAddElipsis(fname: string) {
    return `${fname.slice(0, 15)}...`;
}

/**
 *
 * @param millis millis or dateString.
 * @param seperator seperates date values with given seperatore.
 * @returns date seperated with seperators.
 */
export const getDate = (
    millis: string | number,
    seperator: '/' | '-' | '_' | '.' | '|' | '?'
) => {
    const date = new Date(millis);
    return `${date.getDate()}${seperator}${date.getMonth()}${seperator}${date.getFullYear()}`;
};

/**
 *
 * @param arr array to sort chronologicaly.
 * @param property property that holds the value to sort.
 * @returns sorted array.
 */
export const sortChronological = (arr: any[], property: string) => {
    return arr.sort((ele1, ele2) => ele2[property] - ele1[property]);
};

export const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getGooglePhotoUrl = (url: string, pixels: string) => {
    return `${url.split('=')[0]}=s${pixels}`;
};
