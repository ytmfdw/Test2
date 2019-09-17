import PageRoot from "./page/RootPage";
import { AppConfig } from "./AppConfig";
import Log from "./utils/Log";
import BannerManager from "./utils/Banner";

export default class UiManager {
    private static self: UiManager = null;
    private pageRoot: PageRoot = null;
    // //所有页面
    // public gamePage: GamePage = null;
    // public homePage: HomePage = null;
    // public levelPage: LevelPage = null;
    // public levelDetailPage: LevelDetailPage = null;
    // public passPage: PassPage = null;
    // public rankPage: RankPage = null;
    //弹窗提示
    private toast = null;
    private model = null;

    private bgIndex = 0;
    private hasLoadBtnAni: boolean = false;
    //提示按钮位置
    private btnAni: Laya.Animation = null;
    private constructor() {

    }

    public setRootPage(page: PageRoot) {
        this.pageRoot = page;
    }
    /**
     * 获取当前页面名称
     * 
     * @returns {string} 
     * @memberof UiManager
     */
    public getCurrentPage(): string {
        let num = this.pageRoot.pageLayout.numChildren;
        if (num > 0) {
            let lastPage = this.pageRoot.pageLayout.getChildAt(num - 1);
            return lastPage.name;
        }
        return AppConfig.PAGENAME.NONE;
    }

    public static getSelf(): UiManager {
        if (!UiManager.self) {
            UiManager.self = new UiManager();
        }
        return UiManager.self;
    }

    /**
     * 显示toast
     * 
     * @param {string} msg 
     * @param {number} [time] 
     * @memberof UiManager
     */
    public showToast(msg: string, time?: number): void {
        // Toast.toast(msg, time);
        wx.showToast({
            icon: "none",
            title: msg,
            duration: time ? time : 1500
        });
    }

    public clearToast(): void {
        /*  if (Toast.getSelf()) {
             Toast.getSelf().clear();
         } */
    }
    /**
     * 判断toast是否正在显示
     * 
     * @returns {boolean} 
     * @memberof UiManager
     */
    public isToastShowing(): boolean {
        /*    if (Toast.getSelf()) {
               return Toast.getSelf().isShowIng;
           } */
        return false;
    }

    /**
     * 显示弹窗提示
     * 
     * @param {*} data 
     * @memberof UiManager
     */
    public showModal(data: any): void {
        this.hideLoading();
        // Model.getSelf().setData(data).popup();
        wx.showModal({
            title: data.title == void 0 ? "温馨提示" : data.title,
            content: data.content == void 0 ? "" : data.content,
            showCancel: data.showCancel == void 0 ? false : data.showCancel,
            cancelText: data.cancelText == void 0 ? "取消" : data.cancelText,
            confirmText: data.confirmText == void 0 ? "确定" : data.confirmText,
            success: function (res) {
                if (res.confirm) {
                    if (data.success) {
                        data.success();
                    }
                } else if (res.cancel) {
                    if (data.fail) {
                        data.fail();
                    }
                }
            }
        });
    }


    /**
* 场景切换
* @param page 
* @param noAni  是否显示过场动画
*/
    public gotoPage(page: Laya.Sprite, noAni?: boolean): void {
        Log.d('gotoPage  name=' + page.name);
        if (AppConfig.isWX) {
            //隐藏广告
            BannerManager.getSelf().hideBanner(BannerManager.HIDE_ALL);
        }
        this.pageRoot.gotoPage(page, noAni);
    }

    /**
     * 关闭页面
     * @param page 
     * @param noAni  是否显示过场动画
     */
    public closePage(page?: Laya.Sprite, noAni?: boolean) {
        this.pageRoot.closePage(page, noAni);
    }

    /**
     * 当前页面上添加一个页面
     * @param page 
     * @param noAni 
     */
    public addPage(page: Laya.Sprite, noAni?: boolean): void {
        this.pageRoot.addPage(page, noAni);
    }

    /**
  * 返回首页
  */
    public goHome(): void {
        //移除所有界面
        if (AppConfig.isWX) {
            //隐藏广告
            BannerManager.getSelf().hideBanner(BannerManager.HIDE_ALL);
        }
        //清除广告
        this.showOrHideTop(true);
        this.pageRoot.goHome();
    }
    /**
     * 清空所有界面
     */
    public clearPage(): void {
        this.pageRoot.clearPage();
    }

    /**
     * 提示用户点击的位置
     * @param x 全局坐标
     * @param y 全局坐标
     * @param endHide  是否循环播放,默认是循环播放的
     */
    /*    public showBtnAni(x: number, y: number, endHide?: boolean, father?: Laya.Sprite): void {
            if (this.hasLoadBtnAni) {
                this.showAniBtn(x, y, endHide, father ? father : Laya.stage);
            } else {
                Laya.loader.load('res/atlas/BtnAni.atlas', Laya.Handler.create(this, this.showAniBtn, [x, y, endHide, father ? father : Laya.stage]), null, Laya.Loader.ATLAS);
            }
        }*/

    /**
     * 显示或隐藏顶部状态
     * @param flag 
     */
    public showOrHideTop(flag?: boolean): void {
        let thiz = UiManager.getSelf();
        if (thiz.pageRoot.topLayout.visible == flag) return;
        Laya.Tween.clearAll(thiz.pageRoot.topLayout);
        thiz.pageRoot.topLayout.visible = true;
        Laya.Tween.to(thiz.pageRoot.topLayout, {
            y: flag ? thiz.pageRoot.GuideFixOffset : (thiz.pageRoot.GuideFixOffset - thiz.pageRoot.height)
        }, 500, flag ? Laya.Ease.bounceIn : Laya.Ease.bounceOut, Laya.Handler.create(thiz.pageRoot.topLayout, function () {
            thiz.pageRoot.topLayout.visible = flag;
        }))
    }

    /**
     * 显示体力值
     * @param power 
     */
    public setPowerNum(power: number): void {
        if (this.pageRoot) {
            this.pageRoot.setPowerNum(power);
        }
    }

    /**
     * 使用体力
     * 
     * @param {Function} callBack 
     * @param {number} [num] 
     * @memberof UiManager
     */
    public usePower(callBack: Function, num?: number): void {
        /*         let powers = num ? num : 1;
                if (this.app && this.app.userData.power >= powers) {
                    this.app.userData.power -= powers;
                    this.setPowerNum(this.app.userData.power);
                    this.showToast('消耗' + powers + '体力');
                    callBack(1);
                } else {
                    this.showToast('体力值不够');
                    callBack(-1);
                } */
        /* if (this.homePage) {
             this.homePage.setPowerView();
         }*/
    }


    public showLoading(data?: any): void {
        if (AppConfig.isWX) {
            wx.showLoading({
                title: data ? data.title ? data.title : "加载中..." : '加载中...',
                icon: data ? data.icon ? data.icon : "none" : "none",
                mask: data ? (data.mask ? data.mask : true) : true
            });
        }
    }

    public hideLoading(): void {
        if (AppConfig.isWX) {
            wx.hideLoading();
        }
    }

    /**
     * 获取页面可用高度
     * 
     * @returns {number} 
     * @memberof UiManager
     */
    public getPageHeight(): number {
        return this.pageRoot.getPageHeight();
    }
    /**
     * 获取顶部可用距离
     */
    public getTopOffset(): number {
        return this.pageRoot.getTopOffset();
    }

    /**
 * 获取刘海距离
 * 
 * @returns {number} 
 * @memberof UiManager
 */
    public getFixOffset(): number {
        return this.pageRoot.GuideFixOffset;
    }


    public getLastPageName(): string {
        return this.getCurrentPage();
    }
}