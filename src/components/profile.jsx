import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authcontext";

const Profile = () => {
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentDisplayed, setCurrentDisplayed] = useState({});
  // Add this near your other useState declarations
const [answers, setAnswers] = useState({});  // Will look like: { "test1-q0": "optionA", "test1-q2": "optionB" }
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3001/tests");
        const data = await res.json();
        setTests(data);
        console.log("Fetched tests:", data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Current answers state:", answers);
  }, [answers]);

  const setQuestions = (test) => {
    setSelectedTest(test);
    setCurrentQuestions(test.questions);
    const firstUnanswered = test.questions.find(q => 
    answers[`test-${test.id}-q-${q.id}`] === undefined
  );
  setCurrentDisplayed(firstUnanswered || test.questions[0]);
  };

  const testbtn = tests.map((test) => (
    <button
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow m-2 transition duration-200 cursor-pointer"
      key={test.id}
      onClick={() => setQuestions(test)}
    >
      {test.name}
    </button>
  ));

  const dispCurrentQuestion = (q) => {
    setCurrentDisplayed(q);
  };

  const questionBtn = currentQuestions.map((q) => (
    <button
      key={q.id}
      className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded m-2 transition duration-200 cursor-pointer"
      onClick={() => dispCurrentQuestion(q)}
    >
      {q.id + 1}
    </button>
  ));

  const getSelectedAnswer = (testId,questionId) =>{
    return answers[`test-${testId}-q-${questionId}`] || "No answer selected";
  }
  const computeScore = () => {
    let scoreEng = 0;
    let scoreMath = 0;
    let scoreChem = 0;
    let totalScore = 0;
    let qListEng = [] ;
    let qlistMath = [];
    let qlistChem  = [];
    tests.forEach((t)=>{
      if(t.name === "English"){
        qListEng = t.questions;
      }else if(t.name === "Mathematics"){
        qlistMath = t.questions;
      }else if(t.name === "Chemistry"){
        qlistChem = t.questions;
      }
    })
    qListEng.forEach((q)=>{
      const selectedAnswer = getSelectedAnswer(0, q.id);
      if(selectedAnswer!== undefined && selectedAnswer === q.answer){
        scoreEng += 1;
      }
    })
    qlistMath.forEach((q)=>{
      const selectedAnswer = getSelectedAnswer(1, q.id);
      if(selectedAnswer!== undefined && selectedAnswer === q.answer){
        scoreMath += 1;
      }
    })
    qlistChem.forEach((q)=>{
      const selectedAnswer = getSelectedAnswer(2, q.id);  
      if(selectedAnswer!== undefined && selectedAnswer === q.answer){
        scoreChem += 1;
      }
    })
    totalScore = scoreEng + scoreMath + scoreChem;
   
    return totalScore;
    // let score = 0;
    // const qList = selectedTest ? selectedTest.questions : [];


    
    // qList.forEach((q)=>{
    //   const selectedAnswer = getSelectedAnswer(test.id, q.id);
    //   if(selectedAnswer!== undefined && selectedAnswer === q.answer){
    //     score += 1;
    //   }
    // })
  }



  return (
    <div className="bg-whitesmoke text-3xl font-bold">
      <h1>{user.name}</h1>
      <div>{testbtn}</div>
      <div className="m-4 p-4 border-2 border-gray-300 rounded">
        {
          
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                Question {currentDisplayed.id + 1}:
              </h2>
              <p className="text-lg">{currentDisplayed.questions}</p>
            
              <div className="mt-2">
                {currentDisplayed.options &&
                  currentDisplayed.options.map((option, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        type="radio"
                        id={`option-${currentDisplayed.id}-${index}`}
                        name={`test-${selectedTest?.id}-question-${currentDisplayed.id}`} // Unique name per question
                        value={option}
                        checked={
                          answers[
                            `test-${selectedTest?.id}-q-${currentDisplayed.id}`
                          ] === option
                        } // React controls checked state
                        onChange={(e) => {
                          const questionKey = `test-${selectedTest?.id}-q-${currentDisplayed.id}`;
                          setAnswers({
                            ...answers,
                            [questionKey]: e.target.value,
                          }); // Update React state
                        }}
                        className="mr-2"
                      />
                      <label
                        htmlFor={`option-${currentDisplayed.id}-${index}`}
                        className="text-base"
                      >
                        {option}
                      </label>
                    </div>
                  ))}

              </div>
            </div>
        }
      </div>

      <div>{questionBtn}</div>

   
        <button onClick={()=>{
          const totalScore = computeScore();
          alert(`Your total score across all tests is: ${totalScore}`);
        }} className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded shadow m-2 transition duration-200 cursor-pointer">
          Submit
        </button>
      </div>
    
  );
};

export default Profile;
