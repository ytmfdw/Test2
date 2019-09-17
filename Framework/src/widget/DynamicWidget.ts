import { ui } from "../ui/layaMaxUI";
import { insertCount } from "../utils/Count";
import { AppConfig } from "../AppConfig";
import { sharkAni } from "../utils/Common";

export default class DynamicWidget extends ui.item.appViewUI {
    private index: number = -1;
    private father: Laya.Sprite = null;
    private isAni: boolean = true;
    private static lastIndex: number = -1;
    private pageName: string = null;
    private data: any = null;
    private scaleValue: number = 1;
    constructor() {
        super();
    }

    onDisable() {
        if (!this.destroyed) {
            Laya.Pool.recover("DynamicWidget", this);
        }
    }

    private adapter(context: Laya.Sprite, pageName: string, data?: any, noAni?: boolean) {
        this.father = context;
        this.father.removeChildren(0, context.numChildren);
        if (noAni) {
            this.isAni = false;
        }
        this.on(Laya.Event.CLICK, this, this.clickGoToApp);
        //100:120
        this.scaleValue = Math.min(this.father.width / 250, this.father.height / 300);
        this.scale(this.scaleValue, this.scaleValue);
        this.pos(this.father.width / 2, this.father.height / 2);
        this.father.addChild(this);
        this.pageName = pageName;
        this.data = data;
        if (this.data) {
            this.setData(this.data);
        }
    }

    /**点击跳转 */
    private clickGoToApp(e: Laya.Event) {
        e.stopPropagation();
        if (!this.data) return;
        var thiz = this;
        var data = this.data;
        insertCount({ type: '点击悬浮按钮', mark: data.name + ',' + data.appid, page: thiz.pageName });
        if (AppConfig.systemInfo.version > '2.2.0') {
            wx.navigateToMiniProgram({
                appId: data.appid,
                path: data.path,
                extraData: {
                    from: AppConfig.APPNAME,
                },
                envVersion: 'release',
                success: res => {
                    //成功回调,
                    insertCount({ type: '点击悬浮按钮,跳转成功', mark: data.name + ',' + data.appid, page: thiz.pageName });
                    insertCount({ type: '跳转成功_' + data.name, mark: data.name + ',' + data.appid, page: thiz.pageName });
                    insertCount({ type: '跳转成功', mark: thiz.pageName, page: thiz.pageName });
                    //查重
                    /*     if (ifCheckSame) {
                            hasJumpApp.push(data.appid);
                            checkSameApp();
                        } */
                },
                fail: e => {
                    //失败回调
                    /*   if (ifShowApps) {
                          AppDialog.getSelf(thiz.pageName).init(data);
                      } */
                }
            });
        }
    }

    public static getSelf(context: Laya.Sprite, pageName: string, data?: any, noAni?: boolean): DynamicWidget {
        let view: DynamicWidget = Laya.Pool.getItemByClass("DynamicWidget", DynamicWidget);
        view.adapter(context, pageName, data, noAni);
        return view;
    }


    public setData(data: any): void {
        this.data = data;
        this.appName.changeText(data.name);
        this.appIcon.skin = data.skin;
        // this.iconState.visible = true;
        // this.iconState.skin = "comp/icon_hot_new.png";
        var thiz = this;
        if (this.isAni) {
            thiz.scale(0, 0);
            // thiz.iconState.scale(0, 0);
            Laya.Tween.to(thiz, { scaleX: this.scaleValue, scaleY: this.scaleValue }, 300, Laya.Ease.bounceOut, Laya.Handler.create(thiz, function () {
                sharkAni(thiz, thiz);
            }), 100);
            /*   Laya.Tween.to(thiz.iconState, { scaleX: 1, scaleY: 1 }, 300, Laya.Ease.bounceOut, Laya.Handler.create(thiz, function () {
                  sharkAni(thiz, thiz);
              }), 300); */
        }
    }
}