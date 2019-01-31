const chalk = require('chalk');
const InputPrompt = require('inquirer/lib/prompts/input');

class LimitedInputPrompt extends InputPrompt {
  constructor (...args) {
    super(...args);

    if (!this.opt.maxLength) {
      this.throwParamError('maxLength');
    }
    this.originalMessage = this.opt.message;

    if (this.opt.leadingLabel) {
      if (typeof this.opt.leadingLabel === 'function') {
        this.leadingLabel = ' ' + this.opt.leadingLabel(this.answers);
      } else {
        this.leadingLabel = ' ' + this.opt.leadingLabel;
      }
    } else {
      this.leadingLabel = '';
    }

    this.leadingLength = this.leadingLabel.length;
  }

  onKeypress () {
    const maxLength = this.getMaxLength();

    if (this.rl.line.length > maxLength) {
      this.rl.line = this.rl.line.slice(0, maxLength);
      this.rl.cursor--;
    }

    this.render();
  }

  getMaxLength () {
    return this.opt.maxLength - this.leadingLength;
  }

  getRemainingCharsCount () {
    return this.getMaxLength() - this.rl.line.length;
  }

  getCharsLeftText () {
    const chars = this.getRemainingCharsCount();

    if (chars > 15) {
      return chalk.green(`${chars} chars left`);
    } else if (chars > 5) {
      return chalk.yellow(`${chars} chars left`);
    } else {
      return chalk.red(`${chars} chars left`);
    }
  }

  getProgressBar () {
    const remaining = this.getRemainingCharsCount();
    const used = this.getMaxLength() - remaining;

    return `[${'■'.repeat(used)}${'-'.repeat(remaining)}]`;
  }

  render (error) {
    let bottomContent = '';
    let message = this.getQuestion();
    let appendContent = '';
    const isFinal = this.status === 'answered';

    if (isFinal) {
      appendContent = this.answer;
    } else {
      appendContent = this.rl.line;
    }

    message = `${message}
  ${this.getProgressBar()} ${this.getCharsLeftText()}
  ${this.leadingLabel}
  ${appendContent}`;

    if (error) {
      bottomContent = chalk.red('>> ') + error;
    }

    this.screen.render(message, bottomContent);
  }
}

module.exports = LimitedInputPrompt;
