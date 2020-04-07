import React from 'react';
import { Tab } from 'semantic-ui-react'
import { CodeBlock, dracula } from 'react-code-blocks'

const BASIC_CODE_FOR_API_QUERY_TABS = [
  {
    menuItem: 'JavaScript',
    render: () =>
      <Tab.Pane>
        <CodeBlock
          text={"// Sample API Query Code in JavaScript"}
          language={"javascript"}
          showLineNumbers={true}
          theme={dracula}
          wrapLines
        />
      </Tab.Pane>
  },
  
  {
    menuItem: 'Python',
    render: () =>
      <Tab.Pane>
        <CodeBlock
          text={"# Sample API Query Code in Python"}
          language={"python"}
          showLineNumbers={true}
          theme={dracula}
          wrapLines
        />
      </Tab.Pane>
  },
];

class BasicCodeForAPIQueries extends React.Component {

  render() {
    return (
      <Tab panes={BASIC_CODE_FOR_API_QUERY_TABS} />
    );
  };
};

export default BasicCodeForAPIQueries;