import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const initialNumbers = []
  for (let i = 1; i <= 10; i++) {
    initialNumbers.push(i)
  }
  const [numbers, setNumbers] = useState(initialNumbers);
  const [point, setPoint] = useState(0);
  const [times, setTimes] = useState(0)
  const [isPlay, setIsPlay] = useState(false)

  const handleReset = () => {
    setNumbers(initialNumbers);
    setPoint(0);
    setTimes(0)
    setIsPlay(false)
  }
  const handleStart = () => {
    if (!isPlay) {
      setIsPlay(true);
      setTimes(0)
    }
  }
  useEffect(() => {
    let timesId
    if (isPlay) {
      timesId = setInterval(() => {
        setTimes((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(timesId)
  }, [isPlay]);
  const handleClickNumber = (number) => {
    if (!isPlay) return;


    setNumbers((prevNumber) => {
      const updatedNumbers = prevNumber.filter((n) => n !== number);

      if (updatedNumbers.length === 0) {
        setIsPlay(false);
      }

      return updatedNumbers;
    });

    setPoint((prevPoint) => prevPoint + 1);
  };

  return (
    <div className='game_container'>
      <div className='title'>
        <h3>LET'S PLAY</h3>
        <p>Points : <input value={point} readOnly /></p>
        <p>Time  : <input value={times + ' s'} readOnly /></p>
        <div className='buttons'>
          <button className='start-button' onClick={handleStart}>Start</button>
          <button className='reset-button' onClick={handleReset}>Reset</button>
        </div>
      </div>
      <div className="play-area">
        {numbers.length > 0 ? (
          numbers.map((number) => (
            <div key={number} onClick={() => handleClickNumber(number)} className="circle">
              {number}
            </div>
          ))
        ) : (
          <div className="clear">ALL CLEARED!</div>
        )}
      </div>

    </div>
  )
}

export default App;
