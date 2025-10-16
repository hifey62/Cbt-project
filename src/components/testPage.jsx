// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";

// const TestPage = () => {
//   const { id } = useParams();
//   const [test, setTest] = useState(null);
//   const [selectedAnswers, setSelectedAnswers] = useState({});
//   const [score, setScore] = useState(null);

//   useEffect(() => {
//     const fetchTest = async () => {
//       try {
//         const res = await fetch(`http://localhost:3001/tests/${id}`);
//         const data = await res.json();
//         setTest(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchTest();
//   }, [id]);

//   const handleSelect = (questionId, option) => {
//     setSelectedAnswers({ ...selectedAnswers, [questionId]: option });
//   };

//   const handleSubmit = () => {
//     let count = 0;
//     test.questions.forEach((q) => {
//       if (selectedAnswers[q.id] === q.answer) count++;
//     });
//     setScore(count);
//   };

//   if (!test) return <p className="text-center mt-10">Loading test...</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">{test.name} Test</h2>
//       {test.questions.map((q) => (
//         <div key={q.id} className="mb-6 border-b pb-4">
//           <p className="font-semibold mb-2">
//             {parseInt(q.id) + 1}. {q.questions}
//           </p>
//           <div className="flex flex-col space-y-2">
//             {q.options.map((option, index) => (
//               <label key={index} className="flex items-center">
//                 <input
//                   type="radio"
//                   name={`question-${q.id}`}
//                   value={option}
//                   onChange={() => handleSelect(q.id, option)}
//                   checked={selectedAnswers[q.id] === option}
//                   className="mr-2"
//                 />
//                 {option}
//               </label>
//             ))}
//           </div>
//         </div>
//       ))}
//       <button
//         onClick={handleSubmit}
//         className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded mt-4"
//       >
//         Submit
//       </button>

//       {score !== null && (
//         <p className="mt-4 text-xl font-bold">
//           Your Score: {score} / {test.questions.length}
//         </p>
//       )}
//     </div>
//   );
// };

// export default TestPage;
