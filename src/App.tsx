import { MouseEvent, useEffect, useState } from "react"
import "./App.css"

function getRandomColor() {
  const chars: string = "0123456789abcdef"
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
  const [answer, setAnswer] = useState<boolean | null>(null)

  const refreshColor = () => {
    const randColors: string[] = [
      getRandomColor(),
      getRandomColor(),
      getRandomColor(),
    ]
    setColors(randColors)
    setCorrectColor(randColors[Math.floor(Math.random() * 3)])
  }

  useEffect(() => {
    refreshColor()
  }, [])

  const buttonClicked = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement

    if (button.id === correctColor) {
      setAnswer(true)
      refreshColor()
    } else setAnswer(false)
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="flex-box">
        <div
          style={{
            backgroundColor: correctColor,
            marginTop: "10vh",
            marginBottom: "2rem",
            width: "20rem",
            height: "20rem",
          }}
        ></div>
      </div>
      <div className="flex-box">
        {colors.map(color => (
          <button
            key={color}
            id={color}
            onClick={buttonClicked}
            style={{ padding: "10px", cursor: "pointer", width: "6rem" }}
          >
            {color}
          </button>
        ))}
      </div>
      <div className="flex-box">
        {answer === true && <h2 style={{ color: "green" }}>Correct!</h2>}
        {answer === false && <h2 style={{ color: "red" }}>Wrong!</h2>}
      </div>
    </div>
  )
}

export default App
