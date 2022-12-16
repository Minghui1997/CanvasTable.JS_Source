"use strict";

//--------------------------------------------------------------------
// Sprite容器格式
//--------------------------------------------------------------------
// [[id,层,x,y,图像索引,子图像索引,子图像数量,子图像宽度,子图像高度,上次位置x,上次位置y,碰撞类型,边缘碰撞,子图像偏移],...]
//--------------------------------------------------------------------
var CT_ContainerSprite = []; //Sprite容器
var CT_ContainerSpriteIndex = 0; //Sprite索引
var CT_SpriteId = 0; //Sprite对象ID
//--------------------------------------------------------------------
// Sprite对象ID
//--------------------------------------------------------------------
function CT_SpriteGetId()
{
    var id = CT_SpriteId; //当前Sprite Id
    CT_SpriteId ++; //Sprite Id +1
    return id; //返回 Sprite Id
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 渲染Sprite
//--------------------------------------------------------------------
function CT_SpriteRender(l)
{     
    var i;
    for(i=0;i<CT_ContainerSpriteIndex;i++) //遍历Sprite容器
    {
        if(CT_ContainerSprite[i] != null) //如果当前Sprite不为空
        {
            var sl = CT_ContainerSprite[i][1]; //当前Sprite层
            if(sl === l) //如果当前Sprite层等于渲染层
            {
                var x = CT_ContainerSprite[i][2]; //sprite位置x
                var y = CT_ContainerSprite[i][3]; //sprite位置y
                var image = CT_ContainerSprite[i][4]; //sprite图像索引
                var subimg = CT_ContainerSprite[i][5]; //sprite子图像索引
                var subimg_o = CT_ContainerSprite[i][13]; //子图像偏移
                var subimg_w = CT_ContainerSprite[i][7]; //子图像宽度
                var subimg_h = CT_ContainerSprite[i][8]; //子图像高度
                if(image !== -1) //如果sprite图像不为空
                {
                    var _x = view_x(); //视野位置x
                    var _y = view_y(); //视野位置y
                    var si_x = subimg_o + (subimg_w * subimg) + (subimg * subimg_o * 2); //图块位置x
                    var si_y = subimg_o; //图块位置y
                    CTBCanvas_ImagePart(x-_x,y-_y,image,si_x,si_y,subimg_w,subimg_h); //绘制sprite
                }
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// Sprite位置记录
//--------------------------------------------------------------------
function CT_SpritePosRecord()
{
    var i;
    for(i=0;i<CT_ContainerSpriteIndex;i++) //遍历Sprite容器
    {
        if(CT_ContainerSprite[i] != null) //如果当前Sprite不为空
        {
            var spr_x = CT_ContainerSprite[i][2]; //当前sprite位置x
            var spr_y = CT_ContainerSprite[i][3]; //当前sprite位置y
            CT_ContainerSprite[i][9] = spr_x; //设置sprite上次位置x
            CT_ContainerSprite[i][10] = spr_y; //设置sprite上次位置y
        }
    }
}
//--------------------------------------------------------------------