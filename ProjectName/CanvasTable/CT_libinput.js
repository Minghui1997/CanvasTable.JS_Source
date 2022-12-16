"use strict";

//--------------------------------------------------------------------
// 按键键值
//--------------------------------------------------------------------
var key_a = 65;
var key_b = 66;
var key_c = 67;
var key_d = 68;
var key_e = 69;
var key_f = 70;
var key_g = 71;
var key_h = 72;
var key_i = 73;
var key_j = 74;
var key_k = 75;
var key_l = 76;
var key_m = 77;
var key_n = 78;
var key_o = 79;
var key_p = 80;
var key_q = 81;
var key_r = 82;
var key_s = 83;
var key_t = 84;
var key_u = 85;
var key_v = 86;
var key_w = 87;
var key_x = 88;
var key_y = 89;
var key_z = 90;
var key_1 = 49;
var key_2 = 50;
var key_3 = 51;
var key_4 = 52;
var key_5 = 53;
var key_6 = 54;
var key_7 = 55;
var key_8 = 56;
var key_9 = 57;
var key_0 = 48;
var key_f1 = 112;
var key_f2 = 113;
var key_f3 = 114;
var key_f4 = 115;
var key_f5 = 116;
var key_f6 = 117;
var key_f7 = 118;
var key_f8 = 119;
var key_f9 = 120;
var key_f10 = 121;
var key_f11 = 122;
var key_f12 = 123;
var key_up = 38;
var key_down = 40;
var key_left = 37;
var key_right = 39;
var key_esc = 27;
var key_tab = 9;
var key_cap = 20;
var key_shift = 16;
var key_ctrl = 17;
var key_alt = 18;
var key_space = 32;
var key_enter = 13;
var key_back = 8;
var key_num1 = 97;
var key_num2 = 98;
var key_num3 = 99;
var key_num4 = 100;
var key_num5 = 101;
var key_num6 = 102;
var key_num7 = 103;
var key_num8 = 104;
var key_num9 = 105;
var key_num0 = 96;
var mkey_left = 0;
var mkey_middle = 1;
var mkey_right = 2;
var mkey_up = 0;
var mkey_down = 1;
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 按键按住检查
//--------------------------------------------------------------------
function keyboard_press(key)
{
    if(key >= 0 && key <= 255) //如果按键键值在范围内
    {
        if(CT_ContainerKeyState[key] === 1) //如果按键状态容器中指定的按键标记为1
        {
            return 1;
	}
    }
    else //如果按键键值不在范围内
    {
        cprint("ERROR 7 : Key value beyond range. KeyCode : " + String(key));
    }
    return 0;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 按键按下检查
//--------------------------------------------------------------------
function keyboard_down(key)
{
    if(key >= 0 && key <= 255) //如果按键键值在范围内
    {
        if(CT_ContainerKeyDown[key] === 1)  //如果按键按下容器中指定的按键标记为1
        {
    	    return 1;
        }
    }
    else //如果按键键值不在范围内
    {
        cprint("ERROR 7 : Key value beyond range. KeyCode : " + String(key));
    }
    return 0;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 按键松开检查
//--------------------------------------------------------------------
function keyboard_up(key)
{
    if(key >= 0 && key <= 255) //如果按键键值在范围内
    {
        if(CT_ContainerKeyUp[key] === 1) //如果按键松开状态容器中指定的按键标记为1
        {
    	    return 1;
        }
    }
    else //如果按键键值不在范围内
    {
        cprint("ERROR 7 : Key value beyond range. KeyCode : " + String(key));
    }
    return 0;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 鼠标按住检查
//--------------------------------------------------------------------
function mouse_press(mkey)
{
    if(mkey >= 0 && mkey <= 2) //如果鼠标键值在范围内
    {
        if(CT_ContainerMKeyState[mkey] === 1) //如果鼠标按键状态容器中指定的按键标记为1
        {
            return 1;
        }
    }
    else //如果鼠标键值不在范围内
    {
        cprint("ERROR 8 : Mouse key value beyond range. KeyCode : " + String(mkey));
    }
    return 0;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 鼠标按下检查
//--------------------------------------------------------------------
function mouse_down(mkey)
{
    if(mkey >= 0 && mkey <= 2) //如果鼠标键值在范围内
    {
        if(CT_ContainerMKeyDown[mkey] === 1) //如果鼠标按键按下容器中指定的按键标记为1
        {
    	    return 1;
        }
    }
    else //如果鼠标键值不在范围内
    {
        cprint("ERROR 8 : Mouse key value beyond range. KeyCode : " + String(mkey));
    }
    return 0;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 鼠标松开检查
//--------------------------------------------------------------------
function mouse_up(mkey)
{
    if(mkey >= 0 && mkey <= 2) //如果鼠标键值在范围内
    {
        if(CT_ContainerMKeyUp[mkey] === 1) //如果鼠标按键松开容器中指定的按键标记为1
        {
    	    return 1;
        }
    }
    else //如果鼠标键值不在范围内
    {
        cprint("ERROR 8 : Mouse key value beyond range. KeyCode : " + String(mkey));
    }
    return 0;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 鼠标位置x
//--------------------------------------------------------------------
function mouse_x()
{
    if(CT_MousePosX > CT_CanvasW) //如果鼠标位置x大于画布宽度
    {
        CT_MousePosX = CT_CanvasW; //鼠标位置x等于画布宽度
    }
    return CT_MousePosX; //返回鼠标位置x
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 鼠标位置y
//--------------------------------------------------------------------
function mouse_y()
{
    if(CT_MousePosY > CT_CanvasH) //如果鼠标位置y大于画布高度
    {
        CT_MousePosY = CT_CanvasH; //鼠标位置y等于画布高度
    }
    return CT_MousePosY; //返回鼠标位置y
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 鼠标滚轮检查
//--------------------------------------------------------------------
function mouse_wheel(mkey)
{
    if(mkey === 0 || mkey === 1) //如果鼠标滚轮参数正确
    {
        if(CT_ContainerMWheel[mkey] === 1) //如果鼠标滚轮容器中指定的滚动标记为1
        {
    	    return 1;
        }
    }
    else //如果鼠标滚轮参数不正确
    {
        cprint("ERROR 9 : The mouse wheel direction is error. KeyCode : " + String(mkey));
    }
    return 0;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 创建触摸按键
//--------------------------------------------------------------------
function touchkey_create(id,x,y,w,h,key)
{
    if(CT_ContainerTouchKey[id] == null) //如果触摸键容器指定索引为空
    {
        if(w > 0 && h > 0) //如果触摸键宽高大于0
        {
            if(key >= 0 && key <= 255) //如果按键键值在范围内
            {
                CT_ContainerTouchKey[id] = [x,y,w,h,key,-1]; //将触摸键数据存入触摸键容器指定索引中
            }
            else //如果按键键值不在范围内
            {
                cprint("ERROR 7 : Key value beyond range. KeyCode : " + String(key));
            }
        }
        else
        {
            cprint("ERROR 17 : Unable to create TouchKey. TouchKeyID : " + String(id));
        }
    }
    else //如果触摸键容器指定索引不为空
    {
        cprint("ERROR 16 : TouchKey have been created. TouchKeyID : " + String(id));
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 删除触摸按键
//--------------------------------------------------------------------
function touchkey_delete(id)
{
    if(CT_ContainerTouchKey[id] != null) //如果触摸键容器指定索引不为空
    {
        if(CT_ContainerTouchKey[id][5] !== -1)
        {
            CT_InterfaceRepaint(); //请求重绘
        }
        CT_ContainerTouchKey[id] = null; //清除触摸键数据
    }
    else //如果触摸键容器指定索引为空
    {
        cprint("ERROR 18 : The TouchKey is not created. TouchKeyID : " + String(id));
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 触摸按键图片
//--------------------------------------------------------------------
function touchkey_image(id,img)
{
    if(CT_ContainerTouchKey[id] != null) //如果触摸键容器指定索引不为空
    {
        CT_ContainerTouchKey[id][5] = img; //设置触摸键图像
        CT_InterfaceRepaint(); //请求重绘
    }
}
//--------------------------------------------------------------------