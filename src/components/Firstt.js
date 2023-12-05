import React, { useState, useEffect } from 'react';
import stringSimilarity from 'string-similarity';
import jsonData from './chatData.json';

const Chatbot = () => {
  const [chatData, setChatData] = useState(jsonData);
  const [userInput, setUserInput] = useState('');
  const [botResponse, setBotResponse] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const findMatchingAnswer = (question) => {
    const formattedQuestion = question.toLowerCase();
    return chatData.find((entry) =>

      entry.questions.some(
        (q) => stringSimilarity.compareTwoStrings(formattedQuestion, q.toLowerCase()) > 0.35
      )
    );
  };

  const handleAskQuestion = () => {
    const question = userInput.trim();
    const matchedAnswer = findMatchingAnswer(question);

    if (matchedAnswer) {
      const newBotResponse = matchedAnswer.answer;
      setBotResponse(newBotResponse);

      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { user: question, bot: newBotResponse },
      ]);
    } else {
      const errorMessage = "I'm sorry, I don't have information about that question.";
      setBotResponse(errorMessage);

      setChatHistory((prevChatHistory) => [...prevChatHistory, { user: question, bot: errorMessage }]);
    }
  };

  

  return (
    <div>
      <div className="Container mainq">
        <div className='header'>Query Bot</div>
        <div className='header'></div>
        <div className="row inter mx-auto">
          {chatHistory.map((entry, index) => (
  <div key={index} className=' ui'>
    <div className='my-1'>User: {entry.user}</div>
    <div className='my-1'>Bot: {entry.bot}</div>
  </div>
))}
</div>
        <div className="row inp">
          <div className="col-md-3"></div>
          <div className="col-md-6 fl">
            <input
              type="text"
              className="form-control inputFieldqw"
              value={userInput}
              onChange={handleUserInput}
            />
            <button onClick={handleAskQuestion}>Ask</button>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
