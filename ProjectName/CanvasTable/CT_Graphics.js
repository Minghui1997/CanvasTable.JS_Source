"use strict";

//--------------------------------------------------------------------
// 离屏画布清除
//--------------------------------------------------------------------
function CT_OffCanvas_Clear()
{
    CT_OCtx.clearRect(0,0,CT_CanvasW,CT_CanvasH); //清除离屏画布
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 离屏画布交换
//--------------------------------------------------------------------
function CT_OffCanvas_Swap()
{
    CT_Ctx.clearRect(0,0,CT_CanvasW,CT_CanvasH); //清除主画布
    CT_Ctx.drawImage(CT_OffCanvas,0,0); //将离屏画布输出到主画布
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制矩形(离屏)
//--------------------------------------------------------------------
function CT_OffCanvas_Rectangle(x,y,w,h,c,f)
{
    CT_OCtx.globalAlpha = 1; //全局透明度
    CT_OCtx.beginPath(); //开始路径
    if(f === 1) //如果填充
    {
        CT_OCtx.fillStyle = c; //填充颜色
        CT_OCtx.fillRect(x,y,w,h); //在离屏画布上绘制矩形
    }
    if(f === 0) //如果不填充
    {
        CT_OCtx.strokeStyle = c; //笔触颜色
        CT_OCtx.lineWidth = 1; //线宽度
        CT_OCtx.strokeRect(x+0.5,y+0.5,w-1,h-1); //在离屏画布上绘制矩形边框
    }
    CT_OCtx.closePath(); //结束路径
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制线(离屏)
//--------------------------------------------------------------------
function CT_OffCanvas_Line(x1,y1,x2,y2,w,c)
{
    var x1_o = 0; //线起点位置x偏移
    var y1_o = 0; //线起点位置y偏移
    var x2_o = 0; //线终点位置x偏移
    var y2_o = 0; //线终点位置y偏移
    if(x1 === x2) //如果是竖线
    {
        x1_o = 0.5; //线起点位置x偏移
        x2_o = 0.5; //线终点位置x偏移
        if(y1 < y2) //如果线起点位置y小于线终点位置y
        {
            y2_o = 1; //线终点位置y偏移
        }
        if(y1 > y2) //如果线起点位置y大于线终点位置y
        {
            y1_o = 1; //线起点位置y偏移
        }
    }
    if(y1 === y2) //如果是横线
    {
        y1_o = 0.5; //线起点位置y偏移
        y2_o = 0.5; //线终点位置y偏移
        if(x1 < x2) //如果线起点位置x小于线终点位置x
        {
            x2_o = 1; //线终点位置x偏移
        }
        if(x1 > x2) //如果线起点位置x大于线终点位置x
        {
            x1_o = 1; //线起点位置x偏移
        }
    }
    if(x1 !== x2 && y1 !== y2) //如果是斜线
    {
        if(x1 > x2) //如果线起点位置x大于线终点位置x
        {
            x1_o = 0.5; //线起点位置x偏移
        }
        if(x2 > x1) //如果线终点位置x大于线终点位置x
        {
            x2_o = 0.5; //线终点位置x偏移
        }
        if(y2 > y1) //如果线终点位置y大于线起点位置y
        {
            y2_o = 0.5; //线终点位置y偏移
        }
        if(y1 > y2) //如果线起点位置y大于线终点位置y
        {
            y1_o = 0.5; //线起点位置y偏移
        }
    }
    CT_OCtx.globalAlpha = 1; //全局透明度
    CT_OCtx.beginPath(); //开始路径
    CT_OCtx.strokeStyle = c; //笔触颜色
    CT_OCtx.lineWidth = w * 1.01; //线宽度
    CT_OCtx.moveTo(x1+x1_o,y1+y1_o); //设置线的起点位置
    CT_OCtx.lineTo(x2+x2_o,y2+y2_o); //设置线的终点位置
    CT_OCtx.stroke(); //在离屏画布上绘制线
    CT_OCtx.closePath(); //结束路径
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制圆(离屏)
//--------------------------------------------------------------------
function CT_OffCanvas_Circle(x,y,r,c,f)
{
    CT_OCtx.globalAlpha = 1; //全局透明度
    CT_OCtx.beginPath(); //开始路径
    if(f === 1) //如果填充
    {
        CT_OCtx.fillStyle = c; //填充颜色
        CT_OCtx.arc(x+0.5,y+0.5,r,0,Math.PI*2); //设置圆
        CT_OCtx.fill(); //在离屏画布上绘制圆
    }
    if(f === 0) //如果不填充
    {
        CT_OCtx.beginPath(); //开始路径
        CT_OCtx.strokeStyle = c; //笔触颜色
        CT_OCtx.lineWidth = 1; //线宽度
        CT_OCtx.arc(x+0.5,y+0.5,r,0,Math.PI*2); //设置圆
        CT_OCtx.arc(x+0.5,y+0.5,r,0,Math.PI*2); //设置圆
        CT_OCtx.stroke(); //在离屏画布上绘制圆
    }
    CT_OCtx.closePath(); //结束路径
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制文本(离屏)
//--------------------------------------------------------------------
function CT_OffCanvas_String(x,y,s,c,t)
{
    CT_OCtx.globalAlpha = 1; //全局透明度
    CT_OCtx.font = String(s) + "px Def"; //字体大小
    CT_OCtx.fillStyle = c; //字体颜色
    CT_OCtx.fillText(t,x,y+s-2); //在离屏画布上绘制文本
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制图像(离屏)
//--------------------------------------------------------------------
function CT_OffCanvas_Image(x,y,i,a)
{
    CT_OCtx.globalAlpha = a / 255; //全局透明度
    CT_OCtx.drawImage(CT_ContainerResource[i],x,y); //绘制资源容器中指定的图像
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制图像部分(离屏)
//--------------------------------------------------------------------
function CT_OffCanvas_ImagePart(x,y,i,a,ix,iy,iw,ih)
{
    CT_OCtx.globalAlpha = a / 255; //全局透明度
    CT_OCtx.drawImage(CT_ContainerResource[i],ix,iy,iw,ih,x,y,iw,ih); //绘制资源容器中指定的图像部分
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制平面图像部分(离屏)
//--------------------------------------------------------------------
function CT_OffCanvas_ImagePartFlat(x,y,img,ix,iy,iw,ih,alpha,sx,sy,rot)
{
    var dx = x; //绘制位置x
    var dy = y; //绘制位置y
    CT_OCtx.save(); //保存当前画布状态
    if(rot !== 0) //如果旋转角度不为0
    {
         dx = parseInt(0 - iw / 2); //绘制位置x
         dy = parseInt(0 - ih / 2); //绘制位置y
         var cx = 0; //中心位置x
         var cy = 0; //中心位置y
         var rot_a = Math.PI / 180 * rot; //弧度
         if(sx !== 1 || sy !== 1) //如果缩放sprite
         {
             cx = parseInt(x + iw * sx / 2); //绘制位置x
             cy = parseInt(y + ih * sy / 2); //绘制位置y
             CT_OCtx.translate(cx,cy); //坐标变换
             CT_OCtx.rotate(rot_a); //旋转sprite
             CT_OCtx.scale(sx,sy); //缩放sprite
         }
         else
         {
             cx = parseInt(x + iw / 2); //中心位置x
             cy = parseInt(y + ih / 2); //中心位置y
             CT_OCtx.translate(cx,cy); //坐标变换
             CT_OCtx.rotate(rot_a); //旋转sprite
         }
    }
    else
    {
        if(sx !== 1 || sy !== 1) //如果缩放sprite
        {
            dx = 0; //绘制位置x
            dy = 0; //绘制位置y
            CT_OCtx.translate(x,y); //坐标变换
            CT_OCtx.scale(sx,sy); //缩放sprite
        }
    }
    CT_OCtx.globalAlpha = alpha / 255; //全局透明度
    CT_OCtx.drawImage(CT_ContainerResource[img],ix,iy,iw,ih,dx,dy,iw,ih); //绘制sprite
    CT_OCtx.restore(); //恢复画布状态
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制曲线(离屏)
//--------------------------------------------------------------------
function CT_OffCanvas_Curve(x1,y1,x2,y2,x3,y3,w,c)
{
    CT_OCtx.globalAlpha = 1; //全局透明度
    CT_OCtx.beginPath(); //开始路径
    CT_OCtx.strokeStyle = c; //笔触颜色
    CT_OCtx.lineWidth = w; //曲线宽度
    CT_OCtx.moveTo(x1+0.5,y1+0.5); //曲线起点
    CT_OCtx.quadraticCurveTo(x2+0.5,y2+0.5,x3+0.5,y3+0.5); //曲线的控制点和终点
    CT_OCtx.stroke(); //在离屏画布上绘制曲线
    CT_OCtx.closePath(); //结束路径
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制不透明三角形(离屏)
//--------------------------------------------------------------------
function CT_OffCanvasOpaque_Triangle(x1,y1,x2,y2,x3,y3,c,f)
{
    CT_OCtx.globalAlpha = 1; //全局透明度
    if(f === 0) //如果不填充
    {
        CT_OCtx.beginPath(); //开始路径
        CT_OCtx.strokeStyle = c; //笔触颜色
        CT_OCtx.moveTo(x1+0.5,y1+0.5); //设置三角形的起点位置
        CT_OCtx.lineTo(x2+0.5,y2+0.5); //设置三角形第二点的位置
        CT_OCtx.lineTo(x3+0.5,y3+0.5); //设置三角形第三点的位置
        CT_OCtx.lineTo(x1+0.5,y1+0.5); //设置三角形终点的位置
        CT_OCtx.stroke(); //在离屏画布上绘制三角形
        CT_OCtx.closePath(); //结束路径
    }
    if(f === 1) //如果填充
    {
        CT_OCtx.beginPath(); //开始路径
        CT_OCtx.strokeStyle = c; //笔触颜色
        CT_OCtx.moveTo(x1+0.5,y1+0.5); //设置三角形的起点位置
        CT_OCtx.lineTo(x2+0.5,y2+0.5); //设置三角形第二点的位置
        CT_OCtx.lineTo(x3+0.5,y3+0.5); //设置三角形第三点的位置
        CT_OCtx.lineTo(x1+0.5,y1+0.5); //设置三角形终点的位置
        CT_OCtx.stroke(); //在离屏画布上绘制三角形
        CT_OCtx.closePath(); //结束路径
        CT_OCtx.beginPath(); //开始路径
        CT_OCtx.fillStyle = c; //填充颜色
        CT_OCtx.moveTo(x1+0.5,y1+0.5); //设置三角形的起点位置
        CT_OCtx.lineTo(x2+0.5,y2+0.5); //设置三角形第二点的位置
        CT_OCtx.lineTo(x3+0.5,y3+0.5); //设置三角形第三点的位置
        CT_OCtx.lineTo(x1+0.5,y1+0.5); //设置三角形终点的位置
        CT_OCtx.fill(); //在离屏画布上绘制三角形
        CT_OCtx.closePath(); //结束路径
    }
}
//--------------------------------------------------------------------