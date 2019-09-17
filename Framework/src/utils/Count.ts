import Log from "./Log";
import { AppConfig } from "../AppConfig";

export function insertCount(data) {
    Log.d(data);
    //添加统计
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
        } else if (typeof data.mark == 'string') {
            data.mark = data.mark.replace(/\./g, "_");
            data.mark = data.mark.replace(/\:/g, "：");
            data.mark = data.mark.replace(/&/g, ",");
            data.mark = data.mark.replace(/\s+/g, "");
        } else {
            data.mark = String(data.mark);
        }
    } else {
        data.mark = '';
    }
    /*    var params = "?gameType=2&userId=" + data.userId + "&type=" + data.type + "&mark=" + 'v=' + VERSION + ',' + data.mark;
        if (typeof wx !== 'undefined') {
            Log.d('add count: wx request: params:' + params);
            wx.request({
                url: BASE_ADDCOUNT + params, //仅为示例，并非真实的接口地址
                header: {
                    //设置参数内容类型为json
                    'content-type': 'application/json'
                },
            });
        }*/

    var params = { version: AppConfig.VERSION.replace(/\./g, '-'), userId: AppConfig.userId, mark: data.mark, channel: AppConfig.userChannel, page: data.page };
    Log.d(data.mark);
    Log.d(params);
    wx.aldSendEvent(data.type, params);
}