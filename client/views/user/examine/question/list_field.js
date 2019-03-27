
export default function checkField (_this) {
  let ables = []
/*---------------------------*/
ables.push({
    'key'        : 'naireCategory',
    'label'       : '问题类型',
    'type_question': 'radio&checkbox&fill',
    'modAble'    : true,
    'listAble'   : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'text',
      'modReadOnly'    : true
    },
  })
/*---------------------------*/
// ables.push({
//     'key'        : 'attr',
//     'label'       : '问题属性',
//     'type_question': 'radio&checkbox&fill',
//     'addAble'    : true,
//     'modAble'    : true,
//     'viewAble'   : true,
//     'searchAble' : false,
//     'editObj'        : {
//       'formCtrl'       : 'select',
//       'valid'          : 'notNull',
//     },
//     'selectObj'  :  {
//       opts: [{val:1,option:'公共题库'},{val:2,option:'机场题库'}],
//     }
//   })
/*---------------------------*/
ables.push({
    'key'        : 'title',
    'label'       : '问题',
    'type_question': 'radio&checkbox&fill',
    'listAble'   : true,
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'text',
      'valid'          : 'notNull',
    },
  })
/*---------------------------*/
ables.push({
    'key'        : 'choiceList',
    'label'       : '选项',
    'type_question': 'radio&checkbox',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'textUnit',
      'placeholder'  : '请填写选项值',
    },
  })
/*---------------------------*/
// ables.push({
//     'key'        : 'blanks',
//     'label'       : '问答题',
//     'type_question': 'fill',
//     'viewAble'   : true,
//     'editObj'        : {
//       'formCtrl'       : 'text',
//       'placeholder'  : '请填写您的答案',
//     },
//   })
/*---------------------------*/
  ables.push({
      'key'        : 'remark',
      'label'       : '备注',
      'type_question': 'radio&checkbox&fill',
      'addAble'    : true,
      'modAble'    : true,
      'viewAble'   : true,
      'editObj'        : {
        'formCtrl'       : 'textarea',
      },
  })
/*---------------------------*/
  ables.push({
      'key'        : 'topicStatus',
      'label'       : '状态',
      'type_question': 'radio&checkbox&fill',
      'defVal'       : 0,
      'listAble'   : true,
      'viewAble'   : true,
      'addAble'    : true,
      'modAble'    : true,
      'editObj'        : {
        'formCtrl'       : 'radio',
      },
  })
/*---------------------------*/
  return ables
}
