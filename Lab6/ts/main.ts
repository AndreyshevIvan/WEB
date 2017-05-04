import { CSetApplication } from "./SetApplication";

window.onload = (): void => {
    main();
};

function main() {
    const drawingArea: HTMLElement = document.getElementById("drawing_area");
    const application: CSetApplication = new CSetApplication(drawingArea);
    const startTime: number = performance.now();
    application.enterProcess();
    const timeTaken: number = performance.now() - startTime;
    alert(timeTaken);
}
