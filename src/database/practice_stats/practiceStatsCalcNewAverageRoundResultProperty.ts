export default function practiceStatsCalcNewAverageRoundResultProperty(
  prevPropAverage: number,
  prevRoundsCompletedCount: number,
  newPropValue: number,
) {
  const newAverage =
    (prevPropAverage * prevRoundsCompletedCount + newPropValue) /
    (prevRoundsCompletedCount + 1);
  return newAverage;
}
