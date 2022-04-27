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


