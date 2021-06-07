/*
* @be-date-picker.vue
* @deprecated 基于elementUI的时间段日期选择组件
* @author
* @update (czh 2021/04/21)
*/
<template>
    <div class="datePicker">
        <!-- 修改bug2274 :readonly="$route.query.preview === 'true' ? true : false" -->
        <el-date-picker
            v-model="start"
            :clearable="false"
            :value-format="valueFormat"
            :format="format"
            :type="type"
            :editable="false"
            @change="emitEvent('update:startTime', start)"
            :picker-options="startPickerOptions"
            :readonly="$route.query.preview === 'true' ? true : false"
            placeholder="开始日期"
        >
        </el-date-picker>
        <span style="display: inline-block; line-height: 32px; margin: 0 10px"
            >-</span
        >
        <el-date-picker
            v-model="end"
            :clearable="false"
            :editable="false"
            :value-format="valueFormat"
            :format="format"
            :type="type"
            @change="emitEvent('update:endTime', end)"
            :picker-options="endPickerOptions"
            :readonly="$route.query.preview === 'true' ? true : false"
            placeholder="结束日期"
        >
        </el-date-picker>
    </div>
</template>

<script>
/**
 * 基于elementUI的时间段日期选择组件
 */
export default {
    name: "BeDatePicker",
    data() {
        const _this = this;
        return {
            /**
             * elementUI日期组件的配置钩子
             * 会把一定时间段内的日期传入调用这些钩子,通过人为判断控制
             * 可以实现某些日期的禁止选择
             */
            // 开始时间配置
            startPickerOptions: {
                disabledDate(time) {
                    //开始时间 晚于今天，或晚于结束时间的日期 就禁止点击
                    return (
                        time.getTime() > Date.now() ||
                        time.getTime() >
                            new Date(_this.end || _this.endTime).getTime()
                    );
                },
            },
            // 结束时间配置
            endPickerOptions: {
                disabledDate(time) {
                    let result;
                    //结束时间禁止点击规则：结束时间 早于开始时间，或结束时间 晚于今天的日期就禁止点击
                    //格式是时间戳时
                    if (_this.valueFormat === "timestamp") {
                        result =
                            time.getTime() <
                                new Date(
                                    _this.start || _this.startTime
                                ).getTime() || time.getTime() > Date.now();
                    } else if (_this.valueFormat === "yyyy-MM-dd HH:mm:ss") {
                        result = false;
                        //开始时间不是0点时，判断会小于time.getTime()，导致返回true
                        //这里把他变成0点
                        let startTime = _this.start || _this.startTime;
                        startTime = startTime.split(" ")[0] + " 00:00:00";
                        if (time.getTime() < new Date(startTime).getTime()) {
                            result = true;
                        }
                        if (time.getTime() > Date.now()) {
                            result = true;
                        }
                    } else {
                        result =
                            time.getTime() <
                                new Date(
                                    _this.start || _this.startTime
                                ).getTime() -
                                    86400000 || time.getTime() > Date.now();
                    }
                    return result;
                },
            },
            //开始时间
            start: this.startTime,
            //结束时间
            end: this.endTime,
        };
    },
    props: {
        /**
         * 开始时间
         */
        startTime: {
            type: String,
            default: "",
        },
        /**
         * 结束时间
         */
        endTime: {
            type: String,
            default: "",
        },
        changeEvent: {
            type: Function,
            default: Function,
        },
        /**
         * 绑定的日期格式
         */
        valueFormat: {
            type: String,
            default: "yyyy-MM-dd",
        },
        /**
         * 输入框显示的日期格式
         */
        format: {
            type: String,
            default: "yyyy-MM-dd",
        },
        /**
         * 显示类型 可以选择年、月、日 具体查询elementUi
         */
        type: {
            type: String,
            default: "date",
        },
    },
    computed: {},
    created() {},
    methods: {
        /**
         * 提交事件
         * @param {String} eventName - 提交事件名称
         * @param {String} data - 日期数据
         */
        emitEvent(eventName, data) {
            //校验判断
            let start = new Date(this.start);
            let end = new Date(this.end);
            // 如果时间段为年月日时分秒的， 时间段选择范围需要精确到秒
            if (start >= end && this.format !== 'yyyy-MM-dd') {
                this.end = "";
                this.start = "";
                this.$message.warning(`开始时间需早于结束时间`);
                this.$emit("update:startTime", "");
                this.$emit("update:endTime", "");
                return;
            }
            this.$emit(eventName, data.toString());
            if (this.$listeners.changeEvent) {
                /**
                 * change事件 提交
                 * @event changeEvent
                 * @param {String} data - 日期数据
                 */
                this.$emit("changeEvent", data.toString());
            }
        },
    },
    mounted() {},
};
</script>

<style scoped lang='scss'>
.datePicker {
    @include flex(flex-start, center);
}
</style>
<style lang="scss">
.datePicker {
    .el-input--suffix .el-input__inner {
        padding-right: 20px;
    }
    .el-picker-panel {
        z-index: 1000 !important;
    }
}
</style>