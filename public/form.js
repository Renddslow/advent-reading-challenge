!(async function () {
  document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email');
    email.disabled = true;

    const button = document.querySelector('button[type="submit"]');
    button.disabled = true;
    button.innerText = 'Sending...';

    await fetch('/.netlify/functions/signup', {
      method: 'POST',
      body: JSON.stringify({
        data: {
          type: 'email_signup',
          attributes: {
            email: email.value,
          },
        },
      }),
    });

    const form = document.querySelector('form');

    Array.prototype.slice.call(form.children).forEach((el) => {
      el.style.display = 'none';
    });

    const p = document.createElement('p');
    const strong = document.createElement('strong');
    strong.innerText = `You're in! I'm so excited to read the Scriptures with you!`;
    p.append(strong);
    form.append(p);
  });
})();
