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
    this.sprite_map = null; //sprite地图
//--------------------------------------------------------------------
    this.type = -1; //类型
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 场景进入
//--------------------------------------------------------------------
function scene_enter(scene)
{
    CT_RunnerStatus = 0; //停止运行器
    CT_RunnerReset(); //运行器重置
    if(scene != null) //如果场景对象不为空
    {
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
                    var tile_num = parseInt((CT_sceneWidth / CT_GridWidth) * (CT_sceneHeight / CT_GridHeight)); //计算瓦片网格数
                    var ti = scene.tile_image; //瓦片图片列表
                    var tm = scene.tile_map; //瓦片地图
                    var sprite_map = scene.sprite_map; //sprite地图
                    var i;
                    var tile_x = 0; //瓦片位置x
                    var tile_y = 0; //瓦片位置y
                    for(i=0;i<32;i++) //遍历瓦片地图
                    {
                        if(tm[i] != null) //如果瓦片地图当前层不为空
                        {
                            var i2;
                            for(i2=0;i2<tile_num;i2++) //遍历瓦片地图当前层
                            {
                                if(tile_y < CT_sceneHeight) //如果当前瓦片位置y小于场景高度
                                {
                                    if(tile_x < CT_sceneWidth) //如果当前瓦片位置x小于场景宽度
                                    {
                                        if(tm[i][i2] !== 0) //如果当前瓦片地图块不为空
                                        {
                                            var ti_i = 0; //瓦片图片索引
                                            var ldata_i = ti[ti_i] * 5; //资源参数数据索引
                                            var ti_width = CT_ResourceArgList[ldata_i+2]; //当前瓦片图片宽度
                                            var ti_height = CT_ResourceArgList[ldata_i+3]; //当前瓦片图片高度
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
                                                    ti_gx = 0; //瓦片图块位置x
                                                    ti_gy = 0; //瓦片图块位置y
                                                    ti_i ++; //切换下一个瓦片图片
                                                    ldata_i = ti[ti_i] * 5; //资源参数数据索引
                                                    ti_width = CT_ResourceArgList[ldata_i+2]; //当前瓦片图片宽度
                                                    ti_height = CT_ResourceArgList[ldata_i+3]; //当前瓦片图片高度
                                                    ti_gxn = parseInt(ti_width / CT_GridWidth); //当前瓦片图片横向网格数
                                                    ti_gyn = parseInt(ti_height / CT_GridHeight); //当前瓦片图片纵向网格数
                                                    if(ti_i > ti.length - 1) //如果瓦片图块索引没有对应的瓦片图块
                                                    {
                                                        cprint("ERROR : The tile image group is beyond range.");
                                                    }
                                                }
                                            }
                                            CT_TileBuild(i,tile_x,tile_y,ti[ti_i],ti_gx,ti_gy); //创建瓦片
                                        }
                                        tile_x += CT_GridWidth; //下一个瓦片位置x
                                    }
                                    if(tile_x >= CT_sceneWidth) //如果下一个瓦片位置x大于等于场景宽度
                                    {
                                        tile_x = 0; //瓦片图块位置x
                                        tile_y += CT_GridHeight; //下一行瓦片位置y
                                    }
                                }
                                if(tile_y >= CT_sceneHeight) //如果下一行瓦片位置y大于场景高度
                                {
                                    tile_x = 0; //瓦片图块位置x
                                    tile_y = 0; //瓦片图块位置y
                                }
                            }
                        }
                    }
                    if(sprite_map != null) //如果sprite地图不为空
                    {
                        scene.sprite_map(); //创建sprite地图
                    }
                }
                else
                {
                    cprint("ERROR : The scene size must be greater than the grid size.");
                }
            }
            else
            {
                cprint("ERROR : Unable to enter scene.");
            }
        }
        else
        {
            cprint("ERROR : The specified scene is not a scene object.");
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// sprite地图
//--------------------------------------------------------------------
function m(x,y,CTsprite)
{
    var id = CTsprite.id; //sprite id
    if(CTsprite.type === -2) //如果对象类型是sprite
    {
        var image = CTsprite.image; //sprite图像
        var image_w = 0; //sprite图像宽度
        var image_h = 0; //sprite图像高度
        var subimg_w = 0; //sprite子图像宽度
        var subimg_h = 0; //sprite子图像高度
        var layer = CTsprite.layer; //sprite层
        var subimg = CTsprite.subimg; //sprite默认子图像索引
        var subnum = CTsprite.subnum; //sprite子图像数量
        var coll_t = CTsprite.collision_type; //sprite碰撞类型
        var coll_e = CTsprite.collision_edge; //sprite边缘碰撞
        var box_x = CTsprite.cbox_x; //sprite碰撞盒位置x
        var box_y = CTsprite.cbox_y; //sprite碰撞盒位置y
        var box_w = CTsprite.cbox_w; //sprite碰撞盒宽度
        var box_h = CTsprite.cbox_h; //sprite碰撞盒高度
        var box_cx = CTsprite.cbox_cx; //sprite碰撞盒中心位置x
        var box_cy = CTsprite.cbox_cy; //sprite碰撞盒中心位置y
        var box_r = CTsprite.cbox_r; //sprite半径
        var alpha = CTsprite.colora; //sprite透明度
        var scale_x = CTsprite.scale_x; //sprite横向缩放
        var scale_y = CTsprite.scale_y; //sprite竖向缩放
        var rotate = CTsprite.rotate; //sprite旋转
        if(image !== -1) //如果资源不为空
        {
            var ldata_i = image * 5; //资源参数数据索引
            var res_type = CT_ResourceArgList[ldata_i+1]; //获取资源类型
            if(res_type === 0) //如果资源类型是图像
            {
                image_w = CT_ResourceArgList[ldata_i+2]; //sprite图像宽度
                image_h = CT_ResourceArgList[ldata_i+3]; //sprite图像高度
                subimg_w = parseInt(image_w / subnum); //sprite子图像宽度
                subimg_h = image_h; //子图像高度
                if(box_x === 0 && box_y === 0 && box_w === 0 && box_h === 0) //如果没有设置矩形碰撞盒
                {
                    box_x = 0; //sprite碰撞盒位置x
                    box_y = 0; //sprite碰撞盒位置y
                    box_w = parseInt(subimg_w * scale_x); //sprite碰撞盒宽度
                    box_h = parseInt(subimg_h * scale_y); //sprite碰撞盒高度
                }
                if(box_cx === 0 && box_cy === 0 && box_r === 0) //如果没有设置圆形碰撞盒
                {
                    box_cx = parseInt(subimg_w / 2); //sprite碰撞盒位置x
                    box_cy = parseInt(subimg_h / 2); //sprite碰撞盒位置y
                    box_r = parseInt(subimg_w * scale_x / 2); //sprite碰撞盒半径
                }
            }
            else
            {
                image = -1; //sprite无图像
                cprint("ERROR : The resource index corresponding to the resource file is not image.");
            }
        }
        if(subnum >= 1 && subimg <= subnum - 1) //如果sprite子图像正确
        {
            var conspr_i = CT_ContainerSpriteLength; //sprite容器的当前索引
            var data_i = conspr_i * 25; //sprite数据索引
            //将sprite数据写入sprite容器
            CT_ContainerSprite[data_i] = 1;
            CT_ContainerSprite[data_i+1] = id;
            CT_ContainerSprite[data_i+2] = layer;
            CT_ContainerSprite[data_i+3] = x;
            CT_ContainerSprite[data_i+4] = y;
            CT_ContainerSprite[data_i+5] = image;
            CT_ContainerSprite[data_i+6] = subimg;
            CT_ContainerSprite[data_i+7] = subnum;
            CT_ContainerSprite[data_i+8] = subimg_w;
            CT_ContainerSprite[data_i+9] = subimg_h;
            CT_ContainerSprite[data_i+10] = x;
            CT_ContainerSprite[data_i+11] = y;
            CT_ContainerSprite[data_i+12] = coll_t;
            CT_ContainerSprite[data_i+13] = coll_e;
            CT_ContainerSprite[data_i+14] = rotate;
            CT_ContainerSprite[data_i+15] = box_x;
            CT_ContainerSprite[data_i+16] = box_y;
            CT_ContainerSprite[data_i+17] = box_w;
            CT_ContainerSprite[data_i+18] = box_h;
            CT_ContainerSprite[data_i+19] = box_cx;
            CT_ContainerSprite[data_i+20] = box_cy;
            CT_ContainerSprite[data_i+21] = box_r;
            CT_ContainerSprite[data_i+22] = alpha;
            CT_ContainerSprite[data_i+23] = scale_x;
            CT_ContainerSprite[data_i+24] = scale_y;
            CT_TaskCreate(conspr_i,CTsprite.main,CTsprite.loop); //创建sprite子程序
            CT_ContainerSpriteLength ++; //sprite容器索引 +1
            CT_SpriteLayerStatusList[layer] = 1; //将当前sprite层的状态标记为1
        }
        else
        {
            cprint("ERROR : The sprite subimage is error.");
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 瓦片创建
//--------------------------------------------------------------------
function tile_create(l,x,y,res,gx,gy)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var tix = CT_GridWidth * gx; //瓦片图像位置x
        var tiy = CT_GridHeight * gy; //瓦片图像位置y
        var tile_i = CT_ContainerTileLength; //瓦片容器索引
        if(l >= 0 && l <= 31) //如果tile层在正确范围内
        {
            if(res !== -1) //如果资源不为空
            {
                var res_type = CT_ResourceArgList[res*5+1]; //获取资源类型
                if(res_type === 0) //如果资源类型是图像
                {
                    var i;
                    var data_i;
                    for(i=0;i<CT_ContainerTileLength;i++) //遍历Tile容器
                    {
                        data_i = i * 7; //瓦片数据索引
                        if(CT_ContainerTile[data_i] === 0) //如果当前瓦片为空
                        {
                            //将瓦片数据写入瓦片容器
                            CT_ContainerTile[data_i] = 1;
                            CT_ContainerTile[data_i+1] = l;
                            CT_ContainerTile[data_i+2] = x;
                            CT_ContainerTile[data_i+3] = y;
                            CT_ContainerTile[data_i+4] = res;
                            CT_ContainerTile[data_i+5] = tix;
                            CT_ContainerTile[data_i+6] = tiy;
                            CT_TileLayerStatusList[l] = 1; //将当前瓦片层的状态标记为1
                            CT_Repaint = 1; //请求重绘
                            return; //中断
                        }
                    }
                    //将瓦片数据写入瓦片容器
                    data_i = tile_i * 7; //tile数据索引
                    CT_ContainerTile[data_i] = 1;
                    CT_ContainerTile[data_i+1] = l;
                    CT_ContainerTile[data_i+2] = x;
                    CT_ContainerTile[data_i+3] = y;
                    CT_ContainerTile[data_i+4] = res;
                    CT_ContainerTile[data_i+5] = tix;
                    CT_ContainerTile[data_i+6] = tiy;
                    CT_ContainerTileLength ++; //瓦片容器索引 +1
                    CT_TileLayerStatusList[l] = 1; //将当前瓦片层的状态标记为1
                    CT_Repaint = 1; //请求重绘
                }
                else
                {
                    cprint("ERROR : The resource index corresponding to the resource file is not image.");
                }
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 瓦片销毁
//--------------------------------------------------------------------
function tile_destroy(l,x,y)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var i;
        var data_i;
        for(i=0;i<CT_ContainerTileLength;i++) //遍历瓦片容器
        {
            data_i = i * 7; //瓦片数据索引
            if(CT_ContainerTile[data_i] !== 0) //如果当前瓦片不为空
            {
                var tl = CT_ContainerTile[data_i+1]; //当前瓦片层
                if(tl === l) //如果当前瓦片层等于层
                {
                    var tx = CT_ContainerTile[data_i+2]; //当前瓦片位置x
                    var ty = CT_ContainerTile[data_i+3]; //当前瓦片位置y
                    if(x === tx && y === ty) //如果当前瓦片位置与参数位置相同
                    {
                        //清除当前瓦片数据
                        CT_ContainerTile[data_i] = 0; 
                        CT_ContainerTile[data_i+1] = 0;
                        CT_ContainerTile[data_i+2] = 0;
                        CT_ContainerTile[data_i+3] = 0;
                        CT_ContainerTile[data_i+4] = 0;
                        CT_ContainerTile[data_i+5] = 0;
                        CT_ContainerTile[data_i+6] = 0;
                        CT_Repaint = 1; //请求重绘
                        for(i=CT_ContainerTileLength-1;i>=-1;i--) //反向遍历瓦片容器
                        {
                            if(i >= 0) //如果瓦片索引大于等于0
                            {
                                data_i = i * 7; //瓦片数据索引
                                if(CT_ContainerTile[data_i] !== 0) //如果当前瓦片不为空
                                {
                                    CT_ContainerTileLength = i + 1; //确定瓦片容器长度
                                    break; //中断
                                }
                            }
                            else
                            {
                                CT_ContainerTileLength = 0; //瓦片容器长度为0
                            }
                        }
                        break; //中断
                    }
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
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var i;
        var data_i;
        for(i=0;i<CT_ContainerTileLength;i++) //遍历瓦片容器
        {
            data_i = i * 7; //瓦片数据索引
            if(CT_ContainerTile[data_i] !== 0) //如果当前瓦片不为空
            {
                var tl = CT_ContainerTile[data_i+1]; //当前瓦片层
                if(tl === l) //如果当前瓦片层等于层
                {
                    var tx = CT_ContainerTile[data_i+2]; //当前瓦片位置x
                    var ty = CT_ContainerTile[data_i+3]; //当前瓦片位置y
                    var gw = CT_GridWidth; //场景网格宽度
                    var gh = CT_GridHeight; //场景网格高度
                    if(x >= tx && y >= ty && x < tx + gw && y < ty + gh) //如果当前位置有瓦片
                    {
                        return 1;
                    }
                }
            }
        }
    }
    return 0;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 获取场景宽度
//--------------------------------------------------------------------
function scene_width()
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        return CT_sceneWidth; //返回场景宽度
    }
    return 0;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 获取场景高度
//--------------------------------------------------------------------
function scene_height()
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        return CT_sceneHeight; //返回场景高度
    }
    return 0;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 获取场景网格宽度
//--------------------------------------------------------------------
function grid_width()
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        return CT_GridWidth; //返回场景网格宽度
    }
    return 0;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 获取场景网格高度
//--------------------------------------------------------------------
function grid_height()
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        return CT_GridHeight; //返回场景网格高度
    }
    return 0;
}
//--------------------------------------------------------------------