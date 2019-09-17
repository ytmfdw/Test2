import { ui } from "../ui/layaMaxUI";
import { insertCount } from "../utils/Count";
import { AppConfig } from "../AppConfig";
import { sharkAni } from "../utils/Common";

export default class AppView extends ui.item.appViewUI {
    // private datas: Array<DynamicData> = null;
    private index: number = -1;
    private father: Laya.Sprite = null;
    private isAni: boolean = true;
    public data: any = null;
    private pageName: string = null;
    constructor(pageName: string, context?: Laya.Sprite, noAni?: boolean) {
        super();
        if (noAni) {
            this.isAni = false;
        }
        this.pageName = pageName;
        this.on(Laya.Event.CLICK, this, this.clickGoToApp);
        //100:120
        if (context) {
            this.father = context;
            let scale = Math.min(this.father.width / 250, this.father.height / 300);
            this.scale(scale, scale);
            this.father.addChild(this);
        }
    }
    /**点击跳转 */
    private clickGoToApp(e: Laya.Event) {
        e.stopPropagation();
        if (!this.data || !this.data.appid) {
            return;
        }
        let thiz = this;
        insertCount({ type: '点击导量', mark: thiz.data.name + ',' + thiz.data.appid, page: thiz.pageName });
        if (AppConfig.systemInfo.version > '2.2.0') {
            wx.navigateToMiniProgram({
                appId: thiz.data.appid,
                path: thiz.data.path,
                extraData: {
                    from: AppConfig.APPNAME,
                },
                envVersion: 'release',
                success: res => {
                    //成功回调,
                    insertCount({ type: '点击导量,跳转成功', mark: thiz.data.name + ',' + thiz.data.appid, page: thiz.pageName });
                    insertCount({ type: '跳转成功_' + thiz.data.name, mark: thiz.data.name + ',' + thiz.data.appid, page: thiz.pageName });
                    insertCount({ type: '跳转成功', mark: thiz.data.name + ',' + thiz.data.appid, page: thiz.pageName });
                    //查重
                    /*  if (AppConfig.ifCheckSame) {
                         AppConfig.hasJumpApp.push(data.appid);
                         checkSameApp();
                     } */
                },
                fail: e => {
                    //失败回调
                    insertCount({ type: '点击导量,跳转失败', mark: thiz.data.name + ',' + thiz.data.appid, page: thiz.pageName });
                    if (AppConfig.ifShowApps) {
                        // AppDialog.getSelf().init(data);
                    }
                }
            });
        }
    }
    /**设置数据 */
    public setData(data: any): void {
        // this.datas = datas;
        this.data = data;
        this.appName.changeText(data.name);
        this.appIcon.skin = data.skin;
        // this.iconState.visible = false;
        // this.autoChange();
    }

    private autoChange() {
        Laya.timer.loop(AppConfig.dynamicChangeTime * 1000, this, this.shark);
    }

    private shark() {
        let thiz = this;
        sharkAni(thiz, thiz);
    }
}