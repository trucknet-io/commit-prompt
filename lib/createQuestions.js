/* eslint-disable import/no-dynamic-require, global-require */
const qBody = require('./questions/body');
const qBreaking = require('./questions/breaking');
const qIssues = require('./questions/issues');
const qLerna = require('./questions/lerna');
const qtrackerId = require('./questions/trackerId');
const qScope = require('./questions/scope');
const qSubject = require('./questions/subject');
const qType = require('./questions/type');
const qIssueId = require('./questions/issueId');

const creators = {
  body: qBody,
  breaking: qBreaking,
  issueId: qIssueId,
  issues: qIssues,
  lerna: qLerna,
  scope: qScope,
  subject: qSubject,
  trackerId: qtrackerId,
  type: qType
};

const createQuestions = (state) => {
  const questions = state.config.questions.map((name) => {
    const question = creators[name].createQuestion(state);

    return question;
  });

  return questions.filter(Boolean);
};

module.exports = createQuestions;
