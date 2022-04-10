"use strict";

var CT_ResourceList = []; //资源列表
var CT_ContainerResource = []; //资源容器
var CT_ResIndex = 0; //资源容器索引
var CT_SplashImage; //splash图片
//--------------------------------------------------------------------
// 开始加载资源
//--------------------------------------------------------------------
function CT_ResourceLoadStart()
{
    cprint("-----Load resource------");
    if(CT_SPLASH_SHOW === 1) //如果SPLASH显示
    {
        CT_SplashImage = new Image(); //新建splash图片
        CT_SplashImage.src = "splash.png"; //splash图片路径
        CT_SplashImage.onload = function() //如果splash图片加载完成
        {
            CT_LoadBarShow(0); //显示加载条
            CT_ResourceLoad(); //加载资源
        };
        CT_SplashImage.onerror = function() //如果splash图片未找到
        {
            CT_LoadBarShowError(0,"splash.png"); //显示错误信息
        };
    }
    else //如果SPLASH不显示
    {
        CT_LoadBarShow(0); //显示加载条
        CT_ResourceLoad(); //加载资源
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 加载资源
//--------------------------------------------------------------------
function CT_ResourceLoad()
{
    if(CT_ResourceList.length !== 0) //如果资源列表参数长度不为0
    {
        var res_name = CT_PathGetName(CT_ResourceList[CT_ResIndex][0]); //资源文件名
        if(res_name.lastIndexOf(".") !== -1) //如果资源文件名中有"."
        {
            if(res_name.lastIndexOf(".") !== 0) //如果资源文件名中"."的位置不为0
            {
                var extname_pos = res_name.lastIndexOf(".")+1; //资源文件扩展名位置
                var res_extname = res_name.slice(extname_pos); //资源文件扩展名
                if(res_extname === "png" || res_extname === "jpg" || res_extname === "jpeg" || res_extname === "bmp" || res_extname === "mp3" || res_extname === "ogg") //如果资源文件类型是支持的
                {
                    if(res_extname === "png" || res_extname === "jpg" || res_extname === "jpeg"|| res_extname === "bmp") //如果资源文件是图像
                    {
                        var image = new Image(); //新建图像
                        image.src = CT_ResourceList[CT_ResIndex][0]; //资源列表中的文件路径
                        image.onload = function() //如果图像加载完成
                        {
                            CT_ContainerResource[CT_ResIndex] = image; //将图像存入资源容器
                            var image_w = image.width; //图像宽度
                            var image_h = image.height; //图像高度
                            //将图像参数存入资源列表
                            CT_ResourceList[CT_ResIndex][1] = 0;
                            CT_ResourceList[CT_ResIndex][2] = image_w;
                            CT_ResourceList[CT_ResIndex][3] = image_h;
                            cprint("Resource load : " + CT_ResourceList[CT_ResIndex][0]);
                            CT_loadBarWidget(); //加载条循环
                            CT_ResIndex ++; //资源索引 +1
                            if(CT_ResIndex === CT_ResourceList.length) //如果资源加载完成
                            {
                                CT_ResourceLoadEnd(); //结束加载资源
                            }
                            else //如果资源没有加载完
                            {
                                CT_ResourceLoad(); //回调，加载下一个资源
                            }
                        };
                        image.onerror = function() //如果图像未找到
                        {
                            CT_LoadBarShowError(0,CT_ResourceList[CT_ResIndex][0]); //显示错误信息
                        };
                    }
                    if(res_extname === "mp3" || res_extname === "ogg") //如果资源文件是音频
                    {
                        var audio = new Audio(); //新建音频
                        audio.src = CT_ResourceList[CT_ResIndex][0]; //资源列表中当前音频路径
                        CT_ContainerResource[CT_ResIndex] = audio; //将音频存入资源容器
                        //将音频参数存入资源列表
                        CT_ResourceList[CT_ResIndex][1] = 1;
                        cprint("Resource load : " + CT_ResourceList[CT_ResIndex][0]);
                        CT_loadBarWidget(); //加载条循环
                        CT_ResIndex ++; //资源索引 +1
                        if(CT_ResIndex === CT_ResourceList.length) //如果资源加载完成
                        {
                            CT_ResourceLoadEnd(); //结束加载资源
                        }
                        else //如果资源没有加载完
                        {
                            CT_ResourceLoad(); //回调，加载下一个资源
                        }
                        audio.onerror = function() //如果音频未找到
                        {
                            CT_LoadBarShowError(0,CT_ResourceList[CT_ResIndex][0]); //显示错误信息
                        };
                    }
                }
                else
                {
                    cprint("ERROR 3 : The resource file type is not supoort : " + CT_ResourceList[CT_ResIndex][0]);
                }
            }
            else
            {
                cprint("ERROR 2 : The resource file name is error : " + CT_ResourceList[CT_ResIndex][0]);
            }
        }
        else
        {
            cprint("ERROR 1 : The resource file name is not support : " + CT_ResourceList[CT_ResIndex][0]);
        }
    }
    else //如果资源列表长度为0
    {
        CT_ResourceLoadEnd(); //结束加载资源
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 结束加载资源
//--------------------------------------------------------------------
function CT_ResourceLoadEnd()
{
    cprint("------------------------");
    cprint("CanvasTable Running...");
    CT_CanvasClear(); //清除画布
    CT_Main(); //执行Main函数
    requestAnimationFrame(CT_RunnerLoop); //运行器循环
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 路径中的文件名
//--------------------------------------------------------------------
function CT_PathGetName(path)
{
    var i;
    for(i=path.length-1;i>=0;i--) //反向遍历文件路径
    {
        var a = path[i]; //文件路径当前字符
        if(a === "/") //如果字符是"/"
        {
            var name = path.slice(i+1,path.length); //文件名
            return name; //返回文件名
        }
        if(i === 0) //如果文件路径中没有字符"/"
        {
            var name = path.slice(i,path.length); //文件名
            return name; //返回文件名
        }
    }
    return "";
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 加载条循环
//--------------------------------------------------------------------
function CT_loadBarWidget()
{
    CT_LoadBarWidgetLoad ++; //加载条块加载数 +1
    if(CT_LoadBarWidgetLoad === 10) //如果加载条块加载数等于10
    {
        CT_LoadBarWidgetIndex ++; //加载条块索引+1
        if(CT_LoadBarWidgetIndex > 14) //如果加载条块索引大于14
        {
            CT_LoadBarWidgetIndex = 0; //加载条块索引
        }
        CT_LoadBarShow(CT_LoadBarWidgetIndex); //显示加载条
        CT_LoadBarWidgetLoad = 0; //加载条块加载数
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 显示splash图片
//--------------------------------------------------------------------
function CT_BufferSplash()
{
    CT_BCtx.drawImage(splash,0,0); //绘制splash图片
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 加载条显示
//--------------------------------------------------------------------
function CT_LoadBarShow(n)
{
    var bar_w = 400; //加载条宽度
    var bar_h = 30; //加载条高度
    var title = "Loading..."; //加载条标题
    var lump_w = 28; //加载条块宽度
    var lump_h = 22; //加载条高度
    var bar_x = parseInt((CT_CanvasW - bar_w) / 2); //加载条位置x
    var bar_y = parseInt((CT_CanvasH - bar_h) / 2); //加载条位置y
    var title_w = string_pxwidth(title,20); //加载条标题宽度
    var title_h = 20; //加载条标题高度
    var title_x = parseInt((CT_CanvasW - title_w) / 2); //加载条标题位置x
    var title_y = bar_y - 40; //加载条标题位置y
    var bar_c = color(210,193,153,255); //加载条颜色
    if(CT_SPLASH_SHOW === 1) //如果SPLASH显示
    {
        CT_BufferSplash(); //绘制splash图片
    }
    if(CT_LOADBAR_SHOW === 1) //如果加载条显示
    {
        CT_BufferString(title_x,title_y,20,bar_c,title); //绘制加载条标题
        CT_BufferRect(bar_x,bar_y,400,30,bar_c,0); //绘制加载条
        CT_BufferRect(bar_x+1,bar_y+1,398,28,bar_c,0); //绘制加载条
        if(n >= 1 && n <= 14) //如果加载条块索引在指定范围内
        {
            var lump_x = bar_x + 4 + (n - 1) * lump_w; //加载条块位置x
            var lump_y = bar_y + 4; //加载条块位置y
            CT_BufferRect(lump_x,lump_y,lump_w,lump_h,bar_c,1); //绘制加载条块
        }
    }
    CT_BufferCanvasOut(); //输出缓冲画布
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 加载条显示错误
//--------------------------------------------------------------------
function CT_LoadBarShowError(c,s)
{
    var err_x = parseInt((CT_CanvasW - 400) / 2); //错误信息位置x
    var err_y = parseInt((CT_CanvasH - 30) / 2) + 40; //错误信息位置y
    var err_c = color(210,193,153,255); //错误信息颜色
    if(CT_LOADBAR_SHOW === 1) //如果加载条显示
    {
        if(c === 0) //如果错误代码是0
        {
            CT_BufferString(err_x,err_y,16,err_c,"ERROR 0 : The resource file is not found : " + s); //显示错误信息
            CT_BufferCanvasOut(); //输出缓冲画布
        }
    }
}
//--------------------------------------------------------------------