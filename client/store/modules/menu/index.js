import * as types from '../../mutation-types'

const state = {

  // 菜单对象
  items: [],

  // 三级菜单的id（如商品管理的分类管理）
  subItemOn: null
}

const mutations = {
  [types.EXPAND_MENU] (state, option) {
    state.items[option.index].expanded = option.expanded
  },
  items (state, options) {
    state.items = options.items
  },
  subItemOn (state, options) {
    state.subItemOn = options.subItemOn
  },
}

export default {
  state,
  mutations
}
