/*
 * Custom DOM event that fires when an input has stopped changing
 * for n milliseconds.
 *
 * Useful for waiting until a user has possibly stopped typing before doing
 * something with their input.
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* keep track of added listeners so they can be removed later */
const listeners = new WeakMap(),
  defaults = {
    wait: 400,
    eventName: "input:hesitation",
    listenEvent: "input",
    checkValidity: false
  }

export default class Hesitation {

  /**
   *  Adds an event dispatcher to an input element
   */
  static addTo(inputElement, options) {
    /* remove previously added listener if it exists */
    Hesitation.removeFrom(inputElement)
    const settings = Object.assign({}, defaults, options)
    const listenerFunction = (event) => {
      const inputValue = event.target.value
      if (!settings.checkValidity || event.target.checkValidity()) {
        setTimeout(() => {
          if (inputValue === event.target.value) {
            /* value has not changed since timeout started */
            event.target.dispatchEvent(new Event(settings.eventName))
          }
        }, settings.wait)
      }
    }
    inputElement.addEventListener(settings.listenEvent, listenerFunction)
    listeners.set(inputElement, {
      listener: listenerFunction,
      listenEvent: settings.listenEvent
    })
  }

  /**
   *  Removes an event dispatcher from an input element
   */
  static removeFrom(inputElement) {
    if (listeners.has(inputElement)) {
      inputElement.removeEventListener(listeners.get(inputElement).listenEvent, listeners.get(inputElement).listener)
      listeners.delete(inputElement)
    }
  }

}
