import dotenv from 'dotenv';
import chalk from 'chalk';
import readline from 'readline';
import fs from 'fs';
import mysql from 'mysql2/promise';
import child_process from 'node:child_process';
import bycrypt from 'bcrypt';

dotenv.config({ path: '.env.local' });

const env = {
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,

  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,

  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,

  MAIL_FROM: process.env.MAIL_FROM,
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ask = () => {
  console.clear();

  console.log(`${chalk.bold.green('Setup Script')}    ${chalk.blue('v2.0.0')}`);

  if (env.DB_NAME !== undefined && env.DB_USER !== undefined && env.DB_PASS !== undefined && env.DB_HOST !== undefined && env.DB_PORT !== undefined) {
    console.log('');
    console.log(`${chalk.magenta('DB_NAME=')}${chalk.green(env.DB_NAME)}`);
    console.log(`${chalk.magenta('DB_USER=')}${chalk.green(env.DB_USER)}`);
    console.log(`${chalk.magenta('DB_PASS=')}${chalk.green(env.DB_PASS)}`);
    console.log(`${chalk.magenta('DB_HOST=')}${chalk.green(env.DB_HOST)}`);
    console.log(`${chalk.magenta('DB_PORT=')}${chalk.green(env.DB_PORT)}`);
    console.log('');
    console.log(`${chalk.magenta('JWT_SECRET=')}${chalk.green(env.JWT_SECRET)}`);
    console.log(`${chalk.magenta('JWT_EXPIRES_IN=')}${chalk.green(env.JWT_EXPIRES_IN)}`);
    console.log('');
    console.log(`${chalk.magenta('SMTP_HOST=')}${chalk.green(env.SMTP_HOST)}`);
    console.log(`${chalk.magenta('SMTP_PORT=')}${chalk.green(env.SMTP_PORT)}`);
    console.log(`${chalk.magenta('SMTP_USER=')}${chalk.green(env.SMTP_USER)}`);
    console.log(`${chalk.magenta('SMTP_PASS=')}${chalk.green(env.SMTP_PASS)}`);
    console.log('');
    console.log(`${chalk.magenta('MAIL_FROM=')}${chalk.green(env.MAIL_FROM)}`);
    console.log('');

    rl.question(chalk.bold(`Is this correct? (${chalk.green('Y')}/${chalk.red('N')}) `), async answer => {
      if (answer.toLowerCase() === 'y') {
        writeEnv();
        setupDatabase();
      } else if (answer.toLowerCase() === 'n') {
        console.clear();

        console.log(`${chalk.bold.green('Setup Script')}    ${chalk.blue('v2.0.0')}`);
        console.log('');
        console.log(chalk.bold('Please enter the correct values:'));

        await askEnvs();

        ask();
      } else {
        console.log(chalk.bold.red('Please enter Y or N'));
        ask();
      }
    });
  } else {
    console.log(chalk.bold('Please enter the following values:'));

    new Promise(async resolve => {
      await askEnvs();

      ask();
    }).then(r => {});
  }
};

const askEnvs = async () => {
  await askEnv('DB_NAME');
  await askEnv('DB_USER');
  await askEnv('DB_PASS');
  await askEnv('DB_HOST');
  await askEnv('DB_PORT');

  await askEnv('JWT_SECRET');
  await askEnv('JWT_EXPIRES_IN');

  await askEnv('SMTP_HOST');
  await askEnv('SMTP_PORT');
  await askEnv('SMTP_USER');
  await askEnv('SMTP_PASS');

  await askEnv('MAIL_FROM');
}

const askEnv = async (envName) => {
  env[envName] = await new Promise(resolve => {
    rl.question(chalk.magenta(`${envName}(${chalk.green(`${env[envName]}`)})=`), resolve);
  });
};

const writeEnv = () => {
  const fileRead = fs.readFileSync('.env', 'utf8');

  let fileLines = fileRead.split('\n');

  fileLines.forEach((l, i) => {
    const envName = l.split('=')[0];

    if (env[envName] !== undefined) {
      fileLines[i] = `${envName}=${env[envName]}`;
    }
  });

  const fileWrite = fileLines.join('\n');

  fs.writeFileSync('.env.local', fileWrite);
}

const setupDatabase = async () => {
  const connection = await mysql.createConnection({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
  });

  const setupSql = fs.readFileSync('tools/setup.sql', 'utf8');

  const queries = setupSql.split('###');

  try {
    for (const q of queries) {
      await connection.query(q);
    }

    askYesNoQuestion('Do you want to create an admin user?', answer => {
      if (answer) {
        createUser();
      } else {
        askYesNoQuestion('Do you want to build the project?', answer => {
          if (answer) {
            build();
          } else {
            console.log(chalk.bold.green('Setup Complete.'));

            rl.close();
            process.exit(0);
          }
        });
      }
    });
  } catch (err) {
    console.clear();

    console.log(`${chalk.bold.green('Setup Script')}    ${chalk.blue('v2.0.0')}`);
    console.log('');
    console.log(chalk.bold.red(err.message));

    askYesNoQuestion('Do you want to try again?', answer => {
      if (answer) {
        ask();
      } else {
        console.clear();
        console.log(chalk.bold.red('Setup Failed.'));

        rl.close();
        process.exit(1);
      }
    });
  }
}

const user = {
  display_name: '',
  username: '',
  email: '',
  password: ''
}

const createUser = async () => {
  console.clear();

  console.log(`${chalk.bold.green('Setup Script')}    ${chalk.blue('v2.0.0')}`);
  console.log('');
  console.log(chalk.bold('Please enter the following values:'));

  if(user.display_name !== '' && user.username !== '' && user.email !== '' && user.password !== '') {
    console.log('');
    console.log(`${chalk.magenta('display_name=')}${chalk.green(user.display_name)}`);
    console.log(`${chalk.magenta('username=')}${chalk.green(user.username)}`);
    console.log(`${chalk.magenta('email=')}${chalk.green(user.email)}`);
    console.log(`${chalk.magenta('password=')}${chalk.green(user.password)}`);
    console.log('');

    askYesNoQuestion('Is this correct?', async answer => {
      if (answer) {
        const hashedPassword = await bycrypt.hash(user.password, 10);

        const connection = await mysql.createConnection({
          host: env.DB_HOST,
          port: env.DB_PORT,
          user: env.DB_USER,
          password: env.DB_PASS,
          database: env.DB_NAME,
        });

        const sql = `
          INSERT INTO users (display_name, username, email, password)
          VALUES ('${user.display_name}', '${user.username}', '${user.email}', '${hashedPassword}')
        `;

        try {
          const result = await connection.query(sql);

          console.log(chalk.bold.green('Admin user created.'));

          askYesNoQuestion('Do you want to build the project?', answer => {
            if (answer) {
              build();
            } else {
              console.log(chalk.bold.green('Setup Complete.'));

              rl.close();
              process.exit(0);
            }
          });
        } catch (err) {
          console.clear();

          console.log(`${chalk.bold.green('Setup Script')}    ${chalk.blue('v2.0.0')}`);
          console.log('');
          console.log(chalk.bold.red(err.message));

          askYesNoQuestion('Do you want to try again?', answer => {
            if (answer) {
              createUser();
            } else {
              console.clear();
              console.log(chalk.bold.red('Setup Failed.'));

              rl.close();
              process.exit(1);
            }
          });
        }
      } else {
        await askUser();
      }
    });
  } else {
    await askUser();
    createUser();
  }
}

const askUser = async () => {
  await askUserField('display_name');
  await askUserField('username');
  await askUserField('email');
  await askUserField('password');
}

const askUserField = async (field) => {
  user[field] = await new Promise(resolve => {
    rl.question(chalk.magenta(`${field}(${chalk.green(`${user[field]}`)})=`), resolve);
  });
}

const build = () => {
  console.log(chalk.bold('Building...'));

  const build = child_process.execSync('pnpm run build');

  build.stdout.on('data', (data) => console.log(data));
  build.stderr.on('data', (data) => console.error(data));

  console.log(chalk.bold.green('Setup Complete.'));

  rl.close();
  process.exit(0);
}

const askYesNoQuestion = (q, c) => {
  rl.question(chalk.bold(`${q} (${chalk.green('Y')}/${chalk.red('N')}) `), answer => {
    if (answer.toLowerCase() === 'y') {
      c(true);
    } else if (answer.toLowerCase() === 'n') {
      c(false);
    } else {
      askYesNoQuestion(q, c);
    }
  });
}

ask();