"use strict";

//--------------------------------------------------------------------
// 设置Draw层
//--------------------------------------------------------------------
function draw_set_layer(l)
{
    CT_DrawLayer = l; //draw层
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 清除draw
//--------------------------------------------------------------------
function draw_clear()
{
    var i;
    for(i=0;i<CT_ContainerDrawLength;i++) //遍历draw容器
    {
        if(CT_ContainerDraw[i] != null) //如果当前draw不为空
        {
            var draw_l = CT_ContainerDraw[i][1]; //当前draw层
            if(draw_l === CT_DrawLayer) //如果当前draw层等于draw层
            {
                CT_ContainerDraw[i] = null; //清除当前draw
            }
        }
    }
    CT_Repaint = 1; //请求重绘
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制矩形(容器)
//--------------------------------------------------------------------
function draw_rect(x,y,w,h,c,f)
{
    var type = 1;
    CT_ContainerDraw[CT_ContainerDrawLength] = [type,CT_DrawLayer,x,y,w,h,c,f]; //将draw数据写入draw容器
    CT_ContainerDrawLength ++; //draw容器索引 +1
    CT_Repaint = 1; //请求重绘
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制线(容器)
//--------------------------------------------------------------------
function draw_line(x1,y1,x2,y2,w,c)
{
    var type = 2;
    CT_ContainerDraw[CT_ContainerDrawLength] = [type,CT_DrawLayer,x1,y1,x2,y2,w,c]; //将draw数据写入draw容器
    CT_ContainerDrawLength ++; //draw容器索引 +1
    CT_Repaint = 1; //请求重绘
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制圆(容器)
//--------------------------------------------------------------------
function draw_circle(x,y,r,c,f)
{
    var type = 3;
    CT_ContainerDraw[CT_ContainerDrawLength] = [type,CT_DrawLayer,x,y,r,c,f]; //将draw数据写入draw容器
    CT_ContainerDrawLength ++; //draw容器索引 +1
    CT_Repaint = 1; //请求重绘
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制字符串(容器)
//--------------------------------------------------------------------
function draw_string(x,y,s,c,t)
{
    var type = 4; //draw类型
    CT_ContainerDraw[CT_ContainerDrawLength] = [type,CT_DrawLayer,x,y,s,c,t]; //将draw数据写入draw容器
    CT_ContainerDrawLength ++; //draw容器索引 +1
    CT_Repaint = 1; //请求重绘
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制图像(容器)
//--------------------------------------------------------------------
function draw_image(x,y,ii)
{
    var type = 5; //draw类型
    if(ii !== -1) //如果资源不为空
    {
        var res_type = CT_ResourceList[ii][1]; //获取资源类型
        if(res_type === 0) //如果资源类型是图像
        {
            CT_ContainerDraw[CT_ContainerDrawLength] = [type,CT_DrawLayer,x,y,ii]; //将draw数据写入draw容器
            CT_ContainerDrawLength ++; //draw容器索引 +1
            CT_Repaint = 1; //请求重绘
        }
        else
        {
            cprint("ERROR : The resource index corresponding to the resource file is not a image.");
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
    if(ii !== -1) //如果资源不为空
    {
        var res_type = CT_ResourceList[ii][1]; //获取资源类型
        if(res_type === 0) //如果资源类型是图像
        {
            CT_ContainerDraw[CT_ContainerDrawLength] = [type,CT_DrawLayer,x,y,ii,ix,iy,iw,ih]; //将draw数据写入draw容器
            CT_ContainerDrawLength ++; //draw容器索引 +1
            CT_Repaint = 1; //请求重绘
        }
        else
        {
            cprint("ERROR : The resource index corresponding to the resource file is not a image.");
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
    CT_ContainerDraw[CT_ContainerDrawLength] = [type,CT_DrawLayer,x1,y1,x2,y2,x3,y3,w,c]; //将draw数据写入draw容器
    CT_ContainerDrawLength ++; //draw容器索引 +1
    CT_Repaint = 1; //请求重绘
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制三角形(容器)
//--------------------------------------------------------------------
function draw_tri(x1,y1,x2,y2,x3,y3,c,f)
{
    var type = 8; //draw类型
    CT_ContainerDraw[CT_ContainerDrawLength] = [type,CT_DrawLayer,x1,y1,x2,y2,x3,y3,c,f]; //将draw数据写入draw容器
    CT_ContainerDrawLength ++; //draw容器索引 +1
    CT_Repaint = 1; //请求重绘
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制图像字符串(容器)
//--------------------------------------------------------------------
function draw_istring(x,y,a,font,t)
{
    var type = 9; //draw类型
    if(font.FontImg !== -1 && font.CharNumber > 0 && font.CharList != null && font.GlyphList != null) //如果字体属性正确
    {
        var font_img = font.FontImg; //字体图像
        var font_charnum = font.CharNumber; //字体字符数量
        var font_chargap = font.CharGap; //字体字符间隙
        var font_charlist = font.CharList; //字体字符列表
        var font_glyphlist = font.GlyphList; //字体字形列表
        CT_ContainerDraw[CT_ContainerDrawLength] = [type,CT_DrawLayer,x,y,a,t,font_img,font_charnum,font_chargap,font_charlist,font_glyphlist]; //将draw数据写入draw容器
        CT_ContainerDrawLength ++; //draw容器索引 +1
        CT_Repaint = 1; //请求重绘
    }
}
//--------------------------------------------------------------------