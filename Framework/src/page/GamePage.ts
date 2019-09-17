import { ui } from "../ui/layaMaxUI";

export default class GamePage extends ui.page.GamePageUI {
    public level: number = 0;
    private static self: GamePage = null;
    public showTip() {

    }

    public static getSelf(): GamePage {
        if (!GamePage.self) {
            GamePage.self = new GamePage();
        }
        return GamePage.self;
    }

    public initLevel(level: number): void {
        this.level = level;
    }
}