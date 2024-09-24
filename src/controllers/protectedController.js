export const renderProtectedPage = (req, res) => {
  const { user } = req.session
  if (!user) return res.status(401).send('Unauthorized')

  res.render('layout', { user, body: 'protected' })
}
