export const Stack = class Stack {
  constructor(params) {
    const { objUpdateHelper = () => {} } = params || {}
    this.list = [
      {
        title: 1
      }
    ]
    this.objUpdateHelper = objUpdateHelper
  }
}

export const getMutations = (store) => {
  return {
    updateList() {
      const list = [
        {
          title: 1
        },
        {
          title: 2
        },
        {
          title: 3
        }
      ]
      store.list = list
    },
    updateListInfo() {
      const labels = [
        { labelTitle: 'label1' },
        { labelTitle: 'label2' },
        { labelTitle: 'label3' }
      ]
      store.list[0]['labels'] = labels
      // Vue2 Array polyfill
      store.objUpdateHelper(store.list[0], 'labels', labels)
    },
    refreshList() {
      store.list = JSON.parse(JSON.stringify(store.list))
    }
  }
}
