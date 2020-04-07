import React from 'react';
import APIUtils from '../../utilities/APIUtils';

class MakeSampleAPICall extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      // Storing current file being selected for sample API call
      selectedFile: null
    };
  };

  /**
   * Sets the currently selected file for the sample API call.
   */
  onInputFileChange = (event) => {
    console.log(event.target.files[0]);
    this.setState({ selectedFile: event.target.files[0] });
  };

  /**
   * Performs the sample API call upon button press.
   */
  onFormButtonClick = (event) => {
    event.preventDefault();

    const audioFile = new FormData();
    audioFile.append("file", this.state.selectedFile);

    // TODO: Display results in a graph showcasing the change of emotions overtime
    return APIUtils.query(audioFile, this.props.userId, [], null).then(function(res) { console.log(res) });
  };

  render() {

    return (
      <div>
        <form onSubmit={this.onFormButtonClick}>
          <h1>File Upload</h1>
          <input type="file" onChange={this.onInputFileChange} />
          <button type="submit">Upload</button>
        </form>
      </div>
    );
  };
};

export default MakeSampleAPICall;