import MessagesClass from '../Messages/Messages'

const Messages = new MessagesClass()

export const CreateNotification = async (title: any, message: any, type: any, by: any) => {
  const focus = JSON.parse(localStorage.getItem('focus') as any)
  if (!focus) {
    if ("Notification" in window) {
      const options = {
        icon: 'assets/images/logos/citixen.png',
        silent: true,
      }
      if (Notification.permission === "granted") {
        const notify = new Notification(title, {body: message, ...options})
        notify.onclick = (e) => {
          e.preventDefault()
          window.focus()
        }
        return notify
      }
      if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission()
        if (permission === "granted") return new Notification(title, options)
      }
    }
  } else {
    Messages.chat(type, title, message, by)
  }
}
