import config from '../config/generalConfig.js';

/**
 * Returns the tasks
 * 
 * @returns array
 */
export async function getTasks() {
    return await fetch((config.host || '') + '/tasks')
        .then(readableStream => readableStream.json());
} 

/**
 * Verify if the token exists and is valid. 
 * 
 * @returns bool
 */
export function isValidToken() {

    const token = window.localStorage.token;  

    if(!token) {
        return false;
    }

    return token == config.token;  
}