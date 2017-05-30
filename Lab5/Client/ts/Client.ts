import { CConsole } from "./ClientConsole";

export class Client {
    private inputField: HTMLElement = document.getElementById("request_input");
    private display: HTMLElement = document.getElementById("catalog_display");
    private console: CConsole = new CConsole();

    constructor() {
        this.initListeners();
        this.updateDirectory();
    }

    private doGet(): void {
        const fileUrl: string = this.getRequestBody();
        if (fileUrl.length === 0) {
            this.updateDirectory();
            return;
        }
        this.doFileGet(fileUrl);
    }

    private doDelete(): void {
        const request: XMLHttpRequest = new XMLHttpRequest();
        const fileUrl: string = this.getRequestBody();
        this.console.delStart(fileUrl);
        request.onreadystatechange = (): void => {
            if (request.readyState !== 4) {
                return;
            }
            if (request.status !== 200) {
                this.console.delError(fileUrl, request.status);
                return;
            }
            this.console.delSuccess(fileUrl, request.status);
            this.updateDirectory();
        };
        request.open("DELETE", "/" + fileUrl);
        request.send();
    }

    private doFileGet(fileUrl: string) {
        this.console.get(fileUrl);
        const request: XMLHttpRequest = new XMLHttpRequest();
        request.onreadystatechange = (): void => {
            if (request.readyState !== 4) {
                return;
            }
            if (request.status !== 200) {
                this.console.getError(fileUrl, request.status);
                return;
            }
            this.console.getSuccess(fileUrl, request.status, request.responseText);
        };
        request.open("GET", "/" + fileUrl);
        request.send();
    }

    private updateDirectory(): void {
        this.console.updDirStart();
        const request: XMLHttpRequest = new XMLHttpRequest();
        request.onreadystatechange = (): void => {
            if (request.readyState !== 4) {
                return;
            }
            if (request.status !== 200) {
                this.console.updError(request.status);
                return;
            }
            this.updateDirectoryView(request.responseText);
            this.console.updSuccess(request.status);
        };
        request.open("GET", "/");
        request.send();
    }

    private getRequestBody(): string {
        const field = this.inputField as HTMLInputElement;
        return field.value;
    }

    private updateDirectoryView(directories: string): void {
        while (this.display.firstChild) {
            this.display.removeChild(this.display.firstChild);
        }
        const filesJson: any = JSON.parse(directories);
        for (let i = 0; i < filesJson.length; ) {
            this.display.innerHTML += this.clearFileName(filesJson[i].name) + "<br/>";
            i++;
        }
    }

    private clearFileName(fileName: string): string {
        let result: string = "";
        let isClear: boolean = false;
        for (let i = 0; i < fileName.length; i++) {
            if (!isClear) {
                isClear = fileName[i] === "/";
                continue;
            }
            result += fileName[i];
        }
        return result;
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
