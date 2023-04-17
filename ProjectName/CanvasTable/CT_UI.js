"use strict";

//--------------------------------------------------------------------
// 容器格式
//--------------------------------------------------------------------
// [窗口数据,...]
// 窗口:占位符,id,层,x,y,宽度,高度,背景颜色,上边框颜色,下边框颜色,左边框颜色,右边框颜色,背景图像;
// 
// [UI数据,...]
// 按钮:占位符,id,对应窗口的索引,1,x,y,宽度,高度,背景颜色,上边框颜色,下边框颜色,左边框颜色,右边框颜色,文本颜色,背景图片,文本,文本宽度,文本高度,点击状态,始终按下状态,按下状态,松开状态,空,使用图像字体,字体图像索引,字体字符数,字体间隙,字体字符列表,字体字形列表
// 文本:占位符,id,对应窗口的索引,2,x,y,文本颜色,文本,字体大小,使用图像字体,字体图像索引,字体字符数,字体间隙,字体字符列表,字体字形列表
// 复选框:占位符,id,对应窗口的索引,3,x,y,宽度,高度,背景颜色,边框颜色,部件颜色,状态
// 单选框:占位符,id,对应窗口的索引,4,x,y,宽度,高度,背景颜色,边框颜色,部件颜色,组,状态
// 进度条:占位符,id,对应窗口的索引,5,x,y,宽度,高度,背景颜色,上边框颜色,下边框颜色,左边框颜色,右边框颜色,部件颜色,背景图片,部件宽度,值,最大值
// 文本框:占位符,id,对应窗口的索引,6,x,y,宽度,高度,背景颜色,上边框颜色,下边框颜色,左边框颜色,右边框颜色,字体颜色,背景图片,值,密码,数字,最大字符数,只读,子文本框,子文本框名称,字体大小,空,使用图像字体,字体图像索引,字体字符数,字体间隙,字体字符列表,字体字形列表
// 图像元件:占位符,id,对应窗口的索引,7,x,y,图像,子图像,子图像数量,子图像宽度,子图像高度
//--------------------------------------------------------------------
var CT_UIID = 0; //UI ID
var CT_ContainerWindow = []; //窗口容器
var CT_WindowLayerStatusList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //窗口层状态列表
var CT_ContainerWindowLength = 0; //窗口容器长度
var CT_ContainerUI = []; //UI容器
var CT_ContainerUILength = 0; //UI容器长度
var CT_Textbox_Index = -1; //点击文本框的索引
var CT_DownX = -1; //鼠标按下的位置x
var CT_DownY = -1; //鼠标按下的位置y
var CT_DialogShow = 0; //对话框显示
var CT_Dialog_Index = -1; //对话框对应文本框的索引
//--------------------------------------------------------------------
// 获取UI对象ID
//--------------------------------------------------------------------
function CT_UIGetID()
{
    var id = CT_UIID; //当前UI ID
    CT_UIID ++; //UI ID +1
    if(CT_UIID > 2000000000) //如果UI ID大于2000000000
    {
        CT_UIID = 1000000000; //UI ID等于1000000000
    }
    return id; //返回 UI ID
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// UI运行
//--------------------------------------------------------------------
function CT_UIRun()
{
    var i;
    var data_i;
    for(i=0;i<CT_ContainerWindowLength;i++) //遍历窗口容器
    {
        data_i = i * 15; //窗口数据索引
        if(CT_ContainerWindow[data_i] !== 0) //如果当前窗口不为空
        {
            var win_x = CT_ContainerWindow[data_i+3]; //窗口位置x
            var win_y = CT_ContainerWindow[data_i+4]; //窗口位置y
            var win_w = CT_ContainerWindow[data_i+5]; //窗口宽度
            var win_h = CT_ContainerWindow[data_i+6]; //窗口高度
            var i2;
            for(i2=0;i2<CT_ContainerUILength;i2++) //遍历UI容器
            {
                data_i = i2 * 30; //UI数据索引
                if(CT_ContainerUI[data_i] !== 0) //如果当前UI对象不为空
                {
                    var ui_win_index = CT_ContainerUI[data_i+2]; //当前UI对象对应窗口索引
                    if(ui_win_index === i) //如果当前UI对象对应窗口索引等于当前窗口索引
                    {
                        var ui_x = win_x + CT_ContainerUI[data_i+4]; //当前UI位置x
                        var ui_y = win_y + CT_ContainerUI[data_i+5]; //当前UI位置y
                        var ui_w = CT_ContainerUI[data_i+6]; //当前UI宽度
                        var ui_h = CT_ContainerUI[data_i+7]; //当前UI高度
                        var ui_type = CT_ContainerUI[data_i+3]; //当前UI类型
                        if(ui_type === 1) //如果当前UI对象是按钮
                        {
                            if(mouse_down(mkey_left)) //如果鼠标按下
                            {
                                CT_DownX = mouse_x(); //鼠标按下的位置x
                                CT_DownY = mouse_y(); //鼠标按下的位置y
                                if(CT_DownX >= ui_x && CT_DownY >= ui_y && CT_DownX < ui_x + ui_w && CT_DownY < ui_y + ui_h) //如果鼠标按下的位置在UI范围内
                                {
                                    if(CT_DialogShow === 0) //如果对话框没有显示
                                    {
                                        CT_ContainerUI[data_i+19] = 1; //设置当前按钮的始终按下状态
                                        CT_ContainerUI[data_i+20] = 1; //设置当前按钮的按下状态
                                    }
                                }
                            }
                            if(mouse_up(mkey_left)) //如果鼠标松开
                            {
                                CT_ContainerUI[data_i+19] = 0; //设置当前按钮的始终按下状态
                                var up_x = mouse_x(); //鼠标松开的位置x
                                var up_y = mouse_y(); //鼠标松开的位置y
                                if(CT_DownX >= ui_x && CT_DownY >= ui_y && CT_DownX < ui_x + ui_w && CT_DownY < ui_y + ui_h && up_x >= ui_x && up_y >= ui_y && up_x < ui_x + ui_w && up_y < ui_y + ui_h) //如果鼠标按下的位置和松开的位置都在UI范围内
                                {
                                    if(CT_DialogShow === 0) //如果对话框没有显示
                                    {
                                        CT_ContainerUI[data_i+18] = 1; //设置当前按钮的点击状态
                                        CT_ContainerUI[data_i+21] = 1; //设置当前按钮的松开状态
                                    }
                                }
                            }
                        }
                        if(ui_type === 3) //如果当前UI对象是复选框
                        {
                            if(mouse_down(mkey_left)) //如果鼠标按下
                            {
                                CT_DownX = mouse_x(); //鼠标按下的位置x
                                CT_DownY = mouse_y(); //鼠标按下的位置y
                            }
                            if(mouse_up(mkey_left)) //如果鼠标松开
                            {
                                var up_x = mouse_x(); //鼠标松开的位置x
                                var up_y = mouse_y(); //鼠标松开的位置y
                                if(CT_DownX >= ui_x && CT_DownY >= ui_y && CT_DownX < ui_x + ui_w && CT_DownY < ui_y + ui_h && up_x >= ui_x && up_y >= ui_y && up_x < ui_x + ui_w && up_y < ui_y + ui_h) //如果鼠标按下的位置和松开的位置都在UI范围内
                                {
                                    var c_s = CT_ContainerUI[data_i+11]; //复选框状态
                                    if(c_s === 0) //如果复选框没有勾选
                                    {
                                        CT_ContainerUI[data_i+11] = 1; //设置复选框状态
                                        CT_Repaint = 1; //请求重绘
                                        return; //中断
                                    }
                                    if(c_s === 1) //如果复选框勾选
                                    {
                                        CT_ContainerUI[data_i+11] = 0; //设置复选框状态
                                        CT_Repaint = 1; //请求重绘
                                        return; //中断
                                    }
                                }
                            }
                        }
                        if(ui_type === 4) //如果当前UI对象是单选框
                        {
                            if(mouse_down(mkey_left)) //如果鼠标按下
                            {
                                CT_DownX = mouse_x(); //鼠标按下的位置x
                                CT_DownY = mouse_y(); //鼠标按下的位置y
                            }
                            if(mouse_up(mkey_left)) //如果鼠标松开
                            {
                                var up_x = mouse_x(); //鼠标松开的位置x
                                var up_y = mouse_y(); //鼠标松开的位置y
                                if(CT_DownX >= ui_x && CT_DownY >= ui_y && CT_DownX < ui_x + ui_w + 1 && CT_DownY < ui_y + ui_h + 1 && up_x >= ui_x && up_y >= ui_y && up_x < ui_x + ui_w + 1 && up_y < ui_y + ui_h + 1) //如果鼠标按下的位置和松开的位置都在UI范围内
                                {
                                    var radio_g = CT_ContainerUI[data_i+11]; //当前单选框组
                                    var i3;
                                    var rddata_i;
                                    for(i3=0;i3<CT_ContainerUILength;i3++) //遍历UI容器
                                    {
                                        rddata_i = i3 * 30; //单选框数据索引
                                        if(CT_ContainerUI[rddata_i] !== 0) //如果当前UI对象不为空
                                        {
                                            var c_ui_type = CT_ContainerUI[rddata_i+3]; //当前UI对象类型
                                            if(c_ui_type === 4) //如果当前UI对象类型是单选框
                                            {
                                                var c_radio_g = CT_ContainerUI[rddata_i+11]; //当前单选框组
                                                if(c_radio_g === radio_g) //如果当前单选框的组等于当前点击的单选框的组
                                                {
                                                    CT_ContainerUI[rddata_i+12] = 0; //将当前单选框状态设置为0
                                                }
                                            }
                                        }
                                    }
                                    CT_ContainerUI[data_i+12] = 1; //将当前单选框状态设置为1
                                    CT_Repaint = 1; //请求重绘
                                }
                            }
                        }
                        if(ui_type === 6) //如果当前UI对象是文本框
                        {
                            if(mouse_down(mkey_left)) //如果鼠标按下
                            {
                                CT_DownX = mouse_x(); //鼠标按下的位置x
                                CT_DownY = mouse_y(); //鼠标按下的位置y
                            }
                            if(mouse_up(mkey_left)) //如果鼠标松开
                            {
                                var up_x = mouse_x(); //鼠标松开的位置x
                                var up_y = mouse_y(); //鼠标松开的位置y
                                if(CT_DownX >= ui_x && CT_DownY >= ui_y && CT_DownX < ui_x + ui_w && CT_DownY < ui_y + ui_h && up_x >= ui_x && up_y >= ui_y && up_x < ui_x + ui_w && up_y < ui_y + ui_h) //如果鼠标按下的位置和松开的位置都在UI范围内
                                {
                                    var subbox = CT_ContainerUI[data_i+20]; //子文本框
                                    if(subbox === 0) //如果不使用子文本框
                                    {
                                        CT_Textbox_Index = i2; //点击的文本框在窗口中的索引
                                    }
                                    if(subbox === 1 || CT_DEVICE === 1) //如果使用子文本框或设备是移动平台
                                    {
                                        var readonly = CT_ContainerUI[data_i+19]; //文本框只读参数
                                        if(readonly === 0) //如果文本框不是只读
                                        {
                                            var t_val = CT_ContainerUI[data_i+15]; //文本框值
                                            var t_name = CT_ContainerUI[data_i+21]; //文本框名称
                                            var t_max = CT_ContainerUI[data_i+18]; //文本框最大字符数
                                            var t_pass = CT_ContainerUI[data_i+16]; //文本框密码
                                            var t_numb = CT_ContainerUI[data_i+17]; //文本框数字
                                            CT_Textbox_Index = -1; //取消点击的文本框
                                            CT_Dialog_Index = i2; //对话框对应文本框的索引
                                            CT_DialogCreate(t_val,t_name,t_max,t_pass,t_numb); //创建子文本框
                                        }
                                    }
                                    CT_Repaint = 1; //请求重绘
                                    return; //中断
                                }
                            }
                            if(CT_Textbox_Index === i2) //如果点击了文本框
                            {
                                data_i = CT_Textbox_Index * 30; //文本框数据索引
                                if(CT_ContainerUI[data_i] !== 0) //如果点击的文本框不为空
                                {
                                    var readonly = CT_ContainerUI[data_i+19]; //文本框只读参数
                                    if(readonly === 0) //如果文本框不是只读
                                    {
                                        if(CT_KeyChar !== "" && CT_KeyChar !== "\b") //如果输入了字符
                                        {
                                            var tbox_length = CT_ContainerUI[data_i+15].length; //文本框字符串长度
                                            var tbox_max = CT_ContainerUI[data_i+18]; //文本框最大字符数
                                            var tbox_number = CT_ContainerUI[data_i+17]; //数字文本框参数
                                            if(tbox_length < tbox_max) //如果文本框字符串长度小于文本框最大字符数
                                            {
                                                if(tbox_number !== 1) //如果文本框不是数字文本框
                                                {
                                                    CT_ContainerUI[data_i+15] += CT_KeyChar; //文本框增加字符
                                                    CT_Repaint = 1; //请求重绘
                                                }
                                                else //如果文本框是数字文本框
                                                {
                                                    if(CT_KeyChar === "0" || CT_KeyChar === "1" || CT_KeyChar === "2" || CT_KeyChar === "3" || CT_KeyChar === "4" || CT_KeyChar === "5" || CT_KeyChar === "6" || CT_KeyChar === "7" || CT_KeyChar === "8" || CT_KeyChar === "9") //如果当前输入的字符是数字
                                                    {
                                                        CT_ContainerUI[data_i+15] += CT_KeyChar; //文本框增加字符
                                                        CT_Repaint = 1; //请求重绘
                                                    }
                                                }
                                            }
                                        }
                                        if(CT_KeyChar === "\b") //如果输入了退格
                                        {
                                            var tbox_length = CT_ContainerUI[data_i+15].length; //文本框字符串长度
                                            if(tbox_length > 0) //如果文本框字符串长度大于0
                                            {
                                                CT_ContainerUI[data_i+15] = CT_ContainerUI[data_i+15].slice(0,tbox_length-1); //文本框字符串减少一个字符
                                                CT_Repaint = 1; //请求重绘
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// UI渲染
//--------------------------------------------------------------------
function CT_UIRender(l)
{
    var i;
    var data_i;
    var win_index = 0; //当前窗口索引
    for(i=0;i<CT_ContainerWindowLength;i++) //遍历窗口容器
    {
        win_index = i; //当前窗口索引
        data_i = i * 15; //窗口数据索引
        if(CT_ContainerWindow[data_i] !== 0) //如果当前窗口不为空
        {
            var window_layer = CT_ContainerWindow[data_i+2]; //当前窗口层
            if(window_layer === l) //如果当前窗口层等于渲染层
            {
                var win_x = CT_ContainerWindow[data_i+3]; //当前窗口位置x
                var win_y = CT_ContainerWindow[data_i+4]; //当前窗口位置y
                var win_w = CT_ContainerWindow[data_i+5]; //当前窗口宽度
                var win_h = CT_ContainerWindow[data_i+6]; //当前窗口高度
                var win_cbg = CT_ContainerWindow[data_i+7]; //当前窗口背景颜色
                var win_cbu = CT_ContainerWindow[data_i+8]; //当前窗口上边框颜色
                var win_cbd = CT_ContainerWindow[data_i+9]; //当前窗口下边框颜色
                var win_cbl = CT_ContainerWindow[data_i+10]; //当前窗口左边框颜色
                var win_cbr = CT_ContainerWindow[data_i+11]; //当前窗口右边框颜色
                var win_img = CT_ContainerWindow[data_i+12]; //当前窗口背景图片
                if(win_img !== -1) //如果窗口背景图片不为空
                {
                    CT_OffCanvas_ImagePart(win_x,win_y,win_img,255,0,0,win_w,win_h); //绘制背景图像
                }
                else //如果窗口背景图片为空
                {
                    CT_OffCanvas_Rectangle(win_x,win_y,win_w,win_h,win_cbg,1); //绘制窗口背景
                    CT_OffCanvas_Rectangle(win_x,win_y-2,win_w,2,win_cbu,1); //绘制窗口上边框
                    CT_OffCanvas_Rectangle(win_x,win_y+win_h,win_w,2,win_cbd,1); //绘制窗口下边框
                    CT_OffCanvas_Rectangle(win_x-2,win_y-2,2,win_h+4,win_cbl,1); //绘制窗口左边框
                    CT_OffCanvas_Rectangle(win_x+win_w,win_y-2,2,win_h+4,win_cbr,1); //绘制窗口右边框
                }
                var i2;
                for(i2=0;i2<CT_ContainerUILength;i2++) //遍历UI容器
                {
                    data_i = i2 * 30; //UI数据索引
                    if(CT_ContainerUI[data_i] !== 0) //如果当前UI对象不为空
                    {
                        var ui_win_index = CT_ContainerUI[data_i+2]; //当前UI对象对应窗口的索引
                        if(ui_win_index === win_index) //如果当前UI对象的窗口索引等于当前窗口索引
                        {
                            var ui_type = CT_ContainerUI[data_i+3]; //当前UI对象类型
                            if(ui_type === 1) //如果当前UI对象是按钮
                            {
                                var b_x = win_x + CT_ContainerUI[data_i+4]; //当前按钮位置x
                                var b_y = win_y + CT_ContainerUI[data_i+5]; //当前按钮位置y
                                var b_w = CT_ContainerUI[data_i+6]; //当前按钮宽度
                                var b_h = CT_ContainerUI[data_i+7]; //当前按钮高度
                                var b_cbg = CT_ContainerUI[data_i+8]; //当前按钮背景颜色
                                var b_cbu = CT_ContainerUI[data_i+9]; //当前按钮上边框颜色
                                var b_cbd = CT_ContainerUI[data_i+10]; //当前按钮下边框颜色
                                var b_cbl = CT_ContainerUI[data_i+11]; //当前按钮左边框颜色
                                var b_cbr = CT_ContainerUI[data_i+12]; //当前按钮右边框颜色
                                var b_ct = CT_ContainerUI[data_i+13]; //当前按钮文本颜色
                                var b_img = CT_ContainerUI[data_i+14]; //当前按钮背景图片
                                var b_t = CT_ContainerUI[data_i+15]; //当前按钮显示文本
                                var b_tw = CT_ContainerUI[data_i+16]; //当前按钮文本宽度
                                var b_th = CT_ContainerUI[data_i+17]; //当前按钮文本高度
                                var b_tx = parseInt(b_x + ((b_w - b_tw) / 2)); //当前按钮显示文本位置x
                                var b_ty = parseInt(b_y + ((b_h - b_th) / 2)); //当前按钮显示文本位置y
                                var imgfont_use = CT_ContainerUI[data_i+23]; //当前按钮是否使用图像字体
                                if(b_img !== -1) //如果按钮背景图片不为空
                                {
                                    CT_OffCanvas_ImagePart(b_x,b_y,b_img,255,0,0,b_w,b_h); //绘制按钮背景图片
                                }
                                else //如果按钮背景图片为空
                                {
                                    CT_OffCanvas_Rectangle(b_x,b_y,b_w,b_h,b_cbg,1); //绘制按钮背景
                                    CT_OffCanvas_Rectangle(b_x,b_y,b_w,2,b_cbu,1); //绘制按钮上边框
                                    CT_OffCanvas_Rectangle(b_x,b_y+b_h-2,b_w,2,b_cbd,1); //绘制按钮下边框
                                    CT_OffCanvas_Rectangle(b_x,b_y,2,b_h-2,b_cbl,1); //绘制按钮左边框
                                    CT_OffCanvas_Rectangle(b_x+b_w-2,b_y,2,b_h-2,b_cbr,1); //绘制按钮右边框
                                }
                                if(imgfont_use === 1) //如果按钮使用图像字体
                                {
                                    var b_font_img = CT_ContainerUI[data_i+24]; //当前按钮的字体图像
                                    var b_font_charnum = CT_ContainerUI[data_i+25]; //当前按钮的字体字符数
                                    var b_font_chargap = CT_ContainerUI[data_i+26]; //当前按钮的字体间隙
                                    var b_font_charlist = CT_ContainerUI[data_i+27]; //当前按钮的字体字符列表
                                    var b_font_glyphlist = CT_ContainerUI[data_i+28]; //当前按钮的字体字形列表
                                    CT_OffCanvas_ImgString(b_tx,b_ty,b_ct,b_t,b_font_img,b_font_charnum,b_font_chargap,b_font_charlist,b_font_glyphlist); //绘制按钮文本
                                }
                                if(imgfont_use === 0) //如果按钮使用一般字体
                                {
                                    CT_OffCanvas_String(b_tx,b_ty,b_th,b_ct,b_t); //绘制按钮文本
                                }
                            }
                            if(ui_type === 2) //如果当前UI对象是文本
                            {
                                var t_x = win_x + CT_ContainerUI[data_i+4]; //当前文本位置x
                                var t_y = win_y + CT_ContainerUI[data_i+5]; //当前文本位置y
                                var t_c = CT_ContainerUI[data_i+6]; //当前文本颜色
                                var t_t = CT_ContainerUI[data_i+7]; //当前文本
                                var imgfont_use = CT_ContainerUI[data_i+9]; //当前文本是否使用图像字体
                                if(imgfont_use === 0) //如果文本使用一般字体
                                {
                                    var t_s = CT_ContainerUI[data_i+8]; //当前文本字体大小
                                    CT_OffCanvas_String(t_x,t_y,t_s,t_c,t_t); //绘制文本
                                }
                                if(imgfont_use === 1) //如果文本使用图像字体
                                {
                                    var t_font_img = CT_ContainerUI[data_i+10]; //当前文本的字体图像
                                    var t_font_charnum = CT_ContainerUI[data_i+11]; //当前文本的字体字符数
                                    var t_font_chargap = CT_ContainerUI[data_i+12]; //当前文本的字体间隙
                                    var t_font_charlist = CT_ContainerUI[data_i+13]; //当前文本的字体字符列表
                                    var t_font_glyphlist = CT_ContainerUI[data_i+14]; //当前文本的字体字形列表
                                    CT_OffCanvas_ImgString(t_x,t_y,t_c,t_t,t_font_img,t_font_charnum,t_font_chargap,t_font_charlist,t_font_glyphlist); //绘制按钮文本
                                }
                            }
                            if(ui_type === 3) //如果当前UI对象是复选框
                            {
                                var c_x = win_x + CT_ContainerUI[data_i+4]; //当前复选框位置x
                                var c_y = win_y + CT_ContainerUI[data_i+5]; //当前复选框位置y
                                var c_w = CT_ContainerUI[data_i+6]; //当前复选框宽度
                                var c_h = CT_ContainerUI[data_i+7]; //当前复选框高度
                                var c_cbg = CT_ContainerUI[data_i+8]; //当前复选框背景颜色
                                var c_cb = CT_ContainerUI[data_i+9]; //当前复选框边框颜色
                                var c_cw = CT_ContainerUI[data_i+10]; //当前复选框部件颜色
                                var c_s = CT_ContainerUI[data_i+11]; //当前复选框状态
                                CT_OffCanvas_Rectangle(c_x,c_y,c_w,c_h,c_cbg,1); //绘制复选框背景
                                CT_OffCanvas_Rectangle(c_x,c_y,c_w,c_h,c_cb,0); //绘制复选框外边框
                                CT_OffCanvas_Rectangle(c_x+1,c_y+1,c_w-2,c_h-2,c_cb,0); //绘制复选框内边框
                                if(c_s === 1) //如果复选框状态为1
                                {
                                    CT_OffCanvas_Line(c_x+4,c_y+8,c_x+6,c_y+10,2,c_cw); //绘制复选框部件1
                                    CT_OffCanvas_Line(c_x+7,c_y+11,c_x+11,c_y+4,2,c_cw); //绘制复选框部件2
                                }
                            }
                            if(ui_type === 4) //如果当前UI对象是单选框
                            {
                                var r_x = win_x + CT_ContainerUI[data_i+4]; //当前单选框位置x
                                var r_y = win_y + CT_ContainerUI[data_i+5]; //当前单选框位置y
                                var r_w = CT_ContainerUI[data_i+6]; //当前单选框宽度
                                var r_cgb = CT_ContainerUI[data_i+8]; //当前单选框背景颜色
                                var r_cb = CT_ContainerUI[data_i+9]; //当前单选框边框颜色
                                var r_cw = CT_ContainerUI[data_i+10]; //当前单选框部件颜色
                                var r_s = CT_ContainerUI[data_i+12]; //当前单选框状态
                                CT_OffCanvas_Circle(r_x+8,r_y+8,r_w/2,r_cb,1); //绘制单选框边框
                                CT_OffCanvas_Circle(r_x+8,r_y+8,r_w/2-2,r_cgb,1); //绘制单选框背景
                                if(r_s === 1) //如果单选框状态为1
                                {
                                    CT_OffCanvas_Circle(r_x+8,r_y+8,r_w/2-4,r_cw,1); //绘制单选框部件
                                }
                            }
                            if(ui_type === 5) //如果当前UI对象是进度条
                            {
                                var p_x = win_x + CT_ContainerUI[data_i+4]; //当前进度条位置x
                                var p_y = win_y + CT_ContainerUI[data_i+5]; //当前进度条位置y
                                var p_w = CT_ContainerUI[data_i+6]; //当前进度条宽度
                                var p_h = CT_ContainerUI[data_i+7]; //当前进度条高度
                                var p_cgb = CT_ContainerUI[data_i+8]; //当前进度条背景颜色
                                var p_cbu = CT_ContainerUI[data_i+9]; //当前进度条上边框颜色
                                var p_cbd = CT_ContainerUI[data_i+10]; //当前进度条下边框颜色
                                var p_cbl = CT_ContainerUI[data_i+11]; //当前进度条左边框颜色
                                var p_cbr = CT_ContainerUI[data_i+12]; //当前进度条右边框颜色
                                var p_cw = CT_ContainerUI[data_i+13]; //当前进度条部件颜色
                                var p_img = CT_ContainerUI[data_i+14]; //当前进度条背景图片
                                var p_ww = CT_ContainerUI[data_i+15]; //当前进度条部件宽度
                                if(p_img !== -1) //如果进度条背景图片不为空
                                {
                                    CT_OffCanvas_ImagePart(p_x,p_y,p_img,255,0,0,p_w,p_h); //绘制背景图像
                                }
                                else //如果进度条背景图片为空
                                {
                                    CT_OffCanvas_Rectangle(p_x,p_y,p_w,p_h,p_cgb,1); //绘制进度条背景
                                    CT_OffCanvas_Rectangle(p_x,p_y,p_w,2,p_cbu,1); //绘制进度条上边框
                                    CT_OffCanvas_Rectangle(p_x,p_y+p_h-2,p_w,2,p_cbd,1); //绘制进度条下边框
                                    CT_OffCanvas_Rectangle(p_x,p_y,2,p_h-2,p_cbl,1); //绘制进度条左边框
                                    CT_OffCanvas_Rectangle(p_x+p_w-2,p_y,2,p_h-2,p_cbr,1); //绘制进度条右边框
                                }
                                CT_OffCanvas_Rectangle(p_x+4,p_y+4,p_ww,p_h-8,p_cw,1); //绘制进度条部件
                            }
                            if(ui_type === 6) //如果当前UI对象是文本框
                            {
                                var t_x = win_x + CT_ContainerUI[data_i+4]; //当前文本框位置x
                                var t_y = win_y + CT_ContainerUI[data_i+5]; //当前文本框位置y
                                var t_w = CT_ContainerUI[data_i+6]; //当前文本框宽度
                                var t_h = CT_ContainerUI[data_i+7]; //当前文本框高度
                                var t_cbg = CT_ContainerUI[data_i+8]; //当前文本框背景颜色
                                var t_cbu = CT_ContainerUI[data_i+9]; //当前文本框上边框颜色
                                var t_cbd = CT_ContainerUI[data_i+10]; //当前文本框下边框颜色
                                var t_cbl = CT_ContainerUI[data_i+11]; //当前文本框左边框颜色
                                var t_cbr = CT_ContainerUI[data_i+12]; //当前文本框右边框颜色
                                var t_ct = CT_ContainerUI[data_i+13]; //当前文本框字体颜色
                                var t_img = CT_ContainerUI[data_i+14]; //当前文本框背景图片
                                var t_val = CT_ContainerUI[data_i+15]; //当前文本框字符串
                                var t_pass = CT_ContainerUI[data_i+16]; //当前文本框密码参数
                                var t_readonly = CT_ContainerUI[data_i+19]; //当前文本框只读参数
                                var imgfont_use = CT_ContainerUI[data_i+24]; //当前文本框是否使用图像字体
                                if(t_img !== -1) //如果文本框背景图片不为空
                                {
                                    CT_OffCanvas_ImagePart(t_x,t_y,t_img,255,0,0,t_w,t_h); //绘制背景图像
                                }
                                else //文本框背景图片为空
                                {
                                    CT_OffCanvas_Rectangle(t_x,t_y,t_w,t_h,t_cbg,1); //绘制文本框背景
                                    CT_OffCanvas_Rectangle(t_x,t_y,t_w,2,t_cbu,1); //绘制文本框上边框
                                    CT_OffCanvas_Rectangle(t_x,t_y+t_h-2,t_w,2,t_cbd,1); //绘制文本框下边框
                                    CT_OffCanvas_Rectangle(t_x,t_y,2,t_h-2,t_cbl,1); //绘制文本框左边框
                                    CT_OffCanvas_Rectangle(t_x+t_w-2,t_y,2,t_h-2,t_cbr,1); //绘制文本框右边框
                                }
                                if(imgfont_use === 0) //如果文本框使用一般字体
                                {
                                    var t_fsize = CT_ContainerUI[data_i+22]; //文本框字体大小
                                    var text_y = t_y + (t_h - t_fsize) / 2; //文本框字符串位置y
                                    if(t_pass !== 1) //如果文本框不是密码文本框
                                    {
                                        CT_OffCanvas_String(t_x+3,text_y,t_fsize,t_ct,t_val); //绘制文本框字符串
                                        if(i2 === CT_Textbox_Index) //如果选择的文本框是当前文本框
                                        {
                                            if(t_readonly === 0) //如果文本框不是只读
                                            {
                                                var val_width = string_pxwidth(t_val,t_fsize); //文本框字符串宽度
                                                var boxl_x = t_x + 3 + val_width + 1; //文本框光标位置x
                                                var boxl_ty = t_y + 3; //文本框光标顶部位置y
                                                var boxl_by = t_y + t_h - 3; //文本框光标底部位置y
                                                CT_OffCanvas_Rectangle(boxl_x,boxl_ty,2,boxl_by-boxl_ty,"#000000ff",1); //绘制文本框光标
                                            }
                                        }
                                    }
                                    else //如果文本框是密码文本框
                                    {
                                        var pass_x = t_x + 3; //密码字符串位置x
                                        var passc_w = string_pxwidth("●",t_fsize); //密码符宽度
                                        var val_l = t_val.length; //文本框字符串长度
                                        var passi;
                                        for(passi=0;passi<val_l;passi++) //遍历文本框字符串
                                        {
                                            CT_OffCanvas_String(pass_x,text_y,t_fsize,t_ct,"●"); //绘制文本框密码串
                                            pass_x += passc_w; //密码符位置x+
                                        }
                                        if(i2 === CT_Textbox_Index) //如果选择的文本框是当前文本框
                                        {
                                            if(t_readonly === 0) //如果文本框不是只读
                                            {
                                                var val_width = passc_w * val_l; //文本框字符串宽度
                                                var boxl_x = t_x + 3 + val_width + 1; //文本框光标位置x
                                                var boxl_ty = t_y + 3; //文本框光标顶部位置y
                                                var boxl_by = t_y + t_h - 3; //文本框光标底部位置y
                                                CT_OffCanvas_Rectangle(boxl_x,boxl_ty,2,boxl_by-boxl_ty,"#000000ff",1); //绘制文本框光标
                                            }
                                        }
                                    }
                                }
                                if(imgfont_use === 1) //如果使用图像字体
                                {
                                    var t_font_img = CT_ContainerUI[data_i+25]; //当前文本框的字体图像
                                    var t_font_charnum = CT_ContainerUI[data_i+26]; //当前文本框的字体最大字符数
                                    var t_font_chargap = CT_ContainerUI[data_i+27]; //当前文本框的字体字符间隙
                                    var t_th = CT_ContainerUI[data_i+22]; //当前文本框的文本高度
                                    var t_font_charlist = CT_ContainerUI[data_i+28]; //当前文本框的字体字符列表
                                    var t_font_glyphlist = CT_ContainerUI[data_i+29]; //当前文本框的字体字形列表
                                    var t_ty = t_y + (t_h - t_th) / 2; //当前文本框的字符串位置y
                                    if(t_pass !== 1) //如果文本框不是密码文本框
                                    {
                                        CT_OffCanvas_ImgString(t_x+3,t_ty,t_ct,t_val,t_font_img,t_font_charnum,t_font_chargap,t_font_charlist,t_font_glyphlist); //绘制文本框字符串
                                        if(i2 === CT_Textbox_Index) //如果选择的文本框是当前文本框
                                        {
                                            if(t_readonly === 0) //如果文本框不是只读
                                            {
                                                var val_width = CT_ImgStringMeasure(t_font_charnum,t_font_chargap,t_font_charlist,t_font_glyphlist,t_val); //文本框字符串宽度
                                                var boxl_x = t_x + 3 + val_width + 1; //文本框光标位置x
                                                var boxl_ty = t_y + 3; //文本框光标顶部位置y
                                                var boxl_by = t_y + t_h - 3; //文本框光标底部位置y
                                                CT_OffCanvas_Rectangle(boxl_x,boxl_ty,2,boxl_by-boxl_ty,"#000000ff",1); //绘制文本框光标
                                            }
                                        }
                                    }
                                    else //如果文本框是密码文本框
                                    {
                                        var t_val_l = t_val.length; //文本框字符串长度
                                        var pass_x = t_x + 3; //密码字符串位置x
                                        var passc_w = CT_ImgStringMeasure(t_font_charnum,t_font_chargap,t_font_charlist,t_font_glyphlist,"*"); //密码符宽度
                                        var passi;
                                        for(passi=0;passi<t_val_l;passi++) //遍历文本框字符串
                                        {
                                            CT_OffCanvas_ImgString(pass_x,t_ty,t_ct,"*",t_font_img,t_font_charnum,t_font_chargap,t_font_charlist,t_font_glyphlist); //绘制文本框密码串
                                            pass_x += passc_w + 1; //密码符位置x+
                                        }
                                        if(i2 === CT_Textbox_Index) //如果选择的文本框是当前文本框
                                        {
                                            if(t_readonly === 0) //如果文本框不是只读
                                            {
                                                var val_width = CT_ImgStringMeasure(t_font_charnum,t_font_chargap,t_font_charlist,t_font_glyphlist,"*") * t_val_l + t_val_l; //文本框密码串宽度
                                                var boxl_x = t_x + 3 + val_width + 1; //文本框光标位置x
                                                var boxl_ty = t_y + 3; //文本框光标顶部位置y
                                                var boxl_by = t_y + t_h - 3; //文本框光标底部位置y
                                                CT_OffCanvas_Rectangle(boxl_x,boxl_ty,2,boxl_by-boxl_ty,"#000000ff",1); //绘制文本框光标
                                            }
                                        }
                                    }
                                }
                            }
                            if(ui_type === 7) //如果当前UI对象是图像元件
                            {
                                var ie_x = win_x + CT_ContainerUI[data_i+4]; //当前图像元件位置x
                                var ie_y = win_y + CT_ContainerUI[data_i+5]; //当前图像元件位置y
                                var ie_i = CT_ContainerUI[data_i+6]; //当前图像元件图像索引
                                var ie_si = CT_ContainerUI[data_i+7]; //当前图像元件子图像索引
                                var ie_si_w = CT_ContainerUI[data_i+9]; //当前子图像宽度
                                var ie_si_h = CT_ContainerUI[data_i+10]; //当前子图像高度
                                if(ie_i !== -1) //如果图像不为空
                                {
                                    var si_x = ie_si * ie_si_w; //图块位置x
                                    CT_OffCanvas_ImagePart(ie_x,ie_y,ie_i,255,si_x,0,ie_si_w,ie_si_h); //绘制图像元件
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 按钮重置
//--------------------------------------------------------------------
function CT_ButtonEnd()
{
    var i;
    var data_i;
    for(i=0;i<CT_ContainerUILength;i++) //遍历UI容器
    {
        data_i = i * 30;
        if(CT_ContainerUI[data_i] !== 0) //如果当前UI不为空
        {
            var ui_type = CT_ContainerUI[data_i+3]; //获取当前UI类型
            if(ui_type === 1) //如果当前UI是按钮
            {
                CT_ContainerUI[data_i+18] = 0; //设置当前按钮的点击状态
                CT_ContainerUI[data_i+20] = 0; //设置当前按钮的按下状态
                CT_ContainerUI[data_i+21] = 0; //设置当前按钮的松开状态
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// UI容器清除
//--------------------------------------------------------------------
function CT_ContainerUIClear()
{
    CT_ContainerWindow = []; //清除窗口容器
    CT_ContainerWindowLength = 0; //窗口容器长度为0
    CT_WindowLayerStatusList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //将所有窗口层的状态标记为0
    CT_ContainerUI = []; //清除UI容器
    CT_ContainerUILength = 0; //UI容器长度为0
    CT_DialogDestroy(); //销毁对话框
    CT_Textbox_Index = -1; //点击UI的索引为-1
    CT_DownX = -1; //鼠标按下的位置x为-1
    CT_DownY = -1; //鼠标按下的位置y为-1
    CT_DialogShow = 0; //对话框不显示
    CT_Dialog_Index = -1; //对话框对应文本框的索引为-1
}
//--------------------------------------------------------------------