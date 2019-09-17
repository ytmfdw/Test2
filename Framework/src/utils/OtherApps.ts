import { AppConfig } from "../AppConfig";

/**图标 */
export module Apps {
    export var icons = [
        {
            "index": 1,
            "name": "更强连一连",  //星连星
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
            "name": "五彩拼图",//五彩拼图
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

    export function getIcons(num: number): Array<any> {
        let result = [];
        if (!AppConfig.ifShowApps) {
            return result;
        }
        let len = icons.length;
        if (len == 0) {
            return result;
        }
        if (len <= num) {
            return result.concat(icons);
        }
        // Log.d('悬浮导量创建随机数：' + weightArr.length);
        if (AppConfig.weightArr.length == 0) {
            for (let i = 0; i < len; i++) {
                let tmp = icons[i];
                if (tmp.weight) {
                    for (let x = 0; x < tmp.weight; x++) {
                        AppConfig.weightArr.push(tmp);
                    }
                }
            }
        }
        // Log.d(weightArr);
        // Log.d("总权重：" + weightArr.length);
        // Log.d('ifCanNotSame:' + ifCanNotSame);
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

    function hasPushApp(appid: string, arrs: Array<any>): boolean {
        if (arrs.length == 0) return false;
        let len = arrs.length;
        for (let i = 0; i < len; i++) {
            if (appid == arrs[i].appid) {
                return true;
            }
        }
        return false;
    }
}