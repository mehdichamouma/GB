import {setToken} from "./ApiConnector"

export default {
  state: {
    isConnected: false,
    user: null,
    token: null,
  },
  setUserAction(x) {
    this.state.user = x
  },
  setUserToken(token) {
    localStorage.userToken = token
    setToken(token)
    this.state.token = token
  },
  getUserToken() {
    if(this.state.token) {
      return this.state.token
    }
    else {
      let token = localStorage.userToken
      if(token) {
        this.setUserToken(token)
        return token
      }
      return null
    }
  },
}
