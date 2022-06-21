"use strict";

//瓦片容器格式
// [[层,瓷砖位置x,瓷砖位置y,瓷砖图片索引,图片区x,图片区y],...]
var CT_sceneWidth = 0; //场景宽度
var CT_sceneHeight = 0; //场景高度
var CT_GridWidth = 30; //场景网格宽度
var CT_GridHeight = 30; //场景网格高度
var CT_ContainerTile = []; //瓦片容器
var CT_ContainerTileIndex = 0; //Tile容器索引

//--------------------------------------------------------------------
// 渲染瓦片
//--------------------------------------------------------------------
function CT_TileRender(l)
{
    var _x = view_x(); //视野位置x
    var _y = view_y(); //视野位置y
    var i;
    for(i=0;i<CT_ContainerTileIndex;i++) //遍历瓦片容器当前
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
                CT_BufferImagePart(tx-_x,ty-_y,ti,tix,tiy,CT_GridWidth,CT_GridHeight); //绘制瓦片
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
    var tix = gx * CT_GridWidth; //瓦片图片位置x
    var tiy = gy * CT_GridHeight; //瓦片图片位置y
    var tile_i = CT_ContainerTileIndex; //tile容器索引
    CT_ContainerTile[tile_i] = [l,x,y,res,tix,tiy]; //将Tile数据写入Tile容器
    CT_ContainerTileIndex ++; //Tile容器索引 +1
}
//--------------------------------------------------------------------