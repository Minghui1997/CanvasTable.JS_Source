"use strict";

//--------------------------------------------------------------------
// 定时器新建
//--------------------------------------------------------------------
function timer_set(timer,time)
{
    var i;
    for(i=0;i<CT_ContainerTimerLength;i++) //遍历定时器容器
    {
        if(CT_ContainerTimer[i*4] !== 0) //如果当前定时器不为空
        {
            var timer_name = CT_ContainerTimerName[i]; //获取当前定时器名称
            if(timer_name === timer) //如果当前定时器名称与参数定时器名称一致
            {
                cprint("ERROR : Timer have been create.");
                return; //中断
            }
        }
    }
    if(time >= 0.1) //如果定时器时间大于等于0.1
    {
        var time_frame = parseInt(time * 60); //计算时间帧
        var i2;
        var data_i;
        for(i2=0;i2<CT_ContainerTimerLength;i2++) //遍历定时器容器
        {
            data_i = i2 * 4; //定时器数据索引
            if(CT_ContainerTimer[data_i] === 0) //如果当前定时器为空
            {
                //将定时器数据写入定时器容器
                CT_ContainerTimerName[i2] = timer;
                CT_ContainerTimer[data_i] = 1;
                CT_ContainerTimer[data_i+1] = time_frame;
                CT_ContainerTimer[data_i+2] = time_frame;
                CT_ContainerTimer[data_i+3] = 0;
                return; //中断
            }
        }
        data_i = CT_ContainerTimerLength * 4; //定时器数据索引
        //将定时器数据写入定时器容器
        CT_ContainerTimerName[CT_ContainerTimerLength] = timer;
        CT_ContainerTimer[data_i] = 1;
        CT_ContainerTimer[data_i+1] = time_frame;
        CT_ContainerTimer[data_i+2] = time_frame;
        CT_ContainerTimer[data_i+3] = 0;
        CT_ContainerTimerLength ++; //定时器容器长度 +1
    }
    else
    {
        cprint("ERROR : The timer duration than minimum.");
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 帧定时器新建
//--------------------------------------------------------------------
function timer_set_f(timer,fn)
{
    var i;
    for(i=0;i<CT_ContainerTimerLength;i++) //遍历定时器容器
    {
        if(CT_ContainerTimer[i*4] !== 0) //如果当前定时器不为空
        {
           var timer_name = CT_ContainerTimerName[i]; //获取当前定时器名称
            if(timer_name === timer) //如果当前定时器名称与参数定时器名称一致
            {
                cprint("ERROR : Timer have been create.");
                return; //中断
            }
        }
    }
    if(fn >= 1) //如果定时器帧大于等于1
    {
        var i2;
        var data_i;
        for(i2=0;i2<CT_ContainerTimerLength;i2++) //遍历定时器容器
        {
            data_i = i2 * 4; //定时器数据索引
            if(CT_ContainerTimer[data_i] === 0) //如果当前定时器为空
            {
                //将定时器数据写入定时器容器
                CT_ContainerTimerName[i2] = timer;
                CT_ContainerTimer[data_i] = 1;
                CT_ContainerTimer[data_i+1] = fn;
                CT_ContainerTimer[data_i+2] = fn;
                CT_ContainerTimer[data_i+3] = 0;
                return; //中断
            }
        }
        data_i = CT_ContainerTimerLength * 4; //定时器数据索引
        //将定时器数据写入定时器容器
        CT_ContainerTimerName[CT_ContainerTimerLength] = timer;
        CT_ContainerTimer[data_i] = 1;
        CT_ContainerTimer[data_i+1] = fn;
        CT_ContainerTimer[data_i+2] = fn;
        CT_ContainerTimer[data_i+3] = 0;
        CT_ContainerTimerLength ++; //定时器容器长度 +1
    }
    else
    {
        cprint("ERROR : The timer duration than minimum.");
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 定时器清除
//--------------------------------------------------------------------
function timer_clear(timer)
{
    var i;
    var data_i;
    for(i=0;i<CT_ContainerTimerLength;i++) //遍历定时器容器
    {
        data_i = i * 4; //定时器数据索引
        if(CT_ContainerTimer[data_i] !== 0) //如果当前定时器不为空
        {
            var timer_name = CT_ContainerTimerName[i]; //获取当前定时器名称
            if(timer_name === timer) //如果当前定时器名称与参数定时器名称一致
            {
                //清除定时器容器数据
                CT_ContainerTimer[data_i] = 0;
                CT_ContainerTimer[data_i+1] = 0;
                CT_ContainerTimer[data_i+2] = 0;
                CT_ContainerTimer[data_i+3] = 0;
                CT_ContainerTimerName[i] = "";
                for(i=CT_ContainerTimerLength-1;i>=-1;i--) //反向遍历定时器容器
                {
                    if(i >= 0) //如果定时器索引大于等于0
                    {
                        if(CT_ContainerTimer[i*4] !== 0) //如果当前定时器不为空
                        {
                            CT_ContainerTimerLength = i + 1; //确定定时器容器长度
                            break; //中断
                        }
                    }
                    else
                    {
                        CT_ContainerTimerLength = 0; //定时器容器长度为0
                    }
                }
                break;
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 定时器运行
//--------------------------------------------------------------------
function timer_run(timer)
{
    var i;
    var data_i;
    for(i=0;i<CT_ContainerTimerLength;i++) //遍历定时器容器
    {
	data_i = i * 4; //定时器数据索引
        if(CT_ContainerTimer[data_i] !== 0) //如果当前定时器不为空
        {
            var timer_name = CT_ContainerTimerName[i]; //获取当前定时器名称
            if(timer_name === timer) //如果当前定时器名称与参数定时器名称一致
            {
                CT_ContainerTimer[data_i+3] = 1; //运行指定定时器
                return; //中断
            }
        }
    }
    cprint("ERROR : Timer invalid.");
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 定时器停止
//--------------------------------------------------------------------
function timer_stop(timer)
{
    var i;
    var data_i;
    for(i=0;i<CT_ContainerTimerLength;i++) //遍历定时器容器
    {
        data_i = i * 4; //定时器数据索引
        if(CT_ContainerTimer[data_i] !== 0) //如果当前定时器不为空
        {
            var timer_name = CT_ContainerTimerName[i]; //获取当前定时器名称
            if(timer_name === timer) //如果当前定时器名称与参数定时器名称一致
            {
                var timer_duration = CT_ContainerTimer[data_i+2]; //定时器时长
                CT_ContainerTimer[data_i+1] = timer_duration; //重置定时器
                CT_ContainerTimer[data_i+3] = 0; //停止指定定时器
                return; //中断
            }
        }
    }
    cprint("ERROR : Timer invalid.");
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 定时器暂停
//--------------------------------------------------------------------
function timer_pause(timer)
{
    var i;
    var data_i;
    for(i=0;i<CT_ContainerTimerLength;i++) //遍历定时器容器
    {
	data_i = i * 4;
        if(CT_ContainerTimer[data_i] !== 0) //如果当前定时器不为空
        {
            var timer_name = CT_ContainerTimerName[i]; //获取当前定时器名称
            if(timer_name === timer) //如果当前定时器名称与参数定时器名称一致
            {
                CT_ContainerTimer[data_i+3] = 0; //停止指定定时器
                return; //中断
            }
        }
    }
    cprint("ERROR : Timer invalid.");
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 检查定时器是否结束
//--------------------------------------------------------------------
function timer_end(timer)
{
    var i;
    var data_i;
    for(i=0;i<CT_ContainerTimerLength;i++) //遍历定时器容器
    {
	data_i = i * 4; //定时器数据索引
        if(CT_ContainerTimer[data_i] !== 0) //如果当前定时器不为空
        {
            var timer_name = CT_ContainerTimerName[i]; //获取当前定时器名称
            if(timer_name === timer) //如果当前定时器名称与参数定时器名称一致
            {
                if(CT_ContainerTimer[data_i+3] === 2) //如果指定定时器结束
                {
                    return 1;
                }
                return 0;
            }
        }
    }
    cprint("ERROR : Timer invalid.");
    return 0;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 全局定时器新建
//--------------------------------------------------------------------
function globaltimer_set(timer,time)
{
    var i;
    for(i=0;i<CT_ContainerGlobalTimerLength;i++) //遍历全局定时器容器
    {
        if(CT_ContainerGlobalTimer[i*4] !== 0) //如果当前全局定时器不为空
        {
            var timer_name = CT_ContainerGlobalTimerName[i]; //获取当前全局定时器名称
            if(timer_name === timer) //如果当前全局定时器名称与参数全局定时器名称一致
            {
                cprint("ERROR : Timer have been create.");
                return; //中断
            }
        }
    }
    if(time >= 0.1) //如果全局定时器时间大于等于0.1
    {
        var time_frame = parseInt(time * 60); //计算时间帧
        var i2;
        var data_i;
        for(i2=0;i2<CT_ContainerGlobalTimerLength;i2++) //遍历全局定时器容器
        {
            data_i = i2 * 4; //全局定时器数据索引
            if(CT_ContainerGlobalTimer[data_i] === 0) //如果当前全局定时器为空
            {
                //将定时器数据写入全局定时器容器
                CT_ContainerGlobalTimerName[i2] = timer;
                CT_ContainerGlobalTimer[data_i] = 1;
                CT_ContainerGlobalTimer[data_i+1] = time_frame;
                CT_ContainerGlobalTimer[data_i+2] = time_frame;
                CT_ContainerGlobalTimer[data_i+3] = 0;
                return; //中断
            }
        }
        data_i = CT_ContainerGlobalTimerLength * 4; //全局定时器数据索引
        //将全局定时器数据写入全局定时器容器
        CT_ContainerGlobalTimerName[CT_ContainerGlobalTimerLength] = timer;
        CT_ContainerGlobalTimer[data_i] = 1;
        CT_ContainerGlobalTimer[data_i+1] = time_frame;
        CT_ContainerGlobalTimer[data_i+2] = time_frame;
        CT_ContainerGlobalTimer[data_i+3] = 0;
        CT_ContainerGlobalTimerLength ++; //全局定时器容器长度 +1
    }
    else
    {
        cprint("ERROR : The timer duration than minimum.");
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 全局帧定时器新建
//--------------------------------------------------------------------
function globaltimer_set_f(timer,fn)
{
    var i;
    for(i=0;i<CT_ContainerGlobalTimerLength;i++) //遍历全局定时器容器
    {
        if(CT_ContainerGlobalTimer[i*4] !== 0) //如果当前全局定时器不为空
        {
           var timer_name = CT_ContainerGlobalTimerName[i]; //获取当前全局定时器名称
            if(timer_name === timer) //如果当前全局定时器名称与参数全局定时器名称一致
            {
                cprint("ERROR : Timer have been create.");
                return; //中断
            }
        }
    }
    if(fn >= 1) //如果全局定时器帧大于等于1
    {
        var i2;
        var data_i;
        for(i2=0;i2<CT_ContainerGlobalTimerLength;i2++) //遍历全局定时器容器
        {
            data_i = i2 * 4; //全局定时器数据索引
            if(CT_ContainerGlobalTimer[data_i] === 0) //如果当前全局定时器为空
            {
                //将全局定时器数据写入全局定时器容器
                CT_ContainerGlobalTimerName[i2] = timer;
                CT_ContainerGlobalTimer[data_i] = 1;
                CT_ContainerGlobalTimer[data_i+1] = fn;
                CT_ContainerGlobalTimer[data_i+2] = fn;
                CT_ContainerGlobalTimer[data_i+3] = 0;
                return; //中断
            }
        }
        data_i = CT_ContainerGlobalTimerLength * 4; //全局定时器数据索引
        //将全局定时器数据写入全局定时器容器
        CT_ContainerGlobalTimerName[CT_ContainerGlobalTimerLength] = timer;
        CT_ContainerGlobalTimer[data_i] = 1;
        CT_ContainerGlobalTimer[data_i+1] = fn;
        CT_ContainerGlobalTimer[data_i+2] = fn;
        CT_ContainerGlobalTimer[data_i+3] = 0;
        CT_ContainerGlobalTimerLength ++; //全局定时器容器长度 +1
    }
    else
    {
        cprint("ERROR : The timer duration than minimum.");
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 全局定时器清除
//--------------------------------------------------------------------
function globaltimer_clear(timer)
{
    var i;
    var data_i;
    for(i=0;i<CT_ContainerGlobalTimerLength;i++) //遍历全局定时器容器
    {
        data_i = i * 4; //全局定时器数据索引
        if(CT_ContainerGlobalTimer[data_i] !== 0) //如果当前全局定时器不为空
        {
            var timer_name = CT_ContainerGlobalTimerName[i]; //获取当前全局定时器名称
            if(timer_name === timer) //如果当前全局定时器名称与参数全局定时器名称一致
            {
                //清除全局定时器容器数据
                CT_ContainerGlobalTimer[data_i] = 0;
                CT_ContainerGlobalTimer[data_i+1] = 0;
                CT_ContainerGlobalTimer[data_i+2] = 0;
                CT_ContainerGlobalTimer[data_i+3] = 0;
                CT_ContainerGlobalTimerName[i] = "";
                for(i=CT_ContainerGlobalTimerLength-1;i>=-1;i--) //反向遍历全局定时器容器
                {
                    if(i >= 0) //如果全局定时器索引大于等于0
                    {
                        if(CT_ContainerGlobalTimer[i*4] !== 0) //如果当前全局定时器不为空
                        {
                            CT_ContainerGlobalTimerLength = i + 1; //确定全局定时器容器长度
                            break; //中断
                        }
                    }
                    else
                    {
                        CT_ContainerGlobalTimerLength = 0; //全局定时器容器长度为0
                    }
                }
                break;
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 全局定时器运行
//--------------------------------------------------------------------
function globaltimer_run(timer)
{
    var i;
    var data_i;
    for(i=0;i<CT_ContainerGlobalTimerLength;i++) //遍历全局定时器容器
    {
	data_i = i * 4; //全局定时器数据索引
        if(CT_ContainerGlobalTimer[data_i] !== 0) //如果当前全局定时器不为空
        {
            var timer_name = CT_ContainerGlobalTimerName[i]; //获取当前全局定时器名称
            if(timer_name === timer) //如果当前全局定时器名称与参数全局定时器名称一致
            {
                CT_ContainerGlobalTimer[data_i+3] = 1; //运行指定全局定时器
                return; //中断
            }
        }
    }
    cprint("ERROR : Timer invalid.");
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 全局定时器停止
//--------------------------------------------------------------------
function globaltimer_stop(timer)
{
    var i;
    var data_i;
    for(i=0;i<CT_ContainerGlobalTimerLength;i++) //遍历全局定时器容器
    {
        data_i = i * 4; //全局定时器数据索引
        if(CT_ContainerGlobalTimer[data_i] !== 0) //如果当前全局定时器不为空
        {
            var timer_name = CT_ContainerGlobalTimerName[i]; //获取当前全局定时器名称
            if(timer_name === timer) //如果当前全局定时器名称与参数全局定时器名称一致
            {
                var timer_duration = CT_ContainerGlobalTimer[data_i+2]; //全局定时器时长
                CT_ContainerGlobalTimer[data_i+1] = timer_duration; //重置全局定时器
                CT_ContainerGlobalTimer[data_i+3] = 0; //停止指定全局定时器
                return; //中断
            }
        }
    }
    cprint("ERROR : Timer invalid.");
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 全局定时器暂停
//--------------------------------------------------------------------
function globaltimer_pause(timer)
{
    var i;
    var data_i;
    for(i=0;i<CT_ContainerGlobalTimerLength;i++) //遍历全局定时器容器
    {
	data_i = i * 4;
        if(CT_ContainerGlobalTimer[data_i] !== 0) //如果当前全局定时器不为空
        {
            var timer_name = CT_ContainerGlobalTimerName[i]; //获取当前全局定时器名称
            if(timer_name === timer) //如果当前全局定时器名称与参数全局定时器名称一致
            {
                CT_ContainerGlobalTimer[data_i+3] = 0; //停止指定全局定时器
                return; //中断
            }
        }
    }
    cprint("ERROR : Timer invalid.");
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 检查全局定时器是否结束
//--------------------------------------------------------------------
function globaltimer_end(timer)
{
    var i;
    var data_i;
    for(i=0;i<CT_ContainerGlobalTimerLength;i++) //遍历全局定时器容器
    {
	data_i = i * 4; //全局定时器数据索引
        if(CT_ContainerGlobalTimer[data_i] !== 0) //如果当前全局定时器不为空
        {
            var timer_name = CT_ContainerGlobalTimerName[i]; //获取当前全局定时器名称
            if(timer_name === timer) //如果当前全局定时器名称与参数全局定时器名称一致
            {
                if(CT_ContainerGlobalTimer[data_i+3] === 2) //如果指定全局定时器结束
                {
                    return 1;
                }
                return 0;
            }
        }
    }
    cprint("ERROR : Timer invalid.");
    return 0;
}
//--------------------------------------------------------------------