import Options from "./Options"
import iziToast, {IziToastSettings} from 'izitoast'

export default class MessagesClass extends Options {

  error(message: string, title: string = '', id: string = '') {
    const options = this.getOptions('error', {message, title, id})
    iziToast.show(options)
  }

  success(message: string, title: string = '', id: string = '') {
    const options = this.getOptions('success', {message, title, id})
    iziToast.show(options)
  }

  warning(message: string, title: string = '', id: string = '') {
    const options = this.getOptions('warning', {message, title, id})
    iziToast.show(options)
  }

  info(message: string, title: string = '', id: string = '') {
    const options = this.getOptions('info', {message, title, id})
    iziToast.show(options)
  }

  chat(type?:string, title?:string, message?:string, by?:any, options?:IziToastSettings) {
    const completeOptions = {
      image: `/assets/images/icons/${by}.svg`,
      title,
      ...options
    }
    iziToast.show({...this.getChatOptions(message,type, completeOptions)})
  }
}
