<template>
    <el-input
        ref="input"
        :value="s_value"
        @input="(e) => (s_value = $attrs.type === 'textarea' ? e : e.replace(/\//gi, '').trim())"
        :maxlength="$attrs.maxlength || ($attrs.type === 'textarea' ? 255 : 100)"
        :clearable="clearable"
        v-on="$listeners"
        v-bind="$attrs"
        :size="$attrs.size || $store.getters.size"
    >
        <slot name="prefix" slot="prefix"></slot>
        <slot name="suffix" slot="suffix"></slot>
        <slot name="prepend" slot="prepend"></slot>
        <slot name="append" slot="append"></slot>
    </el-input>
</template>

<script>
export default {
    name: 'com-input',
    model: {
        prop: 'value',
        event: 'change',
    },
    /***
     * 参数属性
     * @property {Object[]} value 默认值
     */
    props: {
        value: null,
        clearable: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            s_value: this.value,
        };
    },
    watch: {
        value(val) {
            this.s_value = val;
        },
        s_value(val) {
            // 文本编辑框可以输入空格和回车以及/
            this.$emit('change', val);
        },
    },
    // created() {
    //   console.log(this.$attrs.maxlength);
    //   const maxlength = this.$attrs.maxlength || (this.$attrs.type === "textarea" ? 500 : 100);
    // }
};
</script>
