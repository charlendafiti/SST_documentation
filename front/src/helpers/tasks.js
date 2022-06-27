import config from '../config/generalConfig.js';

/**
 * Returns the tasks
 * 
 * @returns array
 */
export async function getTasks() {
    return await fetch((config.host || '') + '/tasks', {
        headers: new Headers({
            token: getToken()
        })
    }).then(readableStream => readableStream.json());
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

/**
 * Returns the token 
 * 
 * @returns String
 */
export function getToken() {
    return window.localStorage.token; 
}

/**
 * Retorna uma string escapada 
 * 
 * @param String str 
 * @returns String
 */
export function escape(str) {
    return str.replace(/[\\]/g, '\\\\')
                .replace(/[\"]/g, '\\\"')
                .replace(/[\/]/g, '\\/')
                .replace(/[\b]/g, '\\b')
                .replace(/[\f]/g, '\\f')
                .replace(/[\n]/g, '\\n')
                .replace(/[\r]/g, '\\r')
                .replace(/[\t]/g, '\\t');
}