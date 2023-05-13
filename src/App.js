import { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState([{
    user: 'gpt',
    message: 'How can I help You?',
  }, {
    user: 'me',
    message: 'I want to use chat AI'
  }]);
  // clear chat 

  function clearChat() {
    setChatLog([]);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    await setChatLog([...chatLog, { user: 'me', message: `${input}` }])
    await setInput('');
    // fetch response to the api combining the chat log and the array of messages and seinding it as a message
    // to localhost:3000 as a post

    const response = await fetch(`https://localhost:3080/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: chatLog.map((message) => message.message).join('')
      })
    });
    const data = await response.json();
    setChatLog([...chatLog, { user: 'gpt', message: `${data.message}` }])
    console.log(data.message);
  }
  const ChatMessage = ({ message }) => {
    return (
      <div className="chat-message " >
        <div className="chat-message-center">
          <div className={`avatar ${message.user === 'gpt' && 'chatgpt'}`}></div>
          <div className="message">

            {message.message}
          </div>
        </div>
      </div >
    )
  }



  return (
    <div className="App">
      <aside className='sideMenu'>
        <div className='side-menu-btn' onClick={clearChat}>
          <span>+</span>
          New Chat
        </div>
      </aside>
      <section className='chatBox'>
        <div className="chat-log">

          <div className="chat-message chatgpt">
            <div className="chat-message-center">
              <div className="avatar chatgpt">
                <img src="./images/artificial-intelligence.png" alt="Somethig wrong" />

              </div>
              <div className="message">
                Hello World
              </div>
            </div>
          </div>
          {chatLog.map((message, idx) => (
            <ChatMessage key={idx} message={message} />
          ))}
        </div>
        <div className='chat-input-holder'>
          <form action="" onSubmit={handleSubmit}>

            <input className='chat-input-textArr' placeholder='Type you message here' type='text'
              row='1' value={input}
              onChange={(e) => setInput(e.target.value)}></input>
          </form>
        </div>
      </section>
    </div>
  );
}


export default App;
// `https://localhost:3080/`