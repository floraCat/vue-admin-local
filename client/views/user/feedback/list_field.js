
export default function checkField (_this) {
  let ables = []
/*---------------------------*/
ables.push({
    'key'        : 'naireCategory',
    'label'       : '反馈类型',
    'listAble'   : true,
    'viewAble'   : true,
    'searchAble' : true,
  })
/*---------------------------*/
ables.push({
    'key'        : 'mobile',
    'label'       : '用户电话',
    'listAble'   : true,
    'viewAble'   : true,
  })
/*---------------------------*/
ables.push({
    'key'        : 'blanks',
    'label'       : '留言',
    'listAble'   : true,
    'viewAble'   : true,
  })
/*---------------------------*/
  return ables
}
