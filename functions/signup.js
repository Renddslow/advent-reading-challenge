const got = require('got');
const catchify = require('catchify');

const listID = 510586;
const baseURL = `https://us7.api.mailchimp.com/3.0/lists/${listID}/members`;
const MAILCHIMP_KEY = process.env.MAILCHIMP_KEY;

exports.handler = async (event) => {
  const { attributes } = JSON.parse(event.body).data;

  const body = {
    email_address: attributes.email,
    status: 'subscribed',
    email_type: 'html',
  };

  const [err, response] = await catchify(
    got(baseURL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `mubatt@wyopub.com:${MAILCHIMP_KEY}`,
      },
      body: JSON.stringify(body),
    }).then((d) => JSON.parse(d.body)),
  );

  console.error(err);

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: {
        type: 'sign_up',
        id: response && response.id,
        attributes: {
          created: new Date().toISOString(),
          email: attributes.email,
        },
      },
    }),
  };
};
