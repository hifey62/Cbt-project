import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authcontext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentDisplayed, setCurrentDisplayed] = useState({});
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({});
  const [testCompleted, setTestCompleted] = useState(false);
  const { user } = useContext(AuthContext);
  const { setResult } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3001/tests");
        const data = await res.json();
        setTests(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const setQuestions = (test) => {
    setSelectedTest(test);
    setCurrentQuestions(test.questions);
    const firstUnanswered = test.questions.find(
      (q) => answers[`test-${test.id}-q-${q.id}`] === undefined
    );
    setCurrentDisplayed(firstUnanswered || test.questions[0]);
  };

  const dispCurrentQuestion = (q) => {
    setCurrentDisplayed(q);
  };

  const getSelectedAnswer = (testId, questionId) => {
    return answers[`test-${testId}-q-${questionId}`];
  };

  const computeScore = () => {
    let totalScore = 0;
    tests.forEach((test) => {
      test.questions.forEach((q) => {
        const selectedAnswer = getSelectedAnswer(test.id, q.id);
        if (selectedAnswer && selectedAnswer === q.answer) {
          totalScore += 1;
        }
      });
    });
    return totalScore;
  };
  const checkAllAnswered = tests.every((test) =>
    test.questions.every(
      (q) => answers[`test-${test.id}-q-${q.id}`] !== undefined
    )
  );

  const handleSubmit = async () => {
    if (!checkAllAnswered) {
      setTestCompleted(true);
      return;
    }
    setLoading(true);
    const totalScore = computeScore();
    const totalQuestions = tests.reduce(
      (sum, test) => sum + test.questions.length,
      0
    );

    try {
      const resultData = {
        userId: user.id,
        userName: user.name,
        score: totalScore,
        total: totalQuestions,
        date: new Date().toISOString(),
      };
      const respose = await fetch("http://localhost:3001/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resultData),
      });
      if (!respose.ok) {
        throw new Error("Failed to save result");
      }
      setResult(resultData);
      setLoading(false);
      navigate("/result");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col items-center py-10 px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2 tracking-tight">
          Welcome, <span className="text-purple-600">{user?.name}</span>
        </h1>
        <p className="text-gray-500 text-lg">
          Select a subject to begin your test
        </p>
      </div>

      {/* Subject Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {tests.map((test) => (
          <button
            key={test.id}
            onClick={() => setQuestions(test)}
            className={`px-6 py-3 rounded-xl font-semibold text-white shadow-md transition-all duration-300 ${
              selectedTest?.id === test.id
                ? "bg-purple-600 scale-105"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {test.name}
          </button>
        ))}
      </div>

      {/* Question Card */}
      {selectedTest && (
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8 border border-gray-100 transition-all duration-300 hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {selectedTest.name} — Question {currentDisplayed.id + 1}
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            {currentDisplayed.questions}
          </p>

          {/* Options */}
          <div className="space-y-3">
            {currentDisplayed.options &&
              currentDisplayed.options.map((option, index) => {
                const questionKey = `test-${selectedTest?.id}-q-${currentDisplayed.id}`;
                const isSelected = answers[questionKey] === option;
                return (
                  <label
                    key={index}
                    htmlFor={`option-${currentDisplayed.id}-${index}`}
                    className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? "bg-purple-100 border-purple-500 text-purple-700"
                        : "hover:bg-gray-50 border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      id={`option-${currentDisplayed.id}-${index}`}
                      name={`test-${selectedTest?.id}-question-${currentDisplayed.id}`}
                      value={option}
                      checked={isSelected}
                      onChange={(e) =>
                        setAnswers({
                          ...answers,
                          [questionKey]: e.target.value,
                        })
                      }
                      className="mr-3 accent-purple-600 scale-125"
                    />
                    {option}
                  </label>
                );
              })}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      {selectedTest && (
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {currentQuestions.map((q) => (
            <button
              key={q.id}
              onClick={() => dispCurrentQuestion(q)}
              className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold transition-all duration-300 shadow-sm ${
                currentDisplayed.id === q.id
                  ? "bg-purple-600 text-white scale-110"
                  : answers[`test-${selectedTest.id}-q-${q.id}`]
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-gray-300 hover:bg-gray-400 text-gray-700"
              }`}
            >
              {q.id + 1}
            </button>
          ))}
        </div>
      )}

      {/* Submit Button */}
      {selectedTest && (
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-10 px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
        >
          {loading ? " Submitting..." : "Submit Test"}
        </button>
      )}

      {testCompleted && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 transition-all duration-300">
          <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-2xl p-8 text-center transform scale-100 animate-fadeIn">
            <div className="mb-4 flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8
              3.582-8 8 3.582 8 8 8z"
                />
              </svg>
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Please complete all tests before submitting!
            </h2>

            <p className="text-gray-500 mb-6">
              Make sure every test is finished before final submission.
            </p>

            <button
              className="bg-red-600 text-white rounded-full py-2 px-6 hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg"
              onClick={() => setTestCompleted(false)}
            >
              Okay, Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
