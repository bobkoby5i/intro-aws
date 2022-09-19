export class NotFoundException extends Error {
    public statusCode = 404;
    public responseBody: string;

    constructor(objectName: string, searchId: string) {
        super(JSON.stringify({error: `Object ${objectName} id = ${searchId} not found.`}));
        this.responseBody = JSON.stringify({error: `Object ${objectName} id = ${searchId} not found.`});
    }
}