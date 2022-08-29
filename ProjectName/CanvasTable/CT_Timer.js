"use strict";

var CT_ContainerTimer = []; //定时器容器  格式:[[定时器名称,定时器时间,定时器时长,定时器状态],......]
var CT_ContainerTimerIndex = 0; //定时器索引
var CT_ContainerGlobalTimer = []; //全局定时器容器  格式:[[定时器名称,定时器时间,定时器时长,定时器状态],......]
var CT_ContainerGlobalTimerIndex = 0; //全局定时器索引
//--------------------------------------------------------------------
// 定时器运行
//--------------------------------------------------------------------
function CT_TimerRun()
{
    var i;
    if(CT_ContainerTimerIndex !== 0) //如果定时器时间列表长度不为0
    {
        for(i=0;i<CT_ContainerTimerIndex;i++) //遍历定时器容器
        {
            if(CT_ContainerTimer[i] != null) //如果当前定时器不为空
            {
                if(CT_ContainerTimer[i][3] === 1) //如果当前定时器状态为1
                {
                    CT_ContainerTimer[i][1] -= 1; //当前定时器的时间帧 -1
                    if(CT_ContainerTimer[i][1] === 0) //如果当前定时器定时结束
                    {
                        CT_ContainerTimer[i][3] = 2; //将当前定时器的状态标记为结束
                        var timer_duration = CT_ContainerTimer[i][2]; //定时器时长
                        CT_ContainerTimer[i][1] = timer_duration; //重置定时器
                    }
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
    if(CT_ContainerGlobalTimerIndex !== 0) //如果全局定时器时间列表长度不为0
    {
        for(i=0;i<CT_ContainerGlobalTimerIndex;i++) //遍历全局定时器容器
        {
            if(CT_ContainerGlobalTimer[i] != null) //如果当前全局定时器不为空
            {
                if(CT_ContainerGlobalTimer[i][3] === 1) //如果当前全局定时器状态为1
                {
                    CT_ContainerGlobalTimer[i][1] -= 1; //当前全局定时器的时间帧 -1
                    if(CT_ContainerGlobalTimer[i][1] === 0) //如果当前全局定时器定时结束
                    {
                        CT_ContainerGlobalTimer[i][3] = 2; //将当前全局定时器的状态标记为结束
                        var timer_duration = CT_ContainerGlobalTimer[i][2]; //全局定时器时长
                        CT_ContainerGlobalTimer[i][1] = timer_duration; //重置全局定时器
                    }
                }
            }
        }
    }
}
//--------------------------------------------------------------------