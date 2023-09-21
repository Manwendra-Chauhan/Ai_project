import './App.css';
import {useState} from "react";
import { usePDF } from 'react-to-pdf';
import axios from "axios";
import { FacebookShareButton } from "react-share"

function App() {

  const [prompt, setPrompt]= useState("");
  const [response, setResponse]= useState("");
  const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});

  const submitHandler= (e)=>{
    e.preventDefault();
    
    axios
        .post("http://localhost:3001/chat", { prompt })
        .then((res)=>{
          setResponse(res.data);
        })
        .catch((err)=>{
          console.error(err);
        })
  }
  return (
    <div className='body'>
      <div className='content'>
        <p className='header'>Story Generator</p>
        <form onSubmit={submitHandler} className='form'>
          <input name='question' value={prompt} onChange={(e)=> setPrompt(e.target.value)} className='prompt' placeholder='Enter the opening lines here....' autoComplete='off'></input>
          <button type='submit' className='generate'>Generate</button>
        </form>

        {response && <div className='story' ref={targetRef}>{response}</div>}
        {response && <div className='button-wrap'>
          <button onClick={() => toPDF()} className='download'>Download</button>
          <FacebookShareButton
          url="https://www.facebook.com/"
          quote={response}
          hashtag="#Story" >
          <div className='share'>Share</div>
          </FacebookShareButton>
        </div>}
      </div>
    </div>
  )
    
}

export default App;
