const fetch = require('node-fetch')

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const params = new URLSearchParams(event.body)
  const token = params.get('g-recaptcha-response')
  const secret = process.env.RECAPTCHA_SECRET_KEY

  const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${secret}&response=${token}`,
  })

  const data = await verifyRes.json()

  if (!data.success || data.score < 0.5 || data.action !== 'submit') {
    return {
      statusCode: 403,
      body: JSON.stringify({ message: 'Failed reCAPTCHA verification' }),
    }
  }

  // At this point, the form is verified and likely human
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Form submitted successfully!' }),
  }
}
