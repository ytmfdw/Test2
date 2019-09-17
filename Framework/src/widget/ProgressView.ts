import { ui } from "../ui/layaMaxUI";

export default class ProgressView extends ui.widget.ProgressViewUI {
    private maxValue: number = 100;//最大值
    private minValue: number = 0;//最小值
    private progress: number = 0;//当前进度值
    constructor() {
        super();
    }

    public getProgress(): number {
        return this.progress;
    }

    public setProgress(progress: number, max?: number, min?: number): void {
        if (!isNaN(min)) {
            this.minValue = min;
        }
        if (!isNaN(max)) {
            this.maxValue = max;
        }
        this.progress = progress;
        //根据百分比，计算应该移动的距离 
        //该移动的距离 
        var per = this.progress / (this.maxValue - this.minValue) * this.progressBar.width;

        var moveX = -this.progressBar.width / 2 + per;
        //计算mask的位置
        // var maskX = this.progressBar.width * 3 / 2 - per;
        this.progressMask.x = moveX;
    }
}