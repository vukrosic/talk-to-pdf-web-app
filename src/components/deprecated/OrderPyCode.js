import React, { Component } from 'react';

class OrderPyCode extends Component {
  state = {
    codeSnippet: [
      "def add(a, b):\n",
      "    return a + b\n\n",
      "result = add(5, 10)\n",
      'print("The result is:", result)'
    ],
    mixedSnippet: [],
  };

  componentDidMount() {
    this.shuffleCodeSnippet();
  }

  shuffleCodeSnippet() {
    const codeSnippet = [...this.state.codeSnippet];
    const mixedSnippet = [];

    while (codeSnippet.length) {
      const randomIndex = Math.floor(Math.random() * codeSnippet.length);
      mixedSnippet.push(codeSnippet.splice(randomIndex, 1)[0]);
    }

    this.setState({ mixedSnippet });
  }

  swapLines(index) {
    if (index < 0 || index >= this.state.mixedSnippet.length - 1) {
      return;
    }
    const mixedSnippet = [...this.state.mixedSnippet];
    const temp = mixedSnippet[index];
    mixedSnippet[index] = mixedSnippet[index + 1];
    mixedSnippet[index + 1] = temp;

    this.setState({ mixedSnippet });
  }

  render() {
    return (
      <div>
        {this.state.mixedSnippet.map((line, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => this.swapLines(index - 1)}
            >
              &#8593;
            </div>
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => this.swapLines(index)}
            >
              &#8595;
            </div>
            <pre style={{ marginLeft: '10px', marginBottom: 0 }}>{line}</pre>
          </div>
        ))}
      </div>
    );
  }
}

export default OrderPyCode;