const exec = require('meta-exec');

function gitClone({ cb, dest, repoUrl, repoBranch, gitExists }) {
  console.log({ repoUrl, repoBranch, dest });

  if (!gitExists) {
    exec(
      {
        command: `git clone ${repoUrl} ${dest}`,
        suppressLogging: false,
      },
      err => {
        if (err) cb(err);
      }
    );
  } else {
    console.log(`Found pre-existing git repository at ${dest}. Will not clone ${repoUrl}.`); // prettier-ignore
  }

  process.chdir(dest);
  console.log(`Pulling from origin/${repoBranch}...`);
  exec(
    {
      command: `git checkout ${repoBranch}; git pull origin ${repoBranch}`,
      suppressLogging: false,
      stdio: 'ignore',
    },
    err => {
      if (err) {
        console.log(`branch ${repoBranch} does not exist`);
      }
      cb(err);
    }
  );
}

module.exports = gitClone;
