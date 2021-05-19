/**
 * 全局插件配置资源（vue插件部分）
 * @module utils/plugin
 */
import waves from './directives/waves'
import hasRole from './directives/hasRole'
import hasPermi from './directives/hasPermi'
import preventReClick from './directives/preventReClick'
import { getDicts } from "@/api/system/dict/data";
import { selectDictLabel } from '@utils/util'
import { clone } from '@utils/convert'

export default {
    install: function (Vue, options) {
        /**
         * 全局指令
         */
        Vue.directive('waves', waves)
        Vue.directive('hasRole', hasRole)
        Vue.directive('hasPermi', hasPermi)
        Vue.directive('preventReClick', preventReClick)
        /**
         * 原型链全局挂载方法
         */
        Vue.prototype.selectDictLabel = selectDictLabel;
        Vue.prototype.getDicts = getDicts;

        Vue.prototype.msgSuccess = function (msg) {
            this.$message({ showClose: true, message: msg, type: "success" });
        };

        Vue.prototype.msgError = function (msg) {
            this.$message({ showClose: true, message: msg, type: "error" });
        };

        Vue.prototype.msgInfo = function (msg) {
            this.$message.info(msg);
        };

        Vue.prototype.resetForm = function (refName) {
            if (this.$refs[refName]) {
                this.$refs[refName].resetFields()
            }
        };

        Vue.prototype.clone = clone;

        Vue.prototype.$$confirm = function (item = "是否确认导出所有数据项？", title = '提示', confirmButtonText = '确定', cancelButtonText = '取消', type = 'warning') {
            return new Promise((resolve, reject) => {
                this.$confirm(item, title, {
                    confirmButtonText,
                    cancelButtonText,
                    type
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            });
        }
    }
}