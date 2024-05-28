import React from 'react';

const WarningThresholds = ({
  upperWarningInput,
  setUpperWarningInput,
  lowerWarningInput,
  setLowerWarningInput,
  sendThresholdData,
  upperWarningThreshold,
  lowerWarningThreshold,
}) => {
  const handleSetUpper = () => {
    sendThresholdData(upperWarningInput, undefined, 'warning');
    setUpperWarningInput(''); // Clear the input field
  };

  const handleSetLower = () => {
    sendThresholdData(undefined, lowerWarningInput, 'warning');
    setLowerWarningInput(''); // Clear the input field
  };

  return (
    <div className="warningThresholds" id="right">
      <h3>Warning Levels:</h3>
      <div className='inputContainer'>
      <p data-cy="war">Upper Threshold: {upperWarningThreshold}</p>
      <p data-cy="war">Lower Threshold: {lowerWarningThreshold}</p>
      </div>
      <input
        id="upper"
        type="text"
        value={upperWarningInput}
        onChange={(event) => setUpperWarningInput(event.target.value)}
        placeholder=" Enter Upper Level"
      />
      <button className="button1" onClick={handleSetUpper}>Set Upper</button>
      <input
        id="lower"
        type="text"
        value={lowerWarningInput}
        onChange={(event) => setLowerWarningInput(event.target.value)}
        placeholder=" Enter Lower Level"
      />
      <button className="button2" onClick={handleSetLower}>Set Lower</button>
    </div>
  );
};

export default WarningThresholds;
