import { ui } from "../ui/layaMaxUI";
import Log from "../utils/Log";
import { insertCount } from "../utils/Count";
import { AppConfig } from "../AppConfig";
import { playSound, ERRSOUND } from "../utils/Sound";
import UiManager from "../UiManager";
import { grayView } from "../utils/Common";
import GamePage from "../page/GamePage";

//正常状态
export const STATE_NORMAL = 1;
//当前选中状态
export const STATE_SELECTED = 2;
//锁定状态
export const STATE_LOCKED = 3;
/* //奖励锁定
export const STATE_BONUS_LOCK = 4;
//奖励未锁定
export const STATE_BONUS_UNLOCK = 5; */

export const ITEM_SIZE = { w: 400, h: 500 };

export default class LevelDetailItem extends ui.item.LevelDetailItemUI {
    public levelIndex: number = 1;
    public grade: number = 1;
    private index: number = 0;
    private father: Laya.Sprite = null;
    private state: number = STATE_NORMAL;
    constructor() {
        super();
        this.on(Laya.Event.CLICK, this, this.click);
        this.line.graphics.drawLine(0, 0, this.line.width, 0, "#fff", this.line.height);
    }

    private click(e: Laya.Event): void {
        e.stopPropagation();
        Log.d("点击了 grade:" + this.grade);
        Log.d("点击了 index:" + this.index);
        Log.d("点击了 题目index ：" + this.levelIndex);
        //统计解锁等级
        insertCount({ userId: AppConfig.userId, type: '等级详情列表 点击', mark: '点击item：' + this.levelIndex, page: AppConfig.PAGENAME.LEVELDETAILPAGE });
        // addCount({ type: COUNT_TYPE_LEVELDETAIL_ITEM_CLICK, userId: window.userId, mark: '[levelIndex:' + this.levelIndex + ',index:' + this.index + ',lockState:' + this.lockState + ']' });
        if (!AppConfig.DEBUG && (this.state == STATE_LOCKED /* || this.state == STATE_BONUS_LOCK */)) {
            playSound(ERRSOUND);
            //锁定了
            UiManager.getSelf().showToast('需完成' + (this.index - 1) + "关");
        } else {
            //初始化界面
            //计算数组位置
            UiManager.getSelf().gotoPage(GamePage.getSelf());
            GamePage.getSelf().initLevel(this.levelIndex);
        }
    }

    onDisable() {
        if (!this.destroyed) {
            Log.d("回收 LevelDetailItem =========");
            Laya.Pool.recover("LevelDetailItem", this);
        }
    }

    public init(grade: number, index: number, state: number) {
        this.itemBg.filters = null;
        this.grade = grade;
        this.index = index;
        this.state = state;
        this.itemText.text = index + "";
        this.levelIndex = (grade - 1) * AppConfig.GRADE_COUNT + index;
        let star = 3;
        this.textUnLock.visible = false;
        switch (state) {
            case STATE_NORMAL: {
                this.lockImg.visible = false;
                let cache = wx.getStorageSync(AppConfig.LEVEL_ + this.levelIndex);
                if (cache && cache.star) {
                    star = cache.star;
                }
            } break;
            case STATE_SELECTED: {
                this.lockImg.visible = false;
                this.textUnLock.visible = true;
                star = 0;
            } break;
            case STATE_LOCKED: {
                grayView(this.itemBg);
                this.lockImg.visible = true;
            } break
        }
    }
}