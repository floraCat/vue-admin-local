
const state = {
  popPage_show: false,
  popPage_opts: {},
  edit_show: false,
  edit2_show: false,
  edit3_show: false,
  edit4_show: false,
  edit_opts: {},
  edit_note: 0,
  edit_add: 0
}

const mutations = {
  popPage_show (state, option) {
    state.popPage_show = option
  },
  popPage_opts (state, option) {
    state.popPage_opts = option
  },
  /*--------*/
  edit_show (state, option) {
    state.edit_show = option
  },
  edit2_show (state, option) {
    state.edit2_show = option
  },
  edit3_show (state, option) {
    state.edit3_show = option
  },
  edit4_show (state, option) {
    state.edit4_show = option
  },
  edit_opts (state, option) {
    state.edit_opts = option
  },
  edit_note (state, option) {
    state.edit_note = option
  },
  edit_add (state, option) {
    state.edit_add = option
  },
  /*--------*/
}

export default {
  state,
  mutations
}
