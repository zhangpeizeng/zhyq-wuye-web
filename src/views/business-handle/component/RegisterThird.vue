<template>
  <div class="register-third">
    <el-form
      ref="userInfo"
      :model="userInfo"
      :rules="rules"
      class="form-container"
      label-width="140px"
    >
      <!-- 表单顶部 -->
      <div class="top-style" v-if="type === 1">
        <!-- 合同编号 -->
        <el-form-item label="合同编号">
          <el-input
            v-model="userInfo.contractNo"
            placeholder="请输入"
            style="width:400px"
          />
        </el-form-item>
      </div>
      <div class="top-style" v-if="type === 2">
        <div class="line-title">房屋[{{ roomObject.location }}]</div>
        <!-- 租赁起始时间 -->
        <el-form-item label="租赁起始日期">
          <el-date-picker
            v-model="userInfo.rentArray"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </div>
      <!-- 单位信息  -->
      <div v-if="personType === 2">
        <div class="line-title">单位信息</div>
        <!-- 单位信息 => 单位信息 -->
        <!-- 单位信息 => 单位名称 -->
        <el-form-item
          label="单位名称"
          prop="companyName"
        >
          <el-input
            v-model="userInfo.companyName"
            placeholder="请输入"
            style="width:400px"
          />
        </el-form-item>
        <!-- 单位信息 => 统一社会信用代码 -->
        <el-form-item
          label="统一社会信用代码"
          prop="uscc"
        >
          <el-input
            v-model="userInfo.uscc"
            placeholder="请输入"
            style="width:400px"
          />
        </el-form-item>
        <!-- 单位信息 => 治安管理单位 -->
        <el-form-item
          label="治安管理单位"
          prop="securityManagementUnit"
        >
          <el-input
            v-model="userInfo.securityManagementUnit"
            placeholder="请输入"
            style="width:400px"
          />
        </el-form-item>
        <!-- 单位信息 => 经营方式 -->
        <el-form-item
          label="经营方式"
        >
          <el-select v-model="userInfo.businessType" placeholder="请选择" style="width:400px">
            <el-option
              v-for="item in businessTypeList"
              :key="item.contentCode"
              :label="item.contentValue"
              :value="item.contentCode">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 单位信息 => 经济类型 -->
        <el-form-item
          label="经济类型"
        >
          <el-select v-model="userInfo.enterpriseCategory" placeholder="请选择" style="width:400px">
            <el-option
              v-for="item in enterpriseCategoryList"
              :key="item.contentCode"
              :label="item.contentValue"
              :value="item.contentCode">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 单位信息 => 单位英文名称 -->
        <el-form-item
          label="单位英文名称"
        >
          <el-input
            v-model="userInfo.englishCompanyName"
            placeholder="请输入"
            style="width:400px"
          />
        </el-form-item>
        <!-- 单位信息 => 单位英文缩写 -->
        <el-form-item
          label="单位英文缩写"
        >
          <el-input
            v-model="userInfo.abbreviationsCompanyName"
            placeholder="请输入"
            style="width:400px"
          />
        </el-form-item>
        <!-- 单位信息 => 行业类别 -->
        <el-form-item
          label="行业类别"
        >
          <el-select v-model="userInfo.industryCategory" placeholder="请选择" style="width:400px">
            <el-option
              v-for="item in industryCategoryList"
              :key="item.contentCode"
              :label="item.contentValue"
              :value="item.contentCode">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 单位信息 => 营业执照号 -->
        <el-form-item
          label="营业执照号"
        >
          <el-input
            v-model="userInfo.registerNumber"
            placeholder="请输入"
            style="width:400px"
          />
        </el-form-item>
        <!-- 单位信息 => 营业执照有效期 -->
        <el-form-item label="营业执照有效期">
          <el-date-picker
            v-model="userInfo.businessTerm"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <!-- 单位信息 => 单位联系电话 -->
        <el-form-item
          label="单位联系电话"
        >
          <el-input
            v-model="userInfo.contactNumber"
            placeholder="请输入"
            style="width:400px"
          />
        </el-form-item>
      </div>
      <!-- 业主信息  -->
      <div class="line-title">{{ titleList[personType - 1]?titleList[personType - 1].personTitle:'' }}</div>
      <!-- 业主信息 => 人员图片 -->
      <el-form-item
        label="人员图片"
      >
        <el-button
          type="primary"
          @click="showDialog=true"
          size="medium"
          icon="el-icon-plus"
        >新增</el-button>
        <UploadPhoto
          v-model="userInfo.headImgUrl"
          :show.sync="showDialog"
        ></UploadPhoto>
      </el-form-item>
      <!-- 业主信息 => 常用证件 -->
      <el-form-item
        label="常用证件"
        prop="idType"
      >
        <el-select v-model="userInfo.idType" placeholder="请选择" style="width:400px">
          <el-option
            v-for="item in idType"
            :key="item.contentCode"
            :label="item.contentValue"
            :value="item.contentCode">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 业主信息 => 证件号码 -->
      <el-form-item
        label="证件号码"
        prop="idNo"
      >
        <el-input
          v-model="userInfo.idNo"
          placeholder="请输入"
          style="width:400px"
        />
      </el-form-item>
      <!-- 业主信息 => 姓名 -->
      <el-form-item
        label="姓名"
        prop="name"
      >
        <el-input
          v-model="userInfo.name"
          placeholder="请输入"
          style="width:400px"
        />
      </el-form-item>
      <!-- 业主信息 => 性别 -->
      <el-form-item
        label="性别"
        prop="sex"
      >
        <el-select v-model="userInfo.sex" placeholder="请选择" style="width:400px">
          <el-option
            v-for="item in sex"
            :key="item.contentCode"
            :label="item.contentValue"
            :value="item.contentCode">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 业主信息 => 联系电话 -->
      <el-form-item
        label="联系电话"
        prop="phoneNo"
      >
        <el-input
          v-model="userInfo.phoneNo"
          placeholder="请输入"
          style="width:400px"
        />
      </el-form-item>
      <!-- 业主信息 => 国籍 -->
      <el-form-item
        label="国籍"
        prop="country"
      >
        <el-select v-model="userInfo.country" placeholder="请选择" style="width:400px">
          <el-option
            v-for="item in country"
            :key="item.contentCode"
            :label="item.contentValue"
            :value="item.contentCode">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 业主信息 => 籍贯 -->
      <div class="area-select">
        <el-form-item
          label="籍贯"
          prop="nativePlaceAreaProvinceId"
        >
          <el-select v-model="userInfo.nativePlaceAreaProvinceId" placeholder="请选择" style="width:200px" @change="provinceChange">
            <el-option
              v-for="item in province"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="nativePlaceAreaCityId"
          label-width="30px"
        >
          <el-select v-model="userInfo.nativePlaceAreaCityId" placeholder="请选择" style="width:200px" @change="cityChange">
            <el-option
              v-for="item in nativePlaceAreaCityId"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="nativePlaceAreaId"
          label-width="30px"
        >
          <el-select v-model="userInfo.nativePlaceAreaId" placeholder="请选择" style="width:200px">
            <el-option
              v-for="item in district"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <!-- 业主信息 => 人口登记类型 -->
      <el-form-item
        label="人口登记类型"
        prop="populationRegisterType"
      >
        <el-select v-model="userInfo.populationRegisterType" placeholder="请选择" style="width:400px">
          <el-option
            v-for="item in populationRegisterType"
            :key="item.contentCode"
            :label="item.contentValue"
            :value="item.contentCode">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 业主信息 => 户口性质 -->
      <el-form-item
        label="户口性质"
      >
        <el-select v-model="userInfo.householdNative" placeholder="请选择" style="width:400px">
          <el-option
            v-for="item in householdNative"
            :key="item.contentCode"
            :label="item.contentValue"
            :value="item.contentCode">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 业主信息 => 户类型 -->
      <el-form-item
        label="户类型"
      >
        <el-select v-model="userInfo.householdType" placeholder="请选择" style="width:400px">
          <el-option
            v-for="item in householdType"
            :key="item.contentCode"
            :label="item.contentValue"
            :value="item.contentCode">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 业主信息 => 户籍所在地 -->
      <div class="area-select">
        <el-form-item
          label="户籍所在地"
          prop="householdAddressAreaProvinceId"
        >
          <el-select v-model="userInfo.householdAddressAreaProvinceId" placeholder="请选择" style="width:200px" @change="province2Change">
            <el-option
              v-for="item in province"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="householdAddressAreaCityId"
          label-width="30px"
        >
          <el-select v-model="userInfo.householdAddressAreaCityId" placeholder="请选择" style="width:200px" @change="city2Change">
            <el-option
              v-for="item in householdAddressAreaCityId"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="householdAddressAreaId"
          label-width="30px"
        >
          <el-select v-model="userInfo.householdAddressAreaId" placeholder="请选择" style="width:200px">
            <el-option
              v-for="item in district2"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="householdDetatilAddress"
          label-width="30px"
        >
          <el-input
            v-model="userInfo.householdDetatilAddress"
            style="width:200px"
            placeholder="请输入"
          />
        </el-form-item>
      </div>
      <!-- 业主信息 => 实际居住地 -->
      <div class="area-select">
        <el-form-item
          label="实际居住地"
          prop="liveAddressAreaProvinceId"
        >
          <el-select v-model="userInfo.liveAddressAreaProvinceId" placeholder="请选择" style="width:200px" @change="province3Change">
            <el-option
              v-for="item in province"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="liveAddressAreaCityId"
          label-width="30px"
        >
          <el-select v-model="userInfo.liveAddressAreaCityId" placeholder="请选择" style="width:200px" @change="city3Change">
            <el-option
              v-for="item in liveAddressAreaCityId"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="liveAddressAreaId"
          label-width="30px"
        >
          <el-select v-model="userInfo.liveAddressAreaId" placeholder="请选择" style="width:200px">
            <el-option
              v-for="item in district3"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="liveDetailAddress"
          label-width="30px"
        >
          <el-input
            v-model="userInfo.liveDetailAddress"
            style="width:200px"
            placeholder="请输入"
          />
        </el-form-item>
      </div>

      <!-- this  -->
      <!-- 人员详细资料 -->
      <div class="line-title">{{ titleList[personType - 1]? titleList[personType - 1].personInfo:'' }}</div>
      <!-- 人员详细资料 => 出生日期 -->
      <el-form-item label="出生日期">
        <el-date-picker
          v-model="userInfo.birthDate"
          type="date"
          placeholder="选择日期"
          style="width:400px"
        >
        </el-date-picker>
      </el-form-item>
      <!-- 人员详细资料 => 民族 -->
      <el-form-item label="民族">
        <el-select v-model="userInfo.nation" placeholder="请选择" style="width:400px">
          <el-option
            v-for="item in nation"
            :key="item.contentCode"
            :label="item.contentValue"
            :value="item.contentCode">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 人员详细资料 => 曾用名 -->
      <el-form-item label="曾用名">
        <el-input
          v-model="userInfo.usedName"
          placeholder="请输入"
          style="width:400px"
        />
      </el-form-item>
      <!-- 人员详细资料 => 外文姓名 -->
      <el-form-item label="外文姓名">
        <el-input
          v-model="userInfo.foreignName"
          placeholder="请输入"
          style="width:400px"
        />
      </el-form-item>
      <!-- 人员详细资料 => 最后一次入境日期 -->
      <el-form-item label="最后一次入境日期">
        <el-date-picker
          v-model="userInfo.lastEntryDate"
          type="date"
          placeholder="选择日期"
          style="width:400px"
        >
        </el-date-picker>
      </el-form-item>
      <!-- 人员详细资料 => 境外联系电话 -->
      <el-form-item label="境外联系电话">
        <el-input
          v-model="userInfo.foreignPhoneNo"
          placeholder="请输入"
          style="width:400px"
        />
      </el-form-item>
      <!-- 人员详细资料 => 学历 -->
      <el-form-item label="学历">
        <el-select v-model="userInfo.educationBackground" placeholder="请选择" style="width:400px">
          <el-option
            v-for="item in educationBackground"
            :key="item.contentCode"
            :label="item.contentValue"
            :value="item.contentCode">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 人员详细资料 => 政治面貌 -->
      <el-form-item label="政治面貌">
        <el-select v-model="userInfo.politicalAffiliation" placeholder="请选择" style="width:400px">
          <el-option
            v-for="item in politicalAffiliation"
            :key="item.contentCode"
            :label="item.contentValue"
            :value="item.contentCode">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 人员详细资料 => 宗教信仰 -->
      <el-form-item label="宗教信仰">
        <el-select v-model="userInfo.religiousBelief" placeholder="请选择" style="width:400px">
          <el-option
            v-for="item in religiousBelief"
            :key="item.contentCode"
            :label="item.contentValue"
            :value="item.contentCode">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 人员详细资料 => 特殊身份 -->
      <el-form-item label="特殊身份">
        <el-select v-model="userInfo.specialIdentity" placeholder="请选择" style="width:400px">
          <el-option
            v-for="item in specialIdentity"
            :key="item.contentCode"
            :label="item.contentValue"
            :value="item.contentCode">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 人员详细资料 => 工作单位名称 -->
      <el-form-item label="工作单位名称">
        <el-input
          v-model="userInfo.employerNam"
          placeholder="请输入"
          style="width:400px"
        />
      </el-form-item>
      <!-- 人员详细资料 => 职业类别 -->
      <el-form-item label="职业类别">
        <el-select v-model="userInfo.occupationType" placeholder="请选择" style="width:400px">
          <el-option
            v-for="item in occupationType"
            :key="item.contentCode"
            :label="item.contentValue"
            :value="item.contentCode">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 人员详细资料 => 人员登记类型 -->
      <el-form-item label="人员登记类型">
        <el-select v-model="userInfo.registerType" placeholder="请选择" style="width:400px">
          <el-option
            v-for="item in registerType"
            :key="item.contentCode"
            :label="item.contentValue"
            :value="item.contentCode">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 人员详细资料 => 婚姻状况 -->
      <el-form-item label="婚姻状况">
        <el-select v-model="userInfo.maritalStatus" placeholder="请选择" style="width:400px">
          <el-option
            v-for="item in maritalStatus"
            :key="item.contentCode"
            :label="item.contentValue"
            :value="item.contentCode">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 人员详细资料 => 配偶姓名 -->
      <el-form-item label="配偶姓名">
        <el-input
          v-model="userInfo.spouseName"
          placeholder="请输入"
          style="width:400px"
        />
      </el-form-item>
      <!-- 人员详细资料 => 身份证号码 -->
      <el-form-item label="身份证号码">
        <el-input
          v-model="userInfo.spouseIdNo"
          placeholder="请输入"
          style="width:400px"
        />
      </el-form-item>
      <!-- 人员详细资料 => 联系方式 -->
      <el-form-item label="联系方式">
        <el-input
          v-model="userInfo.spousePhoneNo"
          placeholder="请输入"
          style="width:400px"
        />
      </el-form-item>

      <div v-if="personType === 2">
        <!-- this  -->
        <!-- 经营范围/主营 -->
        <div class="line-title">经营范围/主营</div>
        <el-form-item>
          <el-input
            type="textarea"
            :rows="5"
            v-model="userInfo.accountName"
            maxlength="500"
            show-word-limit
          />
        </el-form-item>
        <!-- this  -->
        <!-- 经营范围/兼营 -->
        <div class="line-title">经营范围/兼营</div>
        <el-form-item>
          <el-input
            type="textarea"
            :rows="5"
            v-model="userInfo.accountName"
            maxlength="500"
            show-word-limit
          />
        </el-form-item>
      </div>

      <!-- this  -->
      <!-- 业务办理附件 -->
      <div class="line-title">业务办理附件</div>
      <!-- 业务办理附件 => 上传附件 -->
      <el-form-item>
        <el-button
          type="primary"
          @click="showDialog=true"
          size="medium"
          icon="el-icon-plus"
        >新增</el-button>
        <UploadPhoto
          v-model="userInfo.img"
          :show.sync="showDialog"
        ></UploadPhoto>
      </el-form-item>
      <div class="sticky flex-end">
        <el-button @click="toBack()">
          上一步
        </el-button>
        <el-button
          type="primary"
          @click="submitForm('userInfo')"
        >
          登记完成
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import fileApi from '@/api/fileApi'
import UploadPhoto from '@/components/UploadPhoto'
import businessApi from '@/api/businessApi'
export default {
  components: { UploadPhoto },
  props: {
    personType: Number,
    titleList: Array,
    type: Number,
    roomObject: Object,
    roomId: String,
    updateId: String,
    ownerInfo: Object
  },
  watch: {
    ownerInfo (newData, oldData) {
      this.getOwnerInfo(newData)
    },
    // 当province变化时 监听新值传给下一级select，便于切换和回显
    userInfo (newData, oldData) {
      const {
        nativePlaceAreaProvinceId = '',
        nativePlaceAreaCityId = '',
        householdAddressAreaProvinceId = '',
        householdAddressAreaCityId = '',
        liveAddressAreaProvinceId = '',
        liveAddressAreaCityId = ''
      } = newData
      this.provinceChange(nativePlaceAreaProvinceId)
      this.cityChange(nativePlaceAreaCityId)
      this.province2Change(householdAddressAreaProvinceId)
      this.city2Change(householdAddressAreaCityId)
      this.province3Change(liveAddressAreaProvinceId)
      this.city3Change(liveAddressAreaCityId)
    }
  },
  data () {
    return {
      rules: {
        idType: [{ required: true, message: '请选择常用证件' }],
        idNo: [{ required: true, message: '请输入证件号码' }],
        name: [{ required: true, message: '请输入姓名' }],
        sex: [{ required: true, message: '请选择性别' }],
        phoneNo: [{ required: true, message: '请输入联系电话' }],
        country: [{ required: true, message: '请选择国籍' }],
        nativePlaceAreaProvinceId: [{ required: true, message: '请选择籍贯' }],
        nativePlaceAreaCityId: [{ required: true, message: '请选择籍贯' }],
        nativePlaceAreaId: [{ required: true, message: '请选择籍贯' }],
        populationRegisterType: [{ required: true, message: '请选择人口登记类型' }],
        householdAddressAreaProvinceId: [{ required: true, message: '请选择户籍所在地' }],
        householdAddressAreaCityId: [{ required: true, message: '请选择户籍所在地' }],
        householdAddressAreaId: [{ required: true, message: '请选择户籍所在地' }],
        householdDetatilAddress: [{ required: true, message: '请输入详细地址' }],
        liveAddressAreaProvinceId: [{ required: true, message: '请选择实际居住地' }],
        liveAddressAreaCityId: [{ required: true, message: '请选择实际居住地' }],
        liveAddressAreaId: [{ required: true, message: '请选择实际居住地' }],
        liveDetailAddress: [{ required: true, message: '请输入实际居住地详细地址' }]
      },
      showDialog: false,
      userInfo: {
        contractNo: '', // 合同编号
        companyName: '', // 单位名称
        uscc: '', // 统一社会信用代码
        securityManagementUnit: '', // 治安管理单位
        businessType: '', // 经营方式
        enterpriseCategory: '', // 经济类型
        englishCompanyName: '', // 单位英文名称
        abbreviationsCompanyName: '', // 单位英文缩写
        industryCategory: '', // 行业类别
        registerNumber: '', // 营业执照号
        businessTerm: [], // 营业执照有效期
        businessTermStart: '',
        businessTermEnd: '',
        rentArray: [],
        rentEndTime: '', // 租赁开始时间
        rentStartTime: '', // 租赁结束时间
        contactNumber: '', // 单位联系电话
        headImgUrl: '', // 人员图片
        idType: '', // 常用证件
        idNo: '', // 证件号码
        name: '', // 姓名
        sex: '', // 性别
        phoneNo: '', // 联系电话
        country: '', // 国籍
        nativePlaceAreaProvinceId: '', // 籍贯省
        nativePlaceAreaCityId: '', // 籍贯市
        nativePlaceAreaId: '', // 籍贯区县
        populationRegisterType: '', // 人口登记类型
        householdNative: '', // 户口性质
        householdType: '', // 户类型
        householdAddressAreaProvinceId: '', // 户籍所在地-省
        householdAddressAreaCityId: '', // 户籍所在地-市
        householdAddressAreaId: '', // 户籍所在地-区县
        householdDetatilAddress: '', // 户籍所在地-详细地址
        liveAddressAreaProvinceId: '', // 实际居住地-省
        liveAddressAreaCityId: '', // 实际居住地-市
        liveAddressAreaId: '', // 实际居住地-区县
        liveDetailAddress: '', // 实际居住地-详细地址
        birthDate: '', // 出生日期
        nation: '', // 民族
        usedName: '', // 曾用名
        foreignName: '', // 外文姓名
        lastEntryDate: '', // 最后一次入境日期
        foreignPhoneNo: '', // 境外联系电话
        educationBackground: '', // 学历
        politicalAffiliation: '', // 政治面貌
        religiousBelief: '', // 宗教信仰
        specialIdentity: '', // 特殊身份
        employerNam: '', // 工作单位名称
        occupationType: '', // 职业类别
        registerType: '', // 人员登记类型
        maritalStatus: '', // 婚姻状况
        spouseName: '', // 配偶姓名
        spouseIdNo: '', // 身份证号码
        spousePhoneNo: '', // 联系方式

        accountName: ''
      },
      idType: [], // 身份证号
      sex: [], //  性别
      country: [], // 国籍
      province: [],
      nativePlaceAreaCityId: [],
      district: [],
      householdAddressAreaCityId: [],
      district2: [],
      liveAddressAreaCityId: [],
      district3: [],
      populationRegisterType: [],
      householdNative: [],
      householdType: [],
      nation: [], // 民族
      educationBackground: [], // 学历
      politicalAffiliation: [], // 政治面貌
      religiousBelief: [], // 宗教信仰
      specialIdentity: [], // 特殊身份
      occupationType: [], // 职业类别、
      registerType: [], // 人员登记类型
      maritalStatus: [], // 婚姻状况
      businessTypeList: [
        { contentCode: 1, contentValue: '制造' },
        { contentCode: 2, contentValue: '批次' },
        { contentCode: 3, contentValue: '咨询' },
        { contentCode: 4, contentValue: '代理' }
      ], // 经营类型

      enterpriseCategoryList: [], // 企业类型
      industryCategoryList: [] // 企业分类
    }
  },
  mounted () {
    this.getContentList('idType')
    this.getContentList('sex')
    this.getContentList('country')
    this.getContentList('populationRegisterType')
    this.getContentList('householdNative')
    this.getContentList('householdType')
    this.getSelectList('', 'province')
    this.getContentList('nation')
    this.getContentList('educationBackground')
    this.getContentList('politicalAffiliation')
    this.getContentList('religiousBelief')
    this.getContentList('specialIdentity')
    this.getContentList('occupationType')
    this.getContentList('registerType')
    this.getContentList('maritalStatus')
    this.getEnterpriseCategoryList()
    this.getIndustryCategory()
  },
  methods: {
    // 获取企业经济类型
    getEnterpriseCategoryList () {
      fileApi.getContentList({ typeCode: 4 }).then(res => {
        this.enterpriseCategoryList = res || []
      })
    },
    // 获取企业分类
    getIndustryCategory () {
      fileApi.getContentList({ typeCode: 2 }).then(res => {
        this.industryCategoryList = res || []
      })
    },
    // 获取下拉select数据
    getContentList (type = '') {
      const param = { typeCode: type }
      fileApi.getContentList(param).then((res = []) => {
        this[type] = res
      })
    },
    // 获取省市区数据
    getSelectList (id = '', type = '') {
      const param = {}
      id && (param.id = id)
      fileApi.getSelectList(param).then((res = []) => {
        const { data = [] } = res[0]
        type === 'province' ? (this[type] = res) : (this[type] = data)
      })
    },
    provinceChange (e) {
      this.getSelectList(e, 'nativePlaceAreaCityId')
    },
    cityChange (e) {
      this.getSelectList(e, 'district')
    },
    province2Change (e) {
      this.getSelectList(e, 'householdAddressAreaCityId')
    },
    city2Change (e) {
      this.getSelectList(e, 'district2')
    },
    province3Change (e) {
      this.getSelectList(e, 'liveAddressAreaCityId')
    },
    city3Change (e) {
      this.getSelectList(e, 'district3')
    },
    toBack () {
      this.$emit('toSecondPage', [2])
    },
    getStartTime () {
      this.userInfo.businessTermStart = this.userInfo.businessTerm[0] // 企业执照开始日期
      this.userInfo.businessTermEnd = this.userInfo.businessTerm[1] // 营业执照结束日期
      this.userInfo.rentStartTime = this.userInfo.rentArray[0] // 租赁开始时间
      this.userInfo.rentEndTime = this.userInfo.rentArray[1] // 租赁结束时间
    },
    // 提交表单
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        this.getStartTime()
        if (valid) {
          this.userInfo.ownerType = this.personType
          this.userInfo.roomId = this.roomId
          this.userInfo.location = this.roomObject ? this.roomObject.location : ''
            if (this.updateId) {
              // 更新业主信息 需要传入业主id
              const formData = JSON.parse(JSON.stringify(this.userInfo))
              formData.id = this.updateId
              businessApi[this.type === 2 ? 'insertTenant' : 'updateOwner'](formData).then(res => {
                // type为2 时添加租户信息，否则更新业主信息
                const { msgLevel = '' } = res
                if (msgLevel === 'success') {
                  this.$message.success('提交成功')
                  this.$emit('toSecondPage', [4])
                } else {
                  this.$message.error('提交失败')
                }
              })
            } else {
              // 新建业主信息
              const formData = JSON.parse(JSON.stringify(this.userInfo))
              businessApi.insertOwner(formData).then(res => {
                const { msgLevel = '' } = res
                if (msgLevel === 'success') {
                  this.$message.success('提交成功')
                  this.$emit('toSecondPage', [4])
                } else {
                  this.$message.error('提交失败')
                }
              })
            }
        } else {
          this.$message.error('请完善当前列表')
          return false
        }
      })
    },
    // 获取回显数据
    getOwnerInfo (newData = {}) {
      const {
        birthDate = '',
        country = '',
        name = '',
        idNo = '',
        idType = '',
        nation = '',
        occupationType = '',
        liveAddressAreaProvinceId = '',
        liveAddressAreaCityId = '',
        liveDetailAddress = '',
        liveAddressAreaId = '',
        householdAddressAreaProvinceId = '',
        householdAddressAreaCityId = '',
        householdAddressAreaId = '',
        householdDetatilAddress = '',
        companyName = '',
        uscc = '',
        securityManagementUnit = '',
        businessType = '',
        enterpriseCategory = '',
        englishCompanyName = '',
        abbreviationsCompanyName = '',
        industryCategory = '',
        registerNumber = '',
        businessTermStart = '',
        businessTermEnd = '',
        contactNumber = '',
        headImgUrl = '',
        sex = '',
        phoneNo = '',
        nativePlaceAreaProvinceId = '',
        nativePlaceAreaCityId = '',
        nativePlaceAreaId = '',
        populationRegisterType = '',
        householdNative = '',
        householdType = '',
        usedName = '',
        foreignName = '',
        lastEntryDate = '',
        foreignPhoneNo = '',
        educationBackground = '',
        politicalAffiliation = '',
        religiousBelief = '',
        specialIdentity = '',
        registerType = '',
        maritalStatus = '',
        spouseName = '',
        spouseIdNo = '',
        spousePhoneNo = '',
        contractNo = ''
      } = newData
      const userInfo = {
        contractNo: contractNo, // 合同编号
        companyName: companyName, // 单位名称
        uscc: uscc, // 统一社会信用代码
        securityManagementUnit: securityManagementUnit, // 治安管理单位
        businessType: businessType, // 经营方式
        enterpriseCategory: enterpriseCategory, // 经济类型
        englishCompanyName: englishCompanyName, // 单位英文名称
        abbreviationsCompanyName: abbreviationsCompanyName, // 单位英文缩写
        industryCategory: industryCategory, // 行业类别
        registerNumber: registerNumber, // 营业执照号
        businessTerm: [businessTermStart, businessTermEnd], // 营业执照有效期
        contactNumber: contactNumber, // 单位联系电话
        headImgUrl: headImgUrl, // 人员图片
        idType: idType, // 常用证件
        idNo: idNo, // 证件号码
        name: name, // 姓名
        sex: String(sex), // 性别
        phoneNo: phoneNo, // 联系电话
        country: country, // 国籍
        nativePlaceAreaProvinceId: nativePlaceAreaProvinceId, // 籍贯省
        nativePlaceAreaCityId: nativePlaceAreaCityId, // 籍贯市
        nativePlaceAreaId: nativePlaceAreaId, // 籍贯区县
        populationRegisterType: populationRegisterType, // 人口登记类型
        householdNative: householdNative, // 户口性质
        householdType: householdType, // 户类型
        householdAddressAreaProvinceId: householdAddressAreaProvinceId, // 户籍所在地-省
        householdAddressAreaCityId: householdAddressAreaCityId, // 户籍所在地-市
        householdAddressAreaId: householdAddressAreaId, // 户籍所在地-区县
        householdDetatilAddress: householdDetatilAddress, // 户籍所在地-详细地址
        liveAddressAreaProvinceId: liveAddressAreaProvinceId, // 实际居住地-省
        liveAddressAreaCityId: liveAddressAreaCityId, // 实际居住地-市
        liveAddressAreaId: liveAddressAreaId, // 实际居住地-区县
        liveDetailAddress: liveDetailAddress, // 实际居住地-详细地址
        birthDate: birthDate, // 出生日期
        nation: nation, // 民族
        usedName: usedName, // 曾用名
        foreignName: foreignName, // 外文姓名
        lastEntryDate: lastEntryDate, // 最后一次入境日期
        foreignPhoneNo: foreignPhoneNo, // 境外联系电话
        educationBackground: educationBackground, // 学历
        politicalAffiliation: politicalAffiliation, // 政治面貌
        religiousBelief: religiousBelief, // 宗教信仰
        specialIdentity: specialIdentity, // 特殊身份
        employerNam: '', // 工作单位名称
        occupationType: occupationType, // 职业类别
        registerType: registerType, // 人员登记类型
        maritalStatus: maritalStatus, // 婚姻状况
        spouseName: spouseName, // 配偶姓名
        spouseIdNo: spouseIdNo, // 身份证号码
        spousePhoneNo: spousePhoneNo, // 联系方式

        accountName: ''
      }
      this.userInfo = userInfo
    }
  }
}
</script>

<style scoped lang="scss">
.register-third {
  margin-left: 40px;
  .area-select {
    .el-form-item {
      display: inline-block;
    }
    .el-input {
      display: inline-block;
    }
  }
  .sticky {
    width: 90%;
    height: 40px;
    position: -webkit-sticky;
    position: sticky;
    bottom: 0;
  }
}
</style>
