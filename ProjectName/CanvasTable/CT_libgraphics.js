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
    for(i=0;i<CT_ContainerDraw.length;i++) //遍历draw容器
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
    CT_InterfaceRepaint(); //请求重绘
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制矩形(容器)
//--------------------------------------------------------------------
function draw_rect(x,y,w,h,c,f)
{
    var type = 1; //draw类型
    if(CT_ContainerDraw.length > 0) //如果draw容器长度大于0
    {
        var i;
        for(i=0;i<CT_ContainerDraw.length;i++) //遍历draw容器
        {
            if(CT_ContainerDraw[i] == null) //如果当前draw为空
            {
                CT_ContainerDraw[i] = [type,CT_DrawLayer,x,y,w,h,c,f]; //将draw数据写入draw容器
                CT_InterfaceRepaint(); //请求重绘
                return;
            }
        }
        CT_ContainerDraw[CT_ContainerDrawIndex] = [type,CT_DrawLayer,x,y,w,h,c,f]; //将draw数据写入draw容器
        CT_ContainerDrawIndex ++; //draw容器索引 +1
        CT_InterfaceRepaint(); //请求重绘
    }
    else
    {
        CT_ContainerDraw[CT_ContainerDrawIndex] = [type,CT_DrawLayer,x,y,w,h,c,f]; //将draw数据写入draw容器
        CT_ContainerDrawIndex ++; //draw容器索引 +1
        CT_InterfaceRepaint(); //请求重绘
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制线(容器)
//--------------------------------------------------------------------
function draw_line(x1,y1,x2,y2,w,c)
{
    var type = 2; //draw类型
    if(CT_ContainerDraw.length > 0) //如果draw容器长度大于0
    {
        var i;
        for(i=0;i<CT_ContainerDraw.length;i++) //遍历draw容器
        {
            if(CT_ContainerDraw[i] == null) //如果当前draw为空
            {
                CT_ContainerDraw[i] = [type,CT_DrawLayer,x1,y1,x2,y2,w,c]; //将draw数据写入draw容器
                CT_InterfaceRepaint(); //请求重绘
                return;
            }
        }
        CT_ContainerDraw[CT_ContainerDrawIndex] = [type,CT_DrawLayer,x1,y1,x2,y2,w,c]; //将draw数据写入draw容器
        CT_ContainerDrawIndex ++; //draw容器索引 +1
        CT_InterfaceRepaint(); //请求重绘
    }
    else
    {
        CT_ContainerDraw[CT_ContainerDrawIndex] = [type,CT_DrawLayer,x1,y1,x2,y2,w,c]; //将draw数据写入draw容器
        CT_ContainerDrawIndex ++; //draw容器索引 +1
        CT_InterfaceRepaint(); //请求重绘
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制圆(容器)
//--------------------------------------------------------------------
function draw_circle(x,y,r,c,f)
{
    var type = 3; //draw类型
    if(CT_ContainerDraw.length > 0) //如果draw容器长度大于0
    {
        var i;
        for(i=0;i<CT_ContainerDraw.length;i++) //遍历draw容器
        {
            if(CT_ContainerDraw[i] == null) //如果当前draw为空
            {
                CT_ContainerDraw[i] = [type,CT_DrawLayer,x,y,r,c,f]; //将draw数据写入draw容器
                CT_InterfaceRepaint(); //请求重绘
                return;
            }
        }
        CT_ContainerDraw[CT_ContainerDrawIndex] = [type,CT_DrawLayer,x,y,r,c,f]; //将draw数据写入draw容器
        CT_ContainerDrawIndex ++; //draw容器索引 +1
        CT_InterfaceRepaint(); //请求重绘
    }
    else
    {
        CT_ContainerDraw[CT_ContainerDrawIndex] = [type,CT_DrawLayer,x,y,r,c,f]; //将draw数据写入draw容器
        CT_ContainerDrawIndex ++; //draw容器索引 +1
        CT_InterfaceRepaint(); //请求重绘
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制字符串(容器)
//--------------------------------------------------------------------
function draw_string(x,y,s,c,t)
{
    var type = 4; //draw类型
    if(CT_ContainerDraw.length > 0) //如果draw容器长度大于0
    {
        var i;
        for(i=0;i<CT_ContainerDraw.length;i++) //遍历draw容器
        {
            if(CT_ContainerDraw[i] == null) //如果当前draw为空
            {
                CT_ContainerDraw[i] = [type,CT_DrawLayer,x,y,s,c,t]; //将draw数据写入draw容器
                CT_InterfaceRepaint(); //请求重绘
                return;
            }
        }
        CT_ContainerDraw[CT_ContainerDrawIndex] = [type,CT_DrawLayer,x,y,s,c,t]; //将draw数据写入draw容器
        CT_ContainerDrawIndex ++; //draw容器索引 +1
        CT_InterfaceRepaint(); //请求重绘
    }
    else
    {
        CT_ContainerDraw[CT_ContainerDrawIndex] = [type,CT_DrawLayer,x,y,s,c,t]; //将draw数据写入draw容器
        CT_ContainerDrawIndex ++; //draw容器索引 +1
        CT_InterfaceRepaint(); //请求重绘
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制图像(容器)
//--------------------------------------------------------------------
function draw_image(x,y,ii)
{
    var type = 5; //draw类型
    if(CT_ContainerDraw.length > 0) //如果draw容器长度大于0
    {
        var i;
        for(i=0;i<CT_ContainerDraw.length;i++) //遍历draw容器
        {
            if(CT_ContainerDraw[i] == null) //如果当前draw为空
            {
                CT_ContainerDraw[i] = [type,CT_DrawLayer,x,y,ii]; //将draw数据写入draw容器
                CT_InterfaceRepaint(); //请求重绘
                return;
            }
        }
        CT_ContainerDraw[CT_ContainerDrawIndex] = [type,CT_DrawLayer,x,y,ii]; //将draw数据写入draw容器
        CT_ContainerDrawIndex ++; //draw容器索引 +1
        CT_InterfaceRepaint(); //请求重绘
    }
    else
    {
        CT_ContainerDraw[CT_ContainerDrawIndex] = [type,CT_DrawLayer,x,y,ii]; //将draw数据写入draw容器
        CT_ContainerDrawIndex ++; //draw容器索引 +1
        CT_InterfaceRepaint(); //请求重绘
    }
    CT_InterfaceRepaint(); //请求重绘
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制图像部分(容器)
//--------------------------------------------------------------------
function draw_image_part(x,y,ii,ix,iy,iw,ih)
{
    var type = 6; //draw类型
    if(CT_ContainerDraw.length > 0) //如果draw容器长度大于0
    {
        var i;
        for(i=0;i<CT_ContainerDraw.length;i++) //遍历draw容器
        {
            if(CT_ContainerDraw[i] == null) //如果当前draw为空
            {
                CT_ContainerDraw[i] = [type,CT_DrawLayer,x,y,ii,ix,iy,iw,ih]; //将draw数据写入draw容器
                CT_InterfaceRepaint(); //请求重绘
                return;
            }
        }
        CT_ContainerDraw[CT_ContainerDrawIndex] = [type,CT_DrawLayer,x,y,ii,ix,iy,iw,ih]; //将draw数据写入draw容器
        CT_ContainerDrawIndex ++; //draw容器索引 +1
        CT_InterfaceRepaint(); //请求重绘
    }
    else
    {
        CT_ContainerDraw[CT_ContainerDrawIndex] = [type,CT_DrawLayer,x,y,ii,ix,iy,iw,ih]; //将draw数据写入draw容器
        CT_ContainerDrawIndex ++; //draw容器索引 +1
        CT_InterfaceRepaint(); //请求重绘
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制曲线(容器)
//--------------------------------------------------------------------
function draw_curve(x1,y1,x2,y2,x3,y3,w,c)
{
    var type = 7; //draw类型
    if(CT_ContainerDraw.length > 0) //如果draw容器长度大于0
    {
        var i;
        for(i=0;i<CT_ContainerDraw.length;i++) //遍历draw容器
        {
            if(CT_ContainerDraw[i] == null) //如果当前draw为空
            {
                CT_ContainerDraw[i] = [type,CT_DrawLayer,x1,y1,x2,y2,x3,y3,w,c]; //将draw数据写入draw容器
                CT_InterfaceRepaint(); //请求重绘
                return;
            }
        }
        CT_ContainerDraw[CT_ContainerDrawIndex] = [type,CT_DrawLayer,x1,y1,x2,y2,x3,y3,w,c]; //将draw数据写入draw容器
        CT_ContainerDrawIndex ++; //draw容器索引 +1
        CT_InterfaceRepaint(); //请求重绘
    }
    else
    {
        CT_ContainerDraw[CT_ContainerDrawIndex] = [type,CT_DrawLayer,x1,y1,x2,y2,x3,y3,w,c]; //将draw数据写入draw容器
        CT_ContainerDrawIndex ++; //draw容器索引 +1
        CT_InterfaceRepaint(); //请求重绘
    }
}
//--------------------------------------------------------------------