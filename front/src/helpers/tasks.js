import config from '../config/generalConfig.js';

export async function getTasks() {
    return await fetch((config.host || '') + '/tasks')
        .then(readableStream => readableStream.json());
} 
