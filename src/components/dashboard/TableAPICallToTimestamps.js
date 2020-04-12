import React from 'react';

class TableAPIToTimestamps extends React.Component {

  constructor(props) {
    super(props);

    // Number of API calls to display information about
    this.MAX_ITEMS_TO_SHOW = 5;
  };

  /**
   * Generate a human readable string based on the given
   * timestamp of an API call.
   */
  timeSince = (timeStamp) => {
    const now = new Date(),
      secondsPast = (now.getTime() - timeStamp) / 1000;
    if (secondsPast < 60) {
      return `${parseInt(secondsPast)} seconds ago`;
    }
    if (secondsPast < 3600) {
      return `${parseInt(secondsPast / 60)} minutes ago`;
    }
    if (secondsPast <= 86400) {
      return `${parseInt(secondsPast / 3600)} hours ago`;
    }
    if (secondsPast > 86400) {
      const day = timeStamp.getDate(),
        month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ", ""),
        year = timeStamp.getFullYear() == now.getFullYear() ? "" : " " + timeStamp.getFullYear();
      return `${day} ${month} ${year}`;
    };
  };

  /**
   * Builds the table items to display the list of API calls and their
   * timestamps.
   */
  buildTableAPICallToTimestamps = (temp, mostRecentAPICallTimestampData) => {
    return mostRecentAPICallTimestampData.map(function(it, i) {
        
      // Only show the most recent 5 API calls
      if (i <= temp.MAX_ITEMS_TO_SHOW) {

        // Retrieve all queried emotions, using Set as there may be duplicate emotions
        let emotionsQueried = new Set();
        it.output.forEach(function(emotionObject) {
          emotionsQueried.add(emotionObject.emotion);
        });

        return (
          <tr className="" key={i} >
            <td className="">{ it._id }</td>
            <td className="">{ Array.from(emotionsQueried).join(", ") }</td>
            <td className="collapsing right aligned">{ temp.timeSince(new Date(it.dateCreated)) }</td>
          </tr>
        );
      };
    });
  };

  render() {

    const { mostRecentAPICallTimestampData } = this.props,
      temp = this;

    let tableAPICallToTimestamps = []
    if (mostRecentAPICallTimestampData.length > 0) {
      tableAPICallToTimestamps = temp.buildTableAPICallToTimestamps(temp, mostRecentAPICallTimestampData);
    };

    return (
      <table className="ui celled striped table">
        <thead className="">
          <tr className=""><th colSpan="3" className="">Recent API Calls</th></tr>
        </thead>
        <tbody className="">
          { tableAPICallToTimestamps }
        </tbody>
      </table>
    );
  };
};

export default TableAPIToTimestamps;