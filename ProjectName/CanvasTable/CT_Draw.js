"use strict";

//--------------------------------------------------------------------
// Draw容器格式
//--------------------------------------------------------------------
// [draw数据,...]

// draw数据格式
// 矩形:占位符,1,层,x,y,宽度,高度,颜色,实心
// 线:占位符,2,层,起点x,起点y,终点x,终点y,宽度,颜色
// 圆:占位符,3,层,中心x,中心y,半径,颜色,实心
// 字符串:占位符,4,层,x,y,字体大小,颜色,字符串
// 图片:占位符,5,层,x,y,图片资源,透明度
// 图块:占位符,6,层,x,y,图片资源,图块x,图块y,图块宽度,图块高度,透明度
// 曲线:占位符,7,层,起点x,起点y,操作点x,操作点y,结束点x,结束点y,宽度,颜色
// 三角形:占位符,8,层,第一点位置x,第一点位置y,第二点位置x,第二点位置y,第三点位置x,第三点位置y,颜色,实心
// 图像字符串:占位符,9,层,x,y,透明度,字符串,字体图像,字符数,字符间隙,字符列表,字形列表
//--------------------------------------------------------------------
var CT_ContainerDraw = []; //draw容器
var CT_DrawLayerStatusList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //Draw层状态列表
var CT_ContainerDrawLength = 0; //draw容器长度
var CT_DrawLayer = 0; //draw层级
var CT_DrawAlpha = 255; //Draw透明度

//--------------------------------------------------------------------
// Draw渲染
//--------------------------------------------------------------------
function CT_DrawRender(l)
{
    var vx = CT_ViewX; //视野位置x
    var vy = CT_ViewY; //视野位置y
    var i;
    var data_i;
    for(i=0;i<CT_ContainerDrawLength;i++) //遍历draw容器
    {
        data_i = i * 15; //draw数据索引
        if(CT_ContainerDraw[data_i] !== 0) //如果当前draw不为空
        {
            var draw_l = CT_ContainerDraw[data_i+2]; //当前draw层
            if(draw_l === l) //如果当前draw层等于当前渲染层
            {
                var draw_type = CT_ContainerDraw[data_i+1]; //当前draw类型
                if(draw_type === 1) //如果当前draw是矩形
                {
                    var x = CT_ContainerDraw[data_i+3]; //矩形位置x
                    var y = CT_ContainerDraw[data_i+4]; //矩形位置y
                    var w = CT_ContainerDraw[data_i+5]; //矩形宽度
                    var h = CT_ContainerDraw[data_i+6]; //矩形高度
                    var c = CT_ContainerDraw[data_i+7]; //矩形颜色
                    var f = CT_ContainerDraw[data_i+8]; //矩形填充
                    CT_OffCanvas_Rectangle(x-vx,y-vy,w,h,c,f); //绘制矩形
                }
                if(draw_type === 2) //如果draw类型是线
                {
                    var x1 = CT_ContainerDraw[data_i+3]; //线起点位置x
                    var y1 = CT_ContainerDraw[data_i+4]; //线起点位置y
                    var x2 = CT_ContainerDraw[data_i+5]; //线终点位置x
                    var y2 = CT_ContainerDraw[data_i+6]; //线终点位置y
                    var w = CT_ContainerDraw[data_i+7]; //线宽度
                    var c = CT_ContainerDraw[data_i+8]; //线颜色
                    CT_OffCanvas_Line(x1-vx,y1-vy,x2-vx,y2-vy,w,c); //绘制线
                }
                if(draw_type === 3) //如果draw类型是圆
                {
                    var x = CT_ContainerDraw[data_i+3]; //圆位置x
                    var y = CT_ContainerDraw[data_i+4]; //圆位置y
                    var r = CT_ContainerDraw[data_i+5]; //圆半径
                    var c = CT_ContainerDraw[data_i+6]; //圆颜色
                    var f = CT_ContainerDraw[data_i+7]; //圆填充
                    CT_OffCanvas_Circle(x-vx,y-vy,r,c,f); //绘制圆
                }
                if(draw_type === 4) //如果draw类型是字符串
                {
                    var x = CT_ContainerDraw[data_i+3]; //字符串位置x
                    var y = CT_ContainerDraw[data_i+4]; //字符串位置y
                    var s = CT_ContainerDraw[data_i+5]; //字符串字体大小
                    var c = CT_ContainerDraw[data_i+6]; //字符串颜色
                    var str = CT_ContainerDraw[data_i+7]; //字符串
                    CT_OffCanvas_String(x-vx,y-vy,s,c,str); //绘制字符串
                }
                if(draw_type === 5) //如果draw类型是图像
                {
                    var x = CT_ContainerDraw[data_i+3]; //图像位置x
                    var y = CT_ContainerDraw[data_i+4]; //图像位置y
                    var img = CT_ContainerDraw[data_i+5]; //图像
                    var a = CT_ContainerDraw[data_i+6]; //透明度
                    CT_OffCanvas_Image(x-vx,y-vy,img,a); //绘制图像
                }
                if(draw_type === 6) //如果draw类型是图像部分
                {
                    var x = CT_ContainerDraw[data_i+3]; //图像位置x
                    var y = CT_ContainerDraw[data_i+4]; //图像位置y
                    var img = CT_ContainerDraw[data_i+5]; //图像
                    var ix = CT_ContainerDraw[data_i+6]; //图像内位置x
                    var iy = CT_ContainerDraw[data_i+7]; //图像内位置y
                    var iw = CT_ContainerDraw[data_i+8]; //图像内宽度
                    var ih = CT_ContainerDraw[data_i+9]; //图像内高度
                    var a = CT_ContainerDraw[data_i+10]; //透明度
                    CT_OffCanvas_ImagePart(x-vx,y-vy,img,a,ix,iy,iw,ih); //绘制图像部分
                }
                if(draw_type === 7) //如果draw类型是曲线
                {
                    var x1 = CT_ContainerDraw[data_i+3]; //曲线起点位置x
                    var y1 = CT_ContainerDraw[data_i+4]; //曲线起点位置y
                    var x2 = CT_ContainerDraw[data_i+5]; //曲线控制点位置x
                    var y2 = CT_ContainerDraw[data_i+6]; //曲线控制点位置y
                    var x3 = CT_ContainerDraw[data_i+7]; //曲线终点位置x
                    var y3 = CT_ContainerDraw[data_i+8]; //曲线终点位置y
                    var w = CT_ContainerDraw[data_i+9]; //曲线宽度
                    var c = CT_ContainerDraw[data_i+10]; //曲线颜色
                    CT_OffCanvas_Curve(x1-vx,y1-vy,x2-vx,y2-vy,x3-vx,y3-vy,w,c); //绘制曲线
                }
                if(draw_type === 8) //如果draw类型是三角形
                {
                    var x1 = CT_ContainerDraw[data_i+3]; //三角形第一点位置x
                    var y1 = CT_ContainerDraw[data_i+4]; //三角形第一点位置y
                    var x2 = CT_ContainerDraw[data_i+5]; //三角形第二点位置x
                    var y2 = CT_ContainerDraw[data_i+6]; //三角形第二点位置y
                    var x3 = CT_ContainerDraw[data_i+7]; //三角形第三点位置x
                    var y3 = CT_ContainerDraw[data_i+8]; //三角形第三点位置y
                    var c = CT_ContainerDraw[data_i+9]; //三角形颜色
                    var f = CT_ContainerDraw[data_i+10]; //三角形填充
                    CT_OffCanvasOpaque_Triangle(x1-vx,y1-vy,x2,y2,x3,y3,c,f); //绘制三角形
                }
                if(draw_type === 9) //如果draw类型是图像字符串
                {
                    var x = CT_ContainerDraw[data_i+3]; //图像字符串位置x
                    var y = CT_ContainerDraw[data_i+4]; //图像字符串位置y
                    var a = CT_ContainerDraw[data_i+5]; //图像字符串透明度
                    var t = CT_ContainerDraw[data_i+6]; //图像字符串
                    var font_img = CT_ContainerDraw[data_i+7]; //字体图像索引
                    var font_charnum = CT_ContainerDraw[data_i+8]; //字体字符数
                    var font_chargap = CT_ContainerDraw[data_i+9]; //字体字符间隙
                    var font_charlist = CT_ContainerDraw[data_i+10]; //字体字符列表
                    var font_glyphlist = CT_ContainerDraw[data_i+11]; //字体字形列表
                    CT_OffCanvas_ImgString(x-vx,y-vy,a,t,font_img,font_charnum,font_chargap,font_charlist,font_glyphlist); //绘制图像字符串
                }
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// Draw容器清除
//--------------------------------------------------------------------
function CT_ContainerDrawClear()
{
    CT_ContainerDraw = []; //清除draw容器
    CT_DrawLayerStatusList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //将所有draw层的状态标记为0
    CT_ContainerDrawLength = 0; //Draw容器长度为0
    CT_DrawLayer = 0; //Draw容器层为0
}
//--------------------------------------------------------------------