'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const glob = require('glob-promise');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.


    const prompts = [
      {
        type: 'confirm',
        name: 'deleteSample',
        message: 'Would you like to remove the sample code?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  async writing() {
    if(this.props.deleteSample) {
      console.log('deleting it');
      
      this.fs.delete('dummyfile.txt');
      console.log(this.templatePath('../app/templates/myapp/+(components|pages)/*'));;
      
      const filesToDelete = await glob(this.templatePath('../../app/templates/myapp/+(components|pages)/*'), {nodir:true});
      console.log(filesToDelete.map(file => file.replace(this.templatePath("../../app/templates/myapp"), this.destinationPath(''))));

      for (const file of filesToDelete) {
        this.fs.delete(file);
      }
    }
  }

};
