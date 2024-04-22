/**
 * @param { Number } time
 * @returns { Promise<undefined> }
 */
export const sleep = (time) => new Promise(resolve => setTimeout(resolve, time))
