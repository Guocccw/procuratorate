<!--
 * @Author: Guocc
 * @Date: 2022-09-29 10:01:38
 * @LastEditTime: 2022-10-19 19:44:24
 * @LastEditors: Guocc
 * @Description: 涉案人员信息库
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
        <el-form-item label="关键词" prop="keywordName">
          <el-select
            v-model="queryParams.keywordName"
            placeholder="关键词"
            clearable
            size="small"
            style="width: 100px"
          >
            <el-option
              v-for="dict in keywordOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictLabel"
            />
          </el-select>
          <el-input
            v-model="queryParams.keywordValue"
            clearable
            size="small"
            style="width: 240px; margin-left: 10px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
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
        <el-table-column align="center" label="序号" width="95">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <!-- <el-table-column label="编号">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column> -->
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="性别" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.gender }}</span>
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
        <el-table-column label="关键词" align="center">
          <template slot-scope="scope">
            {{ scope.row.keywordName }}
          </template>
        </el-table-column>
        <el-table-column label="内容" align="center">
          <template slot-scope="scope">
            {{ scope.row.keywordValue }}
          </template>
        </el-table-column>
        <el-table-column label="入库日期" align="center">
          <template slot-scope="scope">
            {{ scope.row.createTime }}
          </template>
        </el-table-column>
        <el-table-column label="修改日期" align="center">
          <template slot-scope="scope">
            {{ scope.row.updateTime }}
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
              icon="el-icon-tickets"
              @click="handleAn(scope.row)"
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
        </div>
        <div class="btnx">
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="handleAddClues"
            >新增</el-button
          >
        </div>
        <div class="card_block">
          <el-row v-for="(item, index) in form.keywordList" :key="index">
            <el-col :span="1">
              <div class="iconx" @click="removeClue(index)">
                <i
                  class="el-icon-remove"
                  style="color: #f56c6c; font-size: 30px; display: block"
                >
                </i>
              </div>
            </el-col>
            <el-col :span="6">
              <el-form-item label="关键词" prop="postName">
                <el-select
                  v-model="item.keywordName"
                  placeholder="关键词"
                  clearable
                  size="small"
                >
                  <el-option
                    v-for="dict in keywordOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictLabel"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="内容" prop="keywordValue">
                <el-input
                  v-model="item.keywordValue"
                  placeholder="请输入内容"
                />
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
import { getList, add, del } from "@/api/personnel";
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
      keywordOptions: [],
      form: {
        title: "",
        innerVisible: false,
        name: "",
        gender: "",
        idCard: "",
        caseNo: "",
        keywordList: [
          {
            keywordName: "",
            keywordValue: "",
          },
        ],
      },
      id: "",
    };
  },
  created() {
    let id = this.$route.query.id;
    this.id = id;
    this.getDicts("keyword").then((res) => {
      this.keywordOptions = res.data;
    });
    this.handleQuery();
  },
  methods: {
    search() {
      this.queryParams.pageNum = 0;
      this.handleQuery();
    },
    handleQuery() {
      this.listLoading = true;
      if (this.id) {
        this.queryParams.pdgPepId = this.id;
      }
      getList(this.queryParams)
        .then((res) => {
          this.queryParams.total = res.data.total;
          this.listLoading = false;
          this.list = res.data.records;
        })
        .catch((err) => {
          this.listLoading = false;
          this.$message.error(err.message);
          console.error(err);
        });
    },
    resetQuery() {
      this.id = "";
      this.queryParams = {
        pageNum: 0,
        pageSize: 10,
      };
      this.handleQuery();
    },
    handleAdd() {
      this.form.innerVisible = true;
    },
    handleAddClues() {
      this.form.keywordList.push({
        keywordName: "",
        keywordValue: "",
      });
    },
    removeClue(index) {
      this.form.keywordList.splice(index, 1);
    },
    handleUpdate(row) {
      this.form.title = "修改";
      this.form.id = row.casePepId;
      this.form.name = row.name;
      this.form.gender = row.gender;
      this.form.idCard = row.idCard;
      this.form.caseNo = row.caseNo;
      this.$set(this.form, "innerVisible", true);
      this.form.keywordList = [];
    },
    handleDelete(row) {
      this.$confirm("确定删除这行吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        del({
          id: row.id,
          casePepId: row.casePepId,
        }).then(() => {
          this.handleQuery();
        });
      });
    },
    submitForm() {
      let that = this;
      console.log(this.form);
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
          keywordList: [
            {
              keywordName: "",
              keywordValue: "",
            },
          ],
        };
      });
    },
    handleAn(row) {
      this.$router.push({
        path: "/network/index",
        query: { id: row.casePepId },
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
.btnx {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
.card_block {
  padding: 20px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.iconx {
  display: flex;
  align-items: center;
}
</style>
