"use strict";

var CT_Repaint = 0; //请求重绘
var CT_ContainerTask = []; //子程序容器
var CT_ContainerTaskNum = []; //子程序数字变量容器
var CT_ContainerTaskStr = []; //子程序字符串变量容器
var CT_ContainerTaskLength = 0; //子程序容器长度
var CT_TaskStateList = []; //子程序状态列表
var CT_TaskRunIndex = 0; //子程序运行索引
var CT_ViewX = 0; //视野位置x
var CT_ViewY = 0; //视野位置y
var CT_ViewLastX = 0; //上次视野位置x
var CT_ViewLastY = 0; //上次视野位置y
var CT_RunnerStatus = 1; //运行器状态
var CT_RectabData = ""; //记录表数据
var CT_RectabName = ""; //记录表名称
//--------------------------------------------------------------------
// 运行器开始
//--------------------------------------------------------------------
function CT_RunnerStart()
{
    cprint("CanvasTable Running...");
    CT_Main(); //执行Main函数
    requestAnimationFrame(CT_RunnerLoop); //运行器循环
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 运行器循环
//--------------------------------------------------------------------
function CT_RunnerLoop()
{
    if(CT_RunnerStatus === 0) //如果运行器停止
    {
        CT_RunnerStatus = 1; //恢复运行器
        CT_Repaint = 1; //进行重绘
    }
    CT_GlobalTimerRun(); //运行全局定时器
    CT_TimerRun(); //运行定时器
    CT_UIRun(); //运行UI
    CT_TaskReady(); //准备子程序
    CT_TaskRunMain(); //运行子程序main函数
    CT_TaskRunLoop(); //运行子程序循环函数
    CT_Loop(); //执行循环函数
    CT_SpriteReset(); //sprite重置
    CT_ButtonReset(); //按钮重置
    CT_KeyboardReset(); //按键重置
    if(CT_Repaint === 1) //如果请求重绘
    {
        if(CT_RunnerStatus === 1) //如果运行器没有停止
        {
            CT_RunnerBufferRender(); //双重缓冲渲染
        }
        CT_Repaint = 0;
    }
    requestAnimationFrame(CT_RunnerLoop); //请求回调
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 重绘
//--------------------------------------------------------------------
function CT_InterfaceRepaint()
{
    CT_Repaint = 1; //请求重绘
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 双重缓冲渲染
//--------------------------------------------------------------------
function CT_RunnerBufferRender()
{
    var i;
    CTBCanvas_Clear(); //清除缓冲画布
    for(i=0;i<32;i++) //遍历层
    {
        CT_TileRender(i); //渲染瓦片
        CT_SpriteRender(i); //渲染sprite
        CT_UIRender(i); //渲染UI
        CT_DrawRender(i); //渲染draw
    }
    CT_TouchKeyRender(); //渲染触摸键图片
    CTBCanvas_Output(); //输出缓冲画布
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 创建子程序
//--------------------------------------------------------------------
function CT_TaskCreated(task_i,task_m,task_l)
{
    if(task_i <= CT_ContainerTaskLength) //如果子程序索引小于等于子程序容器长度
    {
        CT_ContainerTask[task_i] = [task_m,task_l]; //将子程序存入容器
        CT_TaskStateList[task_i] = 0; //将子程序状态设置为等待
        CT_ContainerTaskNum[task_i] = []; //创建子程序数字变量数组
        CT_ContainerTaskStr[task_i] = []; //创建子程序字符串变量数组
        CT_ContainerTaskLength += 1; //子程序容器索引 +1
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 销毁子程序
//--------------------------------------------------------------------
function CT_TaskDestroy(task_i)
{
    if(task_i < CT_ContainerTaskLength) //如果子程序索引小于等于子程序容器长度
    {
        CT_ContainerTask[task_i] = null; //清除子程序函数
        CT_TaskStateList[task_i] = null; //清除子程序状态
        CT_ContainerTaskNum[task_i] = null; //清除子程序数字变量数组
        CT_ContainerTaskStr[task_i] = null; //清除子程序字符串变量数组
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 子程序变量赋值 数字
//--------------------------------------------------------------------
function CT_TaskSetNum(ti,i,n)
{
    if(ti < CT_ContainerTaskLength) //如果子程序索引小于等于子程序容器长度
    {
        CT_ContainerTaskNum[ti][i] = n; //设置子程序数字变量
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 子程序变量 数字
//--------------------------------------------------------------------
function CT_TaskNum(ti,i)
{
    if(ti < CT_ContainerTaskLength) //如果子程序索引小于等于子程序容器长度
    {
        if(CT_ContainerTaskNum[ti][i] != null) //如果子程序变量不为空
        {
            var num = CT_ContainerTaskNum[ti][i]; //获取子程序数字变量
            return num;
        }
    }
    return 0;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 子程序变量赋值 字符串
//--------------------------------------------------------------------
function CT_TaskSetStr(ti,i,s)
{
    if(ti < CT_ContainerTaskLength) //如果子程序索引小于等于子程序容器长度
    {
        CT_ContainerTaskStr[ti][i] = s; //设置子程序字符串变量
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 子程序变量 字符串
//--------------------------------------------------------------------
function CT_TaskStr(ti,i)
{
    if(ti < CT_ContainerTaskLength) //如果子程序索引小于等于子程序容器长度
    {
        if(CT_ContainerTaskStr[ti][i] != null)
        {
            var str = CT_ContainerTaskStr[ti][i]; //获取子程序字符串变量
            return str;
        }
    }
    return "";
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 子程序准备
//--------------------------------------------------------------------
function CT_TaskReady()
{
    var i;
    for(i=0;i<CT_ContainerTaskLength;i++) //遍历子程序容器
    {
        if(CT_TaskStateList[i] != null) //如果当前子程序状态不为空
        {
            if(CT_TaskStateList[i] === 0) //如果当前子程序状态为准备
            {
                CT_TaskStateList[i] = 1; //将当前子程序标记为运行
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 运行子程序main函数
//--------------------------------------------------------------------
function CT_TaskRunMain()
{
    var i;
    for(i=0;i<CT_ContainerTaskLength;i++) //遍历子程序容器
    {
        if(CT_ContainerTask[i] != null) //如果当前子程序不为空
        {
            if(CT_TaskStateList[i] != null) //如果当前子程序状态不为空
            {
                if(CT_TaskStateList[i] === 1) //如果当前子程序状态为准备
                {
                    CT_TaskRunIndex = i; //子程序运行索引
                    CT_ContainerTask[i][0](); //执行子程序main函数
                    CT_TaskStateList[i] = 2; //将当前子程序状态设置为循环
                }
            }
        }
    }
    CT_TaskRunIndex = 0; //子程序运行索引
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 运行程序loop函数
//--------------------------------------------------------------------
function CT_TaskRunLoop()
{
    var i;
    for(i=0;i<CT_ContainerTaskLength;i++) //遍历子程序容器
    {
        if(CT_ContainerTask[i] != null) //如果当前子程序不为空
        {
            if(CT_TaskStateList[i] != null) //如果当前子程序状态不为空
            {
                if(CT_TaskStateList[i] === 2) //如果当前子程序状态为循环
                {
                    CT_TaskRunIndex = i; //子程序运行索引
                    CT_ContainerTask[i][1](); //执行子程序循环函数
                }
            }
        }
    }
    CT_TaskRunIndex = 0; //子程序运行索引
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 运行器重置
//--------------------------------------------------------------------
function CT_RunnerReset()
{
    CT_ContainerDraw = []; //draw容器
    CT_ContainerDrawLength = 0; //draw容器长度
    CT_DrawLayer = 0; //draw层级
    CT_ContainerWindow = []; //窗口容器
    CT_ContainerWindowLength = 0; //窗口容器长度
    CT_ContainerUI = []; //UI容器
    CT_ContainerUILength = 0; //UI容器长度
    CT_ContainerSprite = []; //Sprite容器
    CT_ContainerSpriteLength = 0; //sprite容器长度
    CT_ContainerTile = []; //瓦片容器
    CT_ContainerTileLength = 0; //瓦片容器长度
    CT_ContainerTask = []; //子程序容器
    CT_TaskStateList = []; //子程序状态列表
    CT_ContainerTaskNum = []; //子程序数字变量容器
    CT_ContainerTaskStr = []; //子程序字符串变量容器
    CT_ContainerTaskLength = 0; //子程序容器索引
    CT_TaskRunIndex = 0; //子程序运行索引
    CT_ContainerTimer = []; //定时器容器
    CT_ContainerTimerLength = 0; //定时器索引
    CT_ViewX = 0; //视野位置x
    CT_ViewY = 0; //视野位置y
    CT_ViewLastX = 0; //上次视野位置x
    CT_ViewLastY = 0; //上次视野位置y
    CT_DialogDestroy(); //销毁对话框
    CT_Textbox_Index = -1; //点击UI的索引
    CT_DownX = -1; //鼠标按下的位置x
    CT_DownY = -1; //鼠标按下的位置y
    CT_DialogShow = 0;
    CT_Dialog_Index = -1;
}
//--------------------------------------------------------------------