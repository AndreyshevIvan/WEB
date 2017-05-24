export class Client {

    constructor() {
        this.initListeners();
    }

    private doGet(): boolean {
        const console: HTMLElement = document.getElementById("console");
        console.innerHTML += "do get";
        return true;
    }

    private doDelete(): boolean {
        const console: HTMLElement = document.getElementById("console");
        console.innerHTML += "do delete";
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
