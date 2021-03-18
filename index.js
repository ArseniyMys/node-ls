#!/usr/bin/env node

const fs = require('fs');
const chalk = require('chalk');
const path = require('path');

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, filenames) => {
  if (err) throw new Error(err);

  console.log('\n');

  // Final sollutionte
  const statPromises = filenames.map(filename =>
    lstat(path.join(targetDir, filename))
  );
  const allStats = await Promise.all(statPromises);

  allStats.forEach((stats, index) => {
    if (stats.isFile()) console.log(chalk.hex('#C0C0C0')(filenames[index]));
    else if (stats.isDirectory() && stats.size === 64)
      console.log(chalk.dim.cyan(filenames[index]));
    else if (stats.isDirectory()) console.log(chalk.cyan(filenames[index]));
    else console.log(chalk.hex('#C0C0C0')(filenames[index]));
  });

  // Sollution 1

  // const allStats = Array(filenames.length).fill(null);
  // filenames.forEach((filename, index) => {
  //   fs.lstat(filename, (err, stats) => {
  //     if (err) {
  //       throw new Error(err);
  //     }

  //     allStats[index] = stats;

  //     const ready = allStats.every(stats => stats);

  //     if (ready) {
  //       allStats.forEach((stats, index) => {
  //         console.log(filenames[index], stats.isFile());
  //       });
  //     }
  //   });
  // });

  // Sollution 2

  // filenames.forEach(async filename => {
  //   try {
  //     const stat = await lstat(filename);

  //     console.log(filename, stat.isFile());
  //   } catch (err) {
  //     throw new Error(err);
  //   }
  // });

  console.log('\n');
});

// Method 1
const lstat = filename => {
  return new Promise((resolve, reject) => {
    fs.lstat(filename, (err, stats) => {
      if (err) reject(err);

      resolve(stats);
    });
  });
};

// Method 2
// const util = require('util');
// const lstat = util.promisify(fs.lstat);

// Method 3
// const { lstat } = fs.promises;

// 1. package.json "bin" section
// 2. chmod +x index.js             Changing index.js file permissions
// 3. Comment on top                Allow this file to be treated as executable
// 4. npm link                      Link project to be able to use it everywhere
