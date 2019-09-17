import GameConfig from "./GameConfig";
import { AppConfig } from "./AppConfig";
import Log from "./utils/Log";
import { getVersionSettings } from "./utils/Setting";
import { ShareType } from "./utils/Share";
import { insertCount } from "./utils/Count";
import PageRoot from "./page/RootPage";
import UiManager from "./UiManager";
import LoadPage from "./page/LoadPage";
class Main {
	public static app: Main = null;
	public static pageRoot: PageRoot = null;
	constructor() {
		//根据IDE设置初始化引擎		
		Main.app = this;
		Config.isAntialias = true;
		box2d.DEBUG = AppConfig.DEBUG;
		//根据IDE设置初始化引擎		
		Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
		Laya.stage.scaleMode = GameConfig.scaleMode;
		Laya.stage.screenMode = GameConfig.screenMode;
		// Laya.stage.bgColor = AppConfig.BGCOLOR;
		Laya.Physics.enable();
		//去掉调试
		//兼容微信不支持加载scene后缀场景
		Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
		//初始云环境
		if (AppConfig.isWX) {
			wx.cloud.init({
				env: AppConfig.APP_ID
			});
			//登录获取openId
			this.login();
			AppConfig.userId = AppConfig.userData.userId;
			AppConfig.systemInfo = wx.getSystemInfoSync();
			Log.d("手机信息：");
			Log.d(AppConfig.systemInfo);
			//计算缩放比
			AppConfig.scaleX = AppConfig.systemInfo.windowWidth / GameConfig.width;
			Log.d(AppConfig.scaleX);
			//计算缩放后的高度
			AppConfig.screenH = AppConfig.systemInfo.screenHeight / AppConfig.scaleX;
			//获取云端设置
			getVersionSettings();
			//初始微信
			this.initWx();
		}
		Log.d(AppConfig.screenH);
		if (AppConfig.screenH >= 2300) {
			//IphoneX
			AppConfig.IPHONEX_BOTTOM = AppConfig.IPHONEX_BOTTOM * AppConfig.scaleX;
		} else {
			AppConfig.IPHONEX_BOTTOM = 0;
		}
		Log.d("距离底部高度：" + AppConfig.IPHONEX_BOTTOM);
		// Laya.stage.graphics.drawRect(0, 0, Main.screenW, Main.screenH, BGCOLOR);
		//先加载根元素
		this.onBgImageLoaded();
	}

	//云开发登录
	public login() {
		let thiz = this;
		AppConfig.userChannel = wx.getStorageSync(AppConfig.USERCHANNEL);
		if (!AppConfig.userChannel || AppConfig.userChannel == '') {
			var data = wx.getLaunchOptionsSync();
			if (data.query && data.query.channel) {
				AppConfig.userChannel = data.query.channel;
				//缓存下来
				wx.setStorage({
					key: AppConfig.USERCHANNEL,
					data: AppConfig.userChannel
				});
			}
		}
		if (AppConfig.userData.userId != null && AppConfig.userData.userId.length > 5) {
			//获取到了用户id，不用登录 减少请求
			return;
		}
		AppConfig.userData.userId = wx.getStorageSync(AppConfig.OPENID);
		if (AppConfig.userData.userId != null && AppConfig.userData.userId.length > 5) {
			//获取到了用户id，不用登录 减少请求
			return;
		}
		wx.cloud.callFunction({
			// 要调用的云函数名称
			name: 'login',
			// 传递给云函数的event参数
		}).then(res => {
			// 得到用户openId
			var openId = res.result.openid;
			if (openId) {
				AppConfig.userData.userId = openId;
				insertCount({ userId: AppConfig.userData.userId, type: '登录成功', });
				wx.setStorage({ key: AppConfig.OPENID, data: openId });
				wx.setStorage({ key: AppConfig.USERDATA, data: AppConfig.userData });
			}
			Log.d('云函数  登录  ：' + openId);
		}).catch(err => {
			// handle error
			insertCount({ userId: AppConfig.userData.userId, type: '登录失败', });
			Log.d('登录失败：' + err);
		});
	}



	//加载分包
	private onBgImageLoaded() {
		Main.pageRoot = new PageRoot(AppConfig.screenW, AppConfig.screenH);
		Log.d('screenH:' + AppConfig.screenH);
		Laya.stage.addChild(Main.pageRoot);
		UiManager.getSelf().setRootPage(Main.pageRoot);
		UiManager.getSelf().addPage(LoadPage.getSelf(/*this*/));
		LoadPage.getSelf(/*this*/).loadRes(this.onSubpackageLoaded);
	}


	private onSubpackageLoaded(flag: boolean): void {
		Log.d('分包加载完成::::' + flag);
		let thiz = Main.app;//=======================>这里的thiz一定要指向App，不能用this,因为onSubpackageLoaded是从子线程中加载进来的，this指向的是子线程
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
			// let firePath = "res/atlas/fire.atlas";
			Laya.loader.load([resPath/* , firePath */], Laya.Handler.create(thiz, thiz.onAssetsLoaded), null, Laya.Loader.ATLAS);
		} else {
			//资源加载失败，重新加载
			UiManager.getSelf().showModal({
				content: "资源加载失败，是否重试？",
				showCancel: true,
				confirmText: "重载",
				success: res => {
					if (res.confirm) {
						LoadPage.getSelf(/*thiz*/).loadRes(thiz.onSubpackageLoaded);
					}
				}
			});

		}
	}

	private onAssetsLoaded(): void {
		Log.d('资源加载完成::::');
		//资源加载完成
		// this.gotoPage(HomePage.getSelf(this));

		// HomePage.getSelf(this).setGameData(this.userData);
		//加载页面销毁
		LoadPage.getSelf().destroy();
		Main.pageRoot.topLayout.visible = true;
		//跳转到游戏界面
		UiManager.getSelf().goHome();
	}

	/**
* 微信相关的
*/
	public initWx() {
		if (!AppConfig.isWX) return;
		//是否静音
		AppConfig.isMute = wx.getStorageSync(AppConfig.ISMUTE);
		AppConfig.isMuteBgm = AppConfig.isMute;

		let cacheUserData = wx.getStorageSync(AppConfig.USERDATA);
		if (cacheUserData && cacheUserData.level) {
			AppConfig.userData.level = cacheUserData.level;
		}
		//分享设置
		wx.showShareMenu({
			withShareTicket: true
		});
		var thiz = this;
		if (AppConfig.ifAldShare) {
			wx.aldOnShareAppMessage(function () {
				//判断是否是特殊用户分享
				var tmp_query = '';
				tmp_query = 'uid=' + AppConfig.userId + '&state=' + ShareType.MENU;
				Log.d('右上角转发~~~');
				Log.d('右上角转发~~~');
				Log.d(tmp_query);
				return {
					query: tmp_query,
					title: '据说只有1%的人能过关，是你吗？',
					// imageUrl: tempFilePath
					imageUrl: AppConfig.LOCAL_SHARE,
				}
			});
		} else {
			wx.onShareAppMessage(function () {
				//判断是否是特殊用户分享
				var tmp_query = '';
				tmp_query = 'uid=' + AppConfig.userId + '&state=' + ShareType.MENU;
				Log.d('右上角转发~~~');
				Log.d(tmp_query);
				return {
					query: tmp_query,
					title: '据说只有1%的人能过关，是你吗？',
					// imageUrl: tempFilePath
					imageUrl: AppConfig.LOCAL_SHARE,
				}
			});
		}
	}

	public static getApp(): Main {
		return Main.app;
	}
}
//激活启动类
var app = new Main();
