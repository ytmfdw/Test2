import { ui } from "../ui/layaMaxUI";
import LevelData, { getGradeName } from "../utils/Question";
import { grayView } from "../utils/Common";
import { insertCount } from "../utils/Count";
import { AppConfig } from "../AppConfig";
import { playSound, ERRSOUND } from "../utils/Sound";
import UiManager from "../UiManager";
import LevelDetailPage from "../page/LevelDetailPage";

export default class LevelItem extends ui.item.LevelItemUI {

    public levelArr: Array<any> = null;
    public data: LevelData = null;

    public constructor() {
        super();
        this.levelItemBg.on(Laya.Event.CLICK, this, this.onClick);
    }

    /**
   * 设置数据
   * @param data 
   */
    public setData(data: LevelData) {
        //data:{level:,total:,startIndex}
        this.data = data;
        this.levelText.text = getGradeName(data.grade);
        this.indexText.text = data.level + ' / ' + data.totalLevel;
        // this.levelItemBg.skin = "root/btn_3.png";
        this.levelItemBg.filters = null;
        this.levelItemBg.destroyChildren();
        if (data.isUnLock) {
            //默认为锁定状态
            this.setUnLock(data);
        } else {
            this.setLock();
        }
    }

    //设置解锁状态
    public setUnLock(data: LevelData) {
        // this.levelItemBg.skin = "root/btn_3.png";
        this.indexText.text = data.level + " / " + data.totalLevel;
    }
    //设置解锁状态
    public setLock() {
        // this.levelItemBg.skin = "root/locked.png";
        // this.indexText.text = "0/" + this.total;
        this.indexText.text = "";
        this.levelText.text = "";
        grayView(this.levelItemBg);
        let lock: Laya.Image = new Laya.Image();
        lock.skin = "comp/stage_lock.png";
        lock.size(50, 50);
        lock.anchorX = 0.5;
        lock.anchorY = 0.5;
        lock.pos(this.levelItemBg.width / 2, this.levelItemBg.height / 2);
        this.levelItemBg.addChild(lock);
    }

    //点击进入子界面
    public onClick = function (e: Laya.Event) {
        e.stopPropagation();
        insertCount({ userId: AppConfig.userId, type: '等级列表 点击', mark: '点击等级：' + this.data.grade, page: AppConfig.PAGENAME.LEVELPAGE });
        //统计解锁等级
        //显示子界面
        if (!AppConfig.DEBUG && !this.data.isUnLock) {
            playSound(ERRSOUND);
            //锁定了
            UiManager.getSelf().showToast('需完成' + (this.data.grade - 1) + "级");
        } else {
            //跳转到等级详情界面
            UiManager.getSelf().gotoPage(LevelDetailPage.getSelf());
            LevelDetailPage.getSelf().init(this.data.grade, AppConfig.userData.level);
        }
    }

}