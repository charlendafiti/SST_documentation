export async function getTasks() {
    return await fetch('/tasks')
        .then(readableStream => readableStream.json());
} 
