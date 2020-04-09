import React from 'react';

class Footer extends React.Component {

  render() {

    return (
      <div className="footer" style={{ marginTop: "15px" }}>
        <div className="ui segment">
          <p>
            SERaaS is a Final Year Project developed by Wei Kit Wong for Waterford
            Institute of Technology.
          </p>

          <div role="list" className="ui list">
            <div role="listitem" className="item">
              <img
                src="https://avatars1.githubusercontent.com/u/20683479?s=460&u=6f85e6c6af9f8403a032439cd577b864a13cf667&v=4"
                className="ui avatar image"
              />
              <div className="content">
                <a className="header" href="https://github.com/andyAndyA">Wei Kit Wong</a>
                <div className="description">
                  4th Year Student in BSc (Hons) in Applied Computing
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default Footer;