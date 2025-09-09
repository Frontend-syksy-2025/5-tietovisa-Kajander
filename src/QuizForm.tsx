import { useState } from "react"

type Question = {
	question: string,
	difficulty: 'easy' | 'medium' | 'hard',
}


function QuizForm() {


	const [question, setQuestion] = useState<Question>({
		question: "",
		difficulty: "easy",
	})

	const [questions, setQuestions] = useState<Question[]>([])
	//const [isPlayButtonDisabled, setIsPlayButtonDisabled] = useState(true)
	const [playMode, setPlayMode] = useState(false)
	const [randomNumber, setRandomNumber] = useState(0)

	const addQuestion = () => {
		setQuestions([...questions, question])
		setQuestion({question: "", difficulty: "easy"})

		// En saanut toimimaan tällä tavalla että tsekataan täällä funktiossa listan pituus
		// Antoi aina luvun, joka oli yhden pienempi kuin syötettyjen kyssäreiden määrä
		// lueskelin matskua ja reactin dokumentointia mutta en oikein ymmärtänyt miten tää ratkastaisiin
		// löytyi kuitenkin vaihtoehtonen ratkasu +
		/*
		if (questions.length > 3) {
			setIsPlayButtonDisabled(false) // enable play button
		}
		*/

	}

	// https://shinyu.org/en/typescript/numbers/generating-random-numbers/
	function getRandomInt(min: number, max: number): number {
  		min = Math.ceil(min)
  		max = Math.floor(max)

  		return Math.floor(Math.random() * (max - min + 1)) + min
	}

	const play = () => {
		setPlayMode(true)
		setRandomNumber(getRandomInt(0, questions.length - 1))
	}




	return (
		<>
		
		<h3>Quiz</h3>
		<input 
			required
			placeholder="Enter a question..."
			onChange={event => setQuestion({...question, question: event.target.value})} 
			value={question.question}
			/>
		
		<select
			onChange={event => setQuestion({...question, difficulty: event.target.value as 'easy' | 'medium' | 'hard'})} 
			value={question.difficulty} 
      		>
			<option value="easy">Easy</option>
			<option value="medium">Medium</option>
			<option value="hard">Hard</option>
      		</select>

		<input 
			onClick={addQuestion}
			value={"Add Question"}
			type="button"
			/>

		<input 
			onClick={play} 		
			value={"Play"}
			type="button"				
			disabled = {questions.length < 3 ?	// https://www.techiediaries.com/react-state-array-get-length-example/
					true : 
					false
				}
			/>
		
		{playMode ? 					
			<div>					
				<p>Question: {questions[randomNumber].question} </p>
				<p>Level: {questions[randomNumber].difficulty}</p>
			</div>
			:
			""
		}

		</>
	)


}

export default QuizForm

