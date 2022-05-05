<template>
    <be-dialog
        titles="方珍珠"
        v-model:is-show="show">
    </be-dialog>
</template>
<script setup lang="ts">
import {ref} from "vue";
 const show = ref(true)
</script>
