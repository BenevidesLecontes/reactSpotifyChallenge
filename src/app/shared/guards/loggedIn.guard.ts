import spotifyApiService from '../../services/spotifyApiService'

export default async function loggedInGuard(to, from, next) {
  console.log(to, spotifyApiService.isLoggedIn)
  if (spotifyApiService.isLoggedIn) {
    next()
  } else {
    try {
      await spotifyApiService.requestAccessToken()
      next()
    } catch (e) {
      next().redirect('/')
    }
  }
}
