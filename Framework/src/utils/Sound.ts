import { AppConfig } from "../AppConfig";
import Log from "./Log";

export const BGLOCALMUSICPATH = 'sound/bg.mp3';
export const PASS = 'sound/win.mp3';
export const ERRSOUND = 'sound/bow.mp3';
export const CUT = 'sound/cut.mp3';
export const ROPECUT = 'sound/ropecut.mp3';
export const DOG = 'sound/bow.mp3';
export const STAR = 'sound/star.mp3';
var bgMusicPath = null;
var bgMusicChannal: Laya.SoundChannel = null;
var isNeedPlayBgm: boolean = false;
/**音效播放 ,可统一管理*/
export function playSound(soundUrl: string): void {
    if (AppConfig.isMute) return;
    Laya.SoundManager.playSound(soundUrl);
}
var playIndex: number = 0;
/**播放背景音乐 */
export function playBgMusic(isPlay: boolean): void {
    isNeedPlayBgm = isPlay;
    AppConfig.isMuteBgm = AppConfig.isMute;
    // if (!isPlay && !bgMusicChannal) return;
    if (bgMusicChannal) {
        if (isPlay) {
            //暂停
            if (!AppConfig.isMuteBgm) {
                bgMusicChannal.resume();
            } else {
                bgMusicChannal.pause();
            }
        } else {
            bgMusicChannal.pause();
        }
        return;
    }
    if (isPlay && !AppConfig.isMuteBgm) {
        Laya.SoundManager.setMusicVolume(0.3);
        //下载背景音乐
        bgMusicChannal = Laya.SoundManager.playMusic(BGLOCALMUSICPATH, 1, Laya.Handler.create(this, function () {
            Log.d("bgm play complete~~~~~~~");
            bgMusicChannal = null;
            if (!AppConfig.isMuteBgm && isNeedPlayBgm) {
                playBgMusic(true);
            }
        }));

    }
}
