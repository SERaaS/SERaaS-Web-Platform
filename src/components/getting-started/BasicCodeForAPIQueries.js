import React from 'react';
import { Tab } from 'semantic-ui-react'
import { CodeBlock, dracula } from 'react-code-blocks'

// Loading in the code examples to show
import nodejs from './basic-code-samples/nodejs';
import python_requests from './basic-code-samples/python-requests';

const BASIC_CODE_FOR_API_QUERY_TABS = [
  {
    menuItem: 'Node.js',
    render: () =>
      <Tab.Pane>
        <CodeBlock
          text={nodejs}
          language={"javascript"}
          showLineNumbers={true}
          theme={dracula}
          wrapLines
        />
      </Tab.Pane>
  },
  
  {
    menuItem: 'Python - Requests',
    render: () =>
      <Tab.Pane>
        <CodeBlock
          text={python_requests}
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