export class Client {

    constructor() {
        this.initListeners();
    }

    private doGet(): boolean {
        const console: HTMLTextAreaElement = document.getElementById("console") as HTMLTextAreaElement;
        console.textContent = "do get";
        return true;
    }

    private doDelete(): boolean {
        const console: HTMLTextAreaElement = document.getElementById("console") as HTMLTextAreaElement;
        console.textContent = "do delete";
        return true;
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
