"use strict";

//瓦片容器格式
// [层,瓷砖位置x,瓷砖位置y,瓷砖图片索引,图片区x,图片区y,...]
var CT_sceneWidth = 0; //场景宽度
var CT_sceneHeight = 0; //场景高度
var CT_GridWidth = 30; //场景网格宽度
var CT_GridHeight = 30; //场景网格高度
var CT_ContainerTile = []; //瓦片容器
var CT_ContainerTileLength = 0; //瓦片容器长度
var CT_TileLayerStatusList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //瓦片层状态列表

//--------------------------------------------------------------------
// 瓦片渲染
//--------------------------------------------------------------------
function CT_TileRender(l)
{
    var vx = CT_ViewX; //视野位置x
    var vy = CT_ViewY; //视野位置y
    var i;
    var data_i;
    for(i=0;i<CT_ContainerTileLength;i++) //遍历瓦片容器当前
    {
        data_i = i * 7; //瓦片数据索引
        if(CT_ContainerTile[data_i] !== 0) //如果当前瓦片不为空
        {
            var tl = CT_ContainerTile[data_i+1]; //当前瓦片层
            if(tl === l) //如果当前瓦片层等于渲染层
            {
                var tx = CT_ContainerTile[data_i+2]; //当前瓦片位置x
                var ty = CT_ContainerTile[data_i+3]; //当前瓦片位置y
                var ti = CT_ContainerTile[data_i+4]; //当前瓦片图片索引
                var tix = CT_ContainerTile[data_i+5]; //当前瓦片图片位置x
                var tiy = CT_ContainerTile[data_i+6]; //当前瓦片图片位置y
                if(tx + CT_GridWidth > vx && tx < vx + CT_CanvasW && ty + CT_GridHeight > vy && ty < vy + CT_CanvasH) //如果当前瓦片在视野内
                {
                    CT_OffCanvas_ImagePart(tx-vx,ty-vy,ti,255,tix,tiy,CT_GridWidth,CT_GridHeight); //绘制瓦片
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
    var tix = CT_GridWidth * gx; //瓦片图像位置x
    var tiy = CT_GridHeight * gy; //瓦片图像位置y
    var tile_i = CT_ContainerTileLength * 7; //瓦片数据索引
    if(l >= 0 && l <= 31) //如果瓦片层在正确范围内
    {
        if(res !== -1) //如果资源不为空
        {
            var res_type = CT_ResourceArgList[res*5+1]; //获取资源类型
            if(res_type === 0) //如果资源类型是图像
            {
                //将瓦片数据写入瓦片容器
                CT_ContainerTile[tile_i] = 1;
                CT_ContainerTile[tile_i+1] = l;
                CT_ContainerTile[tile_i+2] = x;
                CT_ContainerTile[tile_i+3] = y;
                CT_ContainerTile[tile_i+4] = res;
                CT_ContainerTile[tile_i+5] = tix;
                CT_ContainerTile[tile_i+6] = tiy;
                CT_ContainerTileLength ++; //瓦片容器索引 +1
                CT_TileLayerStatusList[l] = 1; //将当前瓦片层的状态标记为1
            }
            else
            {
                cprint("ERROR : The resource index corresponding to the resource file is not image.");
            }
        }
    }
    else
    {
        cprint("ERROR : The tile layer is error.");
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 瓦片容器清除
//--------------------------------------------------------------------
function CT_ContainerTileClear()
{
    CT_ContainerTile = []; //清除瓦片容器
    CT_TileLayerStatusList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //将所有瓦片层的状态标记为0
    CT_ContainerTileLength = 0; //瓦片容器长度为0
}
//--------------------------------------------------------------------