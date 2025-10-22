import { use, useEffect,useState } from "react";


const TestPage = () => {
const [test , setTest] = useState([]);
const[selectedTest,setSelectedTest]= useState({})
const [currentQuestion, setCurrentQuestion]= useState([])

useEffect(()=>{
   
    const FetchTest = async () =>{
       try{
       const response = await fetch("http://localhost:3001/tests");
       const data = await response.json();

       if(!response.ok){
        return Error;
       }
       setTest(data)
       }catch(error){
         console.log(error)
       }
    }

    FetchTest();
},[])


useEffect(()=>{
console.log("i am", currentQuestion)
},[currentQuestion])

const handleSelectedTest = (test) =>{
setSelectedTest(test)

setCurrentQuestion(test.questions)
console.log(test.questions)
}


const questionBtn = currentQuestion?.map((question)=>{
    return <div key={question.id} 
  className="w-10 h-10 flex items-center justify-center rounded-full font-semibold transition-all duration-300 shadow-sm "
   >
    {question.id+1}
    </div>
})



const testBtn = test?.map((test)=>{
    return <button 
    key={test.id} 
    onClick={()=> handleSelectedTest(test)}
    style={{
        marginLeft:"50px",
        marginTop:"50px",
        backgroundColor:"green",
        padding:"10px",
        color:"white",
        borderRadius:"8px",
        width:"150px",
        cursor:"pointer"
    }}>{test.name}</button>
})


 
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Available Tests</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {test?.map((t) => (
          <button
            key={t.id}
            onClick={() => handleSelectedTest(t)}
            className={`p-4 rounded-lg shadow-sm transition-colors text-left border bg-white hover:shadow-md ${
              selectedTest?.id === t.id
                ? "border-green-500 ring-1 ring-green-200"
                : "border-gray-200"
            }`}
          >
            <div className="text-lg font-semibold">{t.name}</div>
            {t.description && (
              <div className="text-sm text-gray-500 mt-1 truncate">{t.description}</div>
            )}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg p-4 shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {selectedTest?.name ? `Questions for "${selectedTest.name}"` : "Select a test to view questions"}
          </h2>
          <div className="text-sm text-gray-500">{currentQuestion?.length ?? 0} questions</div>
        </div>

        <div className="flex flex-wrap gap-3">
          {currentQuestion?.length > 0 ? (
            currentQuestion.map((q, idx) => (
              <div
                key={q.id}
                className="w-10 h-10 flex items-center justify-center rounded-full font-semibold transition-transform transform hover:scale-105 shadow-sm bg-gray-100"
                title={q.title || `Question ${idx + 1}`}
              >
                {idx + 1}
              </div>
            ))
          ) : (
            <div className="text-gray-500">No questions to display</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestPage;
