const { spawn } = require('child_process');
const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const gutil = require('gulp-util');
const path = require('path');

const consoleLog = data => gutil.log(data.toString().trim());

gulp.task('server', () => nodemon({
  script: './server/www.js',
  watch: ['./server'],
  env: {
    DEBUG: 'server:server',
    NODE_PATH: path.resolve(__dirname, 'server'),
    NODE_ENV: 'development',
  },
}));

gulp.task('client', (callback) => {
  const serverProcess = spawn(
    process.env.NODE, [
      './node_modules/.bin/webpack-dev-server',
      '--hot',
      '--inline',
    ], {
      env: {
        NODE_PATH: path.resolve(__dirname),
        NODE_ENV: 'development',
      },
    }
  );

  serverProcess.stdout.on('data', consoleLog);
  serverProcess.stderr.on('data', consoleLog);
  serverProcess.on('close', (code) => {
    consoleLog(`Webpack was stopped with code ${code}`);
    callback();
  });
});

gulp.task('mongo', (callback) => {
  const dbProcess = spawn('mongod');
  dbProcess.stderr.on('data', consoleLog);
  dbProcess.on('close', (code) => {
    consoleLog(`Database was stopped with code ${code}`);
    callback();
  });
});


gulp.task('run:dev', gulp.parallel('mongo', 'client', 'server'));
