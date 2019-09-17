import { ui } from "../ui/layaMaxUI";
import { AppConfig } from "../AppConfig";
import Log from "../utils/Log";
import UiManager from "../UiManager";
import LevelData from "../utils/Question";
import LevelItem from "../item/LevelItem";

export default class LevelPage extends ui.page.LevelPageUI {
    private static self: LevelPage = null;

    private levelArr = [];
    private constructor() {
        super();
        this.height = AppConfig.screenH;
        this.topLayout.y = AppConfig.topFixOffset;
        this.contentLayout.y = this.topLayout.y + this.topLayout.height;
        this.contentLayout.height = this.height - this.contentLayout.y;
        this.topBg.y = -this.topLayout.y;
        this.topBg.height = this.topLayout.height + this.topLayout.y;
        this.btnHome.on(Laya.Event.CLICK, this, this.backClick);

        this.dataList.height = this.contentLayout.height - this.dataList.y - 400;
        // 使用但隐藏滚动条
        this.dataList.vScrollBarSkin = "";
        this.dataList.itemRender = LevelItem;
        this.dataList.renderHandler = new Laya.Handler(this, this.updateItem);
        this.dataList.array = this.levelArr;
    }

    private backClick(e: Laya.Event) {
        e.stopPropagation();
        // if (this.hasFinish) return;
        UiManager.getSelf().goHome();
    }

    onEnable() {
        //添加到舞台
        Log.d("BasePage   onEnable");
    }


    onDisable() {
        //从舞台上移除
        Log.d("BasePage onDisable");
    }


    public static getSelf(): LevelPage {
        if (LevelPage.self == null) {
            LevelPage.self = new LevelPage();
        }
        return LevelPage.self;
    }

    public init(maxLevel: number, userLevel: number): void {
        //总题目数量
        //玩家玩过的最高级
        this.levelArr.splice(0, this.levelArr.length);
        let userGrade = Math.ceil((userLevel % AppConfig.GRADE_COUNT == 0 ? (userLevel + 1) : userLevel) / AppConfig.GRADE_COUNT);
        var lastGrade: number = 1;
        for (var i = 1; i <= AppConfig.totalGrade; i++) {
            var gradeKey = AppConfig.gradePre + i;
            // var value = isWX ? wx.getStorageSync(gradeKey) : 0;
            var data: LevelData = new LevelData();
            data.grade = i;
            data.level = 0;
            data.totalLevel = AppConfig.GRADE_COUNT;
            data.isUnLock = i === 1;
            if (i <= userGrade) {
                data.level = i == userGrade ? userLevel % AppConfig.GRADE_COUNT : AppConfig.GRADE_COUNT;
                data.isUnLock = true;
            }
            this.levelArr.push(data);
            if (i == AppConfig.totalGrade) {
                //判断最后一级多少关
                data.totalLevel = maxLevel - (i - 1) * AppConfig.GRADE_COUNT;
            }
            if (!AppConfig.DEBUG && i >= lastGrade + 5) {
                //只显示五级没解锁的 
                break;
            }
        }
        //刷新
        this.dataList.array = this.levelArr;
    }

    private updateItem(cell, index: number) {
        cell.setData(cell.dataSource, index + 1);
    }
}