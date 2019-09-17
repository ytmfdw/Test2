(function () {
    'use strict';

    class ImageRunTime extends Laya.Image {
        constructor() {
            super();
            this.scaleTime = 100;
            this.anchorX = this.anchorY = 0.5;
            this.on(Laya.Event.MOUSE_DOWN, this, this.scaleSmal);
            this.on(Laya.Event.MOUSE_UP, this, this.scaleBig);
            this.on(Laya.Event.MOUSE_OUT, this, this.scaleBig);
        }
        scaleBig() {
            Laya.Tween.to(this, { scaleX: 1, scaleY: 1 }, this.scaleTime);
        }
        scaleSmal() {
            Laya.Tween.to(this, { scaleX: 0.8, scaleY: 0.8 }, this.scaleTime);
        }
    }

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("script/ImageRunTime.ts", ImageRunTime);
        }
    }
    GameConfig.width = 1080;
    GameConfig.height = 1920;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "widget/ProgressView.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = true;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    var AppConfig;
    (function (AppConfig) {
        AppConfig.DEBUG = true;
        AppConfig.APPNAME = 'FrameWork';
        AppConfig.VERSION = '1.0.0';
        AppConfig.APP_ID = "happydog-ixt9x";
        AppConfig.APP_KEY = "";
        AppConfig.systemInfo = null;
        AppConfig.scaleX = 1;
        AppConfig.userChannel = null;
        AppConfig.userId = null;
        AppConfig.userData = {
            userId: null,
            level: 0
        };
        AppConfig.SETTING = 'Setting';
        AppConfig.screenW = 1080;
        AppConfig.screenH = 1920;
        AppConfig.shareCancel = false;
        AppConfig.isShareBonus = false;
        AppConfig.isShareTip = false;
        AppConfig.isShareGroup = false;
        AppConfig.getShareTime = 0;
        AppConfig.topFixOffset = 0;
        AppConfig.BGCOLOR = '#fbfbeb';
        AppConfig.LINE_COLOR = "#323232";
        AppConfig.LINE_WIDTH = 5;
        AppConfig.TIPLINECOLOR = "#fff";
        AppConfig.WOODCOLOR = "#ffc855";
        AppConfig.WOODSTROKECOLOR = "#ab7551";
        AppConfig.SHARED_KEY = "shareKey";
        AppConfig.isWX = (typeof wx != 'undefined');
        AppConfig.CHECKURL = "https://www.webuzz.com.cn/game/wx/ipSearch.do?name=" + (AppConfig.DEBUG ? "test" : AppConfig.APPNAME);
        AppConfig.examineTime = new Date('2019-05-25').getTime();
        AppConfig.PAGENAME = {
            NONE: "none",
            HOMEPAGE: "homePage",
            LEVELPAGE: "levelPage",
            LEVELDETAILPAGE: "levelDetailPage",
            GAMEPAGE: "gamePage",
            PASSPAGE: "passPage",
            RANKPAGE: "rankPage",
        };
        AppConfig.HAS_SHARE_TIP = 'hasShareTip';
        AppConfig.HAS_SHARE_BOUNS = 'hasShareBouns';
        AppConfig.QUESTION_CLASS = "Question";
        AppConfig.USERCHANNEL = "userChannel";
        AppConfig.LEVEL_ = "level_";
        AppConfig.LOCAL_SHARE = "root/share.jpg";
        AppConfig.PAGE_CHANGE_DURATION = 500;
        AppConfig.ISVIBRATE = 'vibrate';
        AppConfig.isNoVirbate = false;
        AppConfig.ISMUTE = 'mute';
        AppConfig.isMute = false;
        AppConfig.ISMUTEBGM = 'muteBgm';
        AppConfig.isMuteBgm = false;
        AppConfig.QUESTION_KEY = "question_key";
        AppConfig.USERDATA = 'userData';
        AppConfig.COIN = 'coin';
        AppConfig.EXPERIENCE = 'experience';
        AppConfig.NICKNAME = 'nickName';
        AppConfig.AVATARURL = 'avatarul';
        AppConfig.shareCount = 0;
        AppConfig.SHARECOUNT = 'shareCount';
        AppConfig.SCORE = 'level';
        AppConfig.OPENVIDEOCOUNT = 'openVideoCount';
        AppConfig.openVideoCount = 0;
        AppConfig.FINISHVIDEOCOUNT = 'finishVideoCount';
        AppConfig.finishVideoCount = 0;
        AppConfig.canShowVideo = true;
        AppConfig.bannerError = false;
        AppConfig.USER = 'user';
        AppConfig.IFSHOWBONUS = 'ifShowBounus';
        AppConfig.openId = null;
        AppConfig.OPENID = 'openId';
        AppConfig.USERID = 'userId';
        AppConfig.SCORE_KEY = "maxLevel";
        AppConfig.SETTING_VERSION_KEY = "settgin_version";
        AppConfig.OPENGIDS = 'openGIds_';
        AppConfig.TIP_MODE = {
            SHARE: 'share',
            VEDIO: 'vedio'
        };
        AppConfig.ifNewuser = false;
        AppConfig.TODAYDATA = 'todayData';
        AppConfig.SERVER = "https://www.webuzz.com.cn/";
        AppConfig.GAME_STATE = {
            NONE: -1,
            READY: 0,
            PLAYING: 1,
            GAMEOVER: 2
        };
        AppConfig.gameState = AppConfig.GAME_STATE.NONE;
        AppConfig.TEXTCOLOR = '#ececec';
        AppConfig.BUTTONTEXTCOLOR = '#fdfdfd';
        AppConfig.TEXTTITLECOLOR = '#C4AD8E';
        AppConfig.iPhoneX = 20;
        AppConfig.GRADE_COUNT = 5;
        AppConfig.gradePre = 'grade_';
        AppConfig.ISOLDUSER = "isOldUser";
        AppConfig.doubleGroupMsg = '短时间内，不能分享到相同的群哦！请分享到其他群吧！';
        AppConfig.tipShareMsg = '请分享到微信群，才能获得提示哦！';
        AppConfig.onShowTipShareMsg = '1.请去群里点击自己分享的链接，可获得提示！\n2.若尚未分享到群，请先分享到群！';
        AppConfig.onShowBounsShareMsg = '1.请去群里点击自己分享的链接，可获得奖励！\n2.若尚未分享到群，请先分享到群！';
        AppConfig.bounsShareMsg = '请分享到微信群，才能获得奖励哦！';
        AppConfig.bounsMsg = "获得一个您的专属礼包，拆开礼包将获得{bounsCoin}枚金币^_^";
        AppConfig.ifShowBonus = true;
        AppConfig.ifVideoErrShare = true;
        AppConfig.ifAldShare = true;
        AppConfig.ifShowApps = true;
        AppConfig.maxLevel = 22;
        AppConfig.totalGrade = Math.ceil(AppConfig.maxLevel / AppConfig.GRADE_COUNT);
        AppConfig.BonusCount = 2;
        AppConfig.tipCost = 100;
        AppConfig.bounsCoin = 200;
        AppConfig.onLineCoinPer = 1;
        AppConfig.maxOnLineCoin = 60;
        AppConfig.isCheckIp = true;
        AppConfig.dynamicChangeTime = 5;
        AppConfig.SPEED_ZERO = 0.5;
        AppConfig.CHECK_DS = 30;
        AppConfig.GAME_PLAY_TIME = 3;
        AppConfig.STOP_DS = 0;
        AppConfig.levelMin = 10;
        AppConfig.video = [1, 1, 1];
        AppConfig.IPHONEX_BOTTOM = 80;
        AppConfig.levelCutSteps = [];
        AppConfig.ifInsterAd = true;
        AppConfig.interstitialAd = ["adunit-5e8ac21ce575a15b"];
        AppConfig.banners = ["adunit-0d7ba7206e1ded20"];
        AppConfig.videos = ["adunit-adf979bfe489286b"];
        AppConfig.insterCound = 1;
        AppConfig.next_button_scale_time = 200;
        AppConfig.next_button_delay = 100;
        AppConfig.next_button_move_time = 100;
        AppConfig.next_banner_delay = 500;
        AppConfig.weightArr = [];
        AppConfig.gameShowAppRate = 0.5;
    })(AppConfig || (AppConfig = {}));

    class Log {
        static d(msg, data) {
            if (AppConfig.DEBUG) {
                if (typeof data === 'undefined') {
                    console.log(msg);
                }
                else {
                    console.log(msg + "==>" + data);
                }
            }
        }
        static error(msg, data) {
            if (AppConfig.DEBUG) {
                if (typeof data === 'undefined') {
                    console.error(msg);
                }
                else {
                    console.error(msg + "==>" + data);
                }
            }
        }
    }

    var Apps;
    (function (Apps) {
        Apps.icons = [
            {
                "index": 1,
                "name": "更强连一连",
                "appid": "wx65aa95d612042f75",
                "skin": "logos/gqlyl.png",
                "path": "",
                "weight": 1
            }, {
                "index": 2,
                "skin": "logos/drhc.png",
                "name": "点燃火柴",
                "appid": "wxec52852e9b1e6731",
                "path": "",
                "weight": 1
            }, {
                "index": 3,
                "skin": "logos/sjqq.png",
                "name": "收集球球",
                "appid": "wxecf5b5e14927c3c0",
                "path": "",
                "weight": 1
            }, {
                "index": 4,
                "skin": "logos/wcpt.png",
                "name": "五彩拼图",
                "appid": "wxf210eb821acdf6b4",
                "path": "",
                "weight": 1
            }, {
                "index": 5,
                "skin": "logos/njds.png",
                "name": "脑筋大师",
                "appid": "wxe37be3afc0a4545b",
                "path": "",
                "weight": 1
            }, {
                "index": 6,
                "skin": "logos/xlx.png",
                "name": "星连星",
                "appid": "wx8802ac098a3073e3",
                "path": "",
                "weight": 1
            }, {
                "index": 7,
                "skin": "logos/fkpp.png",
                "name": "方块拼盘",
                "appid": "wx07d791d5086eaf5e",
                "path": "",
                "weight": 1
            }, {
                "index": 8,
                "skin": "logos/ptxxl.png",
                "name": "拼图消消乐",
                "appid": "wxf1a0fedacf1e2ea1",
                "path": "",
                "isHot": true,
                "weight": 1
            }, {
                "index": 9,
                "skin": "logos/ljpt.png",
                "name": "六角拼图",
                "appid": "wx83b4f587009a8910",
                "path": "",
                "isHot": true,
                "weight": 1
            }, {
                "index": 10,
                "skin": "logos/tmsj.png",
                "name": "填满世界",
                "appid": "wx52e334f401075196",
                "path": "",
                "weight": 1
            }
        ];
        function getIcons(num) {
            let result = [];
            if (!AppConfig.ifShowApps) {
                return result;
            }
            let len = Apps.icons.length;
            if (len == 0) {
                return result;
            }
            if (len <= num) {
                return result.concat(Apps.icons);
            }
            if (AppConfig.weightArr.length == 0) {
                for (let i = 0; i < len; i++) {
                    let tmp = Apps.icons[i];
                    if (tmp.weight) {
                        for (let x = 0; x < tmp.weight; x++) {
                            AppConfig.weightArr.push(tmp);
                        }
                    }
                }
            }
            len = AppConfig.weightArr.length;
            for (let i = 0; i < num; i++) {
                let rnd = Math.floor(Math.random() * len);
                let app = AppConfig.weightArr[rnd];
                while (hasPushApp(app.appid, result)) {
                    rnd = Math.floor(Math.random() * len);
                    app = AppConfig.weightArr[rnd];
                }
                result.push(app);
            }
            return result;
        }
        Apps.getIcons = getIcons;
        function hasPushApp(appid, arrs) {
            if (arrs.length == 0)
                return false;
            let len = arrs.length;
            for (let i = 0; i < len; i++) {
                if (appid == arrs[i].appid) {
                    return true;
                }
            }
            return false;
        }
    })(Apps || (Apps = {}));

    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        var item;
        (function (item) {
            class appViewUI extends Laya.View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.createView(appViewUI.uiView);
                }
            }
            appViewUI.uiView = { "type": "View", "props": { "y": 150, "x": 115, "width": 230, "height": 300, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 2, "child": [{ "type": "Image", "props": { "y": 150, "x": 115, "width": 230, "skin": "comp/img_app.png", "runtime": "script/ImageRunTime.ts", "height": 300, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 5, "child": [{ "type": "Image", "props": { "y": 20, "x": 20, "width": 190, "skin": "comp/img_app_mask.png", "height": 190 }, "compId": 7, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 190, "var": "appIcon", "skin": "logos/dlmm.png", "height": 190 }, "compId": 6, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 190, "skin": "comp/img_app_mask.png", "renderType": "mask", "height": 190 }, "compId": 9 }], "components": [] }], "components": [] }, { "type": "Label", "props": { "y": 225, "x": 0, "width": 230, "var": "appName", "valign": "middle", "text": "电量满满满", "strokeColor": "#00affe", "stroke": 1, "overflow": "hidden", "height": 50, "fontSize": 45, "color": "#ffffff", "align": "center" }, "compId": 8 }], "components": [] }], "loadList": ["comp/img_app.png", "comp/img_app_mask.png", "logos/dlmm.png"], "loadList3D": [], "components": [] };
            item.appViewUI = appViewUI;
            REG("ui.item.appViewUI", appViewUI);
            class LevelDetailItemUI extends Laya.Scene {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.createView(LevelDetailItemUI.uiView);
                }
            }
            LevelDetailItemUI.uiView = { "type": "Scene", "props": { "width": 300, "height": 400 }, "compId": 2, "child": [{ "type": "Image", "props": { "y": 200, "x": 150, "width": 300, "var": "itemBg", "skin": "comp/img_app_bg.png", "runtime": "script/ImageRunTime.ts", "height": 400, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 3, "child": [{ "type": "Sprite", "props": { "y": 60, "x": 25, "width": 250, "height": 250 }, "compId": 4, "child": [{ "type": "Rect", "props": { "y": 0, "x": 0, "width": 250, "lineWidth": 3, "lineColor": "#ffffff", "height": 250 }, "compId": 5 }], "components": [] }, { "type": "Sprite", "props": { "y": 332, "x": 0, "width": 300, "var": "starLayout", "height": 67 }, "compId": 6, "child": [{ "type": "Label", "props": { "y": 0, "x": 0, "width": 300, "visible": false, "var": "textUnLock", "valign": "middle", "text": "刚解锁", "height": 50, "fontSize": 45, "color": "#ffffff", "align": "center" }, "compId": 7 }], "components": [] }, { "type": "Text", "props": { "y": 0, "x": 0, "width": 300, "var": "itemText", "valign": "middle", "text": "1", "height": 50, "fontSize": 50, "color": "#fff", "bold": true, "align": "center", "runtime": "laya.display.Text" }, "compId": 8 }, { "type": "Sprite", "props": { "y": 107, "x": 93, "width": 133, "var": "lockImg", "texture": "comp/stage_lock.png", "height": 156 }, "compId": 9 }, { "type": "Sprite", "props": { "y": 330, "x": 0, "width": 300, "var": "line", "staticCache": true, "height": 5 }, "compId": 10 }], "components": [] }], "loadList": ["comp/img_app_bg.png", "comp/stage_lock.png"], "loadList3D": [], "components": [] };
            item.LevelDetailItemUI = LevelDetailItemUI;
            REG("ui.item.LevelDetailItemUI", LevelDetailItemUI);
            class LevelItemUI extends Laya.Scene {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.createView(LevelItemUI.uiView);
                }
            }
            LevelItemUI.uiView = { "type": "Scene", "props": { "width": 800, "height": 200 }, "compId": 2, "child": [{ "type": "Image", "props": { "y": 100, "x": 400, "width": 800, "var": "levelItemBg", "skin": "comp/img_level_bg.png", "runtime": "script/ImageRunTime.ts", "height": 200, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 3 }, { "type": "Label", "props": { "y": 82, "x": 400, "width": 200, "var": "levelText", "valign": "middle", "text": "1级", "height": 60, "fontSize": 50, "font": "Microsoft YaHei", "color": "#fafafa", "bold": true, "anchorY": 0.5, "anchorX": 0.5, "align": "center" }, "compId": 4 }, { "type": "Label", "props": { "y": 129, "x": 400, "width": 200, "var": "indexText", "text": "10/100", "fontSize": 35, "font": "Helvetica", "color": "#eee", "bold": false, "anchorY": 0.5, "anchorX": 0.5, "align": "center" }, "compId": 5 }], "loadList": ["comp/img_level_bg.png"], "loadList3D": [], "components": [] };
            item.LevelItemUI = LevelItemUI;
            REG("ui.item.LevelItemUI", LevelItemUI);
        })(item = ui.item || (ui.item = {}));
    })(ui || (ui = {}));
    (function (ui) {
        var page;
        (function (page) {
            class BasePageUI extends Laya.Scene {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.createView(BasePageUI.uiView);
                }
            }
            BasePageUI.uiView = { "type": "Scene", "props": { "width": 1080, "name": "basePage", "height": 1920 }, "compId": 2, "child": [{ "type": "Sprite", "props": { "y": 0, "x": 0, "width": 1080, "var": "topLayout", "height": 200 }, "compId": 3, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 1080, "var": "topBg", "skin": "root/img_top_bg_9.png", "height": 200 }, "compId": 6 }, { "type": "Sprite", "props": { "y": 74, "x": 28, "width": 90, "var": "btnHome", "height": 90 }, "compId": 4, "child": [{ "type": "Image", "props": { "y": 45, "x": 45, "width": 85, "skin": "comp/IconReturn.png", "runtime": "script/ImageRunTime.ts", "height": 83, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 5 }], "components": [] }], "components": [] }, { "type": "Sprite", "props": { "y": 200, "x": 0, "width": 1080, "var": "contentLayout", "height": 1720 }, "compId": 7 }], "loadList": ["root/img_top_bg_9.png", "comp/IconReturn.png"], "loadList3D": [], "components": [] };
            page.BasePageUI = BasePageUI;
            REG("ui.page.BasePageUI", BasePageUI);
            class GamePageUI extends Laya.Scene {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.createView(GamePageUI.uiView);
                }
            }
            GamePageUI.uiView = { "type": "Scene", "props": { "width": 1080, "name": "gamePage", "height": 1920 }, "compId": 2, "child": [{ "type": "Sprite", "props": { "y": 200, "x": 0, "width": 1080, "var": "contentLayout", "height": 1720 }, "compId": 131 }, { "type": "Sprite", "props": { "y": 0, "x": 0, "width": 1080, "var": "topLayout", "height": 200 }, "compId": 84, "child": [{ "type": "Sprite", "props": { "y": 0, "x": 0, "width": 1080, "var": "topAppLayout", "height": 200 }, "compId": 656 }, { "type": "Image", "props": { "y": 0, "x": 0, "width": 1080, "var": "topBg", "skin": "root/img_top_bg_9.png", "height": 200 }, "compId": 85 }, { "type": "Sprite", "props": { "y": 70, "x": 13, "width": 100, "var": "btnHome", "height": 100 }, "compId": 86, "child": [{ "type": "Image", "props": { "y": 50, "x": 50, "width": 75, "skin": "comp/IconReturn.png", "runtime": "script/ImageRunTime.ts", "height": 75, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 87 }], "components": [] }, { "type": "Sprite", "props": { "y": 70, "x": 129, "width": 100, "var": "btnRestart", "height": 100 }, "compId": 638, "child": [{ "type": "Image", "props": { "y": 50, "x": 50, "width": 75, "skin": "comp/IconRestart.png", "runtime": "script/ImageRunTime.ts", "height": 75, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 639 }], "components": [] }, { "type": "Label", "props": { "y": 65, "x": 479, "width": 200, "var": "textLevel", "valign": "middle", "text": "关卡1", "height": 50, "fontSize": 40, "color": "#ffffff", "anchorY": 0.5, "anchorX": 0.5, "align": "center" }, "compId": 640 }], "components": [] }, { "type": "Sprite", "props": { "y": 1600, "x": 0, "width": 1080, "var": "bannerLayout", "height": 320 }, "compId": 650 }], "loadList": ["root/img_top_bg_9.png", "comp/IconReturn.png", "comp/IconRestart.png"], "loadList3D": [], "components": [] };
            page.GamePageUI = GamePageUI;
            REG("ui.page.GamePageUI", GamePageUI);
            class HomePageUI extends Laya.Scene {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.createView(HomePageUI.uiView);
                }
            }
            HomePageUI.uiView = { "type": "Scene", "props": { "width": 1080, "name": "homePage", "height": 1920 }, "compId": 2, "child": [{ "type": "Sprite", "props": { "y": 200, "x": 0, "width": 1080, "var": "contentLayout", "height": 1700 }, "compId": 9, "child": [{ "type": "Sprite", "props": { "y": 90, "x": 0, "width": 1080, "var": "dynamicLayout", "height": 646 }, "compId": 109, "child": [{ "type": "Sprite", "props": { "y": 0, "x": 10, "width": 200, "var": "appMore1", "name": "appMore1", "height": 260 }, "compId": 105 }, { "type": "Sprite", "props": { "y": 380, "x": 10, "width": 200, "var": "appMore2", "name": "appMore2", "height": 260 }, "compId": 106 }, { "type": "Sprite", "props": { "y": 0, "x": 870, "width": 200, "var": "appMore3", "name": "appMore3", "height": 260 }, "compId": 107 }, { "type": "Sprite", "props": { "y": 380, "x": 870, "width": 200, "var": "appMore4", "name": "appMore4", "height": 260 }, "compId": 108 }], "components": [] }, { "type": "Image", "props": { "y": 860, "x": 540, "width": 600, "var": "btnStart", "skin": "comp/ok_button.png", "runtime": "script/ImageRunTime.ts", "height": 180, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 7, "child": [{ "type": "Label", "props": { "y": 0, "x": 0, "width": 600, "valign": "middle", "text": "开始游戏", "height": 180, "fontSize": 80, "color": "#ffffff", "align": "center" }, "compId": 8 }, { "type": "Script", "props": { "y": 0, "x": 0, "width": 594, "height": 180, "runtime": "laya.physics.BoxCollider" }, "compId": 85 }, { "type": "Script", "props": { "type": "static", "runtime": "laya.physics.RigidBody" }, "compId": 86 }], "components": [] }, { "type": "Image", "props": { "y": 1109, "x": 390, "width": 290, "var": "btnLevel", "skin": "comp/ok_button.png", "runtime": "script/ImageRunTime.ts", "height": 150, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 93, "child": [{ "type": "Label", "props": { "y": 0, "x": 0, "width": 290, "valign": "middle", "text": "地图", "height": 150, "fontSize": 50, "color": "#ffffff", "align": "center" }, "compId": 94 }, { "type": "Script", "props": { "y": 0, "x": 0, "width": 290, "height": 150, "runtime": "laya.physics.BoxCollider" }, "compId": 95 }, { "type": "Script", "props": { "type": "static", "runtime": "laya.physics.RigidBody" }, "compId": 96 }], "components": [] }, { "type": "Image", "props": { "y": 1109, "x": 708, "width": 290, "var": "btnShare", "skin": "comp/ok_button.png", "runtime": "script/ImageRunTime.ts", "height": 150, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 97, "child": [{ "type": "Image", "props": { "y": 45.5, "x": 15, "width": 59, "skin": "comp/img_icon_share.png", "height": 59 }, "compId": 102, "child": [{ "type": "Script", "props": { "saturation": "0", "hue": "0", "contrast": "0", "color": "#fff", "brightness": "0", "alpha": "0", "runtime": "laya.effect.ColorFilterSetter" }, "compId": 103 }], "components": [] }, { "type": "Label", "props": { "y": 0, "x": 0, "width": 290, "valign": "middle", "text": "分享", "height": 150, "fontSize": 50, "color": "#ffffff", "align": "center" }, "compId": 98 }, { "type": "Script", "props": { "y": 0, "x": 0, "width": 290, "height": 150, "runtime": "laya.physics.BoxCollider" }, "compId": 99 }, { "type": "Script", "props": { "type": "static", "runtime": "laya.physics.RigidBody" }, "compId": 100 }], "components": [] }, { "type": "Sprite", "props": { "y": 1259, "x": 0, "width": 1080, "var": "allAppLayout", "height": 320 }, "compId": 110 }], "components": [] }], "loadList": ["comp/ok_button.png", "comp/img_icon_share.png"], "loadList3D": [], "components": [] };
            page.HomePageUI = HomePageUI;
            REG("ui.page.HomePageUI", HomePageUI);
            class LevelDetailPageUI extends Laya.Scene {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.createView(LevelDetailPageUI.uiView);
                }
            }
            LevelDetailPageUI.uiView = { "type": "Scene", "props": { "width": 1080, "name": "basePage", "height": 1920 }, "compId": 2, "child": [{ "type": "Sprite", "props": { "y": 0, "x": 0, "width": 1080, "var": "topLayout", "height": 200 }, "compId": 3, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 1080, "var": "topBg", "skin": "root/img_top_bg_9.png", "height": 200 }, "compId": 6 }, { "type": "Sprite", "props": { "y": 74, "x": 28, "width": 90, "var": "btnHome", "height": 90 }, "compId": 4, "child": [{ "type": "Image", "props": { "y": 45, "x": 45, "width": 85, "skin": "comp/IconReturn.png", "runtime": "script/ImageRunTime.ts", "height": 83, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 5 }], "components": [] }, { "type": "Label", "props": { "y": 114, "x": 540, "width": 300, "var": "levelLabel", "valign": "middle", "text": "1级", "height": 80, "fontSize": 60, "font": "Microsoft YaHei", "color": "#ffffff", "bold": true, "anchorY": 0.5, "anchorX": 0.5, "align": "center" }, "compId": 8 }, { "type": "Label", "props": { "y": 170, "x": 540, "width": 300, "var": "passLabel", "valign": "middle", "text": "1/50", "height": 50, "fontSize": 35, "font": "Microsoft YaHei", "color": "#e5e5e5", "bold": false, "anchorY": 0.5, "anchorX": 0.5, "align": "center" }, "compId": 9 }], "components": [] }, { "type": "Sprite", "props": { "y": 200, "x": 0, "width": 1080, "var": "contentLayout", "height": 1400 }, "compId": 7, "child": [{ "type": "Panel", "props": { "y": 50, "x": 190, "width": 700, "var": "itemPanel", "height": 1300 }, "compId": 10 }], "components": [] }, { "type": "Sprite", "props": { "y": 1570, "x": 0, "width": 1080, "var": "bannerLayout", "height": 350 }, "compId": 11 }], "loadList": ["root/img_top_bg_9.png", "comp/IconReturn.png"], "loadList3D": [], "components": [] };
            page.LevelDetailPageUI = LevelDetailPageUI;
            REG("ui.page.LevelDetailPageUI", LevelDetailPageUI);
            class LevelPageUI extends Laya.Scene {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.createView(LevelPageUI.uiView);
                }
            }
            LevelPageUI.uiView = { "type": "Scene", "props": { "width": 1080, "name": "basePage", "height": 1920 }, "compId": 2, "child": [{ "type": "Sprite", "props": { "y": 0, "x": 0, "width": 1080, "var": "topLayout", "height": 200 }, "compId": 3, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 1080, "var": "topBg", "skin": "root/img_top_bg_9.png", "height": 200 }, "compId": 6 }, { "type": "Sprite", "props": { "y": 74, "x": 28, "width": 90, "var": "btnHome", "height": 90 }, "compId": 4, "child": [{ "type": "Image", "props": { "y": 45, "x": 45, "width": 85, "skin": "comp/IconReturn.png", "runtime": "script/ImageRunTime.ts", "height": 83, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 5 }], "components": [] }, { "type": "Label", "props": { "y": 84, "x": 315, "width": 450, "var": "textTitle", "valign": "middle", "height": 80, "fontSize": 35, "color": "#ffffff", "align": "center" }, "compId": 9 }], "components": [] }, { "type": "Sprite", "props": { "y": 200, "x": 0, "width": 1080, "var": "contentLayout", "height": 1720 }, "compId": 7, "child": [{ "type": "List", "props": { "y": 10, "x": 540, "width": 800, "var": "dataList", "spaceY": 20, "height": 1604, "anchorX": 0.5 }, "compId": 8 }], "components": [] }], "loadList": ["root/img_top_bg_9.png", "comp/IconReturn.png"], "loadList3D": [], "components": [] };
            page.LevelPageUI = LevelPageUI;
            REG("ui.page.LevelPageUI", LevelPageUI);
            class LoadPageUI extends Laya.Scene {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.createView(LoadPageUI.uiView);
                }
            }
            LoadPageUI.uiView = { "type": "Scene", "props": { "width": 1080, "name": "loadPage", "height": 1920 }, "compId": 2, "child": [{ "type": "Sprite", "props": { "y": 1357, "x": 140, "width": 800, "var": "progressBarLayout", "height": 50 }, "compId": 5, "child": [{ "type": "Label", "props": { "y": -100, "x": 0, "width": 800, "var": "loadText", "text": "正在玩命加载...", "height": 50, "fontSize": 35, "color": "#050505", "align": "center" }, "compId": 8 }], "components": [] }], "loadList": ["widget/ProgressView.ui"], "loadList3D": [], "components": [] };
            page.LoadPageUI = LoadPageUI;
            REG("ui.page.LoadPageUI", LoadPageUI);
            class PassPageUI extends Laya.Scene {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.createView(PassPageUI.uiView);
                }
            }
            PassPageUI.uiView = { "type": "Scene", "props": { "width": 1080, "name": "passPage", "height": 1920 }, "compId": 2, "child": [{ "type": "Sprite", "props": { "y": 0, "x": 0, "width": 1080, "var": "topLayout", "height": 200 }, "compId": 3, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 1080, "var": "topBg", "skin": "root/img_top_bg_9.png", "height": 200 }, "compId": 6 }, { "type": "Sprite", "props": { "y": 74, "x": 28, "width": 90, "var": "btnHome", "height": 90 }, "compId": 4, "child": [{ "type": "Image", "props": { "y": 45, "x": 45, "width": 85, "skin": "comp/IconHome.png", "runtime": "script/ImageRunTime.ts", "height": 83, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 5 }], "components": [] }, { "type": "Label", "props": { "y": 119, "x": 540, "width": 200, "var": "textLevel", "valign": "middle", "text": "关卡1", "height": 50, "fontSize": 40, "color": "#ffffff", "anchorY": 0.5, "anchorX": 0.5, "align": "center" }, "compId": 8 }, { "type": "Image", "props": { "y": 133, "x": 324, "width": 100, "var": "btnRstart", "runtime": "script/ImageRunTime.ts", "height": 100, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 15, "child": [{ "type": "Sprite", "props": { "y": 0, "x": 0, "texture": "comp/IconRestart.png" }, "compId": 19 }], "components": [] }], "components": [] }, { "type": "Sprite", "props": { "y": 200, "x": 0, "width": 1080, "var": "contentLayout", "height": 1720 }, "compId": 7, "child": [{ "type": "Sprite", "props": { "y": 34, "x": 90, "width": 877, "texture": "comp/RibbonCompleted.png", "height": 306 }, "compId": 11, "child": [{ "type": "Image", "props": { "y": 203, "x": 285, "width": 180, "var": "star1", "skin": "comp/img_yellow_star.png", "height": 180, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 12 }, { "type": "Image", "props": { "y": 203, "x": 438.5, "width": 180, "var": "star2", "skin": "comp/img_yellow_star.png", "height": 180, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 13 }, { "type": "Image", "props": { "y": 203, "x": 592, "width": 180, "var": "star3", "skin": "comp/img_yellow_star.png", "height": 180, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 14 }], "components": [] }, { "type": "Image", "props": { "y": 1180, "x": 540, "width": 334, "var": "btnNext", "skin": "comp/ok_button.png", "runtime": "script/ImageRunTime.ts", "height": 119, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 17, "child": [{ "type": "Label", "props": { "width": 334, "valign": "middle", "text": "下一关", "height": 119, "fontSize": 50, "color": "#ffffff", "align": "center" }, "compId": 18 }], "components": [] }, { "type": "Sprite", "props": { "y": 1266, "x": 0, "width": 1080, "var": "bannerLayout", "height": 350 }, "compId": 20 }, { "type": "Image", "props": { "y": 352, "x": 0, "width": 1080, "skin": "comp/CupBackground.png", "height": 750 }, "compId": 24, "child": [{ "type": "Label", "props": { "y": 3, "x": 387.5, "width": 305, "valign": "middle", "text": "好友都在玩", "height": 82, "fontSize": 60, "color": "#ffffff", "bold": true, "align": "center" }, "compId": 25 }, { "type": "Sprite", "props": { "y": 90, "x": 0, "width": 1080, "var": "appLayout", "height": 650 }, "compId": 21 }], "components": [] }], "components": [] }], "loadList": ["root/img_top_bg_9.png", "comp/IconHome.png", "comp/IconRestart.png", "comp/RibbonCompleted.png", "comp/img_yellow_star.png", "comp/ok_button.png", "comp/CupBackground.png"], "loadList3D": [], "components": [] };
            page.PassPageUI = PassPageUI;
            REG("ui.page.PassPageUI", PassPageUI);
            class RootPageUI extends Laya.Scene {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.createView(RootPageUI.uiView);
                }
            }
            RootPageUI.uiView = { "type": "Scene", "props": { "width": 1080, "height": 1920 }, "compId": 2, "child": [{ "type": "Sprite", "props": { "y": -10, "x": -10, "width": 1100, "var": "bgLayout", "height": 1940 }, "compId": 29 }, { "type": "Sprite", "props": { "y": 0, "x": 0, "width": 1080, "var": "pageLayout", "height": 1920 }, "compId": 30 }, { "type": "Sprite", "props": { "y": 0, "x": 0, "width": 1080, "var": "topLayout", "height": 0 }, "compId": 31 }], "loadList": [], "loadList3D": [], "components": [] };
            page.RootPageUI = RootPageUI;
            REG("ui.page.RootPageUI", RootPageUI);
        })(page = ui.page || (ui.page = {}));
    })(ui || (ui = {}));
    (function (ui) {
        var widget;
        (function (widget) {
            class AllAppViewUI extends Laya.Scene {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.createView(AllAppViewUI.uiView);
                }
            }
            AllAppViewUI.uiView = { "type": "Scene", "props": { "width": 1080, "height": 300 }, "compId": 2, "child": [{ "type": "List", "props": { "y": 0, "x": 0, "width": 1080, "var": "iconLayout", "spaceX": 20, "height": 300 }, "compId": 3 }], "loadList": [], "loadList3D": [], "components": [] };
            widget.AllAppViewUI = AllAppViewUI;
            REG("ui.widget.AllAppViewUI", AllAppViewUI);
            class ProgressViewUI extends Laya.Scene {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.createView(ProgressViewUI.uiView);
                }
            }
            ProgressViewUI.uiView = { "type": "Scene", "props": { "width": 800, "height": 30 }, "compId": 2, "child": [{ "type": "Panel", "props": { "y": 15, "x": 400, "width": 800, "height": 30, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 3, "child": [{ "type": "Image", "props": { "y": 15, "x": 400, "width": 800, "var": "progressBg", "value": 0, "skin": "root/progressBg.png", "height": 30, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 4 }, { "type": "Image", "props": { "y": 15, "x": 400, "width": 800, "var": "progressBar", "skin": "root/progressBar.png", "height": 30, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 5, "child": [{ "type": "Image", "props": { "y": 15, "x": -400, "width": 800, "var": "progressMask", "skin": "root/progressBar.png", "renderType": "mask", "height": 30, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 6 }], "components": [] }], "components": [] }], "loadList": ["root/progressBg.png", "root/progressBar.png"], "loadList3D": [], "components": [] };
            widget.ProgressViewUI = ProgressViewUI;
            REG("ui.widget.ProgressViewUI", ProgressViewUI);
        })(widget = ui.widget || (ui.widget = {}));
    })(ui || (ui = {}));

    function insertCount(data) {
        Log.d(data);
        if (data.mark) {
            if (typeof data.mark == 'object') {
                Log.d(data.mark);
                var tmp = JSON.stringify(data.mark);
                tmp = tmp.replace(/&/g, "，");
                tmp = tmp.replace(/\{/g, "");
                tmp = tmp.replace(/\}/g, "");
                tmp = tmp.replace(/\s+/g, "");
                tmp = tmp.replace(/\./g, "_");
                tmp = tmp.replace(/\:/g, "：");
                data.mark = tmp;
            }
            else if (typeof data.mark == 'string') {
                data.mark = data.mark.replace(/\./g, "_");
                data.mark = data.mark.replace(/\:/g, "：");
                data.mark = data.mark.replace(/&/g, ",");
                data.mark = data.mark.replace(/\s+/g, "");
            }
            else {
                data.mark = String(data.mark);
            }
        }
        else {
            data.mark = '';
        }
        var params = { version: AppConfig.VERSION.replace(/\./g, '-'), userId: AppConfig.userId, mark: data.mark, channel: AppConfig.userChannel, page: data.page };
        Log.d(data.mark);
        Log.d(params);
        wx.aldSendEvent(data.type, params);
    }

    function shareToFriend(msg, query) {
        AppConfig.shareCancel = false;
        var state = getState(query);
        switch (state) {
            case ShareType.BONUS:
                {
                    AppConfig.isShareBonus = true;
                }
                break;
            case ShareType.SHOWTIP:
                {
                    AppConfig.isShareTip = true;
                }
                break;
            case ShareType.GROUP:
                {
                    AppConfig.isShareGroup = true;
                }
                break;
        }
        var imgId = 'none';
        var link = 'imgId=';
        var shared = getShared(query);
        var imgPath = AppConfig.LOCAL_SHARE;
        var title = "这条狗要治，上天了都...";
        if (shared) {
            if (shared.imgs) {
                var rand = Math.random();
                var data = null;
                var len = shared.imgs.length;
                for (var i = 0; i < len; i++) {
                    var tmp = shared.imgs[i];
                    if (rand >= tmp.min && rand < tmp.max) {
                        if (data && data.max < tmp.max) {
                            data = tmp;
                        }
                        else {
                            data = tmp;
                        }
                    }
                }
                if (!data) {
                    data = shared.imgs[0];
                }
                imgPath = data.url;
                title = data.title;
                imgId = data.id;
                link = data.link ? data.link : imgId = ' + imgId';
                Log.d(data);
            }
            else if (shared.sharedImg) {
                imgPath = shared.sharedImg[0];
                title = shared.sharedTitle[0];
                link = 'imgId=' + imgId;
            }
        }
        else {
            link = '';
        }
        if (!AppConfig.ifShowBonus) {
            imgPath = AppConfig.LOCAL_SHARE;
            title = "这条狗要治，上天了都...";
        }
        if (msg) {
            title = msg;
        }
        var newQuery = query ? query : ('uid=' + AppConfig.userId + '&state=0');
        newQuery = link + '&' + newQuery;
        AppConfig.getShareTime = new Date().getTime();
        if (AppConfig.ifAldShare) {
            wx.aldShareAppMessage({
                query: newQuery,
                imageUrl: imgPath,
                title: title,
                fail: () => {
                    AppConfig.shareCancel = true;
                }
            });
        }
        else {
            wx.shareAppMessage({
                query: newQuery,
                imageUrl: imgPath,
                title: title,
                fail: () => {
                    AppConfig.shareCancel = true;
                }
            });
        }
        setTimeout(function () {
            Log.d('update updateShareMenu withShareTicket');
            wx.updateShareMenu({
                withShareTicket: false
            });
        }, 1500);
    }
    function getState(query) {
        if (query) {
            var result = /state=(\d+)/.exec(query);
            if (result && result.length > 1) {
                return parseInt(result[1]);
            }
        }
        return 0;
    }
    function getShared(query) {
        var state = 0;
        state = getState(query);
        Log.d('得到state=' + state);
        var sharedContent = wx.getStorageSync(AppConfig.SHARED_KEY);
        if (typeof sharedContent == 'undefined') {
            return null;
        }
        var len = sharedContent.length;
        for (var i = 0; i < len; i++) {
            if (sharedContent[i].sharedType == state) {
                return sharedContent[i];
            }
        }
    }
    const ShareType = {
        HOME: 1,
        PASS: 6,
        GROUP: 4,
        BONUS: 5,
        SHOWTIP: 10,
        MENU: 9
    };

    class Map {
        constructor() {
            this.container = {};
        }
        put(key, value) {
            try {
                if (key != null && key != "")
                    this.container[key] = value;
            }
            catch (e) {
                return e;
            }
        }
        get(key) {
            try {
                return this.container[key];
            }
            catch (e) {
                return e;
            }
        }
        containsKey(key) {
            try {
                for (var p in this.container) {
                    if (p == key)
                        return true;
                }
                return false;
            }
            catch (e) {
                return e;
            }
        }
        containsValue(value) {
            try {
                for (var p in this.container) {
                    if (this.container[p] === value)
                        return true;
                }
                return false;
            }
            catch (e) {
                return e;
            }
        }
        ;
        remove(key) {
            try {
                delete this.container[key];
            }
            catch (e) {
                return e;
            }
        }
        ;
        clear() {
            try {
                delete this.container;
                this.container = {};
            }
            catch (e) {
                return e;
            }
        }
        ;
        isEmpty() {
            if (this.keyArray().length == 0)
                return true;
            else
                return false;
        }
        ;
        size() {
            return this.keyArray().length;
        }
        keyArray() {
            var keys = new Array();
            for (var p in this.container) {
                keys.push(p);
            }
            return keys;
        }
        valueArray() {
            var values = new Array();
            var keys = this.keyArray();
            for (var i = 0; i < keys.length; i++) {
                values.push(this.container[keys[i]]);
            }
            return values;
        }
    }

    class BannerManager {
        constructor() {
            this.videoCloseTime = -1;
            this.bannerMap = new Map();
            this.videoMap = new Map();
            this.interstitialMap = new Map();
            this.hasLoadInterstitial = null;
            this.hasLoadAd = null;
            this.loadVideo();
        }
        static getSelf() {
            if (BannerManager.self == null) {
                BannerManager.self = new BannerManager();
            }
            return BannerManager.self;
        }
        loadInterstitialAd(callBack) {
            Log.d("预加载插屏广告  =============");
            if (this.hasLoadInterstitial) {
                if (callBack) {
                    callBack(this.hasLoadInterstitial);
                }
                return;
            }
            var entity = this.getInsterstitial(0);
            if (entity != null) {
                this.hasLoadInterstitial = entity;
                entity.onLoad(() => {
                    Log.d('插屏 广告加载成功');
                    insertCount({ userId: AppConfig.userId, type: "插屏广告加载成功" });
                });
                entity.onError(err => {
                    Log.d('插屏广告加载出错：');
                    Log.d(err);
                    insertCount({ userId: AppConfig.userId, type: "插屏广告加载出错", mark: err });
                });
            }
            if (callBack) {
                callBack(entity);
            }
        }
        getInsterstitial(adIndex) {
            if (typeof wx.createInterstitialAd != 'function')
                return null;
            if (!AppConfig.ifInsterAd)
                return null;
            let entity = this.interstitialMap.get(AppConfig.interstitialAd[adIndex]);
            if (!entity) {
                entity = wx.createInterstitialAd({
                    adUnitId: AppConfig.interstitialAd[adIndex]
                });
                entity.onError(e => {
                    Log.d(e);
                });
                this.interstitialMap.put(AppConfig.interstitialAd[adIndex], entity);
            }
            else {
                entity.onError(e => {
                    Log.d(e);
                });
            }
            return entity;
        }
        showInterstitialAd(callBack, closeCallBack, errorCallBack) {
            var thiz = this;
            if (this.hasLoadInterstitial) {
                this.hasLoadInterstitial.onClose(() => {
                    Log.d('插屏广告close回调');
                    thiz.hasLoadInterstitial.offClose();
                    thiz.hasLoadInterstitial = null;
                    thiz.loadInterstitialAd();
                    insertCount({ userId: AppConfig.userId, type: "关闭插屏广告" });
                    if (closeCallBack) {
                        closeCallBack();
                    }
                });
                this.hasLoadInterstitial.show().then(() => {
                    if (callBack) {
                        callBack();
                    }
                }).catch((err) => {
                    Log.d("展示插屏出错：");
                    Log.d(err);
                    insertCount({ userId: AppConfig.userId, type: "插屏广告加展示出错", mark: err });
                    if (errorCallBack) {
                        errorCallBack();
                    }
                });
            }
            else {
                thiz.loadInterstitialAd(function (entity) {
                    if (entity) {
                        entity.onClose(() => {
                            Log.d('插屏广告close回调');
                            entity.offClose();
                            entity = null;
                            thiz.loadInterstitialAd();
                            if (closeCallBack) {
                                closeCallBack();
                            }
                            insertCount({ userId: AppConfig.userId, type: "关闭插屏广告" });
                        });
                        entity.show().then(() => {
                            if (callBack) {
                                callBack();
                            }
                        }).catch((err) => {
                            Log.d("展示插屏出错：");
                            Log.d(err);
                            insertCount({ userId: AppConfig.userId, type: "插屏广告加展示出错", mark: err });
                            if (errorCallBack) {
                                errorCallBack();
                            }
                        });
                    }
                    else {
                        if (errorCallBack) {
                            errorCallBack();
                        }
                    }
                });
            }
        }
        initBanner(bannerIndex, callBack) {
            var entity = this.bannerMap.get(AppConfig.banners[bannerIndex]);
            if (!entity) {
                entity = wx.createBannerAd({
                    adUnitId: AppConfig.banners[bannerIndex],
                    style: {
                        left: 0,
                        top: AppConfig.systemInfo.height - 100,
                        width: AppConfig.systemInfo.screenWidth,
                    }
                });
                entity.onError(function (e) {
                    if (e) {
                        insertCount({ userId: AppConfig.userId, type: "banner加载错误", mark: 'errCode:' + e.errCode + ',errMsg:' + e.errMsg });
                        if (e.errCode == 1004 || e.errCode == 0 || e.errCode == -1000) {
                            AppConfig.bannerError = true;
                        }
                        if (callBack) {
                            callBack(bannerIndex, e);
                        }
                    }
                });
                this.bannerMap.put(AppConfig.banners[bannerIndex], entity);
            }
        }
        getBanner(bannerIndex) {
            var entity = this.bannerMap.get(AppConfig.banners[bannerIndex]);
            if (!entity) {
                entity = wx.createBannerAd({
                    adUnitId: AppConfig.banners[bannerIndex],
                    style: {
                        left: 0,
                        top: AppConfig.systemInfo.height - 100,
                        width: AppConfig.systemInfo.screenWidth,
                    }
                });
                this.bannerMap.put(AppConfig.banners[bannerIndex], entity);
            }
            return entity;
        }
        showBanner(bannerIndex, height, callBack) {
            var adKey = AppConfig.banners[bannerIndex];
            var entity = this.bannerMap.get(adKey);
            if (entity) {
                this.bannerMap.remove(adKey);
                entity.hide();
                entity.destroy();
                entity = null;
            }
            entity = wx.createBannerAd({
                adUnitId: adKey,
                style: {
                    left: 0,
                    top: 0,
                    width: 300,
                }
            });
            entity.onError(e => {
                Log.d(e);
                if (e) {
                    insertCount({ userId: AppConfig.userId, type: "banner加载错误", mark: 'errCode:' + e.errCode + ',errMsg:' + e.errMsg });
                    if (e.errCode == 1004 || e.errCode == 0 || e.errCode == -1000) {
                        AppConfig.bannerError = true;
                    }
                }
                if (callBack) {
                    callBack(-2);
                }
            });
            if (!entity) {
                if (callBack) {
                    callBack(-2);
                }
                return;
            }
            this.bannerMap.put(adKey, entity);
            entity.onResize(size => {
                if (height) {
                    if ((height - AppConfig.IPHONEX_BOTTOM) * AppConfig.scaleX < size.height) {
                        insertCount({ userId: AppConfig.userId, type: "banner高度不够" });
                        if (callBack) {
                            callBack(-1);
                        }
                        return;
                    }
                    entity.style.top = AppConfig.systemInfo.screenHeight - size.height - AppConfig.IPHONEX_BOTTOM;
                    entity.style.left = (AppConfig.systemInfo.screenWidth - size.width) / 2;
                    entity.show();
                    if (callBack) {
                        callBack(0);
                    }
                }
            });
        }
        showBannerInPosition(bannerIndex, x, y, width, callBack, height) {
            Log.d("banner ==> 加广告");
            var adKey = AppConfig.banners[bannerIndex];
            var entity = this.bannerMap.get(adKey);
            if (entity) {
                this.bannerMap.remove(adKey);
                entity.hide();
                entity.destroy();
                entity = null;
            }
            entity = wx.createBannerAd({
                adUnitId: adKey,
                style: {
                    left: x * AppConfig.scaleX,
                    top: y * AppConfig.scaleX,
                    width: width ? width * AppConfig.scaleX : AppConfig.systemInfo.screenWidth,
                    height: height ? height * AppConfig.scaleX : 300
                }
            });
            entity.onError(e => {
                Log.d(e);
                if (e && e.errCode) {
                    insertCount({ userId: AppConfig.userId, type: "banner加载错误", mark: 'errCode:' + e.errCode });
                    if (e.errCode == 1004 || e.errCode == 0 || e.errCode == -10000) {
                        AppConfig.bannerError = true;
                    }
                }
                if (callBack) {
                    callBack(-2);
                }
            });
            if (!entity) {
                if (callBack) {
                    callBack(-2);
                }
                return;
            }
            this.bannerMap.put(adKey, entity);
            entity.onResize(size => {
                if (height != void 0) {
                    if (size.height > height * AppConfig.scaleX) {
                        insertCount({ userId: AppConfig.userId, type: "banner高度不够" });
                        if (callBack) {
                            callBack(-1);
                        }
                        return;
                    }
                }
                entity.style.left = (AppConfig.systemInfo.screenWidth - size.width) / 2;
                Log.d("广告加载成功：");
                Log.d(entity.style);
                entity.show();
                if (callBack) {
                    callBack(0);
                }
            });
        }
        hideBanner(bannerIndex) {
            Log.d("banner ==> 隐藏广告");
            if (bannerIndex >= 0) {
                var entity = this.bannerMap.get(AppConfig.banners[bannerIndex]);
                if (entity) {
                    this.bannerMap.remove(AppConfig.banners[bannerIndex]);
                    entity.hide();
                    entity.destroy();
                    entity = null;
                }
            }
            else {
                var keyList = this.bannerMap.keyArray();
                var keyLen = keyList.length;
                for (var i = 0; i < keyLen; i++) {
                    var entity = this.bannerMap.get(keyList[i]);
                    if (entity) {
                        entity.hide();
                        entity.destroy();
                        entity = null;
                    }
                }
            }
        }
        getVideoAd(videoIndex) {
            var entity = this.videoMap.get(AppConfig.videos[videoIndex]);
            if (!entity) {
                entity = wx.createRewardedVideoAd({
                    adUnitId: AppConfig.videos[videoIndex]
                });
                entity.onError(e => {
                    Log.d(e);
                });
                this.videoMap.put(AppConfig.videos[videoIndex], entity);
            }
            else {
                entity.onError(e => {
                    Log.d(e);
                });
            }
            return entity;
        }
        loadVideo(callBack) {
            Log.d("loadVideo  =============");
            let thiz = this;
            if (thiz.hasLoadAd) {
                if (callBack) {
                    callBack(thiz.hasLoadAd);
                }
                return;
            }
            var entity = thiz.getVideoAd(0);
            if (entity != null) {
                entity.load()
                    .then(() => {
                    Log.d("loadVideo  ============= success!!!");
                    AppConfig.canShowVideo = true;
                    thiz.hasLoadAd = entity;
                    if (callBack) {
                        callBack(entity);
                    }
                })
                    .catch(err => {
                    Log.d("loadVideo  err=>");
                    Log.d(err);
                    thiz.hasLoadAd = null;
                    AppConfig.canShowVideo = false;
                    if (callBack) {
                        callBack(null);
                    }
                });
            }
        }
        showVideo(callBack, errorMsg, incomplete, errorCallBack) {
            var thiz = this;
            if (thiz.hasLoadAd) {
                thiz.hasLoadAd.onClose((status) => {
                    Log.d('提示视频广告close回调');
                    thiz.hasLoadAd.offClose();
                    thiz.hasLoadAd = null;
                    thiz.loadVideo();
                    var dTime = (new Date().getTime() - thiz.videoCloseTime) / 1000;
                    var isRealClose = dTime > 15000 ? true : false;
                    thiz.videoCloseTime = new Date().getTime();
                    Log.d('视频关闭时间：' + thiz.videoCloseTime);
                    Log.d('时差：' + dTime + '秒');
                    if ((status && status.isEnded) || status === undefined && isRealClose) {
                        insertCount({ userId: AppConfig.userId, type: '统计 视频看完', mark: 'userId:' + AppConfig.userId + ';video:' + AppConfig.videos[0] + 'dTime:' + dTime + '秒' });
                        callBack();
                    }
                    else {
                        insertCount({ userId: AppConfig.userId, type: '统计 视频未看完', mark: 'video:' + AppConfig.videos[0] });
                        showModal({
                            title: '提示',
                            content: incomplete ? incomplete : '视频未完整播放，无法获得提示！',
                            confirmText: '好的',
                            showCancel: false,
                        });
                    }
                });
                this.hasLoadAd.show();
            }
            else {
                if (AppConfig.DEBUG) {
                    showModal({
                        title: '提示',
                        content: '视频预加载失败~~~',
                        confirmText: '好的',
                        showCancel: false,
                    });
                }
                thiz.loadVideo(function (entity) {
                    if (entity) {
                        entity.onClose((status) => {
                            Log.d('提示视频广告close回调');
                            thiz.hasLoadAd.offClose();
                            thiz.hasLoadAd = null;
                            thiz.loadVideo();
                            var dTime = (new Date().getTime() - thiz.videoCloseTime) / 1000;
                            var isRealClose = dTime > 9000 ? true : false;
                            thiz.videoCloseTime = new Date().getTime();
                            Log.d('视频关闭时间：' + thiz.videoCloseTime);
                            Log.d('时差：' + dTime + '秒');
                            if ((status && status.isEnded) || status === undefined && isRealClose) {
                                insertCount({ userId: AppConfig.userId, type: '统计 视频看完', mark: 'userId:' + AppConfig.userId + ';video:' + AppConfig.videos[0] + 'dTime:' + dTime + '秒' });
                                callBack();
                            }
                            else {
                                insertCount({ userId: AppConfig.userId, type: '统计 视频未看完', mark: 'video:' + AppConfig.videos[0] });
                                showModal({
                                    title: '提示',
                                    content: incomplete ? incomplete : '视频未完整播放，无法获得提示！',
                                    confirmText: '好的',
                                    showCancel: false,
                                });
                            }
                        });
                        entity.show();
                    }
                    else {
                        if (errorCallBack) {
                            errorCallBack();
                        }
                        else {
                            showModal({
                                title: '提示',
                                content: errorMsg ? errorMsg : '非常抱歉，暂时没有可观看的视频，建议先使用金币看提示吧！',
                                confirmText: '好的',
                                showCancel: false,
                            });
                        }
                    }
                });
            }
        }
    }
    BannerManager.GAMEPAGE_BANNER = 0;
    BannerManager.GAMEPAGE_TIPAD = 0;
    BannerManager.GAMEPAGE_BONUSAD = 0;
    BannerManager.LOGIN_BONUSAD = 0;
    BannerManager.HIDE_ALL = -1;
    BannerManager.self = null;

    class UiManager {
        constructor() {
            this.pageRoot = null;
            this.toast = null;
            this.model = null;
            this.bgIndex = 0;
            this.hasLoadBtnAni = false;
            this.btnAni = null;
        }
        setRootPage(page) {
            this.pageRoot = page;
        }
        getCurrentPage() {
            let num = this.pageRoot.pageLayout.numChildren;
            if (num > 0) {
                let lastPage = this.pageRoot.pageLayout.getChildAt(num - 1);
                return lastPage.name;
            }
            return AppConfig.PAGENAME.NONE;
        }
        static getSelf() {
            if (!UiManager.self) {
                UiManager.self = new UiManager();
            }
            return UiManager.self;
        }
        showToast(msg, time) {
            wx.showToast({
                icon: "none",
                title: msg,
                duration: time ? time : 1500
            });
        }
        clearToast() {
        }
        isToastShowing() {
            return false;
        }
        showModal(data) {
            this.hideLoading();
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
                    }
                    else if (res.cancel) {
                        if (data.fail) {
                            data.fail();
                        }
                    }
                }
            });
        }
        gotoPage(page, noAni) {
            Log.d('gotoPage  name=' + page.name);
            BannerManager.getSelf().hideBanner(BannerManager.HIDE_ALL);
            this.pageRoot.gotoPage(page, noAni);
        }
        closePage(page, noAni) {
            this.pageRoot.closePage(page, noAni);
        }
        addPage(page, noAni) {
            this.pageRoot.addPage(page, noAni);
        }
        goHome() {
            if (AppConfig.isWX) {
                BannerManager.getSelf().hideBanner(BannerManager.HIDE_ALL);
            }
            this.showOrHideTop(true);
            this.pageRoot.goHome();
        }
        clearPage() {
            this.pageRoot.clearPage();
        }
        showOrHideTop(flag) {
            let thiz = UiManager.getSelf();
            if (thiz.pageRoot.topLayout.visible == flag)
                return;
            Laya.Tween.clearAll(thiz.pageRoot.topLayout);
            thiz.pageRoot.topLayout.visible = true;
            Laya.Tween.to(thiz.pageRoot.topLayout, {
                y: flag ? thiz.pageRoot.GuideFixOffset : (thiz.pageRoot.GuideFixOffset - thiz.pageRoot.height)
            }, 500, flag ? Laya.Ease.bounceIn : Laya.Ease.bounceOut, Laya.Handler.create(thiz.pageRoot.topLayout, function () {
                thiz.pageRoot.topLayout.visible = flag;
            }));
        }
        setPowerNum(power) {
            if (this.pageRoot) {
                this.pageRoot.setPowerNum(power);
            }
        }
        usePower(callBack, num) {
        }
        showLoading(data) {
            if (AppConfig.isWX) {
                wx.showLoading({
                    title: data ? data.title ? data.title : "加载中..." : '加载中...',
                    icon: data ? data.icon ? data.icon : "none" : "none",
                    mask: data ? (data.mask ? data.mask : true) : true
                });
            }
        }
        hideLoading() {
            if (AppConfig.isWX) {
                wx.hideLoading();
            }
        }
        getPageHeight() {
            return this.pageRoot.getPageHeight();
        }
        getTopOffset() {
            return this.pageRoot.getTopOffset();
        }
        getFixOffset() {
            return this.pageRoot.GuideFixOffset;
        }
        getLastPageName() {
            return this.getCurrentPage();
        }
    }
    UiManager.self = null;

    var Common;
    (function (Common) {
        function formatDate(date, fmt) {
            var o = {
                "M+": date.getMonth() + 1,
                "d+": date.getDate(),
                "h+": date.getHours(),
                "m+": date.getMinutes(),
                "s+": date.getSeconds(),
                "q+": Math.floor((date.getMonth() + 3) / 3),
                "S": date.getMilliseconds()
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
        Common.formatDate = formatDate;
        function stringTob2Vec2(points) {
            let polyVertices = [];
            let pointStrArr = points.split(",");
            if (pointStrArr.length % 2 !== 0) {
                return polyVertices;
            }
            for (let i = 0; i < pointStrArr.length; i += 2) {
                let vec = new box2d.b2Vec2();
                vec.x = parseFloat(pointStrArr[i]);
                vec.y = parseFloat(pointStrArr[i + 1]);
                polyVertices.push(vec);
            }
            return polyVertices;
        }
        Common.stringTob2Vec2 = stringTob2Vec2;
        function b2Vec2sToString(arr) {
            let str = "";
            let len = arr.length;
            for (let i = 0; i < len; i++) {
                let vec = arr[i];
                str += vec.x + "," + vec.y + ",";
            }
            Log.d(str);
            str = str.substring(0, str.length - 1);
            Log.d(str);
            return str;
        }
        Common.b2Vec2sToString = b2Vec2sToString;
        function pointChange(arr) {
            let result = [];
            let len = arr.length;
            for (let i = 0; i < len; i++) {
                let vec = arr[i];
                result.push(vec.x);
                result.push(vec.y);
            }
            Log.d(result);
            return result;
        }
        Common.pointChange = pointChange;
        function startWidth(str, reg) {
            if (!str)
                return false;
            if (!reg)
                return false;
            return str.indexOf(reg) == 0;
        }
        Common.startWidth = startWidth;
        function checkForUpdate() {
            if (typeof wx.getUpdateManager === 'function') {
                const updateManager = wx.getUpdateManager();
                updateManager.onCheckForUpdate(function (res) {
                    Log.d("版本更新信息：");
                    Log.d(res.hasUpdate);
                });
                updateManager.onUpdateReady(function () {
                });
            }
        }
        Common.checkForUpdate = checkForUpdate;
    })(Common || (Common = {}));
    function grayView(view) {
        var grayMat = [
            .3086, .6094, .082, 0, 0, .3086, .6094, .082, 0, 0, .3086, .6094, .082, 0, 0, 0, 0, 0, 1, 0
        ];
        var grayFilter = new Laya.ColorFilter(grayMat);
        view.filters = (view.filters ? (view.filters.push(grayFilter), view.filters) : [grayFilter]);
    }
    function sharkAni(caller, view, count, times, callBack) {
        var index = count ? count : 0;
        var r = index % 4 === 0 ? 15 : (index % 4 === 1 ? 0 : (index % 4 === 2 ? -15 : 0));
        Laya.Tween.to(view, {
            rotation: r
        }, 250, Laya.Ease.linearInOut, Laya.Handler.create(caller, function () {
            if (index <= (4 * (times ? times : 0))) {
                sharkAni(caller, view, index + 1, times, callBack);
            }
            else {
                if (callBack) {
                    callBack();
                }
            }
        }));
    }
    function showModal(data) {
        UiManager.getSelf().showModal(data);
    }

    class DynamicWidget extends ui.item.appViewUI {
        constructor() {
            super();
            this.index = -1;
            this.father = null;
            this.isAni = true;
            this.pageName = null;
            this.data = null;
            this.scaleValue = 1;
        }
        onDisable() {
            if (!this.destroyed) {
                Laya.Pool.recover("DynamicWidget", this);
            }
        }
        adapter(context, pageName, data, noAni) {
            this.father = context;
            this.father.removeChildren(0, context.numChildren);
            if (noAni) {
                this.isAni = false;
            }
            this.on(Laya.Event.CLICK, this, this.clickGoToApp);
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
        clickGoToApp(e) {
            e.stopPropagation();
            if (!this.data)
                return;
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
                        insertCount({ type: '点击悬浮按钮,跳转成功', mark: data.name + ',' + data.appid, page: thiz.pageName });
                        insertCount({ type: '跳转成功_' + data.name, mark: data.name + ',' + data.appid, page: thiz.pageName });
                        insertCount({ type: '跳转成功', mark: thiz.pageName, page: thiz.pageName });
                    },
                    fail: e => {
                    }
                });
            }
        }
        static getSelf(context, pageName, data, noAni) {
            let view = Laya.Pool.getItemByClass("DynamicWidget", DynamicWidget);
            view.adapter(context, pageName, data, noAni);
            return view;
        }
        setData(data) {
            this.data = data;
            this.appName.changeText(data.name);
            this.appIcon.skin = data.skin;
            var thiz = this;
            if (this.isAni) {
                thiz.scale(0, 0);
                Laya.Tween.to(thiz, { scaleX: this.scaleValue, scaleY: this.scaleValue }, 300, Laya.Ease.bounceOut, Laya.Handler.create(thiz, function () {
                    sharkAni(thiz, thiz);
                }), 100);
            }
        }
    }
    DynamicWidget.lastIndex = -1;

    class AppView extends ui.item.appViewUI {
        constructor(pageName, context, noAni) {
            super();
            this.index = -1;
            this.father = null;
            this.isAni = true;
            this.data = null;
            this.pageName = null;
            if (noAni) {
                this.isAni = false;
            }
            this.pageName = pageName;
            this.on(Laya.Event.CLICK, this, this.clickGoToApp);
            if (context) {
                this.father = context;
                let scale = Math.min(this.father.width / 250, this.father.height / 300);
                this.scale(scale, scale);
                this.father.addChild(this);
            }
        }
        clickGoToApp(e) {
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
                        insertCount({ type: '点击导量,跳转成功', mark: thiz.data.name + ',' + thiz.data.appid, page: thiz.pageName });
                        insertCount({ type: '跳转成功_' + thiz.data.name, mark: thiz.data.name + ',' + thiz.data.appid, page: thiz.pageName });
                        insertCount({ type: '跳转成功', mark: thiz.data.name + ',' + thiz.data.appid, page: thiz.pageName });
                    },
                    fail: e => {
                        insertCount({ type: '点击导量,跳转失败', mark: thiz.data.name + ',' + thiz.data.appid, page: thiz.pageName });
                        if (AppConfig.ifShowApps) ;
                    }
                });
            }
        }
        setData(data) {
            this.data = data;
            this.appName.changeText(data.name);
            this.appIcon.skin = data.skin;
        }
        autoChange() {
            Laya.timer.loop(AppConfig.dynamicChangeTime * 1000, this, this.shark);
        }
        shark() {
            let thiz = this;
            sharkAni(thiz, thiz);
        }
    }

    class AllAppView extends ui.widget.AllAppViewUI {
        constructor() {
            super();
            this.iconLayout.hScrollBarSkin = null;
            this.iconLayout.itemRender = AppView;
            this.iconLayout.renderHandler = new Laya.Handler(this, this.updateItem);
            this.iconLayout.array = [];
            this.iconLayout.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
        }
        static getSelf() {
            let self = Laya.Pool.getItemByClass("AllAppView", AllAppView);
            self.changeApps();
            return self;
        }
        updateItem(cell, index) {
            cell.setData(cell.dataSource);
        }
        mouseMove() {
            Log.d("用户手指划过");
            Laya.timer.clearAll(this);
        }
        changeApps() {
            this.iconLayout.scrollBar.value = 0;
            if (this.iconLayout.array == null || this.iconLayout.array.length == 0) {
                let arr = [].concat(Apps.icons);
                for (let i = 0; i < 50; i++) {
                    arr = arr.concat(Apps.icons);
                }
                this.iconLayout.array = arr;
            }
            Laya.timer.frameLoop(1, this, this.moveSelect);
        }
        moveSelect() {
            this.iconLayout.scrollBar.value += 1;
        }
        onEnable() {
            this.changeApps();
        }
        onDisable() {
            Laya.timer.clearAll(this);
            if (!this.destroyed) {
                Laya.Pool.recover("AllAppView", this);
            }
        }
    }

    class LevelData {
    }
    function getGradeName(grade) {
        return grade + ' 级';
    }

    const ERRSOUND = 'sound/bow.mp3';
    function playSound(soundUrl) {
        if (AppConfig.isMute)
            return;
        Laya.SoundManager.playSound(soundUrl);
    }

    class GamePage extends ui.page.GamePageUI {
        constructor() {
            super(...arguments);
            this.level = 0;
        }
        showTip() {
        }
        static getSelf() {
            if (!GamePage.self) {
                GamePage.self = new GamePage();
            }
            return GamePage.self;
        }
        initLevel(level) {
            this.level = level;
        }
    }
    GamePage.self = null;

    const STATE_NORMAL = 1;
    const STATE_SELECTED = 2;
    const STATE_LOCKED = 3;
    class LevelDetailItem extends ui.item.LevelDetailItemUI {
        constructor() {
            super();
            this.levelIndex = 1;
            this.grade = 1;
            this.index = 0;
            this.father = null;
            this.state = STATE_NORMAL;
            this.on(Laya.Event.CLICK, this, this.click);
            this.line.graphics.drawLine(0, 0, this.line.width, 0, "#fff", this.line.height);
        }
        click(e) {
            e.stopPropagation();
            Log.d("点击了 grade:" + this.grade);
            Log.d("点击了 index:" + this.index);
            Log.d("点击了 题目index ：" + this.levelIndex);
            insertCount({ userId: AppConfig.userId, type: '等级详情列表 点击', mark: '点击item：' + this.levelIndex, page: AppConfig.PAGENAME.LEVELDETAILPAGE });
            if (!AppConfig.DEBUG && (this.state == STATE_LOCKED)) {
                playSound(ERRSOUND);
                UiManager.getSelf().showToast('需完成' + (this.index - 1) + "关");
            }
            else {
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
        init(grade, index, state) {
            this.itemBg.filters = null;
            this.grade = grade;
            this.index = index;
            this.state = state;
            this.itemText.text = index + "";
            this.levelIndex = (grade - 1) * AppConfig.GRADE_COUNT + index;
            let star = 3;
            this.textUnLock.visible = false;
            switch (state) {
                case STATE_NORMAL:
                    {
                        this.lockImg.visible = false;
                        let cache = wx.getStorageSync(AppConfig.LEVEL_ + this.levelIndex);
                        if (cache && cache.star) {
                            star = cache.star;
                        }
                    }
                    break;
                case STATE_SELECTED:
                    {
                        this.lockImg.visible = false;
                        this.textUnLock.visible = true;
                        star = 0;
                    }
                    break;
                case STATE_LOCKED:
                    {
                        grayView(this.itemBg);
                        this.lockImg.visible = true;
                    }
                    break;
            }
        }
    }

    class LevelDetailPage extends ui.page.LevelDetailPageUI {
        constructor() {
            super();
            this.grade = 1;
            this.hasPassLevel = 0;
            this.totalLevel = AppConfig.GRADE_COUNT;
            this.itemMarginX = 100;
            this.itemMarginY = 50;
            this.height = AppConfig.screenH;
            this.topLayout.y = AppConfig.topFixOffset;
            this.contentLayout.y = this.topLayout.y + this.topLayout.height;
            this.topBg.y = -this.topLayout.y;
            this.topBg.height = this.topLayout.height + this.topLayout.y;
            this.btnHome.on(Laya.Event.CLICK, this, this.backClick);
            this.bannerLayout.y = this.contentLayout.y + this.contentLayout.height;
        }
        onEnable() {
            Log.d("LevelDetailPage   onEnable");
        }
        onDisable() {
            Log.d("LevelDetailPage onDisable");
        }
        backClick(e) {
            e.stopPropagation();
            UiManager.getSelf().gotoPage(LevelPage.getSelf());
            LevelPage.getSelf().init(AppConfig.maxLevel, AppConfig.userData.level);
        }
        static getSelf() {
            if (LevelDetailPage.self == null) {
                LevelDetailPage.self = new LevelDetailPage();
            }
            return LevelDetailPage.self;
        }
        init(grade, userLevel) {
            this.levelLabel.text = getGradeName(grade);
            this.grade = grade;
            this.itemPanel.removeChildren(0, this.itemPanel.numChildren);
            if (grade == AppConfig.totalGrade) {
                this.totalLevel = AppConfig.maxLevel - (grade - 1) * AppConfig.GRADE_COUNT;
            }
            else {
                this.totalLevel = AppConfig.GRADE_COUNT;
            }
            let userGrade = Math.ceil((userLevel % AppConfig.GRADE_COUNT == 0 ? (userLevel + 1) : userLevel) / AppConfig.GRADE_COUNT);
            this.hasPassLevel = this.grade < userGrade ? AppConfig.GRADE_COUNT : userLevel % AppConfig.GRADE_COUNT;
            this.passLabel.text = this.hasPassLevel + " / " + this.totalLevel;
            for (var i = 0; i < this.totalLevel; i++) {
                var tmpItem = Laya.Pool.getItemByClass("LevelDetailItem", LevelDetailItem);
                var x = i % AppConfig.BonusCount;
                var y = Math.floor(i / AppConfig.BonusCount);
                tmpItem.pos(x * (tmpItem.width + this.itemMarginX), y * (tmpItem.height + this.itemMarginY));
                if (y == 2) {
                    tmpItem.x = 200;
                }
                if (i > this.hasPassLevel) {
                    tmpItem.init(this.grade, i + 1, STATE_LOCKED);
                }
                else if (i === this.hasPassLevel) {
                    tmpItem.init(this.grade, i + 1, STATE_SELECTED);
                }
                else {
                    tmpItem.init(this.grade, i + 1, STATE_NORMAL);
                }
                this.itemPanel.addChild(tmpItem);
            }
        }
    }
    LevelDetailPage.self = null;

    class LevelItem extends ui.item.LevelItemUI {
        constructor() {
            super();
            this.levelArr = null;
            this.data = null;
            this.onClick = function (e) {
                e.stopPropagation();
                insertCount({ userId: AppConfig.userId, type: '等级列表 点击', mark: '点击等级：' + this.data.grade, page: AppConfig.PAGENAME.LEVELPAGE });
                if (!AppConfig.DEBUG && !this.data.isUnLock) {
                    playSound(ERRSOUND);
                    UiManager.getSelf().showToast('需完成' + (this.data.grade - 1) + "级");
                }
                else {
                    UiManager.getSelf().gotoPage(LevelDetailPage.getSelf());
                    LevelDetailPage.getSelf().init(this.data.grade, AppConfig.userData.level);
                }
            };
            this.levelItemBg.on(Laya.Event.CLICK, this, this.onClick);
        }
        setData(data) {
            this.data = data;
            this.levelText.text = getGradeName(data.grade);
            this.indexText.text = data.level + ' / ' + data.totalLevel;
            this.levelItemBg.filters = null;
            this.levelItemBg.destroyChildren();
            if (data.isUnLock) {
                this.setUnLock(data);
            }
            else {
                this.setLock();
            }
        }
        setUnLock(data) {
            this.indexText.text = data.level + " / " + data.totalLevel;
        }
        setLock() {
            this.indexText.text = "";
            this.levelText.text = "";
            grayView(this.levelItemBg);
            let lock = new Laya.Image();
            lock.skin = "comp/stage_lock.png";
            lock.size(50, 50);
            lock.anchorX = 0.5;
            lock.anchorY = 0.5;
            lock.pos(this.levelItemBg.width / 2, this.levelItemBg.height / 2);
            this.levelItemBg.addChild(lock);
        }
    }

    class LevelPage extends ui.page.LevelPageUI {
        constructor() {
            super();
            this.levelArr = [];
            this.height = AppConfig.screenH;
            this.topLayout.y = AppConfig.topFixOffset;
            this.contentLayout.y = this.topLayout.y + this.topLayout.height;
            this.contentLayout.height = this.height - this.contentLayout.y;
            this.topBg.y = -this.topLayout.y;
            this.topBg.height = this.topLayout.height + this.topLayout.y;
            this.btnHome.on(Laya.Event.CLICK, this, this.backClick);
            this.dataList.height = this.contentLayout.height - this.dataList.y - 400;
            this.dataList.vScrollBarSkin = "";
            this.dataList.itemRender = LevelItem;
            this.dataList.renderHandler = new Laya.Handler(this, this.updateItem);
            this.dataList.array = this.levelArr;
        }
        backClick(e) {
            e.stopPropagation();
            UiManager.getSelf().goHome();
        }
        onEnable() {
            Log.d("BasePage   onEnable");
        }
        onDisable() {
            Log.d("BasePage onDisable");
        }
        static getSelf() {
            if (LevelPage.self == null) {
                LevelPage.self = new LevelPage();
            }
            return LevelPage.self;
        }
        init(maxLevel, userLevel) {
            this.levelArr.splice(0, this.levelArr.length);
            let userGrade = Math.ceil((userLevel % AppConfig.GRADE_COUNT == 0 ? (userLevel + 1) : userLevel) / AppConfig.GRADE_COUNT);
            var lastGrade = 1;
            for (var i = 1; i <= AppConfig.totalGrade; i++) {
                var gradeKey = AppConfig.gradePre + i;
                var data = new LevelData();
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
                    data.totalLevel = maxLevel - (i - 1) * AppConfig.GRADE_COUNT;
                }
                if (!AppConfig.DEBUG && i >= lastGrade + 5) {
                    break;
                }
            }
            this.dataList.array = this.levelArr;
        }
        updateItem(cell, index) {
            cell.setData(cell.dataSource, index + 1);
        }
    }
    LevelPage.self = null;

    class HomePage extends ui.page.HomePageUI {
        constructor() {
            super();
            this.height = AppConfig.screenH;
            this.contentLayout.height = this.height;
            this.btnStart.on(Laya.Event.CLICK, this, this.startGame);
            this.btnLevel.on(Laya.Event.CLICK, this, this.clickLevel);
            this.btnShare.on(Laya.Event.CLICK, this, this.clickShare);
        }
        clickShare(e) {
            e.stopPropagation();
            var query = 'uid=' + AppConfig.userId + '&token=' + (new Date().getTime()) + '&state=' + ShareType.HOME;
            shareToFriend(null, query);
        }
        clickLevel(e) {
            e.stopPropagation();
            UiManager.getSelf().gotoPage(LevelPage.getSelf());
            LevelPage.getSelf().init(AppConfig.maxLevel, AppConfig.userData.level);
        }
        startGame(e) {
            e.stopPropagation();
            if (AppConfig.userData.level >= AppConfig.maxLevel) {
                insertCount({ userId: AppConfig.userId, type: '通关', page: AppConfig.PAGENAME.HOMEPAGE });
                UiManager.getSelf().gotoPage(LevelPage.getSelf());
                LevelPage.getSelf().init(AppConfig.maxLevel, AppConfig.userData.level);
            }
            else {
                UiManager.getSelf().gotoPage(GamePage.getSelf());
                GamePage.getSelf().initLevel(AppConfig.userData.level + 1);
            }
        }
        onEnable() {
            Log.d("Home   onEnable");
            this.setApps();
            this.setDynamicApps();
            Laya.timer.loop(AppConfig.dynamicChangeTime * 1000, this, this.setDynamicApps);
        }
        onDisable() {
            Log.d("Home onDisable");
            Laya.timer.clear(this, this.setApps);
            Laya.timer.clear(this, this.setDynamicApps);
        }
        setApps() {
            if (!AppConfig.ifShowApps) {
                return;
            }
            this.allAppLayout.removeChildren(0, this.allAppLayout.numChildren);
            this.allAppLayout.addChild(AllAppView.getSelf());
        }
        static getSelf() {
            if (HomePage.self == null) {
                HomePage.self = new HomePage();
            }
            return HomePage.self;
        }
        setDynamicApps() {
            if (!AppConfig.ifShowApps)
                return;
            let num = this.dynamicLayout.numChildren;
            let datas = Apps.getIcons(num);
            if (!datas || datas.length == 0)
                return;
            for (let i = 0; i < datas.length; i++) {
                let view = this.dynamicLayout.getChildAt(i);
                DynamicWidget.getSelf(view, AppConfig.PAGENAME.HOMEPAGE, datas[i]);
            }
        }
    }
    HomePage.self = null;

    const SETTING = 'Setting';
    function getVersionSettings() {
        Log.d('Version:' + AppConfig.VERSION);
        let db = wx.cloud.database();
        if (!db)
            return;
        db.collection(SETTING).where({
            version: AppConfig.VERSION
        }).get().then(res => {
            Log.d("获取设置数据：");
            let data = res.data[0];
            Log.d(data);
            if (data) {
                let settings = data.settings;
                Log.d(settings);
                if (settings) {
                    if (settings.gameShowAppRate != void 0) {
                        AppConfig.gameShowAppRate = settings.gameShowAppRate;
                    }
                    if (settings.icons != void 0) {
                        Apps.icons = settings.icons;
                    }
                    if (settings.video != void 0) {
                        AppConfig.video = settings.video;
                    }
                    if (settings.levelMin != void 0) {
                        AppConfig.levelMin = settings.levelMin;
                    }
                    if (settings.ifShowBonus != void 0) {
                        AppConfig.ifShowBonus = settings.ifShowBonus;
                    }
                    if (settings.isCheckIp != void 0) {
                        AppConfig.isCheckIp = settings.isCheckIp;
                    }
                    if (settings.ifAldShare != void 0) {
                        AppConfig.ifAldShare = settings.ifAldShare;
                    }
                    if (settings.ifShowApps != void 0) {
                        AppConfig.ifShowApps = settings.ifShowApps;
                    }
                    if (settings.ifVideoErrShare != void 0) {
                        AppConfig.ifVideoErrShare = settings.ifVideoErrShare;
                    }
                    if (settings.insterCound != void 0) {
                        AppConfig.insterCound = settings.insterCound;
                    }
                    if (AppConfig.ifShowApps) {
                        HomePage.getSelf().setApps();
                    }
                }
            }
            realCheckIp();
        }).catch(err => {
            Log.d("查询出错，也要检测IP");
            realCheckIp();
        });
    }
    function realCheckIp() {
        if (AppConfig.ifShowBonus && AppConfig.isCheckIp) {
            Log.d("checkIP=========");
            checkIP(data => {
                Log.d(data);
                if (data) {
                    let obj = JSON.parse(data);
                    AppConfig.ifShowBonus = AppConfig.ifShowBonus && ((!obj.data.cityLimit) || (!obj.data.hourLimit));
                }
            });
        }
    }
    function checkIP(callBack) {
        var xhr = new Laya.HttpRequest();
        xhr.http.timeout = 10000;
        xhr.once(Laya.Event.COMPLETE, this, function (data) {
            callBack(data);
        });
        xhr.once(Laya.Event.ERROR, this, err => {
            callBack(null);
        });
        xhr.send(AppConfig.CHECKURL, "", "get", "text");
    }

    class PageRoot extends ui.page.RootPageUI {
        constructor(width, height) {
            super();
            this.lastPage = null;
            this.needAdaptation = false;
            this.GuideFixOffset = 0;
            Log.d("RootPage  constructor   ");
            this.width = width;
            this.height = height;
            this.bgLayout.height = this.height + 20;
            this.drawBg();
            this.pageLayout.width = this.width;
            this.pageLayout.height = this.height;
            if (AppConfig.isWX && AppConfig.systemInfo) {
                let model = AppConfig.systemInfo.model;
                for (var i = wx.getMenuButtonBoundingClientRect(), n = ["iPhone X", "华为P20", "华为麦芒7", "nubia Z18", "iPhone XR", "荣耀8X", "荣耀畅玩8C", "荣耀10", "荣耀Play", "荣耀9i", "vivo Y85", "vivo Y83", "vivo Y81s", "vivo X21", "vivo X23", "vivo X30", "vivo Z1", "vivo V9", "魅族X8", "一加6", "OPPO A3", "OPPO A7x", "OPPO R15", "OPPO R17", "小米红米6 Pro", "OnePlus A6010", "oneplus A6010", "坚果R1", "小米 Redmi Note 7", "小米 Redmi 7", "小米 PLAY ", "小米8", "小米8 SE", "小米9", "小米9 SE", "小米红米6 Pro", "vivo U1", "vivo Z3", "vivo Z3i", "vivo Z1", "vivo Z1青春版", "vivo X23幻彩版 ", "vivo Y81s", "vivo Y83", "vivo Y85", "vivo Y93", "vivo Y97", "vivo X21", "vivo X21s", "vivo X30", "vivo V9", "vivo iQOO", "华为nova 3", "华为nova 3i", "华为 nova 4e", "华为 畅享 MAX", "华为畅享9 Plus", "华为P30 Pro", "华为P20", "华为麦芒7", "华为Mate 20", "华为Mate 20 Pro", "荣耀10", "荣耀10青春版", "荣耀8X", "荣耀8X Max", "荣耀畅玩8C", "荣耀Play", "荣耀9i", "荣耀20i", "OPPO A3", "OPPO A5", "OPPO A7", "OPPO A7x全网通", "OPPO A7n", "OPPO R15", "OPPO R17", "OPPO R17 Pro", "OPPO K1", "联想 Z5S", "联想Z6 Pro", "三星Galaxy A8s", "三星Galaxy A90", "朵唯 D1", "海信 小海豚3", "海信 金刚4Pro", "中兴 ZTE V1000", "中兴AXON 10 Pro", "中兴Blade V10", "摩托罗拉 g7 plus", "诺基亚X6 2018", "诺基亚X7 2018", "小辣椒 红辣椒8X", "一加6", "一加6T", "魅族X8", "iPhone XR"], s = 0; s < n.length; s++) {
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
        drawBg() {
            let size = 64;
            let xCount = Math.ceil(this.bgLayout.width / size);
            let yCount = Math.ceil(this.bgLayout.height / size);
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
        static getSelf(width, height) {
            if (PageRoot.self == null) {
                PageRoot.self = new PageRoot(width, height);
            }
            return PageRoot.self;
        }
        getPageHeight() {
            return 0;
        }
        getTopOffset() {
            let topOffset = this.height - this.getPageHeight();
            Log.d("getTopOffset  =========" + topOffset);
            return topOffset;
        }
        addPage(page, noAni) {
            page.alpha = 0;
            if (this.numChildren > 0) {
                this.lastPage = this.pageLayout.getChildAt(this.pageLayout.numChildren - 1);
            }
            this.pageLayout.addChild(page);
            var duration = noAni ? 0 : AppConfig.PAGE_CHANGE_DURATION;
            Laya.Tween.to(page, { alpha: 1 }, duration, Laya.Ease.linearNone);
        }
        gotoPage(page, noAni) {
            page.alpha = 0;
            this.pageLayout.addChild(page);
            var duration = noAni ? 0 : AppConfig.PAGE_CHANGE_DURATION;
            if (this.pageLayout.numChildren > 1) {
                this.pageLayout.mouseEnabled = false;
                this.lastPage = this.pageLayout.getChildAt(this.pageLayout.numChildren - 2);
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
                    thiz.pageLayout.mouseEnabled = true;
                }));
            }
            else {
                Laya.Tween.to(page, { alpha: 1 }, duration, Laya.Ease.linearNone);
            }
        }
        closePage(page, noAni) {
            var duration = noAni ? 0 : AppConfig.PAGE_CHANGE_DURATION;
            if (page) {
                this.gotoPage(page, noAni);
            }
            else {
                if (this.lastPage) {
                    this.gotoPage(this.lastPage, noAni);
                }
                else {
                    this.goHome();
                }
            }
        }
        setPowerNum(num) {
        }
        goHome() {
            this.clearPage();
            this.addPage(HomePage.getSelf());
        }
        clearPage() {
            this.pageLayout.removeChildren(0, this.pageLayout.numChildren);
        }
    }

    class ProgressView extends ui.widget.ProgressViewUI {
        constructor() {
            super();
            this.maxValue = 100;
            this.minValue = 0;
            this.progress = 0;
        }
        getProgress() {
            return this.progress;
        }
        setProgress(progress, max, min) {
            if (!isNaN(min)) {
                this.minValue = min;
            }
            if (!isNaN(max)) {
                this.maxValue = max;
            }
            this.progress = progress;
            var per = this.progress / (this.maxValue - this.minValue) * this.progressBar.width;
            var moveX = -this.progressBar.width / 2 + per;
            this.progressMask.x = moveX;
        }
    }

    class LoadPage extends ui.page.LoadPageUI {
        constructor() {
            super();
            this.progressBar = null;
            this.subpackage = [
                'res', 'comp', 'level', 'sound'
            ];
            this.stateFlag = [];
            this.subLen = 0;
            this.loadIndex = 0;
            this.min = 0;
            this.max = 100;
            this.progress = 0;
            this.callBack = null;
            this.totalProgress = [0, 0, 0];
            this.progressBar = new ProgressView();
            this.progressBarLayout.addChild(this.progressBar);
            this.subLen = this.subpackage.length;
        }
        setCallBack(callBack) {
            this.callBack = callBack;
        }
        static getSelf(callBack) {
            if (LoadPage.self == null) {
                LoadPage.self = new LoadPage();
            }
            if (callBack) {
                LoadPage.self.setCallBack(callBack);
                LoadPage.self.loadRes(callBack);
            }
            return LoadPage.self;
        }
        loadRes(callBack) {
            this.callBack = callBack;
            this.setProgress(0);
            let thiz = this;
            thiz.loadIndex = 0;
            let isSuccess = true;
            if (!AppConfig.isWX || this.subLen == 0) {
                thiz.onCompelete(isSuccess);
                return;
            }
            for (let i = 0; i < this.subLen; i++) {
                if (thiz.stateFlag[i]) {
                    thiz.loadIndex++;
                    if (thiz.loadIndex == thiz.subLen) {
                        thiz.onCompelete(isSuccess);
                    }
                    continue;
                }
                let loadTask = wx.loadSubpackage({
                    name: this.subpackage[i],
                    success: (res) => {
                        Log.d(res);
                        thiz.stateFlag[i] = true;
                    },
                    fail: (res) => {
                        isSuccess = false;
                        thiz.stateFlag[i] = false;
                    },
                    complete() {
                        thiz.loadIndex++;
                        if (thiz.loadIndex == thiz.subLen) {
                            thiz.onCompelete(isSuccess);
                        }
                    }
                });
                loadTask.onProgressUpdate(res => {
                    Log.d('下载进度  i=>' + i, res.progress);
                    Log.d('已经下载的数据长度', res.totalBytesWritten);
                    Log.d('预期需要下载的数据总长度', res.totalBytesExpectedToWrite);
                    thiz.totalProgress[i] = res.totalBytesWritten / res.totalBytesExpectedToWrite * 100;
                    let per = (thiz.totalProgress[0] + thiz.totalProgress[1] + thiz.totalProgress[2]) / 300;
                    thiz.setProgress(per * 100);
                });
            }
        }
        setProgress(progress, min, max) {
            if (!isNaN(min)) {
                this.min = min;
            }
            if (!isNaN(max)) {
                this.max = max;
            }
            this.progress = progress;
            this.progressBar.setProgress(this.progress);
            this.loadText.text = '正在玩命加载...' + Math.round(progress) + '%';
        }
        onCompelete(flag) {
            if (this.callBack) {
                this.callBack(flag);
            }
        }
        onDisable() {
            Log.d("移出舞台");
            LoadPage.self = null;
            this.destroy();
        }
    }
    LoadPage.self = null;

    class Main {
        constructor() {
            Main.app = this;
            Config.isAntialias = true;
            box2d.DEBUG = AppConfig.DEBUG;
            Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.Physics.enable();
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (AppConfig.isWX) {
                wx.cloud.init({
                    env: AppConfig.APP_ID
                });
                this.login();
                AppConfig.userId = AppConfig.userData.userId;
                AppConfig.systemInfo = wx.getSystemInfoSync();
                Log.d("手机信息：");
                Log.d(AppConfig.systemInfo);
                AppConfig.scaleX = AppConfig.systemInfo.windowWidth / GameConfig.width;
                Log.d(AppConfig.scaleX);
                AppConfig.screenH = AppConfig.systemInfo.screenHeight / AppConfig.scaleX;
                getVersionSettings();
                this.initWx();
            }
            Log.d(AppConfig.screenH);
            if (AppConfig.screenH >= 2300) {
                AppConfig.IPHONEX_BOTTOM = AppConfig.IPHONEX_BOTTOM * AppConfig.scaleX;
            }
            else {
                AppConfig.IPHONEX_BOTTOM = 0;
            }
            Log.d("距离底部高度：" + AppConfig.IPHONEX_BOTTOM);
            this.onBgImageLoaded();
        }
        login() {
            AppConfig.userChannel = wx.getStorageSync(AppConfig.USERCHANNEL);
            if (!AppConfig.userChannel || AppConfig.userChannel == '') {
                var data = wx.getLaunchOptionsSync();
                if (data.query && data.query.channel) {
                    AppConfig.userChannel = data.query.channel;
                    wx.setStorage({
                        key: AppConfig.USERCHANNEL,
                        data: AppConfig.userChannel
                    });
                }
            }
            if (AppConfig.userData.userId != null && AppConfig.userData.userId.length > 5) {
                return;
            }
            AppConfig.userData.userId = wx.getStorageSync(AppConfig.OPENID);
            if (AppConfig.userData.userId != null && AppConfig.userData.userId.length > 5) {
                return;
            }
            wx.cloud.callFunction({
                name: 'login',
            }).then(res => {
                var openId = res.result.openid;
                if (openId) {
                    AppConfig.userData.userId = openId;
                    insertCount({ userId: AppConfig.userData.userId, type: '登录成功', });
                    wx.setStorage({ key: AppConfig.OPENID, data: openId });
                    wx.setStorage({ key: AppConfig.USERDATA, data: AppConfig.userData });
                }
                Log.d('云函数  登录  ：' + openId);
            }).catch(err => {
                insertCount({ userId: AppConfig.userData.userId, type: '登录失败', });
                Log.d('登录失败：' + err);
            });
        }
        onBgImageLoaded() {
            Main.pageRoot = new PageRoot(AppConfig.screenW, AppConfig.screenH);
            Log.d('screenH:' + AppConfig.screenH);
            Laya.stage.addChild(Main.pageRoot);
            UiManager.getSelf().setRootPage(Main.pageRoot);
            UiManager.getSelf().addPage(LoadPage.getSelf());
            LoadPage.getSelf().loadRes(this.onSubpackageLoaded);
        }
        onSubpackageLoaded(flag) {
            Log.d('分包加载完成::::' + flag);
            let thiz = Main.app;
            if (flag) {
                Laya.loader.load("level/tip.json", Laya.Handler.create(thiz, function (res) {
                    Log.d(res);
                    if (res && res.length > 0) {
                        AppConfig.levelCutSteps = res;
                        AppConfig.maxLevel = AppConfig.levelCutSteps.length;
                        AppConfig.totalGrade = Math.ceil(AppConfig.maxLevel / AppConfig.GRADE_COUNT);
                    }
                }), null, Laya.Loader.JSON);
                let resPath = "res/atlas/comp.atlas";
                Laya.loader.load([resPath], Laya.Handler.create(thiz, thiz.onAssetsLoaded), null, Laya.Loader.ATLAS);
            }
            else {
                UiManager.getSelf().showModal({
                    content: "资源加载失败，是否重试？",
                    showCancel: true,
                    confirmText: "重载",
                    success: res => {
                        if (res.confirm) {
                            LoadPage.getSelf().loadRes(thiz.onSubpackageLoaded);
                        }
                    }
                });
            }
        }
        onAssetsLoaded() {
            Log.d('资源加载完成::::');
            LoadPage.getSelf().destroy();
            Main.pageRoot.topLayout.visible = true;
            UiManager.getSelf().goHome();
        }
        initWx() {
            if (!AppConfig.isWX)
                return;
            AppConfig.isMute = wx.getStorageSync(AppConfig.ISMUTE);
            AppConfig.isMuteBgm = AppConfig.isMute;
            let cacheUserData = wx.getStorageSync(AppConfig.USERDATA);
            if (cacheUserData && cacheUserData.level) {
                AppConfig.userData.level = cacheUserData.level;
            }
            wx.showShareMenu({
                withShareTicket: true
            });
            if (AppConfig.ifAldShare) {
                wx.aldOnShareAppMessage(function () {
                    var tmp_query = '';
                    tmp_query = 'uid=' + AppConfig.userId + '&state=' + ShareType.MENU;
                    Log.d('右上角转发~~~');
                    Log.d('右上角转发~~~');
                    Log.d(tmp_query);
                    return {
                        query: tmp_query,
                        title: '据说只有1%的人能过关，是你吗？',
                        imageUrl: AppConfig.LOCAL_SHARE,
                    };
                });
            }
            else {
                wx.onShareAppMessage(function () {
                    var tmp_query = '';
                    tmp_query = 'uid=' + AppConfig.userId + '&state=' + ShareType.MENU;
                    Log.d('右上角转发~~~');
                    Log.d(tmp_query);
                    return {
                        query: tmp_query,
                        title: '据说只有1%的人能过关，是你吗？',
                        imageUrl: AppConfig.LOCAL_SHARE,
                    };
                });
            }
        }
        static getApp() {
            return Main.app;
        }
    }
    Main.app = null;
    Main.pageRoot = null;
    var app = new Main();

}());
