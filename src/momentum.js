import k from './keys/keys'
import { standard, shifted } from './keys/key-bindings'

export default () => {
  document.body.append(k({
    bindings: [
      standard, shifted
    ],
    stack: [1, 0],
    history: false
  }))
}