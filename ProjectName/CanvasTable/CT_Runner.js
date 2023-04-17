"use strict";

var CT_Repaint = 0; //请求重绘
var CT_ViewX = 0; //视野位置x
var CT_ViewY = 0; //视野位置y
var CT_ViewLastX = 0; //上次视野位置x
var CT_ViewLastY = 0; //上次视野位置y
var CT_RunnerStatus = 1; //运行器状态
//--------------------------------------------------------------------
// 运行器开始
//--------------------------------------------------------------------
function CT_RunnerStart()
{
    cprint("CanvasTable Running...");
    CT_Main(); //执行CTmain函数
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
        CT_Repaint = 1; //请求重绘
    }
    CT_GlobalTimerRun(); //运行全局定时器
    CT_TimerRun(); //运行定时器
    CT_UIRun(); //运行UI
    CT_TaskReady(); //准备子程序
    CT_TaskRunMain(); //执行子程序主函数
    CT_TaskRunLoop(); //执行子程序循环函数
    CT_Loop(); //执行循环函数
    CT_SpriteEnd(); //sprite结束
    CT_ButtonEnd(); //按钮结束
    CT_KeyboardReset(); //按键重置
    if(CT_Repaint === 1) //如果请求重绘
    {
        if(CT_RunnerStatus === 1) //如果运行器没有停止
        {
            CT_RunnerOffRender(); //离屏渲染
        }
        CT_Repaint = 0; //完成重绘
    }
    requestAnimationFrame(CT_RunnerLoop); //运行器循环
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 离屏渲染
//--------------------------------------------------------------------
function CT_RunnerOffRender()
{
    var tile_ls = 0; //瓦片层状态
    var sprite_ls = 0; //sprite层状态
    var window_ls = 0; //窗口层状态
    var draw_ls = 0; //draw层状态
    var i;
    CT_OffCanvas_Clear(); //清除缓冲画布
    for(i=0;i<32;i++) //遍历层
    {
        draw_ls = CT_DrawLayerStatusList[i]; //获取当前draw层状态
        tile_ls = CT_TileLayerStatusList[i]; //获取当前瓦片层状态
        sprite_ls = CT_SpriteLayerStatusList[i]; //获取当前sprite层状态
        window_ls = CT_WindowLayerStatusList[i]; //获取当前窗口层状态
        if(tile_ls === 1) //如果当前瓦片层被使用
        {
            CT_TileRender(i); //渲染瓦片
        }
        if(sprite_ls === 1) //如果当前sprite层被使用
        {
            CT_SpriteRender(i); //渲染sprite
        }
        if(window_ls === 1) //如果当前窗口层被使用
        {
            CT_UIRender(i); //渲染UI
        }
        if(draw_ls === 1) //如果当前draw层被使用
        {
            CT_DrawRender(i); //渲染draw
        }
    }
    CT_TouchKeyRender(); //渲染触摸键图片
    CT_OffCanvas_Swap(); //交换离屏画布
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 运行器重置
//--------------------------------------------------------------------
function CT_RunnerReset()
{
    CT_ContainerDrawClear(); //清除draw容器
    CT_ContainerUIClear(); //清除UI容器
    CT_ContainerSpriteClear(); //清除sprite容器
    CT_ContainerTileClear(); //清除瓦片容器
    CT_ContainerTaskClear(); //清除子程序容器
    CT_ContainerTimerClear(); //清除定时器容器
    CT_ViewX = 0; //视野位置x为0
    CT_ViewY = 0; //视野位置y为0
    CT_ViewLastX = 0; //上次视野位置x为0
    CT_ViewLastY = 0; //上次视野位置y为0
}
//--------------------------------------------------------------------