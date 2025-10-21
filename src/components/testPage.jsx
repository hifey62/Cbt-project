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
   <div>
     <div className="mt-8 flex flex-wrap justify-center gap-3"> {testBtn}</div>
    
     <div className="mt-8 flex flex-wrap justify-center gap-3">
         {questionBtn}
     </div>
    
    
   </div>
  );
};

export default TestPage;
