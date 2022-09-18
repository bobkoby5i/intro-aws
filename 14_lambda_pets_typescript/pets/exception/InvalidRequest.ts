export class InvalidRequest extends Error {
    public statusCode = 400;
    public responseBody: string;

    constructor(message: string) {
        super(JSON.stringify({error: `Invalid request: ${message}`}));
        this.responseBody = JSON.stringify({error: `Invalid request: ${message}`});
    }
}