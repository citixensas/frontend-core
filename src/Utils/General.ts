import _ from 'lodash'

export const isMobile = () => navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)

export const renderImageUrl = (image_url: any) => !!image_url ? image_url : ''

export const CitixenAudio = new Audio('assets/audio/notification.mp3')

const raiseChildren = (nav: any): any => {
  if (!Array.isArray(nav)) {
    const {url, auth, children} = nav
    if (!!children) return raiseChildren(children)
    else return {url, auth}
  } else {
    return _.flattenDeep(nav.map(({url, auth, children}) => (!!children) ? raiseChildren(children) : {url, auth}))
  }
}

export const firstCase = (word: any) => !!word ? word.substr(0, 1).toUpperCase() : ''

export const beforeRouter = (pathname: any, requireAuth: any, token: any, headquarter: any) => {
  if (requireAuth) {
    if (!token && !headquarter) return '/login'
    if (!!token) {
      if (!headquarter && pathname !== '/select-headquarter') return '/select-headquarter'
      if (pathname === '/login') return '/desktop'
    }
  }
  return pathname
}

export const redirectTo = (navigation: any[]) => {
  let paths = [...navigation].map(({url, auth, children}) => raiseChildren({url, auth, children}))
  paths = _.flattenDeep([...paths])
  return paths
}

export const getAllConfigurations = () => {
  const requireAll = (modules: any) => modules.keys().filter((filename: any) => filename !== "./index.js")
  let context: any;
  context = require.context('app/', true, /\/main\/pages[\/a-zA-Z0-9]*\/*Config.js$/);
  const requireModule = requireAll(context)
  return [...requireModule].map(fileName => context(fileName).default)
}

export const Recycler_dateStyle = (time_: any) => (
  new Date(time_).toLocaleString('es-CO', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true
  })
)
