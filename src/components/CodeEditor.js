import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeEditor = ({ code, language }) => {
  return (
    <SyntaxHighlighter language={language} style={solarizedlight}>
      {code}
    </SyntaxHighlighter>
  );
};

const ExampleComponent = () => {
  const code = `function greet(name) {
  console.log('Hello, ' + name + '!');
}

greet('World');`;

  return (
    <div>
      <h1>Code Editor Example</h1>
      <CodeEditor code={code} language="javascript" />
    </div>
  );
};

export default ExampleComponent;
