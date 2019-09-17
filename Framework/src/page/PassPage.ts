import { ui } from "../ui/layaMaxUI";
import { AppConfig } from "../AppConfig";
import Log from "../utils/Log";
import UiManager from "../UiManager";
import GamePage from "./GamePage";
import { insertCount } from "../utils/Count";
import BannerManager from "../utils/Banner";
import { grayView, grayViewAni } from "../utils/Common";
import { Apps } from "../utils/OtherApps";
import AppView from "../widget/AppView";

export default class PassPage extends ui.page.PassPageUI {
    private static self: PassPage = null;

    private data: any = null;

    private constructor() {
        super();
        this.height = AppConfig.screenH;
        this.topLayout.y = AppConfig.topFixOffset;
        this.contentLayout.y = this.topLayout.y + this.topLayout.height;
        this.contentLayout.height = this.height - this.contentLayout.y;
        this.topBg.y = -this.topLayout.y;
        this.topBg.height = this.topLayout.height + this.topLayout.y;


        this.btnHome.on(Laya.Event.CLICK, this, this.clickHome);
        this.btnRstart.on(Laya.Event.CLICK, this, this.clickRestart);
        this.btnNext.on(Laya.Event.CLICK, this, this.clickNext);
    }

    onEnable() {
        //添加到舞台
        Log.d("BasePage   onEnable");
    }


    onDisable() {
        //从舞台上移除
        Log.d("BasePage onDisable");
        Laya.timer.clear(this, this.loopIcons);
        Laya.timer.clear(this, this.setApps);
    }

    private clickHome(e: Laya.Event) {
        e.stopPropagation();
        UiManager.getSelf().goHome();
    }
    private clickRestart(e: Laya.Event) {
        e.stopPropagation();
        UiManager.getSelf().gotoPage(GamePage.getSelf());
        GamePage.getSelf().initLevel(this.data.level);
    }
    private clickNext(e: Laya.Event) {
        e.stopPropagation();
        insertCount({ userId: AppConfig.userId, type: '点击下一关', mark: 'level：' + this.data.level, page: AppConfig.PAGENAME.PASSPAGE });
        if (this.data.level >= AppConfig.maxLevel) {
            insertCount({ userId: AppConfig.userId, type: '通关', page: AppConfig.PAGENAME.PASSPAGE });
            UiManager.getSelf().showModal({
                title: "通关提示",
                content: "恭喜你！通过了所有关！新的题目正在赶来，敬请期待！",
                showCancel: false,
                success: function () {
                    UiManager.getSelf().goHome();
                }
            });
            return;
        }
        UiManager.getSelf().gotoPage(GamePage.getSelf());
        GamePage.getSelf().initLevel(this.data.level + 1);

    }


    public static getSelf(): PassPage {
        if (PassPage.self == null) {
            PassPage.self = new PassPage();
        }
        return PassPage.self;
    }

    private resetBtn() {
        if (this.btnNext.y == 1180) return;
        Laya.Tween.to(this.btnNext, { y: 1180 }, AppConfig.next_button_move_time, null, null, AppConfig.next_banner_delay);
    }

    public setData(data: any): void {
        let thiz = this;
        this.data = data;
        let star = data.star;
        this.showStarAni(star);
        this.textLevel.changeText("关卡" + data.level);
        // this.textPassLevel.changeText(Main.getApp().userData.level + "/" + AppConfig.maxLevel);
        //设置按钮
        if (AppConfig.ifShowBonus) {
            this.btnNext.scale(0, 0);
            let x = this.btnNext.x;
            let y = this.btnNext.y;
            this.btnNext.pos(x, 1280);
            Laya.Tween.to(thiz.btnNext, { scaleX: 1, scaleY: 1 }, AppConfig.next_button_scale_time, null, null, AppConfig.next_button_delay);
        } else {
            this.btnNext.scale(1, 1);
            this.btnNext.pos(540, 1180);
        }

        this.setApps();
        Laya.timer.loop(AppConfig.dynamicChangeTime * 1000, this, this.setApps);
        this.loopIcons();
        Laya.timer.loop(2000, this, this.loopIcons);

        //加载广告
        BannerManager.getSelf().showBannerInPosition(0, this.bannerLayout.x, this.bannerLayout.y + this.contentLayout.y, 300, function () {
            thiz.resetBtn();
        }, this.bannerLayout.height);
    }

    private showStarAni(star: number): void {
        let thiz = this;
        Laya.Tween.clearAll(thiz.star1);
        Laya.Tween.clearAll(thiz.star2);
        Laya.Tween.clearAll(thiz.star3);
        thiz.star1.filters = null;
        thiz.star2.filters = null;
        thiz.star3.filters = null;
        switch (star) {
            case 0: {
                grayViewAni(thiz.star1, function () {
                    grayViewAni(thiz.star2, function () {
                        grayViewAni(thiz.star3);
                    });
                });
            } break;
            case 1: {
                grayViewAni(thiz.star2, function () {
                    grayViewAni(thiz.star3);
                });
                // lightViewAni(thiz.star1, true);
            } break;
            case 2: {
                // lightViewAni(thiz.star1, true);
                // lightViewAni(thiz.star2, true);
                grayViewAni(thiz.star3);
            } break;
            case 3: {
                // lightViewAni(thiz.star1, true);
                // lightViewAni(thiz.star2, true);
                // lightViewAni(thiz.star3, true);
            } break;
        }
        if (star < 3) {
            //显示提示
        }
    }


    public setApps() {
        if (!AppConfig.ifShowApps) {
            this.appLayout.removeChildren(0, this.appLayout.numChildren);
            return;
        }
        //首页放8个ICON
        let datas = Apps.getIcons(8);
        let childNum = this.appLayout.numChildren;
        if (datas.length == 0) {
            this.appLayout.removeChildren(0, childNum);
            Laya.timer.clear(this, this.loopIcons);
            return;
        }
        if (childNum == 0) {
            //创建datas个子控件
            for (let i = 0; i < datas.length; i++) {
                let view: AppView = Laya.Pool.getItemByClass('AppView', AppView);
                view.setData(datas[i]);
                view.pos(i % 4 * 270 + 135, Math.floor(i / 4) * 350 + 150);
                this.appLayout.addChild(view);
            }
        } else if (childNum == datas.length) {
            //正好一个一个的改
            for (let i = 0; i < childNum; i++) {
                let view: AppView = this.appLayout.getChildAt(i) as AppView;
                view.setData(datas[i]);
            }
        } else if (childNum > datas.length) {
            this.appLayout.removeChildren(datas.length, childNum);
            for (let i = 0; i < datas.length; i++) {
                let view: AppView = this.appLayout.getChildAt(i) as AppView;
                view.setData(datas[i]);
            }
        }
    }

    public loopIcons() {
        let len = this.appLayout.numChildren;
        for (let i = 0; i < len; i++) {
            let view: Laya.Sprite = this.appLayout.getChildAt(i) as Laya.Sprite;
            Laya.Tween.to(view, { scaleX: 1.0, scaleY: 1.0 }, 1000, null, Laya.Handler.create(view, function () {
                Laya.Tween.to(view, {
                    scaleX: 0.8, scaleY: 0.8
                }, 1000, null)
            }));
        }
    }
}