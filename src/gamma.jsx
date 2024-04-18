import React from 'react';

// Function to calculate gamma statistics
export const calculateGammaStats = (jsonData) => {
  const classWiseGamma = {};

  // Initialize class-wise arrays to store gamma data
  for (let i = 1; i <= 4; i++) {
    classWiseGamma[`Class ${i}`] = [];
  }

  // Iterate through the data and calculate gamma for each point
  jsonData.forEach(item => {
    const gamma = (parseFloat(item.Ash) * parseFloat(item.Hue)) / parseFloat(item.Magnesium); // Calculate gamma
    const alcoholClass = item.Alcohol;
    if (!isNaN(gamma)) { // Check if it's a valid number
      classWiseGamma[`Class ${alcoholClass}`].push(gamma);
    }
  });

  // Calculate mean, median, and mode for each class
  const gammaStats = {};
  for (let i = 1; i <= 4; i++) {
    const classData = classWiseGamma[`Class ${i}`];
    const sortedClassData = [...classData].sort((a, b) => a - b);
    const mean = classData.length > 0 ? (classData.reduce((acc, curr) => acc + curr, 0) / classData.length).toFixed(3) : 'N/A';

    let median;
    if (classData.length > 0) {
      if (classData.length % 2 === 0) {
        median = ((sortedClassData[classData.length / 2 - 1] + sortedClassData[classData.length / 2]) / 2).toFixed(3);
      } else {
        median = sortedClassData[Math.floor(classData.length / 2)].toFixed(3);
      }
    } else {
      median = 'N/A';
    }

    let mode = 'N/A';
    if (classData.length > 0) {
      const modeMap = {};
      let maxCount = 0;
      classData.forEach((value) => {
        modeMap[value] = (modeMap[value] || 0) + 1;
        if (modeMap[value] > maxCount) {
          maxCount = modeMap[value];
          mode = value.toFixed(3);
        }
      });
    }

    gammaStats[`Class ${i}`] = { mean, median, mode };
  }

  return gammaStats;
};

// GammaStatisticsTable component to display gamma statistics
export const GammaStatisticsTable = ({ gammaStats }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Measure</th>
          <th>Class 1</th>
          <th>Class 2</th>
          <th>Class 3</th>
          <th>Class 4</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Gamma Mean</td>
          <td>{gammaStats['Class 1'] ? gammaStats['Class 1'].mean : 'N/A'}</td>
          <td>{gammaStats['Class 2'] ? gammaStats['Class 2'].mean : 'N/A'}</td>
          <td>{gammaStats['Class 3'] ? gammaStats['Class 3'].mean : 'N/A'}</td>
          <td>{gammaStats['Class 4'] ? gammaStats['Class 4'].mean : 'N/A'}</td>
        </tr>
        <tr>
          <td>Gamma Median</td>
          <td>{gammaStats['Class 1'] ? gammaStats['Class 1'].median : 'N/A'}</td>
          <td>{gammaStats['Class 2'] ? gammaStats['Class 2'].median : 'N/A'}</td>
          <td>{gammaStats['Class 3'] ? gammaStats['Class 3'].median : 'N/A'}</td>
          <td>{gammaStats['Class 4'] ? gammaStats['Class 4'].median : 'N/A'}</td>
        </tr>
        <tr>
          <td>Gamma Mode</td>
          <td>{gammaStats['Class 1'] ? gammaStats['Class 1'].mode : 'N/A'}</td>
          <td>{gammaStats['Class 2'] ? gammaStats['Class 2'].mode : 'N/A'}</td>
          <td>{gammaStats['Class 3'] ? gammaStats['Class 3'].mode : 'N/A'}</td>
          <td>{gammaStats['Class 4'] ? gammaStats['Class 4'].mode : 'N/A'}</td>
        </tr>
      </tbody>
    </table>
  );
};
