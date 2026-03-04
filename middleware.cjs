module.exports = (req, res, next) => {
  if (req.method === 'POST' && (req.path === '/login' || req.path === '/api/auth/login')) {
    res.status(200).json({
      token: "fake-jwt-token-for-testing",
      user: {
        id: 1,
        name: "Admin",
        email: "admin@example.com",
        role_id: 1
      }
    })
  } else {
    next()
  }
}
