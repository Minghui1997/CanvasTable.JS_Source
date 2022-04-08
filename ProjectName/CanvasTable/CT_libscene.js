"use strict";

//--------------------------------------------------------------------
// 场景对象
//--------------------------------------------------------------------
function CTscene()
{
    this.width = 960; //场景宽度
    this.height = 540; //场景高度
    this.grid_width = 30; //场景网格宽度
    this.grid_height = 30; //场景网格高度
    this.tile_image = []; //瓦片图片列表
    this.tile_map = []; //瓦片地图
    this.sprite_map = []; //sprite地图
//--------------------------------------------------------------------
    this.type = -1; //类型
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 进入场景
//--------------------------------------------------------------------
function scene_enter(scene)
{
    CT_SceneEnd = 1;
    CT_RunnerReset(); //运行器重置
    if(scene.type === -1) //如果对象是场景对象
    {
        CT_sceneWidth = scene.width; //场景宽度
        CT_sceneHeight = scene.height; //场景高度
        CT_GridWidth = scene.grid_width; //场景网格宽度
        CT_GridHeight = scene.grid_height; //场景网格高度
        if(CT_sceneWidth > 0 && CT_sceneHeight > 0 && CT_GridWidth > 0 && CT_GridHeight) //如果场景大小和网格大小大于0
        {
            if(CT_sceneWidth >= CT_GridWidth && CT_sceneHeight >= CT_GridHeight) //如果场景大小大于等于网格大小
            {
                var ti = scene.tile_image; //瓦片图片列表
                var tm = scene.tile_map; //瓦片地图
                var i;
                var tile_x = 0; //瓦片位置x
                var tile_y = 0; //瓦片位置y
                for(i=0;i<tm.length;i++) //遍历瓦片地图
                {
                    if(tm[i] != null) //如果瓦片地图当前层不为空
                    {
                        var i2;
                        for(i2=0;i2<tm[i].length;i2++) //遍历瓦片地图当前层
                        {
                            if(tile_y < CT_sceneHeight) //如果当前瓦片位置y小于场景高度
                            {
                                if(tile_x < CT_sceneWidth) //如果当前瓦片位置x小于场景宽度
                                {
                                    if(tm[i][i2] !== 0) //如果当前瓦片地图块不为空
                                    {
                                        var ti_i = 0; //瓦片图片索引
                                        var ti_width = CT_ResourceList[ti[ti_i]][2]; //当前瓦片图片宽度
                                        var ti_height = CT_ResourceList[ti[ti_i]][3]; //当前瓦片图片高度
                                        var ti_gxn = parseInt(ti_width / CT_GridWidth); //当前瓦片图片横向网格数
                                        var ti_gyn = parseInt(ti_height / CT_GridHeight); //当前瓦片图片纵向网格数
                                        var ti_gx = -1; //瓦片图块位置x
                                        var ti_gy = 0; //瓦片图块位置y
                                        var ti_index = tm[i][i2]; //瓦片地图块索引
                                        var i3;
                                        for(i3=0;i3<ti_index;i3++) //遍历瓦片图块
                                        {
                                            if(ti_gy < ti_gyn) //如果当前瓦片图块位置y小于瓦片图片高度
                                            {
                                                if(ti_gx < ti_gxn) //如果瓦片图块位置x小于瓦片图片宽度
                                                {
                                                    ti_gx += 1; //下一个瓦片图块
                                                }
                                                if(ti_gx >= ti_gxn) //如果下一个瓦片图块位置x大于等于瓦片图片宽度
                                                {
                                                    ti_gx = 0;
                                                    ti_gy += 1; //下一行瓦片图块
                                                }
                                            }
                                            if(ti_gy >= ti_gyn) //如果下一个瓦片图块位置y大于瓦片图片高度
                                            {
                                                ti_gx = 0;
                                                ti_gy = 0;
                                                ti_i ++; //切换下一个瓦片图片
                                                if(ti_i > ti.length - 1) //如果瓦片图块索引没有对应的瓦片图块
                                                {
                                                    cprint("ERROR 200 : Beyond range of tile image group. TileImageIndex : " + String(ti_i));
                                                }
                                            }
                                        }
                                        tile_create(i,tile_x,tile_y,ti[ti_i],ti_gx,ti_gy); //创建瓦片
                                    }
                                    tile_x += CT_GridWidth; //下一个瓦片位置x
                                }
                                if(tile_x >= CT_sceneWidth) //如果下一个瓦片位置x大于等于场景宽度
                                {
                                    tile_x = 0;
                                    tile_y += CT_GridHeight; //下一行瓦片位置y
                                }
                            }
                            if(tile_y >= CT_sceneHeight) //如果下一行瓦片位置y大于场景高度
                            {
                                tile_x = 0;
                                tile_y = 0;
                            }
                        }
                    }
                }
                scene.sprite_map(); //创建sprite地图
            }
            else
            {
                cprint("ERROR 201 : The size of the scene must be greater than the grid size");
            }
        }
        else
        {
            cprint("ERROR 202 : Unable to enter the scene");
        }
    }
    else
    {
        cprint("ERROR 203 : The specified scene is not a scene object");
    }
    CT_InterfaceRepaint(); //请求重绘
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// sprite地图
//--------------------------------------------------------------------
function m(x,y,spr)
{
    sprite_create(x,y,spr);
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 创建瓦片
//--------------------------------------------------------------------
function tile_create(l,x,y,res,gx,gy)
{
    var tix = gx * CT_GridWidth; //瓦片图片位置x
    var tiy = gy * CT_GridHeight; //瓦片图片位置y
    var tile_i = CT_ContainerTileIndex; //tile容器索引
    if(CT_ContainerTile.length > 0) //如果Tile容器长度大于0
    {
        var i;
        for(i=0;i<CT_ContainerTile.length;i++) //遍历Tile容器
        {
            if(CT_ContainerTile[i] == null) //如果当前Tile为空
            {
                CT_ContainerTile[i] = [l,x,y,res,tix,tiy]; //将Tile数据写入Tile容器
                CT_InterfaceRepaint(); //请求重绘
                return; //中断
            }
        }
        CT_ContainerTile[tile_i] = [l,x,y,res,tix,tiy]; //将Tile数据写入Tile容器
        CT_ContainerTileIndex ++; //Tile容器索引 +1
        CT_InterfaceRepaint(); //请求重绘
    }
    else
    {
        CT_ContainerTile[tile_i] = [l,x,y,res,tix,tiy]; //将Tile数据写入Tile容器
        CT_ContainerTileIndex ++; //Tile容器索引 +1
        CT_InterfaceRepaint(); //请求重绘
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 销毁瓦片
//--------------------------------------------------------------------
function tile_destroy(l,x,y)
{
    var i;
    for(i=0;i<CT_ContainerTile.length;i++) //遍历瓦片容器
    {
        if(CT_ContainerTile[i] != null) //如果当前瓦片不为空
        {
            var tl = CT_ContainerTile[i][0]; //当前瓦片层
            if(tl === l) //如果当前瓦片层等于层
            {
                var tx = CT_ContainerTile[i][1]; //当前瓦片位置x
                var ty = CT_ContainerTile[i][2]; //当前瓦片位置y
                if(x === tx && y === ty) //如果当前瓦片位置与参数位置相同
                {
                    CT_ContainerTile[i] = null; //清除当前瓦片数据
                    CT_InterfaceRepaint(); //请求重绘
                    break; //中断
                }
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 检查瓦片
//--------------------------------------------------------------------
function tile_check(l,x,y)
{
    var i;
    for(i=0;i<CT_ContainerTile.length;i++) //遍历瓦片容器
    {
        if(CT_ContainerTile[i] != null) //如果当前瓦片不为空
        {
            var tl = CT_ContainerTile[i][0]; //当前瓦片层
            if(tl === l) //如果当前瓦片层等于层
            {
                var tx = CT_ContainerTile[i][1]; //当前瓦片位置x
                var ty = CT_ContainerTile[i][2]; //当前瓦片位置y
                var gw = CT_GridWidth; //场景网格宽度
                var gh = CT_GridHeight; //场景网格高度
                if(x >= tx && y >= ty && x <= tx + gw && y <= ty + gh) //如果当前位置有瓦片
                {
                    return 1;
                }
            }
        }
    }
    return 0;
}
//--------------------------------------------------------------------