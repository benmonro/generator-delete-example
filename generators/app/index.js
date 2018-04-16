'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {

  initializing() {
    this.composeWith(require.resolve('../clean'));
  }
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the stylish ${chalk.red('generator-delete-example')} generator!`)
    );

    const prompts = [
      {
        type: 'confirm',
        name: 'someAnswer',
        message: 'Would you like to enable this option?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt'),
      {name:"bill"}
    );

    this.fs.copy(
      this.templatePath('myapp/**/*.*'),
      this.destinationRoot(), 
      {process: (content, path) => {
        console.log('processing ', path);
        return new Buffer(content);
      }}
    )
  }

  
};
