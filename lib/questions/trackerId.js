const { promisify } = require("util");
const childProcess = require("child_process");

const exec = promisify(childProcess.exec);

const branchName = async option => {
	const { cwd } = Object.assign({}, option);
	const { stdout } = await exec("git symbolic-ref --short HEAD", { cwd });

	return stdout.trimRight();
};

exports.createQuestion = () => {
	const question = {
		default: async () => {
			const branch = await branchName();
			const id = branch.match(/(#|\\|\/)(\d{3,})/);

			return id ? id[2] : undefined;
		},
		filter: input => {
			if (!input || input.length === 0) {
				return "";
			}

			return `[#${input.replace(/#/gim, "")}]`;
		},
		message:
			"Issue Tracker ID (without []) (it should be taken by default, if you use git flow):",
		name: "trackerId",
		type: "input",
		validate: input => {
			if (input.length === 0) {
				return true;
			}
			if (!Boolean(input.match(/^\[#\d+\]$/))) {
				return "Issue Tracker ID should contain only digits";
			}

			return true;
		}
	};

	return question;
};