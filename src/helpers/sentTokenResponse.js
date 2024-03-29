const { sendResponse } = require('./response')

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken()

  let options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 10000
    ),
    httpOnly: true
  }

  if (process.env.NODE_ENV === 'production') {
    options.secure = true
  }

  return sendResponse(
    res,
    {
      status: 'Sucess',
      token,
      user
    },
    statusCode,
    'application/json',
    (setCookie = process.env.NODE_ENV ? true : false),
    (options = options)
  )
}

module.exports = sendTokenResponse
