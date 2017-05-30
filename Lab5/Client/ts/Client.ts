export class Client {
    private inputField: HTMLElement = document.getElementById("request_input");
    private console: HTMLElement = document.getElementById("console");
    private display: HTMLElement = document.getElementById("catalog_display");

    constructor() {
        this.initListeners();
    }

    private doGet(): void {
        const fileUrl: string = this.getRequestBody();
        if (fileUrl.length === 0) {
            this.console.innerHTML = "Do GET";
            this.updateDirectory();
            return;
        }
        const request: XMLHttpRequest = new XMLHttpRequest();
        request.onreadystatechange = (): void => {
            this.console.innerHTML = "STATUS = " + request.status.toString();
        };
        request.open("DEL", fileUrl);
        request.send();
    }

    private doDelete(): void {
        const request: XMLHttpRequest = new XMLHttpRequest();
        const requestBody: string = this.getRequestBody();
        request.onreadystatechange = (): void => {
            this.console.innerHTML = "STATUS = " + request.status.toString();
        };
        request.open("DELETE", requestBody);
        request.send();
    }

    private updateDirectory(): void {
        const request: XMLHttpRequest = new XMLHttpRequest();
        request.onreadystatechange = (): void => {
            this.console.innerHTML += "rS = " + request.readyState + " s = " + request.status.toString() + " | ";
        };
        request.open("GET", "");
        request.send();
    }

    private getRequestBody(): string {
        const field = this.inputField as HTMLInputElement;
        return field.value;
    }

    private initListeners(): void {
        document.getElementById("get_button").addEventListener("click", () => {
            this.doGet();
        });
        document.getElementById("delete_button").addEventListener("click", () => {
            this.doDelete();
        });
    }
}
