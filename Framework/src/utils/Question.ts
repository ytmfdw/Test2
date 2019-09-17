import { AppConfig } from "../AppConfig";

/**关卡数据 */
export default class LevelData {
    public grade: number;//等级
    public level: number;//关卡
    public isUnLock?: boolean;//是否解锁
    public totalLevel?: number;//最多关卡数
}
/**根据题目索引，得到等级和关卡 */
export function getLevelDataFromQuestionr(index: number): LevelData {
    var data: LevelData = { grade: 1, level: 1 };
    //计算grade
    //计算当前等级及索引
    var grade = Math.ceil(index / AppConfig.GRADE_COUNT);
    var level = (index % AppConfig.GRADE_COUNT === 0) ? AppConfig.GRADE_COUNT : index % AppConfig.GRADE_COUNT;
    data.grade = grade;
    data.level = level;
    return data;
}

/**根据题目索引，得到等级和关卡 */
export function getLevelDataByIndex(index: number): LevelData {
    var data: LevelData = { grade: 1, level: 1 };
    //计算grade
    //计算当前等级及索引
    var grade = Math.ceil(index / AppConfig.GRADE_COUNT);
    var level = (index % AppConfig.GRADE_COUNT === 0) ? AppConfig.GRADE_COUNT : index % AppConfig.GRADE_COUNT;
    data.grade = grade;
    data.level = level;
    return data;
}

/**根据等级，获取等级名称 */
export function getGradeName(grade: number): string {
    return grade + ' 级';
}