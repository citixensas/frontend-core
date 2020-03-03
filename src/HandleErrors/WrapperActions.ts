import './types'
import GetTypeError from './GetTypeError'

export default class WrapperActions extends GetTypeError {
  public async run(logic: Logic, name: string, dispatch: Dispatch, getState: any, params?: object , preRun?: Logic, postRun?: Logic, fail?: Logic) {
    try {
      if (!!preRun) await preRun(dispatch, getState, params)
      const isRefresh = JSON.parse(localStorage.getItem('isRefresh') as any)
      if (!isRefresh) await logic(dispatch, getState, params)
      else dispatch(this.addAction({name, params}))
      if (!!postRun) await postRun(dispatch, getState, params)
    } catch (e) {
      try {
        if (!!fail) await fail(dispatch, getState, params)
        const token = getState().auth.login.authenticated
        const run = this.getTypeError(e)
        if (!!run) await run(e, dispatch, name, params, getState, token)
      } catch (err) {
        throw err
      }
      throw e
    }
  }
}
