export default function ({ req, res, redirect }) {
    console.log(req.headers['x-forwarded-proto'])
    // Check if the request is secure (HTTPS)
    if (req.headers['x-forwarded-proto'] !== 'https') {
      // Redirect to HTTPS version of the URL
      return redirect(`https://${req.headers.host}${req.url}`)
    }
  }
  