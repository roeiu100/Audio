import React, { useState, useEffect } from 'react';
import axios from 'axios';
const FileCheck = () => {
    const [words, setWords] = useState([]);
    const [inputText, setInputText] = useState('');
    const [message, setMessage] = useState('');
    const [image, setImage] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [time,setTime] = useState(null)
    useEffect(() => {
      // Load the CSV file when the component mounts
      axios.get('/text.csv')
        .then(response => {
            console.log(response);
          const lines = response.data.split('\n');
          const wordsArray = [];
          for (let i = 0; i < lines.length; i++) {
            wordsArray.push(lines[i].split(',')[0]);
          }
          setWords(wordsArray);
        })
        .catch(error => {
          console.log(error);
        });
       
    }, []);
    useEffect(() => {
        const intervalId = setInterval(() => {
          setElapsedTime(prevElapsedTime => prevElapsedTime + 1);
        }, 1000);
    
        return () => clearInterval(intervalId);
      }, []);
    const handleInputTextChange = (event) => {
      setInputText(event.target.value);
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
      if (words.includes(inputText)) {
        setMessage('Correct!');
        const audio = new Audio("/audio.mp3");
        audio.play();       
        setTime(elapsedTime)
      } else {
        setMessage('Please write the words from the file');
      }
    }
  return (
    <div>
    <h1>Hello please enter a word from the file</h1>
    <form onSubmit={handleSubmit}>
      <label>Enter text:</label>
      <input type="text"  value={inputText} onChange={handleInputTextChange} /><br /><br />
      <button type="submit">Submit</button>
    </form>
    <div>{message}</div>
  {time && <button onClick={()=>setImage(<img src='yeti.gif' alt='yeti'/>)}>I heard</button>}
  {!time ? <p>Timer: {elapsedTime} seconds</p>:
  <p>It took you {time} seconds to write the right word</p>
}
   
<div>{image}</div>
</div>
    )
}

export default FileCheck
