"use strict";

//--------------------------------------------------------------------
// 按键容器
//--------------------------------------------------------------------
var CT_ContainerKeyState = []; //按键状态容器
var CT_ContainerKeyDown = []; //按键按下容器
var CT_ContainerKeyDownBreak = []; //按键按下中断容器
var CT_ContainerKeyUp = []; //按键松开容器
var CT_ContainerMKeyState = []; //鼠标按键状态容器
var CT_ContainerMKeyDown = []; //鼠标按键按下状态容器
var CT_ContainerMKeyUp = []; //鼠标按键松开容器
var CT_ContainerMWheel = []; //鼠标滚轮容器
var CT_ContainerTouchIndex = 0; //触摸键索引
var CT_MousePosX = 0; //鼠标位置x
var CT_MousePosY = 0; //鼠标位置y
var CT_TouchSlipp = 0; //触摸滑动
var CT_KeyChar = ""; //按键字符
var CT_ContainerTouchKey = []; //触摸键容器
var CT_TouchKeyList = []; //触摸键列表
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 键盘鼠标输入
//--------------------------------------------------------------------
document.addEventListener("keydown",function(event) //监听按键按下
{
    CT_ContainerKeyState[event.keyCode] = 1; //将按键状态容器中按下的键标记为1
    if(CT_ContainerKeyDownBreak[event.keyCode] !== 1) //如果按键中断容器中按下的键不为1
    {
        CT_ContainerKeyDown[event.keyCode] = 1; //将按键按下容器中按下的键标记为1
        CT_ContainerKeyDownBreak[event.keyCode] = 1; //将按键中断容器中按下的键标记为1
    }
    if(CT_BROWSER === 2 || CT_BROWSER === 3 || CT_BROWSER === 0) //如果浏览器是Chrome / Safari / other
    {
        if(event.keyCode === 8) //如果按下的键是BACK
        {
            CT_KeyChar = "_BACK"; //按键字符为BACK
        }
    }
},false);
document.addEventListener("keyup",function(event) //监听按键松开
{
    CT_ContainerKeyState[event.keyCode] = 0; //将按键状态容器中松开的键标记为0
    CT_ContainerKeyDownBreak[event.keyCode] = 0; //将按键中断容器中松开的键标记为0
    CT_ContainerKeyUp[event.keyCode] = 1; //将按键松开容器中松开的键标记为1
},false);
document.addEventListener("mousedown",function(event) //监听鼠标按下
{
    CT_ContainerMKeyState[event.button] = 1; //将鼠标按键状态容器中按下的键标记为1
    CT_ContainerMKeyDown[event.button] = 1; //将鼠标按键按下容器中按下的键标记为1
},false);
document.addEventListener("mouseup",function(event) //监听鼠标松开
{
    CT_ContainerMKeyState[event.button] = 0; //将鼠标按键状态容器中松开的键标记为0
    CT_ContainerMKeyUp[event.button] = 1; //将鼠标按键松开容器中松开的键标记为1
},false);
document.addEventListener("mousemove",function(event) //监听鼠标移动
{
    CT_MousePosX = parseInt(event.pageX * CT_CanvasCRX); //鼠标位置x
    CT_MousePosY = parseInt(event.pageY * CT_CanvasCRY); //鼠标位置y
},false);
document.addEventListener("DOMMouseScroll",function(event) //监听鼠标滚轮
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
document.addEventListener("mousewheel",function(event) //监听鼠标滚轮(chrome /safari /other)
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
document.addEventListener("keypress",function(event) //监听按键输入
{
    if(event.which !== 0) //如果字码不为0
    {
        CT_KeyChar = String.fromCharCode(event.which); //当前按键输入的字符
    }
    if(event.which === 8) //如果字码为8
    {
        CT_KeyChar = "_BACK"; //输入退格
    }
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
    var i = 0;
    for(i;i<touches_l;i++) //遍历触摸列表
    {
        var touch_id = event.touches[i].identifier; //当前触摸点id
        var touch_x = event.touches[i].pageX; //当前触摸点位置x
        var touch_y = event.touches[i].pageY; //当前触摸点位置y
        CT_TouchKeyList[touch_id] = [touch_x,touch_y]; //将当前触摸点存入触摸键列表
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
    var i = 0;
    for(i;i<changed_l;i++) //遍历触摸列表
    {
        var touch_id = event.changedTouches[i].identifier; //当前触摸点id
        CT_TouchKeyList[touch_id] = [-1,-1]; //在触摸键列表中将当前触摸点标记为松开
    }
},false);
document.addEventListener("touchmove",function(event) //监听触摸点移动
{
    var toulist_e = event.changedTouches.length - 1; //当前触摸点索引
    var changed_l = event.changedTouches.length; //changedTouches length
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
    var i = 0;
    for(i;i<changed_l;i++) //遍历触摸列表
    {
        var touch_id = event.changedTouches[i].identifier; //当前触摸点id
        var touch_x = event.changedTouches[i].pageX; //当前触摸点位置x
        var touch_y = event.changedTouches[i].pageY; //当前触摸点位置y
        CT_TouchKeyList[touch_id] = [touch_x,touch_y]; //将当前触摸点存入触摸键列表
    }
},false);
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 触摸键运行
//--------------------------------------------------------------------
function CT_TouchKeyRun()
{
    var i;
    for(i=0;i<CT_ContainerTouchIndex;i++) //遍历触摸键容器
    {
        if(CT_ContainerTouchKey[i] != null) //如果当前触摸键不为空
        {
            var toukey_x = CT_ContainerTouchKey[i][0]; //当前触摸键位置x
            var toukey_y = CT_ContainerTouchKey[i][1]; //当前触摸键位置y
            var toukey_w = CT_ContainerTouchKey[i][2]; //当前触摸键宽度
            var toukey_h = CT_ContainerTouchKey[i][3]; //当前触摸键高度
            var toukey_k = CT_ContainerTouchKey[i][4]; //当前触摸键键值
            var i2;
            var press = 0;
            for(i2=0;i2<32;i2++) //遍历触摸列表
            {
                if(CT_TouchKeyList[i2] != null)
                {
                    var tou_x = parseInt(CT_TouchKeyList[i2][0] * CT_CanvasCRX); //当前触摸点位置x
                    var tou_y = parseInt(CT_TouchKeyList[i2][1] * CT_CanvasCRY); //当前触摸点位置y
                    if(tou_x >= toukey_x && tou_y >= toukey_y && tou_x <= toukey_x + toukey_w && tou_y <= toukey_y + toukey_h) //如果当前触摸点在当前触摸键内
                    {
                        press = 1;
                        CT_ContainerTouchKey[i][6] = 1; //将当前触摸键状态标记为已按下
                        CT_ContainerKeyState[toukey_k] = 1; //将按键状态容器中按下的键标记为1
                        if(CT_ContainerKeyDownBreak[toukey_k] !== 1) //如果按键中断容器中按下的键不为1
                        {
                            CT_ContainerKeyDown[toukey_k] = 1; //将按键按下容器中按下的键标记为1
                            CT_ContainerKeyDownBreak[toukey_k] = 1; //将按键中断容器中按下的键标记为1
                        }
                    }
                }
            }
            if(press === 0) //如果当前触摸键未被触摸
            {
                var tk_state = CT_ContainerTouchKey[i][6]; //获取当前触摸键状态
                if(tk_state === 1) //如果当前触摸键已按下
                {
                    CT_ContainerKeyState[toukey_k] = 0; //将按键状态容器中松开的键标记为0
                    CT_ContainerKeyDownBreak[toukey_k] = 0; //将按键中断容器中松开的键标记为0
                    CT_ContainerKeyUp[toukey_k] = 1; //将按键松开容器中松开的键标记为1
                    CT_ContainerTouchKey[i][6] = 0; //将当前触摸键状态标记为未按下
                }
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 渲染触摸键图片
//--------------------------------------------------------------------
function CT_TouchKeyRender()
{
    if(CT_ContainerTouchIndex !== 0) //如果触摸键容器长度不为0
    {
        var i;
        for(i=0;i<CT_ContainerTouchIndex;i++) //遍历触摸键容器
        {
            if(CT_ContainerTouchKey[i] != null) //如果当前触摸键不为空
            {
                var tx = CT_ContainerTouchKey[i][0]; //当前触摸键位置x
                var ty = CT_ContainerTouchKey[i][1]; //当前触摸键位置y
                var ti = CT_ContainerTouchKey[i][5]; //当前触摸键图像
                CT_BufferImage(tx,ty,ti); //绘制触摸键图像
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
    CT_ContainerKeyDown = []; //重置按键按下容器
    CT_ContainerKeyUp = []; //重置按键松开容器
    CT_ContainerMKeyDown = []; //重置鼠标按键按下容器
    CT_ContainerMKeyUp = []; //重置鼠标按键松开容器
    CT_ContainerMWheel = []; //重置鼠标滚轮容器
    CT_KeyChar = ""; //重置按键字符
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 按键字符
//--------------------------------------------------------------------
function CT_KeyboardChar()
{
    var ret = CT_KeyChar; //当前按键字符
    CT_KeyChar = "";
    return ret;
}
//--------------------------------------------------------------------