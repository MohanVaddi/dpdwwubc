export function tConvert(time: any) {
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

export function truncateAndAddElipsis (fname: string)  {
    return `${fname.slice(0, 15)}...`;
};