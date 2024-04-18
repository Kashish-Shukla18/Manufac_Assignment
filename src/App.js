import React from 'react';
import jsonData from './data.json'
import FlavanoidsStatisticsTable from './FlavanoidsStatsTable'; // Import the FlavanoidsStatsTable component
import {calculateGammaStats,GammaStatisticsTable } from './gamma';
function App() {
  const gammaStats = calculateGammaStats(jsonData);

  return (
    <div>
      <h1>Wine Statistics</h1>
      <FlavanoidsStatisticsTable /> {/* Render the FlavanoidsStatsTable component */}
      <h1>Gamma Statistics</h1>
      <GammaStatisticsTable gammaStats={gammaStats} />
    </div>
  );
}

export default App;
