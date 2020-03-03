import slugify from 'slugify'
import './types'

export default class GetTypeError {
  addAction: AddActionCallback
  refreshToken: RefreshTokenCallback
  openingError: OpeningErrorCallback

  constructor(addAction: AddActionCallback, refreshToken: RefreshTokenCallback, openingError: OpeningErrorCallback) {
    this.addAction = addAction
    this.refreshToken = refreshToken
    this.openingError = openingError
  }

  private getAuthenticationError(error: any): ErrorMessage | null {
    if (!!error) {
      const id = (typeof error.message === 'string' && error.message !== '') ? slugify(error.message, {lower: true}) : ''
      const message = error.message
      const title = "Error de autenticación"
      return {open: false, id, title, message}
    }
    return null
  }


  private getBadRequestErrors(errors: any): ErrorMessage[] {
    return [...errors].map(error => {
      const title = error.field.split(".").pop()
      const id = !!error.message ? slugify(error.message, {lower: true}) : ""
      return {open: false, id, title, message: error.message}
    })
  }

  private async authenticationError(e: any, dispatch: Dispatch, name: string, params: object, state: object, token: string) {
    try {
      if (token !== '') {
        let isRefresh: any = localStorage.getItem("isRefresh")
        isRefresh = JSON.parse(isRefresh)
        dispatch(this.addAction({name, params}))
        if (!isRefresh) await dispatch(this.refreshToken())
      } else if (!!e.response.data && !!e.response.data.errors && e.response.data.errors.length > 0) {
        const error = e.response.data.errors[0]
        const opening = this.getAuthenticationError(error)
        dispatch(this.openingError(opening))
      }
    } catch (err) {
      if (!!err.response.data && !!err.response.data.errors && err.response.data.errors.length > 0) {
        const error = err.response.data.errors[0]
        const opening = this.getAuthenticationError(error)
        dispatch(this.openingError(opening))
      }
      throw err
    }
  }

  private async badRequestError(e: any, dispatch: Dispatch) {
    if (!!e.response.data && !!e.response.data.errors && e.response.data.errors.length > 0) {
      const errors = this.getBadRequestErrors(e.response.data.errors)
      errors.forEach(error => dispatch(this.openingError(error)))
    }
  }

  private withoutConnectionError(e: any, type: string, dispatch: Dispatch) {
    localStorage.setItem("networkStatus", "false")
    dispatch({type, payload: false})
  }

  private serverError(e: any, dispatch: Dispatch) {
    dispatch(
      this.openingError({
        open: false,
        id: "SERVER_ERROR",
        title: "Error inesperado",
        message: "Ha ocurrido un error en el sistema, por favor intente más tarde"
      })
    )
  }

  getTypeError(e: any): any {
    if (!!e.response) {
      switch (e.response.status) {
        case 500:
          return this.serverError
        case 401:
          return this.authenticationError
        case 400:
          return this.badRequestError
        default:
          return () => {
            console.info(`errors with status code ${e.response.status} handler not implemented`)
          }
      }
    } else return this.withoutConnectionError
  }

}
