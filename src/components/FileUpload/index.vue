<template>
  <div
    class="upload-file"
    v-loading='loading'
  >
    <div v-if='img'>
      <el-upload
        :size='$store.getters.size'
        ref='img'
        drag
        action=""
        class="avatar-uploader"
        :auto-upload="true"
        :http-request="fileUpload"
        :show-file-list="false"
      >
        <div
          v-if="fileList.length"
          class="imgUpload flex-center"
        >
          <img
            style='max-width: 100%;max-height: 100%;'
            :src="fileList[0].url"
          >
          <span class="el-upload-list__item-actions">
            <i
              class="el-icon-zoom-in"
              @click.stop="dialogVisible=true;dialogImageUrl=fileList[0].url"
            />
            <i
              class="el-icon-download"
              @click.stop="downloadFile(fileList[0])"
            />
            <com-button
              class="imgIcon"
              icon="el-icon-delete"
              @click.stop="handleDelete(0)"
              circle
            ></com-button>
          </span>
        </div>
        <div
          v-else
          class="text"
        >
          <i
            class="el-icon-plus avatar-uploader-icon"
            v-if='!exportShow'
          ></i>
          <div
            class="el-upload__text"
            v-if='!exportShow'
          >点击或将设备图片拖拽到这里上传</div>
          <div
            class="el-upload__tip"
            slot="tip"
            v-if="showTip && !exportShow"
          >
            请上传
            <template v-if="fileSize"> 不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b> </template>
            <template v-if="fileType.length"> 格式为 <b style="color: #f56c6c">{{ fileType.join("/") }}</b> </template>
            的文件
          </div>
        </div>
      </el-upload>
    </div>
    <div v-else>
      <el-upload
        drag
        :size='$store.getters.size'
        ref='file'
        action=""
        class="avatar-uploader"
        :auto-upload="true"
        :http-request="fileUpload"
        :show-file-list="false"
      >
        <!-- 文件列表 -->
        <div
          v-if="fileList.length"
          class="fileList"
        >
          <div class="list">
            <transition-group name="el-fade-in-linear">
              <div
                class="fileList_item"
                v-for="(file, index) in fileList"
                :key="file.name+index"
              >
                <span>{{ file.fileName }}</span>
                <span>
                  <button
                    type="button"
                    @click.stop="downloadFile(file)"
                    class="el-button el-button--primary el-button--mini is-circle"
                  >
                    <i
                      class="el-icon-download"
                      style='color:#ffffff'
                    ></i>
                  </button>
                  <com-button
                    type="danger"
                    icon="el-icon-delete"
                    @click.stop="handleDelete(index)"
                    size="mini"
                    circle
                  ></com-button>
                </span>
              </div>
            </transition-group>
          </div>
          <div
            class="fileList_add"
            v-if='!exportShow'
          >
            <div slot="trigger">
              <div
                style='margin-top: 0px;'
                class="el-upload__tip"
                slot="tip"
                v-if="showTip"
              >
                请上传
                <template v-if="fileSize"> 不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b> </template>
                <template v-if="fileType.length"> 格式为 <b style="color: #f56c6c">{{ fileType.join("/") }}</b> </template>
                的文件
              </div>
            </div>
          </div>
        </div>

        <div
          v-else
          class="text"
        >
          <i
            class="el-icon-plus avatar-uploader-icon"
            v-if='!exportShow'
          ></i>
          <span
            class="el-upload__text"
            v-if='!exportShow'
          >将文件拖到此处，或<em>点击上传</em></span>
          <div
            class="el-upload__tip"
            slot="tip"
            v-if="showTip && !exportShow"
          >
            请上传
            <template v-if="fileSize"> 不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b> </template>
            <template v-if="fileType.length"> 格式为 <b style="color: #f56c6c">{{ fileType.join("/") }}</b> </template>
            的文件
          </div>
        </div>
      </el-upload>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img
        style="max-height: 100%;max-width: 100%;"
        :src="dialogImageUrl"
        alt=""
      >
    </el-dialog>
  </div>
</template>

<script>
/**
 * 请求接口
 */
import { fileUpload, downloadFile } from "@api/file";

export default {
  name: "FileUpload",
  model: {
    prop: "value",
    event: "success"
  },
  props: {
    // img
    img: {
      type: Boolean,
      default: false
    },
    // 值
    value: [String, Object, Array],
    // 大小限制(MB)
    fileSize: {
      type: Number,
      default: 100
    },
    // 文件类型, 例如['png', 'jpg', 'jpeg']
    fileType: {
      type: Array,
      default: () => []
    },
    // 是否显示提示
    isShowTip: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: [],
      loading: false,
      exportShow: false
    };
  },
  watch: {
    value: {
      handler(val) {
        if (val) {
          // 首先将值转为数组
          const list = Array.isArray(val) ? val : [val];
          // 然后将数组转为对象数组
          this.fileList = list.map(item => {
            if (typeof item === "string") {
              item = { fileName: item, url: item };
            }
            return item;
          });
        } else {
          this.fileList = [];
        }
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    // 是否显示提示
    showTip() {
      return this.isShowTip && (this.fileType || this.fileSize);
    }
  },
  methods: {
    // 文件下载
    downloadFile(data) {
      this.loading = true;
      downloadFile(data).then(res => {
        this.msgSuccess("下载成功！");
        this.loading = false;
      });
    },
    // 文件上传
    fileUpload(data) {
      if (data.file) {
        if (this.handleBeforeUpload(data.file)) {
          this.loading = true;
          let formdata = new FormData();
          formdata.append("file", data.file);
          fileUpload(formdata)
            .then(res => {
              this.$message.success("上传成功");
              if (this.img) {
                this.fileList = [
                  {
                    fileName: res.data.name,
                    url: res.data.url
                  }
                ];
              } else {
                this.fileList.push({
                  fileName: res.data.name,
                  url: res.data.url
                });
              }
              this.$emit("success", this.fileList);
              this.loading = false;
            })
            .catch(err => {
              this.loading = false;
              this.$message.error("上传失败, 请重试");
            });
        }
      }
    },
    // 上传前校检格式和大小
    handleBeforeUpload(file) {
      // 校检文件类型
      if (this.fileType.length) {
        let fileExtension = "";
        if (file.name.lastIndexOf(".") > -1) {
          fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1);
        }
        const isTypeOk = this.fileType.some(type => {
          if (file.type.indexOf(type) > -1) return true;
          if (fileExtension && fileExtension.indexOf(type) > -1) return true;
          return false;
        });
        if (!isTypeOk) {
          this.$message.error(
            `文件格式不正确, 请上传${this.fileType.join("/")}格式文件!`
          );
          return false;
        }
      }
      // 校检文件大小
      if (this.fileSize) {
        const isLt = file.size / 1024 / 1024 < this.fileSize;
        if (!isLt) {
          this.$message.error(`上传文件大小不能超过 ${this.fileSize} MB!`);
          return false;
        }
      }
      return true;
    },
    // 删除文件
    handleDelete(index) {
      this.$$confirm("此操作将删除该数据, 是否继续?")
        .then(() => {
          this.fileList.splice(index, 1);
          this.msgSuccess("删除成功");
          this.$emit("success", this.fileList);
        })
        .catch(() => {
          this.msgInfo("已取消删除！");
        });
    }
  },
  mounted() {
    this.exportShow =
      (this.$refs.img && this.$refs.img.$children[0].disabled) ||
      (this.$refs.file && this.$refs.file.$children[0].disabled);
  }
};
</script>

<style scoped lang="scss">
.text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.imgUpload {
  position: relative;
  width: 100%;
  height: 100%;
  .el-upload-list__item-actions {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    cursor: default;
    text-align: center;
    color: #fff;
    opacity: 0;
    font-size: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s;
    display: flex;
    justify-content: space-around;
    align-items: center;
    i {
      display: none;
      cursor: pointer;
    }
    &:hover {
      opacity: 1;
      i {
        display: inline-block;
      }
    }
  }
  .imgIcon {
    background-color: transparent;
    border-color: transparent;
    font-size: 20px;
    color: #fff;
  }
}
.avatar-uploader-icon {
  font-size: 30px;
  color: #1790ff;
  text-align: center;
  font-weight: bold;
  display: block;
}

/deep/.el-upload:focus {
  border-color: #409eff;
  color: #303133;
}

.fileList {
  position: absolute;
  left: 0;
  top: 0;
  cursor: default;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .list {
    flex: 1 0 auto;
    height: 0;
    width: 100%;
    > span {
      width: 100%;
      height: 100%;
      overflow: auto;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
    }
  }
  &_item {
    font-size: 12px;
    width: 50%;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    box-sizing: border-box;
    span:first-child {
      flex: 1 0 auto;
      width: 0;
      text-align: left;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    span:last-child {
      i {
        cursor: pointer;
        color: blue;
      }
    }
  }
  &_add {
    width: 100%;
    background: #f7f1f1;
    cursor: pointer;
    border-radius: 5px;
    bottom: 0px;
  }
}

/deep/.el-button--mini.is-circle {
  padding: 4px;
}
</style>