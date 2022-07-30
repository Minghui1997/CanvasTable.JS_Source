"use strict";

var CT_Canvas; //主画布
var CT_BufferCanvas; //缓冲画布
var CT_ClientW; //客户端宽度
var CT_ClientH; //客户端高度
var CT_CanvasW = 0; //画布宽度
var CT_CanvasH = 0; //画布高度
var CT_CanvasCRX = 1; //画布相对客户端的宽度倍数
var CT_CanvasCRY = 1; //画布相对客户端的高度倍数
var CT_Ctx; //画布绘图环境
var CT_BCtx; //缓冲画布绘图环境
var CT_Main; //Main函数
var CT_Loop; //Loop函数
var CT_LoadBarWidgetLoad = 0; //加载条块加载数
var CT_LoadBarWidgetIndex = 0; //加载条块索引
var CT_DEBUG_MODE = 1; //调试模式
var CT_RUN_CONTEXT = 0; //运行环境
var CT_SPLASH_SHOW = 0; //SPLASH显示
var CT_LOADBAR_SHOW = 1; //加载条显示
var CT_BROWSER = 0; //浏览器
var CT_DEVICE = 0; //设备
//--------------------------------------------------------------------
// 初始化函数
//--------------------------------------------------------------------
function CT_init(cw,ch,rl,main,loop,dm,sph,lbh,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15,arg16)
{
    CT_CanvasW = cw; //画布宽度
    CT_CanvasH = ch; //画布高度
    CT_DEBUG_MODE = dm; //设置调试模式
    CT_SPLASH_SHOW = sph; //设置SPLASH显示
    CT_LOADBAR_SHOW = lbh; //设置加载条显示
    CT_Main = main; //Main函数
    CT_Loop = loop; //Loop函数
    cprint("CT Version : 1.20.1");
    cprint("CT Build : 2022/07/29");
    cprint("----------Init----------");
    CT_PreferSet(); //设置偏好
    CT_CanvasCreate(); //创建主画布
    CT_BufferCanvasCreate(); //创建缓冲画布
    cprint("------------------------");
    var rl_l = rl.length; //资源列表参数长度
    var i;
    for(i=0;i<rl_l;i++) //遍历资源列表参数
    {
        CT_ResourceList[i] = [rl[i]]; //将资源列表参数传递到资源列表
    }
    CT_ResourceLoadStart(); //开始加载资源
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置偏好
//--------------------------------------------------------------------
function CT_PreferSet()
{
    if(CT_DEBUG_MODE === 1) //如果debug模式开启
    {
        cprint("Debug mode : Enable");
    }
    CT_BrowserCheck(); //浏览器判断
    CT_DeviceCheck(); //设备判断
    CT_RunContextCheck(); //运行环境判断
    if(CT_RUN_CONTEXT === 0) //如果运行环境是本地
    {
        cprint("Run context : Local");
    }
    if(CT_RUN_CONTEXT === 1) //如果运行环境是Web
    {
        cprint("Run context : Web");
    }
    if(CT_BROWSER === 1) //如果浏览器是Firefox
    {
        cprint("Browser : Firefox");
    }
    if(CT_BROWSER === 2) //如果浏览器是Chrome
    {
        cprint("Browser : Chrome");
    }
    if(CT_BROWSER === 3) //如果浏览器是Safari
    {
        cprint("Browser : Safari");
    }
    if(CT_BROWSER === 4) //如果浏览器是IE
    {
        cprint("Browser : IE");
    }
    if(CT_BROWSER === 0) //如果浏览器是其它
    {
        cprint("Browser : Other");
    }
    if(CT_DEVICE === 0) //如果设备是桌面平台
    {
        cprint("Device : Table");
    }
    if(CT_DEVICE === 1) //如果设备是移动平台
    {
        cprint("Device : Mobile");
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 浏览器判断
//--------------------------------------------------------------------
function CT_BrowserCheck()
{
    var agent = navigator.userAgent; //浏览器agent
    var firefox_check = agent.indexOf("Firefox",0); //agent中Firefox字段的位置
    var chrome_check = agent.indexOf("Chrome",0); //agent中Chrome字段的位置
    var safari_check = agent.indexOf("Safari",0); //agent中Safari字段的位置
    var ie_check = agent.indexOf("MSIE",0); //agent中MSIE字段的位置
    if(firefox_check >= 0) //如果agent中有Firefox字段
    {
        CT_BROWSER = 1; //是Firefox
    }
    if(chrome_check >= 0 && safari_check >= 0) //如果agent中有Chrome，Safari字段
    {
        if(chrome_check < safari_check) //如果Chrome字段的位置小于Safari字段的位置
        {
            CT_BROWSER = 2; //是Chrome
        }
    }
    else
    {
        if(chrome_check >= 0) //如果agent中有Chrome字段
        {
            CT_BROWSER = 2; //是Chrome
        }
        if(safari_check >= 0) //如果agent中有Safari字段
        {
            CT_BROWSER = 3; //是Safari
        }
    }
    if(ie_check >= 0) //如果agent中有MSIE字段
    {
        CT_BROWSER = 4; //是IE
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 运行设备判断
//--------------------------------------------------------------------
function CT_DeviceCheck()
{
    var agent = navigator.userAgent; //浏览器agent
    var mobile_check = agent.indexOf("Mobile",0); //agent中Mobile字段的位置
    if(mobile_check >= 0) //如果agent中有Mobile字段
    {
        CT_DEVICE = 1; //是移动平台
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 运行环境判断
//--------------------------------------------------------------------
function CT_RunContextCheck()
{
    var url = window.location.href; //访问地址
    var url_file = url.lastIndexOf("file://"); //访问地址中file字段的位置
    if(url_file === -1) //如果访问地址没有file字段
    {
        CT_RUN_CONTEXT = 1; //是Web环境
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 创建画布
//--------------------------------------------------------------------
function CT_CanvasCreate()
{
    CT_Canvas = document.createElement("canvas"); //创建主画布
    if(CT_CanvasW > 0 && CT_CanvasH > 0) //如果画布宽度和高度都大于0
    {
        CT_Canvas.style.background = "#000000"; //设置应用程序画布背景色为黑色
        CT_Canvas.width = CT_CanvasW; //设置应用程序画布宽度
        CT_Canvas.height = CT_CanvasH; //设置应用程序画布高度
        CT_Canvas.style.position = "absolute"; //设置应用程序画布位置模式
        CT_Canvas.style.left = "0px"; //画布左贴边
        CT_Canvas.style.top = "0px"; //画布上贴边
        CT_ClientW = document.documentElement.clientWidth; //客户端宽度
        CT_ClientH = document.documentElement.clientHeight; //客户端高度
        CT_Canvas.style.width = String(CT_ClientW) + "px"; //设置画布宽度为客户端宽度
        CT_Canvas.style.height = String(CT_ClientH) + "px"; //设置画布高度为客户端高度
        CT_CanvasCRX = CT_CanvasW / CT_ClientW; //画布相对客户端宽度的倍数
        CT_CanvasCRY = CT_CanvasH / CT_ClientH; //画布相对客户端高度的倍数
        CT_Resize(); //调整画布
        document.body.appendChild(CT_Canvas); //显示主画布
        cprint("Created canvas : width=" + String(CT_CanvasW) + " height=" + String(CT_CanvasH));
    }
    else
    {
        cprint("ERROR 6 : Unable to create canvas");
    }
    CT_Ctx = CT_Canvas.getContext("2d"); //主画布绘图环境
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 画布调整
//--------------------------------------------------------------------
function CT_Resize()
{
    window.addEventListener("resize",function(event) //监听客户端窗口调整
    {
        CT_ClientW = document.documentElement.clientWidth; //客户端宽度
        CT_ClientH = document.documentElement.clientHeight; //客户端高度
        CT_Canvas.style.width = String(CT_ClientW) + "px"; //设置画布宽度为客户端宽度
        CT_Canvas.style.height = String(CT_ClientH) + "px"; //设置画布高度为客户端高度
        CT_CanvasCRX = CT_CanvasW / CT_ClientW; //画布相对客户端宽度的倍数
        CT_CanvasCRY = CT_CanvasH / CT_ClientH; //画布相对客户端高度的倍数
    },false);
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 创建缓冲画布
//--------------------------------------------------------------------
function CT_BufferCanvasCreate()
{
    CT_BufferCanvas = document.createElement("canvas"); //创建缓冲画布
    if(CT_CanvasW > 0 && CT_CanvasH > 0) //如果缓冲画布宽度和高度都大于0
    {
        CT_BufferCanvas.width = CT_CanvasW; //设置缓冲画布宽度
        CT_BufferCanvas.height = CT_CanvasH; //设置缓冲画布高度
    }
    CT_BCtx = CT_BufferCanvas.getContext("2d"); //缓冲画布绘图环境
}
//--------------------------------------------------------------------