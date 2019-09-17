import { ui } from "../ui/layaMaxUI";
import { AppConfig } from "../AppConfig";
import Log from "../utils/Log";
import UiManager from "../UiManager";
import LevelPage from "./LevelPage";
import { getGradeName } from "../utils/Question";
import LevelDetailItem, { STATE_LOCKED, STATE_SELECTED, STATE_NORMAL } from "../item/LevelDetailItem";

export default class LevelDetailPage extends ui.page.LevelDetailPageUI {
    private static self: LevelDetailPage = null;

    private grade: number = 1;
    private hasPassLevel: number = 0;

    private totalLevel: number = AppConfig.GRADE_COUNT;

    private itemMarginX: number = 100;
    private itemMarginY: number = 50;

    private constructor() {
        super();
        this.height = AppConfig.screenH;
        this.topLayout.y = AppConfig.topFixOffset;
        this.contentLayout.y = this.topLayout.y + this.topLayout.height;
        // this.contentLayout.height = this.height - this.contentLayout.y;
        this.topBg.y = -this.topLayout.y;
        this.topBg.height = this.topLayout.height + this.topLayout.y;

        this.btnHome.on(Laya.Event.CLICK, this, this.backClick);

        this.bannerLayout.y = this.contentLayout.y + this.contentLayout.height;

        // var pH = this.contentLayout.height - this.itemPanel.y - 400;
        // this.itemPanel.height = pH;
    }

    onEnable() {
        //添加到舞台
        Log.d("LevelDetailPage   onEnable");
        // let thiz = this;
        // thiz.bannerLayout.removeChildren(0, thiz.bannerLayout.numChildren);
        // BannerManager.getSelf().showBannerInPosition(0, 0, this.bannerLayout.y, 300, function (state) {
        //     if (state != 0 && AppConfig.ifShowApps) {
        //         //广告创建失败，显示导量
        //         thiz.bannerLayout.addChild(AllAppView.getSelf());
        //     }
        // }, this.bannerLayout.height);
    }


    onDisable() {
        //从舞台上移除
        Log.d("LevelDetailPage onDisable");
        // BannerManager.getSelf().hideBanner(BannerManager.HIDE_ALL);
    }

    private backClick(e: Laya.Event) {
        e.stopPropagation();
        // if (this.hasFinish) return;
        UiManager.getSelf().gotoPage(LevelPage.getSelf());
        LevelPage.getSelf().init(AppConfig.maxLevel, AppConfig.userData.level);
    }


    public static getSelf(): LevelDetailPage {
        if (LevelDetailPage.self == null) {
            LevelDetailPage.self = new LevelDetailPage();
        }
        return LevelDetailPage.self;
    }

    /**
   * 
   * 
   * @param {number} grade 当前等级
   * @param {number} userLevel 用户玩过的等级
   * @memberof LevelDetailPage
   */
    public init(grade: number, userLevel: number) {
        this.levelLabel.text = getGradeName(grade);
        this.grade = grade;
        //先清掉所有子控件
        this.itemPanel.removeChildren(0, this.itemPanel.numChildren);
        if (grade == AppConfig.totalGrade) {
            this.totalLevel = AppConfig.maxLevel - (grade - 1) * AppConfig.GRADE_COUNT;;
        } else {
            this.totalLevel = AppConfig.GRADE_COUNT;
        }
        let userGrade = Math.ceil((userLevel % AppConfig.GRADE_COUNT == 0 ? (userLevel + 1) : userLevel) / AppConfig.GRADE_COUNT);
        this.hasPassLevel = this.grade < userGrade ? AppConfig.GRADE_COUNT : userLevel % AppConfig.GRADE_COUNT;
        this.passLabel.text = this.hasPassLevel + " / " + this.totalLevel;
        for (var i = 0; i < this.totalLevel; i++) {
            //每个数组创建一个Box
            var tmpItem: LevelDetailItem = Laya.Pool.getItemByClass("LevelDetailItem", LevelDetailItem) as LevelDetailItem;
            var x = i % AppConfig.BonusCount;
            var y = Math.floor(i / AppConfig.BonusCount);
            tmpItem.pos(x * (tmpItem.width + this.itemMarginX), y * (tmpItem.height + this.itemMarginY));
            if (y == 2) {
                tmpItem.x = 200;
            }
           /*  if (i > 0 && i % AppConfig.BonusCount == (AppConfig.BonusCount - 1)) {
                if (i == this.hasPassLevel) {
                    tmpItem.init(this.grade, i + 1, STATE_BONUS_UNLOCK);
                } else if (i > this.hasPassLevel) {
                    tmpItem.init(this.grade, i + 1, STATE_BONUS_LOCK);
                } else {
                    tmpItem.init(this.grade, i + 1, STATE_NORMAL);
                }
            }
            else  */if (i > this.hasPassLevel) {
                tmpItem.init(this.grade, i + 1, STATE_LOCKED);
            } else if (i === this.hasPassLevel) {
                tmpItem.init(this.grade, i + 1, STATE_SELECTED);
            } else {
                tmpItem.init(this.grade, i + 1, STATE_NORMAL);
            }
            this.itemPanel.addChild(tmpItem);
        }
    }
}