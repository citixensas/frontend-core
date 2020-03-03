import {IziToastSettings} from 'izitoast'

interface DefaultOptions {
  backgroundColor: string
  color: string
  position: string
  drag: boolean
  class: string
  layout: number
  titleColor: string
  messageColor: string
  iconColor: string
  timeout: number
  maxWidth: number
  icon?: string
}

export default class Options {

  protected getOptions(type?: string, options?: IziToastSettings): IziToastSettings {
    return {...this.getDefaultOptions(type), ...options}
  }

  protected getChatOptions(message?: string, type?: string, options?: IziToastSettings): IziToastSettings {
    return {...this.getChatDefaultOptions(message,type), ...options}
  }

  private getDefaultOptions(type?: string): any {
    if (!!type) {
      switch (type) {
        case 'error':
          return this.errorOptions
        case 'warning':
          return this.warningOptions
        case 'info':
          return this.infoOptions
        case 'success':
          return this.successOptions
        default:
          return this.defaultOptions
      }
    } else return this.defaultOptions
  }

  private getChatDefaultOptions(message?: string, type?: string): any {
    if (!!type) {
      switch (type) {
        case 'text':
          return {...this.defaultChatOptions, icon: 'fas fa-comment', message}
        case 'audio':
          return {...this.defaultChatOptions, icon: 'fas fa-microphone-alt', message: 'Nuevo audio'}
        case 'image' :
          return {...this.defaultChatOptions, icon: 'fas fa-image', message: 'Nueva imagen'}
        default:
          return {...this.defaultChatOptions, icon: 'fas fa-comment', message}
      }
    } else return {...this.defaultChatOptions, icon: 'fas fa-comment', message}
  }

  private defaultOptions = {
    position: 'topRight',
    drag: true,
    class: 'citixen-toast',
    layout: 2,
    titleColor: '#FFF',
    messageColor: '#FFF',
    iconColor: '#FFF',
    timeout: 4000,
    maxWidth: 400,
    backgroundColor: '#B6AEAE',
    color: '#FFF'
  }

  private defaultChatOptions = {
    ...this.defaultOptions,
    progressBarColor: '#3A76D3',
    backgroundColor: '#4B5263',
    titleColor: '#FFF',
    messageColor: '#c0c9da',
    imageWidth: 60,
    position: 'bottomLeft',
    timeout: 4000,
    displayMode: 2,
    id: 'new-message'
  }

  private errorOptions: DefaultOptions = {
    ...this.defaultOptions,
    backgroundColor: '#F75060',
    color: '#FFF',
    icon: 'fas fa-times-circle'
  }

  private successOptions: DefaultOptions = {
    ...this.defaultOptions,
    backgroundColor: '#22B66E',
    color: '#FFF',
    icon: 'fas fa-check-circle'
  }

  private warningOptions: DefaultOptions = {
    ...this.defaultOptions,
    backgroundColor: '#F19422',
    color: '#FFF',
    icon: 'fas fa-exclamation-triangle'
  }

  private infoOptions: DefaultOptions = {
    ...this.defaultOptions,
    backgroundColor: '#34B3E6',
    color: '#FFF',
    icon: 'fas fa-info-circle'
  }

}
