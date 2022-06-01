"use strict";

//--------------------------------------------------------------------
// 控制台输出
//--------------------------------------------------------------------
function cprint(str)
{
    if(CT_DEBUG_MODE === 1) //如果调试模式开启
    {
        console.log(str); //将字符串输出到控制台
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 获取资源
//--------------------------------------------------------------------
function res(n)
{
    var res_name = CT_PathGetName(n); //从路径中获取文件名
    if(res_name.lastIndexOf(".") !== -1) //如果文件名中有.
    {
        if(res_name.lastIndexOf(".") !== 0) //如果文件名中有扩展名
        {
            var i;
            for(i=0;i<CT_ResourceList.length;i++) //查找整个资源列表
            {
                if(CT_ResourceList[i] != null) //如果当前资源路径不为空
                {
                    if(CT_ResourceList[i][0] === n) //如果找到指定资源
                    {
                        return i; //返回资源索引
                    }
                }
            }
            cprint("ERROR 0 : The resource file is not found : " + n);
        }
        else
        {
            cprint("ERROR 2 : The resource file name is error : " + n);
        }
    }
    else
    {
        cprint("ERROR 3 : The resource file type is not supoort : " + n);
    }
    return -1;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// rgb颜色
//--------------------------------------------------------------------
function color(r,g,b,a)
{
    var red = "00"; //red值
    var green = "00"; //green值
    var blue = "00"; //blue值
    var alpha = "00";
    if(r >= 0 && r <= 255) //如果参数r的范围在0 - 255之间
    {
        if(r >= 0 && r <= 15) //如果参数r的范围在0 - 15之间
        {
            red = "0" + r.toString(16); //在十六进制red值前加0
        }
        else //如果参数r的范围不在0 - 16之间
        {
            red = r.toString(16); //在十六进制red值
        }
    }
    else
    {
        cprint("ERROR 15 : The color value is error. ColorValue : " + String(r));
    }
    if(g >= 0 && g <= 255) //如果参数g的范围在0 - 255之间
    {
        if(g >= 0 && g <= 15) //如果参数g的范围在0 - 15之间
        {
            green = "0" + g.toString(16); //在十六进制green值前加0
        }
        else //如果参数g的范围不在0 - 16之间
        {
            green = g.toString(16); //在十六进制green值
        }
    }
    else
    {
        cprint("ERROR 15 : The color value is error. ColorValue : " + String(g));
    }
    if(b >= 0 && b <= 255) //如果参数b的范围在0 - 255之间
    {
        if(b >= 0 && b <= 15) //如果参数b的范围在0 - 15之间
        {
            blue = "0" + b.toString(16); //在十六进制blue值
        }
        else //如果参数b的范围不在0 - 16之间
        {
            blue = b.toString(16); //在十六进制blue值
        }
    }
    else
    {
        cprint("ERROR 15 : The color value is error. ColorValue : " + String(b));
    }
    if(a >= 0 && a <= 255) //如果参数a的范围在0 - 255之间
    {
        if(a >= 0 && a <= 15) //如果参数a的范围在0 - 15之间
        {
            alpha = "0" + a.toString(16); //在十六进制alpha值前加0
        }
        else //如果参数a的范围不在0 - 16之间
        {
            alpha = a.toString(16); //在十六进制alpha值
        }
    }
    else
    {
        cprint("ERROR 15 : The color value is error.ColorValue : " + String(a));
    }
    var color_code = "#" + red + green + blue + alpha; //颜色值
    return color_code; //返回颜色值
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 文本像素宽度
//--------------------------------------------------------------------
function string_pxwidth(str,size)
{
    CT_Ctx.font = String(size) + "px Arial"; //字体大小
    var text_w = CT_Ctx.measureText(str); //测量文本像素宽度
    return text_w.width; //返回文本像素宽度
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置视野设置x
//--------------------------------------------------------------------
function view_set_x(x)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(x !== CT_ViewLastX) //如果x不等于上次x
        {
            CT_ViewX = x; //设置视野位置x
            CT_ViewLastX = x; //设置上次视野位置x
            CT_InterfaceRepaint(); //请求重绘
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置视野设置y
//--------------------------------------------------------------------
function view_set_y(y)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(y !== CT_ViewLastY) //如果y不等于上次y
        {
            CT_ViewY = y;//设置视野位置y
            CT_ViewLastY = y; //设置上次视野位置y
            CT_InterfaceRepaint(); //请求重绘
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 视野位置x
//--------------------------------------------------------------------
function view_x()
{
    return CT_ViewX; //返回视野位置x
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 视野位置y
//--------------------------------------------------------------------
function view_y()
{
    return CT_ViewY; //返回视野位置y
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 读取文本数据
//--------------------------------------------------------------------
function textdata_read(t)
{
    if(t !== -1) //如果资源不为空
    {
        var res_type = CT_ResourceList[t][1]; //资源类型
        if(res_type === 2) //如果资源是文本
        {
            return CT_ContainerResource[t]; //返回文本数据
        }
        else //如果资源不是文本
        {
            cprint("ERROR 21 : The resource index corresponding to the resource file is not a text. ResIndex : " + String(t));
        }
    }
    return "";
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 获取文本数据行数
//--------------------------------------------------------------------
function textdata_line(t)
{
    if(t !== -1) //如果资源不为空
    {
        var res_type = CT_ResourceList[t][1]; //资源类型
        if(res_type === 2) //如果资源是文本
        {
            var line = CT_ResourceList[t][2]; //获取文本行数
            return line; //返回行数
        }
        else //如果资源不是文本
        {
            cprint("ERROR 21 : The resource index corresponding to the resource file is not a text. ResIndex : " + String(t));
        }
    }
    return 1;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 读取文本数据指定行
//--------------------------------------------------------------------
function textdata_read_line(t,l)
{
    var line_text = ""; //行文本
    if(t !== -1) //如果资源不为空
    {
        var res_type = CT_ResourceList[t][1]; //资源类型
        if(res_type === 2) //如果资源是文本
        {
            var td_len = CT_ContainerResource[t].length; //文本数据长度
            var tc = ""; //文本数据当前字符
            if(l === 0) //如果行号等于0
            {
                var i = 0;
                while(i < td_len) //遍历文本数据
                {
                    tc = CT_ContainerResource[t][i]; //获取文本数据当前字符
                    if(tc === "\n") //如果当前字符是换行符
                    {
                        line_text = CT_ContainerResource[t].slice(0,i); //截取文本数据第一行文本
                        return line_text; //返回文本数据第一行文本
                    }
                    i ++;
                }
                return CT_ContainerResource[t]; //如果没有换行符，就返回整个文本数据
            }
            if(l > 0) //如果行号大于0
            {
                var i2 = 0;
                var line = 0; //当前行
                var ts = 0; //文本片段开始位置
                var te = 0; //文本片段结束位置
                while(i2 < td_len) //遍历文本数据
                {
                    tc = CT_ContainerResource[t][i2]; //获取文本数据当前字符
                    if(tc === "\n") //如果当前字符是换行符
                    {
                        line ++; //当前行 +1
                        if(line === l) //如果当前行等于参数行
                        {
                            ts = i2 + 1; //确定文本片段开始位置
                            var i3 = ts;
                            while(i3 < td_len) //从文本片段开始位置遍历文本数据
                            {
                                tc = CT_ContainerResource[t][i3]; //获取文本数据当前字符
                                if(tc === "\n") //如果当前字符是换行符
                                {
                                    te = i3 - 1; //确定文本片段结束位置
                                    line_text = CT_ContainerResource[t].slice(ts,te); //截取文本数据文本
                                    return line_text; //返回文本数据文本
                                }
                                i3 ++;
                            }
                            line_text = CT_ContainerResource[t].slice(ts,td_len); //如果没有换行符，截取文本数据最后一行文本
                            return line_text; //返回文本数据文本
                        }
                    }
                    i2 ++;
                }
            }
        }
        else //如果资源不是文本
        {
            cprint("ERROR 21 : The resource index corresponding to the resource file is not a text. ResIndex : " + String(t));
        }
    }
    return "";
}
//--------------------------------------------------------------------