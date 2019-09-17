import { ui } from "../ui/layaMaxUI";
import { AppConfig } from "../AppConfig";
import Log from "../utils/Log";

export default class BasePage extends ui.page.BasePageUI {
    private static self: BasePage = null;

    private constructor() {
        super();
        this.height = AppConfig.screenH;
        this.topLayout.y = AppConfig.topFixOffset;
        this.contentLayout.y = this.topLayout.y + this.topLayout.height;
        this.contentLayout.height = this.height - this.contentLayout.y;
        this.topBg.y = -this.topLayout.y;
        this.topBg.height = this.topLayout.height + this.topLayout.y;
    }

    onEnable() {
        //添加到舞台
        Log.d("BasePage   onEnable");
    }


    onDisable() {
        //从舞台上移除
        Log.d("BasePage onDisable");
    }


    public static getSelf(): BasePage {
        if (BasePage.self == null) {
            BasePage.self = new BasePage();
        }
        return BasePage.self;
    }
}