<template>
  <be-popover customClass="customClass-popover">
    <template #trigger>
      <be-button style="margin-right: 5px" customClass="sm:mb-4" type="info" bordered>阴天快乐</be-button>
    </template>
    <p>想对着天说</p>
    <p>无论如何 阴天快乐</p>
  </be-popover>
</template>
<style>
.customClass-popover .be-popover{
  background-color: #f0f9eb;
}
</style>
