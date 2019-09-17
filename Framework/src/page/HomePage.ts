import { ui } from "../ui/layaMaxUI";
import { AppConfig } from "../AppConfig";
import { shareToFriend, ShareType } from "../utils/Share";
import { insertCount } from "../utils/Count";
import Log from "../utils/Log";
import { Apps } from "../utils/OtherApps";
import DynamicWidget from "../widget/DynamicWidget";
import AllAppView from "../widget/AllAppView";
import UiManager from "../UiManager";
import LevelPage from "./LevelPage";
import GamePage from "./GamePage";

export default class HomePage extends ui.page.HomePageUI {
    private static self: HomePage = null;

    private constructor() {
        super();
        this.height = AppConfig.screenH;
        this.contentLayout.height = this.height;
        this.btnStart.on(Laya.Event.CLICK, this, this.startGame);
        this.btnLevel.on(Laya.Event.CLICK, this, this.clickLevel);
        this.btnShare.on(Laya.Event.CLICK, this, this.clickShare);

    }

    private clickShare(e: Laya.Event) {
        e.stopPropagation();
        var query = 'uid=' + AppConfig.userId + '&token=' + (new Date().getTime()) + '&state=' + ShareType.HOME;
        shareToFriend(null, query);
    }
    private clickLevel(e: Laya.Event) {
        e.stopPropagation();
        UiManager.getSelf().gotoPage(LevelPage.getSelf());
        LevelPage.getSelf().init(AppConfig.maxLevel, AppConfig.userData.level);
    }

    private startGame(e: Laya.Event) {
        e.stopPropagation();
        /*  if (AppConfig.DEBUG) {
            GamePage.getSelf().initLevel(1);
            return;
        } */
        if (AppConfig.userData.level >= AppConfig.maxLevel) {
            insertCount({ userId: AppConfig.userId, type: '通关', page: AppConfig.PAGENAME.HOMEPAGE });
            UiManager.getSelf().gotoPage(LevelPage.getSelf());
            LevelPage.getSelf().init(AppConfig.maxLevel, AppConfig.userData.level);
        } else {
            UiManager.getSelf().gotoPage(GamePage.getSelf());
            GamePage.getSelf().initLevel(AppConfig.userData.level + 1);
        }
    }


    onEnable() {
        //添加到舞台
        Log.d("Home   onEnable");
        this.setApps();
        this.setDynamicApps();
        Laya.timer.loop(AppConfig.dynamicChangeTime * 1000, this, this.setDynamicApps);
    }



    onDisable() {
        //从舞台上移除
        Log.d("Home onDisable");
        Laya.timer.clear(this, this.setApps);
        Laya.timer.clear(this, this.setDynamicApps);
    }

    public setApps() {
        if (!AppConfig.ifShowApps) {
            return;
        }
        this.allAppLayout.removeChildren(0, this.allAppLayout.numChildren);
        this.allAppLayout.addChild(AllAppView.getSelf());
    }


    public static getSelf(): HomePage {
        if (HomePage.self == null) {
            HomePage.self = new HomePage();
        }
        return HomePage.self;
    }

    private setDynamicApps() {
        if (!AppConfig.ifShowApps) return;
        let num = this.dynamicLayout.numChildren;
        let datas = Apps.getIcons(num);
        if (!datas || datas.length == 0) return;
        for (let i = 0; i < datas.length; i++) {
            let view: Laya.Sprite = this.dynamicLayout.getChildAt(i) as Laya.Sprite;
            DynamicWidget.getSelf(view, AppConfig.PAGENAME.HOMEPAGE, datas[i]);
        }
    }
}