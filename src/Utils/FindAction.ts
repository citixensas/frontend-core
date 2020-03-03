const getAllActions = (): any => {
  const requireAll = (modules: any) => modules.keys().filter((filename: any) => filename !== "./index.js")
  const context = require.context('app/', true, /\/store\/actions[\/a-zA-Z0-9]*\/index.js$/)
  const requireModule = requireAll(context)
  let modules = {}
  requireModule.forEach((fileName: any) => {
    modules = {...modules, ...context(fileName).default}
  })
  return modules
}

export const FindAction = (module: any, name: any) => getAllActions()[module][name]
