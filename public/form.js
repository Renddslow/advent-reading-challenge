!(async function () {
  document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;

    const res = await fetch('/.netlify/functions/signup', {
      method: 'POST',
      body: JSON.stringify({
        data: {
          type: 'email_signup',
          attributes: {
            email,
          },
        },
      }),
    });

    console.log(res);
  });
})();
