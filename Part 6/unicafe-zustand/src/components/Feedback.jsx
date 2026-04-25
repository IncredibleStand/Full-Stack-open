import { useFeedbackControls } from '../store'

const Feedback = () => {
  const { goodClick, okClick, badClick, resetStats } = useFeedbackControls()    

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={goodClick}>good</button>
      <button onClick={okClick}>ok</button>
      <button onClick={badClick}>bad</button>
      <button onClick={resetStats}>reset stats</button>
    </div>
  )
}

export default Feedback