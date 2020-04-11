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
      return parseInt(secondsPast) + ' seconds ago';
    }
    if (secondsPast < 3600) {
      return parseInt(secondsPast / 60) + ' minutes ago';
    }
    if (secondsPast <= 86400) {
      return parseInt(secondsPast / 3600) + 'hours ago';
    }
    if (secondsPast > 86400) {
      const day = timeStamp.getDate(),
        month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ", ""),
        year = timeStamp.getFullYear() == now.getFullYear() ? "" : " " + timeStamp.getFullYear();
      return `${day} ${month} ${year}`;
    };
  };

  render() {

    const { mostRecentAPICallTimestampData } = this.props,
      temp = this;

    let tableAPICallToTimestamps = []
    if (mostRecentAPICallTimestampData.length > 0) {
      tableAPICallToTimestamps = mostRecentAPICallTimestampData.map(function(it, i) {
        
        // Only show the most recent 5 API calls
        if (i <= temp.MAX_ITEMS_TO_SHOW) {
          return (
            <tr class="">
              <td class="">{ it.fileName }</td>
              <td class=""></td>
              <td class="collapsing right aligned">{ temp.timeSince(new Date(it.dateCreated)) }</td>
            </tr>
          );
        };
      });
    };

    return (
      <table class="ui celled striped table">
        <thead class="">
          <tr class=""><th colSpan="3" class="">Recent API Calls</th></tr>
        </thead>
        <tbody class="">
          { tableAPICallToTimestamps }
        </tbody>
      </table>
    );
  };
};

export default TableAPIToTimestamps;