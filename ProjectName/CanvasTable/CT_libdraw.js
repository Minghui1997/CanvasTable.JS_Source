"use strict";

//--------------------------------------------------------------------
// 文本像素宽度
//--------------------------------------------------------------------
function string_pxwidth(str,size)
{
    CT_Ctx.font = String(size) + "px Def"; //字体大小
    var text_w = CT_Ctx.measureText(str); //测量文本像素宽度
    return parseInt(text_w.width); //返回文本像素宽度
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置Draw层
//--------------------------------------------------------------------
function draw_set_layer(l)
{
    if(l >= 0 && l <= 31) //如果设置的层在正确范围内
    {
        CT_DrawLayer = l; //设置draw层
    }
    else
    {
        cprint("ERROR : The draw layer is error.");
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 清除draw
//--------------------------------------------------------------------
function draw_clear()
{
    var i;
    var data_i; //数据索引
    for(i=0;i<CT_ContainerDrawLength;i++) //遍历draw容器
    {
        data_i = i * 15; //获取当前draw数据索引
        if(CT_ContainerDraw[data_i] !== 0) //如果当前draw不为空
        {
            var draw_l = CT_ContainerDraw[data_i+2]; //当前draw层
            if(draw_l === CT_DrawLayer) //如果当前draw层等于draw层
            {
                var i2;
                for(i2=0;i2<15;i2++) //遍历当前draw
                {
                    CT_ContainerDraw[data_i+i2] = 0; //清除当前draw数据
                }
            }
        }
    }
    for(i=CT_ContainerDrawLength-1;i>=-1;i--) //反向遍历draw容器
    {
        if(i >= 0) //如果draw索引大于等于0
        {
            data_i = i * 15; //获取当前draw数据索引
            if(CT_ContainerDraw[data_i] !== 0) //如果当前draw不为空
            {
                CT_ContainerDrawLength = i + 1; //确定draw容器长度
                break; //中断
            }
        }
        else
        {
            CT_ContainerDrawLength = 0; //draw容器长度为0
        }
    }
    CT_DrawLayerStatusList[CT_DrawLayer] = 0; //将当前draw层的状态标记为0
    CT_Repaint = 1; //请求重绘
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置draw透明度
//--------------------------------------------------------------------
function draw_set_alpha(a)
{
    if(a >= 0 && a <= 255) //如果alpha值在正确范围内
    {
        CT_DrawAlpha = a; //设置draw alpha
    }
    else
    {
        cprint("ERROR : The color value is error.");
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制矩形(容器)
//--------------------------------------------------------------------
function draw_rect(x,y,w,h,c,f)
{
    var type = 1; //draw类型
    var data_i = CT_ContainerDrawLength * 15; //draw数据索引
    //将draw数据写入draw容器
    CT_ContainerDraw[data_i] = 1;
    CT_ContainerDraw[data_i+1] = type;
    CT_ContainerDraw[data_i+2] = CT_DrawLayer;
    CT_ContainerDraw[data_i+3] = x;
    CT_ContainerDraw[data_i+4] = y;
    CT_ContainerDraw[data_i+5] = w;
    CT_ContainerDraw[data_i+6] = h;
    CT_ContainerDraw[data_i+7] = c;
    CT_ContainerDraw[data_i+8] = f;
    CT_ContainerDrawLength ++; //draw容器索引 +1
    CT_DrawLayerStatusList[CT_DrawLayer] = 1; //将当前draw层的状态标记为1
    CT_Repaint = 1; //请求重绘
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制线(容器)
//--------------------------------------------------------------------
function draw_line(x1,y1,x2,y2,w,c)
{
    var type = 2;
    var data_i = CT_ContainerDrawLength * 15; //draw数据索引
    //将draw数据写入draw容器
    CT_ContainerDraw[data_i] = 1;
    CT_ContainerDraw[data_i+1] = type;
    CT_ContainerDraw[data_i+2] = CT_DrawLayer;
    CT_ContainerDraw[data_i+3] = x1;
    CT_ContainerDraw[data_i+4] = y1;
    CT_ContainerDraw[data_i+5] = x2;
    CT_ContainerDraw[data_i+6] = y2;
    CT_ContainerDraw[data_i+7] = w;
    CT_ContainerDraw[data_i+8] = c;
    CT_ContainerDrawLength ++; //draw容器索引 +1
    CT_DrawLayerStatusList[CT_DrawLayer] = 1; //将当前draw层的状态标记为1
    CT_Repaint = 1; //请求重绘
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制圆(容器)
//--------------------------------------------------------------------
function draw_circle(x,y,r,c,f)
{
    var type = 3;
    var data_i = CT_ContainerDrawLength * 15; //draw数据索引
    //将draw数据写入draw容器
    CT_ContainerDraw[data_i] = 1;
    CT_ContainerDraw[data_i+1] = type;
    CT_ContainerDraw[data_i+2] = CT_DrawLayer;
    CT_ContainerDraw[data_i+3] = x;
    CT_ContainerDraw[data_i+4] = y;
    CT_ContainerDraw[data_i+5] = r;
    CT_ContainerDraw[data_i+6] = c;
    CT_ContainerDraw[data_i+7] = f;
    CT_ContainerDrawLength ++; //draw容器索引 +1
    CT_DrawLayerStatusList[CT_DrawLayer] = 1; //将当前draw层的状态标记为1
    CT_Repaint = 1; //请求重绘
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制字符串(容器)
//--------------------------------------------------------------------
function draw_string(x,y,s,c,t)
{
    var type = 4; //draw类型
    var data_i = CT_ContainerDrawLength * 15; //draw数据索引
    var col = c; //draw颜色
    if(CT_DrawAlpha >= 16) //如果draw alpha大于等于16
    {
        col += CT_DrawAlpha.toString(16); //在颜色变量中添加透明度
    }
    else
    {
        col += "0" + CT_DrawAlpha.toString(16); //在颜色变量中添加透明度
    }
    //将draw数据写入draw容器
    CT_ContainerDraw[data_i] = 1;
    CT_ContainerDraw[data_i+1] = type;
    CT_ContainerDraw[data_i+2] = CT_DrawLayer;
    CT_ContainerDraw[data_i+3] = x;
    CT_ContainerDraw[data_i+4] = y;
    CT_ContainerDraw[data_i+5] = s;
    CT_ContainerDraw[data_i+6] = col;
    CT_ContainerDraw[data_i+7] = t;
    CT_ContainerDrawLength ++; //draw容器索引 +1
    CT_DrawLayerStatusList[CT_DrawLayer] = 1; //将当前draw层的状态标记为1
    CT_Repaint = 1; //请求重绘
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制图像(容器)
//--------------------------------------------------------------------
function draw_image(x,y,ii)
{
    var type = 5; //draw类型
    var data_i = CT_ContainerDrawLength * 15; //draw数据索引
    if(ii !== -1) //如果资源不为空
    {
        var res_type = CT_ResourceArgList[ii*5+1]; //获取资源类型
        if(res_type === 0) //如果资源类型是图像
        {
            CT_ContainerDraw[data_i] = 1;
            CT_ContainerDraw[data_i+1] = type;
            CT_ContainerDraw[data_i+2] = CT_DrawLayer;
            CT_ContainerDraw[data_i+3] = x;
            CT_ContainerDraw[data_i+4] = y;
            CT_ContainerDraw[data_i+5] = ii;
            CT_ContainerDraw[data_i+6] = CT_DrawAlpha;
            CT_ContainerDrawLength ++; //draw容器索引 +1
            CT_DrawLayerStatusList[CT_DrawLayer] = 1; //将当前draw层的状态标记为1
            CT_Repaint = 1; //请求重绘
        }
        else
        {
            cprint("ERROR : The resource index corresponding to the resource file is not image.");
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制图像部分(容器)
//--------------------------------------------------------------------
function draw_image_part(x,y,ii,ix,iy,iw,ih)
{
    var type = 6; //draw类型
    var data_i = CT_ContainerDrawLength * 15; //draw数据索引
    if(ii !== -1) //如果资源不为空
    {
        var res_type = CT_ResourceArgList[ii*5+1]; //获取资源类型
        if(res_type === 0) //如果资源类型是图像
        {
            //将draw数据写入draw容器
            CT_ContainerDraw[data_i] = 1;
            CT_ContainerDraw[data_i+1] = type;
            CT_ContainerDraw[data_i+2] = CT_DrawLayer;
            CT_ContainerDraw[data_i+3] = x;
            CT_ContainerDraw[data_i+4] = y;
            CT_ContainerDraw[data_i+5] = ii;
            CT_ContainerDraw[data_i+6] = ix;
            CT_ContainerDraw[data_i+7] = iy;
            CT_ContainerDraw[data_i+8] = iw;
            CT_ContainerDraw[data_i+9] = ih;
            CT_ContainerDraw[data_i+10] = CT_DrawAlpha;
            CT_ContainerDrawLength ++; //draw容器索引 +1
            CT_DrawLayerStatusList[CT_DrawLayer] = 1; //将当前draw层的状态标记为1
            CT_Repaint = 1; //请求重绘
        }
        else
        {
            cprint("ERROR : The resource index corresponding to the resource file is not image.");
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制曲线(容器)
//--------------------------------------------------------------------
function draw_curve(x1,y1,x2,y2,x3,y3,w,c)
{
    var type = 7; //draw类型
    var data_i = CT_ContainerDrawLength * 15; //draw数据索引
    //将draw数据写入draw容器
    CT_ContainerDraw[data_i] = 1;
    CT_ContainerDraw[data_i+1] = type;
    CT_ContainerDraw[data_i+2] = CT_DrawLayer;
    CT_ContainerDraw[data_i+3] = x1;
    CT_ContainerDraw[data_i+4] = y1;
    CT_ContainerDraw[data_i+5] = x2;
    CT_ContainerDraw[data_i+6] = y2;
    CT_ContainerDraw[data_i+7] = x3;
    CT_ContainerDraw[data_i+8] = y3;
    CT_ContainerDraw[data_i+9] = w;
    CT_ContainerDraw[data_i+10] = c;
    CT_ContainerDrawLength ++; //draw容器索引 +1
    CT_DrawLayerStatusList[CT_DrawLayer] = 1; //将当前draw层的状态标记为1
    CT_Repaint = 1; //请求重绘
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制三角形(容器)
//--------------------------------------------------------------------
function draw_tri(x1,y1,x2,y2,x3,y3,c,f)
{
    var type = 8; //draw类型
    var data_i = CT_ContainerDrawLength * 15; //draw数据索引
    //将draw数据写入draw容器
    CT_ContainerDraw[data_i] = 1;
    CT_ContainerDraw[data_i+1] = type;
    CT_ContainerDraw[data_i+2] = CT_DrawLayer;
    CT_ContainerDraw[data_i+3] = x1;
    CT_ContainerDraw[data_i+4] = y1;
    CT_ContainerDraw[data_i+5] = x2;
    CT_ContainerDraw[data_i+6] = y2;
    CT_ContainerDraw[data_i+7] = x3;
    CT_ContainerDraw[data_i+8] = y3;
    CT_ContainerDraw[data_i+9] = c;
    CT_ContainerDraw[data_i+10] = f;
    CT_ContainerDrawLength ++; //draw容器索引 +1
    CT_DrawLayerStatusList[CT_DrawLayer] = 1; //将当前draw层的状态标记为1
    CT_Repaint = 1; //请求重绘
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制图像字符串(容器)
//--------------------------------------------------------------------
function draw_istring(x,y,a,font,t)
{
    var type = 9; //draw类型
    var data_i = CT_ContainerDrawLength * 15; //draw数据索引
    if(font.FontImg !== -1 && font.CharNumber > 0 && font.CharList != null && font.GlyphList != null) //如果字体属性正确
    {
        var font_img = font.FontImg; //字体图像
        var font_charnum = font.CharNumber; //字体字符数量
        var font_chargap = font.CharGap; //字体字符间隙
        var font_charlist = font.CharList; //字体字符列表
        var font_glyphlist = font.GlyphList; //字体字形列表
        //将draw数据写入draw容器
        CT_ContainerDraw[data_i] = 1;
        CT_ContainerDraw[data_i+1] = type;
        CT_ContainerDraw[data_i+2] = CT_DrawLayer;
        CT_ContainerDraw[data_i+3] = x;
        CT_ContainerDraw[data_i+4] = y;
        CT_ContainerDraw[data_i+5] = CT_DrawAlpha;
        CT_ContainerDraw[data_i+6] = t;
        CT_ContainerDraw[data_i+7] = font_img;
        CT_ContainerDraw[data_i+8] = font_charnum;
        CT_ContainerDraw[data_i+9] = font_chargap;
        CT_ContainerDraw[data_i+10] = font_charlist;
        CT_ContainerDraw[data_i+11] = font_glyphlist;
        CT_ContainerDrawLength ++; //draw容器索引 +1
        CT_DrawLayerStatusList[CT_DrawLayer] = 1; //将当前draw层的状态标记为1
        CT_Repaint = 1; //请求重绘
    }
}
//--------------------------------------------------------------------