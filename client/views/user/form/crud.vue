<template>
  <div>
    <div class="myTable">
      <!--搜索-->
      <div class="xmSearch" v-if="!noObj || !noObj.search">
        <ul v-for="(_val,_key) in searchBlock.itemObj">
          <!--下拉选项(如监控的日期下拉)-->
          <li v-if="_val.opts">
            <label v-text="_val.label + '：'"></label>
            <select @change="dataSelect($event)" :data-key="_val.key">
              <option value="">全部</option>
              <option v-for="(opt,index) in _val.opts" :value="opt.val" v-text="opt.txt" :selected="_val.defOpt && opt.val==_val.defOpt.val"></option>
            </select>
          </li>
          <!--注册日期区间-->
          <li v-else-if="_val.key === 'registerDate'" class="control">
            <label v-text="_val.label + '：'"></label>
            <datepicker ref="date" class="datePicker" v-model="searchDate" placeholder="选择日期区间" :config="{ mode: 'range',wrap: true }">
            </datepicker>
          </li>
          <!--除外都为input-->
          <li v-else>
            <label v-text="_val.label + '：'"></label>
            <input type="text" v-model="searchBlock.submitObj[_key]" />
          </li>
        </ul>
        <ol style="overflow:hidden;" >
          <li class="li">
            <input class="btn" type="button" value="搜索" @click="search()">
          </li>
          <li class="li">
            <input class="btn" type="button" value="恢复" @click="search('all')">
          </li>
        </ol>
      </div>

      <article class="box">

        <!--添加btn-->
        <h4 class="_title" v-if="!noObj || !noObj.add">
          <a href="javascript:;" @click="addItem()">
            <i class="fa fa-plus"></i>
            添加条目
          </a>
        </h4>
        
        <a class="addToSelect added fr" v-if="noObj && noObj.return" href="javascript:history.go(-1)">返回上一级</a>

        <!--导出btn-->
        <div v-if="specHandle && specHandle === 'export'">
          <app-export 
            ref="excelHandle"
            :pageObj="pageObj"
          ></app-export>
        </div>

        <!--导入btn-->
        <div v-if="specHandle && specHandle === 'import'">
          <app-import
            ref="excelHandle"
            @importList = "importList"
          ></app-import>
        </div>

        <!--选择删除btn-->
        <h4 class="_title">
          <a href="javascript:;" @click="selectedDel()" v-if="!noObj || !noObj.dels">
            <i class="fa fa-trash-o"></i>
            删除所选
          </a>
        </h4>

        <!--主动拉取最新数据btn （例：公众号关注）-->
        <h4 class="_title fr mgR0" v-if="specHandle && specHandle.indexOf('update') >= 0">
          <a href="javascript:;" @click="updateApp()">
            <i class="fa fa fa-star"></i>
            拉取最新
          </a>
        </h4>

        <!--刷新btn （如监控刷新页面）-->
        <h4 class="_title fr" :class="{mgR0:specHandle && specHandle.indexOf('refresh') >= 0}" v-if="specHandle && specHandle.indexOf('refresh') >= 0">
          <a href="javascript:;" @click="refresh()">
            <i class="fa fa fa-star"></i>
            刷新
          </a>
        </h4>

        <!--监控主板入口-->
        <monitor-handle
          position="1"
          v-if="specHandle && specHandle.indexOf('monitor') >= 0"
          btnName="打开监控面板"
        >
        </monitor-handle>

        <!--list表格-->
        <table class="table">
          <thead>
            <tr>
              <th class="checkTh">
                <a href="javascript:;" class="_check" :class="{_checked:checkAll}" @click="selectAll()"><i class="fa fa-check"></i></a>
              </th>
              <th class="numTh">No.</th>
              <th v-for="(able,index) in listItems" v-text="able.text" :class="{hiddenM: !able.mobileKeep, hiddenPad: !able.padKeep}"></th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="items.length" v-for="(item,index) in items">
              <td>
                <a href="javascript:;" class="_check" :class="{_checked:item.checked}" @click="checkSelect(index)"><i class="fa fa-check"></i></a>
              </td>
              <td v-text="index+1"></td>
              
              <td v-for="(able,index0) in listItems" :class="{hasImg:able.key === 'thumbnail', hiddenM: !able.mobileKeep, hiddenPad: !able.padKeep}">

                <!--字典名称可连接到字典详情-->
                <router-link v-if="able.key === 'dicCode'" :to="{path:'/dic/detaillist', query: { dicId:item.id, dicCode:item.dicCode, dicName:item.dicName}}">
                {{item[able.key]}}
                </router-link>
                
                <!--查看字段下级信息，如商家管理的配送范围-->
                <a class="fa fa-list-alt fa-lg" v-else-if="able.specHandle === 'popPage'" @click="popPage(item.id,able.text)" title="点击查看" href="javascript:;"></a>
                
                <!--缩略图-->
                <p v-else-if="able.key === 'thumbnail' || 
                              able.key === 'goodsImage' || 
                              able.key === 'thumbnailName' || 
                              able.key === 'logo' || 
                              able.key === 'videoImage' || 
                              able.key === 'qrCodeLink' || 
                              able.key === 'categoryImage' || 
                              able.key === 'qrImage' || 
                              able.key === 'headImgUrl'">
                  <img v-if="item[able.key]" class="thumbnail" :src="item[able.key]" />
                  <img v-else class="thumbnail" src="~assets/images/no_pic_2.png" />
                </p>

                <!--可下拉切换-->
                <switch-by-sel-handle
                  v-else-if="able.key === 'orderStatus'"
                  :item="item"
                >
                </switch-by-sel-handle>

                <!--不同状态特殊样式-->
                <p v-else :class="{
                  hasBg:able.key === 'status' || 
                        able.key === 'topicStatus' || 
                        able.key === 'naireStatus' || 
                        able.key === 'boothStatus' || 
                        able.key === 'goodsStatus' || 
                        able.key === 'qrCodeStatus' || 
                        able.key === 'confirm' || 
                        able.key === 'remoteStatus' || 
                        able.key === 'permissionsId', //有背景色
                  zs:(able.key === 'status' || 
                      able.key === 'topicStatus' ||
                      able.key === 'naireStatus' ||
                      able.key === 'goodsStatus' || 
                      able.key === 'qrCodeStatus' || 
                      able.key === 'remoteStatus' ||
                      able.key === 'confirm') 
                      && item[able.key] || 
                      able.key === 'permissionsId' 
                      && item[able.key],
                  green:(able.key === 'remoteStatus' && item[able.key] === '3'),
                  gray:(able.key === 'status' || 
                        able.key === 'topicStatus' ||
                        able.key === 'naireStatus' ||
                        able.key === 'goodsStatus' || 
                        able.key === 'qrCodeStatus' || 
                        able.key === 'confirm') 
                        && !item[able.key] ||
                        able.key === 'permissionsId' 
                        && !item[able.key],
                  online:able.key === 'boothStatus' && item[able.key] === 'online', //在线
                  offline:able.key === 'boothStatus' && item[able.key] === 'offline' || 
                          able.key === 'confirm' && !item[able.key], //离线
                  new:able.key === 'boothStatus' && item[able.key] === 'new', //新设备
                  other:able.key === 'boothStatus' && item[able.key] === 'other', //其他状况
                }">

                  <!--点击切换 [商品上下架]-->
                  <switch-by-clk-handle
                    v-if="able.key === 'goodsStatus'"
                    :label="able.key"
                    :item="item"
                    :api="apiObj.switch"
                  ></switch-by-clk-handle>

                  <!--点击切换 [管理权限]-->
                  <switch-by-clk-handle
                    v-else-if="able.key === 'permissionsId'"
                    :label="able.key"
                    :item="item"
                    :api="apiObj.switch"
                  ></switch-by-clk-handle>

                  <!--远程更新重试-->
                  <span class="log" v-else-if="able.key === 'firstResults' || able.key === 'retryResults'">{{item[able.key] || '空'}}
                        <remote-handle
                            :position=2
                            v-if="able.key === 'firstResults' && item[able.key]"
                            :item="item"
                            :api="apiObj.process"
                        ></remote-handle>
                  </span>

                  <span v-else>{{item[able.key] | checkToTxt(able.key, able.editObj && able.editObj.val0, able.editObj && able.editObj.val1) }}
    
                  <!--监控设备的编码-->
                  <div style="font-size: 12px; color: #aaa;" v-if="field === 'monitorlist' && able.key === 'boxName'">编码：{{item.boxes[0].boxCode}}</div>
                  <!--设备管理的编码-->
                  <div style="font-size: 12px; color: #aaa;" v-if="field === 'box' && able.key === 'boxName'">编码：{{item.boxCode}}</div>
      
                  </span>

                </p>
                <!--商品添加规格-->
                <p v-if="able.key === 'goodsType' && item[able.key]" class="hasBg zs">
                  <a class="clickAble" @click="addGoodsType(index)">+规格</a>
                </p>
              </td>

              <td class="is-icon" :class="{handleIcons: device.isMobile}">
                <!-- 移动端显示操作下拉图标 -->
                <a class="drop" href="javascript:;" v-show="device.isMobile" @click="openHandle(index)" title="操作">
                  <i class="fa fa-gears fa-lg"></i>
                </a>
                <ol :class="[{handleOl: device.isMobile && handleOpen[index]}, {lg: field === 'role' && apiObj.bindGet}, {lg: field === 'user' && apiObj.bindGet}]">

                  <!-- 投放广告btn -->
                  <delivery-handle
                    v-if="specHandle && specHandle.indexOf('delivery') >= 0"
                    :item="item"
                    btnName="投放广告"
                  >
                  </delivery-handle>

                  <!-- 发布公告btn -->
                  <push-handle
                    v-if="specHandle && specHandle.indexOf('push') >= 0"
                    :item="item"
                    btnNameOn="发布"
                    btnNameOff="关闭发布"
                    @winPop="winPop"
                  >
                  </push-handle>

                    
                  <!-- 查看详情btn -->
                  <a href="javascript:;" @click="viewItem(index)" title="查看">
                    <i class="fa fa-eye fa-lg"></i>
                  </a>

                  <!--监控面板-->
                  <monitor-handle
                    position="2"
                    v-if="specHandle && specHandle.indexOf('monitor') >= 0"
                    :item="item"
                    btnName="打开监控面板"
                  >
                  </monitor-handle>
                  
                  <!-- 修改btn -->
                  <a href="javascript:;" @click="modItem(index)" title="编辑" v-if="!noObj || !noObj.mod">
                    <i class="fa fa-pencil fa-lg"></i>
                  </a>
                  <!-- 删除btn -->
                  <a href="javascript:;" @click="delOpen(index)" title="删除" v-if="!noObj || !noObj.del">
                    <i class="fa fa-trash-o fa-lg"></i>
                  </a>
                  <!-- 绑定角色btn -->
                  <a v-if="field === 'user' && apiObj.bindGet && isAdmin" href="javascript:;" @click="binding(index)" title="绑定角色">
                    <i class="fa fa-link fa-lg"></i>
                  </a>
                  <!-- 绑定权限btn -->
                  <a v-if="field === 'role' && apiObj.bindGet && isAdmin" href="javascript:;" @click="binding(index)" title="绑定权限">
                    <i class="fa fa-link fa-lg"></i>
                  </a>

                  <!-- 勾选导出 -->
                  <a v-if="specHandle === 'export' || specHandle === 'import'" 
                    href="javascript:;"
                    title="添加到导出已选"
                    :class="{selected:item.selected}" 
                     @click="addToSelect(item,index)" 
                  >
                    <i class="fa fa-plus fa-lg addToSelect"></i>
                  </a>

                  <!-- 远程更新btn -->
                  <remote-handle
                    :position=1
                    v-if="apiObj && apiObj.process"
                    :item="item"
                    :api="apiObj.process"
                  ></remote-handle>

                  <!-- 审核btn -->
                  <examine-handle
                    v-if="apiObj && apiObj.confirm"
                    :item="item"
                    :api="apiObj.confirm"
                    btnName="审核"
                  ></examine-handle>
                 <!--  <a href="javascript:;" v-if="apiObj && apiObj.confirm" @click="confirmItem(index)" title="审核">
                    审核
                  </a> -->

                </ol>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="xmLoad" v-if="items[0] && items[0].loading">
          <img src="~assets/images/loading.gif" />
        </div>
        <p v-if="!items.length">还没有数据哦，请先添加数据~</p>
      </article>

    </div>

    <!--编辑弹窗-->
    <modal-edit 
      v-if="objEdit.show"
      :transData='objEdit.opts'
      editIndex = "edit_0"
      @close="closeModalEdit" 
      @alert="winAlert"
      @addNewItem="addNewItem"
    ></modal-edit>

    <!--添加上级条目的编辑弹窗-->
    <modal-edit-2
      v-if="objEdit2.show" 
      :transData = "objEdit2.opts" 
      editIndex = "edit_2"
      @close="closeModalEdit" 
      @alert="winAlert"
      @addNewItem="addNewItem"
    ></modal-edit-2>    
    
    <!--添加上级条目的编辑弹窗-->
    <modal-edit-3 
      v-if="objEdit3.show" 
      :transData = "objEdit3.opts" 
      editIndex = "edit_3"
      @close="closeModalEdit" 
      @alert="winAlert"
      @addNewItem="addNewItem"
    ></modal-edit-3>

    <!--添加上级条目的编辑弹窗-->
    <modal-edit-4 
      v-if="objEdit4.show" 
      :transData = "objEdit4.opts" 
      editIndex = "edit_4"
      @close="closeModalEdit" 
      @alert="winAlert"
      @addNewItem="addNewItem"
    ></modal-edit-4>

    <!--删除confirm弹窗-->
    <modal-confirm 
      v-if="objConfirm.show && objConfirm.opts.delIds !== undefined" 
      :transData="objConfirm.opts" 
      @alert="winAlert"
      @close="delClose" 
    ></modal-confirm>

    <!--普通confirm弹窗-->
    <modal-confirm 
      v-if="objConfirm.show && objConfirm.opts.delIds === undefined" 
      :transData="objConfirm.opts" 
      @close="winAlert(0)"
    ></modal-confirm>

    <!--alert弹窗-->
    <modal-alert 
      v-if="objAlert.show" 
      :transData="objAlert.opts" 
      @close="winAlert(0)"
    ></modal-alert>

    <!--查看弹窗-->
    <modal-view 
      v-if="objView.show" 
      :transData="objView.opts" 
      @close="closeModalView"
    ></modal-view>

    <!--提示弹窗 2秒自动消失-->
    <modal-pop 
      v-if="objPop.show" 
      :transData="objPop.opts" 
    ></modal-pop>
  
    <!--分页控件-->
    <pagination 
      v-if="pageObj"
      :transData="pageObj" 
      @changePage="changePage"
    ></pagination>

    <!--角色or权限绑定弹窗-->
    <modal-bind 
      v-if="objBind.show" 
      :transData="objBind.opts" 
      @close="closeModalBind"
      @confirm="winConfirm"
    ></modal-bind>

    <!--字段下级条目弹窗-->
    <modal-popPage 
      v-if="objFieldItems.show" 
      :transData="objFieldItems.opts" 
      @close="closeModalPopPage"
    ></modal-popPage>

    <!--+++问题库编辑弹窗+++-->
    <modal-edit-q 
      v-if="objEdit_q.show"
      :transData='objEdit_q.opts'
      editIndex = "edit_q"
      @close="closeModalEdit" 
      @alert="winAlert"
      @addNewItem="addNewItem"
    ></modal-edit-q>

    <!--+++问题库明细弹窗+++-->
    <modal-view-custom 
      v-if="objView_custom.show"
      :transData='objView_custom.opts'
      @close="closeModalView"
    ></modal-view-custom>
    
  </div>
</template>


<script>
import Index from './js.js';
export default Index;
</script>
<style lang="scss" src="./style.scss"></style>
