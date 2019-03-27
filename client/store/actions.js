import * as types from './mutation-types'

export const toggleSidebar = ({ commit }, config) => {
  if (config instanceof Object) {
    commit(types.TOGGLE_SIDEBAR, config)
  }
}

export const toggleDevice = ({ commit }, device) => commit(types.TOGGLE_DEVICE, device)

export const expandMenu = ({ commit }, expanded) => {
	expanded = expanded || false
	commit(types.EXPAND_MENU, expanded)
}

// export const switchEffect = ({ commit }, effectItem) => {
//   if (effectItem) {
//     commit(types.SWITCH_EFFECT, effectItem)
//   }
// }
