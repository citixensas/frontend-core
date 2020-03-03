import moment from "moment";

export const sortChats = (chats: any) => {
  return [...chats].sort((chat, next) => {
    if (!!chat && !!chat.messages && chat.messages.length > 0 && !!next && !!next.messages) {
      const lastMessageChat = chat.messages[chat.messages.length - 1]
      const lastMessageNext = next.messages[next.messages.length - 1]
      if (!!lastMessageChat && !!lastMessageChat.created_at && !!lastMessageNext && !!lastMessageNext.created_at) {
        const diff = moment(lastMessageChat.created_at).diff(moment(lastMessageNext.created_at))
        return (diff > 0) ? -1 : 1
      } else return -1
    }
    return 0
  })
}

export const unreadMessages = (messages: any, user: any) => {
  let unread = 0
  if (!!messages && messages.length > 0) {
    messages.map((message: any) => {
      if (!!message.seen_by) {
        if (!!message.by && message.by.uuid !== user.uuid) {
          const seen = message.seen_by.filter((by: any) => by.uuid === user.uuid)
          if (!!seen && seen.length === 0) unread += 1
        }
      } else unread += 1
      return message
    })
  }
  return unread
}

export const statusMessenger = (contact: any, messengers: any) => {
  if (!!contact) {
    const status = messengers.find((messenger: any) => messenger.uuid === contact.uuid)
    return !!status ? 'Conectado' : 'Desconectado'
  } else {
    return 'Desconectado'
  }
}

export const generateLink = (text: any) => {
  const regex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+(-?[a-zA-Z0-9])*\.)+[\w]{2,}(\/\S*)?$/
  const isLink = regex.test(text)
  let link = null
  if (isLink) {
    const haveHttp = /^(https?:\/\/)/.test(text)
    link = haveHttp ? text : `http://${text}`
  }
  return {link, isLink, text}
}
