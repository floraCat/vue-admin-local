<template>
  <div class="adminLayout">
    <div class="mask" v-show="maskShow" @click="cancelPop()"></div>
    <!--按设备统计-->
    <div class="layout table1">
      <div class="ttl">
        <h3><i class="icon fa fa-th-large"></i>{{headTtl[0]}}</h3>
        <span>指定片区的设备在某时间段按设备编号统计的数据</span>
      </div>
      <div class="filter">
        <div class="wrap2">
          <div class="version2">
            <h5>版本：</h5>
            <div class="select">
              <h6 v-text="version[0]"></h6>
              <div class="drop" v-show="versionDrop[0]">
                <p data-val="全部" @click="selectOn($event, 0)">全部</p>
                <p data-val="1.0" @click="selectOn($event, 0)">1.0</p>
                <p data-val="2.1" @click="selectOn($event, 0)">2.1</p>
              </div>
            </div>
            <div class="btn" @click="selectDrop(0)">点选</div>
          </div>
          <div class="fieldFilter">
            <form-page-select 
                  :able="areas[0]"
                ></form-page-select>
          </div>
        </div>
        <div class="time">
          <div class="control">
            <span>起始：</span>
            <datepicker v-model="times[0].begined" placeholder="请点选日期" :inputClass="{ test: true }" :config="{ wrap: true, enableTime: true, time_24hr: true, dateFormat: 'Y-m-d H:i' }" readonly>
              <a class="button" data-toggle><i class="icon fa fa-calendar"></i></a>
            </datepicker>
          </div>
          <div class="control">
            <span>终止：</span>
            <datepicker v-model="times[0].ended" placeholder="请点选日期" :inputClass="{ test: true }" :config="{ wrap: true, enableTime: true, time_24hr: true, dateFormat: 'Y-m-d H:i' }" readonly>
              <a class="button" data-toggle><i class="icon fa fa-calendar"></i></a>
            </datepicker>
          </div>
          <a class="confirm" href="javascript:;" @click="confirm(0,1)">确定</a>
          <export
            class="btnExl fr"
            @insertNew="insertNew"
            index="0"
            :fileName="'充电订单-'+fileName[0]"
            btnName="导出Excel表"
          >
          </export>
        </div>
      </div>
      <div class="tablePage">
        <table cellpadding="5">
          <tr>
            <th v-for="title in titles[0]" v-text="title"></th>
          </tr>
          <tr v-for="(item,index) in result[0]">
            <td v-for="item2 in item" v-text="item2"></td>
          </tr>
        </table>
      </div>
      <pagination 
        v-if="pageObj[0]"
        :transData="pageObj[0]" 
        :wrapIndex="0"
        @changePage="changePage"
      ></pagination>
    </div>
    <!--按时间统计-->
    <div class="layout table2">
      <div class="ttl">
        <h3><i class="icon fa fa-th-large"></i>{{headTtl[1]}}</h3>
        <span>指定片区的设备在某时间段按日期统计的数据</span>
      </div>
      <div class="filter">
        <div class="wrap2">
          <div class="version2">
            <h5>版本：</h5>
            <div class="select">
              <h6 v-text="version[1]"></h6>
              <div class="drop" v-show="versionDrop[1]">
                <p data-val="全部" @click="selectOn($event, 1)">全部</p>
                <p data-val="1.0" @click="selectOn($event, 1)">1.0</p>
                <p data-val="2.1" @click="selectOn($event, 1)">2.1</p>
              </div>
            </div>
            <div class="btn" @click="selectDrop(1)">点选</div>
          </div>
          <div class="fieldFilter">
            <form-page-select 
                  :able="areas[1]"
                ></form-page-select>
          </div>
        </div>
        <div class="time">
          <p class="control">
            <span>起始：</span>
            <datepicker v-model="times[1].begined" placeholder="请点选日期" :inputClass="{ test: true }" :config="{ wrap: true, dateFormat: 'Y-m-d' }" readonly>
              <a class="button" data-toggle><i class="icon fa fa-calendar"></i></a>
            </datepicker>
          </p>
          <p class="control">
            <span>终止：</span>
            <datepicker v-model="times[1].ended" placeholder="请点选日期" :inputClass="{ test: true }" :config="{ wrap: true, dateFormat: 'Y-m-d' }" readonly>
              <a class="button" data-toggle><i class="icon fa fa-calendar"></i></a>
            </datepicker>
          </p>
          <a class="confirm" href="javascript:;" @click="confirm(1)">确定</a>
          <export
            class="btnExl fr"
            @insertNew="insertNew"
            index="1"
            :fileName="'充电订单-'+fileName[1]"
            btnName="导出Excel表"
          >
          </export>
        </div>
      </div>
      <div class="tablePage">
        <table cellpadding="5">
          <tr>
            <th v-for="title in titles[1]" v-text="title"></th>
          </tr>
          <tr v-for="(item,index) in result[1]">
            <td v-for="item2 in item" v-text="item2"></td>
          </tr>
        </table>
      </div>
      <pagination 
        v-if="pageObj[1]"
        :transData="pageObj[1]" 
        :wrapIndex="1"
        @changePage="changePage"
      ></pagination>
    </div>
    <!--实时统计-->
    <div class="layout table3">
      <div class="ttl">
        <h3><i class="icon fa fa-th-large"></i>{{headTtl[2]}}</h3>
        <span>指定片区的设备在指定的日期每小时订单量的对比图表</span>
      </div> 
      <div class="filter">
        <div class="time">
          <div class="dates">
            <div class="control" v-for="(time,index) in timesChat" @click="checkCurPick(index)">
              <span>{{time.ttl}}：</span>
              <datepicker ref="picker" v-model="time.date" placeholder="请点选日期" :inputClass="{ test: true }" :config="{ wrap: true, dateFormat: 'Y-m-d' }" readonly>
              <a class="button" data-toggle><i class="icon fa fa-calendar"></i></a>
            </datepicker>
              <div class="delete" @click="delItem(index)"></div>
            </div>
          </div>
          <div class="btn" @click="addItem()">增加对比日期</div>
          <div class="note">注：最少2个，最多7个</div>
        </div>
        <div class="version2">
          <h5>版本：</h5>
          <div class="select">
            <h6 v-text="version[2]"></h6>
            <div class="drop" v-show="versionDrop[2]">
              <p data-val="全部" @click="selectOn($event, 2)">全部</p>
              <p data-val="1.0" @click="selectOn($event, 2)">1.0</p>
              <p data-val="2.1" @click="selectOn($event, 2)">2.1</p>
            </div>
          </div>
          <div class="btn" @click="selectDrop(2)">点选</div>
        </div>
        <div class="fieldFilter">
          <form-page-select 
                :able="areas[2]"
              ></form-page-select>
          <a class="confirm" href="javascript:;" @click="confirm(2)">确定</a>
        </div>
      </div>
      <div class="chat">
        <chat-line 
          v-if="showChat"
          :obj = "result[2]"
        >
        </chat-line>
        <div class="vTtl">订单数</div>
        <div class="hTtl">小时</div>
      </div>
    </div>
    <!--按使用时长统计-->
    <div class="layout table4">
      <div class="ttl">
        <h3><i class="icon fa fa-th-large"></i>{{headTtl[3]}}</h3>
        <span>指定片区的设备在某时间段的总体统计数据</span>
      </div>
      <div class="filter">
        <div class="wrap">
          <div class="version2">
            <h5>版本：</h5>
            <div class="select">
              <h6 v-text="version[3]"></h6>
              <div class="drop" v-show="versionDrop[3]">
                <p data-val="全部" @click="selectOn($event, 3)">全部</p>
                <p data-val="1.0" @click="selectOn($event, 3)">1.0</p>
                <p data-val="2.1" @click="selectOn($event, 3)">2.1</p>
              </div>
            </div>
            <div class="btn" @click="selectDrop(3)">点选</div>
          </div>
          <div class="fieldFilter">
            <form-page-select 
                  :able="areas[3]"
                ></form-page-select>
          </div>
        </div>
        <div class="time">
          <p class="control">
            <span>起始：</span>
            <datepicker v-model="times[3].begined" placeholder="请点选日期" :inputClass="{ test: true }" :config="{ wrap: true, enableTime: true, time_24hr: true, dateFormat: 'Y-m-d H:i' }" readonly>
              <a class="button" data-toggle><i class="icon fa fa-calendar"></i></a>
            </datepicker>
          </p>
          <p class="control">
            <span>终止：</span>
            <datepicker v-model="times[3].ended" placeholder="请点选日期" :inputClass="{ test: true }" :config="{ wrap: true, enableTime: true, time_24hr: true, dateFormat: 'Y-m-d H:i' }" readonly>
              <a class="button" data-toggle><i class="icon fa fa-calendar"></i></a>
            </datepicker>
          </p>
          <a class="confirm" href="javascript:;" @click="confirm(3)">确定</a>
        </div>
      </div>
      <div class="chat">
        <chat-bar 
            v-if="showBar"
            :obj = "result[3]"
          >
        </chat-bar>
      </div>
    </div>

  </div>
</template>


<script>
import Index from './js.js';
export default Index;
</script>
<style lang="scss" src="../style.scss"></style>
