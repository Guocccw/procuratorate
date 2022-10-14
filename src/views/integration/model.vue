<!--
 * @Author: Guocc
 * @Date: 2022-10-07 16:17:19
 * @LastEditTime: 2022-10-14 13:36:38
 * @LastEditors: Guocc
 * @Description: 公益诉讼案件模型结果详情
-->
<template>
  <el-dialog
    title="结果详情"
    :visible.sync="innerVisible"
    width="1200px"
    height="800px"
    top="8vh"
    padding="0"
  >
    <div class="container">
      <h1 class="th">公益诉讼案件模型结果详情</h1>
      <div class="ab">
        <p>经过检察一体化模型分析</p>
        <p>
          {{ detail.caseName }}可能涉及公益诉讼，其公益诉讼指数为
          {{ detail.actionIndex }} 分
        </p>
      </div>
      <div class="charts">
        <el-steps :active="active">
          <el-step title="匹配结束" :description="fTime"> </el-step>
          <el-step title="初步确认" :description="sTime"> </el-step>
          <el-step :title="xtitle" description=""></el-step>
          <el-step title="完成" description=""></el-step>
        </el-steps>
        <el-table :data="list" border style="width: 100%; margin-top: 40px">
          <el-table-column prop="factorType" label="要素类型">
          </el-table-column>
          <el-table-column prop="factorDetail" label="要素清单">
          </el-table-column>
          <el-table-column prop="weight" label="权重" width="80" align="center">
          </el-table-column>
          <el-table-column prop="matchResult" label="匹配结果">
          </el-table-column>
          <el-table-column prop="score" label="得分" width="80" align="center">
          </el-table-column>
        </el-table>
      </div>
      <div class="xfix">
        <el-button type="primary" @click="innerVisible = false">
          返回列表
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import vModelDialog from "@/utils/vModelDialog.js";
import { getDetail } from "@/api/integration";
export default {
  name: "vModelDialog",
  mixins: [vModelDialog],
  props: {
    detail: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      list: [],
      xtitle: "移送确认",
      active: 0,
      fTime: "",
      sTime: "",
    };
  },
  watch: {
    detail(data) {
      console.log(data.matchDate);
      this.sTime = data.initialConfidenceDate || "";
      this.fTime = data.matchDate;
      console.log(this.fTime);
      let id = data.id;
      if (data.currentState == "非线索") {
        this.xtitle = data.currentState;
      }
      console.log(data.currentState);
      switch (data.currentState) {
        case "非线索":
          this.active = 4;
          break;
        case "已移送":
          this.active = 4;
          break;
        case "待确认":
          this.active = 2;
          break;
        case "待处理":
          this.active = 1;
          break;
      }
      this.handleQuery(id);
    },
  },
  methods: {
    handleQuery(id) {
      let that = this;
      this.listLoading = true;
      getDetail({
        checkId: id,
      }).then((res) => {
        that.list = res.data;
        console.log("res: ", res);
      });
    },
  },
};
</script>

<style lang="scss">
.container {
  height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.ab p {
  margin: 0;
  font-size: 12px;
  line-height: 20px;
  color: #abacab;
}
.xfix {
  position: absolute;
  bottom: 20px;
}
.charts {
  width: 1000px;
  padding: 30px;
  height: 500px;
  position: relative;
}
</style>
