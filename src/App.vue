<template>
  <div id="App" class="app" v-contextmenu:contextmenu >
    <!--    <be-contextmenu ref="contextmenu" id="wqdw">
          <be-contextmenu-sub-menu title="宋词">
            <be-contextmenu-item><span>临安小雨初霁</span></be-contextmenu-item>
            <be-contextmenu-item>陆游</be-contextmenu-item>
            <be-contextmenu-item divider>陆游</be-contextmenu-item>
            <be-contextmenu-sub-menu title="詞句">
              <be-contextmenu-item>谁家客马过京华</be-contextmenu-item>
            </be-contextmenu-sub-menu>
          </be-contextmenu-sub-menu>
        </be-contextmenu>-->
    <!--    <be-icon icon="deleteIc" ref="beIcon"></be-icon>-->
    <!--    <be-dialog
            id="wqdsad"
            titles="测试Dialog"
            ref='moreNodeDialog'
            v-model:is-show="show"
            customClass="asdwq"
            escExit
            @close="test"
            :is-open-modal="true">
                <template #headerIcon>
                  <be-icon icon="error" @click="show = false"></be-icon>
                </template>
          <template #body>
            <div slot="body" class="plus-dialog-body">
              这是一个弹窗哦
            </div>
          </template>
          &lt;!&ndash;      <template #footer>
                  <be-button type="primary"
                             bordered
                             round="3">确定
                  </be-button>
                </template>&ndash;&gt;
        </be-dialog>-->
    <!--        <be-container style="margin-bottom: 60px">
                <be-header style="background-color: #FFFFFF;text-align: center;line-height: 60px;">Header</be-header>
                <be-main style="background-color:#f0f9eb;line-height: 160px;text-align: center">Main</be-main>
            </be-container>

            <be-container style="margin-bottom: 60px">
                <be-header style="background-color: #FFFFFF;text-align: center;line-height: 60px;">Header</be-header>
                <be-main style="background-color:#f0f9eb;line-height: 160px;text-align: center">Main</be-main>
                <be-footer style="background-color: #FFFFFF;text-align: center;line-height: 60px;">Footer</be-footer>
            </be-container>

            <be-container style="margin-bottom: 60px">
                <be-aside width="200px" style="background-color: #FFFFFF;text-align: center;line-height: 200px;">Aside
                </be-aside>
                <be-main style="background-color:#f0f9eb;line-height: 160px;text-align: center">Main</be-main>
            </be-container>

            <be-container style="margin-bottom: 60px">
                <be-header style="background-color: #FFFFFF;text-align: center;line-height: 60px;">Header</be-header>
                <be-container>
                    <be-aside width="200px" style="background-color: #e9faf6;text-align: center;line-height: 320px;">Aside
                    </be-aside>
                    <be-main style="background-color:#f0f9eb;line-height: 160px;text-align: center">Main</be-main>
                </be-container>
            </be-container>

            <be-container style="margin-bottom: 60px">
                <be-header style="background-color: #FFFFFF;text-align: center;line-height: 60px;">Header</be-header>
                <be-container>
                    <be-aside width="200px" style="background-color: #e9faf6;text-align: center;line-height: 320px;">Aside
                    </be-aside>
                    <be-container>
                        <be-main style="background-color:#f0f9eb;line-height: 160px;text-align: center">Main</be-main>
                        <be-footer style="background-color: #FFFFFF;text-align: center;line-height: 60px;">Footer
                        </be-footer>
                    </be-container>
                </be-container>
            </be-container>

            <be-container style="margin-bottom: 60px">
                <be-aside width="200px" style="background-color: #e9faf6;text-align: center;line-height: 320px;">Aside
                </be-aside>
                <be-container>
                    <be-header style="background-color: #FFFFFF;text-align: center;line-height: 60px;">Header</be-header>
                    <be-main style="background-color:#f0f9eb;line-height: 160px;text-align: center">Main</be-main>
                </be-container>
            </be-container>

            <be-container>
                <be-aside width="200px" style="background-color: #e9faf6;text-align: center;line-height: 320px;">Aside
                </be-aside>
                <be-container>
                    <be-header style="background-color: #FFFFFF;text-align: center;line-height: 60px;">Header</be-header>
                    <be-main style="background-color:#f0f9eb;line-height: 160px;text-align: center">Main</be-main>
                    <be-footer style="background-color: #FFFFFF;text-align: center;line-height: 60px;">Footer</be-footer>
                </be-container>
            </be-container>-->

    <!--        <be-ellipsis content="自古逢秋悲寂寥" :elpNum = '3' placement="right"   text="我言秋日胜春朝" id="be_ellipsis_test_content"></be-ellipsis>-->
    <!--<be-loading
        :show="isLoading"
        text="测试loading"
        size="large"
        round="10"
        color="red"
        :isBackground="false"
        :customRender="customRender"
        customClass="asdwq"
        colorText="white">

    </be-loading>-->
    <!--    <be-ellipsis
                placement="left"
                text="qcwqwd"
                content="电灯熄灭 物换星移 泥牛入海 黑暗好像 一颗巨石 按在胸口独脚大盗
        百万富翁 摸爬滚打 黑暗好像 一颗巨石 按在胸口电灯熄灭 物换星移 泥牛入海 黑暗好像 一颗巨石 按在胸口独脚大盗
        百万富翁 摸爬滚打 黑暗好像 一颗巨石 按在胸口"
                expandTrigger>
        </be-ellipsis>-->
    <!--
                  <be-popover trigger="manual" width="300" customClass="asdwq" placement="bottom">
                      <template #trigger>
            &lt;!&ndash;            <div width="25" height="25"  @click="test" style="position: absolute;left: 20%;top: 100px;">++</div>&ndash;&gt;
                        <be-icon icon="delete" @click="testclose" style="position: absolute;left: 20%;top: 300px;"></be-icon>
                      </template>
                       <panda width="25" height="25"  @click="test"></panda>
                  </be-popover>-->
    <!--    <be-tooltip content="'qwddddddddddddddddddd" placement="left" x="300" y="300" trigger="manual">
          <div width="25" height="25"  @click="test" style="position: absolute;left: 20%;top: 100px;">++</div>
        </be-tooltip>-->
    <!--            <div width="25" height="25" style="position: absolute;left: 20%;top: 100px;">
                    <be-button
                        @click="test"
                        prevIcon="delete"
                        nextIcon="delete"
                        type="warning "
                        size="large">
                        测试
                    </be-button>
                    <div style="margin-top: 10px">
                        &lt;!&ndash;  layout,isFront,pageData,isDynamic,disabledJump,disabled    //:pageSize="pageParams.pageSize"&ndash;&gt;
    &lt;!&ndash;                    <be-pagination
                                       :pageSize="pageParams.pageSize"
                                       :pageCount="pageParams.total"
                                       :pagerShowCount="5"
                                       @updateNum = 'updateNum'
                                       @changePage="pageChange"
                                       :currentPage="pageParams.currentPage">
            &lt;!&ndash;                <template #prev>
                                <be-button
                                    @click="test"
                                    prevIcon="delete"
                                    nextIcon="delete"
                                    type="warning "
                                    size="large">
                                    测试
                                </be-button>
                            </template>
                            <template #next>
                                <be-button
                                    @click="test"
                                    prevIcon="delete"
                                    nextIcon="delete"
                                    type="warning "
                                    size="large">
                                    测试
                                </be-button>
                            </template>&ndash;&gt;
                        </be-pagination>&ndash;&gt;
            &lt;!&ndash;            <be-pagination
                            :pageSize="pageParams.pageSize"
                            :pageCount="pageParams.total"
                            isDynamic
                            :pagerShowCount="5"
                            @changePage="pageChange"
                            :currentPage="pageParams.currentPage">
                            <template #prev>
                                <be-button
                                    @click="test"
                                    prevIcon="delete"
                                    nextIcon="delete"
                                    type="warning "
                                    size="large">
                                    测试
                                </be-button>
                            </template>
                            <template #next>
                                <be-button
                                    @click="test"
                                    prevIcon="delete"
                                    nextIcon="delete"
                                    type="warning "
                                    size="large">
                                    测试
                                </be-button>
                            </template>
                        </be-pagination>&ndash;&gt;
                        <be-pagination
                            :pageSize="pageParams.pageSize"
                            :pageCount="pageParams.total"
                            :pagerShowCount="5"
                            @changePage="pageChange"
                            @updatePage="updatePage"
                            @updateNum = 'updateNum'
                            :page-data="pageData"
                            isFront
                            :currentPage="pageParams.currentPage">
                            <template #prev>
                                <be-button
                                    @click="test"
                                    prevIcon="delete"
                                    nextIcon="delete"
                                    type="warning "
                                    size="large">
                                    测试
                                </be-button>
                            </template>
                            <template #next>
                                <be-button
                                    @click="test"
                                    prevIcon="delete"
                                    nextIcon="delete"
                                    type="warning "
                                    size="large">
                                    测试
                                </be-button>
                            </template>
                        </be-pagination>
                    </div>
                </div>-->

    <!--        <div style="width:100px;height: 30px;background: #4F62A7" id="qwq">cesas</div>
        <div style="width: 60px;height: 30px;background: #4F62A7" id="aaa">top</div>-->
    <!--    <be-icon icon="delete" @click="testclose"></be-icon>-->

    <!--<div class='be-icon-container'>
      <svg class="be-icon"
           :width="30"
           :height="30"
           aria-hidden="true">
        <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
          <path d="M99.096 315.634s-82.58-64.032-82.58-132.13c0-66.064 33.032-165.162 148.646-148.646 83.37 11.91 99.096 165.162 99.096 165.162l-165.162 115.614zM924.906 315.634s82.58-64.032 82.58-132.13c0-66.064-33.032-165.162-148.646-148.646-83.37 11.91-99.096 165.162-99.096 165.162l165.162 115.614z" fill="#6B676E" p-id="1143" />
          <path d="M1024 561.548c0 264.526-229.23 429.42-512.002 429.42S0 826.076 0 561.548 283.96 66.064 512.002 66.064 1024 297.022 1024 561.548z" fill="#FFEBD2" p-id="1144" />
          <path d="M330.324 842.126c0 82.096 81.34 148.646 181.678 148.646s181.678-66.55 181.678-148.646H330.324z" fill="#E9D7C3" p-id="1145" />
          <path d="M644.13 611.098C594.582 528.516 561.55 512 512.002 512c-49.548 0-82.58 16.516-132.13 99.096-42.488 70.814-78.73 211.264-49.548 247.742 66.064 82.58 165.162 33.032 181.678 33.032 16.516 0 115.614 49.548 181.678-33.032 29.18-36.476-7.064-176.93-49.55-247.74z" fill="#FFFFFF" p-id="1146" />
          <path d="M611.098 495.484c0-45.608 36.974-82.58 82.58-82.58 49.548 0 198.194 99.098 198.194 165.162s-79.934 144.904-148.646 99.096c-49.548-33.032-132.128-148.646-132.128-181.678zM412.904 495.484c0-45.608-36.974-82.58-82.58-82.58-49.548 0-198.194 99.098-198.194 165.162s79.934 144.904 148.646 99.096c49.548-33.032 132.128-148.646 132.128-181.678z" fill="#6B676E" p-id="1147" />
          <path d="M512.002 726.622c-30.06 0-115.614 5.668-115.614 33.032 0 49.638 105.484 85.24 115.614 82.58 10.128 2.66 115.614-32.944 115.614-82.58-0.002-27.366-85.556-33.032-115.614-33.032z" fill="#464655" p-id="1148" />
          <path d="M330.324 495.484m-33.032 0a33.032 33.032 0 1 0 66.064 0 33.032 33.032 0 1 0-66.064 0Z" fill="#464655" p-id="1149" />
          <path d="M693.678 495.484m-33.032 0a33.032 33.032 0 1 0 66.064 0 33.032 33.032 0 1 0-66.064 0Z" fill="#464655" p-id="1150" />
        </svg>
      </svg>
    </div>-->
    <!--      <be-dialog
              titles="测试Dialog"
              ref='moreNodeDialog'
              v-model:is-show="showDialog"
              customClass="asdwq"
               escExit
              :is-open-modal="true">
    &lt;!&ndash;          <template #headerIcon>
                <be-icon icon="error" @click="showDialog = false"></be-icon>
              </template>&ndash;&gt;
            <template #body>
              <div slot="body" class="plus-dialog-body">
                这是一个弹窗哦
              </div>
            </template>
            <template #footer>
            <be-button type="primary"
                       bordered
                       round="3">确定
            </be-button>
            </template>
          </be-dialog>-->

    <!--  position: absolute;left: 20%;top: 100px;width: 45%;height:45%;background-color: #FFFFFF      -->
    <div
        class="bg-pink-50 flex items-center justify-center"
        style=" width: 900px;height: 300px;">
      <!--      <be-popover trigger="click" width="300" customClass="asdwq" placement="bottom" ref="qwdwqdwqd">
              <template #trigger>
                <be-icon icon="deleteIc" style="position: absolute;left: 20%;top: 300px;"></be-icon>
              </template>
              <panda width="25" height="25" @click="test"></panda>
            </be-popover>

            <be-popover trigger="click" width="300" customClass="asdwq" placement="top" ref="qwdddddwqdwqd">
              <template #trigger>
                <be-icon icon="deleteIc" style="position: absolute;left: 25%;top: 300px;"></be-icon>
              </template>
              <panda width="25" height="25" @click="test"></panda>
            </be-popover>-->
<!--      <be-loading
          :show="showSwitch"
          :round="10"
          color="red"
          size="large"
          :delay="3000"
          :isBackground="true"
          customClass='test-beloading-round'
          text="testText"></be-loading>-->
<!--      <be-button
          bordered
          prevIcon="deleteIc"
          nextIcon="deleteIc"
          @click="openDialog"
          size="large">
        测试
      </be-button>-->
      <!--      <be-select size="medium" v-model="seletStr" search :list="testList">

            </be-select>
            <be-tag type="info" @close="handleClick" isClose>asdw</be-tag>
            <be-breadcrumb>
              <be-breadcrumb-item to="/黑色柳丁" separator="#">柳丁</be-breadcrumb-item>
              <be-breadcrumb-item to="/似曾相识" :option="testList" :clickOption="handleClick">似曾相识</be-breadcrumb-item>
              <be-breadcrumb-item to="/小镇姑娘" separator="#" :click="testClose">
                小镇姑娘
                <template #separator>❀</template>
              </be-breadcrumb-item>
            </be-breadcrumb>
            <be-switch v-model="showSwitch" @change="handleClick">
              <template v-slot:unCheckedRender="slotProps">
                <span>unChecked</span>
              </template>
              <template v-slot:checkedRender="slotProps">
                <span>checked</span>
              </template>
            </be-switch>
            {{ showSwitch }}
            <be-input-number @change="handleClick"
                             :formatter="formatter"
                             :parser="parser"
                             keyboard
                             min="2"
                             max="10000"
                             @blur="handleClick"
                             v-model="testModel"
                             ref="beinputNum">
              &lt;!&ndash;                   <template #next>next</template>
                                   <template #pre>pre</template>&ndash;&gt;
            </be-input-number>
            {{ testModel }}
            <be-input-number
                v-model="testModel"
                ref="beinputNum"
                keyboard
                :step="0.3">
            </be-input-number>-->
      <!--                <be-contextmenu ref="contextmenu" :theme="'blues'" id="wqdw">
                          <be-contextmenu-sub-menu title="宋词">
                              <span>临安小雨初霁</span>
                              <be-contextmenu-item>陆游</be-contextmenu-item>
                              <be-contextmenu-sub-menu title="詞句">
                                  <be-contextmenu-item>谁家客马过京华</be-contextmenu-item>
                              </be-contextmenu-sub-menu>
                          </be-contextmenu-sub-menu>
                      </be-contextmenu>-->

      <!--            <be-button type="primary"
                             bordered
                             @click="testInputFunc"
                             round="3">确定
                  </be-button>-->
<!--                  <be-input
                      ref="sssinput"
                      type="test"
                      placeholder="测试文本域"
                      @keydown="handleChange"
                      @change="handleChange"
                      v-model="val">
      &lt;!&ndash;                <template #prev>
                          <be-button
                              @click="test"
                              prevIcon="delete"
                              nextIcon="delete"
                              type="warning "
                              size="large">
                              测试
                          </be-button>
                      </template>
                      <template #next>
                          <be-button
                              @click="test"
                              prevIcon="delete"
                              nextIcon="delete"
                              type="warning "
                              size="large">
                              测试
                          </be-button>
                      </template>&ndash;&gt;
                  </be-input>-->
      <!--           :focusTrigger="false"   :suggestionList="testList" :fetchSuggestions="getSuggest"-->
      <!--            <be-autocomplete
                      clearable
                      size="mini"
                      prevIcon="delete"
                      nextIcon="delete"
                      :suggestionList="testList"
                      keyValue="id"
                      labelValue="label"
                      @prevIconClick="handlePrevIcon"
                      @nextIconClick="handlenextIcon"
                      @change="handleChange"
                      @input="handleinput"
                      @focus="handlefocus"
                      @blur="handleblur"
                      v-model="num">
      &lt;!&ndash;                <template #prev>
                          <be-button
                              @click="test"
                              prevIcon="delete"
                              nextIcon="delete"
                              type="warning "
                              size="large">
                              测试
                          </be-button>
                      </template>&ndash;&gt;
      &lt;!&ndash;                <template #next>
                          <be-button
                              @click="test"
                              prevIcon="delete"
                              nextIcon="delete"
                              type="warning "
                              size="large">
                              测试
                          </be-button>
                      </template>&ndash;&gt;
                      <template v-slot:cus-temp="slotProps">
                          <div style="display: flex;justify-content: center;align-items: center">
                              {{slotProps.item.label}}
                              <be-icon icon="error"></be-icon>
                          </div>

                      </template>
                  </be-autocomplete>-->
      <!--            <be-icon icon="error" @click="showDialog = false" width="25" height="25" color="#00ffff" custom-class="asdqw" spin></be-icon>-->


      <!--        <be-select  size="medium" v-model="seletStr" clear group>
                  <template v-slot="slotProps">
                      <span >{{ slotProps.label }}</span>
                  </template>
              </be-select>-->
      <!--            <be-select  size="medium" v-model="seletStr" clear search :list="testList" keyValue = 'id' :searchFunc = 'searchFunc' :sortFunc = 'sortFunc'>

            </be-select>-->
      <!--            <be-select  size="medium" v-model="seletStr" clear search keyValue = 'id' remote :remoteFunc="getSuggest" @scroll="testclose">
                  </be-select>-->
      <!--            <be-select  size="medium" v-model="seletStr" clear keyValue = 'id' multiple :list="testList" search>
                  </be-select>-->
      <!--            <be-select  size="medium" v-model="seletStr" clear keyValue = 'id' multiple :list="testList" search>
                      <template v-slot:tag="slotProps">
                          <span @click="slotProps.close">{{ slotProps.data.label }}  {{slotProps.index}}</span>
                      </template>
                  </be-select>
                  {{seletStr}}
                  <panda width="25" height="25"  @click="test"></panda>-->
      <!--            <be-input-number @change="handleClick"
                                   :formatter="formatter"
                                   :parser="parser"
                                   keyboard
                                   min="2"
                                   max="10000"
                                   @step="handleStep"
                                   v-model="testModel"
                                   ref="beinputNum">
      &lt;!&ndash;                <template #next>next</template>
                      <template #pre>pre</template>&ndash;&gt;
                  </be-input-number>-->
      <!--      <be-input-number
                v-model="testModel"
                ref="beinputNum"
                keyboard
                :step="0.3">
            </be-input-number>
            {{ testModel }}-->
      <!--      <be-switch
                v-model="switchModel"
                @change="testClose" >
              <template v-slot:unCheckedRender="slotProps">
                <span>unChecked</span>
              </template>
              <template v-slot:checkedRender="slotProps">
                <span>checked</span>
              </template>
            </be-switch>-->
      <!--      {{switchModel}}-->
      <!--          <be-tag type="warning" @close="handleClick" isClose>asdw</be-tag>-->
      <!--        <be-breadcrumb>
                  <be-breadcrumb-item  to="/黑色柳丁" separator="#" >柳丁</be-breadcrumb-item>
                  <be-breadcrumb-item  to="/似曾相识" :option="testList" :clickOption="handleClick">似曾相识</be-breadcrumb-item>
                  <be-breadcrumb-item to="/小镇姑娘" separator="#" :click="testClose">
                      小镇姑娘
                              <template #separator>❀</template>
                  </be-breadcrumb-item>
                  <be-breadcrumb-item :click="testClose">普通朋友</be-breadcrumb-item>
              </be-breadcrumb>
              <be-popover trigger="click" width="300" customClass="asdwq" placement="bottom">
                  <template #trigger>
                      <be-icon icon="delete" style="position: absolute;left: 20%;top: 300px;"></be-icon>
                  </template>
                  <panda width="25" height="25"  @click="test"></panda>
              </be-popover>-->

<!--        <be-autocomplete
            clearable
            size="mini"
            prevIcon="delete"
            nextIcon="delete"
            :focusTrigger="false"
            :fetchSuggestions="fetchSuggestions"
            keyValue="id"
            labelValue="name"
            v-model="autoVal">
        </be-autocomplete>-->
<!-- :success="{percent:10,color:'red'}"
            :color="{  from: '#108ee9',to: '#87d068'}"       -->
<!--        <be-progress
            width="250"
            stroke-width="20"
            status="success"
            strokeLinecap="square"
            :percent="progress">
        </be-progress>

        <be-progress
            type="dashboard"
            status="success"
            :percent="progress">
        </be-progress>
        <div   @click="progress = progress+ 10" style="margin-left: 30px">{{ progress }}</div>-->

        <be-pagination
            :pageSize="pageParams.pageSize"
            :pageCount="pageParams.total"
            :pagerShowCount="5"
            @updateNum="updateNum"
            @changePage="pageChange"
            :currentPage="pageParams.currentPage">
             <template #prev>
            <be-button
                @click="test"
                prevIcon="delete"
                nextIcon="delete"
                type="warning "
                size="large">
                测试
            </be-button>
        </template>
            <template #next>
                <be-button
                    @click="test"
                    prevIcon="delete"
                    nextIcon="delete"
                    type="warning "
                    size="large">
                    测试
                </be-button>
            </template>&ndash;&gt;
        </be-pagination>
    </div>

  </div>

</template>

<script lang="tsx">
import {panda} from './icon-testing'
import {BeNotify} from "./components/notification/src/be-notification-service";
import {BeMessage} from "./components/message/src/be-message-service";
import {BeMsg} from "./components/message-box/src/be-message-box-service";
import BePopover from "./components/popover/src/be-popover.vue";
import {createPopper} from '@popperjs/core'
import {BeLoadingSer} from './components'
import BeIcon from "./components/svg-icon/src/be-icon.vue";
import {ClickOutside} from './utils/direactives/custom-direactives/click-outside';
import {contextmenu} from './utils/direactives/custom-direactives/contextmenu-directives';
import BeContextmenu from "./components/contextmenu/src/be-contextmenu.vue";
import BeContextmenuItem from "./components/contextmenu/src/be-contextmenu-item.vue";
import BeContextmenuSubMenu from "./components/contextmenu/src/be-contextmenu-sub-menu.vue";
import BeContainer from "./components/container/src/be-container.vue";
import BeHeader from "./components/container/src/be-header.vue";
import BeMain from "./components/container/src/be-main.vue";
import BeFooter from "./components/container/src/be-footer.vue";
import BeAside from "./components/container/src/be-aside.vue";
import {computed, getCurrentInstance, ref, watch} from "vue";
import BeProgress from "./components/progress/src/be-progress";

export default {
  name: 'App',
  directives: {ClickOutside, contextmenu},
  components: {
      BeProgress,
    BeAside,
    BeFooter,
    BeMain,
    BeHeader,
    BeContainer,
    BeContextmenuSubMenu,
    BeContextmenuItem,
    BeContextmenu,
    BeIcon,
    panda
  },
  setup() {
    const curInst = getCurrentInstance()
    const show = ref<boolean>(false)
      const val = ref<string>('')
      const progress = ref<number>(60)
    const showSwitch = ref<boolean>(true)
    const openDialog = (): void => {
      // show.value = !show.value
      showSwitch.value = true
    }
    let asdqwd = computed(() => {
      return showSwitch.value
    })
    watch(asdqwd, (nVal) => {

    })
    const test = (): void => {
      console.log(111)
      curInst?.refs.qwdwqdwqd.close()
      curInst?.refs.qwdddddwqdwqd.close()
    }
    /* BeMessage({
       titles: 'asd',
       msgType: 'success',
       duration: 2000,
       offsetTop: 300,
       close: true,
     })*/
    BeNotify({
      titles: 'Notification',
      bodyRender: () => {
        return <p style="font-size:14px;font-weight:400;font-family: Microsoft YaHei;letter-spacing: 2px;">
          您的体验时间仅剩
        </p>
      },
      msgType: 'info',
      onClick: () => console.log('click'),
      onClose: () => console.log('close'),
      offsetBottom: 10,
      placement: 'bottomRight',
      duration: 0,
    })
    const testList = [
      {label: '落日绣帘卷', id: '落日绣帘卷'},
      {label: '亭下水连空', id: '亭下水连空'},
      {label: '知君为我新作', id: '知君为我新作'},
      {label: '窗户湿青红', id: '窗户湿青红'},
      {label: '长记平山堂上', id: '欹枕江南烟雨'},
      {label: '欹枕江南烟雨', id: '长记平山堂上'},
      {label: '杳杳没孤鸿', id: '杳杳没孤鸿'},
      {label: '认得醉翁语', id: '认得醉翁语'},
      {label: '山色有无中', id: '山色有无中'},
      {label: '一點浩然氣', id: '一點浩然氣'},
      {label: '千里快哉風我', id: 'fjkhfsdaiuorgga'},
      {label: 'a', id: 'fjkhfsdaiuawdorgga'},
      {label: 'ab', id: 'fjkhfsadaiuorgga'},
    ]
    const autoVal = ref({id: '赵客缦胡缨，吴钩霜雪明。id', name: '赵客缦胡缨，吴钩霜雪明。'})
    const handleClick = (p): void => {
      setTimeout(() => {
        showSwitch.value = false
      }, 3000)
    }
    const seletStr = ref([])
    const testModel = ref(0)
    const formatter = (value: string): string => {
      return `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
    const parser = (value: string): string => {
      return value.replace(/\$\s?|(,*)/g, '')
    }
      const fetchSuggestions = (cb:Function):void =>{
          setTimeout(()=>{
              cb([
                {id: '赵客缦胡缨，吴钩霜雪明。id', name: '赵客缦胡缨，吴钩霜雪明。', asd: 'wqd'},
                {id: '银鞍照白马，飒沓如流星。id', name: '银鞍照白马，飒沓如流星。', asd: 'wqd'},
                {id: '十步杀一人，千里不留行。id', name: '十步杀一人，千里不留行。', asd: 'wqd'},
                {id: '事了拂衣去，深藏身与名。id', name: '事了拂衣去，深藏身与名。', asd: 'wqd'},
              ])
          },2000)
      }
      const pageParams = ref({
          currentPage: 1,
          pageNum: 1,
          pageSize: 10,
          total: 300
      })
      const   pageChange = (data):void =>{
          // console.log(data)
          pageParams.value.currentPage = data.currentPage
      }

      const updateNum = (data):void =>{
          pageParams.value.pageSize = data
      }
    return {
        updateNum,
        pageChange,
        pageParams,
        val,
        fetchSuggestions,
      formatter,
      parser,
      testModel,
      show,
      test,
      openDialog,
      seletStr,
      handleClick,
      autoVal,
      testList,
      showSwitch,
        progress,
      re: () => <div id='test_beloading_customRender'>asd</div>
    }
  },
  /* data() {
     return {
         testOption: {
             border: '1px solid #00ffff',
             backgroundColor: 'red',
             color: 'green'
         },
         switchModel: false,
         num: 0,
         notify: null,
         isLoading: true,
         showDialog: false,
         loadingInst: null,
         pageData: [],
         pageParams: {
             currentPage: 1,
             pageNum: 1,
             pageSize: 200,
             total: 300
         },
         testModel: 1,
         // seletStr:[],
         seletStr: [{label: '落日绣帘卷', id: '落日绣帘卷'}, {label: '亭下水连空', id: '亭下水连空'}],
         testList: [
             {label: '落日绣帘卷', id: '落日绣帘卷'},
             {label: '亭下水连空', id: '亭下水连空'},
             {label: '知君为我新作', id: '知君为我新作'},
             {label: '窗户湿青红', id: '窗户湿青红'},
             {label: '长记平山堂上', id: '欹枕江南烟雨'},
             {label: '欹枕江南烟雨', id: '长记平山堂上'},
             {label: '杳杳没孤鸿', id: '杳杳没孤鸿'},
             {label: '千里快哉風', id: '千里快哉風'},
             {label: '认得醉翁语', id: '认得醉翁语'},
             {label: '山色有无中', id: '山色有无中'},
             {label: '一點浩然氣', id: '一點浩然氣'},
             {label: '千里快哉風我', id: 'fjkhfsdaiuorgga'},
             {label: 'a', id: 'fjkhfsdaiuawdorgga'},
             {label: 'ab', id: 'fjkhfsadaiuorgga'},
         ]
     }

 },*/
  /*   mounted() {
        BeMsg({
           /!* isDrag:true,
            titles:'MessageBox',
            customClass:'q1qwdsaddddddd',
            msgType:'warning',
            footerType:'center',
            footerRender:null,
            bodyRender:()=>{
                return <p style="font-size:14px;font-weight:400;font-family: Microsoft YaHei;letter-spacing: 2px;">
                    您的体验时间仅剩
                </p>
            },
            onConfirm:()=>console.log('click'),
            onClose:()=>console.log('close'),
            iconPreRender:null,
            iconNextRender:null,
            isOpenModal:true,*!/
            customClass:'props-titles',
            titles:'test-titles',
           // isOpenModal:false,
            footerRender:null,
            bodyRender:null,
            iconPreRender:null,
            footerType:'right',
            iconNextRender:null,
        })
        // this.$refs.beinputNum.focus()
        // this.$refs.beinputNum.$el.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
        // this.$refs.beinputNum.focus()
        // console.log(document.activeElement)
        /!* const tr = document.getElementById('qwq')
         const po = document.getElementById('aaa')
         createPopper(tr, po, {
               placement: 'top',
         })*!/
        /!*   this.notify = BeMessage({
             loading: true,
             titles: 'titles',
             msgType: 'warning',
             customClass: 'options.customClass',
             duration: 0,
             close: true,
             key: 'options.key',
             onClose: () => console.log('close'),
             iconPreRender: <span>🐕</span>,
             /!*  closeRender:<span>❀</span>,*!/
           })*!/
        /!* this.notify = BeMessage({
             loading:true,
             titles:'titles',
             msgType:'warning',
             customClass: 'options.customClass',
             duration: 0,
             close:true,
             key: 'options.kesy',
             onClose:()=>console.log('close'),
             iconPreRender: <span>🐕</span>,
             /!*  closeRender:<span>❀</span>,*!/
         })*!/
        /!* setTimeout(() => {
           this.notify.update({
             loading: false,
             key: 'options.key',
           })
         }, 1000)
         this.notify = BeMessage({
           titles: 'titl的气味的es',
           msgType: 'warning',

           customClass: 'options.customClass',
           duration: 0,
           close: true,
           key: 'optionsd.key',
           onClose: () => console.log('close'),
           /!* iconPreRender: ()=><span>🐕</span>,
            closeRender:()=><span>❀</span>,*!/
         })*!/
        /!*  this.notify = BeMessage({
            titles: 'titl的气a味的es',
            msgType: 'warning',

            customClass: 'options.customClass',
            duration: 0,
            close: true,
            key: 'optiondwqdsd.key',
            onClose: () => console.log('close'),
            /!* iconPreRender: ()=><span>🐕</span>,
             closeRender:()=><span>❀</span>,*!/
          })*!/


        for (let i = 0; i < 300; i++) {
            this.pageData.push({num: i})
        }
    },
    methods: {
        formatter(value) {
            return `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        },
        parser(value) {
            return value.replace(/\$\s?|(,*)/g, '')
        },
        searchFunc(value: string, ordData: Array<any>, labelValue: string) {
            let arr = value ? ordData.filter(
                (val: any) => {
                    return (val[labelValue].toString().toLowerCase().indexOf(value.toLowerCase()) >= 0);
                }
            ) : ordData
            return arr.length > 0 ? arr : ordData
        },
        sortFunc(a, b) {
            return a.label.toLowerCase().localeCompare(b.label.toLowerCase())
        },
        testInputFunc() {
            this.$refs.sssinput.select()
        },
        getSuggest(cb) {
            setTimeout(() => {
                cb(
                    [
                        {label: '落日绣帘卷', id: '落日绣帘卷'},
                        {label: '亭下水连空', id: '亭下水连空'},
                        {label: '知君为我新作', id: '知君为我新作'},
                        {label: '窗户湿青红', id: '窗户湿青红'},
                        {label: '长记平山堂上', id: '欹枕江南烟雨'},
                        {label: '欹枕江南烟雨', id: '长记平山堂上'},
                        {label: '杳杳没孤鸿', id: '杳杳没孤鸿'},
                        {label: '千里快哉風', id: '千里快哉風'},
                        {label: '千里快哉風千里快哉風', id: '千里快哉風千里快哉風'},
                        {label: '认得醉翁语', id: '认得醉翁语'},
                        {label: '山色有无中', id: '山色有无中'},
                        {label: '一點浩然氣', id: '一點浩然氣'},
                    ]
                )
            }, 500)
        },
        handleblur() {

        },
        handlefocus() {

        },
        handlenextIcon() {

        },
        handlePrevIcon() {

        },
        handleinput(data) {
            //console.log(data)
        },
        handleChange(data) {
            //console.log(data)

        },
        pageChange(data) {
            // console.log(data)
            this.pageParams.currentPage = data.currentPage
        },
        updatePage(data) {
            //console.log(data)
        },
        updateNum(data) {
            this.pageParams.pageSize = data
            // console.log(data)
        },
        customRender() {
            return (<be-icon icon="delete" style="position: absolute;left: 20%;top: 100px;"></be-icon>)
        },
        handleClick() {
            //this.testModel = 2000
        },
        handleStep(val) {
            debugger
        },
        test(qw) {
            this.showDialog = !this.showDialog
            /!*this.loadingInst = BeLoadingSer.init({
                isBackground:false,
                bgColor:'#F2F4F5',
                text:'正在访问中，请稍候…',
                color:'#b1b1b1',
            })
            setTimeout(()=>{
                BeLoadingSer.close(this.loadingInst)
            },3000)*!/

            // this.isLoading = !this.isLoading
            /!* BeMsg({
               isDrag:true,
               titles:'MessageBox',
               customClass:'q1qwdsaddddddd',
               msgType:'warning',
               footerType:'center',
               footerRender:null,
               bodyRender:()=>{
                 return <p style="font-size:14px;font-weight:400;font-family: Microsoft YaHei;letter-spacing: 2px;">
                   您的体验时间仅剩
                 </p>
               },
               onConfirm:()=>console.log('click'),
               onClose:()=>console.log('close'),
               iconPreRender:null,
               iconNextRender:null,
               isOpenModal:true,
             })*!/
            /!* this.notify = BeNotify({
                 titles:'Notification',
                 bodyRender:()=>{
                     return <p style="font-size:14px;font-weight:400;font-family: Microsoft YaHei;letter-spacing: 2px;">
                         您的体验时间仅剩
                     </p>
                 },
                 msgType:'info',
                 onClick:()=>console.log('click'),
                 onClose:()=>console.log('close'),
                 offsetBottom:10,
                 placement:'bottomRight',
                 duration:0,
                 key:1
             })*!/
        },
        testClose(data) {
            console.log(data)
            // this.notify.close()
        }
    }*/
}
</script>
<style lang="scss">
body {
  /*  height: 100%;
    position: fixed;
    width: 100%;*/
}

#App {

  /* background: $info;*/
  height: 100%;
  width: 100%;

}

#app {
  overflow-y: auto;
  height: 200vh;
  @apply bg-green-100
}

.asdwq {
  background-color: red;
}

</style>