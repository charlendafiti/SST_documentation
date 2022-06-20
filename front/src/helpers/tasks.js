export async function getTasks() {
    return await fetch('http://localhost:3021/tasks')
        .then(readableStream => readableStream.json());
} 
