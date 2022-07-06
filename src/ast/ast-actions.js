const actions = (cursor) => ({
  create(current, type) {
    const node = ast(current, type, [])
    cursor(node)
  },
  duplicate(current, deep = false) {
    const node = ast(current.__parent, current.__type, current.__values)
    const index = current.__parent.__values.findIndex(current)
    current.__parent.__values.splice(index, 0, node)
    cursor(node)
  },
  delete(current) {
    const values = current.__parent.__values
    const index = values.indexOf(current)
    if (values.length) {
      actions.navigate.prev(current)
    } else {
      actions.navigate.up(current)
    }
    values.splice(index, 1)
  },
  wrap(current, type) {

  },
  unwrap(current) {

  },
  navigate: {
    up(current) {
      cursor(current.__parent)
    },
    down(current) {
      cursor(current.__values[0] || current)
    },
    next(current, value = 1) {
      const values = current.__parent.__values
      const index = value.indexOf(current)
      current(values[(values.length + index + value) % values.length])
    },
    prev(current) {
      actions.navigate.next(current, -1)
    }
  },
  move: {
    up() {

    },
    down() {

    },
    forward() {

    },
    back() {

    }
  },
  history: {
    undo() {

    },
    redo() {

    },
    commit() {

    },
    merge() {

    },
  }
})

export default actions;