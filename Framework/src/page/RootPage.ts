import { ui } from "../ui/layaMaxUI";
import Log from "../utils/Log";
import { AppConfig } from "../AppConfig";
import HomePage from "./HomePage";

export default class PageRoot extends ui.page.RootPageUI {
    static self: PageRoot;
    private lastPage: Laya.Sprite = null;
    private needAdaptation: boolean = false;
    public GuideFixOffset: number = 0;
    constructor(width: number, height: number) {
        super();
        Log.d("RootPage  constructor   ");
        this.width = width
        this.height = height;
        this.bgLayout.height = this.height + 20;
        this.drawBg();
        // this.bgLayout.zOrder = -1;
        this.pageLayout.width = this.width;
        this.pageLayout.height = this.height;
        // this.pageLayout.zOrder = this.bgLayout.zOrder + 1;
        if (AppConfig.isWX && AppConfig.systemInfo) {
            let model = AppConfig.systemInfo.model;
            //计算刘海屏顶部高度
            for (var i = wx.getMenuButtonBoundingClientRect(),
                n = ["iPhone X", "华为P20", "华为麦芒7", "nubia Z18", "iPhone XR", "荣耀8X", "荣耀畅玩8C", "荣耀10", "荣耀Play", "荣耀9i", "vivo Y85", "vivo Y83", "vivo Y81s", "vivo X21", "vivo X23", "vivo X30", "vivo Z1", "vivo V9", "魅族X8", "一加6", "OPPO A3", "OPPO A7x", "OPPO R15", "OPPO R17", "小米红米6 Pro", "OnePlus A6010", "oneplus A6010", "坚果R1", "小米 Redmi Note 7", "小米 Redmi 7", "小米 PLAY ", "小米8", "小米8 SE", "小米9", "小米9 SE", "小米红米6 Pro", "vivo U1", "vivo Z3", "vivo Z3i", "vivo Z1", "vivo Z1青春版", "vivo X23幻彩版 ", "vivo Y81s", "vivo Y83", "vivo Y85", "vivo Y93", "vivo Y97", "vivo X21", "vivo X21s", "vivo X30", "vivo V9", "vivo iQOO", "华为nova 3", "华为nova 3i", "华为 nova 4e", "华为 畅享 MAX", "华为畅享9 Plus", "华为P30 Pro", "华为P20", "华为麦芒7", "华为Mate 20", "华为Mate 20 Pro", "荣耀10", "荣耀10青春版", "荣耀8X", "荣耀8X Max", "荣耀畅玩8C", "荣耀Play", "荣耀9i", "荣耀20i", "OPPO A3", "OPPO A5", "OPPO A7", "OPPO A7x全网通", "OPPO A7n", "OPPO R15", "OPPO R17", "OPPO R17 Pro", "OPPO K1", "联想 Z5S", "联想Z6 Pro", "三星Galaxy A8s", "三星Galaxy A90", "朵唯 D1", "海信 小海豚3", "海信 金刚4Pro", "中兴 ZTE V1000", "中兴AXON 10 Pro", "中兴Blade V10", "摩托罗拉 g7 plus", "诺基亚X6 2018", "诺基亚X7 2018", "小辣椒 红辣椒8X", "一加6", "一加6T", "魅族X8", "iPhone XR"], s = 0; s < n.length; s++) {
                var a = n[s], r = model.indexOf(a);
                if (i && i.top > 20 || -1 != r) {
                    Log.d("scaleX:::" + AppConfig.scaleX);
                    this.needAdaptation = !0, this.GuideFixOffset = AppConfig.iPhoneX / AppConfig.scaleX;
                    break;
                }
            }
        }

        AppConfig.topFixOffset = this.GuideFixOffset;
    }

    /**
 * 绘制背景
 */
    private drawBg() {
        //64x64
        let size = 64;
        //宽度
        let xCount = Math.ceil(this.bgLayout.width / size);
        //高度
        let yCount = Math.ceil(this.bgLayout.height / size);
        //必需先loader后，才能通过Laya.loader.getRes得到Texture
        let bgRes = "root/ic_bg.png";
        let g = this.bgLayout.graphics;
        Laya.loader.load(bgRes, Laya.Handler.create(this.bgLayout, function () {
            let texture = Laya.loader.getRes(bgRes);
            for (let x = 0; x < xCount; x++) {
                for (let y = 0; y < yCount; y++) {
                    g.drawImage(texture, x * size, y * size, size, size);
                }
            }
        }), null, Laya.Loader.IMAGE);
    }


    onEnable() {
        Log.d("RootPage  onEnable");
    }

    public static getSelf(width: number, height: number): PageRoot {
        if (PageRoot.self == null) {
            PageRoot.self = new PageRoot(width, height);
        }

        return PageRoot.self;
    }

    public getPageHeight(): number {
        // return this.height - this.GuideFixOffset - this.layoutTop.height;
        return 0;
    }

    public getTopOffset(): number {
        let topOffset = this.height - this.getPageHeight();
        Log.d("getTopOffset  =========" + topOffset);
        return topOffset;
    }

    /**
     * 当前页面上添加一个页面
     * @param page 
     * @param noAni 
     */
    public addPage(page: Laya.Sprite, noAni?: boolean): void {
        page.alpha = 0;
        if (this.numChildren > 0) {
            this.lastPage = this.pageLayout.getChildAt(this.pageLayout.numChildren - 1) as Laya.Sprite;
        }
        this.pageLayout.addChild(page);
        var duration = noAni ? 0 : AppConfig.PAGE_CHANGE_DURATION;
        Laya.Tween.to(page, { alpha: 1 }, duration, Laya.Ease.linearNone);
    }

    /**
     * 场景切换
     * @param page 
     * @param noAni  是否显示过场动画
     */
    public gotoPage(page: Laya.Sprite, noAni?: boolean): void {
        //直接加载页面
        page.alpha = 0;
        this.pageLayout.addChild(page);
        var duration = noAni ? 0 : AppConfig.PAGE_CHANGE_DURATION;
        if (this.pageLayout.numChildren > 1) {
            //动画时，鼠标不可点
            this.pageLayout.mouseEnabled = false;
            //保存上一个页面
            this.lastPage = this.pageLayout.getChildAt(this.pageLayout.numChildren - 2) as Laya.Sprite;
            var obj = {
                alpha: 1
            };
            var thiz = this;
            Laya.Tween.to(obj, {
                alpha: 0, update: new Laya.Handler(this, function () {
                    if (thiz.lastPage) {
                        thiz.lastPage.alpha = obj.alpha;
                    }
                    page.alpha = 1 - obj.alpha;
                })
            }, duration, Laya.Ease.linearNone, Laya.Handler.create(this, function () {
                if (thiz.lastPage) {
                    thiz.pageLayout.removeChild(thiz.lastPage);
                }
                //动画结束后，恢复鼠标操作
                thiz.pageLayout.mouseEnabled = true;
            }));
        } else {
            Laya.Tween.to(page, { alpha: 1 }, duration, Laya.Ease.linearNone);
        }
        //场景切换，关闭背景音乐
        // playBgMusic(false);
    }

    /**
     * 关闭页面
     * @param page 
     * @param noAni  是否显示过场动画
     */
    public closePage(page?: Laya.Sprite, noAni?: boolean) {
        var duration = noAni ? 0 : AppConfig.PAGE_CHANGE_DURATION;
        if (page) {
            //关闭当前页面，并返回到指定页面
            this.gotoPage(page, noAni);
        } else {
            //没有指定页面,返回上一个页面
            if (this.lastPage) {
                this.gotoPage(this.lastPage, noAni);
            } else {
                //回主页
                this.goHome();
            }
        }
    }


    /**
 * 设置元宝值 
 * @param num 
 */
    public setPowerNum(num: number) {
        // numberTextAni(this.textPower.getChildAt(0) as Laya.Text, num);
        // this.powerNum.value = num + '';
        // numberClipAni(this.powerNum, num);
    }

    /**返回主页 */
    public goHome(): void {
        // Main.getApp().banner.hideBanner(BannerManager.HIDE_ALL);
        this.clearPage();
        //再添加主页
        this.addPage(HomePage.getSelf());
    }

    public clearPage() {
        this.pageLayout.removeChildren(0, this.pageLayout.numChildren);
    }
}