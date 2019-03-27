
export default {
  ttlTxt: function (val) {
    switch(val) {
      case 'add':
        return '添加'
        break;
      case 'modify':
        return '修改'
        break;
      case 'view':
        return '明细'
        break;
    }
  },
  ttlTxt2: function (val) {
    switch(val) {
      case 'del':
        return '删除'
        break;
      case 'dels':
        return '删除所选'
        break;
      case 'note':
        return '提示'
        break;
    }
  },
  checkToTxt: function (val, label, val0, val1) {
    /*时间格式转换*/
    let timeFormat = function(obj) {
      let data = '';
      if (obj) {
        let add = function(m){return m<10?'0'+m:m }
        let time = new Date(obj);  
        let y = time.getFullYear();  
        let m = time.getMonth()+1;  
        let d = time.getDate();  
        let h = time.getHours();  
        let mm = time.getMinutes();  
        let s = time.getSeconds();  
        data = y+'-'+add(m)+'-'+add(d)+' '+add(h)+':'+add(mm)+':'+add(s); 
      }
      return data;
    }
    // 毫秒转时分秒
    let timeHandle = function (obj) {
      let hour = Math.floor(obj/3600000)
      let remain_hour = obj%3600000
      let _hour = hour ? hour + '小时' : ''
      let minute = Math.floor(remain_hour/60000)
      let remain_minute = remain_hour%60000
      let _minute = minute ? minute + '分钟' : ''
      let second = Math.floor(remain_minute/1000)
      let remain_second = remain_minute%1000
      let _second = second ? second + '秒' : ''
      let _ms = remain_second ? remain_second + '毫秒' : ''
      return _hour + _minute + _second + _ms
    }
    switch(label) {
      /*val0未单选值0对应文本;val1未单选值1对应文本;
      由able.editObj.val0和able.editObj.val1设置*/
      case 'status':
        var _val1 = val1 ? val1 : '有效'
        var _val0 = val0 ? val0 : '无效'
        return val ? _val1 : _val0
        break;
      case 'topicStatus':
        var _val1 = val1 ? val1 : '有效'
        var _val0 = val0 ? val0 : '无效'
        return val ? _val1 : _val0
        break;
      case 'naireStatus':
        var _val1 = val1 ? val1 : '有效'
        var _val0 = val0 ? val0 : '无效'
        return val ? _val1 : _val0
        break;
      case 'goodsStatus':
        return val ? '上架' : '下架'
        break;
      case 'remoteStatus':
        switch(val) {
          case '0':
            return '未开始'
            break;
          case '1':
            return '执行中'
            break;
          case '2':
            return '执行完成'
            break;
          case '3':
            return '执行成功'
            break;
          default:
            return ''
        }
        break;
      case 'qrCodeStatus':
        switch(val) {
          case '100':
            return '生成失败'
            break;
          case '200':
            return '生成成功'
            break;
          case '300':
            return '已推送'
            break;
          case '400':
            return '推送成功'
            break;
          default:
            return ''
        }
        break;
      case 'hasChildNode':
        return val ? '有' : '没有'
        break;
      case 'createDate':
        return timeFormat(val)
        break;
      case 'openDate':
        var _rs;
        if (val && val.length === 14) {
          _rs = val
        } else {
          _rs = timeFormat(val)
        }
        return _rs
        break;
      case 'endDate':
        return timeFormat(val)
        break;
      case 'updateDate':
        return timeFormat(val)
        break;
      case 'lastLoginDate':
        return timeFormat(val)
        break;
      case 'loginDate':
        return timeFormat(val)
        break;
      case 'addedDate':
        return timeFormat(val)
        break;
      case 'offDate':
        return timeFormat(val)
        break;
      case 'currentDate':
        var _rs;
        if (val && val.length === 14) {
          _rs = val
        } else {
          _rs = timeFormat(val)
        }
        return _rs
        break;
      case 'heartbeatTime':
        return timeFormat(val)
        break;
      case 'isadmin':
        return parseInt(val) ? '是' : '否'
        break;
      case 'isDefault':
        return parseInt(val) ? '是' : '否'
        break;
      case 'payType':
        return val === 'pay_zhifubao' ? '支付宝' : '微信' // or pay_weixin
        break;
      case 'gender':
        let _gender = '未知'
        if (val === '1') { _gender = '男';}
        if (val === '2') { _gender = '女';}
        return  _gender

      case 'naireCategory':
        switch(val) {
          case 'radio':
            return '单选题'
            break;
          case 'checkbox':
            return '多选题'
            break;
          case 'fill':
            return '问答题'
            break;
          default:
            return ''
        }
        break;

      // 审核
      case 'confirm':
        return val ? '已审核' : '未审核'


      case 'boothStatus':
        switch(val) {
          case 'online':
            return '正常'
            break;
          case 'offline':
            return '离线'
            break;
          case 'instable':
            return '不稳定'
            break;
          case 'new':
            return '新设备'
            break;
          case 'other':
            return '异常'
            break;
        }
        break;
      case 'interval':
        return timeHandle(val)
        break;
      default:
        return val
    }
  }
}

  