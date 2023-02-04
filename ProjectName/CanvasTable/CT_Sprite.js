"use strict";

//--------------------------------------------------------------------
// Sprite容器格式
//--------------------------------------------------------------------
// [[id,层,x,y,图像索引,子图像索引,子图像数量,子图像宽度,子图像高度,上次位置x,上次位置y,碰撞类型,边缘碰撞,子图像偏移,碰撞盒x,碰撞盒y,碰撞盒宽度,碰撞盒高度,碰撞盒中心x,碰撞盒中心y,碰撞盒半径,颜色,横向缩放,竖向缩放,旋转],...]
//--------------------------------------------------------------------
var CT_ContainerSprite = []; //Sprite容器
var CT_ContainerSpriteLength = 0; //Sprite容器长度
var CT_SpriteId = 0; //Sprite对象ID
//--------------------------------------------------------------------
// Sprite对象ID
//--------------------------------------------------------------------
function CT_SpriteGetId()
{
    var id = CT_SpriteId; //当前Sprite Id
    CT_SpriteId ++; //Sprite Id +1
    if(CT_SpriteId > 2100000000) //如果Sprite Id大于2100000000
    {
        CT_SpriteId = 630000000; //Sprite Id等于630000000
    }
    return id; //返回 Sprite Id
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 渲染Sprite
//--------------------------------------------------------------------
function CT_SpriteRender(l)
{
    var vx = CT_ViewX; //视野位置x
    var vy = CT_ViewY; //视野位置y
    var i;
    for(i=0;i<CT_ContainerSpriteLength;i++) //遍历sprite容器
    {
        if(CT_ContainerSprite[i] != null) //如果当前sprite不为空
        {
            var sl = CT_ContainerSprite[i][1]; //当前sprite层
            if(sl === l) //如果当前sprite层等于渲染层
            {
                var x = CT_ContainerSprite[i][2]; //sprite位置x
                var y = CT_ContainerSprite[i][3]; //sprite位置y
                var image = CT_ContainerSprite[i][4]; //sprite图像索引
                var subimg = CT_ContainerSprite[i][5]; //sprite子图像索引
                var subimg_o = CT_ContainerSprite[i][13]; //子图像偏移
                var subimg_w = CT_ContainerSprite[i][7]; //子图像宽度
                var subimg_h = CT_ContainerSprite[i][8]; //子图像高度
                var alpha = CT_ContainerSprite[i][21]; //sprite透明度
                var scale_x = CT_ContainerSprite[i][22]; //sprite横向缩放
                var scale_y = CT_ContainerSprite[i][23]; //sprite竖向缩放
                var rotate = CT_ContainerSprite[i][24]; //sprite旋转
                if(image !== -1) //如果sprite图像不为空
                {
                    if(x + subimg_w * scale_x > vx && x < vx + CT_CanvasW && y + subimg_h * scale_y > vy && y < vy + CT_CanvasH) //如果当前sprite在视野内
                    {
                        var si_x = subimg * subimg_w; //图块位置x
                        var si_y = 0; //图块位置y
                        if(subimg_o > 0) //子如果图像偏移大于0
                        {
                            si_x = subimg_o + (subimg_w * subimg) + (subimg * subimg_o * 2); //图块位置x
                            si_y = subimg_o; //图块位置y
                        }
                        if(alpha === 255 && scale_x === 1 && scale_y === 1 && rotate === 0) //如果sprite没有设置样式
                        {
                            CTBCanvas_ImagePart(x-vx,y-vy,image,si_x,si_y,subimg_w,subimg_h); //绘制sprite
                        }
                        else
                        {
                            CT_SpriteFlat(x-vx,y-vy,image,si_x,si_y,subimg_w,subimg_h,alpha,scale_x,scale_y,rotate); //绘制平面sprite
                        }
                    }
                }
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// Sprite重置
//--------------------------------------------------------------------
function CT_SpriteReset()
{
    var i;
    for(i=0;i<CT_ContainerSpriteLength;i++) //遍历sprite容器
    {
        if(CT_ContainerSprite[i] != null) //如果当前sprite不为空
        {
            var spr_x = CT_ContainerSprite[i][2]; //当前sprite位置x
            var spr_y = CT_ContainerSprite[i][3]; //当前sprite位置y
            CT_ContainerSprite[i][9] = spr_x; //设置sprite上次位置x
            CT_ContainerSprite[i][10] = spr_y; //设置sprite上次位置y
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// Sprite平面
//--------------------------------------------------------------------
function CT_SpriteFlat(x,y,img,six,siy,siw,sih,alpha,sx,sy,rot)
{
    var dx = x; //绘制位置x
    var dy = y; //绘制位置y
    CT_BCtx.save(); //保存当前画布状态
    if(rot !== 0) //如果旋转角度不为0
    {
         dx = parseInt(0 - siw / 2); //绘制位置x
         dy = parseInt(0 - sih / 2); //绘制位置y
         var cx = 0; //中心位置x
         var cy = 0; //中心位置y
         var rot_a = Math.PI / 180 * rot; //弧度
         if(sx !== 1 || sy !== 1) //如果缩放sprite
         {
             cx = parseInt(x + siw * sx / 2); //绘制位置x
             cy = parseInt(y + sih * sy / 2); //绘制位置y
             CT_BCtx.translate(cx,cy); //坐标变换
             CT_BCtx.rotate(rot_a); //旋转sprite
             CT_BCtx.scale(sx,sy); //缩放sprite
         }
         else
         {
             cx = parseInt(x + siw / 2); //中心位置x
             cy = parseInt(y + sih / 2); //中心位置y
             CT_BCtx.translate(cx,cy); //坐标变换
             CT_BCtx.rotate(rot_a); //旋转sprite
         }
    }
    else
    {
        if(sx !== 1 || sy !== 1) //如果缩放sprite
        {
            dx = 0; //绘制位置x
            dy = 0; //绘制位置y
            CT_BCtx.translate(x,y); //坐标变换
            CT_BCtx.scale(sx,sy); //缩放sprite
        }
    }
    CT_BCtx.globalAlpha = alpha / 255;
    CT_BCtx.drawImage(CT_ContainerResource[img],six,siy,siw,sih,dx,dy,siw,sih); //绘制sprite
    CT_BCtx.globalAlpha = 1;
    CT_BCtx.restore(); //恢复画布状态
}
//--------------------------------------------------------------------