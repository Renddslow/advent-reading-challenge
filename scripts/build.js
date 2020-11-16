const path = require('path');
const fs = require('fs');
const readFile = require('util').promisify(fs.readFile);
const papa = require('papaparse');
const pupa = require('pupa');
const prettier = require('prettier');

const read = async (p) => (await readFile(p)).toString();
const write = require('util').promisify(fs.writeFile);

const Day = require('./day-template');

const [year] = process.argv.slice(2);

(async () => {
  const template = await read(path.join(__dirname, '../templates', `${year}.html`));
  const csv = await read(path.join(__dirname, '../data', `${year}.csv`));
  const { data } = papa.parse(csv);

  const table = data.slice(1).reduce((acc, v) => {
    const [day, pss, torah, prophets, nt] = v;
    acc.push({ day, pss, torah, prophets, nt });
    return acc;
  }, []);

  const calendar = table.map(Day).join('\n');
  const html = prettier.format(pupa(template, { calendar }), { parser: 'html' });

  await write(path.join(__dirname, '../public', year, 'index.html'), html);

  if (new Date().getFullYear() === Number(year)) {
    await write(path.join(__dirname, '../public', 'index.html'), html);
  }
})();
