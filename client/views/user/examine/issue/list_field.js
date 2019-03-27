
export default function checkField (_this) {
  let ables = []
  let apis = {
    questionApi  : window.API.url + '/topic/list?status=1' + window.API.suf,
    tags_editApi  : window.API.url + '/tags/save' + window.API.suf,
  }
/*---------------------------*/
ables.push({
    'key'        : 'title',
    'label'       : '问卷题目',
    'listAble'   : true,
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'searchAble' : false,
    'editObj'        : {
      'formCtrl'       : 'text',
      'valid'          : 'notNull',
      'placeholder'  : '请填写问卷的完整题目',
    },
  })
/*---------------------------*/
ables.push({
    'key'        : 'summary',
    'label'       : '问卷简介',
    'listAble'   : true,
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'searchAble' : false,
    'editObj'        : {
      'formCtrl'       : 'textarea',
      'placeholder'  : '请填写问卷的简单描述',
    },
  })
/*---------------------------*/
ables.push({
    'key'        : 'attrType',
    'label'       : '问题',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj': {
      'formCtrl': 'pageSelectCustom',
      'valid'   : 'notNull',
      'key2': "name",
      'arrayVal': true,
      'selectLen':2,
      'requireArr': [{
        api: apis.questionApi,
        optArr: [
          {
            key: 'title'
          }
        ]
      }]
    },
  })
/*---------------------------*/
  ables.push({
      'key'        : 'remark',
      'label'       : '备注',
      'viewAble'   : true,
      'addAble'    : true,
      'modAble'    : true,
      'editObj'        : {
        'formCtrl'       : 'textarea',
      },
  })
  /*---------------------------*/
  ables.push({
      'key'        : 'naireStatus',
      'label'       : '状态',
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
