export module AppConfig {
    export const DEBUG = true;
    export const APPNAME = 'FrameWork';
    export const VERSION = '1.0.0';

    export const APP_ID = "happydog-ixt9x";
    export const APP_KEY = "";

    export var systemInfo: any = null;
    //原Main中的内容，防止循环引用
    export var scaleX: number = 1;
    export var userChannel: string = null;
    export var userId: string = null;
    export var userData = {
        userId: null,
        level: 0
    };

    /**
 * 云端数据库名称
 */
    export const SETTING = 'Setting';

    export var screenW = 1080;
    export var screenH = 1920;

    export var shareCancel: boolean = false;
    export var isShareBonus: boolean = false;
    export var isShareTip: boolean = false;
    export var isShareGroup: boolean = false;
    export var getShareTime: number = 0;
    export var topFixOffset: number = 0;


    export const BGCOLOR = '#fbfbeb';

    export const LINE_COLOR = "#323232";
    export const LINE_WIDTH = 5;

    export const TIPLINECOLOR = "#fff";

    export const WOODCOLOR = "#ffc855";

    export const WOODSTROKECOLOR = "#ab7551";

    export const SHARED_KEY = "shareKey";

    export var isWX = (typeof wx != 'undefined');
    //审核
    export const CHECKURL = "https://www.webuzz.com.cn/game/wx/ipSearch.do?name=" + (DEBUG ? "test" : APPNAME);

    /**提审日期 */
    export const examineTime = new Date('2019-05-25').getTime();

    export const PAGENAME = {
        NONE: "none",
        HOMEPAGE: "homePage",
        LEVELPAGE: "levelPage",
        LEVELDETAILPAGE: "levelDetailPage",
        GAMEPAGE: "gamePage",
        PASSPAGE: "passPage",
        RANKPAGE: "rankPage",
    }

    //已经分享成功过提示
    export const HAS_SHARE_TIP = 'hasShareTip';
    //已经分享成功过大礼包
    export const HAS_SHARE_BOUNS = 'hasShareBouns';

    //是否开启震动
    // export  var isNoVirbate = true;


    export const QUESTION_CLASS = "Question";

    /**用户进入的渠道 */
    export const USERCHANNEL = "userChannel";

    export const LEVEL_ = "level_";

    export const LOCAL_SHARE = "root/share.jpg";




    /**页面切换动画时间 */
    export const PAGE_CHANGE_DURATION = 500;

    /**是否震动 */
    export const ISVIBRATE = 'vibrate';
    export var isNoVirbate: boolean = false;
    /**是否静音 */
    export const ISMUTE = 'mute';
    export var isMute = false;
    /**背景是否静音 */
    export const ISMUTEBGM = 'muteBgm';
    export var isMuteBgm = false;


    export const QUESTION_KEY = "question_key";
    /**本地缓存 UserData */
    export const USERDATA = 'userData';
    //体力值，每天登录送5点，每过一关减少1点
    export const COIN = 'coin';
    //经验值，不会减少
    export const EXPERIENCE = 'experience';

    export const NICKNAME = 'nickName';
    export const AVATARURL = 'avatarul';
    export var shareCount = 0;
    export const SHARECOUNT = 'shareCount';
    export const SCORE = 'level';
    export const OPENVIDEOCOUNT = 'openVideoCount';
    /**打开视频次数 */
    export var openVideoCount = 0;
    export const FINISHVIDEOCOUNT = 'finishVideoCount';
    /**成功看完视频次数 */
    export var finishVideoCount = 0;
    export var canShowVideo: boolean = true;
    export var bannerError: boolean = false;

    export const USER = 'user';

    export const IFSHOWBONUS = 'ifShowBounus';
    export var openId: string = null;
    export const OPENID = 'openId';
    export const USERID = 'userId';
    export const SCORE_KEY = "maxLevel";

    /**同步时的setting */
    export const SETTING_VERSION_KEY = "settgin_version";

    /**分享过的群id */
    export const OPENGIDS = 'openGIds_';
    /**提示方式  */
    export const TIP_MODE = {
        SHARE: 'share',
        VEDIO: 'vedio'
    };

    /**是否是新用户 */
    export var ifNewuser = false;
    /**今日看完视频次数 */
    export const TODAYDATA = 'todayData';
    /*     //今天的数据
        export var todayData = {
            date: Common.formatDate(new Date, 'yyyy-MM-dd'),
            video: 0,
            ifGift: false,
            hasGivePower: false
        }; */

    export const SERVER = "https://www.webuzz.com.cn/";

    export const GAME_STATE = {
        NONE: -1,
        READY: 0,
        PLAYING: 1,
        GAMEOVER: 2
    };
    //游戏状态
    export var gameState = GAME_STATE.NONE;

    //说明文字颜色
    export const TEXTCOLOR = '#ececec';
    //按钮字体颜色
    export const BUTTONTEXTCOLOR = '#fdfdfd';
    //对话框标题颜色 
    export const TEXTTITLECOLOR = '#C4AD8E';
    //适配刘海屏
    export var iPhoneX = 20;
    /**每关50题 */
    export const GRADE_COUNT = 5;

    /**本地缓存每关玩过的题目数前缀 */
    export const gradePre = 'grade_';
    /**是否是老用户 */
    export const ISOLDUSER = "isOldUser";

    //云端控制 ================  test Git

    export var doubleGroupMsg = '短时间内，不能分享到相同的群哦！请分享到其他群吧！';
    export var tipShareMsg = '请分享到微信群，才能获得提示哦！';
    export var onShowTipShareMsg = '1.请去群里点击自己分享的链接，可获得提示！\n2.若尚未分享到群，请先分享到群！';
    export var onShowBounsShareMsg = '1.请去群里点击自己分享的链接，可获得奖励！\n2.若尚未分享到群，请先分享到群！';
    export var bounsShareMsg = '请分享到微信群，才能获得奖励哦！';

    export var bounsMsg = "获得一个您的专属礼包，拆开礼包将获得{bounsCoin}枚金币^_^";

    export var ifShowBonus: boolean = true;
    //视频出错是否拉起分享
    export var ifVideoErrShare: boolean = true;
    export var ifAldShare: boolean = true;
    export var ifShowApps: boolean = true;

    //题目数量
    export var maxLevel = 22;
    //总共等级数量
    export var totalGrade = Math.ceil(maxLevel / GRADE_COUNT);

    export var BonusCount = 2;
    //提示一次花费
    export var tipCost = 100;

    export var bounsCoin = 200;
    //在线收益：每秒1金币
    export var onLineCoinPer = 1;
    //在线收益最大值
    export var maxOnLineCoin = 60;

    export var isCheckIp: boolean = true;

    /**悬浮按钮切换时间 */
    export var dynamicChangeTime = 5;
    /**速度为0 */
    export var SPEED_ZERO = 0.5;
    /**碰撞检测距离 */
    export var CHECK_DS = 30;
    /**游戏开始3秒后才开始判断 */
    export var GAME_PLAY_TIME = 3;
    /**判断停止的距离 */
    export var STOP_DS = 0;
    //前十关不显示分享
    export var levelMin = 10;
    //1表示全视频，0表示全分享，其他看概率
    export var video = [1, 1, 1]
    /**
     * 总共关卡数
     */
    // export var totalLevel = 5;
    //IPHONE X底部修正
    export var IPHONEX_BOTTOM = 80;
    export var levelCutSteps = [];
    /**插屏广告====== */
    export var ifInsterAd: boolean = true;

    export var interstitialAd = ["adunit-5e8ac21ce575a15b"];
    /**banner广告====== */
    export var banners = ["adunit-0d7ba7206e1ded20"];
    /**video 广告 */
    export var videos = ["adunit-adf979bfe489286b"];
    /**插屏间隔 */
    export var insterCound = 1;

    export var next_button_scale_time = 200;
    export var next_button_delay = 100;
    export var next_button_move_time = 100;
    export var next_banner_delay = 500;

    export var weightArr = [];
    /**
     * 游戏页面显示导量概率
     */
    export var gameShowAppRate = 0.5;
}