<!--
 * @Author: Guocc
 * @Date: 2022-09-29 10:57:02
 * @LastEditTime: 2022-10-14 10:37:41
 * @LastEditors: Guocc
 * @Description: 另案处理人员监控
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
        <el-form-item label="姓名" prop="name" label-width="40px">
          <el-input
            v-model="queryParams.name"
            placeholder="请输入姓名"
            clearable
            size="small"
            style="width: 160px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="身份证号码" prop="idcard" label-width="90px">
          <el-input
            v-model="queryParams.idcard"
            placeholder="请输入身份证号码"
            clearable
            size="small"
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="案件编号" prop="caseNo">
          <el-input
            v-model="queryParams.caseNo"
            placeholder="请输入案件编号"
            clearable
            size="small"
            style="width: 180px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <!-- <el-form-item label="关键词" prop="keywordName">
          <el-select
            v-model="queryParams.keywordName"
            placeholder="关键词"
            clearable
            size="small"
            style="width: 100px"
          >
            <el-option
              v-for="dict in keywordOptions"
              :key="dict.keywordName"
              :label="dict.keywordName"
              :value="dict.keywordName"
            />
          </el-select>
          <el-input
            v-model="queryParams.keywordValue"
            clearable
            size="small"
            style="width: 240px; margin-left: 10px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item> -->
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

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          >新增监控</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          @click="handleDelete"
          >删除监控</el-button
        >
      </el-col>
    </el-row>

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
        <el-table-column align="center" label="ID" width="65">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="编号">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="身份证号码" align="center">
          <template slot-scope="scope">
            {{ scope.row.idCard }}
          </template>
        </el-table-column>
        <el-table-column label="案件编号" align="center">
          <template slot-scope="scope">
            {{ scope.row.caseNo }}
          </template>
        </el-table-column>
        <el-table-column label="另案处理原因" align="center">
          <template slot-scope="scope">
            {{ scope.row.reason }}
          </template>
        </el-table-column>
        <el-table-column label="性别" align="center">
          <template slot-scope="scope">
            {{ scope.row.gender }}
          </template>
        </el-table-column>
        <el-table-column label="绰号" align="center">
          <template slot-scope="scope">
            {{ scope.row.nickName }}
          </template>
        </el-table-column>
        <el-table-column label="另案处理日期" align="center">
          <template slot-scope="scope">
            {{ scope.row.operateDate }}
          </template>
        </el-table-column>
        <el-table-column label="当前状态" align="center">
          <template slot-scope="scope">
            {{ scope.row.currentState }}
          </template>
        </el-table-column>
        <el-table-column label="匹配日期" align="center">
          <template slot-scope="scope">
            {{ scope.row.matchDate }}
          </template>
        </el-table-column>
        <el-table-column label="匹配案号" align="center">
          <template slot-scope="scope">
            {{ scope.row.matchCaseNo }}
          </template>
        </el-table-column>
        <el-table-column label="案件身份" align="center">
          <template slot-scope="scope">
            {{ scope.row.caseIdentity }}
          </template>
        </el-table-column>
        <el-table-column label="处理状态" align="center">
          <template slot-scope="scope">
            {{ scope.row.operateState }}
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
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
              >修改</el-button
            >
            <el-button
              v-if="scope.row.userId !== 1"
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
            <el-button
              size="mini"
              type="text"
              icon="el-icon-thumb"
              @click="handleDelete(scope.row)"
              >处理</el-button
            >
            <el-button
              size="mini"
              type="text"
              icon="el-icon-tickets"
              @click="handleAnalyze(scope.row)"
              >详情</el-button
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
      <v-model-dialog v-model="detailVisible" :detail.sync="detail">
      </v-model-dialog>
    </div>

    <el-dialog
      :title="form.title"
      :visible.sync="form.innerVisible"
      :close-on-click-modal="false"
      append-to-body
      width="900px"
      height="800px"
      top="8vh"
      padding="0"
    >
      <el-form ref="form" :model="form" label-width="160px">
        <div>
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name" placeholder="请输入姓名" />
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="性别" prop="gender">
                <el-select
                  v-model="form.gender"
                  placeholder="性别"
                  clearable
                  size="small"
                >
                  <el-option key="男" label="男" value="男" />
                  <el-option key="女" label="女" value="女" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="21">
              <el-form-item label="身份证号" prop="idCard">
                <el-input v-model="form.idCard" placeholder="请输入身份证号" />
              </el-form-item>
            </el-col>
            <el-col :span="21">
              <el-form-item label="案件编号" prop="caseNo">
                <el-input v-model="form.caseNo" placeholder="请输入案件编号" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="21">
              <el-form-item label="另案处理原因" prop="reason">
                <el-input
                  v-model="form.reason"
                  placeholder="请输入另案处理原因"
                />
              </el-form-item>
            </el-col>
            <el-col :span="21">
              <el-form-item label="绰号" prop="nickName">
                <el-input v-model="form.nickName" placeholder="请输入绰号" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import vModelDialog from "./model.vue";
import { getList, add, del } from "@/api/other";
export default {
  data() {
    return {
      detail: {
        id: "",
        name: "",
        idCard: "",
        caseNo: "",
        identity: "",
        label: "",
        relationName: "",
        photo: "",
      },
      list: null,
      listLoading: true,
      queryParams: {
        pageNum: 0,
        pageSize: 10,
        total: 0,
      },
      detailVisible: false,
      keywordOptions: [
        {
          keywordName: "绰号",
        },
        {
          keywordName: "曾用名",
        },
        {
          keywordName: "案件身份",
        },
      ],
      form: {
        title: "",
        innerVisible: false,
        id: "",
        name: "",
        idCard: "",
        caseNo: "",
        reason: "",
        nickName: "",
        relationName: "",
        photo: "",
      },
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
          this.queryParams.total = res.data.total;
          this.listLoading = false;
          this.list = res.data.records;
        })
        .catch((err) => {
          this.listLoading = false;
          this.$message.error(err.message);
          console.log(err);
        });
    },
    resetQuery() {
      this.queryParams = {
        pageNum: 0,
        pageSize: 10,
        total: 0,
      };
    },
    handleAnalyze(row) {
      console.log(row);
      this.detail = row;
      this.detailVisible = true;
    },
    handleAdd() {
      this.form.title = "新增";
      this.form.innerVisible = true;
    },
    handleDelete(row) {
      this.$confirm("确定删除这行吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        del(row.id).then(() => {
          this.handleQuery();
        });
      });
    },
    handleUpdate(row) {
      this.form.title = "修改";
      this.form.id = row.id;
      this.form.name = row.name;
      this.form.gender = row.gender;
      this.form.idCard = row.idCard;
      this.form.caseNo = row.caseNo;
      this.form.reason = row.reason;
      this.form.nickName = row.nickName;
      // this.form.relationName = row.relationName;
      // this.form.photo = row.photo;
      this.$set(this.form, "innerVisible", true);
    },
    submitForm() {
      let that = this;
      console.log(this.form);
      add(this.form).then(() => {
        that.$message.success(this.form.title + "成功");
        that.handleQuery();
        that.form = {
          title: "",
          innerVisible: false,
          name: "",
          gender: "",
          idCard: "",
          caseNo: "",
          reason: "",
          nickName: "",
        };
        console.log(that.form);
      });
    },
    cancel() {
      this.form.innerVisible = false;
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
</style>
