"use strict";

var CT_ContainerTimer = []; //定时器容器  格式:[占位符,定时器时间,定时器时长,定时器状态,......]
var CT_ContainerTimerName = []; //定时器名称列表
var CT_ContainerTimerLength = 0; //定时器容器长度
var CT_ContainerGlobalTimer = []; //全局定时器容器  格式:[占位符,定时器时间,定时器时长,定时器状态,......]
var CT_ContainerGlobalTimerName = []; //全局定时器名称列表
var CT_ContainerGlobalTimerLength = 0; //全局定时器容器长度
//--------------------------------------------------------------------
// 定时器运行
//--------------------------------------------------------------------
function CT_TimerRun()
{
    var i;
    var data_i;
    for(i=0;i<CT_ContainerTimerLength;i++) //遍历定时器容器
    {
        data_i = i * 4; //定时器数据索引
        if(CT_ContainerTimer[data_i] !== 0) //如果当前定时器不为空
         {
            if(CT_ContainerTimer[data_i+3] === 1) //如果当前定时器状态为1
            {
                CT_ContainerTimer[data_i+1] -= 1; //当前定时器的时间帧 -1
                if(CT_ContainerTimer[data_i+1] === 0) //如果当前定时器定时结束
                {
                    var timer_duration = CT_ContainerTimer[data_i+2]; //定时器时长
                    CT_ContainerTimer[data_i+3] = 2; //将当前定时器的状态标记为结束
                    CT_ContainerTimer[data_i+1] = timer_duration; //重置定时器
                }
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 全局定时器运行
//--------------------------------------------------------------------
function CT_GlobalTimerRun()
{
    var i;
    var data_i;
    for(i=0;i<CT_ContainerGlobalTimerLength;i++) //遍历全局定时器容器
    {
        data_i = i * 4; //全局定时器数据索引
        if(CT_ContainerGlobalTimer[data_i] !== 0) //如果当前全局定时器不为空
        {
            if(CT_ContainerGlobalTimer[data_i+3] === 1) //如果当前全局定时器状态为1
            {
                CT_ContainerGlobalTimer[data_i+1] -= 1; //当前全局定时器的时间帧 -1
                if(CT_ContainerGlobalTimer[data_i+1] === 0) //如果当前全局定时器定时结束
                {
                    var timer_duration = CT_ContainerGlobalTimer[data_i+2]; //全局定时器时长
                    CT_ContainerGlobalTimer[data_i+3] = 2; //将当前全局定时器的状态标记为结束
                    CT_ContainerGlobalTimer[data_i+1] = timer_duration; //重置全局定时器
                }
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 定时器容器清除
//--------------------------------------------------------------------
function CT_ContainerTimerClear()
{
    var i;
    var i2;
    var data_i;
    for(i=0;i<CT_ContainerTimerLength;i++) //遍历定时器容器
    {
        data_i = i * 4; //定时器数据索引
	if(CT_ContainerTimer[data_i] !== 0) //如果当前定时器不为空
	{
            for(i2=0;i2<4;i2++) //遍历定时器数据
            {
                CT_ContainerTimer[data_i+i2] = 0; //清除定时器数据
            }
            CT_ContainerTimerName[i] = ""; //清除定时器名称
	}
    }
    CT_ContainerTimerLength = 0; //定时器容器长度为0
}
//--------------------------------------------------------------------