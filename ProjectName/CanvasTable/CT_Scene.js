"use strict";

//瓦片容器格式
// [[层,瓷砖位置x,瓷砖位置y,瓷砖图片索引,图片区x,图片区y],...]
var CT_sceneWidth = 0; //场景宽度
var CT_sceneHeight = 0; //场景高度
var CT_GridWidth = 30; //场景网格宽度
var CT_GridHeight = 30; //场景网格高度
var CT_TileOffset = 0; //瓦片图像偏移
var CT_ContainerTile = []; //瓦片容器
var CT_ContainerTileLength = 0; //Tile容器长度

//--------------------------------------------------------------------
// 渲染瓦片
//--------------------------------------------------------------------
function CT_TileRender(l)
{
    var vx = CT_ViewX; //视野位置x
    var vy = CT_ViewY; //视野位置y
    var i;
    for(i=0;i<CT_ContainerTileLength;i++) //遍历瓦片容器当前
    {
        if(CT_ContainerTile[i] != null) //如果当前瓦片不为空
        {
            var tl = CT_ContainerTile[i][0]; //当前瓦片层
            if(tl === l) //如果当前瓦片层等于渲染层
            {
                var tx = CT_ContainerTile[i][1]; //当前瓦片位置x
                var ty = CT_ContainerTile[i][2]; //当前瓦片位置y
                var ti = CT_ContainerTile[i][3]; //当前瓦片图片索引
                var tix = CT_ContainerTile[i][4]; //当前瓦片图片位置x
                var tiy = CT_ContainerTile[i][5]; //当前瓦片图片位置y
                if(tx + CT_GridWidth > vx && tx < vx + CT_CanvasW && ty + CT_GridHeight > vy && ty < vy + CT_CanvasH) //如果当前瓦片在视野内
                {
                    CTBCanvas_ImagePart(tx-vx,ty-vy,ti,tix,tiy,CT_GridWidth,CT_GridHeight); //绘制瓦片
                }
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 瓦片生成
//--------------------------------------------------------------------
function CT_TileBuild(l,x,y,res,gx,gy)
{
    var tix = CT_TileOffset + (CT_GridWidth * gx) + (gx * CT_TileOffset * 2); //瓦片图像位置x
    var tiy = CT_TileOffset + (CT_GridHeight * gy) + (gy * CT_TileOffset * 2); //瓦片图像位置y
    var tile_i = CT_ContainerTileLength; //tile容器索引
    if(res !== -1) //如果有tile图像
    {
        var res_type = CT_ResourceList[res][1]; //获取资源类型
        if(res_type === 0) //如果资源类型是图像
        {
            CT_ContainerTile[tile_i] = [l,x,y,res,tix,tiy]; //将Tile数据写入Tile容器
            CT_ContainerTileLength ++; //Tile容器索引 +1
        }
        else
        {
            cprint("ERROR : The resource index corresponding to the resource file is not a image.");
        }
    }
}
//--------------------------------------------------------------------