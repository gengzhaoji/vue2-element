<template>
    <el-button v-preventReClick v-on="$listeners" v-bind="$attrs" :size="$attrs.size || $store.getters.size">
        <slot></slot>
    </el-button>
</template>

<script>
export default {
    name: 'com-button',
};
</script>
