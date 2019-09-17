import Map from "./Map";
import Log from "./Log";
import { insertCount } from "./Count";
import { AppConfig } from "../AppConfig";
import { showModal } from "./Common";

export default class BannerManager {
    /**游戏界面的Banner广告 */
    public static GAMEPAGE_BANNER: number = 0;
    public static GAMEPAGE_TIPAD: number = 0;
    public static GAMEPAGE_BONUSAD: number = 0;
    public static LOGIN_BONUSAD: number = 0;
    //隐藏所有广告
    public static HIDE_ALL: number = -1;

    /**以毫秒为单位 */
    private videoCloseTime: number = -1;

    //所有banner数组
    private bannerMap: Map = new Map();
    //所有激励视频广告数组
    private videoMap: Map = new Map();
    //所有插屏广告数据
    private interstitialMap: Map = new Map();
    private static self: BannerManager = null;
    constructor() {
        //预加载视频广告
        this.loadVideo();
    }

    public static getSelf(): BannerManager {
        if (BannerManager.self == null) {
            BannerManager.self = new BannerManager();
        }

        return BannerManager.self;
    }

    private hasLoadInterstitial = null;
    /**
     * 缓存插屏广告
     * 
     * @memberof BannerManager
     */
    public loadInterstitialAd(callBack?: Function) {
        Log.d("预加载插屏广告  =============");
        let thiz = this;
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

    /**
   * 得到插屏广告
   * @param 插屏广告索引 
   */
    public getInsterstitial(adIndex: number): any {
        if (typeof wx.createInterstitialAd != 'function') return null;
        //不弹插屏
        if (!AppConfig.ifInsterAd) return null;
        let entity = this.interstitialMap.get(AppConfig.interstitialAd[adIndex]);
        if (!entity) {
            entity = wx.createInterstitialAd({
                adUnitId: AppConfig.interstitialAd[adIndex]
            });
            entity.onError(e => {
                Log.d(e);
            });
            this.interstitialMap.put(AppConfig.interstitialAd[adIndex], entity);
        } else {
            entity.onError(e => {
                Log.d(e);
            });
        }
        return entity;
    }

    /**
     * 显示插屏广告
     * 
     * @param {Function} [callBack] 
     * @memberof BannerManager
     */
    public showInterstitialAd(callBack?: Function, closeCallBack?: Function, errorCallBack?: Function) {
        var thiz = this;
        if (this.hasLoadInterstitial) {
            this.hasLoadInterstitial.onClose(() => {
                Log.d('插屏广告close回调');
                thiz.hasLoadInterstitial.offClose();
                thiz.hasLoadInterstitial = null;
                //再预加载下一次
                thiz.loadInterstitialAd();
                //两次关闭时间必需大于15秒才算
                //添加统计
                insertCount({ userId: AppConfig.userId, type: "关闭插屏广告" });
                if (closeCallBack) {
                    closeCallBack();
                }
            })
            //显示广告
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
        } else {
            //重新预加载
            thiz.loadInterstitialAd(function (entity) {
                if (entity) {
                    entity.onClose(() => {
                        Log.d('插屏广告close回调');
                        entity.offClose();
                        entity = null;
                        //再预加载下一次
                        thiz.loadInterstitialAd();
                        if (closeCallBack) {
                            closeCallBack();
                        }
                        //添加统计
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
                } else {
                    if (errorCallBack) {
                        errorCallBack();
                    }
                }
            });
        }
    }



    /**初始化指定广告，如果没有指定，就是全部广告  */
    public initBanner(bannerIndex: number, callBack?: Function) {
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

            //错误回调
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

    /**得到指定Banner */
    public getBanner(bannerIndex: number): any {
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
    /**显示指定广告
     * 
     * @param bannerIndex:广告索引
     * @param height:指定高度
     * @param callBack  :回调，-1高度不够，0正常显示，-2创建为空
     */
    public showBanner(bannerIndex: number, height: number, callBack?: Function) {

        var thiz = this;
        //先判断是否存在
        var adKey = AppConfig.banners[bannerIndex];
        var entity = this.bannerMap.get(adKey);
        //判断高度是否足够
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
                // width: AppConfig.systemInfo.screenWidth,
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
                    //高度不够，统计
                    // this.hideBanner(bannerIndex);
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
    /**显示指定广告
     * 
     * @param bannerIndex:广告索引
     * @param x  位置  Laya坐标体系
     * @param y  位置  Laya坐标体系
     * @param width 宽度 Laya坐标体系
     * @param callBack  :回调，-1高度不够，0正常显示，-2创建为空
     */
    public showBannerInPosition(bannerIndex: number, x: number, y: number, width?: number, callBack?: Function, height?: number) {
        Log.d("banner ==> 加广告");
        var thiz = this;
        //先判断是否存在
        var adKey = AppConfig.banners[bannerIndex];
        var entity = this.bannerMap.get(adKey);;
        //判断高度是否足够
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
            //调整大小后再显示
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
    /**
     * 隐藏指定Banner
     * 
     * @param bannerIndex  指定广告索引，如果<0，则表示全部
     * 
     */
    public hideBanner(bannerIndex: number) {
        Log.d("banner ==> 隐藏广告");
        if (bannerIndex >= 0) {
            var entity = this.bannerMap.get(AppConfig.banners[bannerIndex]);
            if (entity) {
                this.bannerMap.remove(AppConfig.banners[bannerIndex]);
                entity.hide();
                entity.destroy();
                entity = null;
            }
        } else {
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


    //======================视频广告部分
    /**
     * 得到指定视频广告
     * @param videoIndex 
     */
    public getVideoAd(videoIndex: number): any {
        var entity = this.videoMap.get(AppConfig.videos[videoIndex]);
        if (!entity) {
            entity = wx.createRewardedVideoAd({
                adUnitId: AppConfig.videos[videoIndex]
            });
            entity.onError(e => {
                Log.d(e);
            });
            this.videoMap.put(AppConfig.videos[videoIndex], entity);
        } else {
            entity.onError(e => {
                Log.d(e);
            });
        }
        return entity;
    }

    private hasLoadAd = null;
    /**
     *预加载视频
     * @param videoIndex 
     */
    public loadVideo(callBack?: Function): any {
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
                    //保存已经缓存的广告
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
                    //不能看视频
                    AppConfig.canShowVideo = false;
                    if (callBack) {
                        callBack(null);
                    }
                });
        }
    }

    /**
     * 加载完成后的视频广告
     * @param entity 
     * @param callBack 
     */
    public showVideo(callBack: Function, errorMsg?: string, incomplete?: string, errorCallBack?: Function): any {
        var thiz = this;
        if (thiz.hasLoadAd) {
            //  playBgMusic(false);
            thiz.hasLoadAd.onClose((status) => {
                Log.d('提示视频广告close回调');
                thiz.hasLoadAd.offClose();
                thiz.hasLoadAd = null;
                //再预加载下一次
                thiz.loadVideo();
                //两次关闭时间必需大于15秒才算
                var dTime = (new Date().getTime() - thiz.videoCloseTime) / 1000;
                var isRealClose: boolean = dTime > 15000 ? true : false;
                thiz.videoCloseTime = new Date().getTime();
                Log.d('视频关闭时间：' + thiz.videoCloseTime);
                //  playBgMusic(true);
                //转换成秒
                Log.d('时差：' + dTime + '秒');
                if ((status && status.isEnded) || status === undefined && isRealClose) {
                    //正常播放结束
                    //添加统计
                    insertCount({ userId: AppConfig.userId, type: '统计 视频看完', mark: 'userId:' + AppConfig.userId + ';video:' + AppConfig.videos[0] + 'dTime:' + dTime + '秒' });
                    callBack();
                } else {
                    //播放未完成
                    //添加统计
                    insertCount({ userId: AppConfig.userId, type: '统计 视频未看完', mark: 'video:' + AppConfig.videos[0] });
                    showModal({
                        title: '提示',
                        content: incomplete ? incomplete : '视频未完整播放，无法获得提示！',
                        confirmText: '好的',
                        showCancel: false,
                    });
                }
            })
            //显示广告
            this.hasLoadAd.show();
        } else {
            if (AppConfig.DEBUG) {
                showModal({
                    title: '提示',
                    content: '视频预加载失败~~~',
                    confirmText: '好的',
                    showCancel: false,
                });
            }
            //重新预加载
            thiz.loadVideo(function (entity) {
                if (entity) {
                    entity.onClose((status) => {
                        Log.d('提示视频广告close回调');
                        thiz.hasLoadAd.offClose();
                        thiz.hasLoadAd = null;
                        //再预加载下一次
                        thiz.loadVideo();
                        //两次关闭时间必需大于15秒才算
                        var dTime = (new Date().getTime() - thiz.videoCloseTime) / 1000;
                        var isRealClose: boolean = dTime > 9000 ? true : false;
                        thiz.videoCloseTime = new Date().getTime();
                        Log.d('视频关闭时间：' + thiz.videoCloseTime);
                        //  playBgMusic(true);
                        //转换成秒
                        Log.d('时差：' + dTime + '秒');
                        if ((status && status.isEnded) || status === undefined && isRealClose) {
                            //正常播放结束
                            //添加统计
                            insertCount({ userId: AppConfig.userId, type: '统计 视频看完', mark: 'userId:' + AppConfig.userId + ';video:' + AppConfig.videos[0] + 'dTime:' + dTime + '秒' });
                            callBack();
                        } else {
                            //播放未完成
                            //添加统计
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
                } else {
                    if (errorCallBack) {
                        errorCallBack();
                    } else {
                        //弹出提示
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