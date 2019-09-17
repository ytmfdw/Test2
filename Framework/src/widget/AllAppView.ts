import { ui } from "../ui/layaMaxUI";
import AppView from "./AppView";
import Log from "../utils/Log";
import { Apps } from "../utils/OtherApps";

export default class AllAppView extends ui.widget.AllAppViewUI {

    constructor() {
        super();
        this.iconLayout.hScrollBarSkin = null;
        this.iconLayout.itemRender = AppView;
        this.iconLayout.renderHandler = new Laya.Handler(this, this.updateItem);
        this.iconLayout.array = [];
        //只要用户手指划动，就不再移动
        this.iconLayout.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
    }

    public static getSelf(): AllAppView {
        let self: AllAppView = Laya.Pool.getItemByClass("AllAppView", AllAppView);
        self.changeApps();
        return self;
    }

    private updateItem(cell, index: number) {
        cell.setData(cell.dataSource);
    }

    private mouseMove() {
        Log.d("用户手指划过");
        Laya.timer.clearAll(this);
    }

    public changeApps(): void {
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

    private moveSelect(): void {
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