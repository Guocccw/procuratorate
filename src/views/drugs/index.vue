<!--
 * @Author: Guocc
 * @Date: 2022-09-29 10:47:01
 * @LastEditTime: 2022-10-14 14:38:55
 * @LastEditors: Guocc
 * @Description: 黄赌毒专项线索分析
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
        <el-form-item label="身份证号码" prop="idCard" label-width="90px">
          <el-input
            v-model="queryParams.idCard"
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
            @click="search"
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
          >新增线索</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          @click="handleDelete"
          >删除线索</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button type="primary" size="mini" @click="handlePic"
          >黄赌毒涉案人员全景图</el-button
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
        <el-table-column label="性别" align="center">
          <template slot-scope="scope">
            {{ scope.row.gender }}
          </template>
        </el-table-column>
        <el-table-column label="身份" align="center">
          <template slot-scope="scope">
            {{ scope.row.identity }}
          </template>
        </el-table-column>
        <el-table-column label="标签" align="center">
          <template slot-scope="scope">
            {{ scope.row.label }}
          </template>
        </el-table-column>
        <el-table-column label="关联人员" align="center">
          <template slot-scope="scope">
            {{ scope.row.relationName }}
          </template>
        </el-table-column>
        <el-table-column label="照片" align="center">
          <template slot-scope="scope">
            <el-image :src="scope.row.photo" class="photo" v-image-preview />
          </template>
        </el-table-column>
        <el-table-column label="案件线索" align="center">
          <template slot-scope="scope">
            <div class="cursor" @click="toPersonel(scope.row)">
              {{ scope.row.clue }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="入库时间"
          align="center"
          prop="createTime"
          :formatter="dateFormat"
        >
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
              icon="el-icon-tickets"
              @click="handleAnalyze(scope.row)"
              >模型分析</el-button
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
    <el-dialog
      :title="form.title"
      :visible.sync="form.innerVisible"
      :close-on-click-modal="false"
      append-to-body
      width="1200px"
      height="800px"
      top="8vh"
      padding="0"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <div>
          <el-row>
            <el-col :span="6">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name" placeholder="请输入姓名" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
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
            <el-col :span="6">
              <el-form-item label="身份证号" prop="idCard">
                <el-input v-model="form.idCard" placeholder="请输入身份证号" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="案件编号" prop="caseNo">
                <el-input v-model="form.caseNo" placeholder="请输入案件编号" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="身份" prop="identity">
                <el-input v-model="form.identity" placeholder="请输入身份" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="标签" prop="label">
                <el-input v-model="form.label" placeholder="请输入标签" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="关联人员" prop="relationName">
                <el-input
                  v-model="form.relationName"
                  placeholder="请输入关联人员"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="照片" prop="photo">
                <el-input v-model="form.photo" placeholder="请输入照片" />
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
import moment from "moment";
import { getList, add, del } from "@/api/drugs";
export default {
  data() {
    return {
      list: null,
      listLoading: true,
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
        identity: "",
        label: "",
        relationName: "",
        photo: "",
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
        identity: "",
        label: "",
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
    search() {
      this.queryParams.pageNum = 0;
      this.handleQuery();
    },
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
          console.log(err);
        });
    },
    toPersonel(row) {
      let id = row.id;
      this.$router.push({
        path: "/personnel/index",
        query: { id: id },
      });
    },
    resetQuery() {
      this.queryParams = {
        pageNum: 0,
        pageSize: 10,
      };
      this.handleQuery();
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
    handlePic() {
      this.detail = {
        id: -1,
      };
      this.detailVisible = true;
    },
    handleUpdate(row) {
      this.form.title = "修改";
      this.form.id = row.id;
      this.form.name = row.name;
      this.form.gender = row.gender;
      this.form.idCard = row.idCard;
      this.form.caseNo = row.caseNo;
      this.form.identity = row.identity;
      this.form.label = row.label;
      this.form.relationName = row.relationName;
      this.form.photo = row.photo;
      this.$set(this.form, "innerVisible", true);
    },
    submitForm() {
      add(this.form).then(() => {
        this.$message.success(this.form.title + "成功");
        this.handleQuery();
        this.form = {
          title: "",
          innerVisible: false,
          name: "",
          gender: "",
          idCard: "",
          caseNo: "",
          identity: "",
          label: "",
          relationName: "",
          photo: "",
        };
      });
    },
    handleAnalyze(row) {
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
    cancel() {
      this.form.innerVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.cursor {
  cursor: pointer;
  color: #409eff;
  text-decoration: underline;
}
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
.photo {
  width: 40px;
  height: 60px;
  cursor: pointer;
}
</style>
