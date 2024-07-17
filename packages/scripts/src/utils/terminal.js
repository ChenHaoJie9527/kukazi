const chalk = require("chalk");
const figlet = require("figlet");
const boxen = require("boxen");

function setTerminalMessage(message, callback = () => {}) {
  try {
    figlet(message, (err, data) => {
      if (err) {
        console.log("Error in figlet", err);
        return;
      }
      console.log(chalk.cyan(data));

      const boxenMessage = boxen(
        chalk.green(`Successfully optimized ${results.length} SVG files!\n`) +
          chalk.yellow(`Total files processed: ${files.length}`),
        { padding: 1, borderColor: "green", borderStyle: "round" }
      );
      console.log(boxenMessage);
    });
  } catch (error) {
    // console.error(chalk.red(`Error optimizing SVGs in ${directory}:`), error);
    callback(`Error optimizing SVGs in ${directory}:`);
    throw error;
  }
}

module.exports = {
  setTerminalMessage,
};
