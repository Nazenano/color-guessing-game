import { MouseEvent, useEffect, useState } from "react"
import "./App.css"

function getRandomColor() {
  const chars: string = "0123456789ABCDEF"
  let color: string = "#"

  for (let i = 0; i < 6; i++) {
    const index = Math.floor(Math.random() * 16)
    color += chars.charAt(index)
  }
  return color
}

function App() {
  const [colors, setColors] = useState<string[]>([])
  const [correctColor, setCorrectColor] = useState<string>()
  const [answer, setAnswer] = useState<boolean>()

  const refreshColor = () => {
    const randColors: string[] = [
      getRandomColor(),
      getRandomColor(),
      getRandomColor(),
    ]
    const correct: string = randColors[Math.floor(Math.random() * 3)]
    setColors(randColors)
    setCorrectColor(correct)
  }

  useEffect(() => {
    refreshColor()
  }, [])

  const buttonClicked = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement
    if (button.id === correctColor) {
      setAnswer(true)
      refreshColor()
    } else {
      setAnswer(false)
    }
  }

  return (
    <div className="App" style={{ display: "d-flex" }}>
      <div
        style={{
          backgroundColor: correctColor,
          margin: "20vh auto 2rem auto",
          width: "20rem",
          height: "20rem",
        }}
      ></div>
      {colors &&
        colors.map(color => (
          <button
            onClick={buttonClicked}
            style={{ marginRight: "1rem", padding: 10, cursor: "pointer" }}
            key={color}
            id={color}
          >
            {color}
          </button>
        ))}
      {answer === true && <h2 style={{ color: "green" }}>Correct!</h2>}
      {answer === false && <h2 style={{ color: "red" }}>Wrong!</h2>}
    </div>
  )
}

export default App
