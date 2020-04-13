import React from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts';

class TimeSeriesAPICallsPlot extends React.Component {

  /**
   * Creates an list of lists for the last 24 hours, sorted
   * in ascending order.
   */
  getTheLast24Hours = () => {
    const currentHour = new Date().getHours();

    let beforeThisHour = [],
      afterThisHour = [];
    for (let i = 0; i < 24; i += 1) {
      let _hour = i >= 10 ? `${i}:00` : `0${i}:00`;

      if (i <= currentHour) {
        if (i === currentHour) {
          _hour = "Now";
        };

        beforeThisHour.push({ hour: _hour, queriesMade: 0 });
      } else {
        afterThisHour.push({ hour: _hour, queriesMade: 0 });
      };      
    };

    // [24 Hours Before Now -> Now]
    return afterThisHour.concat(beforeThisHour);
  };

  /**
   * Builds a plottable list of API calls made per hour.
   */
  buildTimeSeriesAPICallsPlot = (temp, mostRecentAPICallTimestampData) => {
    const now = new Date();
    let hoursListing = temp.getTheLast24Hours();

    mostRecentAPICallTimestampData.forEach(function(it) {
      const hoursPassed = parseInt(((now.getTime() - new Date(it.dateCreated)) / 1000) / 3600),

        // Dates are sorted by ascending order to the current hour,
        // so current hour - hoursPassed = index
        hourListingIndex = hoursListing.length - hoursPassed - 1;

      if (hourListingIndex >= 0) {
        hoursListing[hourListingIndex].queriesMade += 1;
      };
    });

    return hoursListing;
  };

  render() {

    const { mostRecentAPICallTimestampData } = this.props,
      temp = this;

    let timeSeriesAPICallsPlot = [];
    if (mostRecentAPICallTimestampData.length > 0) {
      timeSeriesAPICallsPlot = temp.buildTimeSeriesAPICallsPlot(temp, mostRecentAPICallTimestampData);
    };

    return (
      <div>
        <h3>API Calls Made Over The Last 24 Hours</h3>

        <LineChart width={500} height={300} data={timeSeriesAPICallsPlot}>
          <XAxis dataKey="hour"/>
          <YAxis/>
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
          <Line type="monotone" dataKey="queriesMade" stroke="#8884d8" />
        </LineChart>
      </div>
    );
  };
};

export default TimeSeriesAPICallsPlot;