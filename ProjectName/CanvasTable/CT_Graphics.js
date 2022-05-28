"use strict";

//--------------------------------------------------------------------
// Draw容器格式
//--------------------------------------------------------------------
// [[draw数据],...]

// draw数据格式
// 矩形:[1,层,x,y,宽度,高度,颜色,实心]
// 线:[2,层,起点x,起点y,终点x,终点y,宽度,颜色]
// 圆:[3,层,中心x,中心y,半径,颜色,实心]
// 字符串:[4,层,x,y,字体大小,颜色,字符串]
// 图片:[5,层,x,y,图片资源]
// 图块:[6,层,x,y,图片资源,图块x,图块y,图块宽度,图块高度]
// 曲线:[7,层,起点x,起点y,操作点x,操作点y,结束点x,结束点y,宽度,颜色]
// 三角形:[8,层,第一点位置x,第一点位置y,第二点位置x,第二点位置y,第三点位置x,第三点位置y,颜色,实心]
//--------------------------------------------------------------------
var CT_ContainerDraw = []; //draw容器
var CT_ContainerDrawIndex = 0; //draw容器索引
var CT_DrawLayer = 0; //draw层级
//--------------------------------------------------------------------
// 清除画布
//--------------------------------------------------------------------
function CT_CanvasClear()
{
    CT_Ctx.clearRect(0,0,CT_CanvasW,CT_CanvasH); //清除整个画布
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 清除缓冲画布
//--------------------------------------------------------------------
function CT_BufferCanvasClear()
{
    CT_BCtx.beginPath(); //开始路径
    CT_BCtx.fillStyle = "#000000"; //填充颜色
    CT_BCtx.fillRect(0,0,CT_CanvasW,CT_CanvasH); //在缓冲画布上绘制黑色矩形
    CT_BCtx.closePath(); //结束路径
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 缓冲画布输出
//--------------------------------------------------------------------
function CT_BufferCanvasOut()
{
    CT_Ctx.drawImage(CT_BufferCanvas,0,0); //将缓冲画布输出到主画布
    CT_BufferCanvasClear(); //清除缓冲画布
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制矩形(缓冲)
//--------------------------------------------------------------------
function CT_BufferRect(x,y,w,h,c,f)
{
    CT_BCtx.beginPath(); //开始路径
    if(f === 1) //如果是实心
    {
        CT_BCtx.fillStyle = c; //填充颜色
        CT_BCtx.fillRect(x,y,w,h); //在缓冲画布上绘制矩形
    }
    if(f === 0) //如果是空心
    {
        CT_BCtx.strokeStyle = c; //描边颜色
        CT_BCtx.lineWidth = 1; //线宽度
        CT_BCtx.strokeRect(x+0.5,y+0.5,w-1,h-1); //在缓冲画布上绘制矩形边框
    }
    CT_BCtx.closePath(); //结束路径
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制线(缓冲)
//--------------------------------------------------------------------
function CT_BufferLine(x1,y1,x2,y2,w,c)
{
    CT_BCtx.beginPath(); //开始路径
    CT_BCtx.strokeStyle = c; //描边颜色
    CT_BCtx.lineWidth = w; //线宽度
    var line_move = w * 0.5; //线偏移
    if(x1 === x2) //如果是竖线
    {
        CT_BCtx.moveTo(x1+line_move,y1); //设置线的起点位置
        CT_BCtx.lineTo(x2+line_move,y2); //设置线的终点位置
    }
    if(y1 === y2) //如果是横线
    {
        CT_BCtx.moveTo(x1,y1+line_move); //设置线的起点位置
        CT_BCtx.lineTo(x2,y2+line_move); //设置线的终点位置
    }
    if(x1 !== x2 && y1 !== y2) //如果是斜线
    {
        CT_BCtx.moveTo(x1,y1); //设置线的起点位置
        CT_BCtx.lineTo(x2,y2); //设置线的终点位置
    }
    CT_BCtx.stroke(); //在缓冲画布上绘制线
    CT_BCtx.closePath(); //结束路径
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制圆(缓冲)
//--------------------------------------------------------------------
function CT_BufferCircle(x,y,r,c,f)
{
    CT_BCtx.beginPath(); //开始路径
    if(f === 1) //如果是实心
    {
        CT_BCtx.fillStyle = c; //填充颜色
        CT_BCtx.arc(x,y,r,0,Math.PI*2); //设置圆
        CT_BCtx.fill(); //在缓冲画布上绘制圆
    }
    if(f === 0) //如果是空心
    {
        CT_BCtx.beginPath(); //开始路径
        CT_BCtx.strokeStyle = c; //描边颜色
        CT_BCtx.lineWidth = 1; //线宽度
        CT_BCtx.arc(x,y,r,0,Math.PI*2); //设置圆
        CT_BCtx.arc(x,y,r,0,Math.PI*2); //设置圆
        CT_BCtx.stroke(); //在缓冲画布上绘制圆边框
    }
    CT_BCtx.closePath(); //结束路径
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制文本(缓冲)
//--------------------------------------------------------------------
function CT_BufferString(x,y,s,c,t)
{
    CT_BCtx.font = String(s) + "px Arial"; //字体大小
    CT_BCtx.fillStyle = c; //字体颜色
    CT_BCtx.fillText(t,x,y+s); //在缓冲画布上绘制文本
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制图像(缓冲)
//--------------------------------------------------------------------
function CT_BufferImage(x,y,i)
{
    if(i !== -1) //如果资源不为空
    {
        var res_type = CT_ResourceList[i][1]; //资源类型
        if(res_type === 0) //如果资源是图像
        {
            CT_BCtx.drawImage(CT_ContainerResource[i],x,y); //绘制资源容器中指定的图像
        }
        else //如果资源不是图像
        {
            cprint("ERROR 4 : The resource index corresponding to the resource file is not a image. ResIndex : " + String(i));
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制图像部分(缓冲)
//--------------------------------------------------------------------
function CT_BufferImagePart(x,y,i,ix,iy,iw,ih)
{
    if(i !== -1) //如果资源不为空
    {
        var res_type = CT_ResourceList[i][1]; //资源类型
        if(res_type === 0) //如果资源是图像
        {
            CT_BCtx.drawImage(CT_ContainerResource[i],ix,iy,iw,ih,x,y,iw,ih); //绘制资源容器中指定的图像部分
        }
        else //如果资源不是图像
        {
            cprint("ERROR 4 : The resource index corresponding to the resource file is not a image. ResIndex : " + String(i));
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制曲线(缓冲)
//--------------------------------------------------------------------
function CT_BufferCurve(x1,y1,x2,y2,x3,y3,w,c)
{
    CT_BCtx.beginPath(); //开始路径
    CT_BCtx.strokeStyle = c; //描边颜色
    CT_BCtx.lineWidth = w; //曲线宽度
    CT_BCtx.moveTo(x1,y1); //曲线起点
    CT_BCtx.quadraticCurveTo(x2,y2,x3,y3); //曲线的控制点和终点
    CT_BCtx.stroke(); //在缓冲画布上绘制曲线
    CT_BCtx.closePath(); //结束路径
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制三角形(缓冲)
//--------------------------------------------------------------------
function CT_BufferTri(x1,y1,x2,y2,x3,y3,c,f)
{
    if(f === 0) //如果是空心
    {
        CT_BCtx.beginPath(); //开始路径
        CT_BCtx.strokeStyle = c; //填充颜色
        CT_BCtx.moveTo(x1+0.5,y1+0.5); //设置三角形的起点位置
        CT_BCtx.lineTo(x2+0.5,y2+0.5); //设置三角形第二点的位置
        CT_BCtx.lineTo(x3+0.5,y3+0.5); //设置三角形第三点的位置
        CT_BCtx.lineTo(x1+0.5,y1+0.5); //设置三角形终点的位置
        CT_BCtx.stroke(); //填充三角形
        CT_BCtx.closePath(); //结束路径
    }
    if(f === 1) //如果是实心
    {
        CT_BCtx.beginPath(); //开始路径
        CT_BCtx.fillStyle = c; //填充颜色
        CT_BCtx.moveTo(x1,y1); //设置三角形的起点位置
        CT_BCtx.lineTo(x2,y2); //设置三角形第二点的位置
        CT_BCtx.lineTo(x3,y3); //设置三角形第三点的位置
        CT_BCtx.lineTo(x1,y1); //设置三角形终点的位置
        CT_BCtx.fill(); //填充三角形
        CT_BCtx.closePath(); //结束路径
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// Draw渲染
//--------------------------------------------------------------------
function CT_DrawRender(l)
{
    var _x = view_x(); //视野位置x
    var _y = view_y(); //视野位置y
    var i;
    for(i=0;i<CT_ContainerDraw.length;i++) //遍历draw容器
    {
        if(CT_ContainerDraw[i] != null) //如果当前draw不为空
        {
            var draw_l = CT_ContainerDraw[i][1]; //当前draw层
            if(draw_l === l) //如果当前draw层等于当前渲染层
            {
                var draw_type = CT_ContainerDraw[i][0]; //当前draw类型
                if(draw_type === 1) //如果当前draw是矩形
                {
                    var x = CT_ContainerDraw[i][2]; //矩形位置x
                    var y = CT_ContainerDraw[i][3]; //矩形位置y
                    var w = CT_ContainerDraw[i][4]; //矩形宽度
                    var h = CT_ContainerDraw[i][5]; //矩形高度
                    var c = CT_ContainerDraw[i][6]; //矩形颜色
                    var f = CT_ContainerDraw[i][7]; //矩形填充
                    CT_BufferRect(x-_x,y-_y,w,h,c,f); //绘制矩形
                }
                if(draw_type === 2) //如果draw类型是线
                {
                    var x1 = CT_ContainerDraw[i][2]; //线起点位置x
                    var y1 = CT_ContainerDraw[i][3]; //线起点位置y
                    var x2 = CT_ContainerDraw[i][4]; //线终点位置x
                    var y2 = CT_ContainerDraw[i][5]; //线终点位置y
                    var w = CT_ContainerDraw[i][6]; //线宽度
                    var c = CT_ContainerDraw[i][7]; //线颜色
                    CT_BufferLine(x1-_x,y1-_y,x2-_x,y2-_y,w,c); //绘制线
                }
                if(draw_type === 3) //如果draw类型是圆
                {
                    var x = CT_ContainerDraw[i][2]; //圆位置x
                    var y = CT_ContainerDraw[i][3]; //圆位置y
                    var r = CT_ContainerDraw[i][4]; //圆半径
                    var c = CT_ContainerDraw[i][5]; //圆颜色
                    var f = CT_ContainerDraw[i][6]; //圆填充
                    CT_BufferCircle(x-_x,y-_y,r,c,f); //绘制圆
                }
                if(draw_type === 4) //如果draw类型是字符串
                {
                    var x = CT_ContainerDraw[i][2]; //字符串位置x
                    var y = CT_ContainerDraw[i][3]; //字符串位置y
                    var s = CT_ContainerDraw[i][4]; //字符串字体大小
                    var c = CT_ContainerDraw[i][5]; //字符串颜色
                    var str = CT_ContainerDraw[i][6]; //字符串
                    CT_BufferString(x-_x,y-_y,s,c,str); //绘制字符串
                }
                if(draw_type === 5) //如果draw类型是图像
                {
                    var x = CT_ContainerDraw[i][2]; //图像位置x
                    var y = CT_ContainerDraw[i][3]; //图像位置y
                    var img = CT_ContainerDraw[i][4]; //图像
                    CT_BufferImage(x-_x,y-_y,img); //绘制图像
                }
                if(draw_type === 6) //如果draw类型是图像部分
                {
                    var x = CT_ContainerDraw[i][2]; //图像位置x
                    var y = CT_ContainerDraw[i][3]; //图像位置y
                    var img = CT_ContainerDraw[i][4]; //图像
                    var ix = CT_ContainerDraw[i][5]; //图像内位置x
                    var iy = CT_ContainerDraw[i][6]; //图像内位置y
                    var iw = CT_ContainerDraw[i][7]; //图像内宽度
                    var ih = CT_ContainerDraw[i][8]; //图像内高度
                    CT_BufferImagePart(x-_x,y-_y,img,ix,iy,iw,ih); //绘制图像部分
                }
                if(draw_type === 7) //如果draw类型是曲线
                {
                    var x1 = CT_ContainerDraw[i][2]; //曲线起点位置x
                    var y1 = CT_ContainerDraw[i][3]; //曲线起点位置y
                    var x2 = CT_ContainerDraw[i][4]; //曲线控制点位置x
                    var y2 = CT_ContainerDraw[i][5]; //曲线控制点位置y
                    var x3 = CT_ContainerDraw[i][6]; //曲线终点位置x
                    var y3 = CT_ContainerDraw[i][7]; //曲线终点位置y
                    var w = CT_ContainerDraw[i][8]; //曲线宽度
                    var c = CT_ContainerDraw[i][9]; //曲线颜色
                    CT_BufferCurve(x1-_x,y1-_y,x2-_x,y2-_y,x3-_x,y3-_y,w,c); //绘制曲线
                }
                if(draw_type === 8) //如果draw类型是三角形
                {
                    var x1 = CT_ContainerDraw[i][2];
                    var y1 = CT_ContainerDraw[i][3];
                    var x2 = CT_ContainerDraw[i][4];
                    var y2 = CT_ContainerDraw[i][5];
                    var x3 = CT_ContainerDraw[i][6];
                    var y3 = CT_ContainerDraw[i][7];
                    var c = CT_ContainerDraw[i][8];
                    var f = CT_ContainerDraw[i][9];
                    CT_BufferTri(x1-_x,y1-_y,x2,y2,x3,y3,c,f);
                }
            }
        }
    }
}
//--------------------------------------------------------------------
