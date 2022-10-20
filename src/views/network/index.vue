<!--
 * @Author: Guocc
 * @Date: 2022-09-30 11:39:05
 * @LastEditTime: 2022-10-20 09:58:54
 * @LastEditors: Guocc
 * @Description: 通用线索分析
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
        <el-form-item label="线索" prop="clues" label-width="40px">
          <el-input
            v-model="name"
            placeholder="请输入线索"
            clearable
            size="small"
            style="width: 160px"
            :suffix-icon="showTree ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
            @click.native="deptogglePanel($event)"
            @blur="close()"
            @input="handleParamQuery"
          />
          <div v-if="showTree" class="treeDiv" ref="tableList">
            <el-table
              @row-click="handleRegionNodeClick"
              ref="moviesTable"
              :data="personnellist"
              border
              width="500px"
              height="400px"
              highlight-current-row
              :header-cell-style="{
                height: '10px',
                padding: 0,
              }"
            >
              <el-table-column prop="name" label="姓名"> </el-table-column>
              <el-table-column prop="gender" label="性别"></el-table-column>
              <el-table-column
                prop="idCard"
                label="身份证号"
                width="200"
              ></el-table-column>
              <el-table-column
                prop="caseNo"
                label="案件编号"
                width="200"
              ></el-table-column>
            </el-table>
          </div>
        </el-form-item>

        <el-form-item>
          <el-checkbox v-model="isLarge">扩大搜索范围</el-checkbox>
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
    <div class="charts boxshadow" v-loading="listLoading">
      <!-- <div ref="chart"> -->
      <div class="infoBlock" v-show="nodexlist.length > 0">
        <div class="nodexli" v-for="node in nodexlist" :key="node.label">
          <div class="xlabel">{{ node.label }}：</div>
          <div class="xvalue">{{ node.value }}</div>
        </div>
      </div>
      <RelationGraph
        ref="seeksRelationGraph"
        :options="graphOptions"
        :on-node-click="onNodeClick"
        :on-line-click="onLineClick"
      >
      </RelationGraph>
      <!-- </div> -->
    </div>
    <div
      v-if="isShowNodeTipsPanel"
      :style="{
        left: nodeMenuPanelPosition.x + 'px',
        top: nodeMenuPanelPosition.y + 'px',
      }"
      style="
        z-index: 999;
        padding: 10px;
        background-color: #ffffff;
        border: #eeeeee solid 1px;
        box-shadow: 0px 0px 8px #cccccc;
        position: absolute;
      "
    >
      <div
        style="
          line-height: 25px;
          padding-left: 10px;
          color: #888888;
          font-size: 12px;
        "
      >
        节点名称：{{ currentNode.text }}
      </div>
      <div class="c-node-menu-item">id:{{ currentNode.text }}</div>
      <div class="c-node-menu-item">图标:{{ currentNode.data.myicon }}</div>
    </div>
  </div>
</template>

<script>
import RelationGraph from "relation-graph";
import { getList, getQueryList } from "@/api/network";
export default {
  data() {
    return {
      showTree: false,
      personnellist: null,
      listLoading: false,
      isShowNodeTipsPanel: false,
      queryParams: {
        id: "",
      },
      nodeMenuPanelPosition: { x: 0, y: 0 },
      name: "",
      nodexlist: [],
      graphOptions: {
        allowSwitchLineShape: true,
        allowSwitchJunctionPoint: true,
        defaultJunctionPoint: "border",
        // 这里可以参考"Graph 图谱"中的参数进行设置
      },
      keywordOptions: [
        {
          keywordName: "姓名",
        },
        {
          keywordName: "性别",
        },
        {
          keywordName: "绰号",
        },
        {
          keywordName: "身份证号码",
        },
        {
          keywordName: "案件编号",
        },
        {
          keywordName: "身份",
        },
      ],
      isLarge: false,
      isLoading: false,
    };
  },
  components: { RelationGraph },
  mounted() {
    this.handleQuery();
    this.handleParamQuery();
  },
  methods: {
    search() {
      this.queryParams.pageNum = 0;
      this.handleQuery();
    },
    handleQuery() {
      this.listLoading = true;
      if (!this.queryParams.casePepId) {
        this.queryParams.casePepId = this.$route.query.id;
        if (!this.$route.query.id) {
          this.listLoading = false;
          return;
        }
      }

      this.queryParams.expandSearch = this.isLarge == true ? 1 : 0;
      getList(this.queryParams)
        .then((res) => {
          this.listLoading = false;
          let links = res.data.links;
          let nodes = res.data.nodeList;
          for (let node of nodes) {
            if (node.nodeType == "keyword") {
              node.color = "#1f6ed4";
              node.borderColor = "#1f6ed4";
              node.width = "100";
              node.height = "100";
              node.styleClass = "keyword";
            }
            if (node.nodeType == "casePeople") {
              node.color = "#0000a1";
              node.borderColor = "#0000a1";
              node.width = "120";
              node.height = "120";
              node.styleClass = "casePeople";
            }
          }
          let newLinks = [];
          links.map((item, index) => {
            newLinks.push(
              Object.assign(item, {
                lineWidth: 2,
                lineShape: 1,
                color: "rgba(30, 144, 255, 1)",
              })
            );
          });
          var jsonData = {
            rootId: "a",
            nodes: nodes,
            links: newLinks,
          };
          this.$nextTick(() => {
            // this.$refs.seeksRelationGraph.setLines();
            this.$refs.seeksRelationGraph.setJsonData(
              jsonData,
              (seeksRGGraph) => {
                // Called when the relation-graph is completed
                console.log(seeksRGGraph);
              }
            );
          });
        })
        .catch((err) => {
          this.listLoading = false;
          this.$message.error(err.message);
          console.log(err);
        });
    },
    handleParamQuery() {
      getQueryList({
        keyword: this.name,
      }).then((res) => {
        this.personnellist = res.data;
      });
    },
    handleRegionNodeClick(row) {
      this.name = row.name;
      this.queryParams.casePepId = row.casePepId;
      this.handleQuery();
      this.showTree = false;
    },
    deptogglePanel(event) {
      event || (event = window.event);
      event.stopPropagation
        ? event.stopPropagation()
        : (event.cancelBubble = true);
      this.showTree = true;
    },
    close() {
      let that = this;
      setTimeout(() => {
        that.showTree = false;
      }, 500);
    },
    resetQuery() {
      this.name = "";
      this.isLarge = false;
      this.queryParams = {};
    },
    showNodeTips(nodeObject, $event) {
      this.currentNode = nodeObject;
      var _base_position = this.$refs.myPage.getBoundingClientRect();
      this.isShowNodeTipsPanel = true;
      this.nodeMenuPanelPosition.x = $event.clientX - _base_position.x + 10;
      this.nodeMenuPanelPosition.y = $event.clientY - _base_position.y + 10;
    },
    hideNodeTips(nodeObject, $event) {
      this.isShowNodeTipsPanel = false;
    },
    onNodeClick(nodeObject, $event) {
      let allNodes = this.$refs.seeksRelationGraph.getNodes();
      console.log(allNodes);
      for (let itemNode of allNodes) {
        itemNode.borderWidth = 0;
        if (itemNode.data.type == "keyword") {
          itemNode.color = "#1f6ed4";
          itemNode.borderColor = "#1f6ed4";
          itemNode.width = "100";
          itemNode.height = "100";
          itemNode.styleClass = "keyword";
        }
        if (itemNode.data.type == "casePeople") {
          itemNode.color = "#0000a1";
          itemNode.borderColor = "#0000a1";
          itemNode.width = "120";
          itemNode.height = "120";
          itemNode.styleClass = "casePeople";
        }
      }
      for (let childNode of nodeObject.targetNodes) {
        childNode.borderWidth = 3;
        childNode.borderColor = "red";
        childNode.color = "red";
      }
      let node = nodeObject.data;
      if (node.type == "keyword") {
        let label = node.keywordName;
        let value = node.keywordValue;
        this.nodexlist = [
          {
            label,
            value,
          },
        ];
      }
      if (node.type == "casePeople") {
        this.nodexlist = [
          {
            label: "姓名",
            value: node.name,
          },
          {
            label: "性别",
            value: node.gender,
          },
          {
            label: "身份证号",
            value: node.idCard,
          },
          {
            label: "案件编号",
            value: node.caseNo,
          },
        ];
      }
      if (node.type == "expand") {
        this.nodexlist = [
          {
            label: "公文",
            value: node.fileName,
          },
        ];
      }
    },
    onLineClick(lineObject, $event) {
      console.log("onLineClick:", lineObject);
    },
  },
};
</script>

<style lang="scss" scoped>
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
.charts {
  width: 100%;
  padding: 30px;
  height: 75vh;
  position: relative;
  .infoBlock {
    position: absolute;
    top: 10px;
    right: 20px;
    padding: 15px;
    min-width: 300px;
    background-color: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.12);
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.12);
    z-index: 888;
    .nodexli {
      display: flex;
      font-size: 15px;
      line-height: 26px;
      .xlabel {
        font-weight: 600;
      }
      .xvalue {
        font-size: 14px;
      }
    }
  }
}
.keyword {
  font-size: 34px;
}

.casePeople {
  font-size: 26px;
}
::v-deep .rel-node-peel {
  font-size: 22px;
}

::v-deep .rel-node-checked {
  box-shadow: 0px 0px 50px #39bae8;
}

.treeDiv {
  position: absolute;
  z-index: 99999;
}
</style>
