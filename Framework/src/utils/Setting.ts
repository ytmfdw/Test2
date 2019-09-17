import Log from "./Log";
import { AppConfig } from "../AppConfig";
import { Apps } from "./OtherApps";
import HomePage from "../page/HomePage";

/**
 * 云端数据库名称
 */
const SETTING = 'Setting';
const DB_VERSION = 'version';

/**
 * 获取云端设置
 */
export function getVersionSettings() {
    //获取settings
    Log.d('Version:' + AppConfig.VERSION);
    let db = wx.cloud.database();
    if (!db) return;
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

export function realCheckIp() {
    if (AppConfig.ifShowBonus && AppConfig.isCheckIp) {
        Log.d("checkIP=========");
        //审核
        checkIP(data => {
            Log.d(data);
            if (data) {
                let obj = JSON.parse(data);
                //审核地区
                AppConfig.ifShowBonus = AppConfig.ifShowBonus && ((!obj.data.cityLimit) || (!obj.data.hourLimit));
            }
        });
    }
}

export function checkIP(callBack: Function) {
    var xhr: Laya.HttpRequest = new Laya.HttpRequest();
    xhr.http.timeout = 10000;//设置超时时间；
    xhr.once(Laya.Event.COMPLETE, this, function (data) {
        callBack(data);
    });
    xhr.once(Laya.Event.ERROR, this, err => {
        callBack(null);
    });
    xhr.send(AppConfig.CHECKURL, "", "get", "text");
}