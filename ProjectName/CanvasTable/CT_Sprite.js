"use strict";

//--------------------------------------------------------------------
// sprite容器格式
//--------------------------------------------------------------------
// [占位符,id,层,x,y,图像索引,子图像索引,子图像数量,子图像宽度,子图像高度,上次位置x,上次位置y,碰撞类型,边缘碰撞,旋转,碰撞盒x,碰撞盒y,碰撞盒宽度,碰撞盒高度,碰撞盒中心x,碰撞盒中心y,碰撞盒半径,透明度,横向缩放,竖向缩放,...]
//--------------------------------------------------------------------
var CT_ContainerSprite = []; //sprite容器
var CT_SpriteLayerStatusList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //sprite层状态列表
var CT_ContainerSpriteLength = 0; //sprite容器长度
var CT_SpriteID = 0; //sprite对象ID
//--------------------------------------------------------------------
// sprite对象ID获取
//--------------------------------------------------------------------
function CT_SpriteGetID()
{
    var id = CT_SpriteID; //当前spriteID
    CT_SpriteID ++; //spriteID +1
    if(CT_SpriteID > 2000000000) //如果spriteID大于2000000000
    {
        CT_SpriteID = 1000000000; //spriteID等于1000000000
    }
    return id; //返回spriteID
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// sprite渲染
//--------------------------------------------------------------------
function CT_SpriteRender(l)
{
    var vx = CT_ViewX; //视野位置x
    var vy = CT_ViewY; //视野位置y
    var i;
    var data_i;
    for(i=0;i<CT_ContainerSpriteLength;i++) //遍历sprite容器
    {
        data_i = i * 25; //sprite数据索引
        if(CT_ContainerSprite[data_i] !== 0) //如果当前sprite不为空
        {
            var sl = CT_ContainerSprite[data_i+2]; //当前sprite层
            if(sl === l) //如果当前sprite层等于渲染层
            {
                var x = CT_ContainerSprite[data_i+3]; //当前sprite位置x
                var y = CT_ContainerSprite[data_i+4]; //当前sprite位置y
                var image = CT_ContainerSprite[data_i+5]; //当前sprite图像索引
                var subimg = CT_ContainerSprite[data_i+6]; //当前sprite子图像索引
                var subimg_w = CT_ContainerSprite[data_i+8]; //当前子图像宽度
                var subimg_h = CT_ContainerSprite[data_i+9]; //当前子图像高度
                var alpha = CT_ContainerSprite[data_i+22]; //当前sprite透明度
                var scale_x = CT_ContainerSprite[data_i+23]; //当前sprite横向缩放
                var scale_y = CT_ContainerSprite[data_i+24]; //当前sprite竖向缩放
                var rotate = CT_ContainerSprite[data_i+14]; //当前sprite旋转
                if(image !== -1) //如果sprite图像不为空
                {
                    if(x + subimg_w * scale_x > vx && x < vx + CT_CanvasW && y + subimg_h * scale_y > vy && y < vy + CT_CanvasH) //如果当前sprite在视野内
                    {
                        var si_x = subimg * subimg_w; //图块位置x
                        var si_y = 0; //图块位置y
                        if(scale_x === 1 && scale_y === 1 && rotate === 0) //如果sprite没有设置样式
                        {
                            CT_OffCanvas_ImagePart(x-vx,y-vy,image,alpha,si_x,si_y,subimg_w,subimg_h); //绘制sprite
                        }
                        else
                        {
                            CT_OffCanvas_ImagePartFlat(x-vx,y-vy,image,si_x,si_y,subimg_w,subimg_h,alpha,scale_x,scale_y,rotate); //绘制平面sprite
                        }
                    }
                }
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// sprite结束
//--------------------------------------------------------------------
function CT_SpriteEnd()
{
    var i;
    var data_i;
    for(i=0;i<CT_ContainerSpriteLength;i++) //遍历sprite容器
    {
        data_i = i * 25; //sprite数据索引
        if(CT_ContainerSprite[data_i] !== 0) //如果当前sprite不为空
        {
            var spr_x = CT_ContainerSprite[data_i+3]; //当前sprite位置x
            var spr_y = CT_ContainerSprite[data_i+4]; //当前sprite位置y
            CT_ContainerSprite[data_i+10] = spr_x; //设置sprite上次位置x
            CT_ContainerSprite[data_i+11] = spr_y; //设置sprite上次位置y
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// sprite容器清除
//--------------------------------------------------------------------
function CT_ContainerSpriteClear()
{
    CT_ContainerSprite = []; //清除sprite容器
    CT_SpriteLayerStatusList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //将所有sprite层的状态标记为0
    CT_ContainerSpriteLength = 0; //sprite容器长度为0
}
//--------------------------------------------------------------------