const X_MIN: number = -1.7433419053321 - 0.00000000374 / 2;
const X_MAX: number = -1.7433419053321 + 0.00000000374 / 2;
const Y_MIN: number = 0.0000907687489 - 0.00000000374 / 2;
const Y_MAX: number = 0.0000907687489 + 0.00000000374 / 2;
const WIDTH: number = 800;
const HEIGHT: number = 800;
const ITERATIONS: number = 8000;
const ESCAPE_RADIUS: number = 6;

const CR_STEP: number = (X_MAX - X_MIN) / WIDTH;
const CI_STEP: number = (Y_MAX - Y_MIN) / HEIGHT;

export class CSetApplication {
    private drawingBlock: HTMLCanvasElement;
    private canvas: CanvasRenderingContext2D;

    constructor(drawingBlock: HTMLElement) {
        this.drawingBlock = drawingBlock as HTMLCanvasElement;
        this.drawingBlock.width = WIDTH;
        this.drawingBlock.height = HEIGHT;
        this.initCanvas();
        this.clear();
    }

    public enterProcess(): void {
        for (let y = 0; y < HEIGHT; y++)
        {
            for (var x = 0; x < WIDTH; x++)
            {
                const Cr: number = X_MIN + CR_STEP * x;
                const Ci: number = Y_MIN + CI_STEP * y;

                let Zr: number = 0;
                let Zi: number = 0;
                let Tr: number = 0;
                let Ti: number = 0;
                let n: number = 0;

                for (; n < ITERATIONS && (Tr + Ti) <= ESCAPE_RADIUS; ++n)
                {
                    Zi = 2.0 * Zr * Zi + Ci;
                    Zr = Tr - Ti + Cr;
                    Tr = Zr * Zr;
                    Ti = Zi * Zi;
                }
                const denominator: number = n / ITERATIONS;
                const color: number = (n == ITERATIONS) ? 0 : (255 * denominator);
                this.canvas.fillStyle = "#0000" + Math.floor(color);
                this.canvas.fillRect(x, y, 1, 1);
            }
        }
    }

    private initCanvas() {
        this.canvas = this.drawingBlock.getContext("2d");
        //this.canvas.translate(WIDTH / 2, HEIGHT / 2);
        this.canvas.lineJoin = "miter";
        this.canvas.lineCap = "square";
    }

    private clear(): void {
        this.canvas.clearRect(-WIDTH / 2, -HEIGHT / 2, WIDTH, HEIGHT);
    }
}
