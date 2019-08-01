const getGitRootDir = require('./util/getGitRootDir');
const getConfig = require('./getConfig');

const createState = () => {
  const root = getGitRootDir();

  if (!root) {
    throw new Error('Could not find Git root folder.');
  }

  const state = {
    answers: {
      body: '',
      breaking: '',
      issues: '',
      lerna: '',
      scope: '',
      subject: '',
      trackerId: '',
      type: ''
    },
    config: getConfig(root),
    root
  };

  return state;
};

module.exports = createState;
