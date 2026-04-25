import { useGood, useOk, useBad } from '../store'

const Statistics = () => {
  const good = useGood()
  const ok = useOk()
  const bad = useBad()

  const total = good + ok + bad
  const average = total === 0 ? 0 : (good - bad) / total
  const positivePercentage = total === 0 ? 0 : (good / total) * 100

  if (total === 0) {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h2>statistics</h2>
      <div>good {good}</div>
      <div>ok {ok}</div>
      <div>bad {bad}</div>
      <div>all {total}</div>
      <div>average {average.toFixed(1)}</div>
      <div>positive {positivePercentage.toFixed(1)} %</div>
    </div>
  )
}

export default Statistics