"use strict";

//--------------------------------------------------------------------
// 按键容器
//--------------------------------------------------------------------
var CT_ContainerKeyState = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //按键状态容器
var CT_ContainerKeyDown = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //按键按下容器
var CT_ContainerKeyUp = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //按键松开容器
var CT_ContainerMKeyState = [0,0,0]; //鼠标按键状态容器
var CT_ContainerMKeyDown = [0,0,0]; //鼠标按键按下状态容器
var CT_ContainerMKeyUp = [0,0,0]; //鼠标按键松开容器
var CT_ContainerMWheel = [0,0]; //鼠标滚轮容器
var CT_MousePosX = 0; //鼠标位置x
var CT_MousePosY = 0; //鼠标位置y
var CT_TouchSlipp = 0; //触摸滑动
var CT_KeyChar = ""; //按键字符
var CT_ContainerTouchKey = []; //触摸键容器
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 输入
//--------------------------------------------------------------------
document.addEventListener("keydown",function(event) //监听按键按下
{
    CT_ContainerKeyState[event.keyCode] = 1; //将按键状态容器中按下的键标记为1
    if(CT_ContainerKeyDown[event.keyCode] === 0) //如果按键中断容器中按下的键不为1
    {
        CT_ContainerKeyDown[event.keyCode] = 1; //将按键按下容器中按下的键标记为1
    }
    if(event.keyCode === 8) //如果按下的键是BACK
    {
        CT_KeyChar = "\b"; //按键字符为BACK
    }
},false);
document.addEventListener("keyup",function(event) //监听按键松开
{
    CT_ContainerKeyState[event.keyCode] = 0; //将按键状态容器中松开的键标记为0
    CT_ContainerKeyDown[event.keyCode] = 0; //将按键按下容器中按下的键标记为0
    CT_ContainerKeyUp[event.keyCode] = 1; //将按键松开容器中松开的键标记为1
},false);
document.addEventListener("keypress",function(event) //监听按键输入
{
    if(event.which !== 0 && event.which !== 8) //如果字码不为0
    {
        CT_KeyChar = String.fromCharCode(event.which); //当前按键输入的字符
    }
},false);
document.addEventListener("mouseup",function(event) //监听鼠标松开
{
    CT_ContainerMKeyState[event.button] = 0; //将鼠标按键状态容器中松开的键标记为0
    CT_ContainerMKeyUp[event.button] = 1; //将鼠标按键松开容器中松开的键标记为1
},false);
document.addEventListener("mousedown",function(event) //监听鼠标按下
{
    CT_ContainerMKeyState[event.button] = 1; //将鼠标按键状态容器中按下的键标记为1
    CT_ContainerMKeyDown[event.button] = 1; //将鼠标按键按下容器中按下的键标记为1
},false);
document.addEventListener("mousemove",function(event) //监听鼠标移动
{
    CT_MousePosX = parseInt(event.pageX * CT_CanvasCRX); //鼠标位置x
    CT_MousePosY = parseInt(event.pageY * CT_CanvasCRY); //鼠标位置y
},false);
document.addEventListener("DOMMouseScroll",function(event) //监听鼠标滚轮(firefox)
{
    if(event.detail < 0) //如果滚轮向上
    {
        CT_ContainerMWheel[0] = 1; //将鼠标滚轮容器中上滚动标记为1
    }
    if(event.detail > 0) //如果滚轮向下
    {
        CT_ContainerMWheel[1] = 1; //将鼠标滚轮容器中下滚动标记为1
    }
},false);
document.addEventListener("mousewheel",function(event) //监听鼠标滚轮(chrome /safari / edge / other)
{
    if(event.wheelDelta > 0) //如果滚轮向上
    {
        CT_ContainerMWheel[0] = 1; //将鼠标滚轮容器中上滚动标记为1
    }
    if(event.wheelDelta < 0) //如果滚轮向下
    {
        CT_ContainerMWheel[1] = 1; //将鼠标滚轮容器中下滚动标记为1
    }
},false);
document.addEventListener("contextmenu",function(event) //监听右键菜单
{
    event.preventDefault(); //禁用右键菜单
},false);
window.addEventListener("resize",function(event) //监听客户端窗口调整
{
    CT_ClientW = document.documentElement.clientWidth; //客户端宽度
    CT_ClientH = document.documentElement.clientHeight; //客户端高度
    CT_Canvas.style.width = String(CT_ClientW) + "px"; //设置画布宽度为客户端宽度
    CT_Canvas.style.height = String(CT_ClientH) + "px"; //设置画布高度为客户端高度
    CT_CanvasCRX = CT_CanvasW / CT_ClientW; //画布相对客户端宽度的倍数
    CT_CanvasCRY = CT_CanvasH / CT_ClientH; //画布相对客户端高度的倍数
},false);
document.addEventListener("touchstart",function(event) //监听触摸点按下
{
    var toulist_e = event.touches.length - 1; //当前触摸点索引
    var touches_l = event.touches.length; //touches length
    var t_x = event.touches[toulist_e].pageX; //当前触摸点位置x
    var t_y = event.touches[toulist_e].pageY; //当前触摸点位置y
    CT_MousePosX = parseInt(t_x * CT_CanvasCRX); //鼠标位置x
    CT_MousePosY = parseInt(t_y * CT_CanvasCRY); //鼠标位置y
    CT_TouchSlipp = CT_MousePosY; //滑动触摸位置y
    CT_ContainerMKeyState[0] = 1; //将鼠标按键状态容器中按下的键标记为1
    CT_ContainerMKeyDown[0] = 1; //将鼠标按键按下容器中按下的键标记为1
    var i;
    var i2;
    for(i=0;i<16;i++) //遍历触摸键容器
    {
        if(CT_ContainerTouchKey[i] != null) //如果当前触摸键不为空
        {
            var touchkey_x = CT_ContainerTouchKey[i][0]; //获取当前触摸键位置x
            var touchkey_y = CT_ContainerTouchKey[i][1]; //获取当前触摸键位置y
            var touchkey_w = CT_ContainerTouchKey[i][2]; //获取当前触摸键宽度
            var touchkey_h = CT_ContainerTouchKey[i][3]; //获取当前触摸键高度
            var touchkey_key = CT_ContainerTouchKey[i][4]; //获取当前触摸键键值
            for(i2=0;i2<touches_l;i2++) //遍历触摸列表
            {
                var touch_x = parseInt(event.touches[i2].pageX * CT_CanvasCRX); //获取当前触摸点位置x
                var touch_y = parseInt(event.touches[i2].pageY * CT_CanvasCRY); //获取当前触摸点位置y
                if(touch_x >= touchkey_x && touch_y >= touchkey_y && touch_x < touchkey_x + touchkey_w && touch_y < touchkey_y + touchkey_h) //当前触摸键被触摸
                {
                    CT_ContainerKeyState[touchkey_key] = 1; //将按键状态容器中按下的键标记为1
                    CT_ContainerKeyDown[touchkey_key] = 1; //将按键按下容器中按下的键标记为1
                    break;
                }
            }
        }
    }
},false);
document.addEventListener("touchend",function(event) //监听触摸点松开
{
    var toulist_e = event.changedTouches.length - 1; //当前触摸点索引
    var changed_l = event.changedTouches.length; //changedTouches length
    var t_x = event.changedTouches[toulist_e].pageX; //当前触摸点位置x
    var t_y = event.changedTouches[toulist_e].pageY; //当前触摸点位置y
    CT_MousePosX = parseInt(t_x * CT_CanvasCRX); //鼠标位置x
    CT_MousePosY = parseInt(t_y * CT_CanvasCRY); //鼠标位置y
    CT_ContainerMKeyState[0] = 0; //将鼠标按键状态容器中按下的键标记为0
    CT_ContainerMKeyUp[0] = 1; //将鼠标按键松开容器中松开的键标记为1
    var i;
    var i2;
    for(i=0;i<16;i++) //遍历触摸键容器
    {
        if(CT_ContainerTouchKey[i] != null) //如果当前触摸键不为空
        {
            var touchkey_x = CT_ContainerTouchKey[i][0]; //获取当前触摸键位置x
            var touchkey_y = CT_ContainerTouchKey[i][1]; //获取当前触摸键位置y
            var touchkey_w = CT_ContainerTouchKey[i][2]; //获取当前触摸键宽度
            var touchkey_h = CT_ContainerTouchKey[i][3]; //获取当前触摸键高度
            var touchkey_key = CT_ContainerTouchKey[i][4]; //获取当前触摸键键值
            for(i2=0;i2<changed_l;i2++) //遍历触摸列表
            {
                var touch_x = parseInt(event.changedTouches[i2].pageX * CT_CanvasCRX); //获取当前触摸点位置x
                var touch_y = parseInt(event.changedTouches[i2].pageY * CT_CanvasCRY); //获取当前触摸点位置y
                if(touch_x >= touchkey_x && touch_y >= touchkey_y && touch_x < touchkey_x + touchkey_w && touch_y < touchkey_y + touchkey_h) //当前触摸键被放开
                {
                    CT_ContainerKeyState[touchkey_key] = 0; //将按键状态容器中按下的键标记为0
                    CT_ContainerKeyDown[touchkey_key] = 0; //将按键按下容器中按下的键标记为0
                    CT_ContainerKeyUp[touchkey_key] = 1; //将按键松开容器中松开的键标记为1
                }
            }
        }
        
    }
},false);
document.addEventListener("touchmove",function(event) //监听触摸点移动
{
    var toulist_e = event.touches.length - 1; //当前触摸点索引
    var touches_l = event.touches.length; //changedTouches length
    var t_x = event.touches[toulist_e].pageX; //当前触摸点位置x
    var t_y = event.touches[toulist_e].pageY; //当前触摸点位置y
    CT_MousePosX = parseInt(t_x * CT_CanvasCRX); //鼠标位置x
    CT_MousePosY = parseInt(t_y * CT_CanvasCRY); //鼠标位置y
    if(CT_MousePosY < CT_TouchSlipp) //如果当前触摸位置y小于滑动触摸位置y
    {
        CT_ContainerMWheel[0] = 1; //将鼠标滚轮容器中上滚动标记为1
        CT_TouchSlipp = CT_MousePosY; //刷新滑动触摸位置y
    }
    if(CT_MousePosY > CT_TouchSlipp) //如果当前触摸位置y大于滑动触摸位置y
    {
        CT_ContainerMWheel[1] = 1; //将鼠标滚轮容器中下滚动标记为1
        CT_TouchSlipp = CT_MousePosY; //刷新滑动触摸位置y
    }
    var i;
    var i2;
    for(i=0;i<16;i++) //遍历触摸键容器
    {
        if(CT_ContainerTouchKey[i] != null) //如果当前触摸键不为空
        {
            var touchkey_x = CT_ContainerTouchKey[i][0]; //获取当前触摸键位置x
            var touchkey_y = CT_ContainerTouchKey[i][1]; //获取当前触摸键位置y
            var touchkey_w = CT_ContainerTouchKey[i][2]; //获取当前触摸键宽度
            var touchkey_h = CT_ContainerTouchKey[i][3]; //获取当前触摸键高度
            var touchkey_key = CT_ContainerTouchKey[i][4]; //获取当前触摸键键值
            var no_touch = 1; //没有触摸
            for(i2=0;i2<touches_l;i2++) //遍历触摸列表
            {
                var touch_x = parseInt(event.touches[i2].pageX * CT_CanvasCRX); //获取当前触摸点位置x
                var touch_y = parseInt(event.touches[i2].pageY * CT_CanvasCRY); //获取当前触摸点位置y
                if(touch_x >= touchkey_x && touch_y >= touchkey_y && touch_x < touchkey_x + touchkey_w && touch_y < touchkey_y + touchkey_h) //当前触摸键被触摸
                {
                    CT_ContainerKeyState[touchkey_key] = 1; //将按键状态容器中按下的键标记为1
                    if(CT_ContainerKeyDown[touchkey_key] === 0) //如果按键中断容器中按下的键不为1
                    {
                        CT_ContainerKeyDown[touchkey_key] = 1; //将按键按下容器中按下的键标记为1
                    }
                    no_touch = 0; //已触摸
                    break;
                }
            }
            if(no_touch === 1) //如果当前触摸键没有触摸
            {
                CT_ContainerKeyState[touchkey_key] = 0; //将按键状态容器中按下的键标记为0
                CT_ContainerKeyDown[touchkey_key] = 0; //将按键按下容器中按下的键标记为0
                CT_ContainerKeyUp[touchkey_key] = 1; //将按键松开容器中松开的键标记为1
            }
        }     
    }
},false);
//--------------------------------------------------------------------
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 渲染触摸键图片
//--------------------------------------------------------------------
function CT_TouchKeyRender()
{
    var i;
    for(i=0;i<16;i++) //遍历触摸键容器
    {
        if(CT_ContainerTouchKey[i] != null) //如果当前触摸键不为空
        {
            var tx = CT_ContainerTouchKey[i][0]; //当前触摸键位置x
            var ty = CT_ContainerTouchKey[i][1]; //当前触摸键位置y
            var ti = CT_ContainerTouchKey[i][5]; //当前触摸键图像
            if(ti !== -1) //如果触摸键有图像
            {
                CTBCanvas_Image(tx,ty,ti); //绘制触摸键图像
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 按键重置
//--------------------------------------------------------------------
function CT_KeyboardReset()
{
    var i;
    for(i=0;i<256;i++) //遍历按键按下容器
    {
        if(CT_ContainerKeyDown[i] === 1) //如果当前按键被按下
        {
            CT_ContainerKeyDown[i] = 2; //将当前按下的键标记为2
        }
    }
    var i2;
    for(i2=0;i2<256;i2++) //遍历按键松开容器
    {
        CT_ContainerKeyUp[i2] = 0; //重置按键松开容器
    }
    var i3;
    for(i3=0;i3<3;i3++) //遍历鼠标按键按下容器
    {
        if(CT_ContainerMKeyDown[i3] === 1) //如果当前按键被按下
        {
            CT_ContainerMKeyDown[i3] = 2; //将当前按下的键标记为2
        }
    }
    var i4;
    for(i4=0;i4<3;i4++) //遍历鼠标按键松开容器
    {
        CT_ContainerMKeyUp[i4] = 0; //重置鼠标按键松开容器
    }
    CT_ContainerMWheel[0] = 0; //重置鼠标滚轮容器
    CT_ContainerMWheel[1] = 0; //重置鼠标滚轮容器
    CT_KeyChar = ""; //重置按键字符
}
//--------------------------------------------------------------------