/*
* @be-contextmenu-Submenu.vue
* @deprecated 右键菜单-菜单子菜单容器组件 使用时配合Contextmenu.vue和ContextmenuItem.vue
* @author czh
* @update (czh 2021/4/10)
*/
<template>
  <li :class="classname"
      @mouseenter="handleMouseenter"
      @mouseleave="handleMouseleave">
        <span class="be-contextmenu-submenu__title">
            <slot name="title">{{ title }}</slot>
          <!-- <span class="be-contextmenu-iconfont be-contextmenu-submenu__icon" /> -->
        </span>
    <div v-show="hover" ref="submenu" :class="submenuCls">
      <ul>
        <!-- @slot 插槽内容可以使用常规标签，
        也可以嵌套使用组件 be-contextmenu-item、be-contextmenu-Submenu-->
        <slot/>
      </ul>
    </div>
  </li>
</template>

<script>
/**
 * 右键菜单公共组件-子菜单内容容器组件
 */
export default {
  name: "BeContextmenuSubmenu",
  props: {
    /**
     * 是否禁用
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * 子菜单名称
     */
    title: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      hover: false,
      submenuPlacement: [],
    };
  },
  computed: {
    classname() {
      return {
        "be-contextmenu-item": true,
        "be-contextmenu-submenu": true,
        "be-contextmenu-item--hover": this.hover,
        "be-contextmenu-item--disabled": this.disabled,
      };
    },
    submenuCls() {
      return ["be-contextmenu", ...this.submenuPlacement];
    },
  },

  methods: {
    /**
     * 鼠标移入子菜单方法方法
     * @param {Object} event 事件对象
     */
    handleMouseenter(event) {
      //禁用直接返回
      if (this.disabled) return;
      const {target} = event;
      //获取事件元素相对于浏览器视窗位置
      const targetDimension = target.getBoundingClientRect();
      //hover效果
      this.hover = true;
      /** 鼠标移入方法
       * @event mouseenter
       * @param {Event} event - 事件对象
       */
      this.$emit("mouseenter", this, event);

      this.$nextTick(() => {
        //获取submenu Ul标签宽高
        const submenuWidth = this.$refs.submenu.clientWidth;
        const submenuHeight = this.$refs.submenu.clientHeight;
        const submenuPlacement = [];
        //适应展示不同位置的子菜单 并设置相应的class样式
        if (targetDimension.right + submenuWidth >= window.innerWidth) {
          submenuPlacement.push("left");
        } else {
          submenuPlacement.push("right");
        }

        if (
            targetDimension.bottom + submenuHeight >=
            window.innerHeight
        ) {
          submenuPlacement.push("bottom");
        } else {
          submenuPlacement.push("top");
        }

        this.submenuPlacement = submenuPlacement;
      });
    },
    /**
     * 鼠标移出子菜单方法方法
     * @param {Object} event 事件对象
     */
    handleMouseleave(event) {
      if (this.disabled) return;
      this.hover = false;
      /** 鼠标移入方法
       * @event mouseleave
       * @param {Event} event - 事件对象
       */
      this.$emit("mouseleave", this, event);
    },
  },
};
</script>
<style lang="scss">
.be-contextmenu {
  .be-contextmenu-divider {
    height: 0;
    margin: 5px 0;
    border-bottom: 1px solid #e8e8e8;
  }

  .be-contextmenu-group__menus {
    padding: 0 5px;
    margin: 0;
    list-style: none;

    .be-contextmenu-item {
      display: inline-block;
      padding: 5px 11px;
    }
  }

  .be-contextmenu-submenu {
    position: relative;
    text-align: center;

    & > .be-contextmenu {
      position: absolute;
      text-align: center;
      display: flex;

      &.left {
        left: 0;
        transform: translateX(-100%);
        background-color: transparent;
        border: 0px;
        box-shadow: none;
        list-style: none;

        & > ul {
          background-color: #ffffff;
          border-radius: 5px;
          box-shadow: 2px 2px 8px 0px rgba(150, 150, 150, 0.2);
          list-style: none;
        }
      }

      &.left::after {
        margin-top: 10px;
        content: "";
        width: 0;
        height: 0;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-left: 8px solid #ffffff;
      }

      &.right {
        right: 0;
        transform: translateX(100%);
        background-color: transparent;
        border: 0px;
        box-shadow: none;
        list-style: none;

        & > ul {
          background-color: #ffffff;
          border-radius: 5px;
          box-shadow: 2px 2px 8px 0px rgba(150, 150, 150, 0.2);
          list-style: none;
        }
      }

      &.right::before {
        margin-top: 10px;
        content: "";
        width: 0;
        height: 0;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-right: 8px solid #ffffff;
      }

      &.top {
        top: -(5px) - 1;
      }

      &.bottom {
        bottom: -(5px) - 1;
        align-items: flex-end;
      }

      &.bottom::before {
        margin-bottom: 10px;
      }

      &.bottom::after {
        margin-bottom: 10px;
      }
    }

    .be-contextmenu-submenu__icon {
      position: absolute;
      right: 5px;

      &::before {
        content: ">";
      }
    }
  }
}
</style>
