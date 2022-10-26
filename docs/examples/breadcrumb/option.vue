<script>
export default {
  setup() {
    const list = [
      { label: '落日绣帘卷', id: '落日绣帘卷' },
      { label: '亭下水连空', id: '亭下水连空' },
      { label: '知君为我新作', id: '知君为我新作' },
      { label: '窗户湿青红', id: '窗户湿青红' },
      { label: '长记平山堂上', id: '欹枕江南烟雨' },
      { label: '欹枕江南烟雨', id: '长记平山堂上' },
      { label: '杳杳没孤鸿', id: '杳杳没孤鸿' },
      { label: '认得醉翁语', id: '认得醉翁语' },
      { label: '山色有无中', id: '山色有无中' },
      { label: '一點浩然氣', id: '一點浩然氣' },
      { label: '千里快哉風我', id: 'fjkhfsdaiuorgga' },

    ]
    const handleClickOption = (params) => {
      console.log(params)
    }
    return {
      list,
      handleClickOption,
    }
  },
}
</script>

<template>
  <be-breadcrumb>
    <be-breadcrumb-item to="/苏洵">
      苏洵
    </be-breadcrumb-item>
    <be-breadcrumb-item :option="list" :click-option="handleClickOption" to="/苏轼">
      苏轼
    </be-breadcrumb-item>
    <be-breadcrumb-item to="/苏辙">
      苏辙
    </be-breadcrumb-item>
  </be-breadcrumb>
</template>
