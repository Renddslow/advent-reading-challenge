const clean = (vv) => vv.split(',').join(', ');

const Day = ({ day, pss, torah, prophets, nt }) => {
  const [m, d] = day.split('/');
  const month =
    m === '11' ? { long: 'November', short: 'Nov' } : { long: 'December', short: 'Dec' };

  return `
<div class="day-card">
  <header>
    <h2 aria-label="${month.long} ${d}" data-month="${month.short}">${d}</h2>
  </header>
  <div class="grid">
    <div class="pss-row">
      <span>Psalms</span>
      <span>${clean(pss)}</span>
    </div>
    <div class="row">${clean(torah)}</div>
    <div class="row">${clean(prophets)}</div>
    <div class="row">${clean(nt)}</div>
  </div>
</div>
`.trim();
};

module.exports = Day;
