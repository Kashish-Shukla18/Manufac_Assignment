import React from 'react';
import jsonData from './data.json';

const FlavanoidsStatisticsTable = () => {
  const calculateFlavanoidsStats = () => {
    const classWiseFlavanoids = {};
  
    // Initialize class-wise arrays to store Flavanoids data
    for (let i = 1; i <= 4; i++) {
      classWiseFlavanoids[`Class ${i}`] = [];
    }
  
    // Iterate through the data and categorize Flavanoids by class
    jsonData.forEach(item => {
      const alcoholClass = item.Alcohol;
      const flavanoids = parseFloat(item.Flavanoids); // Convert to number
      if (!isNaN(flavanoids)) { // Check if it's a valid number
        classWiseFlavanoids[`Class ${alcoholClass}`].push(flavanoids);
      }
    });
  
    // Calculate mean, median, and mode for each class
    const flavanoidsStats = {};
    for (let i = 1; i <= 4; i++) {
      const classData = classWiseFlavanoids[`Class ${i}`];
      if (classData && classData.length > 0) {
        const sortedClassData = [...classData].sort((a, b) => a - b);
        const mean = (classData.reduce((acc, curr) => acc + curr, 0) / classData.length).toFixed(3);
    
        let median;
        if (classData.length % 2 === 0) {
          median = ((sortedClassData[classData.length / 2 - 1] + sortedClassData[classData.length / 2]) / 2).toFixed(3);
        } else {
          median = sortedClassData[Math.floor(classData.length / 2)].toFixed(3);
        }
    
        const modeMap = {};
        let maxCount = 0;
        let mode;
        classData.forEach((value) => {
          modeMap[value] = (modeMap[value] || 0) + 1;
          if (modeMap[value] > maxCount) {
            maxCount = modeMap[value];
            mode = value;
          }
        });
        mode = mode.toFixed(3);
    
        flavanoidsStats[`Class ${i}`] = { mean, median, mode };
      } else {
        // If classData is empty, set default values
        flavanoidsStats[`Class ${i}`] = { mean: 'N/A', median: 'N/A', mode: 'N/A' };
      }
    }
  
    return flavanoidsStats;
  };

  const flavanoidsStats = calculateFlavanoidsStats();

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
          <td>Flavanoids Mean</td>
          <td>{flavanoidsStats['Class 1'].mean}</td>
          <td>{flavanoidsStats['Class 2'].mean}</td>
          <td>{flavanoidsStats['Class 3'].mean}</td>
          <td>{flavanoidsStats['Class 4'].mean}</td>
        </tr>
        <tr>
          <td>Flavanoids Median</td>
          <td>{flavanoidsStats['Class 1'].median}</td>
          <td>{flavanoidsStats['Class 2'].median}</td>
          <td>{flavanoidsStats['Class 3'].median}</td>
          <td>{flavanoidsStats['Class 4'].median}</td>
        </tr>
        <tr>
          <td>Flavanoids Mode</td>
          <td>{flavanoidsStats['Class 1'].mode}</td>
          <td>{flavanoidsStats['Class 2'].mode}</td>
          <td>{flavanoidsStats['Class 3'].mode}</td>
          <td>{flavanoidsStats['Class 4'].mode}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default FlavanoidsStatisticsTable;
