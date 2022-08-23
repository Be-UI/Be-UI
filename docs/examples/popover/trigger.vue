<template>
  <div class="flex">
    <be-popover customClass="header-popover" trigger="hover">
      <template #trigger>
        <be-button style="margin-right: 5px" customClass="sm:mb-4" type="info" bordered>一丝不挂</be-button>
      </template>
      <p>那时青丝</p>
      <p>不会用上余生来量度</p>
      <p>但我拖着躯壳</p>
      <p>发现沿途寻找的快乐</p>
    </be-popover>
    <be-popover customClass="header-popover" trigger="click">
      <template #trigger>
        <be-button style="margin-right: 5px" customClass="sm:mb-4" type="info" bordered>内疚</be-button>
      </template>
      <p>我曾知道 你的好</p>
      <p>我曾知道 你有多重要</p>
    </be-popover>
    <be-popover customClass="header-popover" trigger="manual">
      <template #trigger>
        <be-button style="margin-right: 5px" customClass="sm:mb-4" type="info" bordered>是但求其爱</be-button>
      </template>
      <p>今天先记得听过人说这叫半生瓜</p>
      <p>怕只怕求其终生　被困</p>
    </be-popover>
  </div>

</template>
