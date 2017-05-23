import { CMyClass } from "./MyClass";

window.onload = (): void => {
    main();
};

function main() {
    const console: HTMLTextAreaElement = document.getElementById("console") as HTMLTextAreaElement;
    const myClass: CMyClass = new CMyClass();
    console.textContent = myClass.getMessage();
}
