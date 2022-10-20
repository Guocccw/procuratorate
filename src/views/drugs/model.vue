<!--
 * @Author: Guocc
 * @Date: 2022-09-30 13:25:18
 * @LastEditTime: 2022-10-19 20:02:54
 * @LastEditors: Guocc
 * @Description: 黄赌毒从业人员专项分析模型
-->
<template>
  <el-dialog
    title="分析模型"
    :visible.sync="innerVisible"
    width="1200px"
    height="800px"
    top="8vh"
    padding="0"
  >
    <div class="container">
      <h1 class="th">黄赌毒从业人员专项分析模型</h1>
      <div class="ab">
        <p>经黄赌毒从业人员专项分析模型分析</p>
        <p>
          {{ detail.name }}-{{ detail.idCard }}-{{ detail.caseNo }}
          的人员关系网络如下
        </p>
      </div>
      <div class="charts">
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
        />
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
import { getAnalytic, getallView } from "@/api/drugs";
import RelationGraph from "relation-graph";
export default {
  name: "vModelDialog",
  mixins: [vModelDialog],
  components: { RelationGraph },
  props: {
    detail: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      nodexlist: [],
      graphOptions: {
        allowSwitchLineShape: true,
        allowSwitchJunctionPoint: true,
        defaultJunctionPoint: "border",
        // 这里可以参考"Graph 图谱"中的参数进行设置
      },
    };
  },
  watch: {
    detail(data) {
      console.log(data);
      let id = data.id;
      if (id != -1) {
        this.handleQuery(id);
      } else {
        this.handleQueryAll();
      }
    },
  },
  methods: {
    handleQuery(id) {
      this.listLoading = true;
      getAnalytic({
        id,
      })
        .then((res) => {
          this.listLoading = false;
          let links = res.data.links;
          let nodes = res.data.nodeList;
          for (let node of nodes) {
            console.log(node.nodeType);
            if (node.nodeType == "keyword") {
              node.color = "#73c1ff";
              node.borderColor = "#73c1ff";
              node.width = "100";
              node.height = "100";
              node.styleClass = "keyword";
            }
            if (node.nodeType == "casePeople") {
              node.color = "#085bc3";
              node.borderColor = "#085bc3";
              node.width = "120";
              node.height = "120";
              node.styleClass = "casePeople";
            }

            if (node.nodeType == "keyword0") {
              node.color = "#FF4500";
              node.borderColor = "#FF4500";
              node.width = "100";
              node.height = "100";
              node.styleClass = "keyword";
            }
            if (node.nodeType == "casePeople0") {
              node.color = "#FF6347";
              node.borderColor = "#FF6347";
              node.width = "120";
              node.height = "120";
              node.styleClass = "casePeople";
            }
          }
          var jsonData = {
            rootId: "a",
            nodes: nodes,
            links: links,
          };
          this.$nextTick(() => {
            this.$refs.seeksRelationGraph.setJsonData(
              jsonData,
              (seeksRGGraph) => {
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
    handleQueryAll() {
      getallView({}).then((res) => {
        this.listLoading = false;
        let links = res.data.links;
        let nodes = res.data.nodeList;
        let url = "";
        for (let node of nodes) {
          console.log(node.nodeType);
          if (node.nodeType == "keyword") {
            node.color = "#73c1ff";
            node.borderColor = "#73c1ff";
            node.width = "100";
            node.height = "100";
            node.styleClass = "keyword";
          }
          if (node.nodeType == "casePeople") {
            node.color = "#085bc3";
            node.borderColor = "#085bc3";
            node.width = "120";
            node.height = "120";
            node.styleClass = "casePeople";
          }

          if (node.nodeType == "keyword0") {
            node.color = "#FF4500";
            node.borderColor = "#FF4500";
            node.width = "100";
            node.height = "100";
            node.styleClass = "keyword";
          }
          if (node.nodeType == "casePeople0") {
            console.log(node);
            url = node.data.photoUrl;
            let innerHTML =
              '<div class="c-my-node" style="background-image: url(' +
              url +
              ');"><div class="c-node-name" style="color:#ff875e">' +
              node.data.name +
              "</div></div>";
            // node.color = "#FF6347";
            // node.borderColor = "#FF6347";
            // node.width = "120";
            // node.height = "120";
            // node.styleClass = "casePeople";
            node.innerHTML = innerHTML;
          }
        }
        var jsonData = {
          rootId: "a",
          nodes: nodes,
          links: links,
        };
        this.$nextTick(() => {
          this.$refs.seeksRelationGraph.setJsonData(
            jsonData,
            (seeksRGGraph) => {
              console.log(seeksRGGraph);
            }
          );
        });
      });
    },
    onNodeClick(nodeObject, $event) {
      let node = nodeObject.data;
      console.log(node.type);
      if (node.type == "keyword" || node.type == "keyword0") {
        let label = node.keywordName;
        let value = node.keywordValue;
        this.nodexlist = [
          {
            label,
            value,
          },
        ];
      }
      if (node.type == "casePeople" || node.type == "casePeople0") {
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
    },
    onLineClick(lineObject, $event) {
      console.log("onLineClick:", lineObject);
    },
  },
};
</script>

<style>
.c-my-node {
  background-position: center center;
  background-size: 100%;
  border: #ff8c00 solid 2px;
  height: 80px;
  width: 80px;
  border-radius: 40px;
}

.c-node-name {
  width: 160px;
  margin-left: -40px;
  text-align: center;
  margin-top: 85px;
}
.rel-node {
  border: 0 !important;
}
</style>

<style lang="scss" scoped>
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
  .infoBlock {
    position: absolute;
    top: 10px;
    right: 20px;
    padding: 15px;
    min-width: 300px;
    background-color: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.12);
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.12);
    z-index: 8888;
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
</style>
