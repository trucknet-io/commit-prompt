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
      const id = branch.match(/\d{9}$/);

      return id ? id[0] : undefined;
    },
    filter: (input) => {
      if (!input || input.length === 0) {
        return '';
      }

      return `[#${input.replace(/#/gmi, '')}]`;
    },
    message: 'Pivotal tracker or Github Issue ID (without []) (it should be taken by default, if you use git flow):',
    name: 'pivotalTrackerId',
    type: 'input',
    validate: (input) => {
      if (input.length === 0) {
        return true;
      }
      if (!Boolean(input.match(/^\[#\d{9}\]$/))) {
        return 'Pivotal task ID should contain 9 digits';
      }

      return true;
    }
  };

  return question;
};
