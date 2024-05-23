import React from 'react';

const DangerThresholds = ({
  upperDangerInput,
  setUpperDangerInput,
  lowerDangerInput,
  setLowerDangerInput,
  sendThresholdData,
  upperDangerThreshold,
  lowerDangerThreshold,
}) => {
  const handleSetUpper = () => {
    sendThresholdData(upperDangerInput, undefined, 'danger');
    setUpperDangerInput(''); // Clear the input field
  };

  const handleSetLower = () => {
    sendThresholdData(undefined, lowerDangerInput, 'danger');
    setLowerDangerInput(''); // Clear the input field
  };

  return (
    <div className="dangerThresholds" id="left">
      <p>Danger Levels:</p>
      <p data-cy="war">Upper Threshold: {upperDangerThreshold} Lower Threshold: {lowerDangerThreshold}</p>
      <input
        id="upper"
        type="text"
        value={upperDangerInput}
        onChange={(event) => setUpperDangerInput(event.target.value)}
        placeholder="Enter Upper Level"
      />
      <button className="button1" onClick={handleSetUpper}>Set Upper</button>
      <input
        id="lower"
        type="text"
        value={lowerDangerInput}
        onChange={(event) => setLowerDangerInput(event.target.value)}
        placeholder="Enter Lower Level"
      />
      <button className="button2" onClick={handleSetLower}>Set Lower</button>
    </div>
  );
};

export default DangerThresholds;
