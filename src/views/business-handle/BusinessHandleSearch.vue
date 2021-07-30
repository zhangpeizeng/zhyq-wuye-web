<!--业务办理记录查询-->
<template>
    <div class="business-handle-search">
      <div class="filter-wrap">
        <div class="form-wrap">
          <el-date-picker
            v-model="query.TimeInterval"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            size="medium">
          </el-date-picker>
          <el-select v-model="query.businessType" placeholder="业务类型" size="medium">
            <el-option
            v-for="item in businessTypeList"
            :key="item.contentCode"
            :label="item.contentValue"
            :value="item.contentCode">
            </el-option>
          </el-select>
          
          <el-input v-model="query.agentName" placeholder="经办人姓名" size="medium"></el-input>
          
        </div>
        <div class="form-wrap">
          <el-select v-model="query.handleObj" placeholder="办理对象" size="medium"> 
            <el-option
            v-for="item in handleObjList"
            :key="item.contentCode"
            :label="item.contentValue"
            :value="item.contentCode">
            </el-option>
          </el-select>
        </div>
        <div class="btn-wrap flex-between">
          <div>
            <el-button
              type="primary"
              @click="getList"
              size="medium"
              icon="el-icon-search"
            >查询</el-button>
            <el-button
              @click="onReset"
              size="medium"
              icon="el-icon-refresh"
            >重置</el-button>
          </div>
        </div>
      </div>
      <div class="content-wrap">
        <el-table
          stripe
          :data="list"
          style="width: 100%"
        >
          <el-table-column
            prop="handleTime"
            label="办理时间"
          />
          <el-table-column
            prop="businessType"
            label="业务类型"
            :formatter="showBusinessType"
          >
          </el-table-column>
          <el-table-column
            prop="handleObj"
            label="办理对象"
          />
          <el-table-column
            prop="creatorName"
            label="经办人"
            width="120"
          />
          <el-table-column
            label="操作"
            width="180"
          >
            <template slot-scope="scope">
              
              <el-button
                size="medium"
                type="text"
                @click="$router.push({name:'sysAccountAdd',query:{id:scope.row.id}})"
              >查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin-top:24px"
          @size-change="getList"
          @current-change="getList"
          :current-page.sync="query.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size.sync="query.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total.sync="query.total"
        >
        </el-pagination>
      </div>
    </div>
  </template>
  
  <script>
  
      import businessApi from '@/api/businessApi'
      import { getAllDictionary } from '@/api/systemApi'
      export default {
          components: {},
          data () {
              return {
                  value1:'',
                  list: [],
                  orgList: [],
                  query: {
                    TimeInterval: '',
                    businessType: '',
                    handleObj: '',
                    agentName: '',
                    currentPage: 1,
                    pageSize: 10,
                    total: 0
                  },
                  pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                        }
                    }]
                  },
                  businessTypeList: [],
                  handleObjList:[],
              }
          },
          created () {
              this.getBusinessTypeData()
              this.handleObjData()
              this.getList()
          },
          methods: {
              onReset () {
                  this.query = {
                    TimeInterval: '',
                    businessType: '',
                    handleObj: '',
                    agentName: '',
                    currentPage: 1,
                    pageSize: 10,
                    total: this.query.total
                  }
              },
              async getList () {
                  const res = await businessApi.businessHandlingSearch(this.query)
                  this.list = res.data
                  this.query.total = +res.total
                  
              },
              async getBusinessTypeData() {
                  const res = await getAllDictionary({typeCode:'wy_business_type'})
                  this.businessTypeList = res

              },
              showBusinessType(value,meta,cellValue) {
                  let resultArray = this.businessTypeList.filter(item=>{
                      return item.contentCode == cellValue
                  })
                  return resultArray.length>0?resultArray[0].contentValue:cellValue
              },
              async handleObjData() {
                const res = await getAllDictionary({typeCode:'wy_handle_obj'})
                this.handleObjList = res
              }
          },
          mounted () {
              document.onkeydown = (e) => {
                  if (
                      e.keyCode === 13 &&
                      document.body.getElementsByClassName('system-account-list')[0]
                  ) {
                      this.getList()
                  }
              }
          }
      }
  </script>
  
  <style lang="scss" scoped>
    .business-handle-search {
      width: 100%;
    }
  
  </style>
  