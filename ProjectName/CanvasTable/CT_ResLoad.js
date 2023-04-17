"use strict";

var CT_ResourceList = []; //资源名称列表
var CT_ResourceArgList = []; //资源参数列表
var CT_ContainerResource = []; //资源容器
var CT_ResLength = 0; //资源容器长度
var CT_ResListLength = 0; //资源列表长度
var CT_SplashImage; //splash图片
var CT_LoadBarWidget_LN = 0; //加载条的加载数
var CT_LoadBarWidget_Index = 0; //加载条索引
//--------------------------------------------------------------------
// 资源加载开始
//--------------------------------------------------------------------
function CT_ResourceLoadStart(rl)
{
    cprint("-----Load resource-----");
    CT_ResourceList = rl; //将当前资源路径(参数)复制到资源列表中
    CT_ResListLength = rl.length; //资源列表长度
    if(CT_SPLASH_SHOW === 1) //如果SPLASH显示
    {
        CT_SplashImage = new Image(); //新建splash图片
        CT_SplashImage.src = "splash.png"; //splash图片路径
        CT_SplashImage.onload = function() //如果splash图片(png)加载完成
        {
            CT_LoadBarShow(0); //显示加载条
            CT_ResourceLoad(); //加载资源
        };
        CT_SplashImage.onerror = function() //如果splash图片(png)未找到
        {
            CT_SplashImage = new Image(); //新建splash图片
            CT_SplashImage.src = "splash.jpg"; //splash图片路径
            CT_SplashImage.onload = function() //如果splash图片加载完成
            {
                CT_LoadBarShow(0); //显示加载条
                CT_ResourceLoad(); //加载资源
            };
            CT_SplashImage.onerror = function() //如果splash图片(jpg)未找到
            {
                CT_LoadBarShowError(0,"splash.xxx"); //显示错误信息
            };
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
// 资源加载
//--------------------------------------------------------------------
function CT_ResourceLoad()
{
    if(CT_ResListLength !== 0) //如果资源列表长度不为0
    {
        var res_name = CT_ResourceList[CT_ResLength].slice(CT_ResourceList[CT_ResLength].lastIndexOf("/")+1); //获取资源文件名
        if(res_name.lastIndexOf(".") !== -1) //如果资源文件名中有"."
        {
            if(res_name.lastIndexOf(".") !== 0) //如果资源文件名中"."的位置不为0
            {
                var res_type = 0; //资源类型
                var extname_pos = res_name.lastIndexOf(".")+1; //资源文件扩展名位置
                var res_extname = res_name.slice(extname_pos); //资源文件扩展名
                if(res_extname === "png" || res_extname === "PNG" || res_extname === "jpg" || res_extname === "JPG"|| res_extname === "jpeg" || res_extname === "JPEG") //如果资源文件类型是图像
                {
                    res_type = 1; //资源类型是图像
                    CT_ResourceLoad_Image(CT_ResourceList[CT_ResLength]); //加载图像
                }
                if(res_extname === "mp3" || res_extname === "MP3" || res_extname === "ogg" || res_extname === "OGG") //如果资源文件是音频
                {
                    res_type = 2; //资源类型是音频
                    CT_ResourceLoad_Audio(CT_ResourceList[CT_ResLength]); //加载音频
                }
                if(res_type === 0) //如果资源文件类型不是图像和音频
                {
                    CT_ResourceLoad_Text(CT_ResourceList[CT_ResLength]); //加载文本
                }
            }
            else
            {
                cprint("ERROR : The resource file name is error : " + CT_ResourceList[CT_ResLength]);
            }
        }
        else
        {
            cprint("ERROR : The resource file name is not support : " + CT_ResourceList[CT_ResLength]);
        }
    }
    else //如果资源列表长度为0
    {
        CT_ResourceLoadEnd(); //结束加载资源
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 加载资源 - 图像
//--------------------------------------------------------------------
function CT_ResourceLoad_Image(path)
{
    var image = new Image(); //新建图像
    image.src = path; //资源列表中的文件路径
    image.onload = function() //如果图像加载完成
    {
        CT_ContainerResource[CT_ResLength] = image; //将图像存入资源容器
        var ldata_i = CT_ResLength * 5; //资源参数数据索引
        var image_w = image.width; //图像宽度
        var image_h = image.height; //图像高度
        //将图像参数存入资源参数列表
        CT_ResourceArgList[ldata_i] = 1;
        CT_ResourceArgList[ldata_i+1] = 0;
        CT_ResourceArgList[ldata_i+2] = image_w;
        CT_ResourceArgList[ldata_i+3] = image_h;
        cprint("Resource load : " + path);
        CT_loadBarWidget(); //加载条循环
        CT_ResLength ++; //资源长度 +1
        if(CT_ResLength === CT_ResListLength) //如果资源加载完成
        {
            CT_ResourceLoadEnd(); //结束加载资源
        }
        else //如果资源没有加载完
        {
            CT_ResourceLoad(); //加载下一个资源
        }
    };
    image.onerror = function() //如果图像未找到
    {
        CT_LoadBarShowError(0,path); //显示错误信息
    };
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 加载资源 - 音频
//--------------------------------------------------------------------
function CT_ResourceLoad_Audio(path)
{
    var audio = new Audio(); //新建音频
    audio.src = path; //资源列表中当前音频路径
    CT_ContainerResource[CT_ResLength] = audio; //将音频存入资源容器
    var ldata_i = CT_ResLength * 5; //资源参数数据索引
    //将音频参数存入资源列表
    CT_ResourceArgList[ldata_i] = 1;
    CT_ResourceArgList[ldata_i+1] = 1;
    cprint("Resource load : " + path);
    CT_loadBarWidget(); //加载条循环
    CT_ResLength ++; //资源长度 +1
    if(CT_ResLength === CT_ResListLength) //如果资源加载完成
    {
        CT_ResourceLoadEnd(); //结束加载资源
    }
    else //如果资源没有加载完
    {
        CT_ResourceLoad(); //加载下一个资源
    }
    audio.onerror = function() //如果音频未找到
    {
        CT_LoadBarShowError(0,path); //显示错误信息
    };
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 加载资源 - 文本
//--------------------------------------------------------------------
function CT_ResourceLoad_Text(path)
{
    var xmlhttp = new XMLHttpRequest(); //新建ajax请求
    xmlhttp.open("GET",path,true); //ajax命令
    xmlhttp.send(); //ajax发送请求
    xmlhttp.onreadystatechange = function() //ajax状态
    {
        if(xmlhttp.readyState === 4 && xmlhttp.status === 200) //如果成功读取文本文件
        {
            CT_ContainerResource[CT_ResLength] = xmlhttp.responseText; //将文本数据存入资源容器
            var ldata_i = CT_ResLength * 5; //资源参数数据索引
            //将文本参数存入资源列表
            CT_ResourceArgList[ldata_i] = 1;
            CT_ResourceArgList[ldata_i+1] = 2;
            CT_ResourceArgList[ldata_i+2] = xmlhttp.responseText.length;
            cprint("Resource load : " + path);
            CT_loadBarWidget(); //加载条循环
            CT_ResLength ++; //资源长度 +1
            if(CT_ResLength === CT_ResListLength) //如果资源加载完成
            {
                CT_ResourceLoadEnd(); //结束加载资源
            }
            else //如果资源没有加载完
            {
                CT_ResourceLoad(); //加载下一个资源
            }
        }
        if(xmlhttp.status === 404) //如果读取文本文件失败
        {
            CT_LoadBarShowError(0,path); //显示错误信息
        }
    };
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 加载资源结束
//--------------------------------------------------------------------
function CT_ResourceLoadEnd()
{
    cprint("------------------------");
    if(CT_SPLASH_SHOW === 1) //如果SPLASH显示
    {
        CT_SplashImage = null; //释放splash图像数据
    }
    CT_OffCanvas_Clear(); //清除离屏画布
    CT_OffCanvas_Swap(); //交换离屏画布
    CT_RunnerStart(); //运行器开始
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 加载条循环
//--------------------------------------------------------------------
function CT_loadBarWidget()
{
    CT_LoadBarWidget_LN ++; //加载条的加载数 +1
    if(CT_LoadBarWidget_LN === 10) //如果加载条的加载数等于10
    {
        CT_LoadBarWidget_Index ++; //加载条索引+1
        if(CT_LoadBarWidget_Index > 14) //如果加载条索引大于14
        {
            CT_LoadBarWidget_Index = 0; //加载条索引为0
        }
        CT_LoadBarShow(CT_LoadBarWidget_Index); //显示加载条
        CT_LoadBarWidget_LN = 0; //加载条的加载数为0
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// splash图片显示
//--------------------------------------------------------------------
function CT_BufferSplash()
{
    CT_OCtx.drawImage(CT_SplashImage,0,0); //绘制splash图片
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
    var widget_w = 28; //加载条块宽度
    var widget_h = 22; //加载条高度
    var bar_x = parseInt((CT_CanvasW - bar_w) / 2); //加载条位置x
    var bar_y = parseInt((CT_CanvasH - bar_h) / 2); //加载条位置y
    var title_w = string_pxwidth(title,20); //加载条标题宽度
    var title_h = 20; //加载条标题高度
    var title_x = parseInt((CT_CanvasW - title_w) / 2); //加载条标题位置x
    var title_y = bar_y - 35; //加载条标题位置y
    var bar_c = color(210,193,153,255); //加载条颜色
    CT_OffCanvas_Clear(); //清除离屏画布
    if(CT_SPLASH_SHOW === 1) //如果SPLASH显示
    {
        CT_BufferSplash(); //绘制splash图片
    }
    if(CT_LOADBAR_SHOW === 1) //如果加载条显示
    {
        CT_OffCanvas_String(title_x,title_y,16,bar_c,title); //绘制加载条标题
        CT_OffCanvas_Rectangle(bar_x,bar_y,400,30,bar_c,0); //绘制加载条
        CT_OffCanvas_Rectangle(bar_x+1,bar_y+1,398,28,bar_c,0); //绘制加载条
        if(n >= 1 && n <= 14) //如果加载条块索引在指定范围内
        {
            var widget_x = bar_x + 4 + (n - 1) * widget_w; //加载条块位置x
            var widget_y = bar_y + 4; //加载条块位置y
            CT_OffCanvas_Rectangle(widget_x,widget_y,widget_w,widget_h,bar_c,1); //绘制加载条块
        }
    }
    CT_OffCanvas_Swap(); //交换离屏画布
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 加载条显示错误
//--------------------------------------------------------------------
function CT_LoadBarShowError(c,s)
{
    var err_x = parseInt(CT_CanvasW * 0.03); //错误信息位置x
    var err_y = parseInt((CT_CanvasH - 30) / 2) + 40; //错误信息位置y
    var err_c = color(210,193,153,255); //错误信息颜色
    if(CT_LOADBAR_SHOW === 1) //如果加载条显示
    {
        if(c === 0) //如果错误代码是0
        {
            CT_OffCanvas_Clear(); //清除离屏画布
            CT_OffCanvas_String(err_x,err_y,16,err_c,"ERROR : The resource file is not found : " + s); //显示错误信息
            CT_OffCanvas_Swap(); //交换画布
        }
    }
}
//--------------------------------------------------------------------