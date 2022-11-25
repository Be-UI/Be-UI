<template>
  <div class="flex">
    <be-popover custom-class="header-popover" placement="top">
      <template #trigger>
        <be-button style="margin-right: 5px" custom-class="sm:mb-4" type="info" bordered>
          单车
        </be-button>
      </template>
      <p>难离难舍想抱紧些</p>
      <p>茫茫人生好象荒野</p>
    </be-popover>

    <be-popover custom-class="header-popover" placement="right">
      <template #trigger>
        <be-button style="margin-right: 5px" custom-class="sm:mb-4" type="info" bordered>
          你会不会
        </be-button>
      </template>
      <p>我们约会我们再会</p>
      <p>没想到再没有拥抱的机会</p>
    </be-popover>

    <be-popover custom-class="header-popover" placement="bottom">
      <template #trigger>
        <be-button style="margin-right: 5px" custom-class="sm:mb-4" type="info" bordered>
          浮夸
        </be-button>
      </template>
      <p>夸张只因我很怕</p>
      <p>似木头似石头的话得到注意吗</p>
    </be-popover>

    <be-popover custom-class="header-popover" placement="left">
      <template #trigger>
        <be-button style="margin-right: 5px" custom-class="sm:mb-4" type="info" bordered>
          你的背包
        </be-button>
      </template>
      <p>那个背包载满记念品和患难</p>
      <p>还有摩擦留下的图案</p>
    </be-popover>
  </div>
</template>
