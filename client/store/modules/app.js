import * as types from '../mutation-types'

const state = {
  device: {
    isMobile: false,
    isTablet: false
  },
  sidebar: {
    opened: true,
    hidden: false
  },
  effect: {
    translate3d: true
  },
  // 是否登录页
  loginPage: false,
}

const mutations = {
  [types.TOGGLE_DEVICE] (state, device) {
    state.device.isMobile = device === 'mobile'
    state.device.isTablet = device === 'tablet'
  },

  [types.TOGGLE_SIDEBAR] (state, config) {
    if (state.device.isMobile && config.hasOwnProperty('opened')) {
      state.sidebar.opened = config.opened
    } else {
      state.sidebar.opened = true
    }

    if (config.hasOwnProperty('hidden')) {
      state.sidebar.hidden = config.hidden
    }
  },

  // [types.SWITCH_EFFECT] (state, effectItem) {
  //   for (let name in effectItem) {
  //     state.effect[name] = effectItem[name]
  //   }
  // },

  loginPage (state, option) {
    state.loginPage = option.loginPage
  },

}

export default {
  state,
  mutations
}
