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
                    this.setOptions()
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
                this.setOptions()
            },
            setOptions() {
              let that = this
                const option = {
                    title: {},
                    grid: {
                        top: 80, // 距离容器上边界40像素
                        left: 60,
                        right: 40,
                        bottom: 40
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['售卖', '出租'],
                        textStyle: {
                            color: '#234773'
                        },
                        right: '20%'
                    },
                    toolbox: {
                        show: true,
                    },
                    calculable: true,
                    xAxis: [{
                        type: 'category',
                        boundaryGap: false,
                        data: that.chartData.xdata,
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#536482', // X轴文字颜色
                                fontSize: 16
                            }
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#E3E6F0'
                            }
                        }

                    }],
                    yAxis: [{
                        type: 'value',
                        name: '单位:间',
                      minInterval: 1, //分割刻度
                        nameTextStyle: {
                            color: '#A2D4E6'
                        },
                        splitArea: {
                            show: false
                        },
                        axisLabel: {
                            formatter: '{value} ',
                            color: '#536482',
                            textStyle: {
                                fontSize: 16
                            }
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#E3E6F0'
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                type: 'dashed',
                                color: '#808597'
                            }
                        }

                    }],
                    series: [{
                        name: '售卖',
                        type: 'line',
                        data: that.chartData.ydataOwner,
                        lineStyle: {
                            normal: {
                                width: 2,
                                color: {
                                    type: 'linear',
                                    colorStops: [{
                                        offset: 0,
                                        color: '#68B5F4' // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: '#68B5F4' // 100% 处的颜色
                                    }],
                                    globalCoord: false // 缺省为 false
                                },
                                shadowColor: 'rgba(72,216,191, 0.3)',
                                shadowBlur: 6,
                                shadowOffsetY: 10
                            }
                        },
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#D0D9F7'
                            }, {
                                offset: 1,
                                color: '#ffffff'
                            }])
                        },
                        symbol: 'circle', // 拐点样式
                        symbolSize: 10, // 拐点大小
                        showSymbol: false,
                        itemStyle: {
                            normal: {
                                color: '#68B5F4', // 拐点颜色
                                borderColor: '#eee',
                                borderWidth: 1
                            }
                        },
                        markPoint: {
                            data: [{
                                type: 'max',
                                name: '最大值'
                            },
                                {
                                    type: 'min',
                                    name: '最小值'
                                }
                            ]
                        }

                    },
                        {
                            name: '出租',
                            type: 'line',
                            data: that.chartData.ydataTenant,
                            areaStyle: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#DBFFF8'
                                }, {
                                    offset: 1,
                                    color: '#ffffff'
                                }])
                            },
                            lineStyle: {
                                normal: {
                                    width: 2,
                                    color: {
                                        type: 'linear',

                                        colorStops: [{
                                            offset: 0,
                                            color: '#52FFDC' // 0% 处的颜色
                                        }, {
                                            offset: 1,
                                            color: '#52FFDC' // 100% 处的颜色
                                        }],
                                        globalCoord: false // 缺省为 false
                                    },
                                    shadowColor: 'rgba(72,216,191, 0.3)',
                                    shadowBlur: 6,
                                    shadowOffsetY: 10
                                }
                            },
                            symbol: 'circle', // 拐点样式
                            showSymbol: false,
                            symbolSize:10 , // 拐点样式
                            itemStyle: {
                                normal: {
                                    color: '#52FFDC',
                                    borderWidth: 1,
                                    borderColor: '#eee'
                                }
                            },
                            markPoint: {
                                data: [{
                                    type: 'max',
                                    name: '最大值'
                                },
                                    {
                                        type: 'min',
                                        name: '最小值'
                                    }
                                ]
                            }

                        }
                    ]
                }
                this.chart.setOption(option)
            }
        }
    }
</script>
