<!--
 * @Author: Guocc
 * @Date: 2022-09-29 10:58:08
 * @LastEditTime: 2022-10-14 11:14:30
 * @LastEditors: Guocc
 * @Description: 检察一体化模型
-->
<template>
  <div class="app-container">
    <div class="formx boxshadow">
      <el-form
        :model="queryParams"
        ref="queryForm"
        :inline="true"
        label-width="68px"
      >
        <el-form-item label="案件编号" prop="caseNo">
          <el-input
            v-model="queryParams.caseNo"
            placeholder="请输入案件编号"
            clearable
            size="small"
            style="width: 160px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="案件名称" prop="caseName">
          <el-input
            v-model="queryParams.caseName"
            placeholder="请输入案件名称"
            clearable
            size="small"
            style="width: 180px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="案件类型" prop="caseType">
          <el-select
            v-model="queryParams.caseType"
            placeholder="案件类型"
            clearable
            size="small"
          >
            <el-option
              v-for="dict in caseTypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="当前状态" prop="status">
          <el-select
            v-model="queryParams.state"
            placeholder="当前状态"
            clearable
            size="small"
          >
            <el-option
              v-for="dict in statusOptions"
              :key="dict.dictLabel"
              :label="dict.dictLabel"
              :value="dict.dictLabel"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="cyan"
            icon="el-icon-search"
            size="mini"
            @click="handleQuery"
            >搜索</el-button
          >
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <div class="boxshadow">
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        stripe
      >
        <el-table-column type="selection" width="45" align="center">
        </el-table-column>
        <el-table-column align="center" label="ID" width="95">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="编号">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="案件编号" align="center">
          <template slot-scope="scope">
            {{ scope.row.caseNo }}
          </template>
        </el-table-column>
        <el-table-column label="案件名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.caseName }}
          </template>
        </el-table-column>
        <el-table-column label="产生时间" align="center">
          <template slot-scope="scope">
            {{ scope.row.occurDate }}
          </template>
        </el-table-column>
        <el-table-column label="公益诉讼指数" align="center">
          <template slot-scope="scope">
            <span class="acindex" @click="handleActionIndex(scope.row)">{{
              scope.row.actionIndex
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="初步确认人" align="center">
          <template slot-scope="scope">
            {{ scope.row.initialConfidenceBy }}
          </template>
        </el-table-column>
        <el-table-column label="初步确认日期" align="center">
          <template slot-scope="scope">
            {{ scope.row.initialConfidenceDate }}
          </template>
        </el-table-column>
        <el-table-column label="当前状态" align="center">
          <template slot-scope="scope">
            {{ scope.row.currentState }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="240"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleOpre(scope.row, '初步确认')"
              :disabled="isFirst"
            >
              初步确认
            </el-button>
            <el-button
              size="mini"
              type="text"
              @click="handleOpre(scope.row, '移送')"
              :disabled="isSec"
              >移送</el-button
            >
            <el-button
              size="mini"
              type="text"
              @click="handleOpre(scope.row, '非线索')"
              :disabled="isThd"
              >非线索</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagesx">
      <el-pagination
        align="right"
        background
        :page-size="queryParams.pageSize"
        :current-page.sync="queryParams.pageNum"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="queryParams.total"
        @current-change="handleQuery"
      >
      </el-pagination>
    </div>
    <div>
      <v-model-dialog
        v-model="detailVisible"
        :detail.sync="detail"
      ></v-model-dialog>
    </div>
  </div>
</template>

<script>
import vModelDialog from "./model.vue";
import { getList, editState } from "@/api/integration";
import { tsThisType } from "@babel/types";
export default {
  data() {
    return {
      list: null,
      listLoading: true,
      isFirst: false,
      isSec: false,
      isThd: false,
      queryParams: {
        pageNum: 0,
        pageSize: 10,
        total: 0,
      },
      detail: {
        id: "",
        name: "",
        idCard: "",
        caseNo: "",
      },
      detailVisible: false,
      statusOptions: [
        {
          dictLabel: "待处理",
        },
        {
          dictLabel: "待确认",
        },
        {
          dictLabel: "已移送",
        },
        {
          dictLabel: "非线索",
        },
      ],
      caseTypeOptions: [
        {
          dictLabel: "全部",
          dictValue: null,
        },
        {
          dictLabel: "破坏生态环境",
          dictValue: 1,
        },
        {
          dictLabel: "破坏资源食品安全",
          dictValue: 2,
        },
        {
          dictLabel: "损害英烈权益",
          dictValue: 3,
        },
        {
          dictLabel: "国有财产土地",
          dictValue: 4,
        },
      ],
      keywordOptions: [
        {
          keywordName: "",
          keywordValue: 20,
        },
      ],
    };
  },
  components: {
    vModelDialog,
  },
  created() {
    this.handleQuery();
  },
  methods: {
    handleQuery() {
      this.listLoading = true;
      getList(this.queryParams)
        .then((res) => {
          console.log(res);
          this.queryParams.total = res.data.total;
          this.listLoading = false;
          this.list = res.data.records;
        })
        .catch((err) => {
          this.listLoading = false;
          this.$message.error(err.message);
        });
    },
    resetQuery() {
      this.queryParams = {};
    },
    handleAdd() {},
    handleDelete() {},
    handleOpre(row, state) {
      let statex = "";
      if (state == "初步确认") {
        if (row.currentState != "待处理") {
          this.$message.error("状态必须是待处理!");
          return;
        }
        statex = "待确认";
      } else if (state == "移送") {
        if (row.currentState != "待确认") {
          this.$message.error("状态必须是待确认!");
          return;
        }
        statex = "已移送";
      } else if (state == "非线索") {
        if (row.currentState != "待确认") {
          this.$message.error("状态必须是待确认!");
          return;
        }
        statex = "非线索";
      }
      let that = this;
      this.$confirm("确定要" + state + "吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        editState({
          id: row.id,
          state: statex,
        }).then(() => {
          that.handleQuery();
        });
      });
    },
    handleActionIndex(row) {
      console.log(row);
      this.detail = row;
      this.detailVisible = true;
    },
    dateFormat(row, column) {
      var date = row[column.property];
      if (date === undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD");
    },
  },
};
</script>

<style lang="scss">
.formx {
  margin-bottom: 20px;
  padding: 20px 30px;
}
.pagesx {
  margin-top: 20px;
}
.boxshadow {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.mb8 {
  margin-bottom: 20px;
}

.acindex {
  color: #409eff;
  text-decoration: underline;

  cursor: pointer;
}
</style>
