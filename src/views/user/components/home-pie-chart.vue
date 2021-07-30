<template>
  <div :class="className" :style="{ height: height, width: width }"/>

</template>

<script>
    import echarts from 'echarts'

    require('echarts/theme/macarons') // echarts theme
    // import resize from '../../dashboard/mixins/resize'

    export default {
        // mixins: [resize],
        props: {
            className: {
                type: String,
                default: 'chart'
            },
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '396px'
            },
            autoResize: {
                type: Boolean,
                default: true
            },
            chartData: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                chart: null
            }
        },
        watch: {
            chartData: {
                deep: true,
                handler(val) {
                    this.setOptions(val)
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.initChart()
            })
        },
        beforeDestroy() {
            if (!this.chart) {
                return
            }
            this.chart.dispose()
            this.chart = null
        },
        methods: {
            initChart() {
                this.chart = echarts.init(this.$el, 'macarons')
                this.setOptions(this.chartData)
            },
            setOptions({expectedData, actualData} = {}) {
                const option = {
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        icon: "circle",
                        bottom: '5%',
                        left: 'center'
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: ['40%', '50%'],
                            avoidLabelOverlap: false,
                            label: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    formatter: function (params) {
                                        // do some thing
                                        return parseInt(params.value/1783 *100)   + '%'
                                    },
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            },
                            labelLine: {
                                show: false
                            },
                            data: [
                                {value: 1048, name: '在线'},
                                {value: 735, name: '不在线'},
                            ],
                            color:['#4D80E7', '#1FE0E5'],
                        }
                    ]
                };
                this.chart.setOption(option)
                this.chart.dispatchAction({ type: 'highlight', dataIndex: 0 }); // dataIndex属性伟data传入的索引值
                this.chart.dispatchAction({ type: 'showTip', seriesIndex: 0, position: [120, 220], dataIndex: 0 }); // 点击生成detip工具条位置
                this.chart.on('mouseover', (e) => {
                    if (e.dataIndex !== 0) { // 当鼠标移除的时候 使默认的索引值去除默认选中
                        this.chart.dispatchAction({ type: 'downplay', dataIndex: 0 });
                        this.chart.dispatchAction({ type: 'highlight', dataIndex: 1 }); // dataIndex属性伟data传入的索引值
                    }else{
                        this.chart.dispatchAction({ type: 'downplay', dataIndex: 1 });
                        this.chart.dispatchAction({ type: 'highlight', dataIndex: 0 }); // dataIndex属性伟data传入的索引值
                    }
                });
            }
        }
    }
</script>
