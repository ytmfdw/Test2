import { AppConfig } from "../AppConfig";
import Log from "./Log";
import { insertCount } from "./Count";

export function shareToFriend(msg?: string, query?: string) {
    AppConfig.shareCancel = false;
    var state = getState(query);
    switch (state) {
        case ShareType.BONUS: {
            AppConfig.isShareBonus = true;
        } break;
        case ShareType.SHOWTIP: {
            AppConfig.isShareTip = true;
        } break;
        case ShareType.GROUP: {
            AppConfig.isShareGroup = true;
        } break;
    }
    var imgId = 'none';
    var link = 'imgId=';

    var shared = getShared(query);
    var imgPath = AppConfig.LOCAL_SHARE;
    var title = "这条狗要治，上天了都...";
    if (shared) {
        //兼容旧版本
        if (shared.imgs) {
            //新版本
            //1.产生一个随机数
            var rand = Math.random();
            // Log.d('生成随机数：' + rand);
            var data = null;
            var len = shared.imgs.length;
            for (var i = 0; i < len; i++) {
                var tmp = shared.imgs[i];
                if (rand >= tmp.min && rand < tmp.max) {
                    if (data && data.max < tmp.max) {
                        //有重叠
                        data = tmp;
                    } else {
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
        } else if (shared.sharedImg) {
            //旧版本
            imgPath = shared.sharedImg[0];
            title = shared.sharedTitle[0];
            link = 'imgId=' + imgId;
        }
    } else {
        link = '';
    }

    //节省带宽，使用本地
    if (!AppConfig.ifShowBonus) {
        imgPath = AppConfig.LOCAL_SHARE;
        title = "这条狗要治，上天了都...";
    }
    //如果是自定义消息，就显示自定义的
    if (msg) {
        title = msg;
    }

    var newQuery = query ? query : ('uid=' + AppConfig.userId + '&state=0');
    // newQuery = 'imgId=' + imgId + '&' + newQuery;
    newQuery = link + '&' + newQuery;
    AppConfig.getShareTime = new Date().getTime();
    if (AppConfig.ifAldShare) {
        wx.aldShareAppMessage({
            query: newQuery,
            imageUrl: imgPath,
            title: title,
            fail: () => {
                //取消了分享
                AppConfig.shareCancel = true;
            }
        });
    } else {
        wx.shareAppMessage({
            query: newQuery,
            imageUrl: imgPath,
            title: title,
            fail: () => {
                //取消了分享
                AppConfig.shareCancel = true;
            }
        });
    }
    //关闭shareTicket分享
    setTimeout(function () {
        Log.d('update updateShareMenu withShareTicket')
        wx.updateShareMenu({
            withShareTicket: false
        });
    }, 1500);
}


export function getState(query: string): number {
    if (query) {
        var result = /state=(\d+)/.exec(query);
        if (result && result.length > 1) {
            return parseInt(result[1]);
        }
    }
    return 0;
}

//根据query，得到对应内容
export function getShared(query) {
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

export function shareError(state: number, level, ifCancel?: boolean) {
    var query = 'uid=' + AppConfig.userId + '&token=' + new Date().getTime() + '&level=' + level + '&state=' + state;
    //打开shareTicket
    // var msg = ifCancel ? '分享失败，请分享到群！' : (state === ShareType.BONUS ? '请分享到微信群，领取10枚金币哦！' : (state === ShareType.SHOWTIP ? '必需分享到群才能获取提示！' : '请分享到群'));
    var msg = ifCancel ? '您刚刚取消了分享，请分享到群！' : '分享失败，请分享到不同的群!';
    /*     UiManager.getSelf().showModal({
            title: '提示',
            content: msg,
            cancelText: '我知道了',
            confirmText: '分享到群',
            showCancel: true,
            success: function (callBack) {
                wx.updateShareMenu({ withShareTicket: !0, complete: function () { shareToFriend(null, query) } });
            }
        }); */

    // Main.getApp().uiManager.showToast(msg);
}

/**分享到群成功回调 */
export function shareSuccess(state: number, level?: any) {
    insertCount({ userId: AppConfig.userId, type: state == ShareType.BONUS ? '分享链接点击成功 获得金币' : (state == ShareType.SHOWTIP ? '分享链接点击成功 获得提示' : '分享链接点击成功 拆开红包'), mark: 'userId:' + AppConfig.userId + '；level:' + (Main.getApp().uiManager.gamePage ? Main.getApp().uiManager.gamePage.level : -1) });
    // Log.d('shareSucess ===>state=' + state + ',level==>' + level);
    // var index = level ? (!isNaN(level) ? parseInt(level) : -1) : -1;
    // var lastPage = Main.getApp().uiManager.getLastPageName();
    // Log.d('shareSucess  ====>lastPage=' + lastPage + 'index=' + index);
    // if (state == ShareType.SHOWTIP && Main.getApp().uiManager.gamePage) {
        // Log.d('shareSucess  showTip ');
        // Log.d('shareSucess   Index.getApp().gamePage.level=> ' + Main.getApp().uiManager.gamePage.level);
        // if (Main.getApp().uiManager.gamePage && Main.getApp().uiManager.gamePage.level == index) {
        //     Main.getApp().uiManager.gamePage.showTip();
            /*    wx.aldStage.onRunning({
                   stageId: UiManager.getSelf().gamePage.levelData.level,
                   stageName: UiManager.getSelf().gamePage.levelData.level + ' 关',
                   userId:AppConfig.userId,
                   event: "tools",  //使用道具  关卡进行中，用户触发的操作    该字段必传
                   params: {
                       itemName: "分享提示",//使用道具名称 该字段必传
                       itemCount: 100,   //使用道具数量  可选
                       desc: "分享成功获取提示" //使用道具描述
                   }
               }); */
        // }

    // } else if (state == ShareType.BONUS) {
        //获取10枚金币
        // Main.getApp().uiManager.showLoading({
        //     title: '正在领取',
        // });

        // let coinNum = bounsCoin;
        // UiManager.getSelf().showToast('成功领取' + coinNum + '枚金币！');
        // UiManager.getSelf().hideLoading();
        // GamePage.getSelf(Index.getApp()).setCoin(Index.getApp().userData.coin);
    // }
}



export const ShareType = {
    HOME: 1,//首页分享
    PASS: 6,//通关分享好友
    GROUP: 4,//群排行榜
    BONUS: 5,//大礼包
    SHOWTIP: 10,//分享到群看提示
    MENU: 9//右上角转发
};