interface ErrorMessage {
  open: boolean
  id: string
  title: string
  message: string
}

interface Action {
  name: string
  params?: object
}

type AddActionCallback = (action: Action) => any
type OpeningErrorCallback = (error: any) => any
type RefreshTokenCallback = () => any
type Dispatch = (action: any) => any
type Logic = (dispatch: Dispatch, state: any, params?: object | null) => any
