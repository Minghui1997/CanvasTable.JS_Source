"use strict";

//--------------------------------------------------------------------
// 窗口对象
//--------------------------------------------------------------------
function CTwindow()
{
    this.x = 0; //窗口位置x
    this.y = 0; //窗口位置y
    this.width = 300; //窗口宽度
    this.height = 200; //窗口高度
    this.color_background = color(228,226,211,255); //窗口背景颜色
    this.color_borderUp = color(170,168,153,255); //窗口上边框颜色
    this.color_borderDown = color(170,168,153,255); //窗口下边框颜色
    this.color_borderLeft = color(170,168,153,255); //窗口左边框颜色
    this.color_borderRight = color(170,168,153,255); //窗口右边框颜色
    this.image = -1; //窗口背景图像
    this.image_o = 0; //窗口背景图像偏移
    this.layer = 0; //窗口层
//--------------------------------------------------------------------
    this.type = 0; //ui对象类型
    this.index = -1; //窗口索引
    this.id = CT_UIGetId(); //ID
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 按钮
//--------------------------------------------------------------------
function CTbutton()
{
    this.x = 0; //按钮位置x
    this.y = 0; //按钮位置y
    this.width = 60; //按钮宽度
    this.height = 30; //按钮高度
    this.color_background = color(203,201,183,255); //按钮背景颜色
    this.color_borderUp = color(181,179,162,255); //按钮上边框颜色
    this.color_borderDown = color(181,179,162,255); //按钮下边框颜色
    this.color_borderLeft = color(181,179,162,255); //按钮左边框颜色
    this.color_borderRight = color(181,179,162,255); //按钮右边框颜色
    this.background = -1; //按钮背景图像
    this.background_o = 0; //按钮背景图像偏移
    this.color_text = color(0,0,0,255); //按钮文本颜色
    this.text = "Button"; //按钮显示文本
    this.size = 16; //字体大小
//--------------------------------------------------------------------
    this.index = -1; //ui对象索引
    this.type = 1; //ui对象类型
    this.id = CT_UIGetId(); //ID
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 文本
//--------------------------------------------------------------------
function CTtext()
{
    this.x = 0; //文本位置x
    this.y = 0; //文本位置y
    this.color_text = color(0,0,0,255); //文本颜色
    this.text = "Text"; //显示文本
    this.size = 16; //字体大小
//--------------------------------------------------------------------
    this.index = -1; //ui对象索引
    this.type = 2; //ui对象类型
    this.id = CT_UIGetId(); //ID
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 复选框
//--------------------------------------------------------------------
function CTcheckbox()
{
    this.x = 0; //复选框位置x
    this.y = 0; //复选框位置y
    this.color_border = color(181,179,162,255); //复选框边框颜色
    this.color_background = color(255,255,255,255); //复选框背景颜色
    this.color_widget = color(34,172,56,255); //复选框部件颜色
    this.status = 0; //复选框状态
//--------------------------------------------------------------------
    this.index = -1; //ui对象索引
    this.type = 3; //ui对象类型
    this.id = CT_UIGetId(); //ID
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 单选框
//--------------------------------------------------------------------
function CTradio()
{
    this.x = 0; //单选框位置x
    this.y = 0; //单选框位置y
    this.color_background = color(255,255,255,255); //单选框背景颜色
    this.color_border = color(181,179,162,255); //单选框边框颜色
    this.color_widget = color(34,172,56,255); //单选框部件颜色
    this.group = 0; //单选框组
//--------------------------------------------------------------------
    this.index = -1; //ui对象索引
    this.type = 4; //ui对象类型
    this.id = CT_UIGetId(); //ID
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 进度条
//--------------------------------------------------------------------
function CTprogressbar()
{
    this.x = 0; //进度条位置x
    this.y = 0; //进度条位置y
    this.width = 80; //进度条宽度
    this.height = 30; //进度条高度
    this.color_background = color(255,255,255,255); //进度条背景颜色
    this.color_borderUp = color(181,179,162,255); //进度条上边框颜色
    this.color_borderDown = color(181,179,162,255); //进度条下边框颜色
    this.color_borderLeft = color(181,179,162,255); //进度条左边框颜色
    this.color_borderRight = color(181,179,162,255); //进度条右边框颜色
    this.color_widget = color(34,172,56,255); //进度条部件颜色
    this.background = -1; //进度条背景图片
    this.background_o = 0; //进度条背景图像偏移
    this.value = 0; //进度条默认值
    this.maxvalue = 10; //进度条最大值
//--------------------------------------------------------------------
    this.index = -1; //ui对象索引
    this.type = 5; //ui对象类型
    this.id = CT_UIGetId(); //ID
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 文本框
//--------------------------------------------------------------------
function CTtextbox()
{
    this.x = 0; //文本框位置x
    this.y = 0; //文本框位置y
    this.width = 250; //文本框宽度
    this.height = 30; //文本框高度
    this.color_background = color(255,255,255,255); //文本框背景颜色
    this.color_borderUp = color(181,179,162,255); //文本框上边框颜色
    this.color_borderDown = color(181,179,162,255); //文本框下边框颜色
    this.color_borderLeft = color(181,179,162,255); //文本框左边框颜色
    this.color_borderRight = color(181,179,162,255); //文本框右边框颜色
    this.color_text = "#000000"; //文本框字体颜色
    this.background = -1; //文本框背景图片
    this.background_o = 0; //文本框背景图像偏移
    this.password = 0; //密码文本框
    this.number = 0; //数字文本框
    this.max = 20; //文本框最大字符数
    this.readonly = 0; //只读
    this.subbox = 0; //子文本框
    this.name = "Title"; //子文本框名称
    this.size = 16; //字体大小
//--------------------------------------------------------------------
    this.index = -1; //ui对象索引
    this.type = 6; //ui对象类型
    this.id = CT_UIGetId(); //ID
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 创建窗口
//--------------------------------------------------------------------
function CTwindow_create(CTwindow)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTwindow.type === 0) //如果对象类型是窗口
        {
            var id = CTwindow.id; //窗口对象ID
            var i;
            for(i=0;i<CT_ContainerWindowLength;i++) //遍历窗口容器
            {
                if(CT_ContainerWindow[i] != null) //如果当前窗口不为空
                {
                    var win_id = CT_ContainerWindow[i][0]; //当前窗口ID
                    if(win_id === id) //如果当前窗口ID等于窗口ID
                    {
                        cprint("ERROR : Window have been created."); //输出错误
                        return; //中断
                    }
                }
            }
            var x = CTwindow.x; //窗口对象位置x
            var y = CTwindow.y; //窗口对象位置y
            var w = CTwindow.width; //窗口对象宽度
            var h = CTwindow.height; //窗口对象高度
            var l = CTwindow.layer; //窗口对象层
            var cbg = CTwindow.color_background; //窗口对象背景颜色
            var cbu = CTwindow.color_borderUp; //窗口对象上边框颜色
            var cbd = CTwindow.color_borderDown; //窗口对象下边框颜色
            var cbl = CTwindow.color_borderLeft; //窗口对象左边框颜色
            var cbr = CTwindow.color_borderRight; //窗口对象右边框颜色
            var bi = CTwindow.image; //窗口对象背景图像
            var bio = CTwindow.image_o; //窗口对象背景图像偏移
            if(bi !== -1) //如果有背景图像
            {
                var res_type = CT_ResourceList[bi][1]; //获取资源类型
                if(res_type !== 0) //如果资源类型不是图像
                {
                    bi = -1; //窗口无背景图像
                    cprint("ERROR : The resource index corresponding to the resource file is not a image.");
                }
            }
            if(w > 0 && h > 0) //如果窗口对象属性正确
            {
                var i2;
                for(i2=0;i2<CT_ContainerWindowLength;i2++) //遍历窗口容器
                {
                    if(CT_ContainerWindow[i2] == null) //如果当前窗口为空
                    {
                        CT_ContainerWindow[i2] = [id,l,x,y,w,h,cbg,cbu,cbd,cbl,cbr,bi,bio]; //将窗口数据写入窗口容器
                        CTwindow.index = i2; //窗口对象索引
                        CT_Repaint = 1; //请求重绘
                        return; //中断
                    }
                }
                CT_ContainerWindow[CT_ContainerWindowLength] = [id,l,x,y,w,h,cbg,cbu,cbd,cbl,cbr,bi,bio]; //将窗口数据写入窗口容器
                CTwindow.index = CT_ContainerWindowLength; //窗口对象索引
                CT_ContainerWindowLength ++; //窗口容器索引 +1
                CT_Repaint = 1; //请求重绘
            }
            else
            {
                cprint("ERROR : Unable to create window."); //输出错误
            }
        }
        else
        {
            cprint("ERROR : Not is window object."); //输出错误
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 销毁窗口
//--------------------------------------------------------------------
function CTwindow_destroy(CTwindow)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTwindow.type === 0) //如果对象类型是窗口
        {
            if(CT_ContainerWindow[CTwindow.index] != null) //如果窗口容器中指定窗口对象数据不为空
            {
                var Cwin_id = CT_ContainerWindow[CTwindow.index][0]; //窗口容器中指定窗口对象的ID
                if(CTwindow.id === Cwin_id) //如果窗口对象id等于容器中指定窗口对象的ID
                {
                    CT_ContainerWindow[CTwindow.index] = null; //清空窗口对象容器中窗口对象的数据
                    var i;
                    for(i=0;i<CT_ContainerUILength;i++) //遍历UI对象容器
                    {
                        if(CT_ContainerUI[i] != null) //如果当前UI对象不为空
                        {
                            var ui_win_index = CT_ContainerUI[i][1]; //当前UI对象对应窗口的索引
                            if(ui_win_index === CTwindow.index) //如果当前UI对象对应窗口的索引等于窗口对象索引
                            {
                                CT_ContainerUI[i] = null; //清空UI对象容器中UI对象的数据
                            }
                        }
                    }
                    CT_Repaint = 1; //请求重绘
                }
            }
        }
        else
        {
            cprint("ERROR : Not is window object."); //输出错误
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置窗口位置x
//--------------------------------------------------------------------
function CTwindow_set_x(CTwindow,x)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTwindow.type === 0) //如果UI对象是窗口
        {
            if(CT_ContainerWindow[CTwindow.index] != null) //如果窗口容器中指定窗口对象数据不为空
            {
                var Cwin_id = CT_ContainerWindow[CTwindow.index][0]; //窗口容器中指定窗口对象的ID
                if(CTwindow.id === Cwin_id) //如果窗口对象id等于容器中指定窗口对象的ID
                {
                    CT_ContainerWindow[CTwindow.index][2] = x; //设置窗口位置x
                    CT_Repaint = 1; //请求重绘
                }
            }
        }
        else
        {
            cprint("ERROR : Not is window object.");
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置窗口位置y
//--------------------------------------------------------------------
function CTwindow_set_y(CTwindow,y)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTwindow.type === 0) //如果UI对象是窗口
        {
            if(CT_ContainerWindow[CTwindow.index] != null) //如果窗口容器中指定窗口对象数据不为空
            {
                var Cwin_id = CT_ContainerWindow[CTwindow.index][0]; //窗口容器中指定窗口对象的ID
                if(CTwindow.id === Cwin_id) //如果窗口对象id等于容器中指定窗口对象的ID
                {
                    CT_ContainerWindow[CTwindow.index][3] = y; //设置窗口位置x
                    CT_Repaint = 1; //请求重绘
                }
            }
        }
        else
        {
            cprint("ERROR : Not is window object.");
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置窗口宽度
//--------------------------------------------------------------------
function CTwindow_set_width(CTwindow,w)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTwindow.type === 0) //如果UI对象是窗口
        {
            if(CT_ContainerWindow[CTwindow.index] != null) //如果窗口容器中指定窗口对象数据不为空
            {
                var Cwin_id = CT_ContainerWindow[CTwindow.index][0]; //窗口容器中指定窗口对象的ID
                if(CTwindow.id === Cwin_id) //如果窗口对象id等于容器中指定窗口对象的ID
                {
                    CT_ContainerWindow[CTwindow.index][4] = w; //设置窗口位置x
                    CT_Repaint = 1; //请求重绘
                }
            }
        }
        else
        {
            cprint("ERROR : Not is window object.");
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置窗口高度
//--------------------------------------------------------------------
function CTwindow_set_height(CTwindow,h)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTwindow.type === 0) //如果UI对象是窗口
        {
            if(CT_ContainerWindow[CTwindow.index] != null) //如果窗口容器中指定窗口对象数据不为空
            {
                var Cwin_id = CT_ContainerWindow[CTwindow.index][0]; //窗口容器中指定窗口对象的ID
                if(CTwindow.id === Cwin_id) //如果窗口对象id等于容器中指定窗口对象的ID
                {
                    CT_ContainerWindow[CTwindow.index][5] = h; //设置窗口位置x
                    CT_Repaint = 1; //请求重绘
                }
            }
        }
        else
        {
            cprint("ERROR : Not is window object.");
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置窗口背景图片
//--------------------------------------------------------------------
function CTwindow_set_image(CTwindow,i)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTwindow.type === 0) //如果UI对象是窗口
        {
            if(CT_ContainerWindow[CTwindow.index] != null) //如果窗口容器中指定窗口对象数据不为空
            {
                var Cwin_id = CT_ContainerWindow[CTwindow.index][0]; //窗口容器中指定窗口对象的ID
                if(CTwindow.id === Cwin_id) //如果窗口对象id等于容器中指定窗口对象的ID
                {
                    if(i !== -1) //如果有背景图像
                    {
                        var res_type = CT_ResourceList[i][1]; //获取资源类型
                        if(res_type === 0) //如果资源类型是图像
                        {
                            CT_ContainerWindow[CTwindow.index][11] = i; //设置背景图像
                            CT_Repaint = 1; //请求重绘
                        }
                        else
                        {
                            cprint("ERROR : The resource index corresponding to the resource file is not a image.");
                        }
                    }
                    else
                    {
                        CT_ContainerWindow[CTwindow.index][11] = i; //设置背景图像
                        CT_Repaint = 1; //请求重绘
                    }
                }
            }
        }
        else
        {
            cprint("ERROR : Not is window object.");
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置窗口颜色
//--------------------------------------------------------------------
function CTwindow_set_color(CTwindow,prop,col)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTwindow.type === 0) //如果UI对象是窗口
        {
            if(CT_ContainerWindow[CTwindow.index] != null) //如果窗口容器中指定窗口对象数据不为空
            {
                var Cwin_id = CT_ContainerWindow[CTwindow.index][0]; //窗口容器中指定窗口对象的ID
                if(CTwindow.id === Cwin_id) //如果窗口对象id等于容器中指定窗口对象的ID
                {
                    if(prop === "back") //如果属性是背景
                    {
                        CT_ContainerWindow[CTwindow.index][6] = col; //设置窗口背景颜色
                        CT_Repaint = 1; //请求重绘
                    }
                    if(prop === "up") //如果属性是上边框
                    {
                        CT_ContainerWindow[CTwindow.index][7] = col; //设置窗口上边框颜色
                        CT_Repaint = 1; //请求重绘
                    }
                    if(prop === "down") //如果属性是下边框
                    {
                        CT_ContainerWindow[CTwindow.index][8] = col; //设置窗口下边框颜色
                        CT_Repaint = 1; //请求重绘
                    }
                    if(prop === "left") //如果属性是左边框
                    {
                        CT_ContainerWindow[CTwindow.index][9] = col; //设置窗口左边框颜色
                        CT_Repaint = 1; //请求重绘
                    }
                    if(prop === "right") //如果属性是右边框
                    {
                        CT_ContainerWindow[CTwindow.index][10] = col; //设置窗口右边框颜色
                        CT_Repaint = 1; //请求重绘
                    }
                }
            }
        }
        else
        {
            cprint("ERROR : Not is window object.");
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 创建UI对象
//--------------------------------------------------------------------
function CTui_create(CTwindow,CTui)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTwindow.type === 0) //如果对象类型是窗口
        {
            var id = CTui.id; //UI对象ID
            var i;
            for(i=0;i<CT_ContainerUILength;i++) //遍历UI容器
            {
                if(CT_ContainerUI[i] != null) //如果当前UI对象不为空
                {
                    var ui_id = CT_ContainerUI[i][0]; //当前UI对象的ID
                    if(ui_id === id) //如果当前UI对象的ID等于UI对象ID
                    {
                        cprint("ERROR : The UI object has been created."); //输出错误
                        return; //中断
                    }
                }
            }
            var win_index = CTwindow.index; //窗口对象索引
            var type = CTui.type; //UI对象类型
            if(type === 1) //如果UI是按钮
            {
                var x = CTui.x; //按钮位置x
                var y = CTui.y; //按钮位置y
                var w = CTui.width; //按钮宽度
                var h = CTui.height; //按钮高度
                var cbg = CTui.color_background; //按钮背景颜色
                var cbu = CTui.color_borderUp; //按钮上边框颜色
                var cbd = CTui.color_borderDown; //按钮下边框颜色
                var cbl = CTui.color_borderLeft; //按钮左边框颜色
                var cbr = CTui.color_borderRight; //按钮右边框颜色
                var ct = CTui.color_text; //按钮文本颜色
                var bi = CTui.background; //按钮背景图片
                var bio = CTui.background_o; //按钮背景图像偏移
                var text = CTui.text; //按钮显示文本
                var text_w = string_pxwidth(text,CTui.size); //按钮显示文本像素宽度
                var text_h = CTui.size; //按钮显示文本高度
                if(bi !== -1) //如果有背景图像
                {
                    var res_type = CT_ResourceList[bi][1]; //获取资源类型
                    if(res_type !== 0) //如果资源类型不是图像
                    {
                        bi = -1; //窗口无背景图像
                        cprint("ERROR : The resource index corresponding to the resource file is not a image.");
                    }
                }
                if(w > 0 && h > 0) //如果按钮属性正确
                {
                    var i2;
                    for(i2=0;i2<CT_ContainerUILength;i2++) //遍历UI容器
                    {
                        if(CT_ContainerUI[i2] == null) //如果当前UI为空
                        {
                            CT_ContainerUI[i2] = [id,win_index,type,x,y,w,h,cbg,cbu,cbd,cbl,cbr,ct,bi,text,text_w,text_h,0,0,0,0,bio]; //将UI数据写入UI容器
                            CTui.index = i2; //UI对象索引
                            CT_Repaint = 1; //请求重绘
                            return; //中断
                        }
                    }
                    CT_ContainerUI[CT_ContainerUILength] = [id,win_index,type,x,y,w,h,cbg,cbu,cbd,cbl,cbr,ct,bi,text,text_w,text_h,0,0,0,0,bio]; //将UI数据写入UI容器
                    CTui.index = CT_ContainerUILength; //UI对象索引
                    CT_ContainerUILength ++; //UI容器索引 +1
                    CT_Repaint = 1; //请求重绘
                }
                else
                {
                    cprint("ERROR : Unable to create button."); //输出错误
                }
            }
            if(type === 2) //如果UI是文本
            {
                var x = CTui.x; //文本位置x
                var y = CTui.y; //文本位置y
                var ct = CTui.color_text; //文本颜色
                var text = CTui.text; //文本
                var ts = CTui.size; //文本字体大小
                var id = CTui.id; //文本对象ID
                var i2;
                for(i2=0;i2<CT_ContainerUILength;i2++) //遍历UI容器
                {
                    if(CT_ContainerUI[i2] == null) //如果当前UI为空
                    {
                        CT_ContainerUI[i2] = [id,win_index,type,x,y,ct,text,ts]; //将UI数据写入UI容器
                        CTui.index = i2; //UI对象索引
                        CT_Repaint = 1; //请求重绘
                        return; //中断
                    }
                }
                CT_ContainerUI[CT_ContainerUILength] = [id,win_index,type,x,y,ct,text,ts]; //将UI数据写入UI容器
                CTui.index = CT_ContainerUILength; //UI对象索引
                CT_ContainerUILength ++; //UI容器索引 +1
                CT_Repaint = 1; //请求重绘
            }
            if(type === 3) //如果UI是复选框
            {
                var x = CTui.x; //复选框位置x
                var y = CTui.y; //复选框位置y
                var w = 16; //复选框宽度
                var h = 16; //复选框高度
                var cbg = CTui.color_background; //复选框背景颜色
                var cb = CTui.color_border; //复选框边框颜色
                var cw = CTui.color_widget; //复选框部件颜色
                var id = CTui.id; //复选框对象ID
                var status = CTui.status; //复选框状态
                if(status === 0 || status === 1) //如果复选框属性正确
                {
                    var i2;
                    for(i2=0;i2<CT_ContainerUILength;i2++) //遍历UI容器
                    {
                        if(CT_ContainerUI[i2] == null) //如果当前UI为空
                        {
                            CT_ContainerUI[i2] = [id,win_index,type,x,y,w,h,cbg,cb,cw,status]; //将UI数据写入UI容器
                            CTui.index = i2; //UI对象索引
                            CT_Repaint = 1; //请求重绘
                            return; //中断
                        }
                    }
                    CT_ContainerUI[CT_ContainerUILength] = [id,win_index,type,x,y,w,h,cbg,cb,cw,status]; //将UI数据写入UI容器
                    CTui.index = CT_ContainerUILength; //UI对象索引
                    CT_ContainerUILength ++; //UI容器索引 +1
                    CT_Repaint = 1; //请求重绘
                }
                else
                {
                    cprint("ERROR : Checkbox state error.");
                }
            }
            if(type === 4) //如果UI是单选框
            {
                var x = CTui.x; //单选框位置x
                var y = CTui.y; //单选框位置y
                var w = 16; //单选框宽度
                var h = 16; //单选框高度
                var cbg = CTui.color_background; //单选框背景颜色
                var cb = CTui.color_border; //单选框边框颜色
                var cw = CTui.color_widget; //单选框部件颜色
                var g = CTui.group; //单选框组
                var id = CTui.id; //单选框对象ID
                if(g >= 0) //如果单选框组有效
                {
                    var i2;
                    for(i2=0;i2<CT_ContainerUILength;i2++) //遍历UI容器
                    {
                        if(CT_ContainerUI[i2] == null) //如果当前UI为空
                        {
                            CT_ContainerUI[i2] = [id,win_index,type,x,y,w,h,cbg,cb,cw,g,0]; //将UI数据写入UI容器
                            CTui.index = i2; //UI对象索引
                            var i3;
                            var radio_first = -1; //单选框组中的第一个单选框索引
                            var radio_sel = 0; //单选框组中的选择的单选框索引
                            for(i3=0;i3<CT_ContainerUILength;i3++) //遍历UI容器
                            {
                                if(CT_ContainerUI[i3] != null) //如果当前UI对象不为空
                                {
                                    var ui_type = CT_ContainerUI[i3][2]; //当前UI类型
                                    if(ui_type === 4) //如果当前UI是单选框
                                    {
                                        var radio_g = CT_ContainerUI[i3][10]; //当前单选框组
                                        if(radio_g === g) //如果当前单选框组等于单选框组
                                        {
                                            if(radio_first === -1) //如果没有确定单选框组中的第一个单选框索引
                                            {
                                                radio_first = i3; //确定单选框组中的第一个单选框索引
                                            }
                                            var radio_s = CT_ContainerUI[i3][11]; //当前单选框状态
                                            if(radio_s === 1) //如果当前单选框已选择
                                            {
                                                radio_sel = 1; //单选框组中的选择的单选框索引
                                            }
                                        }
                                    }
                                }
                            }
                            if(radio_sel === 0) //如果没有单选框被选择
                            {
                                CT_ContainerUI[radio_first][11] = 1; //将单选框组中的第一个单选框设置为选择
                            }
                            CT_Repaint = 1; //请求重绘
                            return; //中断
                        }
                    }
                    CT_ContainerUI[CT_ContainerUILength] = [id,win_index,type,x,y,w,h,cbg,cb,cw,g,0]; //将UI数据写入UI容器
                    CTui.index = CT_ContainerUILength; //UI对象索引
                    CT_ContainerUILength ++; //UI容器索引 +1
                    CT_Repaint = 1; //请求重绘
                    var i3;
                    var radio_first = -1; //单选框组中的第一个单选框索引
                    var radio_sel = 0; //单选框组中的选择的单选框索引
                    for(i3=0;i3<CT_ContainerUILength;i3++) //遍历UI容器
                    {
                        if(CT_ContainerUI[i3] != null) //如果当前UI对象不为空
                        {
                            var ui_type = CT_ContainerUI[i3][2]; //当前UI类型
                            if(ui_type === 4) //如果当前UI是单选框
                            {
                                var radio_g = CT_ContainerUI[i3][10]; //当前单选框组
                                if(radio_g === g) //如果当前单选框组等于单选框组
                                {
                                    if(radio_first === -1) //如果没有确定单选框组中的第一个单选框索引
                                    {
                                        radio_first = i3; //确定单选框组中的第一个单选框索引
                                    }
                                    var radio_s = CT_ContainerUI[i3][11]; //当前单选框状态
                                    if(radio_s === 1) //如果当前单选框已选择
                                    {
                                        radio_sel = 1; //单选框组中的选择的单选框索引
                                    }
                                }
                            }
                        }
                    }
                    if(radio_sel === 0) //如果没有单选框被选择
                    {
                        CT_ContainerUI[radio_first][11] = 1; //将单选框组中的第一个单选框设置为选择
                    }
                    CT_Repaint = 1; //请求重绘
                }
                else
                {
                    cprint("ERROR : Invalid radio group.");
                }
            }
            if(type === 5) //如果UI是进度条
            {
               var x = CTui.x; //进度条位置x
                var y = CTui.y; //进度条位置y
                var w = CTui.width; //进度条宽度
                var h = CTui.height; //进度条高度
                var cbg = CTui.color_background; //进度条背景颜色
                var cbu = CTui.color_borderUp; //进度条上边框颜色
                var cbd = CTui.color_borderDown; //进度条下边框颜色
                var cbl = CTui.color_borderLeft; //进度条左边框颜色
                var cbr = CTui.color_borderRight; //进度条右边框颜色
                var cw = CTui.color_widget; //进度条部件颜色
                var pi = CTui.background; //进度条背景图片
                var pio = CTui.background_o; //进度条背景图像偏移
                var val = CTui.value; //进度条默认值
                var maxval = CTui.maxvalue; //进度条最大值
                var id = CTui.id; //进度条对象ID
                if(pi !== -1) //如果有背景图像
                {
                    var res_type = CT_ResourceList[pi][1]; //获取资源类型
                    if(res_type !== 0) //如果资源类型不是图像
                    {
                        pi = -1; //窗口无背景图像
                        cprint("ERROR : The resource index corresponding to the resource file is not a image.");
                    }
                }
                if(w > 0 && h > 0 && val >= 0 && maxval > 0 && val <= maxval) //如果进度条属性正确
                {
                    var w_w = parseInt((w - 8) / maxval * val); //进度条点宽度
                    var i2;
                    for(i2=0;i2<CT_ContainerUILength;i2++) //遍历UI容器
                    {
                        if(CT_ContainerUI[i2] == null) //如果当前UI为空
                        {
                            CT_ContainerUI[i2] = [id,win_index,type,x,y,w,h,cbg,cbu,cbd,cbl,cbr,cw,pi,w_w,val,maxval,pio]; //将UI数据写入UI容器
                            CTui.index = i2; //UI对象索引
                            CT_Repaint = 1; //请求重绘
                            return; //中断
                        }
                    }
                    CT_ContainerUI[CT_ContainerUILength] = [id,win_index,type,x,y,w,h,cbg,cbu,cbd,cbl,cbr,cw,pi,w_w,val,maxval,pio]; //将UI数据写入UI容器
                    CTui.index = CT_ContainerUILength; //UI对象索引
                    CT_ContainerUILength ++; //UI容器索引 +1
                    CT_Repaint = 1; //请求重绘
                }
                else
                {
                    cprint("ERROR : Unable to create progressbar.");
                }
            }
            if(type === 6) //如果UI是文本框
            {
                var x = CTui.x; //文本框位置x
                var y = CTui.y; //文本框位置y
                var w = CTui.width; //文本框宽度
                var h = CTui.height; //文本框高度
                var tbg = CTui.color_background; //文本框背景颜色
                var tbu = CTui.color_borderUp; //文本框上边框颜色
                var tbd = CTui.color_borderDown; //文本框下边框颜色
                var tbl = CTui.color_borderLeft; //文本框左边框颜色
                var tbr = CTui.color_borderRight; //文本框右边框颜色
                var tc = CTui.color_text; //文本框字体颜色
                var tb = CTui.background; //文本框背景图片
                var tb_o = CTui.background_o; //文本框背景图像偏移
                var tpass = CTui.password; //密码文本框参数
                var tnumb = CTui.number; //数字文本框参数
                var tmax = CTui.max; //文本框最大字符数
                var readonly = CTui.readonly; //只读参数
                var subbox = CTui.subbox; //子文本框参数
                var name = CTui.name; //子文本框名称
                var size = CTui.size; //文本框字体大小
                var id = CTui.id; //文本框id
                if(tb !== -1) //如果有背景图像
                {
                    var res_type = CT_ResourceList[tb][1]; //获取资源类型
                    if(res_type !== 0) //如果资源类型不是图像
                    {
                        tb = -1; //窗口无背景图像
                        cprint("ERROR : The resource index corresponding to the resource file is not a image.");
                    }
                }
                if(w > 0 && h > 0 && tpass >= 0 && tnumb >= 0 && tmax > 0) //如果文本框属性正确
                {
                    var i2;
                    for(i2=0;i2<CT_ContainerUILength;i2++) //遍历UI容器
                    {
                        if(CT_ContainerUI[i2] == null) //如果当前UI为空
                        {
                            CT_ContainerUI[i2] = [id,win_index,type,x,y,w,h,tbg,tbu,tbd,tbl,tbr,tc,tb,"",tpass,tnumb,tmax,readonly,subbox,name,size,tb_o]; //将UI数据写入UI容器
                            CTui.index = i2; //UI对象索引
                            CT_Repaint = 1; //请求重绘
                            return; //中断
                        }
                    }
                    CT_ContainerUI[CT_ContainerUILength] = [id,win_index,type,x,y,w,h,tbg,tbu,tbd,tbl,tbr,tc,tb,"",tpass,tnumb,tmax,readonly,subbox,name,size,tb_o]; //将UI数据写入UI容器
                    CTui.index = CT_ContainerUILength; //UI对象索引
                    CT_ContainerUILength ++; //UI容器索引 +1
                    CT_Repaint = 1; //请求重绘
                }
                else
                {
                    cprint("ERROR : Unable to create textbox.");
                }
            }
        }
        else
        {
            cprint("ERROR : Not is window object."); //输出错误
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 销毁UI
//--------------------------------------------------------------------
function CTui_destroy(CTui)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTui.type > 0) //如果是UI对象
        {
            if(CT_ContainerUI[CTui.index] != null) //如果UI容器中指定UI对象数据不为空
            {
                var Cui_id = CT_ContainerUI[CTui.index][0]; //UI容器中指定UI对象的ID
                if(CTui.id === Cui_id) //如果UI对象id等于容器中指定UI对象的ID
                {
                    CT_ContainerUI[CTui.index] = null; //清除UI容器中UI对象的数据
                    CT_Repaint = 1; //请求重绘
                }
            }
        }
        else
        {
            cprint("ERROR : Not is UI object."); //输出错误
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置UI位置x
//--------------------------------------------------------------------
function CTui_set_x(CTui,x)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTui.type >= 1) //如果对象是UI对象
        {
            if(CT_ContainerUI[CTui.index] != null) //如果UI容器中指定UI对象的数据不为空
            {
                var Cui_id = CT_ContainerUI[CTui.index][0]; //UI容器中指定UI对象的ID
                if(CTui.id === Cui_id) //如果UI对象id等于容器中指定UI对象的ID
                {
                    CT_ContainerUI[CTui.index][3] = x; //设置UI对象位置x
                    CT_Repaint = 1; //请求重绘
                }
            }
        }
        else //如果对象不是UI对象
        {
            cprint("ERROR : Not is UI object."); //输出错误
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置UI位置y
//--------------------------------------------------------------------
function CTui_set_y(CTui,y)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTui.type >= 1) //如果对象是UI对象
        {
            if(CT_ContainerUI[CTui.index] != null) //如果UI容器中指定UI对象的数据不为空
            {
                var Cui_id = CT_ContainerUI[CTui.index][0]; //UI容器中指定UI对象的ID
                if(CTui.id === Cui_id) //如果UI对象id等于容器中指定UI对象的ID
                {
                    CT_ContainerUI[CTui.index][4] = y; //设置UI对象位置x
                    CT_Repaint = 1; //请求重绘
                }
            }
        }
        else //如果对象不是UI对象
        {
            cprint("ERROR : Not is UI object."); //输出错误
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置UI宽度
//--------------------------------------------------------------------
function CTui_set_width(CTui,w)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTui.type >= 1) //如果对象是UI对象
        {
            if(CT_ContainerUI[CTui.index] != null) //如果UI容器中指定窗口对象数据不为空
            {
                var Cui_id = CT_ContainerUI[CTui.index][0]; //UI容器中指定UI对象的ID
                if(CTui.id === Cui_id) //如果UI对象id等于容器中指定UI对象的ID
                {
                    if(CTui.type === 1 || CTui.type === 6) //如果UI对象是按钮 文本框
                    {
                        CT_ContainerUI[CTui.index][5] = w; //设置宽度
                        CT_Repaint = 1; //请求重绘
                    }
                    if(CTui.type === 5) //如果UI对象是进度条
                    {
                        CT_ContainerUI[CTui.index][5] = w; //设置进度条宽度
                        var p_w = CT_ContainerUI[CTui.index][5]; //进度条宽度
                        var val = CT_ContainerUI[CTui.index][15]; //进度条值
                        var p_maxval = CT_ContainerUI[CTui.index][16]; //进度条最大值
                        var p_ww = 0; //进度条部件宽度
                        if(val < p_maxval) //如果设置的值小于最大值
                        {
                            p_ww = parseInt((p_w - 8) / p_maxval * val); //内条宽度
                        }
                        if(val === p_maxval) //如果设置的值等于最大值
                        {
                            p_ww = p_w - 8; //点宽度
                        }
                        CT_ContainerUI[CTui.index][14] = p_ww; //设置部件宽度
                        CT_Repaint = 1; //请求重绘
                    }
                    if(CTui.type === 2 || CTui.type === 3 || CTui.type === 4) //如果UI对象是文本 复选框 单选框
                    {
                        cprint("ERROR : The UI object not have this property."); //输出错误
                    }
                }
            }
        }
        else //如果对象不是UI对象
        {
            cprint("ERROR : Not is UI object."); //输出错误
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置UI高度
//--------------------------------------------------------------------
function CTui_set_height(CTui,h)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTui.type >= 1) //如果对象是UI对象
        {
            if(CT_ContainerUI[CTui.index] != null) //如果UI容器中指定窗口对象数据不为空
            {
                var Cui_id = CT_ContainerUI[CTui.index][0]; //UI容器中指定UI对象的ID
                if(CTui.id === Cui_id) //如果UI对象id等于容器中指定UI对象的ID
                {
                    if(CTui.type === 1 || CTui.type === 5 || CTui.type === 6) //如果UI对象是按钮 文本框
                    {
                        CT_ContainerUI[CTui.index][6] = h; //设置高度
                        CT_Repaint = 1; //请求重绘
                    }
                    if(CTui.type === 2 || CTui.type === 3 || CTui.type === 4) //如果UI对象是文本 复选框 单选框
                    {
                        cprint("ERROR : The UI object not have this property."); //输出错误
                    }
                }
            }
        }
        else //如果对象不是UI对象
        {
            cprint("ERROR : Not is UI object."); //输出错误
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置UI图片
//--------------------------------------------------------------------
function CTui_set_image(CTui,img)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTui.type >= 1) //如果对象是UI对象
        {
            if(CT_ContainerUI[CTui.index] != null) //如果UI容器中指定UI对象的数据不为空
            {
                var Cui_id = CT_ContainerUI[CTui.index][0]; //UI容器中指定UI对象的ID
                if(CTui.id === Cui_id) //如果UI对象id等于容器中指定UI对象的ID
                {
                    if(CTui.type === 1 || CTui.type === 5 || CTui.type === 6) //如果UI对象是按钮 进度条 文本框
                    {
                        if(img !== -1) //如果有背景图像
                        {
                            var res_type = CT_ResourceList[img][1]; //获取资源类型
                            if(res_type === 0) //如果资源类型是图像
                            {
                                CT_ContainerUI[CTui.index][13] = img; //设置背景图像
                                CT_Repaint = 1; //请求重绘
                            }
                            else
                            {
                                cprint("ERROR : The resource index corresponding to the resource file is not a image.");
                            }
                        }
                        else
                        {
                            CT_ContainerUI[CTui.index][13] = img; //设置背景图像
                            CT_Repaint = 1; //请求重绘
                        }
                    }
                    if(CTui.type === 2 || CTui.type === 3 || CTui.type === 4) //如果UI对象是文本 复选框 单选框
                    {
                        cprint("ERROR : The UI object not support background image."); //输出错误
                    }
                }
            }
        }
        else //如果对象不是UI对象
        {
            cprint("ERROR : Not is UI object."); //输出错误
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置UI颜色
//--------------------------------------------------------------------
function CTui_set_color(CTui,prop,col)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTui.type >= 1) //如果对象是UI对象
        {
            if(CT_ContainerUI[CTui.index] != null) //如果UI容器中指定UI对象的数据不为空
            {
                var Cui_id = CT_ContainerUI[CTui.index][0]; //UI容器中指定UI对象的ID
                if(CTui.id === Cui_id) //如果UI对象id等于容器中指定UI对象的ID
                {
                    if(prop === "back") //如果属性是背景
                    {
                        if(CTui.type === 1 || CTui.type === 3 || CTui.type === 4 || CTui.type === 5 || CTui.type === 6) //如果UI对象是按钮 复选框 单选框 进度条 文本框
                        {
                            CT_ContainerUI[CTui.index][7] = col; //设置背景颜色
                            CT_Repaint = 1; //请求重绘
                        }
                        if(CTui.type === 2) //如果UI对象是文本
                        {
                            cprint("ERROR : The UI object not have this property."); //输出错误
                        }
                    }
                    if(prop === "up") //如果属性是上边框
                    {
                        if(CTui.type === 1 || CTui.type === 3 || CTui.type === 4 || CTui.type === 5 || CTui.type === 6) //如果UI对象是按钮 复选框 单选框 进度条 文本框
                        {
                            CT_ContainerUI[CTui.index][8] = col; //设置上边框颜色
                            CT_Repaint = 1; //请求重绘
                        }
                        if(CTui.type === 2) //如果UI对象是文本
                        {
                           cprint("ERROR : The UI object not have this property."); //输出错误
                        }
                    }
                    if(prop === "down") //如果属性是下边框
                    {
                        if(CTui.type === 1 || CTui.type === 5 || CTui.type === 6) //如果UI对象是按钮 进度条 文本框
                        {
                            CT_ContainerUI[CTui.index][9] = col; //设置下边框颜色
                            CT_Repaint = 1; //请求重绘
                        }
                        if(CTui.type === 3 || CTui.type === 4) //如果UI对象是复选框 单选框
                        {
                            CT_ContainerUI[CTui.index][8] = col; //设置边框颜色
                            CT_Repaint = 1; //请求重绘
                        }
                        if(CTui.type === 2) //如果UI对象是文本
                        {
                            cprint("ERROR : The UI object not have this property."); //输出错误
                        }
                    }
                    if(prop === "left") //如果属性是左边框
                    {
                        if(CTui.type === 1 || CTui.type === 5 || CTui.type === 6) //如果UI对象是按钮 进度条 文本框
                        {
                            CT_ContainerUI[CTui.index][10] = col; //设置下边框颜色
                            CT_Repaint = 1; //请求重绘
                        }
                        if(CTui.type === 3 || CTui.type === 4) //如果UI对象是复选框 单选框
                        {
                            CT_ContainerUI[CTui.index][8] = col; //设置复选框边框颜色
                            CT_Repaint = 1; //请求重绘
                        }
                        if(CTui.type === 2) //如果UI对象是文本
                        {
                            cprint("ERROR : The UI object not have this property."); //输出错误
                        }
                    }
                    if(prop === "right") //如果属性是右边框
                    {
                        if(CTui.type === 1 || CTui.type === 5 || CTui.type === 6) //如果UI对象是按钮 进度条 文本框
                        {
                            CT_ContainerUI[CTui.index][11] = col; //设置下边框颜色
                            CT_Repaint = 1; //请求重绘
                        }
                        if(CTui.type === 3 || CTui.type === 4) //如果UI对象是复选框 单选框
                        {
                            CT_ContainerUI[CTui.index][8] = col; //设置边框颜色
                            CT_Repaint = 1; //请求重绘
                        }
                        if(CTui.type === 2) //如果UI对象是文本
                        {
                            cprint("ERROR : The UI object not have this property."); //输出错误
                        }
                    }
                    if(prop === "text") //如果属性是文本
                    {
                        if(CTui.type === 1 || CTui.type === 6) //如果UI对象是按钮 文本框
                        {
                            CT_ContainerUI[CTui.index][12] = col; //设置文本颜色
                        }
                        if(CTui.type === 2) //如果UI对象是文本
                        {
                            CT_ContainerUI[CTui.index][5] = col; //设置文本颜色
                        }
                        if(CTui.type === 3 || CTui.type === 4 || CTui.type === 5)
                        {
                            cprint("ERROR : The UI object not have this property."); //输出错误
                        }
                    }
                    if(prop === "widget") //如果属性是部件
                    {
                        if(CTui.type === 3 || CTui.type === 4) //如果UI对象是复选框 单选框
                        {
                            CT_ContainerUI[CTui.index][9] = col; //设置部件颜色
                        }
                        if(CTui.type === 5) //如果UI对象是进度条
                        {
                            CT_ContainerUI[CTui.index][12] = col; //设置部件颜色
                        }
                        if(CTui.type === 1 || CTui.type === 2 || CTui.type === 6)
                        {
                            cprint("ERROR : The UI object not have this property."); //输出错误
                        }
                    }
                }
            }
        }
    }
    else //如果对象不是UI对象
    {
        cprint("ERROR : Not is UI object."); //输出错误
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 按钮点击判断
//--------------------------------------------------------------------
function button_click(CTui)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTui.type === 1) //如果UI对象是按钮
        {
            if(CT_ContainerUI[CTui.index] != null) //如果UI容器中指定UI对象的数据不为空
            {
                var Cui_id = CT_ContainerUI[CTui.index][0]; //UI容器中指定UI对象的ID
                if(CTui.id === Cui_id) //如果UI对象id等于容器中指定UI对象的ID
                {
                    var b_s = CT_ContainerUI[CTui.index][17]; //指定按钮对象的状态
                    if(b_s === 1) //如果按钮被点击
                    {
                        return 1; //返回1
                    }
                }
            }
        }
        else //如果UI对象不是按钮
        {
            cprint("ERROR : Not is button object."); //输出错误
        }
    }
    return 0;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 按钮始终按下判断
//--------------------------------------------------------------------
function button_press(CTui)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTui.type === 1) //如果UI对象是按钮
        {
            if(CT_ContainerUI[CTui.index] != null) //如果UI容器中指定UI对象的数据不为空
            {
                var Cui_id = CT_ContainerUI[CTui.index][0]; //UI容器中指定UI对象的ID
                if(CTui.id === Cui_id) //如果UI对象id等于容器中指定UI对象的ID
                {
                    var b_s = CT_ContainerUI[CTui.index][18]; //指定按钮对象的状态
                    return b_s;
                }
            }
        }
        else //如果UI对象不是按钮
        {
            cprint("ERROR : Not is button object."); //输出错误
        }
    }
    return 0;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 按钮按下判断
//--------------------------------------------------------------------
function button_down(CTui)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTui.type === 1) //如果UI对象是按钮
        {
            if(CT_ContainerUI[CTui.index] != null) //如果UI容器中指定UI对象的数据不为空
            {
                var Cui_id = CT_ContainerUI[CTui.index][0]; //UI容器中指定UI对象的ID
                if(CTui.id === Cui_id) //如果UI对象id等于容器中指定UI对象的ID
                {
                    var b_s = CT_ContainerUI[CTui.index][19]; //指定按钮对象的状态
                    if(b_s === 1) //如果按钮被点击
                    {
                        return 1; //返回1
                    }
                }
            }
        }
        else //如果UI对象不是按钮
        {
            cprint("ERROR : Not is button object."); //输出错误
        }
    }
    return 0;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 按钮松开判断
//--------------------------------------------------------------------
function button_up(CTui)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTui.type === 1) //如果UI对象是按钮
        {
            if(CT_ContainerUI[CTui.index] != null) //如果UI容器中指定UI对象的数据不为空
            {
                var Cui_id = CT_ContainerUI[CTui.index][0]; //UI容器中指定UI对象的ID
                if(CTui.id === Cui_id) //如果UI对象id等于容器中指定UI对象的ID
                {
                    var b_s = CT_ContainerUI[CTui.index][20]; //指定按钮对象的状态
                    if(b_s === 1) //如果按钮被点击
                    {
                        return 1; //返回1
                    }
                }
            }
        }
        else //如果UI对象不是按钮
        {
            cprint("ERROR : Not is button object."); //输出错误
        }
    }
    return 0;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 复选框状态
//--------------------------------------------------------------------
function checkbox_status(CTui)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTui.type === 3) //如果UI对象是复选框
        {
            if(CT_ContainerUI[CTui.index] != null) //如果UI容器中指定UI对象的数据不为空
            {
                var Cui_id = CT_ContainerUI[CTui.index][0]; //UI容器中指定UI对象的ID
                if(CTui.id === Cui_id) //如果UI对象id等于容器中指定UI对象的ID
                {
                    var c_s = CT_ContainerUI[CTui.index][10]; //复选框状态
                    return c_s; //返回复选框状态
                }
            }
        }
        else //如果UI对象不是复选框
        {
            cprint("ERROR : Not is checkbox object."); //输出错误
        }
    }
    return 0;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 单选框状态
//--------------------------------------------------------------------
function radio_status(CTui)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTui.type === 4) //如果UI对象是单选框
        {
            if(CT_ContainerUI[CTui.index] != null) //如果UI容器中指定单选框对象数据不为空
            {
                var Cui_id = CT_ContainerUI[CTui.index][0]; //UI容器中指定UI对象的ID
                if(CTui.id === Cui_id) //如果UI对象id等于容器中指定UI对象的ID
                {
                    var r_s = CT_ContainerUI[CTui.index][11]; //单选框状态
                    return r_s; //返回单选框状态
                }
            }
        }
        else //如果UI对象不是单选框
        {
            cprint("ERROR : Not is radio object."); //输出错误
        }
    }
    return 0;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 进度条设置
//--------------------------------------------------------------------
function progressbar_set(CTui,val)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTui.type === 5)
        {
            if(CT_ContainerUI[CTui.index] != null) //如果UI容器中指定进度条对象的数据不为空
            {
                var Cui_id = CT_ContainerUI[CTui.index][0]; //UI容器中指定UI对象的ID
                if(CTui.id === Cui_id) //如果UI对象id等于容器中指定UI对象的ID
                {
                    var p_w = CT_ContainerUI[CTui.index][5]; //进度条宽度
                    var p_maxval = CT_ContainerUI[CTui.index][16]; //进度条最大值
                    var bp_w = 0; //进度条点宽度
                    if(val >= 0) //如果进度条值大于等于0
                    {
                        if(val <= p_maxval) //如果进度条值小于等于最大值
                        {
                            if(val < p_maxval) //如果设置的值小于最大值
                            {
                                bp_w = parseInt((p_w - 8) / p_maxval * val); //进度条点宽度
                            }
                            if(val === p_maxval) //如果设置的值等于最大值
                            {
                                bp_w = p_w - 8; //进度条点宽度
                            }
                            CT_ContainerUI[CTui.index][15] = val; //设置进度条值
                            CT_ContainerUI[CTui.index][14] = bp_w; //设置点宽度
                            CT_Repaint = 1; //请求重绘
                        }
                        else
                        {
                            cprint("ERROR : The progressbar value greater than the maximum.");
                        }
                    }
                    else
                    {
                        cprint("ERROR : Progressbar value error."); //输出错误
                    }
                }
            }
        }
        else //如果UI对象不是进度条
        {
            cprint("ERROR : Not is progressbar object."); //输出错误
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 文本框的内容
//--------------------------------------------------------------------
function textbox_string(CTui)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTui.type === 6) //如果UI对象是文本框
        {
            if(CT_ContainerUI[CTui.index] != null) //如果UI容器中指定文本框对象的数据不为空
            {
                var Cui_id = CT_ContainerUI[CTui.index][0]; //UI容器中指定UI对象的ID
                if(CTui.id === Cui_id) //如果UI对象id等于容器中指定UI对象的ID
                {
                    var t_s = CT_ContainerUI[CTui.index][14]; //文本框内容
                    return t_s; //返回文本框内容
                }
            }
        }
        else //如果UI对象不是复选框
        {
            cprint("ERROR : Not is textbox object."); //输出错误
        }
    }
    return "";
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置文本框的内容
//--------------------------------------------------------------------
function textbox_set_string(CTui,str)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTui.type === 6) //如果UI对象是文本框
        {
            if(CT_ContainerUI[CTui.index] != null) //如果UI容器中指定文本框对象的数据不为空
            {
                var Cui_id = CT_ContainerUI[CTui.index][0]; //UI容器中指定UI对象的ID
                if(CTui.id === Cui_id) //如果UI对象id等于容器中指定UI对象的ID
                {
                    CT_ContainerUI[CTui.index][14] = str; //设置文本框内容
                    CT_Repaint = 1; //请求重绘
                }
            }
        }
        else //如果UI对象不是复选框
        {
            cprint("ERROR : Not is textbox object."); //输出错误
        }
    }
}
//--------------------------------------------------------------------