"use strict";

//--------------------------------------------------------------------
// 新建定时器
//--------------------------------------------------------------------
function timer_set(timer,time)
{
    var i;
    for(i=0;i<CT_ContainerTimer.length;i++) //遍历定时器容器
    {
        var timer_name = CT_ContainerTimer[i][0]; //当前定时器名称
        if(timer_name === timer) //如果当前定时器名称等于定时器名称
        {
            cprint("ERROR 20 : The timer have been created : " + timer);
            return; //中断
        }
    }
    if(time >= 0.017) //如果定时器时间大于等于0.017
    {
        if(CT_ContainerTimer.length > 0) //如果定时器容器长度大于0
        {
            var i2;
            for(i2=0;i2<CT_ContainerTimer.length;i2++) //遍历定时器容器
            {
                if(CT_ContainerTimer[i2] == null) //如果当前定时器为空
                {
                    var time_frame = parseInt(time * 60); //时间帧
                    CT_ContainerTimer[i2] = [timer,time_frame,time_frame,0,0]; //将定时器存入定时器容器
                    return; //中断
                }
            }
            var time_frame = parseInt(time * 60); //时间帧
            CT_ContainerTimer[CT_ContainerTimerIndex] = [timer,time_frame,time_frame,0,0]; //将定时器存入定时器容器
            CT_ContainerTimerIndex ++; //定时器索引 +1
        }
        else
        {
            var time_frame = parseInt(time * 60); //时间帧
            CT_ContainerTimer[CT_ContainerTimerIndex] = [timer,time_frame,time_frame,0,0]; //将定时器存入定时器容器
            CT_ContainerTimerIndex ++; //定时器索引 +1
        }
    }
    else
    {
        cprint("ERROR 13 : The timer duration than the minimum. Time : " + String(time));
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 清除定时器
//--------------------------------------------------------------------
function timer_clear(timer)
{
    var i;
    for(i=0;i<CT_ContainerTimer.length;i++) //遍历定时器容器
    {
        var timer_name = CT_ContainerTimer[i][0]; //当前定时器名称
        if(timer_name === timer) //如果当前定时器名称等于定时器名称
        {
            CT_ContainerTimer[i] = null; //清除指定定时器
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 运行定时器
//--------------------------------------------------------------------
function timer_run(timer)
{
    var i;
    for(i=0;i<CT_ContainerTimer.length;i++) //遍历定时器容器
    {
        if(CT_ContainerTimer[i] != null) //如果当前定时器不为空
        {
            var timer_name = CT_ContainerTimer[i][0]; //当前定时器名称
            if(timer_name === timer) //如果当前定时器名称等于定时器名称
            {
                CT_ContainerTimer[i][3] = 1; //运行指定定时器
                return; //中断
            }
        }
    }
    cprint("ERROR 14 : Timer invalid : " + timer);
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 停止定时器
//--------------------------------------------------------------------
function timer_stop(timer)
{
    var i;
    for(i=0;i<CT_ContainerTimer.length;i++) //遍历定时器容器
    {
        if(CT_ContainerTimer[i] != null) //如果当前定时器不为空
        {
            var timer_name = CT_ContainerTimer[i][0]; //当前定时器名称
            if(timer_name === timer) //如果当前定时器名称等于定时器名称
            {
                var timer_duration = CT_ContainerTimer[i][2]; //定时器时长
                CT_ContainerTimer[i][1] = timer_duration; //重置定时器
                CT_ContainerTimer[i][3] = 0; //停止指定定时器
                return; //中断
            }
        }
    }
    cprint("ERROR 14 : Timer invalid : " + timer);
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 暂停定时器
//--------------------------------------------------------------------
function timer_pause(timer)
{
    var i;
    for(i=0;i<CT_ContainerTimer.length;i++) //遍历定时器容器
    {
        if(CT_ContainerTimer[i] != null) //如果指定定时器不为空
        {
            var timer_name = CT_ContainerTimer[i][0]; //当前定时器名称
            if(timer_name === timer) //如果当前定时器名称等于定时器名称
            {
                CT_ContainerTimer[i][3] = 0; //停止指定定时器
                return; //中断
            }
        }
    }
    cprint("ERROR 14 : Timer invalid : " + timer);
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 检查定时器是否结束
//--------------------------------------------------------------------
function timer_end(timer)
{
    var i;
    for(i=0;i<CT_ContainerTimer.length;i++) //遍历定时器容器
    {
        if(CT_ContainerTimer[i] != null) //如果指定定时器不为空
        {
            var timer_name = CT_ContainerTimer[i][0]; //当前定时器名称
            if(timer_name === timer) //如果当前定时器名称等于定时器名称
            {
                if(CT_ContainerTimer[i][3] === 2) //如果指定定时器结束
                {
                    return 1;
                }
                return 0;
            }
        }
    }
    cprint("ERROR 14 : Timer invalid : " + timer);
    return 0;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 新建全局定时器
//--------------------------------------------------------------------
function globaltimer_set(timer,time)
{
    var i;
    for(i=0;i<CT_ContainerGlobalTimer.length;i++) //遍历全局定时器容器
    {
        var timer_name = CT_ContainerGlobalTimer[i][0]; //当前全局定时器名称
        if(timer_name === timer) //如果当前全局定时器名称等于全局定时器名称
        {
            cprint("ERROR 20 : The timer have been created : " + timer);
            return; //中断
        }
    }
    if(time >= 0.017) //如果全局定时器时间大于等于0.017
    {
        if(CT_ContainerGlobalTimer.length > 0) //如果全局定时器容器长度大于0
        {
            var i2;
            for(i2=0;i2<CT_ContainerGlobalTimer.length;i2++) //遍历全局定时器容器
            {
                if(CT_ContainerGlobalTimer[i2] == null) //如果当前全局定时器为空
                {
                    var time_frame = parseInt(time * 60); //时间帧
                    CT_ContainerGlobalTimer[i2] = [timer,time_frame,time_frame,0,0]; //将全局定时器存入全局定时器容器
                    return; //中断
                }
            }
            var time_frame = parseInt(time * 60); //时间帧
            CT_ContainerGlobalTimer[CT_ContainerGlobalTimerIndex] = [timer,time_frame,time_frame,0,0]; //将全局定时器存入全局定时器容器
            CT_ContainerGlobalTimerIndex ++; //全局定时器索引 +1
        }
        else
        {
            var time_frame = parseInt(time * 60); //时间帧
            CT_ContainerGlobalTimer[CT_ContainerGlobalTimerIndex] = [timer,time_frame,time_frame,0,0]; //将全局定时器存入全局定时器容器
            CT_ContainerGlobalTimerIndex ++; //全局定时器索引 +1
        }
    }
    else
    {
        cprint("ERROR 13 : The timer duration than the minimum. Time : " + String(time));
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 清除全局定时器
//--------------------------------------------------------------------
function globaltimer_clear(timer)
{
    var i;
    for(i=0;i<CT_ContainerGlobalTimer.length;i++) //遍历全局定时器容器
    {
        var timer_name = CT_ContainerGlobalTimer[i][0]; //当前全局定时器名称
        if(timer_name === timer) //如果当前全局定时器名称等于全局定时器名称
        {
            CT_ContainerGlobalTimer[i] = null; //清除指定全局定时器
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 运行全局定时器
//--------------------------------------------------------------------
function globaltimer_run(timer)
{
    var i;
    for(i=0;i<CT_ContainerGlobalTimer.length;i++) //遍历全局定时器容器
    {
        if(CT_ContainerGlobalTimer[i] != null) //如果当前全局定时器不为空
        {
            var timer_name = CT_ContainerGlobalTimer[i][0]; //当前全局定时器名称
            if(timer_name === timer) //如果当前全局定时器名称等于全局定时器名称
            {
                CT_ContainerGlobalTimer[i][3] = 1; //运行指定全局定时器
                return; //中断
            }
        }
    }
    cprint("ERROR 14 : Timer invalid : " + timer);
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 停止全局定时器
//--------------------------------------------------------------------
function globaltimer_stop(timer)
{
    var i;
    for(i=0;i<CT_ContainerGlobalTimer.length;i++) //遍历全局定时器容器
    {
        if(CT_ContainerGlobalTimer[i] != null) //如果当前全局定时器不为空
        {
            var timer_name = CT_ContainerGlobalTimer[i][0]; //当前全局定时器名称
            if(timer_name === timer) //如果当前全局定时器名称等于全局定时器名称
            {
                var timer_duration = CT_ContainerGlobalTimer[i][2]; //全局定时器时长
                CT_ContainerGlobalTimer[i][1] = timer_duration; //重置全局定时器
                CT_ContainerGlobalTimer[i][3] = 0; //停止指定全局定时器
                return; //中断
            }
        }
    }
    cprint("ERROR 14 : Timer invalid : " + timer);
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 暂停全局定时器
//--------------------------------------------------------------------
function globaltimer_pause(timer)
{
    var i;
    for(i=0;i<CT_ContainerGlobalTimer.length;i++) //遍历全局定时器容器
    {
        if(CT_ContainerGlobalTimer[i] != null) //如果指定全局定时器不为空
        {
            var timer_name = CT_ContainerGlobalTimer[i][0]; //当前全局定时器名称
            if(timer_name === timer) //如果当前全局定时器名称等于全局定时器名称
            {
                CT_ContainerGlobalTimer[i][3] = 0; //停止指定全局定时器
                return; //中断
            }
        }
    }
    cprint("ERROR 14 : Timer invalid : " + timer);
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 检查全局定时器是否结束
//--------------------------------------------------------------------
function globaltimer_end(timer)
{
    var i;
    for(i=0;i<CT_ContainerGlobalTimer.length;i++) //遍历全局定时器容器
    {
        if(CT_ContainerGlobalTimer[i] != null) //如果指定全局定时器不为空
        {
            var timer_name = CT_ContainerGlobalTimer[i][0]; //当前全局定时器名称
            if(timer_name === timer) //如果当前全局定时器名称等于全局定时器名称
            {
                if(CT_ContainerGlobalTimer[i][3] === 2) //如果指定全局定时器结束
                {
                    return 1;
                }
                return 0;
            }
        }
    }
    cprint("ERROR 14 : Timer invalid : " + timer);
    return 0;
}
//--------------------------------------------------------------------