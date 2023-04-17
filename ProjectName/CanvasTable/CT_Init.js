"use strict";

var CT_Canvas; //主画布
var CT_OffCanvas; //离屏画布
var CT_ClientW; //客户端宽度
var CT_ClientH; //客户端高度
var CT_CanvasW = 0; //画布宽度
var CT_CanvasH = 0; //画布高度
var CT_CanvasCWM = 1; //画布相对客户端的宽度倍数
var CT_CanvasCHM = 1; //画布相对客户端的高度倍数
var CT_Ctx; //画布绘图环境
var CT_OCtx; //缓冲画布绘图环境
var CT_BlCtx; //混合画布绘图环境
var CT_Main; //Main函数
var CT_Loop; //Loop函数
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
    cprint("CanvasTable.JS Version : 1.X-Rev");
    cprint("CanvasTable.JS Build : 2023/04/16");
    cprint("----------Init----------");
    CT_PreferSet(); //设置偏好
    CT_CanvasCreate(); //创建主画布
    CT_OffCanvasCreate(); //创建离屏画布
    cprint("------------------------");
    CT_ResourceLoadStart(rl); //开始加载资源
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
    CT_BROWSER = CT_BrowserCheck(); //判断浏览器
    CT_DEVICE = CT_DeviceCheck(); //判断设备
    CT_RUN_CONTEXT = CT_RunContextCheck(); //判断运行环境
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
    if(CT_BROWSER === 4) //如果浏览器是Edge
    {
        cprint("Browser : Edge");
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
    var browser = 0; //浏览器
    var agent = navigator.userAgent; //浏览器agent
    var firefox_check = agent.indexOf("Firefox",0); //agent中Firefox字段的位置
    var chrome_check = agent.indexOf("Chrome",0); //agent中Chrome字段的位置
    var safari_check = agent.indexOf("Safari",0); //agent中Safari字段的位置
    var edge_check = agent.indexOf("Edg",0); //agent中Edge字段的位置
    if(chrome_check >= 0 && safari_check >= 0) //如果agent中有Chrome，Safari字段
    {
        if(chrome_check < safari_check) //如果Chrome字段的位置小于Safari字段的位置
        {
            browser = 2; //是Chrome
        }
        if(chrome_check > safari_check) //如果Chrome字段的位置大于Safari字段的位置
        {
            browser = 3; //是Safari
        }
    }
    if(firefox_check >= 0) //如果agent中有Firefox字段
    {
        browser = 1; //是Firefox
    }
    if(edge_check >= 0) //如果agent中有Edge字段
    {
        browser = 4; //是Edge
    }
    return browser;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 运行设备判断
//--------------------------------------------------------------------
function CT_DeviceCheck()
{
    var device = 0; //运行设备
    var agent = navigator.userAgent; //浏览器agent
    var mobile_check = agent.indexOf("Mobile",0); //agent中Mobile字段的位置
    if(mobile_check >= 0) //如果agent中有Mobile字段
    {
        device = 1; //是移动平台
    }
    return device;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 运行环境判断
//--------------------------------------------------------------------
function CT_RunContextCheck()
{
    var runc = 0; //运行环境
    var url = window.location.href; //访问地址
    var url_file = url.lastIndexOf("file://"); //访问地址中file字段的位置
    if(url_file === -1) //如果访问地址没有file字段
    {
        runc = 1; //是Web环境
    }
    return runc;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 画布创建
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
        CT_CanvasCWM = CT_CanvasW / CT_ClientW; //画布相对客户端宽度的倍数
        CT_CanvasCHM = CT_CanvasH / CT_ClientH; //画布相对客户端高度的倍数
        document.body.appendChild(CT_Canvas); //显示主画布
        CT_Ctx = CT_Canvas.getContext("2d"); //主画布绘图环境
        cprint("Created canvas : width=" + String(CT_CanvasW) + " height=" + String(CT_CanvasH));
    }
    else
    {
        cprint("ERROR : Unable to create canvas.");
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 离屏画布创建
//--------------------------------------------------------------------
function CT_OffCanvasCreate()
{
    CT_OffCanvas = document.createElement("canvas"); //创建离屏画布
    if(CT_CanvasW > 0 && CT_CanvasH > 0) //如果画布宽度和高度都大于0
    {
        CT_OffCanvas.width = CT_CanvasW; //设置缓冲画布宽度
        CT_OffCanvas.height = CT_CanvasH; //设置缓冲画布高度
    }
    CT_OCtx = CT_OffCanvas.getContext("2d"); //缓冲画布绘图环境
}
//--------------------------------------------------------------------