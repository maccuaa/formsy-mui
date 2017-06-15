/* eslint-disable no-console */
import path from 'path';
import fse from 'fs-extra';

const files = [
  'README.md',
  'CHANGELOG.md',
  'LICENSE'
];

Promise.all(
  files.map((file) => copyFile(file))
).then(() => createPackageFile())
.catch((e) => {
  throw e;
});

async function copyFile (file) {
  const buildPath = resolveBuildPath(file);

  try {
    await fse.copy(file, buildPath);
    console.log(`Copied ${file} to ${buildPath}`);
  } catch (e) {
    throw e;
  }
}

function resolveBuildPath (file) {
  return path.resolve(__dirname, '../build/', path.basename(file));
}

async function createPackageFile () {
  try {
    const data = await fse.readFile(path.resolve(__dirname, '../package.json'), 'utf8');
    const packageData = JSON.parse(data);

    const {
      author,
      version,
      description,
      keywords,
      repository,
      license,
      bugs,
      homepage,
      peerDependencies,
      dependencies
    } = packageData;

    const minimalPackage = {
      name: 'formsy-mui',
      author,
      version,
      description,
      main: './index.js',
      module: './index.es.js',
      keywords,
      repository,
      license,
      bugs,
      homepage,
      peerDependencies,
      dependencies
    };

    const buildPath = path.resolve(__dirname, '../build/package.json');
    const newData = JSON.stringify(minimalPackage, null, 2);

    fse.writeFile(buildPath, newData);

    console.log(`Created package.json in ${buildPath}`);
  } catch (e) {
    throw e;
  }
}
