export class CMyClass {
    private message: string;

    constructor() {
        this.message = "Hello, world!";
    }

    public getMessage(): string {
        return this.message;
    }
}
