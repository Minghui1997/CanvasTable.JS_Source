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
    this.layer = 0; //窗口层
//--------------------------------------------------------------------
    this.type = 0; //ui对象类型
    this.index = -1; //窗口索引
    this.id = CT_UIGetID(); //ID
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
    this.color_text = color(0,0,0,255); //按钮文本颜色
    this.text = "Button"; //按钮显示文本
    this.size = 16; //字体大小
    this.imgfont = null; //按钮字体
//--------------------------------------------------------------------
    this.index = -1; //ui对象索引
    this.type = 1; //ui对象类型
    this.id = CT_UIGetID(); //ID
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
    this.imgfont = null; //文本字体
//--------------------------------------------------------------------
    this.index = -1; //ui对象索引
    this.type = 2; //ui对象类型
    this.id = CT_UIGetID(); //ID
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
    this.id = CT_UIGetID(); //ID
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
    this.id = CT_UIGetID(); //ID
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
    this.value = 0; //进度条默认值
    this.maxvalue = 10; //进度条最大值
//--------------------------------------------------------------------
    this.index = -1; //ui对象索引
    this.type = 5; //ui对象类型
    this.id = CT_UIGetID(); //ID
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
    this.color_text = color(0,0,0,255); //文本框字体颜色
    this.background = -1; //文本框背景图片
    this.password = 0; //密码文本框
    this.number = 0; //数字文本框
    this.max = 20; //文本框最大字符数
    this.readonly = 0; //只读
    this.subbox = 0; //子文本框
    this.name = "Title"; //子文本框名称
    this.size = 16; //字体大小
    this.imgfont = null; //图像字体
//--------------------------------------------------------------------
    this.index = -1; //ui对象索引
    this.type = 6; //ui对象类型
    this.id = CT_UIGetID(); //ID
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 图像元件
//--------------------------------------------------------------------
function CTimagement()
{
    this.x = 0; //图像元件位置x
    this.y = 0; //图像元件位置y
    this.image = -1; //图像索引
    this.subnum = 1; //子图像数量
    this.subimg = 0; //子图像索引
//--------------------------------------------------------------------
    this.index = -1; //ui对象索引
    this.type = 7; //ui对象类型
    this.id = CT_UIGetID(); //ID
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 窗口创建
//--------------------------------------------------------------------
function CTwindow_create(CTwindow)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTwindow.type === 0) //如果对象类型是窗口
        {
            var id = CTwindow.id; //窗口对象ID
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
            if(bi !== -1) //如果有背景图像
            {
                var res_type = CT_ResourceArgList[bi*5+1]; //获取资源类型
                if(res_type !== 0) //如果资源类型不是图像
                {
                    bi = -1; //窗口无背景图像
                    cprint("ERROR : The resource index corresponding to the resource file is not image.");
                }
            }
            if(w > 0 && h > 0) //如果窗口对象属性正确
            {
                var i;
                var data_i;
                for(i=0;i<CT_ContainerWindowLength;i++) //遍历窗口容器
                {
                    data_i = i * 15; //窗口数据索引
                    if(CT_ContainerWindow[data_i] !== 0) //如果当前窗口不为空
                    {
                        var win_id = CT_ContainerWindow[data_i+1]; //获取当前窗口id
                        if(win_id === id) //如果当前窗口id等于窗口对象id
                        {
                            return; //中断
                        }
                    }
                }
                var i2;
                for(i2=0;i2<CT_ContainerWindowLength;i2++) //遍历窗口容器
                {
                    data_i = i2 * 15; //窗口数据索引
                    if(CT_ContainerWindow[data_i] === 0) //如果当前窗口为空
                    {
                        //将窗口数据写入窗口容器
                        CT_ContainerWindow[data_i] = 1;
                        CT_ContainerWindow[data_i+1] = id;
                        CT_ContainerWindow[data_i+2] = l;
                        CT_ContainerWindow[data_i+3] = x;
                        CT_ContainerWindow[data_i+4] = y;
                        CT_ContainerWindow[data_i+5] = w;
                        CT_ContainerWindow[data_i+6] = h;
                        CT_ContainerWindow[data_i+7] = cbg;
                        CT_ContainerWindow[data_i+8] = cbu;
                        CT_ContainerWindow[data_i+9] = cbd;
                        CT_ContainerWindow[data_i+10] = cbl;
                        CT_ContainerWindow[data_i+11] = cbr;
                        CT_ContainerWindow[data_i+12] = bi;
                        CTwindow.index = i2; //窗口对象索引
                        CT_WindowLayerStatusList[l] = 1; //将当前窗口层的状态标记为1
                        CT_Repaint = 1; //请求重绘
                        return; //中断
                    }
                }
                data_i = CT_ContainerWindowLength * 15; //窗口数据索引
                //将窗口数据写入窗口容器
                CT_ContainerWindow[data_i] = 1;
                CT_ContainerWindow[data_i+1] = id;
                CT_ContainerWindow[data_i+2] = l;
                CT_ContainerWindow[data_i+3] = x;
                CT_ContainerWindow[data_i+4] = y;
                CT_ContainerWindow[data_i+5] = w;
                CT_ContainerWindow[data_i+6] = h;
                CT_ContainerWindow[data_i+7] = cbg;
                CT_ContainerWindow[data_i+8] = cbu;
                CT_ContainerWindow[data_i+9] = cbd;
                CT_ContainerWindow[data_i+10] = cbl;
                CT_ContainerWindow[data_i+11] = cbr;
                CT_ContainerWindow[data_i+12] = bi;
                CTwindow.index = CT_ContainerWindowLength; //窗口对象索引
                CT_ContainerWindowLength ++; //窗口容器索引 +1
                CT_WindowLayerStatusList[l] = 1; //将当前窗口层的状态标记为1
                CT_Repaint = 1; //请求重绘
            }
            else
            {
                cprint("ERROR : Unable to create window."); //输出错误
            }
        }
        else
        {
            cprint("ERROR : Not is the window object."); //输出错误
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 窗口销毁
//--------------------------------------------------------------------
function CTwindow_destroy(CTwindow)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTwindow.type === 0) //如果对象类型是窗口
        {
            var win_index = CTwindow.index; //窗口对象索引
            var data_i = win_index * 15; //窗口数据索引;
            if(CT_ContainerWindow[data_i] !== 0) //如果窗口容器中指定窗口对象数据不为空
            {
                var Cwin_id = CT_ContainerWindow[data_i+1]; //窗口容器中指定窗口对象的ID
                if(CTwindow.id === Cwin_id) //如果窗口对象id等于容器中指定窗口对象的ID
                {
                    var i;
                    var i2;
                    for(i=0;i<15;i++) //遍历窗口对象数据
                    {
                        CT_ContainerWindow[data_i+i] = 0; //清空窗口对象容器中窗口对象的数据
                    }
                    for(i=CT_ContainerWindowLength-1;i>=-1;i--) //反向遍历窗口容器
                    {
                        if(i >= 0) //如果窗口索引大于等于0
                        {
                            if(CT_ContainerWindow[i*15] !== 0) //如果当前窗口不为空
                            {
                                CT_ContainerWindowLength = i + 1; //确定窗口容器长度
                                break; //中断
                            }
                        }
                        else
                        {
                            CT_ContainerWindowLength = 0; //窗口容器长度为0
                        }
                    }
                    for(i2=0;i2<CT_ContainerUILength;i2++) //遍历UI对象容器
                    {
                        data_i = i2 * 30; //UI数据索引
                        if(CT_ContainerUI[data_i] !== 0) //如果当前UI对象不为空
                        {
                            var ui_win_index = CT_ContainerUI[data_i+2]; //当前UI对象对应窗口的索引
                            if(ui_win_index === win_index) //如果当前UI对象对应窗口的索引等于窗口对象索引
                            {
                                var i3;
                                for(i3=0;i3<30;i3++) //遍历UI对象数据
                                {
                                    CT_ContainerUI[data_i+i3] = 0; //清空UI对象容器中UI对象的数据
                                }
                            }
                        }
                    }
                    for(i=CT_ContainerUILength-1;i>=-1;i--) //反向遍历UI容器
                    {
                        if(i >= 0) //如果UI容器大于等于0
                        {
                            if(CT_ContainerUI[i*30] !== 0) //如果当前UI不为空
                            {
                                CT_ContainerUILength = i + 1; //确定UI容器长度
                                break; //中断
                            }
                        }
                        else
                        {
                            CT_ContainerUILength = 0; //UI容器长度为0
                        }
                    }
                    CT_Repaint = 1; //请求重绘
                }
            }
        }
        else
        {
            cprint("ERROR : Not is the window object.");
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 窗口位置x设置
//--------------------------------------------------------------------
function CTwindow_set_x(CTwindow,x)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTwindow.type === 0) //如果UI对象是窗口
        {
            var data_i = CTwindow.index * 15; //窗口数据索引
            if(CT_ContainerWindow[data_i] !== 0) //如果UI容器中指定窗口对象数据不为空
            {
                var Cwin_id = CT_ContainerWindow[data_i+1]; //窗口容器中指定窗口对象的ID
                if(CTwindow.id === Cwin_id) //如果窗口对象id等于容器中指定窗口对象的ID
                {
                    CT_ContainerWindow[data_i+3] = x; //设置窗口位置x
                    CT_Repaint = 1; //请求重绘
                }
            }
        }
        else
        {
            cprint("ERROR : Not is the window object.");
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 窗口位置y设置
//--------------------------------------------------------------------
function CTwindow_set_y(CTwindow,y)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTwindow.type === 0) //如果UI对象是窗口
        {
            var data_i = CTwindow.index * 15; //窗口数据索引
            if(CT_ContainerWindow[data_i] !== 0) //如果UI容器中指定窗口对象数据不为空
            {
                var Cwin_id = CT_ContainerWindow[data_i+1]; //窗口容器中指定窗口对象的ID
                if(CTwindow.id === Cwin_id) //如果窗口对象id等于容器中指定窗口对象的ID
                {
                    CT_ContainerWindow[data_i+4] = y; //设置窗口位置y
                    CT_Repaint = 1; //请求重绘
                }
            }
        }
        else
        {
            cprint("ERROR : Not is the window object.");
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 窗口宽度设置
//--------------------------------------------------------------------
function CTwindow_set_width(CTwindow,w)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTwindow.type === 0) //如果UI对象是窗口
        {
            var data_i = CTwindow.index * 15; //窗口数据索引
            if(CT_ContainerWindow[data_i] !== 0) //如果UI容器中指定窗口对象数据不为空
            {
                var Cwin_id = CT_ContainerWindow[data_i+1]; //窗口容器中指定窗口对象的ID
                if(CTwindow.id === Cwin_id) //如果窗口对象id等于容器中指定窗口对象的ID
                {
                    CT_ContainerWindow[data_i+5] = w; //设置窗口宽度
                    CT_Repaint = 1; //请求重绘
                }
            }
        }
        else
        {
            cprint("ERROR : Not is the window object.");
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 窗口高度设置
//--------------------------------------------------------------------
function CTwindow_set_height(CTwindow,h)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTwindow.type === 0) //如果UI对象是窗口
        {
            var data_i = CTwindow.index * 15; //窗口数据索引
            if(CT_ContainerWindow[data_i] !== 0) //如果UI容器中指定窗口对象数据不为空
            {
                var Cwin_id = CT_ContainerWindow[data_i+1]; //窗口容器中指定窗口对象的ID
                if(CTwindow.id === Cwin_id) //如果窗口对象id等于容器中指定窗口对象的ID
                {
                    CT_ContainerWindow[data_i+6] = h; //设置窗口位置高度
                    CT_Repaint = 1; //请求重绘
                }
            }
        }
        else
        {
            cprint("ERROR : Not is the window object.");
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 窗口背景图片设置
//--------------------------------------------------------------------
function CTwindow_set_image(CTwindow,img)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTwindow.type === 0) //如果UI对象是窗口
        {
            var data_i = CTwindow.index * 15; //窗口数据索引
            if(CT_ContainerWindow[data_i] !== 0) //如果UI容器中指定窗口对象数据不为空
            {
                var Cwin_id = CT_ContainerWindow[data_i+1]; //窗口容器中指定窗口对象的ID
                if(CTwindow.id === Cwin_id) //如果窗口对象id等于容器中指定窗口对象的ID
                {
                    var res_type = CT_ResourceArgList[i*5+1]; //获取资源类型
                    if(res_type === 0) //如果资源类型是图像
                    {
                        CT_ContainerWindow[data_i+12] = img; //设置窗口图像
                        CT_Repaint = 1; //请求重绘
                    }
                    else
                    {
                        cprint("ERROR : The resource index corresponding to the resource file is not image.");
                    }
                }
            }
        }
        else
        {
            cprint("ERROR : Not is the window object.");
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 窗口颜色设置
//--------------------------------------------------------------------
function CTwindow_set_color(CTwindow,prop,col)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTwindow.type === 0) //如果UI对象是窗口
        {
            var data_i = CTwindow.index * 15; //窗口数据索引
            if(CT_ContainerWindow[data_i] !== 0) //如果窗口容器中指定窗口对象数据不为空
            {
                var Cwin_id = CT_ContainerWindow[data_i+1]; //窗口容器中指定窗口对象的ID
                if(CTwindow.id === Cwin_id) //如果窗口对象id等于容器中指定窗口对象的ID
                {
                    if(prop === "back") //如果属性是背景
                    {
                        CT_ContainerWindow[data_i+7] = col; //设置窗口背景颜色
                        CT_Repaint = 1; //请求重绘
                    }
                    if(prop === "up") //如果属性是上边框
                    {
                        CT_ContainerWindow[data_i+8] = col; //设置窗口上边框颜色
                        CT_Repaint = 1; //请求重绘
                    }
                    if(prop === "down") //如果属性是下边框
                    {
                        CT_ContainerWindow[data_i+9] = col; //设置窗口下边框颜色
                        CT_Repaint = 1; //请求重绘
                    }
                    if(prop === "left") //如果属性是左边框
                    {
                        CT_ContainerWindow[data_i+10] = col; //设置窗口左边框颜色
                        CT_Repaint = 1; //请求重绘
                    }
                    if(prop === "right") //如果属性是右边框
                    {
                        CT_ContainerWindow[data_i+11] = col; //设置窗口右边框颜色
                        CT_Repaint = 1; //请求重绘
                    }
                }
            }
        }
        else
        {
            cprint("ERROR : Not is the window object.");
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// UI对象创建
//--------------------------------------------------------------------
function CTui_create(CTwindow,CTui)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTwindow.type === 0) //如果对象类型是窗口
        {
            var id = CTui.id; //UI对象ID
            var win_index = CTwindow.index; //窗口对象索引
            var type = CTui.type; //UI对象类型
            var i;
            var data_i;
            for(i=0;i<CT_ContainerUILength;i++) //遍历UI容器
            {
                data_i = i * 30; //UI数据索引
                if(CT_ContainerUI[data_i] !== 0) //如果当前UI不为空
                {
                    var ui_id = CT_ContainerUI[data_i+1]; //获取当前UI id
                    if(ui_id === id) //如果当前UI id等于UI对象id
                    {
                        return; //中断
                    }
                }
            }
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
                var text = CTui.text; //按钮显示文本
                var text_w = 0; //按钮显示文本像素宽度
                var text_h = 0; //按钮显示文本高度
                var font_i = 0; //按钮字体图像
                var font_n = 0; //按钮字体字符数
                var font_g = 0; //按钮字体字符间隙
                var font_cl = null; //按钮字体字符列表
                var font_gl = null; //按钮字体字形列表
                var imgfont_use = 0; //使用图像字体
                if(bi !== -1) //如果有背景图像
                {
                    var res_type = CT_ResourceList[bi*5+1]; //获取资源类型
                    if(res_type !== 0) //如果资源类型不是图像
                    {
                        bi = -1; //窗口无背景图像
                        cprint("ERROR : The resource index corresponding to the resource file is not image.");
                    }
                }
                if(CTui.imgfont != null) //如果使用图像字体
                {
                    if(CTui.imgfont.FontImg !== -1 && CTui.imgfont.CharNumber > 0 && CTui.imgfont.CharList != null && CTui.imgfont.GlyphList != null) //如果资源不为空
                    {
                        font_i = CTui.imgfont.FontImg; //按钮字体图像
                        font_n = CTui.imgfont.CharNumber; //按钮字体字符数
                        font_g = CTui.imgfont.CharGap; //按钮字体字符间隙
                        font_cl = CTui.imgfont.CharList; //按钮字体字符列表
                        font_gl = CTui.imgfont.GlyphList; //按钮字体字形列表
                        text_h = CTui.imgfont.CharHeight; //按钮文本高度
                        text_w = CT_ImgStringMeasure(font_n,font_g,font_cl,font_gl,text); //获取按钮显示文本宽度
                        imgfont_use = 1; //使用图像字体
                    }
                    else
                    {
                        cprint("ERROR : Image of imgfont is invalid.");
                    }
                }
                else
                {
                    text_w = string_pxwidth(text,CTui.size); //按钮显示文本像素宽度
                    text_h = CTui.size; //按钮显示文本高度
                }
                if(w > 0 && h > 0) //如果按钮属性正确
                {
                    var i2;
                    var data_i;
                    for(i2=0;i2<CT_ContainerUILength;i2++) //遍历UI容器
                    {
                        data_i = i2 * 30; //UI数据索引
                        if(CT_ContainerUI[data_i] === 0) //如果当前UI为空
                        {
                            //将UI数据写入UI容器
                            CT_ContainerUI[data_i] = 1;
                            CT_ContainerUI[data_i+1] = id;
                            CT_ContainerUI[data_i+2] = win_index;
                            CT_ContainerUI[data_i+3] = type;
                            CT_ContainerUI[data_i+4] = x;
                            CT_ContainerUI[data_i+5] = y;
                            CT_ContainerUI[data_i+6] = w;
                            CT_ContainerUI[data_i+7] = h;
                            CT_ContainerUI[data_i+8] = cbg;
                            CT_ContainerUI[data_i+9] = cbu;
                            CT_ContainerUI[data_i+10] = cbd;
                            CT_ContainerUI[data_i+11] = cbl;
                            CT_ContainerUI[data_i+12] = cbr;
                            CT_ContainerUI[data_i+13] = ct;
                            CT_ContainerUI[data_i+14] = bi;
                            CT_ContainerUI[data_i+15] = text;
                            CT_ContainerUI[data_i+16] = text_w;
                            CT_ContainerUI[data_i+17] = text_h;
                            CT_ContainerUI[data_i+18] = 0;
                            CT_ContainerUI[data_i+19] = 0;
                            CT_ContainerUI[data_i+20] = 0;
                            CT_ContainerUI[data_i+21] = 0;
                            CT_ContainerUI[data_i+23] = imgfont_use;
                            CT_ContainerUI[data_i+24] = font_i;
                            CT_ContainerUI[data_i+25] = font_n;
                            CT_ContainerUI[data_i+26] = font_g;
                            CT_ContainerUI[data_i+27] = font_cl;
                            CT_ContainerUI[data_i+28] = font_gl;
                            CTui.index = i2; //UI对象索引
                            CT_Repaint = 1; //请求重绘
                            return; //中断
                        }
                    }
                    data_i = CT_ContainerUILength * 30; //UI数据索引
                    //将UI数据写入UI容器
                    CT_ContainerUI[data_i] = 1;
                    CT_ContainerUI[data_i+1] = id;
                    CT_ContainerUI[data_i+2] = win_index;
                    CT_ContainerUI[data_i+3] = type;
                    CT_ContainerUI[data_i+4] = x;
                    CT_ContainerUI[data_i+5] = y;
                    CT_ContainerUI[data_i+6] = w;
                    CT_ContainerUI[data_i+7] = h;
                    CT_ContainerUI[data_i+8] = cbg;
                    CT_ContainerUI[data_i+9] = cbu;
                    CT_ContainerUI[data_i+10] = cbd;
                    CT_ContainerUI[data_i+11] = cbl;
                    CT_ContainerUI[data_i+12] = cbr;
                    CT_ContainerUI[data_i+13] = ct;
                    CT_ContainerUI[data_i+14] = bi;
                    CT_ContainerUI[data_i+15] = text;
                    CT_ContainerUI[data_i+16] = text_w;
                    CT_ContainerUI[data_i+17] = text_h;
                    CT_ContainerUI[data_i+18] = 0;
                    CT_ContainerUI[data_i+19] = 0;
                    CT_ContainerUI[data_i+20] = 0;
                    CT_ContainerUI[data_i+21] = 0;
                    CT_ContainerUI[data_i+23] = imgfont_use;
                    CT_ContainerUI[data_i+24] = font_i;
                    CT_ContainerUI[data_i+25] = font_n;
                    CT_ContainerUI[data_i+26] = font_g;
                    CT_ContainerUI[data_i+27] = font_cl;
                    CT_ContainerUI[data_i+28] = font_gl;
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
                var font_i = 0; //文本字体图像
                var font_n = 0; //文本字体字符数
                var font_g = 0; //文本字体字符间隙
                var font_cl = null; //文本字体字符列表
                var font_gl = null; //文本字体字形列表
                var imgfont_use = 0; //使用图像字体
                var i2;
                var data_i;
                if(CTui.imgfont != null) //如果使用图像字体
                {
                    if(CTui.imgfont.FontImg !== -1 && CTui.imgfont.CharNumber > 0 && CTui.imgfont.CharList != null && CTui.imgfont.GlyphList != null) //如果资源不为空
                    {
                        font_i = CTui.imgfont.FontImg; //文本字体图像
                        font_n = CTui.imgfont.CharNumber; //文本字体字符数
                        font_g = CTui.imgfont.CharGap; //文本字体字符间隙
                        font_cl = CTui.imgfont.CharList; //文本字体字符列表
                        font_gl = CTui.imgfont.GlyphList; //文本字体字形列表
                        imgfont_use = 1; //使用图像字体
                    }
                    else
                    {
                        cprint("ERROR : Image of imgfont is invalid.");
                    }
                }
                for(i2=0;i2<CT_ContainerUILength;i2++) //遍历UI容器
                {
                    data_i = i2 * 30; //UI数据索引
                    if(CT_ContainerUI[data_i] === 0) //如果当前UI为空
                    {
                         //将UI数据写入UI容器
                        CT_ContainerUI[data_i] = 1;
                        CT_ContainerUI[data_i+1] = id;
                        CT_ContainerUI[data_i+2] = win_index;
                        CT_ContainerUI[data_i+3] = type;
                        CT_ContainerUI[data_i+4] = x;
                        CT_ContainerUI[data_i+5] = y;
                        CT_ContainerUI[data_i+6] = ct;
                        CT_ContainerUI[data_i+7] = text;
                        CT_ContainerUI[data_i+8] = ts;
                        CT_ContainerUI[data_i+9] = imgfont_use;
                        CT_ContainerUI[data_i+10] = font_i;
                        CT_ContainerUI[data_i+11] = font_n;
                        CT_ContainerUI[data_i+12] = font_g;
                        CT_ContainerUI[data_i+13] = font_cl;
                        CT_ContainerUI[data_i+14] = font_gl;
                        CTui.index = i2; //UI对象索引
                        CT_Repaint = 1; //请求重绘
                        return; //中断
                    }
                }
                data_i = CT_ContainerUILength * 30; //UI数据索引
                //将UI数据写入UI容器
                CT_ContainerUI[data_i] = 1;
                CT_ContainerUI[data_i+1] = id;
                CT_ContainerUI[data_i+2] = win_index;
                CT_ContainerUI[data_i+3] = type;
                CT_ContainerUI[data_i+4] = x;
                CT_ContainerUI[data_i+5] = y;
                CT_ContainerUI[data_i+6] = ct;
                CT_ContainerUI[data_i+7] = text;
                CT_ContainerUI[data_i+8] = ts;
                CT_ContainerUI[data_i+9] = imgfont_use;
                CT_ContainerUI[data_i+10] = font_i;
                CT_ContainerUI[data_i+11] = font_n;
                CT_ContainerUI[data_i+12] = font_g;
                CT_ContainerUI[data_i+13] = font_cl;
                CT_ContainerUI[data_i+14] = font_gl;
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
                    var data_i;
                    for(i2=0;i2<CT_ContainerUILength;i2++) //遍历UI容器
                    {
                        data_i = i2 * 30; //UI数据索引
                        if(CT_ContainerUI[data_i] === 0) //如果当前UI为空
                        {
                            //将UI数据写入UI容器
                            CT_ContainerUI[data_i] = 1;
                            CT_ContainerUI[data_i+1] = id,
                            CT_ContainerUI[data_i+2] = win_index,
                            CT_ContainerUI[data_i+3] = type,
                            CT_ContainerUI[data_i+4] = x,
                            CT_ContainerUI[data_i+5] = y,
                            CT_ContainerUI[data_i+6] = w,
                            CT_ContainerUI[data_i+7] = h,
                            CT_ContainerUI[data_i+8] = cbg,
                            CT_ContainerUI[data_i+9] = cb,
                            CT_ContainerUI[data_i+10] = cw,
                            CT_ContainerUI[data_i+11] = status;
                            CTui.index = i2; //UI对象索引
                            CT_Repaint = 1; //请求重绘
                            return; //中断
                        }
                    }
                    data_i = CT_ContainerUILength * 30; //UI数据索引
                    //将UI数据写入UI容器
                    CT_ContainerUI[data_i] = 1;
                    CT_ContainerUI[data_i+1] = id,
                    CT_ContainerUI[data_i+2] = win_index,
                    CT_ContainerUI[data_i+3] = type,
                    CT_ContainerUI[data_i+4] = x,
                    CT_ContainerUI[data_i+5] = y,
                    CT_ContainerUI[data_i+6] = w,
                    CT_ContainerUI[data_i+7] = h,
                    CT_ContainerUI[data_i+8] = cbg,
                    CT_ContainerUI[data_i+9] = cb,
                    CT_ContainerUI[data_i+10] = cw,
                    CT_ContainerUI[data_i+11] = status;
                    CTui.index = CT_ContainerUILength; //UI对象索引
                    CT_ContainerUILength ++; //UI容器索引 +1
                    CT_Repaint = 1; //请求重绘
                }
                else
                {
                    cprint("ERROR : Checkbox state is error.");
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
                    var radio_first = -1;
                    var radio_sel = 0;
                    var i2;
                    var data_i;
                    for(i2=0;i2<CT_ContainerUILength;i2++) //遍历UI容器
                    {
                        data_i = i2 * 30; //UI数据索引
                        if(CT_ContainerUI[data_i] === 0) //如果当前UI为空
                        {
                            //将UI数据写入UI容器
                            CT_ContainerUI[data_i] = 1;
                            CT_ContainerUI[data_i+1] = id;
                            CT_ContainerUI[data_i+2] = win_index;
                            CT_ContainerUI[data_i+3] = type;
                            CT_ContainerUI[data_i+4] = x;
                            CT_ContainerUI[data_i+5] = y;
                            CT_ContainerUI[data_i+6] = w;
                            CT_ContainerUI[data_i+7] = h;
                            CT_ContainerUI[data_i+8] = cbg;
                            CT_ContainerUI[data_i+9] = cb;
                            CT_ContainerUI[data_i+10] = cw;
                            CT_ContainerUI[data_i+11] = g;
                            CT_ContainerUI[data_i+12] = 0;
                            CTui.index = i2; //UI对象索引
                            radio_first = -1; //单选框组中的第一个单选框索引
                            radio_sel = 0; //单选框组中的选择的单选框索引
                            var i3;
                            for(i3=0;i3<CT_ContainerUILength;i3++) //遍历UI容器
                            {
                                data_i = i3 * 30; //UI数据索引
                                if(CT_ContainerUI[data_i] !== 0) //如果当前UI对象不为空
                                {
                                    var ui_type = CT_ContainerUI[data_i+3]; //当前UI类型
                                    if(ui_type === 4) //如果当前UI是单选框
                                    {
                                        var radio_g = CT_ContainerUI[data_i+11]; //当前单选框组
                                        if(radio_g === g) //如果当前单选框组等于单选框组
                                        {
                                            if(radio_first === -1) //如果没有确定单选框组中的第一个单选框索引
                                            {
                                                radio_first = i3; //确定单选框组中的第一个单选框索引
                                            }
                                            var radio_s = CT_ContainerUI[data_i+12]; //当前单选框状态
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
                                CT_ContainerUI[radio_first*30+12] = 1; //将单选框组中的第一个单选框设置为选择
                            }
                            CT_Repaint = 1; //请求重绘
                            return; //中断
                        }
                    }
                    data_i = CT_ContainerUILength * 30; //UI数据索引
                    //将UI数据写入UI容器
                    CT_ContainerUI[data_i] = 1;
                    CT_ContainerUI[data_i+1] = id,
                    CT_ContainerUI[data_i+2] = win_index,
                    CT_ContainerUI[data_i+3] = type,
                    CT_ContainerUI[data_i+4] = x,
                    CT_ContainerUI[data_i+5] = y,
                    CT_ContainerUI[data_i+6] = w,
                    CT_ContainerUI[data_i+7] = h,
                    CT_ContainerUI[data_i+8] = cbg,
                    CT_ContainerUI[data_i+9] = cb,
                    CT_ContainerUI[data_i+10] = cw,
                    CT_ContainerUI[data_i+11] = g,
                    CT_ContainerUI[data_i+12] = 0;
                    CTui.index = CT_ContainerUILength; //UI对象索引
                    CT_ContainerUILength ++; //UI容器索引 +1
                    CT_Repaint = 1; //请求重绘
                    var i3;
                    for(i3=0;i3<CT_ContainerUILength;i3++) //遍历UI容器
                    {
                        data_i = i3 * 30; //UI数据索引
                        if(CT_ContainerUI[data_i] !== 0) //如果当前UI对象不为空
                        {
                            var ui_type = CT_ContainerUI[data_i+3]; //当前UI类型
                            if(ui_type === 4) //如果当前UI是单选框
                            {
                                var radio_g = CT_ContainerUI[data_i+11]; //当前单选框组
                                if(radio_g === g) //如果当前单选框组等于单选框组
                                {
                                    if(radio_first === -1) //如果没有确定单选框组中的第一个单选框索引
                                    {
                                        radio_first = i3; //确定单选框组中的第一个单选框索引
                                    }
                                    var radio_s = CT_ContainerUI[data_i+12]; //当前单选框状态
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
                        CT_ContainerUI[radio_first*30+12] = 1; //将单选框组中的第一个单选框设置为选择
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
                var val = CTui.value; //进度条默认值
                var maxval = CTui.maxvalue; //进度条最大值
                var id = CTui.id; //进度条对象ID
                if(pi !== -1) //如果有背景图像
                {
                    var res_type = CT_ResourceList[pi*5+1]; //获取资源类型
                    if(res_type !== 0) //如果资源类型不是图像
                    {
                        pi = -1; //窗口无背景图像
                        cprint("ERROR : The resource index corresponding to the resource file is not image.");
                    }
                }
                if(w > 0 && h > 0 && val >= 0 && maxval > 0 && val <= maxval) //如果进度条属性正确
                {
                    var w_w = parseInt((w - 8) / maxval * val); //进度条点宽度
                    var i2;
                    var data_i;
                    for(i2=0;i2<CT_ContainerUILength;i2++) //遍历UI容器
                    {
                        data_i = i2 * 30; //UI数据索引
                        if(CT_ContainerUI[data_i] === 0) //如果当前UI为空
                        {
                            //将UI数据写入UI容器
                            CT_ContainerUI[data_i] = 1;
                            CT_ContainerUI[data_i+1] = id;
                            CT_ContainerUI[data_i+2] = win_index;
                            CT_ContainerUI[data_i+3] = type;
                            CT_ContainerUI[data_i+4] = x;
                            CT_ContainerUI[data_i+5] = y;
                            CT_ContainerUI[data_i+6] = w;
                            CT_ContainerUI[data_i+7] = h;
                            CT_ContainerUI[data_i+8] = cbg;
                            CT_ContainerUI[data_i+9] = cbu;
                            CT_ContainerUI[data_i+10] = cbd;
                            CT_ContainerUI[data_i+11] = cbl;
                            CT_ContainerUI[data_i+12] = cbr;
                            CT_ContainerUI[data_i+13] = cw;
                            CT_ContainerUI[data_i+14] = pi;
                            CT_ContainerUI[data_i+15] = w_w;
                            CT_ContainerUI[data_i+16] = val;
                            CT_ContainerUI[data_i+17] = maxval;
                            CTui.index = i2; //UI对象索引
                            CT_Repaint = 1; //请求重绘
                            return; //中断
                        }
                    }
                    data_i = CT_ContainerUILength * 30; //UI数据索引
                    //将UI数据写入UI容器
                    CT_ContainerUI[data_i] = 1;
                    CT_ContainerUI[data_i+1] = id;
                    CT_ContainerUI[data_i+2] = win_index;
                    CT_ContainerUI[data_i+3] = type;
                    CT_ContainerUI[data_i+4] = x;
                    CT_ContainerUI[data_i+5] = y;
                    CT_ContainerUI[data_i+6] = w;
                    CT_ContainerUI[data_i+7] = h;
                    CT_ContainerUI[data_i+8] = cbg;
                    CT_ContainerUI[data_i+9] = cbu;
                    CT_ContainerUI[data_i+10] = cbd;
                    CT_ContainerUI[data_i+11] = cbl;
                    CT_ContainerUI[data_i+12] = cbr;
                    CT_ContainerUI[data_i+13] = cw;
                    CT_ContainerUI[data_i+14] = pi;
                    CT_ContainerUI[data_i+15] = w_w;
                    CT_ContainerUI[data_i+16] = val;
                    CT_ContainerUI[data_i+17] = maxval;
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
                var tpass = CTui.password; //密码文本框参数
                var tnumb = CTui.number; //数字文本框参数
                var tmax = CTui.max; //文本框最大字符数
                var readonly = CTui.readonly; //文本框只读参数
                var subbox = CTui.subbox; //子文本框参数
                var name = CTui.name; //子文本框名称
                var size = CTui.size; //文本框字体大小
                var id = CTui.id; //文本框文本框id
                var font_i = 0; //文本框字体图像
                var font_n = 0; //文本框字体字符数
                var font_g = 0; //文本框字体字符间隙
                var font_cl = null; //文本框字体字符列表
                var font_gl = null; //文本框字体字形列表
                var imgfont_use = 0; //使用图像字体
                if(tb !== -1) //如果有背景图像
                {
                    var res_type = CT_ResourceList[tb*5+1]; //获取资源类型
                    if(res_type !== 0) //如果资源类型不是图像
                    {
                        tb = -1; //窗口无背景图像
                        cprint("ERROR : The resource index corresponding to the resource file is not image.");
                    }
                }
                if(CTui.imgfont != null) //如果使用图像字体
                {
                    if(CTui.imgfont.FontImg !== -1 && CTui.imgfont.CharNumber > 0 && CTui.imgfont.CharList != null && CTui.imgfont.GlyphList != null) //如果资源不为空
                    {
                        font_i = CTui.imgfont.FontImg; //文本框字体图像
                        font_n = CTui.imgfont.CharNumber; //文本框字体字符数
                        font_g = CTui.imgfont.CharGap; //文本框字体字符间隙
                        font_cl = CTui.imgfont.CharList; //文本框字体字符列表
                        font_gl = CTui.imgfont.GlyphList; //文本框字体字形列表
                        size = CTui.imgfont.CharHeight; //文本框文本高度
                        imgfont_use = 1; //使用图像字体
                    }
                    else
                    {
                        cprint("ERROR : Image of the imgfont is invalid.");
                    }
                }
                if(w > 0 && h > 0 && tpass >= 0 && tnumb >= 0 && tmax > 0) //如果文本框属性正确
                {
                    var i2;
                    var data_i;
                    for(i2=0;i2<CT_ContainerUILength;i2++) //遍历UI容器
                    {
                        data_i = i2 * 30; //UI数据索引
                        if(CT_ContainerUI[data_i] === 0) //如果当前UI为空
                        {
                             //将UI数据写入UI容器
                            CT_ContainerUI[data_i] = 1;
                            CT_ContainerUI[data_i+1] = id;
                            CT_ContainerUI[data_i+2] = win_index;
                            CT_ContainerUI[data_i+3] = type;
                            CT_ContainerUI[data_i+4] = x;
                            CT_ContainerUI[data_i+5] = y;
                            CT_ContainerUI[data_i+6] = w;
                            CT_ContainerUI[data_i+7] = h;
                            CT_ContainerUI[data_i+8] =  tbg;
                            CT_ContainerUI[data_i+9] = tbu;
                            CT_ContainerUI[data_i+10] = tbd;
                            CT_ContainerUI[data_i+11] = tbl;
                            CT_ContainerUI[data_i+12] = tbr;
                            CT_ContainerUI[data_i+13] = tc;
                            CT_ContainerUI[data_i+14] = tb;
                            CT_ContainerUI[data_i+15] = "";
                            CT_ContainerUI[data_i+16] = tpass;
                            CT_ContainerUI[data_i+17] = tnumb;
                            CT_ContainerUI[data_i+18] = tmax;
                            CT_ContainerUI[data_i+19] = readonly;
                            CT_ContainerUI[data_i+20] = subbox;
                            CT_ContainerUI[data_i+21] = name;
                            CT_ContainerUI[data_i+22] = size;
                            CT_ContainerUI[data_i+24] = imgfont_use;
                            CT_ContainerUI[data_i+25] = font_i;
                            CT_ContainerUI[data_i+26] = font_n;
                            CT_ContainerUI[data_i+27] = font_g;
                            CT_ContainerUI[data_i+28] = font_cl;
                            CT_ContainerUI[data_i+29] = font_gl;
                            CTui.index = i2; //UI对象索引
                            CT_Repaint = 1; //请求重绘
                            return; //中断
                        }
                    }
                    data_i = CT_ContainerUILength * 30; //UI数据索引
                    //将UI数据写入UI容器
                    CT_ContainerUI[data_i] = 1;
                    CT_ContainerUI[data_i+1] = id;
                    CT_ContainerUI[data_i+2] = win_index;
                    CT_ContainerUI[data_i+3] = type;
                    CT_ContainerUI[data_i+4] = x;
                    CT_ContainerUI[data_i+5] = y;
                    CT_ContainerUI[data_i+6] = w;
                    CT_ContainerUI[data_i+7] = h;
                    CT_ContainerUI[data_i+8] =  tbg;
                    CT_ContainerUI[data_i+9] = tbu;
                    CT_ContainerUI[data_i+10] = tbd;
                    CT_ContainerUI[data_i+11] = tbl;
                    CT_ContainerUI[data_i+12] = tbr;
                    CT_ContainerUI[data_i+13] = tc;
                    CT_ContainerUI[data_i+14] = tb;
                    CT_ContainerUI[data_i+15] = "";
                    CT_ContainerUI[data_i+16] = tpass;
                    CT_ContainerUI[data_i+17] = tnumb;
                    CT_ContainerUI[data_i+18] = tmax;
                    CT_ContainerUI[data_i+19] = readonly;
                    CT_ContainerUI[data_i+20] = subbox;
                    CT_ContainerUI[data_i+21] = name;
                    CT_ContainerUI[data_i+22] = size;
                    CT_ContainerUI[data_i+24] = imgfont_use;
                    CT_ContainerUI[data_i+25] = font_i;
                    CT_ContainerUI[data_i+26] = font_n;
                    CT_ContainerUI[data_i+27] = font_g;
                    CT_ContainerUI[data_i+28] = font_cl;
                    CT_ContainerUI[data_i+29] = font_gl;
                    CTui.index = CT_ContainerUILength; //UI对象索引
                    CT_ContainerUILength ++; //UI容器索引 +1
                    CT_Repaint = 1; //请求重绘
                }
                else
                {
                    cprint("ERROR : Unable to create textbox.");
                }
            }
            if(type === 7) //如果UI是图像元件
            {
                var id = CTui.id; //图像元件id
                var x = CTui.x; //图像元件位置x
                var y = CTui.y; //图像元件位置y
                var image = CTui.image; //图像元件图像
                var subimg = CTui.subimg; //图像元件默认子图像索引
                var subnum = CTui.subnum; //图像元件子图像数量
                var image_w = 0; //图像元件图像宽度
                var image_h = 0; //图像元件图像高度
                var subimg_w = 0; //图像元件子图像宽度
                var subimg_h = 0; //图像元件子图像高度
                if(image !== -1) //如果图像元件有图像
                {
                    var ldata_i = image * 5; //资源参数数据索引
                    var res_type = CT_ResourceArgList[ldata_i+1]; //获取资源类型
                    if(res_type === 0) //如果资源类型是图像
                    {
                        image_w = CT_ResourceArgList[ldata_i+2]; //图像宽度
                        image_h = CT_ResourceArgList[ldata_i+3]; //图像高度
                        subimg_w = parseInt(image_w / subnum); //子图像宽度
                        subimg_h = image_h; //子图像高度
                    }
                    else
                    {
                        cprint("ERROR : The resource index corresponding to the resource file is not image.");
                    }
                    if(subnum >= 1 && subimg <= subnum - 1) //如果图像元件属性正确
                    {
                        var i2;
                        var data_i;
                        for(i2=0;i2<CT_ContainerUILength;i2++) //遍历UI容器
                        {
                            data_i = i2 * 30; //UI数据索引
                            if(CT_ContainerUI[data_i] === 0) //如果当前UI为空
                            {
                                //将UI数据写入UI容器
                                CT_ContainerUI[data_i] = 1;
                                CT_ContainerUI[data_i+1] = id;
                                CT_ContainerUI[data_i+2] = win_index;
                                CT_ContainerUI[data_i+3] = type;
                                CT_ContainerUI[data_i+4] = x;
                                CT_ContainerUI[data_i+5] = y;
                                CT_ContainerUI[data_i+6] = image;
                                CT_ContainerUI[data_i+7] = subimg;
                                CT_ContainerUI[data_i+8] = subnum;
                                CT_ContainerUI[data_i+9] = subimg_w;
                                CT_ContainerUI[data_i+10] = subimg_h;
                                CTui.index = i2; //UI对象索引
                                CT_Repaint = 1; //请求重绘
                                return; //中断
                            }
                        }
                        data_i = CT_ContainerUILength * 30; //UI数据索引
                        //将UI数据写入UI容器
                        CT_ContainerUI[data_i] = 1;
                        CT_ContainerUI[data_i+1] = id;
                        CT_ContainerUI[data_i+2] = win_index;
                        CT_ContainerUI[data_i+3] = type;
                        CT_ContainerUI[data_i+4] = x;
                        CT_ContainerUI[data_i+5] = y;
                        CT_ContainerUI[data_i+6] = image;
                        CT_ContainerUI[data_i+7] = subimg;
                        CT_ContainerUI[data_i+8] = subnum;
                        CT_ContainerUI[data_i+9] = subimg_w;
                        CT_ContainerUI[data_i+10] = subimg_h;
                        CTui.index = CT_ContainerUILength; //UI对象索引
                        CT_ContainerUILength ++; //UI容器索引 +1
                        CT_Repaint = 1; //请求重绘
                    }
                    else
                    {
                        cprint("ERROR : The imagement subimage index is error.");
                    }
                }
            }
        }
        else
        {
            cprint("ERROR : Not is the window object."); //输出错误
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// UI销毁
//--------------------------------------------------------------------
function CTui_destroy(CTui)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var ui_type = CTui.type; //ui对象类型
        if(ui_type > 0) //如果是UI对象
        {
            var ui_index = CTui.index; //UI对象索引
            var data_i = ui_index * 30; //UI数据索引
            if(CT_ContainerUI[data_i] !== 0) //如果UI容器中指定UI对象数据不为空
            {
                var Cui_id = CT_ContainerUI[data_i+1]; //UI容器中指定UI对象的ID
                if(Cui_id === CTui.id) //如果UI对象id等于容器中指定UI对象的ID
                {
                    var i;
                    for(i=0;i<30;i++) //遍历UI对象数据
                    {
                        CT_ContainerUI[data_i+i] = 0; //清除UI容器中UI对象的数据
                    }
                    CT_Repaint = 1; //请求重绘
                }
            }
        }
        else
        {
            cprint("ERROR : Not is the UI object.");
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// UI位置x设置
//--------------------------------------------------------------------
function CTui_set_x(CTui,x)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var ui_type = CTui.type; //ui对象类型
        if(ui_type > 0) //如果对象是UI对象
        {
            var ui_index = CTui.index; //ui对象索引
            var data_i = ui_index * 30; //UI数据索引
            if(CT_ContainerUI[data_i] !== 0) //如果UI容器中指定UI对象的数据不为空
            {
                var Cui_id = CT_ContainerUI[data_i+1]; //UI容器中指定UI对象的ID
                if(Cui_id === CTui.id) //如果UI对象id等于容器中指定UI对象的ID
                {
                    CT_ContainerUI[data_i+4] = x; //设置UI对象位置x
                    CT_Repaint = 1; //请求重绘
                }
            }
        }
        else
        {
            cprint("ERROR : Not is the UI object.");
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// UI位置y设置
//--------------------------------------------------------------------
function CTui_set_y(CTui,y)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var ui_type = CTui.type; //ui对象类型
        if(ui_type > 0) //如果对象是UI对象
        {
            var ui_index = CTui.index; //ui对象索引
            var data_i = ui_index * 30; //UI数据索引
            if(CT_ContainerUI[data_i] !== 0) //如果UI容器中指定UI对象的数据不为空
            {
                var Cui_id = CT_ContainerUI[data_i+1]; //UI容器中指定UI对象的ID
                if(Cui_id === CTui.id) //如果UI对象id等于容器中指定UI对象的ID
                {
                    CT_ContainerUI[data_i+5] = y; //设置UI对象位置y
                    CT_Repaint = 1; //请求重绘
                }
            }
        }
        else
        {
            cprint("ERROR : Not is the UI object.");
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// UI宽度设置
//--------------------------------------------------------------------
function CTui_set_width(CTui,w)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTui.type >= 1) //如果对象是UI对象
        {
            var ui_index = CTui.index; //ui对象索引
            var data_i = ui_index * 30; //UI数据索引
            if(CT_ContainerUI[data_i] !== 0) //如果UI容器中指定窗口对象数据不为空
            {
                var Cui_id = CT_ContainerUI[data_i+1]; //UI容器中指定UI对象的ID
                if(CTui.id === Cui_id) //如果UI对象id等于容器中指定UI对象的ID
                {
                    if(CTui.type === 1 || CTui.type === 6) //如果UI对象是按钮 文本框
                    {
                        CT_ContainerUI[data_i+6] = w; //设置宽度
                        CT_Repaint = 1; //请求重绘
                    }
                    if(CTui.type === 5) //如果UI对象是进度条
                    {
                        CT_ContainerUI[data_i+6] = w; //设置进度条宽度
                        var p_w = CT_ContainerUI[data_i+7]; //进度条宽度
                        var val = CT_ContainerUI[data_i+16]; //进度条值
                        var p_maxval = CT_ContainerUI[data_i+17]; //进度条最大值
                        var p_ww = parseInt((p_w - 8) / p_maxval * val); //进度条部件宽度
                        CT_ContainerUI[data_i+15] = p_ww; //设置部件宽度
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
            cprint("ERROR : Not is the UI object."); //输出错误
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// UI高度设置
//--------------------------------------------------------------------
function CTui_set_height(CTui,h)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTui.type >= 1) //如果对象是UI对象
        {
            var ui_index = CTui.index; //ui对象索引
            var data_i = ui_index * 30; //UI数据索引
            if(CT_ContainerUI[data_i] !== 0) //如果UI容器中指定窗口对象数据不为空
            {
                var Cui_id = CT_ContainerUI[data_i+1]; //UI容器中指定UI对象的ID
                if(CTui.id === Cui_id) //如果UI对象id等于容器中指定UI对象的ID
                {
                    if(CTui.type === 1 || CTui.type === 5 || CTui.type === 6) //如果UI对象是按钮 文本框
                    {
                        CT_ContainerUI[data_i+7] = h; //设置高度
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
            cprint("ERROR : Not is the UI object."); //输出错误
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// UI图片设置
//--------------------------------------------------------------------
function CTui_set_image(CTui,img)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTui.type >= 1) //如果对象是UI对象
        {
            var ui_index = CTui.index; //ui对象索引
            var data_i = ui_index * 30; //UI数据索引
            if(CT_ContainerUI[data_i] !== 0) //如果UI容器中指定UI对象的数据不为空
            {
                var Cui_id = CT_ContainerUI[data_i+1]; //UI容器中指定UI对象的ID
                if(CTui.id === Cui_id) //如果UI对象id等于容器中指定UI对象的ID
                {
                    if(CTui.type === 1 || CTui.type === 5 || CTui.type === 6) //如果UI对象是按钮 进度条 文本框
                    {
                        if(img !== -1) //如果有背景图像
                        {
                            var res_type = CT_ResourceArgList[img*5+1]; //获取资源类型
                            if(res_type === 0) //如果资源类型是图像
                            {
                                CT_ContainerUI[data_i+14] = img; //设置背景图像
                                CT_Repaint = 1; //请求重绘
                            }
                            else
                            {
                                cprint("ERROR : The resource index corresponding to the resource file is not image.");
                            }
                        }
                        else
                        {
                            CT_ContainerUI[data_i+14] = img; //设置背景图像
                            CT_Repaint = 1; //请求重绘
                        }
                    }
                    if(CTui.type === 2 || CTui.type === 3 || CTui.type === 4) //如果UI对象是文本 复选框 单选框
                    {
                        cprint("ERROR : The UI object not support the background image."); //输出错误
                    }
                }
            }
        }
        else //如果对象不是UI对象
        {
            cprint("ERROR : Not is the UI object."); //输出错误
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// UI颜色设置
//--------------------------------------------------------------------
function CTui_set_color(CTui,prop,col)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTui.type >= 1) //如果对象是UI对象
        {
            var ui_index = CTui.index; //ui对象索引
            var data_i = ui_index * 30; //UI数据索引
            if(CT_ContainerUI[data_i] !== 0) //如果UI容器中指定UI对象的数据不为空
            {
                var Cui_id = CT_ContainerUI[data_i+1]; //UI容器中指定UI对象的ID
                if(CTui.id === Cui_id) //如果UI对象id等于容器中指定UI对象的ID
                {
                    if(prop === "back") //如果属性是背景
                    {
                        if(CTui.type === 1 || CTui.type === 3 || CTui.type === 4 || CTui.type === 5 || CTui.type === 6) //如果UI对象是按钮 复选框 单选框 进度条 文本框
                        {
                            CT_ContainerUI[data_i+8] = col; //设置背景颜色
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
                            CT_ContainerUI[data_i+9] = col; //设置上边框颜色
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
                            CT_ContainerUI[data_i+10] = col; //设置下边框颜色
                            CT_Repaint = 1; //请求重绘
                        }
                        if(CTui.type === 3 || CTui.type === 4) //如果UI对象是复选框 单选框
                        {
                            CT_ContainerUI[data_i+9] = col; //设置边框颜色
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
                            CT_ContainerUI[data_i+11] = col; //设置下边框颜色
                            CT_Repaint = 1; //请求重绘
                        }
                        if(CTui.type === 3 || CTui.type === 4) //如果UI对象是复选框 单选框
                        {
                            CT_ContainerUI[data_i+9] = col; //设置复选框边框颜色
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
                            CT_ContainerUI[data_i+12] = col; //设置下边框颜色
                            CT_Repaint = 1; //请求重绘
                        }
                        if(CTui.type === 3 || CTui.type === 4) //如果UI对象是复选框 单选框
                        {
                            CT_ContainerUI[data_i+9] = col; //设置边框颜色
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
                            CT_ContainerUI[data_i+13] = col; //设置文本颜色
                            CT_Repaint = 1; //请求重绘
                        }
                        if(CTui.type === 2) //如果UI对象是文本
                        {
                            CT_ContainerUI[data_i+6] = col; //设置文本颜色
                            CT_Repaint = 1; //请求重绘
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
                            CT_ContainerUI[data_i+10] = col; //设置部件颜色
                            CT_Repaint = 1; //请求重绘
                        }
                        if(CTui.type === 5) //如果UI对象是进度条
                        {
                            CT_ContainerUI[data_i+13] = col; //设置部件颜色
                            CT_Repaint = 1; //请求重绘
                        }
                        if(CTui.type === 1 || CTui.type === 2 || CTui.type === 6)
                        {
                            cprint("ERROR : The UI object not have this property."); //输出错误
                        }
                    }
                }
            }
        }
        else //如果对象不是UI对象
        {
            cprint("ERROR : Not is the UI object."); //输出错误
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// UI图像字体设置
//--------------------------------------------------------------------
function CTui_set_imgfont(CTui,imgfont)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTui.type === 1 || CTui.type === 2 || CTui.type === 6) //如果UI对象支持图像字体
        {
            var ui_index = CTui.index; //ui对象索引
            var data_i = ui_index * 30; //UI数据索引
            if(CT_ContainerUI[data_i] !== 0) //如果UI容器中指定UI对象的数据不为空
            {
                var Cui_id = CT_ContainerUI[data_i+1]; //UI容器中指定UI对象的ID
                if(CTui.id === Cui_id) //如果UI对象id等于容器中指定UI对象的ID
                {
                    if(CTui.type === 1) //如果UI对象是按钮
                    {
                        if(imgfont != null) //如果图像字体不为空
                        {
                            var str = CT_ContainerUI[data_i+15]; //按钮显示文本
                            var str_w = CT_ImgStringMeasure(imgfont.CharNumber,imgfont.CharGap,imgfont.CharList,imgfont.GlyphList,str); //测量图像字符串像素宽度
                            //将图像字体变量写入UI容器
                            CT_ContainerUI[data_i+16] = str_w;
                            CT_ContainerUI[data_i+17] = imgfont.CharHeight;
                            CT_ContainerUI[data_i+23] = 1;
                            CT_ContainerUI[data_i+24] = imgfont.FontImg;
                            CT_ContainerUI[data_i+25] = imgfont.CharNumber;
                            CT_ContainerUI[data_i+26] = imgfont.CharGap;
                            CT_ContainerUI[data_i+27] = imgfont.CharList;
                            CT_ContainerUI[data_i+28] = imgfont.GlyphList;
                            CT_Repaint = 1; //请求重绘
                        }
                        else
                        {
                            var str = CT_ContainerUI[data_i+15]; //按钮显示文本
                            var str_w = string_pxwidth(str,CTui.size); //测量图像字符串像素宽度
                            //将一般字体变量写入UI容器
                            CT_ContainerUI[data_i+16] = str_w;
                            CT_ContainerUI[data_i+17] = CTui.size;
                            //清除图像字体变量
                            CT_ContainerUI[data_i+23] = 0;
                            CT_ContainerUI[data_i+24] = 0;
                            CT_ContainerUI[data_i+25] = 0;
                            CT_ContainerUI[data_i+26] = 0;
                            CT_ContainerUI[data_i+27] = null;
                            CT_ContainerUI[data_i+28] = null;
                            CT_Repaint = 1; //请求重绘
                        }
                    }
                    if(CTui.type === 2) //如果UI对象是文本
                    {
                        if(imgfont != null) //如果图像字体不为空
                        {
                            //将图像字体变量写入UI容器
                            CT_ContainerUI[data_i+9] = 1;
                            CT_ContainerUI[data_i+10] = imgfont.FontImg;
                            CT_ContainerUI[data_i+11] = imgfont.CharNumber;
                            CT_ContainerUI[data_i+12] = imgfont.CharGap;
                            CT_ContainerUI[data_i+13] = imgfont.CharList;
                            CT_ContainerUI[data_i+14] = imgfont.GlyphList;
                            CT_Repaint = 1; //请求重绘
                        }
                        else
                        {
                            //清除图像字体变量
                            CT_ContainerUI[data_i+9] = 0;
                            CT_ContainerUI[data_i+10] = 0;
                            CT_ContainerUI[data_i+11] = 0;
                            CT_ContainerUI[data_i+12] = 0;
                            CT_ContainerUI[data_i+13] = null;
                            CT_ContainerUI[data_i+14] = null;
                            CT_Repaint = 1; //请求重绘
                        }
                    }
                    if(CTui.type === 6) //如果UI对象是文本框
                    {
                        if(imgfont != null) //如果图像字体不为空
                        {
                            //将图像字体变量写入UI容器
                            CT_ContainerUI[data_i+24] = 1;
                            CT_ContainerUI[data_i+25] = imgfont.FontImg;
                            CT_ContainerUI[data_i+26] = imgfont.CharNumber;
                            CT_ContainerUI[data_i+27] = imgfont.CharGap;
                            CT_ContainerUI[data_i+28] = imgfont.CharList;
                            CT_ContainerUI[data_i+29] = imgfont.GlyphList;
                        }
                        else
                        {
                            //清除图像字体变量
                            CT_ContainerUI[data_i+24] = 0;
                            CT_ContainerUI[data_i+25] = 0;
                            CT_ContainerUI[data_i+26] = 0;
                            CT_ContainerUI[data_i+27] = 0;
                            CT_ContainerUI[data_i+28] = null;
                            CT_ContainerUI[data_i+29] = null;
                        }
                    }
                }
            }
        }
        else
        {
            cprint("ERROR : The UI object not support imgfont.");
        }
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
            var data_i = CTui.index * 30; //UI数据索引
            if(CT_ContainerUI[data_i] !== 0) //如果UI容器中指定UI对象的数据不为空
            {
                var Cui_id = CT_ContainerUI[data_i+1]; //UI容器中指定UI对象的ID
                if(CTui.id === Cui_id) //如果UI对象id等于容器中指定UI对象的ID
                {
                    return CT_ContainerUI[data_i+18]; //指定按钮对象的状态
                }
            }
        }
        else //如果UI对象不是按钮
        {
            cprint("ERROR : Not is the button object."); //输出错误
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
            var data_i = CTui.index * 30; //UI数据索引
            if(CT_ContainerUI[data_i] !== 0) //如果UI容器中指定UI对象的数据不为空
            {
                var Cui_id = CT_ContainerUI[data_i+1]; //UI容器中指定UI对象的ID
                if(CTui.id === Cui_id) //如果UI对象id等于容器中指定UI对象的ID
                {
                    return CT_ContainerUI[data_i+19]; //指定按钮对象的状态
                }
            }
        }
        else //如果UI对象不是按钮
        {
            cprint("ERROR : Not is the button object."); //输出错误
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
            var data_i = CTui.index * 30; //UI数据索引
            if(CT_ContainerUI[data_i] !== 0) //如果UI容器中指定UI对象的数据不为空
            {
                var Cui_id = CT_ContainerUI[data_i+1]; //UI容器中指定UI对象的ID
                if(CTui.id === Cui_id) //如果UI对象id等于容器中指定UI对象的ID
                {
                    return CT_ContainerUI[data_i+20]; //指定按钮对象的状态
                }
            }
        }
        else //如果UI对象不是按钮
        {
            cprint("ERROR : Not is the button object."); //输出错误
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
            var data_i = CTui.index * 30; //UI数据索引
            if(CT_ContainerUI[data_i] !== 0) //如果UI容器中指定UI对象的数据不为空
            {
                var Cui_id = CT_ContainerUI[data_i+1]; //UI容器中指定UI对象的ID
                if(CTui.id === Cui_id) //如果UI对象id等于容器中指定UI对象的ID
                {
                    return CT_ContainerUI[data_i+21]; //返回指定按钮对象的状态
                }
            }
        }
        else //如果UI对象不是按钮
        {
            cprint("ERROR : Not is the button object."); //输出错误
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
            var data_i = CTui.index * 30; //UI数据索引
            if(CT_ContainerUI[data_i] !== 0) //如果UI容器中指定UI对象的数据不为空
            {
                var Cui_id = CT_ContainerUI[data_i+1]; //UI容器中指定UI对象的ID
                if(CTui.id === Cui_id) //如果UI对象id等于容器中指定UI对象的ID
                {
                    return CT_ContainerUI[data_i+11]; //返回复选框状态
                }
            }
        }
        else //如果UI对象不是复选框
        {
            cprint("ERROR : Not is the checkbox object."); //输出错误
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
            var data_i = CTui.index * 30; //UI数据索引
            if(CT_ContainerUI[data_i] !== 0) //如果UI容器中指定单选框对象数据不为空
            {
                var Cui_id = CT_ContainerUI[data_i+1]; //UI容器中指定UI对象的ID
                if(CTui.id === Cui_id) //如果UI对象id等于容器中指定UI对象的ID
                {
                    return CT_ContainerUI[data_i+12]; //返回单选框状态
                }
            }
        }
        else //如果UI对象不是单选框
        {
            cprint("ERROR : Not is the radio object."); //输出错误
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
            var data_i = CTui.index * 30; //UI数据索引
            if(CT_ContainerUI[data_i] !== 0) //如果UI容器中指定进度条对象的数据不为空
            {
                var Cui_id = CT_ContainerUI[data_i+1]; //UI容器中指定UI对象的ID
                if(CTui.id === Cui_id) //如果UI对象id等于容器中指定UI对象的ID
                {
                    var p_w = CT_ContainerUI[data_i+6]; //进度条宽度
                    var p_maxval = CT_ContainerUI[data_i+17]; //进度条最大值
                    var bp_w = 0; //进度条点宽度
                    if(val >= 0) //如果进度条值大于等于0
                    {
                        if(val <= p_maxval) //如果进度条值小于等于最大值
                        {
                            bp_w = parseInt((p_w - 8) / p_maxval * val); //进度条点宽度
                            CT_ContainerUI[data_i+16] = val; //设置进度条值
                            CT_ContainerUI[data_i+15] = bp_w; //设置点宽度
                            CT_Repaint = 1; //请求重绘
                        }
                        else
                        {
                            cprint("ERROR : The progressbar value greater than maximum.");
                        }
                    }
                    else
                    {
                        cprint("ERROR : The progressbar value is error."); //输出错误
                    }
                }
            }
        }
        else //如果UI对象不是进度条
        {
            cprint("ERROR : Not is the progressbar object."); //输出错误
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
            var data_i = CTui.index * 30; //UI数据索引
            if(CT_ContainerUI[data_i] !== 0) //如果UI容器中指定文本框对象的数据不为空
            {
                var Cui_id = CT_ContainerUI[data_i+1]; //UI容器中指定UI对象的ID
                if(CTui.id === Cui_id) //如果UI对象id等于容器中指定UI对象的ID
                {
                    return CT_ContainerUI[data_i+15]; //返回文本框内容
                }
            }
        }
        else //如果UI对象不是复选框
        {
            cprint("ERROR : Not is the textbox object."); //输出错误
        }
    }
    return "";
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 文本框内容设置
//--------------------------------------------------------------------
function textbox_set_string(CTui,str)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTui.type === 6) //如果UI对象是文本框
        {
            var data_i = CTui.index * 30; //UI数据索引
            if(CT_ContainerUI[data_i] !== 0) //如果UI容器中指定文本框对象的数据不为空
            {
                var Cui_id = CT_ContainerUI[data_i+1]; //UI容器中指定UI对象的ID
                if(CTui.id === Cui_id) //如果UI对象id等于容器中指定UI对象的ID
                {
                    CT_ContainerUI[data_i+15] = str; //设置文本框内容
                    CT_Repaint = 1; //请求重绘
                }
            }
        }
        else //如果UI对象不是复选框
        {
            cprint("ERROR : Not is the textbox object."); //输出错误
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 图像元件图像设置
//--------------------------------------------------------------------
function imagement_set_image(CTui,img,subnum)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTui.type === 7) //如果UI对象是图像元件
        {
            var data_i = CTui.index * 30; //UI数据索引
            if(CT_ContainerUI[data_i] !== 0) //如果UI容器中指定图像元件对象的数据不为空
            {
                var Cui_id = CT_ContainerUI[data_i+1]; //UI容器中指定UI对象的ID
                if(CTui.id === Cui_id) //如果UI对象id等于容器中指定UI对象的ID
                {
                    if(img !== -1) //如果图像不为空
                    {
                        var ldata_i = img * 5; //资源参数数据索引
                        var res_type = CT_ResourceArgList[ldata_i+1]; //获取资源类型
                        var subimg_w = 0; //sprite子图像宽度
                        var subimg_h = 0; //子图像高度
                        if(res_type === 0) //如果资源类型是图像
                        {
                            var image_w = CT_ResourceArgList[ldata_i+2]; //图像元件图像宽度
                            var image_h = CT_ResourceArgList[ldata_i+3]; //图像元件图像高度
                            subimg_w = parseInt(image_w / subnum); //sprite子图像宽度
                            subimg_h = image_h; //子图像高度
                        }
                        //将图像元件数据写入UI容器
                        CT_ContainerUI[data_i+6] = img;
                        CT_ContainerUI[data_i+7] = 0;
                        CT_ContainerUI[data_i+8] = subnum;
                        CT_ContainerUI[data_i+9] = subimg_w;
                        CT_ContainerUI[data_i+10] = subimg_h;
                        CT_Repaint = 1; //请求重绘
                    }
                    else
                    {
                        cprint("ERROR : The resource index corresponding to the resource file is not image.");
                    }
                }
            }
        }
        else
        {
            cprint("ERROR : Not is the imagement object.");
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 图片元件子图像设置
//--------------------------------------------------------------------
function imagement_set_subimg(CTui,i)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CTui.type === 7) //如果UI对象是图像元件
        {
            var data_i = CTui.index * 30; //UI数据索引
            if(CT_ContainerUI[data_i] !== 0) //如果UI容器中指定图像元件对象的数据不为空
            {
                var Cui_id = CT_ContainerUI[data_i+1]; //UI容器中指定UI对象的ID
                if(CTui.id === Cui_id) //如果UI对象id等于容器中指定UI对象的ID
                {
                    var subnum = CT_ContainerUI[data_i+8]; //图像元件子图像数量
                    if(subnum >= 1 && i <= subnum - 1) //如果图像元件参数正确
                    {
                        CT_ContainerUI[data_i+7] = i; //设置图像元件子图像
                        CT_Repaint = 1; //请求重绘
                    }
                    else
                    {
                        cprint("ERROR : The imagement subimage is error.");
                    }
                }
            }
        }
    }
}
//--------------------------------------------------------------------