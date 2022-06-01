"use strict";

//--------------------------------------------------------------------
// 容器格式
//--------------------------------------------------------------------
// [窗口数据,...]
// 窗口:[id,层,x,y,宽度,高度,背景颜色,上边框颜色,下边框颜色,左边框颜色,右边框颜色,背景图片];
// 
// [UI数据,...]
// 按钮:[id,对应窗口的索引,1,x,y,宽度,高度,背景颜色,上边框颜色,下边框颜色,左边框颜色,右边框颜色,文本颜色,背景图片,文本,文本宽度,文本高度,点击状态,始终按下状态,按下状态,松开状态]
// 文本:[id,对应窗口的索引,2,x,y,文本颜色,文本,字体大小]
// 复选框:[id,对应窗口的索引,3,x,y,宽度,高度,背景颜色,边框颜色,部件颜色,状态]
// 单选框:[id,对应窗口的索引,4,x,y,宽度,高度,背景颜色,边框颜色,部件颜色,组,状态]
// 进度条:[id,对应窗口的索引,5,x,y,宽度,高度,背景颜色,上边框颜色,下边框颜色,左边框颜色,右边框颜色,部件颜色,背景图片,部件宽度,值,最大值]
// 文本框:[id,对应窗口的索引,6,x,y,宽度,高度,背景颜色,上边框颜色,下边框颜色,左边框颜色,右边框颜色,字体颜色,背景图片,值,密码,数字,最大字符数,只读,子文本框,子文本框名称]
//--------------------------------------------------------------------
var CT_UIId = 0;
var CT_ContainerWindow = [];
var CT_ContainerWindowIndex = 0;
var CT_ContainerUI = [];
var CT_ContainerUIIndex = 0;
var CT_Button_Index = -1; //按下按钮的索引
var CT_Textbox_Index = -1; //点击文本框的索引
var CT_DownX = -1; //鼠标按下的位置x
var CT_DownY = -1; //鼠标按下的位置y
var CT_DialogShow = 0; //对话框显示
var CT_Dialog_Index = -1; //对话框对应文本框的索引
//--------------------------------------------------------------------
// UI对象ID
//--------------------------------------------------------------------
function CT_UIGetId()
{
    var id = CT_UIId; //当前UI Id
    CT_UIId ++; //UI Id +1
    return id; //返回 UI Id
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// UI运行
//--------------------------------------------------------------------
function CT_UIRun()
{
    if(mouse_down(mkey_left)) //如果鼠标按下
    {
        CT_DownX = mouse_x(); //鼠标按下的位置x
        CT_DownY = mouse_y(); //鼠标按下的位置y
        var i;
        for(i=0;i<CT_ContainerWindow.length;i++) //遍历窗口容器
        {
            if(CT_ContainerWindow[i] != null) //如果当前窗口不为空
            {
                var win_x = CT_ContainerWindow[i][2]; //窗口位置x
                var win_y = CT_ContainerWindow[i][3]; //窗口位置y
                var win_w = CT_ContainerWindow[i][4]; //窗口宽度
                var win_h = CT_ContainerWindow[i][5]; //窗口高度
                if(CT_DownX >= win_x && CT_DownY >= win_y && CT_DownX <= win_x + win_w && CT_DownY <= win_y + win_h) //如果鼠标按下的位置在窗口范围内
                {
                    var i2;
                    for(i2=0;i2<CT_ContainerUI.length;i2++) //遍历UI容器
                    {
                        if(CT_ContainerUI[i2] != null) //如果当前UI对象不为空
                        {
                            var ui_win_index = CT_ContainerUI[i2][1]; //当前UI对象对应窗口索引
                            if(ui_win_index === i) //如果前UI对象对应窗口索引等于当前窗口索引
                            {
                                var ui_x = win_x + CT_ContainerUI[i2][3]; //UI位置x
                                var ui_y = win_y + CT_ContainerUI[i2][4]; //UI位置y
                                var ui_w = CT_ContainerUI[i2][5]; //UI宽度
                                var ui_h = CT_ContainerUI[i2][6]; //UI高度
                                if(CT_DownX >= ui_x && CT_DownY >= ui_y && CT_DownX <= ui_x + ui_w && CT_DownY <= ui_y + ui_h) //如果鼠标按下的位置在UI范围内
                                {
                                    if(CT_DialogShow === 0) //如果对话框没有显示
                                    {
                                        var ui_type = CT_ContainerUI[i2][2]; //所点击UI的类型
                                        if(ui_type === 1) //如果点击UI对象是按钮
                                        {
                                            CT_Button_Index = i2; //按钮索引
                                            CT_ContainerUI[i2][18] = 1; //设置当前按钮的始终按下状态
                                            CT_ContainerUI[i2][19] = 1; //设置当前按钮的按下状态
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
    if(mouse_up(mkey_left)) //如果鼠标松开
    {
        if(CT_Button_Index !== -1) //如果按了按钮
        {
            if(CT_ContainerUI[CT_Button_Index] != null) //如果按了按钮的按钮不为空
            {
                CT_ContainerUI[CT_Button_Index][18] = 0; //设置当前按钮的始终按下状态
            }
        }
        var up_x = mouse_x(); //鼠标松开的位置x
        var up_y = mouse_y(); //鼠标松开的位置y
        var i;
        for(i=0;i<CT_ContainerWindow.length;i++) //遍历窗口容器
        {
            if(CT_ContainerWindow[i] != null) //如果当前窗口不为空
            {
                var win_x = CT_ContainerWindow[i][2]; //窗口位置x
                var win_y = CT_ContainerWindow[i][3]; //窗口位置y
                var win_w = CT_ContainerWindow[i][4]; //窗口宽度
                var win_h = CT_ContainerWindow[i][5]; //窗口高度
                if(CT_DownX >= win_x && CT_DownY >= win_y && CT_DownX <= win_x + win_w && CT_DownY <= win_y + win_h && up_x >= win_x && up_y >= win_y && up_x <= win_x + win_w && up_y <= win_y + win_h) //如果鼠标按下的位置和松开的位置都在窗口范围内
                {
                    var i2;
                    for(i2=0;i2<CT_ContainerUI.length;i2++) //遍历UI容器
                    {
                        if(CT_ContainerUI[i2] != null) //如果当前UI对象不为空
                        {
                            var ui_win_index = CT_ContainerUI[i2][1]; //当前UI对象对应窗口索引
                            if(ui_win_index === i) //如果前UI对象对应窗口索引等于当前窗口索引
                            {
                                var ui_x = win_x + CT_ContainerUI[i2][3]; //UI位置x
                                var ui_y = win_y + CT_ContainerUI[i2][4]; //UI位置y
                                var ui_w = CT_ContainerUI[i2][5]; //UI宽度
                                var ui_h = CT_ContainerUI[i2][6]; //UI高度
                                if(CT_DownX >= ui_x && CT_DownY >= ui_y && CT_DownX <= ui_x + ui_w && CT_DownY <= ui_y + ui_h && up_x >= ui_x && up_y >= ui_y && up_x <= ui_x + ui_w && up_y <= ui_y + ui_h) //如果鼠标按下的位置和松开的位置都在UI范围内
                                {
                                    if(CT_DialogShow === 0) //如果对话框没有显示
                                    {
                                        CT_Textbox_Index = -1; //点击文本框的索引
                                        var ui_type = CT_ContainerUI[i2][2]; //所点击UI的类型
                                        if(ui_type === 1) //如果点击UI对象是按钮
                                        {
                                            CT_ContainerUI[i2][17] = 1; //设置当前按钮的点击状态
                                            CT_ContainerUI[i2][20] = 1; //设置当前按钮的松开状态
                                            CT_InterfaceRepaint(); //请求重绘
                                            return; //中断
                                        }
                                        if(ui_type === 3) //如果点击UI对象是复选框
                                        {
                                            var c_s = CT_ContainerUI[i2][10]; //复选框状态
                                            if(c_s === 0) //如果复选框没有勾选
                                            {
                                                CT_ContainerUI[i2][10] = 1; //设置复选框状态
                                                CT_InterfaceRepaint(); //请求重绘
                                                return; //中断
                                            }
                                            if(c_s === 1) //如果复选框勾选
                                            {
                                                CT_ContainerUI[i2][10] = 0; //设置复选框状态
                                                CT_InterfaceRepaint(); //请求重绘
                                                return; //中断
                                            }
                                        }
                                        if(ui_type === 4) //如果点击UI对象是单选框
                                        {
                                            var radio_g = CT_ContainerUI[i2][10]; //当前单选框组
                                            var i3;
                                            for(i3=0;i3<CT_ContainerUI.length;i3++) //遍历UI容器
                                            {
                                                var c_ui_type = CT_ContainerUI[i3][2]; //UI容器当前UI对象类型
                                                if(c_ui_type === 4) //如果UI容器当前UI对象类型是单选框
                                                {
                                                    var c_radio_g = CT_ContainerUI[i3][10]; //UI容器当前单选框组
                                                    if(c_radio_g === radio_g) //如果UI容器当前单选框组等于当前单选框组
                                                    {
                                                       CT_ContainerUI[i3][11] = 0; //将UI容器当前单选框状态设置为0
                                                    }
                                                }
                                            }
                                            CT_ContainerUI[i2][11] = 1; //将当前单选框状态设置为1
                                            CT_InterfaceRepaint(); //请求重绘
                                        }
                                        if(ui_type === 6) //如果点击UI对象是文本框
                                        {
                                            var subbox = CT_ContainerUI[i2][19]; //子文本框
                                            if(subbox === 0) //如果不使用子文本框
                                            {
                                                CT_Textbox_Index = i2; //点击的文本框在窗口中的索引
                                            }
                                            if(subbox === 1 || CT_DEVICE === 1) //如果使用子文本框或设备是移动平台
                                            {
                                                var readonly = CT_ContainerUI[i2][18]; //文本框只读参数
                                                if(readonly === 0) //如果文本框不是只读
                                                {
                                                    var t_val = CT_ContainerUI[i2][14]; //文本框值
                                                    var t_name = CT_ContainerUI[i2][20]; //文本框名称
                                                    var t_max = CT_ContainerUI[i2][17]; //文本框最大字符数
                                                    var t_pass = CT_ContainerUI[i2][15]; //文本框密码
                                                    var t_numb = CT_ContainerUI[i2][16]; //文本框数字
                                                    CT_Dialog_Index = i2; //对话框对应文本框的索引
                                                    CT_DialogCreate(t_val,t_name,t_max,t_pass,t_numb); //创建子文本框
                                                }
                                            }
                                            CT_InterfaceRepaint(); //请求重绘
                                            return; //中断
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
    if(CT_Textbox_Index !== -1) //如果点击了文本框
    {
        if(CT_ContainerUI[CT_Textbox_Index] != null) //如果点击的文本框不为空
        {
            var readonly = CT_ContainerUI[CT_Textbox_Index][18]; //文本框只读参数
            if(readonly === 0) //如果文本框不是只读
            {
                var kc = CT_KeyboardChar(); //当前输入的字符
                if(kc !== "" && kc !== "_BACK") //如果输入了字符
                {
                    var tbox_length = CT_ContainerUI[CT_Textbox_Index][14].length; //文本框字符串长度
                    var tbox_max = CT_ContainerUI[CT_Textbox_Index][17]; //文本框最大字符数
                    var tbox_number = CT_ContainerUI[CT_Textbox_Index][16]; //数字文本框参数
                    if(tbox_length < tbox_max) //如果文本框字符串长度小于文本框最大字符数
                    {
                        if(tbox_number !== 1) //如果文本框不是数字文本框
                        {
                            CT_ContainerUI[CT_Textbox_Index][14] += kc; //文本框增加字符
                            CT_InterfaceRepaint(); //请求重绘
                        }
                        else //如果文本框是数字文本框
                        {
                            if(kc === "0" || kc === "1" || kc === "2" || kc === "3" || kc === "4" || kc === "5" || kc === "6" || kc === "7" || kc === "8" || kc === "9") //如果当前输入的字符是数字
                            {
                                CT_ContainerUI[CT_Textbox_Index][14] += kc; //文本框增加字符
                                CT_InterfaceRepaint(); //请求重绘
                            }
                        }
                    }
                }
                if(kc === "_BACK") //如果输入了退格
                {
                    var tbox_length = CT_ContainerUI[CT_Textbox_Index][14].length; //文本框字符串长度
                    if(tbox_length > 0) //如果文本框字符串长度大于0
                    {
                        var tbox_str = CT_ContainerUI[CT_Textbox_Index][14]; //文本框字符串
                        tbox_str = tbox_str.slice(0,tbox_length-1); //文本框字符串减少一个字符的字符串
                        CT_ContainerUI[CT_Textbox_Index][14] = tbox_str; //文本框字符串减少一个字符
                        CT_InterfaceRepaint(); //请求重绘
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
    var win_index = 0; //当前窗口索引
    for(i=0;i<CT_ContainerWindow.length;i++) //遍历窗口容器
    {
        win_index = i; //当前窗口索引
        if(CT_ContainerWindow[i] != null) //如果当前窗口不为空
        {
            var window_layer = CT_ContainerWindow[i][1]; //当前窗口层
            if(window_layer === l) //如果当前窗口层等于渲染层
            {
                var win_x = CT_ContainerWindow[i][2]; //窗口位置x
                var win_y = CT_ContainerWindow[i][3]; //窗口位置y
                var win_w = CT_ContainerWindow[i][4]; //窗口宽度
                var win_h = CT_ContainerWindow[i][5]; //窗口高度
                var win_cbg = CT_ContainerWindow[i][6]; //窗口背景颜色
                var win_cbu = CT_ContainerWindow[i][7]; //窗口上边框颜色
                var win_cbd = CT_ContainerWindow[i][8]; //窗口下边框颜色
                var win_cbl = CT_ContainerWindow[i][9]; //窗口左边框颜色
                var win_cbr = CT_ContainerWindow[i][10]; //窗口右边框颜色
                var win_img = CT_ContainerWindow[i][11]; //窗口背景图片
                if(win_img !== -1) //如果窗口背景图片不为空
                {
                    CT_BufferImage(win_x,win_y,win_img); //绘制窗口背景图片
                }
                else //如果窗口背景图片为空
                {
                    CT_BufferRect(win_x,win_y,win_w,win_h,win_cbg,1); //绘制窗口背景
                    CT_BufferLine(win_x,win_y-2,win_x+win_w,win_y-2,2,win_cbu); //绘制窗口上边框
                    CT_BufferLine(win_x,win_y+win_h,win_x+win_w,win_y+win_h,2,win_cbd); //绘制窗口下边框
                    CT_BufferLine(win_x-2,win_y-2,win_x-2,win_y+win_h+2,2,win_cbl); //绘制窗口左边框
                    CT_BufferLine(win_x+win_w,win_y-2,win_x+win_w,win_y+win_h+2,2,win_cbr); //绘制窗口右边框
                }
                var i2;
                for(i2=0;i2<CT_ContainerUI.length;i2++) //遍历UI容器
                {
                    if(CT_ContainerUI[i2] != null) //如果当前UI对象不为空
                    {
                        var ui_win_index = CT_ContainerUI[i2][1]; //当前UI对象对应窗口索引
                        if(ui_win_index === win_index) //如果当前UI对象对应窗口索引等于当前窗口索引
                        {
                            var ui_type = CT_ContainerUI[i2][2]; //当前UI对象类型
                            if(ui_type === 1) //如果当前UI对象是按钮
                            {
                                var b_x = win_x + CT_ContainerUI[i2][3]; //按钮位置x
                                var b_y = win_y + CT_ContainerUI[i2][4]; //按钮位置y
                                var b_w = CT_ContainerUI[i2][5]; //按钮宽度
                                var b_h = CT_ContainerUI[i2][6]; //按钮高度
                                var b_cbg = CT_ContainerUI[i2][7]; //按钮背景颜色
                                var b_cbu = CT_ContainerUI[i2][8]; //按钮上边框颜色
                                var b_cbd = CT_ContainerUI[i2][9]; //按钮下边框颜色
                                var b_cbl = CT_ContainerUI[i2][10]; //按钮左边框颜色
                                var b_cbr = CT_ContainerUI[i2][11]; //按钮右边框颜色
                                var b_ct = CT_ContainerUI[i2][12]; //按钮文本颜色
                                var b_img = CT_ContainerUI[i2][13]; //按钮背景图片
                                var b_t = CT_ContainerUI[i2][14]; //按钮显示文本
                                var b_tw = CT_ContainerUI[i2][15]; //按钮文本宽度
                                var b_th = CT_ContainerUI[i2][16]; //按钮文本高度
                                var b_tx = parseInt(b_x + ((b_w - b_tw) / 2)); //按钮显示文本位置x
                                var b_ty = parseInt(b_y + ((b_h - b_th) / 2)); //按钮显示文本位置y
                                if(b_img !== -1) //如果按钮背景图片不为空
                                {
                                    CT_BufferImage(b_x,b_y,b_img); //绘制按钮背景图片
                                }
                                else //如果按钮背景图片为空
                                {
                                    CT_BufferRect(b_x,b_y,b_w,b_h,b_cbg,1); //绘制按钮背景
                                    CT_BufferLine(b_x,b_y,b_x+b_w,b_y,2,b_cbu); //绘制按钮上边框
                                    CT_BufferLine(b_x,b_y+b_h-2,b_x+b_w,b_y+b_h-2,2,b_cbd); //绘制按钮下边框
                                    CT_BufferLine(b_x,b_y,b_x,b_y+b_h-2,2,b_cbl); //绘制按钮左边框
                                    CT_BufferLine(b_x+b_w-2,b_y,b_x+b_w-2,b_y+b_h-2,2,b_cbr); //绘制按钮右边框
                                }
                                CT_BufferString(b_tx,b_ty,16,b_ct,b_t); //绘制按钮文本
                            }
                            if(ui_type === 2)
                            {
                                var t_x = win_x + CT_ContainerUI[i2][3]; //文本位置x
                                var t_y = win_y + CT_ContainerUI[i2][4]; //文本位置y
                                var t_c = CT_ContainerUI[i2][5]; //文本颜色
                                var t_t = CT_ContainerUI[i2][6]; //文本
                                var t_s = CT_ContainerUI[i2][7]; //文本字体大小
                                CT_BufferString(t_x,t_y,t_s,t_c,t_t); //绘制文本
                            }
                            if(ui_type === 3)
                            {
                                var c_x = win_x + CT_ContainerUI[i2][3]; //复选框位置x
                                var c_y = win_y + CT_ContainerUI[i2][4]; //复选框位置y
                                var c_w = CT_ContainerUI[i2][5]; //复选框宽度
                                var c_h = CT_ContainerUI[i2][6]; //复选框高度
                                var c_cbg = CT_ContainerUI[i2][7]; //复选框背景颜色
                                var c_cb = CT_ContainerUI[i2][8]; //复选框边框颜色
                                var c_cw = CT_ContainerUI[i2][9]; //复选框部件颜色
                                var c_s = CT_ContainerUI[i2][10]; //复选框状态
                                CT_BufferRect(c_x,c_y,c_w,c_h,c_cbg,1); //绘制复选框背景
                                CT_BufferRect(c_x,c_y,c_w,c_h,c_cb,0); //绘制复选框外边框
                                CT_BufferRect(c_x+1,c_y+1,c_w-2,c_h-2,c_cb,0); //绘制复选框内边框
                                if(c_s === 1) //如果复选框状态为１
                                {
                                    CT_BufferLine(c_x+4,c_y+9,c_x+8,c_y+13,2,c_cw); //绘制复选框部件1
                                    CT_BufferLine(c_x+8,c_y+13,c_x+13,c_y+4,2,c_cw); //绘制复选框部件2
                                }
                            }
                            if(ui_type === 4)
                            {
                                var r_x = win_x + CT_ContainerUI[i2][3]; //单选框位置x
                                var r_y = win_y + CT_ContainerUI[i2][4]; //单选框位置y
                                var r_w = CT_ContainerUI[i2][5]; //单选框宽度
                                var r_cgb = CT_ContainerUI[i2][7]; //单选框背景颜色
                                var r_cb = CT_ContainerUI[i2][8]; //单选框边框颜色
                                var r_cw = CT_ContainerUI[i2][9]; //单选框部件颜色
                                var r_s = CT_ContainerUI[i2][11]; //单选框状态
                                CT_BufferCircle(r_x+8,r_y+8,r_w/2,r_cgb,1); //绘制单选框背景
                                CT_BufferCircle(r_x+8,r_y+8,r_w/2,r_cb,0); //绘制单选框外边框
                                CT_BufferCircle(r_x+8,r_y+8,r_w/2-1,r_cb,0); //绘制单选框内边框
                                if(r_s === 1) //如果单选框状态为１
                                {
                                    CT_BufferCircle(r_x+8,r_y+8,r_w/2-4,r_cw,1); //绘制单选框部件
                                }
                            }
                            if(ui_type === 5)
                            {
                                var p_x = win_x + CT_ContainerUI[i2][3]; //进度条位置x
                                var p_y = win_y + CT_ContainerUI[i2][4]; //进度条位置y
                                var p_w = CT_ContainerUI[i2][5]; //进度条宽度
                                var p_h = CT_ContainerUI[i2][6]; //进度条高度
                                var p_cgb = CT_ContainerUI[i2][7]; //进度条背景颜色
                                var p_cbu = CT_ContainerUI[i2][8]; //进度条上边框颜色
                                var p_cbd = CT_ContainerUI[i2][9]; //进度条下边框颜色
                                var p_cbl = CT_ContainerUI[i2][10]; //进度条左边框颜色
                                var p_cbr = CT_ContainerUI[i2][11]; //进度条右边框颜色
                                var p_cw = CT_ContainerUI[i2][12]; //进度条部件颜色
                                var p_img = CT_ContainerUI[i2][13]; //进度条背景图片
                                var p_ww = CT_ContainerUI[i2][14]; //进度条部件宽度
                                if(p_img !== -1) //如果进度条背景图片不为空
                                {
                                    CT_BufferImage(p_x,p_y,p_img); //绘制进度条背景图片
                                }
                                else //如果进度条背景图片为空
                                {
                                    CT_BufferRect(p_x,p_y,p_w,p_h,p_cgb,1); //绘制进度条背景
                                    CT_BufferLine(p_x,p_y,p_x+p_w,p_y,2,p_cbu); //绘制进度条上边框
                                    CT_BufferLine(p_x,p_y+p_h-2,p_x+p_w,p_y+p_h-2,2,p_cbd); //绘制进度条下边框
                                    CT_BufferLine(p_x,p_y,p_x,p_y+p_h-2,2,p_cbl); //绘制进度条左边框
                                    CT_BufferLine(p_x+p_w-2,p_y,p_x+p_w-2,p_y+p_h-2,2,p_cbr); //绘制进度条右边框
                                }
                                CT_BufferRect(p_x+4,p_y+4,p_ww,p_h-8,p_cw,1); //绘制进度条部件
                            }
                            if(ui_type === 6)
                            {
                                var t_x = win_x + CT_ContainerUI[i2][3]; //文本框位置x
                                var t_y = win_y + CT_ContainerUI[i2][4]; //文本框位置y
                                var t_w = CT_ContainerUI[i2][5]; //文本框宽度
                                var t_h = CT_ContainerUI[i2][6]; //文本框高度
                                var t_cbg = CT_ContainerUI[i2][7]; //文本框背景颜色
                                var t_cbu = CT_ContainerUI[i2][8]; //文本框上边框颜色
                                var t_cbd = CT_ContainerUI[i2][9]; //文本框下边框颜色
                                var t_cbl = CT_ContainerUI[i2][10]; //文本框左边框颜色
                                var t_cbr = CT_ContainerUI[i2][11]; //文本框右边框颜色
                                var t_ct = CT_ContainerUI[i2][12]; //文本框字体颜色
                                var t_img = CT_ContainerUI[i2][13]; //文本框背景图片
                                var t_val = CT_ContainerUI[i2][14]; //文本框字符串
                                var t_pass = CT_ContainerUI[i2][15]; //密码文本框参数
                                var t_readonly = CT_ContainerUI[i2][18]; //文本框只读参数
                                var t_fsize = 16; //文本框字体大小
                                var p = ""; //文本框密码串
                                if(t_img !== -1) //如果文本框背景图片不为空
                                {
                                    CT_BufferImage(t_x,t_y,t_img); //绘制文本框背景图片
                                }
                                    else //文本框背景图片为空
                                {
                                    CT_BufferRect(t_x,t_y,t_w,t_h,t_cbg,1); //绘制文本框背景
                                    CT_BufferLine(t_x,t_y,t_x+t_w,t_y,2,t_cbu); //绘制文本框上边框
                                    CT_BufferLine(t_x,t_y+t_h-2,t_x+t_w,t_y+t_h-2,2,t_cbd); //绘制文本框下边框
                                    CT_BufferLine(t_x,t_y,t_x,t_y+t_h-2,2,t_cbl); //绘制文本框左边框
                                    CT_BufferLine(t_x+t_w-2,t_y,t_x+t_w-2,t_y+t_h-2,2,t_cbr); //绘制文本框右边框
                                }
                                if(t_pass !== 1) //如果文本框不是密码文本框
                                {
                                    var text_y = t_y + (t_h - t_fsize) / 2; //文本框字符串位置y
                                    CT_BufferString(t_x+5,text_y,t_fsize,t_ct,t_val); //绘制文本框字符串
                                }
                                else //如果文本框是密码文本框
                                {
                                    var passi;
                                    for(passi=0;passi<t_val.length;passi++) //遍历文本框字符串
                                    {
                                        p += "●"; //增加密码符
                                    }
                                    CT_BufferString(t_x+5,t_y+3,t_fsize,t_ct,p); //绘制文本框密码串
                                }
                                if(i2 === CT_Textbox_Index) //如果选择的文本框是当前文本框
                                {
                                    if(t_pass !== 1) //如果文本框不是密码文本框
                                    {
                                        var val_width = string_pxwidth(t_val,t_fsize); //文本框字符串宽度
                                    }    
                                    else //如果文本框是密码文本框
                                    {
                                        var val_width = string_pxwidth(p,t_fsize); //文本框密码串宽度
                                    }
                                    if(t_readonly === 0) //如果文本框不是只读
                                    {
                                        CT_BufferLine(t_x+4+val_width+1,t_y+3,t_x+4+val_width+1,t_y+t_h-4,1,color(0,0,0,255)); //绘制文本框输入线
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
// 按钮重置
//--------------------------------------------------------------------
function CT_ButtonReset()
{
    var i;
    for(i=0;i<CT_ContainerUI.length;i++) //遍历UI容器
    {
        if(CT_ContainerUI[i] != null) //如果当前UI不为空
        {
            var ui_type = CT_ContainerUI[i][2]; //获取当前UI类型
            if(ui_type === 1) //如果当前UI是按钮
            {
                CT_ContainerUI[i][17] = 0; //设置当前按钮的点击状态
                CT_ContainerUI[i][19] = 0; //设置当前按钮的按下状态
                CT_ContainerUI[i][20] = 0; //设置当前按钮的松开状态
            }
        }
    }
}
//--------------------------------------------------------------------