const {promisify} = require('util');
const childProcess = require('child_process');

const exec = promisify(childProcess.exec);

const branchName = async (option) => {
  const {cwd} = Object.assign({}, option);
  const {stdout} = await exec('git symbolic-ref --short HEAD', {cwd});

  return stdout.trimRight();
};

exports.createQuestion = () => {
  const question = {
    default: async () => {
      const branch = await branchName();
      let id;

      if (branch.includes('feature')) {
        id = branch.match('(?<=feature/).*');
      } else {
        id = branch.match('.*');
      }

      return id ? id[0] : '';
    },
    filter: (input) => {
      if (!input || input.length === 0) {
        return '';
      }

      return `[#${input.replace(/#/gim, '')}]`;
    },
    message: 'Issue ID (automatically taken from the branch number):',
    name: 'issueId',
    type: 'input',
    validate: (input) => {
      if (input.length === 0) {
        return true;
      }

      return true;
    }
  };

  return question;
};
