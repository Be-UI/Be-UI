<template>
  <div class="flex">
    <div class="demo">
      <be-badge :value="number" type="primary">
        <be-button type="primary">
          弱小和无知
        </be-button>
      </be-badge>
    </div>

    <div class="demo">
      <be-badge :value="number" type="success">
        <be-button type="primary">
          都不是生存的障碍
        </be-button>
      </be-badge>
    </div>

    <div class="demo">
      <be-badge :value="number" type="info">
        <be-button type="primary">
          傲慢才是
        </be-button>
      </be-badge>
    </div>

    <div class="demo">
      <be-badge :value="number" type="warning">
        <be-button type="primary">
          毁灭你
        </be-button>
      </be-badge>
    </div>

    <div class="demo">
      <be-badge :value="number" type="error">
        <be-button type="primary">
          与你何干
        </be-button>
      </be-badge>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from  'vue'
const number = ref(110)
</script>
<style>
.demo{
  margin: 0 20px
}
</style>
