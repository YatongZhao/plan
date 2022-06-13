const BASE_SCORE = 60;
const MAX_SCORE = 100;
const SCORE_MAP: {
  [key: number]: number[];
} = {
  0: [],
  1: [100],
  2: [80, 120],
  3: [80, 100, 120],
  4: [70, 85, 115, 130],
  5: [70, 85, 100, 115, 130],
}

const getUnitScore = (time: number, baseTime: number) => {
  let result = 0;
  for (let i = 0; i < time; i++) {
    result += ((SCORE_MAP[baseTime][i] ?? 65) - 60);
  }

  return result;
}

type ScoreGetter = (
  innerTimes: number[],
  outerTimes: number[],
  baseTime: number,
  timeSum: number) => number;

export const getAddedScore: ScoreGetter = (innerTimes, outerTimes, baseTime, timeSum) => {
  return innerTimes.reduce((pre, current) => {
    return pre + ((getUnitScore(current, baseTime)) / timeSum);
  }, 0) + outerTimes.reduce((pre, current) => {
    return pre + ((getUnitScore(current, 0)) / timeSum);
  }, 0);
}

export const getDeductedScore: ScoreGetter = (innerTimes, outerTimes, baseTime, timeSum) => {
  return 0;
}

export const getScore: ScoreGetter = (innerTimes, outerTimes, baseTime, timeSum) => {
  const score = BASE_SCORE
    + getAddedScore(innerTimes, outerTimes, baseTime, timeSum)
    + getDeductedScore(innerTimes, outerTimes, baseTime, timeSum);

  return score;
}
