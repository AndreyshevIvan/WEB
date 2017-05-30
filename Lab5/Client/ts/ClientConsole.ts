export class CConsole {
    private field: HTMLElement;
    private end: string;

    constructor() {
        this.field = document.getElementById("console");
        this.end = "<br/>";
    }

    public get(file: string): void {
        this.print("GET " + file);
    }

    public getError(file: string, code: number): void {
        this.print("GET " + file + " error, code: " + code.toString());
    }

    public getSuccess(file: string, code: number, contain: string): void {
        this.print("GET " + file + " end with code: " + code.toString());
        this.print(file + " contain: ");
        this.print(contain);
    }

    public updDirStart(): void {
        this.print("Update directory view");
    }

    public updSuccess(code: number): void {
        this.print("Update directory view end with code: " + code.toString());
    }

    public updError(code: number): void {
        this.print("Update directory view error, code: " + code.toString());
    }

    public delStart(file: string): void {
        this.print("DELETE " + file);
    }

    public delSuccess(file: string, code: number): void {
        this.print("DELETE " + file + " end with code: " + code.toString());
    }

    public delError(file: string, code: number): void {
        this.print("DELETE " + file + " error, code: " + code.toString());
    }

    private print(message: string): void {
        this.field.innerHTML += message + this.end;
    }
}
