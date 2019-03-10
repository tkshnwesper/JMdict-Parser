#!/usr/bin/env node

import React from 'react';
import { execFile } from 'child_process';
import { render, Color } from 'ink';
import Spinner from 'ink-spinner';
import program from 'commander';

const { log } = console;

const VERSION = require('../package.json').version;


class JMDictParser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false,
      outputFilename: '',
    };
  }

  componentDidMount() {
    program
      .version(VERSION, '-v, --version')
      .arguments('<file>')
      .action((file) => {
        this.state.outputFilename = `${file}.json`;
        execFile(
          'node',
          [`${__dirname}/parser.js`, file],
          (error) => {
            if (error) {
              log(error);
              process.exit(1);
            } else {
              this.setState({ complete: true });
            }
          },
        );
      });

    program.parse(process.argv);
  }

  componentDidUpdate() {
    const { complete } = this.state;
    if (complete) {
      process.exit(0);
    }
  }

  render() {
    const { complete, outputFilename } = this.state;
    return (
      complete
        ? (
          <React.Fragment>
            <Color green bold>Complete!</Color>
            <div>
              <Color cyan>Your JSON file is saved at</Color>
              {outputFilename}
            </div>
          </React.Fragment>
        )
        : (
          <Color green>
            <Spinner green />
            {' '}
            <Color gray bold>
              Parsing
              {' '}
              <Spinner type="simpleDots" />
            </Color>
          </Color>
        )
    );
  }
}

render(<JMDictParser />);
