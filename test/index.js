import path from 'path';
import glob from 'glob';

glob('src/**/*.spec.js', (er, files) => {
  if (er) throw er;

  files.forEach(function (file) {
    require(path.resolve(process.cwd(), file));
  });
});
