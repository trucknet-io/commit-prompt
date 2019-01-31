const {execSync} = require('child_process');

const getGitRootDir = () => {
  try {
    return execSync(
      'git rev-parse --show-toplevel',
      {stdio: [0]}
    )
      .toString()
      .trim();
  } catch (error) {
    return '';
  }
};

module.exports = getGitRootDir;
