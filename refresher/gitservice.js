/*
 * Verify GitHub webhook signature header in Node.js
 * Written by stigok and others (see gist link for contributor comments)
 * https://gist.github.com/stigok/57d075c1cf2a609cb758898c0b202428
 * Licensed CC0 1.0 Universal
 */

const crypto = require('crypto')
const express = require('express')
const bodyParser = require('body-parser')

const secret = 'ChangeMeNow';

// For these headers, a sigHashAlg of sha1 must be used instead of sha256
// GitHub: X-Hub-Signature
// Gogs:   X-Gogs-Signature
const sigHeaderName = 'X-Hub-Signature-256'
const sigHashAlg = 'sha256'

const app = express()

// Saves a valid raw JSON body to req.rawBody
// Credits to https://stackoverflow.com/a/35651853/90674
app.use(bodyParser.json({
  verify: (req, res, buf, encoding) => {
    if (buf && buf.length) {
      req.rawBody = buf.toString(encoding || 'utf8');
    }
  },
}))

function verifyPostData(req, res, next) {
  if (!req.rawBody) {
    return next('Request body empty')
  }

  const sig = Buffer.from(req.get(sigHeaderName) || '', 'utf8')
  const hmac = crypto.createHmac(sigHashAlg, secret)
  const digest = Buffer.from(sigHashAlg + '=' + hmac.update(req.rawBody).digest('hex'), 'utf8')
  if (sig.length !== digest.length || !crypto.timingSafeEqual(digest, sig)) {
    return next(`Request body digest (${digest}) did not match ${sigHeaderName} (${sig})`)
  }

  return next()
}

app.post('/githook', verifyPostData, function (req, res) {
  res.status(200).send('Request body was signed')
})

app.use((err, req, res, next) => {
  if (err) console.error(err)
  res.status(403).send('Request body was not signed or verification failed')
})

app.listen(4500,["173.21.4.2","0.0.0.0"], () => console.log("Listening on port 4500"))