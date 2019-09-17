import Log from "./Log";
import { AppConfig } from "../AppConfig";
import UiManager from "../UiManager";

export module Common {
    /**
* 日期格式化函数
* 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
* 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
* 
* yyyy-MM-dd hh:mm:ss.S  ==> 2006-07-02 08:09:04.423
* yyyy-M-d h:m:s.S       ==> 2006-7-2 8:9:4.18
* 
* @param date 要格式化的日期
* @param fmt  格式字符串
*/
    export function formatDate(date: Date, fmt: string) {
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    /**将  x1,y1,x2,y2...这样的字符串转换成[b2Vec2,b2Vec2...]
     * 
     * @param points 
     */
    export function stringTob2Vec2(points: string): Array<box2d.b2Vec2> {
        let polyVertices: Array<box2d.b2Vec2> = [];
        let pointStrArr = points.split(",");
        if (pointStrArr.length % 2 !== 0) {
            //点的个数不对
            return polyVertices;
        }
        for (let i = 0; i < pointStrArr.length; i += 2) {
            let vec: box2d.b2Vec2 = new box2d.b2Vec2();
            vec.x = parseFloat(pointStrArr[i]);
            vec.y = parseFloat(pointStrArr[i + 1]);
            polyVertices.push(vec);
        }
        return polyVertices;
    }

    /**
     * 将一系列点，转换成字符串，x1,y1,x2,y2...
     */
    export function b2Vec2sToString(arr: Array<box2d.b2Vec2>): string {
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
    /**
     * 将一系列点，转换成数字数组 [x1,y1,x2,y2,x3,y3...]
     */
    export function pointChange(arr: Array<any>): Array<number> {
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


    /**
     * 判断字符串是否以  reg 开头
     * 不能传入空，否则返回false
     * @param str 
     * @param reg 
     */
    export function startWidth(str: string, reg: string): boolean {
        if (!str) return false;
        if (!reg) return false;
        return str.indexOf(reg) == 0;
    }

    /**
      * 检查版本更新
      */
    export function checkForUpdate(): void {
        if (typeof wx.getUpdateManager === 'function') {
            const updateManager = wx.getUpdateManager();

            updateManager.onCheckForUpdate(function (res) {
                // 请求完新版本信息的回调
                Log.d("版本更新信息：");
                Log.d(res.hasUpdate);
            });

            updateManager.onUpdateReady(function () {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                showModal({
                    title: '更新提示',
                    content: '新版本已经准备好，重启应用以使用',
                    cancelText: "知道了",
                    showCancel: true,
                    confirmText: "重启",
                    success: function () {
                        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                        updateManager.applyUpdate();
                    }
                })
            });
        }
    }
}


/**
 * 灰化控件
 * @param view 
 */
export function grayView(view: Laya.Sprite): void {
    var grayMat: Array<number> =
        [
            .3086, .6094, .082, 0, 0, .3086, .6094, .082, 0, 0, .3086, .6094, .082, 0, 0, 0, 0, 0, 1, 0
        ];
    //创建一个颜色滤镜对象,红色
    var grayFilter: Laya.ColorFilter = new Laya.ColorFilter(grayMat);
    view.filters = (view.filters ? (view.filters.push(grayFilter), view.filters) : [grayFilter]);
}

/**
 * 控件放光特效
 */
export function lightViewAni(view: Laya.Sprite, isLoop?: boolean, color?: string): void {
    let blurColor = color ? color : "#ffee82";
    //创建一个发光滤镜
    var glowFilter: Laya.GlowFilter = new Laya.GlowFilter(blurColor, 0, 0, 0);

    let obj = {
        value: 25
    };
    Laya.Tween.to(obj, {
        value: 100,
        update: Laya.Handler.create(view, function () {
            glowFilter.blur = obj.value;
            view.filters = [glowFilter];
        }, null, false)
    }, 500, null, Laya.Handler.create(view, function () {
        Laya.Tween.to(obj, {
            value: 0,
            update: Laya.Handler.create(view, function () {
                glowFilter.blur = obj.value;
                view.filters = [glowFilter];
            }, null, false)
        }, 500, null, Laya.Handler.create(view, function () {
            if (isLoop) {
                lightViewAni(view, isLoop);
            }
        }));
    }));
}

/**
 * 慢慢灰化
 */
export function grayViewAni(view: Laya.Sprite, callback?: Function): void {
    //先清掉过滤
    let obj = {
        value: 0
    };
    let grayFilter: Laya.ColorFilter = new Laya.ColorFilter();
    Laya.Tween.to(obj, {
        value: 1,
        update: Laya.Handler.create(view, function () {
            let grayMat: Array<number> =
                [
                    .3086, .6094, .082, 0, 0, .3086, .6094, .082, 0, 0, .3086, .6094, .082, 0, 0, 0, 0, 0, obj.value, 0
                ];
            grayFilter.setByMatrix(grayMat);
            view.filters = [grayFilter];
        }, null, false)
    }, 300, null, Laya.Handler.create(view, function () {
        if (callback) {
            callback();
        }
    }));
}


/**
* 抖动动画效果    旋转抖动（动画对象描点设置为中心点)
* @param caller 
* @param view 
* @param count     不用传入
*/
export function sharkAni(caller: any, view: Laya.Sprite, count?: number, times?: number, callBack?: Function) {
    var index = count ? count : 0;
    var r = index % 4 === 0 ? 15 : (index % 4 === 1 ? 0 : (index % 4 === 2 ? -15 : 0));
    Laya.Tween.to(view, {
        rotation: r
    }, 250, Laya.Ease.linearInOut, Laya.Handler.create(caller, function () {
        if (index <= (4 * (times ? times : 0))) {
            sharkAni(caller, view, index + 1, times, callBack);
        } else {
            //播放完成回调
            if (callBack) {
                callBack();
            }
        }
    }));
}



/**
 * 绘制线条
 * @param sprite 
 * @param startPos 
 * @param endPos 
 * @returns length
 */
export function drawLine(sprite: Laya.Sprite, startPos: Laya.Point, endPos: Laya.Point): number {
    sprite.graphics.drawLine(startPos.x, startPos.y, endPos.x, endPos.y, AppConfig.LINE_COLOR, AppConfig.LINE_WIDTH);
    return getDistance(startPos, endPos);
}

/**计算两点间距离 */
export function getDistance(p1: any, p2: any): number {

    return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
}

//从point1移动到point2,转过的角度    
export function getPointAngle(point1, point2): number {
    if (point2.x == point1.x && point2.y == point1.y) {
        return 0;
    }
    if (point2.x > point1.x && point2.y > point1.y) {//第一象限
        return Math.atan((point2.y - point1.y) / (point2.x - point1.x)) / Math.PI * 180
    } else if (point2.x < point1.x && point2.y > point1.y) {
        return Math.atan((point1.x - point2.x) / (point2.y - point1.y)) / Math.PI * 180 + 90
    } else if (point2.x < point1.x && point2.y < point1.y) {
        return Math.atan((point1.y - point2.y) / (point1.x - point2.x)) / Math.PI * 180 + 180
    } else if (point2.x > point1.x && point2.y < point1.y) {
        return Math.atan((point2.x - point1.x) / (point1.y - point2.y)) / Math.PI * 180 + 270
    }
    if (point2.x == point1.x && point2.y > point1.y) {
        return 90;//下
    } else if (point2.x == point1.x && point2.y < point1.y) {
        return 270;//上
    } else if (point2.x > point1.x && point2.y == point1.y) {
        return 360;//右
    } else {
        return 180;//左
    }
}

/**
 * 四点绘制矩形
 * @param sprite 
 * @param points 
 */
export function drawRect(sprite: Laya.Sprite, points: Array<number>): void {
    Log.d('绘制矩形：');
    Log.d(points);
    let g: Laya.Graphics = sprite.graphics;
    g.drawPoly(0, 0, points, AppConfig.LINE_COLOR);
}

export function showModal(data: any) {
    UiManager.getSelf().showModal(data);
}