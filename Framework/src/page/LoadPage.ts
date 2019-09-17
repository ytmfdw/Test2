import { ui } from "../ui/layaMaxUI";
import ProgressView from "../widget/ProgressView";
import { AppConfig } from "../AppConfig";
import Log from "../utils/Log";

export default class LoadPage extends ui.page.LoadPageUI {
    private static self: LoadPage = null;

    private progressBar: ProgressView = null;

    private subpackage = [
        'res', 'comp', 'level', 'sound'
    ];
    private stateFlag = [];
    private subLen = 0;
    //加载索引值
    private loadIndex = 0;
    public min: number = 0;
    public max: number = 100;
    //总共移动距离：460  当前位置
    public progress: number = 0;


    private callBack: Function = null;

    constructor() {
        super();

        this.progressBar = new ProgressView();
        this.progressBarLayout.addChild(this.progressBar);
        this.subLen = this.subpackage.length;
    }

    public setCallBack(callBack: Function) {
        this.callBack = callBack;
    }

    public static getSelf(callBack?: Function): LoadPage {
        if (LoadPage.self == null) {
            LoadPage.self = new LoadPage();
        }
        if (callBack) {
            LoadPage.self.setCallBack(callBack);
            LoadPage.self.loadRes(callBack);
        }
        return LoadPage.self;
    }

    private totalProgress: Array<number> = [0, 0, 0];
    public loadRes(callBack: Function): void {
        this.callBack = callBack;
        this.setProgress(0);
        let thiz = this;
        thiz.loadIndex = 0;
        let isSuccess: boolean = true;
        if (!AppConfig.isWX || this.subLen == 0) {
            thiz.onCompelete(isSuccess);
            return;
        }
        //加载分包
        for (let i = 0; i < this.subLen; i++) {
            if (thiz.stateFlag[i]) {
                thiz.loadIndex++;
                // thiz.loadProgress.value = thiz.loadIndex / thiz.subLen;
                // thiz.loadText.text = '正在玩命加载...' + thiz.loadIndex + '/' + thiz.subLen;
                if (thiz.loadIndex == thiz.subLen) {
                    thiz.onCompelete(isSuccess);
                }
                continue;
            }
            let loadTask = wx.loadSubpackage({
                name: this.subpackage[i], // name 可以填 name 或者 root
                success: (res) => {
                    // 分包加载成功后通过 success 回调
                    Log.d(res);
                    thiz.stateFlag[i] = true;
                },
                fail: (res) => {
                    // 分包加载失败通过 fail 回调
                    isSuccess = false;
                    thiz.stateFlag[i] = false;
                },
                complete() {
                    thiz.loadIndex++;
                    // thiz.loadProgress.value = thiz.loadIndex / thiz.subLen;
                    if (thiz.loadIndex == thiz.subLen) {
                        // Laya.timer.once(2000, thiz, thiz.onCompelete, [true]);
                        thiz.onCompelete(isSuccess);
                    }
                }
            });

            loadTask.onProgressUpdate(res => {
                Log.d('下载进度  i=>' + i, res.progress)
                Log.d('已经下载的数据长度', res.totalBytesWritten)
                Log.d('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)

                thiz.totalProgress[i] = res.totalBytesWritten / res.totalBytesExpectedToWrite * 100;
                let per = (thiz.totalProgress[0] + thiz.totalProgress[1] + thiz.totalProgress[2]) / 300;
                // thiz.loadProgress.value = (thiz.totalProgress[0] + thiz.totalProgress[1] + thiz.totalProgress[2]) / 300;
                thiz.setProgress(per * 100);
            })
        }



    }

    public setProgress(progress: number, min?: number, max?: number) {
        if (!isNaN(min)) {
            this.min = min;
        }
        if (!isNaN(max)) {
            this.max = max;
        }
        this.progress = progress;
        //根据百分比，计算应该移动的距离 
        //该移动的距离 
        this.progressBar.setProgress(this.progress);
        // this.progressBar.x = moveX;
        this.loadText.text = '正在玩命加载...' + Math.round(progress) + '%';
    }

    /**
     * 加载结束
     * 
     * @private
     * @memberof LoadPage
     */
    private onCompelete(flag: boolean): void {
        if (this.callBack) {
            this.callBack(flag);
        }
    }

    onDisable() {
        Log.d("移出舞台");
        LoadPage.self = null;
        this.destroy();
    }
}