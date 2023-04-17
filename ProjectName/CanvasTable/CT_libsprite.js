"use strict";

//--------------------------------------------------------------------
// Sprite对象
//--------------------------------------------------------------------
function CTsprite()
{
    this.image = -1; //sprite图像索引
    this.layer = 0; //sprite层
    this.subnum = 1; //sprite子图像数量
    this.subimg = 0; //sprite子图像索引
    this.collision_type = 0; //sprite碰撞方式
    this.collision_edge = 0; //sprite边缘碰撞
    this.cbox_x = 0; //sprite碰撞盒位置x
    this.cbox_y = 0; //sprite碰撞盒位置y
    this.cbox_w = 0; //sprite碰撞盒宽度
    this.cbox_h = 0; //sprite碰撞盒高度
    this.cbox_cx = 0; //sprite碰撞盒中心位置x
    this.cbox_cy = 0; //sprite碰撞盒中心位置y
    this.cbox_r = 0; //sprite碰撞盒半径
    this.colora = 255; //sprite透明度
    this.scale_x = 1; //sprite横向缩放
    this.scale_y = 1; //sprite竖向缩放
    this.rotate = 0; //sprite旋转
    this.main = null; //sprite程序main函数
    this.loop = null; //sprite程序loop函数
//--------------------------------------------------------------------
    this.id = CT_SpriteGetID(); //sprite id
    this.type = -2; //类型
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// sprite创建
//--------------------------------------------------------------------
function sprite_create(x,y,sprite)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var id = sprite.id; //sprite id
        if(sprite.type === -2) //如果对象类型是sprite
        {
            var image = sprite.image; //sprite图像
            var image_w = 0; //sprite图像宽度
            var image_h = 0; //sprite图像高度
            var subimg_w = 0; //sprite子图像宽度
            var subimg_h = 0; //sprite子图像高度
            var conspr_i = CT_ContainerSpriteLength; //sprite容器sprite层的当前索引
            var layer = sprite.layer; //sprite层
            var subimg = sprite.subimg; //sprite默认子图像索引
            var subnum = sprite.subnum; //sprite子图像数量
            var coll_t = sprite.collision_type; //sprite碰撞类型
            var coll_e = sprite.collision_edge; //sprite边缘碰撞
            var box_x = sprite.cbox_x; //sprite碰撞盒位置x
            var box_y = sprite.cbox_y; //sprite碰撞盒位置y
            var box_w = sprite.cbox_w; //sprite碰撞盒宽度
            var box_h = sprite.cbox_h; //sprite碰撞盒高度
            var box_cx = sprite.cbox_cx; //sprite碰撞盒中心位置x
            var box_cy = sprite.cbox_cy; //sprite碰撞盒中心位置y
            var box_r = sprite.cbox_r; //sprite半径
            var alpha = sprite.colora; //sprite透明度
            var scale_x = sprite.scale_x; //sprite横向缩放
            var scale_y = sprite.scale_y; //sprite竖向缩放
            var rotate = sprite.rotate; //sprite旋转
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
                        box_w = parseInt(subimg_w * scale_x); //sprite碰撞盒宽度/半径
                        box_h = parseInt(subimg_h * scale_y); //sprite碰撞盒高度
                    }
                    if(box_cx === 0 && box_cy === 0 && box_r === 0) //如果没有设置圆形碰撞盒
                    {
                        box_cx = parseInt(subimg_w / 2); //sprite碰撞盒位置x
                        box_cy = parseInt(subimg_h / 2); //sprite碰撞盒位置y
                        box_r = parseInt(subimg_w * scale_x / 2); //sprite碰撞盒宽度/半径
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
                var i;
                var data_i;
                for(i=0;i<CT_ContainerSpriteLength;i++) //遍历sprite容器
                {
                    data_i = i * 25; //sprite数据索引
                    if(CT_ContainerSprite[data_i] === 0) //如果当前sprite为空
                    {   
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
                       CT_TaskCreate(i,sprite.main,sprite.loop); //创建sprite子程序
                       CT_SpriteLayerStatusList[layer] = 1; //将当前sprite层的状态标记为1
                       CT_Repaint = 1; //请求重绘
                       return i; //中断
                    }
                }
                //将sprite数据写入sprite容器
                data_i = conspr_i * 25; //sprite数据索引
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
                CT_TaskCreate(conspr_i,sprite.main,sprite.loop); //创建sprite子程序
                CT_ContainerSpriteLength ++; //sprite容器索引 +1
                CT_SpriteLayerStatusList[layer] = 1; //将当前sprite层的状态标记为1
                CT_Repaint = 1; //请求重绘
                return conspr_i; //返回sprite索引
            }
            else
            {
                cprint("ERROR : The sprite subimage is error.");
            }
        }
    }
    return -1;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// sprite销毁
//--------------------------------------------------------------------
function sprite_destroy()
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var data_i = CT_TaskRunIndex * 25; //sprite数据索引
        var i;
        var i2;
        for(i=0;i<25;i++) //遍历sprite数据
        {
            CT_ContainerSprite[data_i+i] = 0; //清除sprite数据
        }
        CT_TaskDestroy(CT_TaskRunIndex); //销毁sprite子程序
        for(i2=CT_ContainerSpriteLength-1;i2>=-1;i2--) //反向遍历sprite容器
        {
            if(i2 >= 0) //如果sprite索引大于等于0
            {
                if(CT_ContainerSprite[i2*25] !== 0) //如果当前sprite不为空
                {
                    CT_ContainerSpriteLength = i2 + 1; //确定sprite容器长度
                    break; //中断
                }
            }
            else
            {
                CT_ContainerSpriteLength = 0; //sprite容器长度为0
            }
        }
        CT_Repaint = 1; //请求重绘
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// sprite位置x
//--------------------------------------------------------------------
function sprite_x()
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var data_i = CT_TaskRunIndex * 25; //sprite数据索引
        if(CT_ContainerSprite[data_i] !== 0) //如果sprite不为空
        {
            return CT_ContainerSprite[data_i+3]; //sprite位置x
        }
    }
    return -1;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// sprite位置y
//--------------------------------------------------------------------
function sprite_y()
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var data_i = CT_TaskRunIndex * 25; //sprite数据索引
        if(CT_ContainerSprite[data_i] !== 0) //如果sprite不为空
        {
            return CT_ContainerSprite[data_i+4]; //sprite位置x
        }
    }
    return -1;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置sprite位置x
//--------------------------------------------------------------------
function sprite_set_x(x)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var data_i = CT_TaskRunIndex * 25; //sprite数据索引
        if(CT_ContainerSprite[data_i] !== 0) //如果sprite不为空
        {
            CT_ContainerSprite[data_i+3] = x; //设置sprite位置x
            CT_Repaint = 1; //请求重绘
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置sprite位置y
//--------------------------------------------------------------------
function sprite_set_y(y)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var data_i = CT_TaskRunIndex * 25; //sprite数据索引
        if(CT_ContainerSprite[data_i] !== 0) //如果sprite不为空
        {
            CT_ContainerSprite[data_i+4] = y; //设置sprite位置x
            CT_Repaint = 1; //请求重绘
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置sprite层
//--------------------------------------------------------------------
function sprite_set_layer(l)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var data_i = CT_TaskRunIndex * 25; //sprite数据索引
        if(CT_ContainerSprite[data_i] !== 0) //如果sprite不为空
        {
            CT_ContainerSprite[data_i+2] = l; //设置sprite层
            CT_SpriteLayerStatusList[l] = 1; //将sprite层状态标记为1
            CT_Repaint = 1; //请求重绘
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// sprite碰撞检测
//--------------------------------------------------------------------
function sprite_collision(collspr)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(collspr.type === -2) //如果对象是sprite
        {
            var data_i = CT_TaskRunIndex * 25; //sprite数据索引
            if(CT_ContainerSprite[data_i] !== 0) //如果sprite不为空
            {
                var collision = 0; //是否有碰撞
                var spr_x = CT_ContainerSprite[data_i+3]; //sprite位置x
                var spr_y = CT_ContainerSprite[data_i+4]; //sprite位置y
                var box_x = CT_ContainerSprite[data_i+15]; //sprite碰撞盒位置x
                var box_y = CT_ContainerSprite[data_i+16]; //sprite碰撞盒位置y
                var box_w = CT_ContainerSprite[data_i+17]; //sprite碰撞盒宽度
                var box_h = CT_ContainerSprite[data_i+18]; //sprite碰撞盒高度
                var box_cx = CT_ContainerSprite[data_i+19]; //sprite碰撞盒中心位置x
                var box_cy = CT_ContainerSprite[data_i+20]; //sprite碰撞盒中心位置y
                var box_r = CT_ContainerSprite[data_i+21]; //sprite碰撞盒半径
                var i;
                var data_i2;
                for(i=0;i<CT_ContainerSpriteLength;i++) //遍历sprite容器
                {
                    data_i2 = i * 25; //sprite数据索引
                    if(CT_ContainerSprite[data_i] !== 0) //如果当前sprite不为空
                    {
                        var cspr_id = CT_ContainerSprite[data_i2+1]; //当前sprite id
                        var cspr_x = CT_ContainerSprite[data_i2+3]; //当前sprite位置x
                        var cspr_y = CT_ContainerSprite[data_i2+4]; //当前sprite位置y
                        var cspr_coll_t = CT_ContainerSprite[data_i2+12]; //当前sprite碰撞类型
                        var cspr_coll_e = CT_ContainerSprite[data_i2+13]; //当前sprite边缘碰撞
                        var cbox_x = CT_ContainerSprite[data_i2+15]; //当前sprite碰撞盒位置x
                        var cbox_y = CT_ContainerSprite[data_i2+16]; //当前sprite碰撞盒位置y
                        var cbox_w = CT_ContainerSprite[data_i2+17]; //当前sprite碰撞盒宽度
                        var cbox_h = CT_ContainerSprite[data_i2+18]; //当前sprite碰撞盒高度
                        var cbox_cx = CT_ContainerSprite[data_i2+19]; //当前sprite碰撞盒中心位置x
                        var cbox_cy = CT_ContainerSprite[data_i2+20]; //当前sprite碰撞盒中心位置y
                        var cbox_r = CT_ContainerSprite[data_i2+21]; //当前sprite碰撞盒半径
                        if(cspr_id === collspr.id) //如果当前sprite id等于碰撞的sprite id
                        {
                            if(cspr_coll_t === 0) //如果碰撞的sprite碰撞类型是矩形碰撞
                            {
                                if(spr_x + box_x + box_w > cspr_x + cbox_x && spr_x + box_x < cspr_x + cbox_x + cbox_w && spr_y + box_y + box_h > cspr_y + cbox_y && spr_y + box_y < cspr_y + cbox_y + cbox_h) //如果sprite与碰撞的sprite相交
                                {
                                    collision = 1; //有碰撞
                                    if(cspr_coll_e === 1) //如果碰撞的sprite是边缘碰撞
                                    {
                                        var spr_lx = CT_ContainerSprite[data_i+10]; //sprite上次位置x
                                        var spr_ly = CT_ContainerSprite[data_i+11]; //sprite上次位置y
                                        var dx = Math.abs(spr_lx-spr_x);
                                        var dy = -Math.abs(spr_ly-spr_y);
                                        var sx = spr_x < spr_lx ? 1 : -1;
                                        var sy = spr_y < spr_ly ? 1 : -1;
                                        var dd = dx + dy;
                                        var dd2;
                                        while(1)
                                        {
                                            if(!(spr_x + box_x + box_w > cspr_x + cbox_x && spr_x + box_x < cspr_x + cbox_x + cbox_w && spr_y + box_y + box_h > cspr_y + cbox_y && spr_y + box_y < cspr_y + cbox_y + cbox_h)) //如果sprite与碰撞的sprite不相交
                                            {
                                                CT_ContainerSprite[data_i+3] = spr_x; //设置sprite位置
                                                CT_ContainerSprite[data_i+4] = spr_y; //设置sprite位置
                                                break;
                                            }
                                            if(spr_x === spr_lx && spr_y === spr_ly)
                                            {
                                                break;
                                            }
                                            dd2 = 2 * dd;
                                            if(dd2 >= dy)
                                            {
                                                dd += dy;
                                                spr_x += sx;
                                            }
                                            if(dd2 <= dx)
                                            {
                                                dd += dx;
                                                spr_y += sy;
                                            }
                                        }
                                    }
                                }
                            }
                            if(cspr_coll_t === 1) //如果碰撞的sprite碰撞类型是圆形碰撞
                            {
                                var spr_distance = parseInt(Math.sqrt(Math.pow((spr_x+box_cx)-(cspr_x+cbox_cx),2)+Math.pow((spr_y+box_cy)-(cspr_y+cbox_cy),2))); //sprite与碰撞的sprite的距离
                                if(spr_distance < box_r + cbox_r) //如果sprite在碰撞sprite的半径内
                                {
                                    collision = 1; //有碰撞
                                    if(cspr_coll_e === 1) //如果碰撞的sprite是边缘碰撞
                                    {
                                        var spr_lx = CT_ContainerSprite[data_i+10]; //sprite上次位置x
                                        var spr_ly = CT_ContainerSprite[data_i+11]; //sprite上次位置y
                                        var dx = Math.abs(spr_lx-spr_x);
                                        var dy = -Math.abs(spr_ly-spr_y);
                                        var sx = spr_x < spr_lx ? 1 : -1;
                                        var sy = spr_y < spr_ly ? 1 : -1;
                                        var dd = dx + dy;
                                        var dd2;
                                        while(1)
                                        {
                                            var spr_distance = Math.sqrt(Math.pow((spr_x+box_cx)-(cspr_x+cbox_cx),2)+Math.pow((spr_y+box_cy)-(cspr_y+cbox_cy),2)); //sprite与碰撞的sprite的距离
                                            if(spr_distance >= box_r + cbox_r) //如果sprite不在碰撞sprite的半径内
                                            {
                                                CT_ContainerSprite[data_i+3] = spr_x; //设置sprite位置
                                                CT_ContainerSprite[data_i+4] = spr_y; //设置sprite位置
                                                break;
                                            }
                                            if(spr_x === spr_lx && spr_y === spr_ly)
                                            {
                                                break;
                                            }
                                            dd2 = 2 * dd;
                                            if(dd2 >= dy)
                                            {
                                                dd += dy;
                                                spr_x += sx;
                                            }
                                            if(dd2 <= dx)
                                            {
                                                dd += dx;
                                                spr_y += sy;
                                            }
                                        }
                                        CT_Repaint = 1; //请求重绘
                                        return 1;
                                    }
                                }
                            }
                        }
                    }
                }
                if(collision === 1)
                {
                    CT_Repaint = 1; //请求重绘
                    return 1;
                }
            }        
        }
        else
        {
            cprint("ERROR : Not is the sprite object.");
        }
    }
    return 0;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// sprite设置矩形碰撞盒
//--------------------------------------------------------------------
function sprite_set_rectbox(x,y,w,h)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var data_i = CT_TaskRunIndex * 25; //sprite数据索引
        if(CT_ContainerSprite[data_i] !== 0) //如果列表中sprite不为空
        {
            CT_ContainerSprite[data_i+15] = x; //sprite碰撞盒位置x
            CT_ContainerSprite[data_i+16] = y; //sprite碰撞盒位置y
            CT_ContainerSprite[data_i+17] = w; //sprite碰撞盒宽度
            CT_ContainerSprite[data_i+18] = h; //sprite碰撞盒高度
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// sprite设置圆形碰撞盒
//--------------------------------------------------------------------
function sprite_set_cirbox(cx,cy,r)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var data_i = CT_TaskRunIndex * 25; //sprite数据索引
        if(CT_ContainerSprite[data_i] !== 0) //如果列表中sprite不为空
        {
            CT_ContainerSprite[data_i+19] = cx; //sprite碰撞盒中心位置x
            CT_ContainerSprite[data_i+20] = cy; //sprite碰撞盒中心位置y
            CT_ContainerSprite[data_i+21] = r; //sprite碰撞盒半径
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置sprite子图像
//--------------------------------------------------------------------
function sprite_set_subimg(i)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var data_i = CT_TaskRunIndex * 25; //sprite数据索引
        if(CT_ContainerSprite[data_i] !== 0) //如果sprite不为空
        {
            var spr_subnum = CT_ContainerSprite[data_i+7]; //sprite子图像数量
            if(i <= spr_subnum - 1) //如果sprite子图像索引小于sprite子图像数量-1
            {
                CT_ContainerSprite[data_i+6] = i; //设置sprite子图像索引
                CT_Repaint = 1; //请求重绘
            }
            else
            {
                cprint("ERROR : The sprite subimage index greater than the number of subimage.");
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置sprite透明度
//--------------------------------------------------------------------
function sprite_set_colora(alp)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var data_i = CT_TaskRunIndex * 25; //sprite数据索引
        if(CT_ContainerSprite[data_i] !== 0) //如果sprite不为空
        {
            CT_ContainerSprite[data_i+22] = alp; //设置sprite透明度
            CT_Repaint = 1; //请求重绘
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置sprite横向缩放
//--------------------------------------------------------------------
function sprite_set_scalex(sx)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var data_i = CT_TaskRunIndex * 25; //sprite数据索引
        if(CT_ContainerSprite[data_i] !== 0) //如果sprite不为空
        {
            CT_ContainerSprite[data_i+23] = sx; //设置sprite横向缩放倍数
            CT_Repaint = 1; //请求重绘
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置sprite竖向缩放
//--------------------------------------------------------------------
function sprite_set_scaley(sy)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var data_i = CT_TaskRunIndex * 25; //sprite数据索引
        if(CT_ContainerSprite[data_i] !== 0) //如果sprite不为空
        {
            CT_ContainerSprite[data_i+24] = sy; //设置sprite横向缩放倍数
            CT_Repaint = 1; //请求重绘
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置sprite旋转
//--------------------------------------------------------------------
function sprite_set_rotate(rot)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var data_i = CT_TaskRunIndex * 25; //sprite数据索引
        if(CT_ContainerSprite[data_i] !== 0) //如果sprite不为空
        {
            if(rot >= 0 && rot <= 359) //如果旋转角度正确
            {
                CT_ContainerSprite[data_i+14] = rot; //设置sprite横向缩放倍数
                CT_Repaint = 1; //请求重绘
            }
            else
            {
                cprint("ERROR : The rotation angle is error.");
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// sprite变量赋值 数字
//--------------------------------------------------------------------
function spritenum_set(i,n)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        CT_TaskSetNum(CT_TaskRunIndex,i,n); //sprite程序数字变量赋值
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// sprite变量赋值 小数
//--------------------------------------------------------------------
function spritedec_set(i,d)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        CT_TaskSetDec(CT_TaskRunIndex,i,d); //sprite程序数字变量赋值
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// sprite变量赋值 字符串
//--------------------------------------------------------------------
function spritestr_set(i,s)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        CT_TaskSetStr(CT_TaskRunIndex,i,s); //sprite程序字符串变量赋值
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// sprite变量 数字
//--------------------------------------------------------------------
function spritenum(i)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        return CT_TaskNum(CT_TaskRunIndex,i); //sprite程序数字变量值
    }
    return 0;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// sprite变量 小数
//--------------------------------------------------------------------
function spritedec(i)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        return CT_TaskDec(CT_TaskRunIndex,i); //sprite程序数字变量值
    }
    return 0;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// sprite变量 字符串
//--------------------------------------------------------------------
function spritestr(i)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        return CT_TaskStr(CT_TaskRunIndex,i); //获取sprite程序字符串变量值
    }
    return "";
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// sprite检查
//--------------------------------------------------------------------
function sprite_check(x,y,sprite)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var id = sprite.id; //sprite id
        if(sprite.type === -2) //如果对象是sprite
        {
            var i;
            var data_i;
            for(i=0;i<CT_ContainerSpriteLength;i++) //遍历sprite容器
            {
                data_i = i * 25; //sprite数据索引
                if(CT_ContainerSprite[data_i] !== 0) //如果当前sprite不为空
                {
                    var spr_id = CT_ContainerSprite[data_i+1]; //当前sprite id
                    if(spr_id === id) //如果当前sprite id等于sprite id
                    {
                        var spr_x = CT_ContainerSprite[data_i+3]; //当前sprite位置x
                        var spr_y = CT_ContainerSprite[data_i+4]; //当前sprite位置y
                        var spr_box_x = CT_ContainerSprite[data_i+15]; //当前sprite碰撞盒位置x
                        var spr_box_y = CT_ContainerSprite[data_i+16]; //当前sprite碰撞盒位置y
                        var spr_box_w = CT_ContainerSprite[data_i+17]; //当前sprite碰撞盒宽度
                        var spr_box_h = CT_ContainerSprite[data_i+18]; //当前sprite碰撞盒高度
                        if(x >= spr_x + spr_box_x && x < spr_x + spr_box_x + spr_box_w && y >= spr_y + spr_box_y && y < spr_y + spr_box_y + spr_box_h) //如果当前sprite在指定位置中
                        {
                            return 1;
                        }
                    }
                }
            }
        }
        else
        {
            cprint("ERROR : Not is the sprite object.");
        }
    }
    return 0;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// sprite索引
//--------------------------------------------------------------------
function sprite_index()
{
    return CT_TaskRunIndex; //返回sprite索引
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 销毁索引sprite
//--------------------------------------------------------------------
function isprite_destroy(si)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(si < CT_ContainerSpriteLength) //如果sprite索引小于sprite容器长度
        {
            var data_i = si * 25; //sprite数据索引
            if(CT_ContainerSprite[data_i] !== 0) //如果指定索引的sprite不为空
            {
                var i;
                var i2;
                for(i=0;i<25;i++) //遍历sprite数据
                {
                    CT_ContainerSprite[data_i+i] = 0; //清空sprite
                }
                CT_TaskDestroy(si); //销毁sprite子程序
                for(i2=CT_ContainerSpriteLength-1;i2>=-1;i2--) //反向遍历sprite容器
                {
                    if(i2 >= 0) //如果sprite索引大于等于0
                    {
                        if(CT_ContainerSprite[i2*25] !== 0) //如果当前sprite不为空
                        {
                            CT_ContainerSpriteLength = i2 + 1; //确定sprite容器长度
                            break; //中断
                        }
                    }
                    else
                    {
                        CT_ContainerSpriteLength = 0; //sprite容器长度为0
                    }
                }
                CT_Repaint = 1; //请求重绘
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 索引sprite位置x
//--------------------------------------------------------------------
function isprite_x(si)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(si < CT_ContainerSpriteLength) //如果sprite索引小于sprite容器长度
        {
            var data_i = si * 25; //sprite数据索引
            if(CT_ContainerSprite[data_i] !== 0) //如果指定索引的sprite不为空
            {
                return CT_ContainerSprite[data_i+3]; //sprite位置x
            }
            else
            {
                cprint("ERROR : Sprite is null.");
            }
        }
    }
    return -1;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 索引sprite位置y
//--------------------------------------------------------------------
function isprite_y(si)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(si < CT_ContainerSpriteLength) //如果sprite索引小于sprite容器长度
        {
            var data_i = si * 25; //sprite数据索引
            if(CT_ContainerSprite[data_i] !== 0) //如果指定索引的sprite不为空
            {
                return CT_ContainerSprite[data_i+4]; //sprite位置y
            }
            else
            {
                cprint("ERROR : Sprite is null.");
            }
        }
    }
    return -1;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置索引sprite位置x
//--------------------------------------------------------------------
function isprite_set_x(si,x)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(si < CT_ContainerSpriteLength) //如果sprite索引小于sprite容器长度
        {
            var data_i = si * 25; //sprite数据索引
            if(CT_ContainerSprite[data_i] !== 0) //如果指定索引的sprite不为空
            {
                CT_ContainerSprite[data_i+3] = x; //设置sprite位置x
                CT_Repaint = 1; //请求重绘
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置索引sprite位置y
//--------------------------------------------------------------------
function isprite_set_y(si,y)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(si < CT_ContainerSpriteLength) //如果sprite索引小于sprite容器长度
        {
            var data_i = si * 25; //sprite数据索引
            if(CT_ContainerSprite[data_i] !== 0) //如果指定索引的sprite不为空
            {
                CT_ContainerSprite[data_i+4] = y; //设置sprite位置y
                CT_Repaint = 1; //请求重绘
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置索引sprite层
//--------------------------------------------------------------------
function isprite_set_layer(si,l)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(si < CT_ContainerSpriteLength) //如果sprite索引小于sprite容器长度
        {
            var data_i = si * 25; //sprite数据索引
            if(CT_ContainerSprite[data_i] !== 0) //如果指定索引的sprite不为空
            {
                CT_ContainerSprite[data_i+2] = l; //设置指定索引sprite层
                CT_SpriteLayerStatusList[l] = 1; //将sprite层状态标记为1
                CT_Repaint = 1; //请求重绘
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 索引sprite碰撞检测
//--------------------------------------------------------------------
function isprite_collision(si)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(si < CT_ContainerSpriteLength) //如果sprite索引小于sprite容器长度
        {
            var data_i = CT_TaskRunIndex * 25; //sprite数据索引
            if(CT_ContainerSprite[data_i] !== 0) //如果sprite不为空
            {
                var spr_x = CT_ContainerSprite[data_i+3]; //sprite位置x
                var spr_y = CT_ContainerSprite[data_i+4]; //sprite位置y
                var box_x = CT_ContainerSprite[data_i+15]; //sprite碰撞盒位置x
                var box_y = CT_ContainerSprite[data_i+16]; //sprite碰撞盒位置y
                var box_w = CT_ContainerSprite[data_i+17]; //sprite碰撞盒宽度
                var box_h = CT_ContainerSprite[data_i+18]; //sprite碰撞盒高度
                var box_cx = CT_ContainerSprite[data_i+19]; //sprite碰撞盒中心位置x
                var box_cy = CT_ContainerSprite[data_i+20]; //sprite碰撞盒中心位置y
                var box_r = CT_ContainerSprite[data_i+21]; //sprite碰撞盒半径
                var data_i2 = si * 25; //指定的sprite数据索引
                if(CT_ContainerSprite[data_i2] !== 0) //如果当前sprite不为空
                {
                    var cspr_x = CT_ContainerSprite[data_i2+3]; //指定的sprite位置x
                    var cspr_y = CT_ContainerSprite[data_i2+4]; //指定的sprite位置y
                    var cspr_coll_t = CT_ContainerSprite[data_i2+12]; //指定的sprite碰撞类型
                    var cspr_coll_e = CT_ContainerSprite[data_i2+13]; //指定的sprite边缘碰撞
                    var cbox_x = CT_ContainerSprite[data_i2+15]; //指定的sprite碰撞盒位置x
                    var cbox_y = CT_ContainerSprite[data_i2+16]; //指定的sprite碰撞盒位置y
                    var cbox_w = CT_ContainerSprite[data_i2+17]; //指定的sprite碰撞盒宽度
                    var cbox_h = CT_ContainerSprite[data_i2+18]; //指定的sprite碰撞盒高度
                    var cbox_cx = CT_ContainerSprite[data_i2+19]; //指定的sprite碰撞盒中心位置x
                    var cbox_cy = CT_ContainerSprite[data_i2+20]; //指定的sprite碰撞盒中心位置y
                    var cbox_r = CT_ContainerSprite[data_i2+21]; //指定的sprite碰撞盒半径
                    if(cspr_coll_t === 0) //如果碰撞的sprite碰撞类型是矩形碰撞
                    {
                        if(spr_x + box_x + box_w > cspr_x + cbox_x && spr_x + box_x < cspr_x + cbox_x + cbox_w && spr_y + box_y + box_h > cspr_y + cbox_y && spr_y + box_y < cspr_y + cbox_y + cbox_h) //如果sprite与碰撞的sprite相交
                        {
                            if(cspr_coll_e === 0) //如果碰撞的sprite不是边缘碰撞
                            {
                                return 1;
                            }
                            if(cspr_coll_e === 1) //如果碰撞的sprite是边缘碰撞
                            {
                                var spr_lx = CT_ContainerSprite[data_i+10]; //sprite上次位置x
                                var spr_ly = CT_ContainerSprite[data_i+11]; //sprite上次位置y
                                var dx = Math.abs(spr_lx-spr_x);
                                var dy = -Math.abs(spr_ly-spr_y);
                                var sx = spr_x < spr_lx ? 1 : -1;
                                var sy = spr_y < spr_ly ? 1 : -1;
                                var dd = dx + dy;
                                var dd2;
                                while(1)
                                {
                                    if(!(spr_x + box_x + box_w > cspr_x + cbox_x && spr_x + box_x < cspr_x + cbox_x + cbox_w && spr_y + box_y + box_h > cspr_y + cbox_y && spr_y + box_y < cspr_y + cbox_y + cbox_h)) //如果sprite与碰撞的sprite不相交
                                    {
                                        CT_ContainerSprite[data_i+3] = spr_x; //设置sprite位置
                                        CT_ContainerSprite[data_i+4] = spr_y; //设置sprite位置
                                        break;
                                    }
                                    if(spr_x === spr_lx && spr_y === spr_ly)
                                    {
                                        break;
                                    }
                                    dd2 = 2 * dd;
                                    if(dd2 >= dy)
                                    {
                                        dd += dy;
                                        spr_x += sx;
                                    }
                                    if(dd2 <= dx)
                                    {
                                        dd += dx;
                                        spr_y += sy;
                                    }
                                }
                                CT_Repaint = 1; //请求重绘
                                return 1;
                            }
                        }
                    }
                    if(cspr_coll_t === 1) //如果碰撞的sprite碰撞类型是圆形碰撞
                    {
                        var spr_distance = parseInt(Math.sqrt(Math.pow((spr_x+box_cx)-(cspr_x+cbox_cx),2)+Math.pow((spr_y+box_cy)-(cspr_y+cbox_cy),2))); //sprite与碰撞sprite的距离
                        if(spr_distance < box_r + cbox_r) //如果sprite在碰撞sprite的半径内
                        {
                            if(cspr_coll_e === 0) //如果碰撞的sprite不是边缘碰撞
                            {
                                return 1;
                            }
                            if(cspr_coll_e === 1) //如果碰撞的sprite是边缘碰撞
                            {
                                var spr_lx = CT_ContainerSprite[data_i+10]; //sprite上次位置x
                                var spr_ly = CT_ContainerSprite[data_i+11]; //sprite上次位置y
                                var dx = Math.abs(spr_lx-spr_x);
                                var dy = -Math.abs(spr_ly-spr_y);
                                var sx = spr_x < spr_lx ? 1 : -1;
                                var sy = spr_y < spr_ly ? 1 : -1;
                                var dd = dx + dy;
                                var dd2;
                                while(1)
                                {
                                    var spr_distance = Math.sqrt(Math.pow((spr_x+box_cx)-(cspr_x+cbox_cx),2)+Math.pow((spr_y+box_cy)-(cspr_y+cbox_cy),2)); //sprite与碰撞sprite的距离
                                    if(spr_distance >= box_r + cbox_r) //如果sprite不在碰撞sprite的半径内
                                    {
                                        CT_ContainerSprite[data_i+3] = spr_x; //设置sprite位置
                                        CT_ContainerSprite[data_i+4] = spr_y; //设置sprite位置
                                        break;
                                    }
                                    if(spr_x === spr_lx && spr_y === spr_ly)
                                    {
                                        break;
                                    }
                                    dd2 = 2 * dd;
                                    if(dd2 >= dy)
                                    {
                                        dd += dy;
                                        spr_x += sx;
                                    }
                                    if(dd2 <= dx)
                                    {
                                        dd += dx;
                                        spr_y += sy;
                                    }
                                }
                                CT_Repaint = 1; //请求重绘
                                return 1;
                            }
                        }
                    }
                }
            }
        }   
    }
    return 0;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 索引sprite设置矩形碰撞盒
//--------------------------------------------------------------------
function isprite_set_rectbox(si,x,y,w,h)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(si < CT_ContainerSpriteLength) //如果sprite索引小于sprite容器长度
        {
            var data_i = si * 25; //sprite数据索引
            if(CT_ContainerSprite[data_i] !== 0) //如果列表中sprite不为空
            {
                CT_ContainerSprite[data_i+15] = x; //sprite碰撞盒位置x
                CT_ContainerSprite[data_i+16] = y; //sprite碰撞盒位置y
                CT_ContainerSprite[data_i+17] = w; //sprite碰撞盒宽度
                CT_ContainerSprite[data_i+18] = h; //sprite碰撞盒高度
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 索引sprite设置圆形碰撞盒
//--------------------------------------------------------------------
function isprite_set_cirbox(si,cx,cy,r)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(si < CT_ContainerSpriteLength) //如果sprite索引小于sprite容器长度
        {
            var data_i = si * 25; //sprite数据索引
            if(CT_ContainerSprite[data_i] !== 0) //如果列表中sprite不为空
            {
                CT_ContainerSprite[data_i+19] = cx; //sprite碰撞盒中心位置x
                CT_ContainerSprite[data_i+20] = cy; //sprite碰撞盒中心位置y
                CT_ContainerSprite[data_i+21] = r; //sprite碰撞盒半径
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// sprite检查
//--------------------------------------------------------------------
function isprite_check(x,y,si)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(si < CT_ContainerSpriteLength) //如果sprite索引小于sprite容器长度
        {
            var data_i = si * 25; //sprite数据索引
            if(CT_ContainerSprite[data_i] !== 0) //如果当前sprite不为空
            {
                var spr_x = CT_ContainerSprite[data_i+3]; //sprite位置x
                var spr_y = CT_ContainerSprite[data_i+4]; //sprite位置y
                var spr_box_x = CT_ContainerSprite[data_i+15]; //sprite碰撞盒位置x
                var spr_box_y = CT_ContainerSprite[data_i+16]; //sprite碰撞盒位置y
                var spr_box_w = CT_ContainerSprite[data_i+17]; //sprite碰撞盒宽度
                var spr_box_h = CT_ContainerSprite[data_i+18]; //sprite碰撞盒高度
                if(x >= spr_x + spr_box_x && x < spr_x + spr_box_x + spr_box_w && y >= spr_y + spr_box_y && y < spr_y + spr_box_y + spr_box_h) //如果当前sprite在指定位置中
                {
                    return 1;
                }
            }
        }
    }
    return 0;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置索引sprite子图像
//--------------------------------------------------------------------
function isprite_set_subimg(si,i)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(si < CT_ContainerSpriteLength) //如果sprite索引小于sprite容器长度
        {
            var data_i = si * 25; //sprite数据索引
            if(CT_ContainerSprite[data_i] !== 0) //如果指定索引的sprite不为空
            {
                var spr_subnum = CT_ContainerSprite[data_i+7]; //sprite子图像数量
                if(i <= spr_subnum - 1) //如果sprite子图像索引小于sprite子图像数量-1
                {
                    CT_ContainerSprite[data_i+6] = i; //设置sprite子图像索引
                    CT_Repaint = 1; //请求重绘
                }
                else
                {
                    cprint("ERROR : The sprite subimage index greater than the number of subimage.");
                }
            }
            else
            {
                cprint("ERROR : Sprite is null.");
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置索引sprite透明度
//--------------------------------------------------------------------
function isprite_set_colora(si,alp)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(si < CT_ContainerSpriteLength) //如果sprite索引小于sprite容器长度
        {
            var data_i = si * 25; //sprite数据索引
            if(CT_ContainerSprite[data_i] !== 0) //如果指定索引的sprite不为空
            {
                CT_ContainerSprite[data_i+22] = alp; //设置指定索引sprite透明度
                CT_Repaint = 1; //请求重绘
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置索引sprite横向缩放
//--------------------------------------------------------------------
function isprite_set_scalex(si,sx)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(si < CT_ContainerSpriteLength) //如果sprite索引小于sprite容器长度
        {
            var data_i = si * 25; //sprite数据索引
            if(CT_ContainerSprite[data_i] !== 0) //如果指定索引的sprite不为空
            {
                CT_ContainerSprite[data_i+23] = sx; //设置指定索引sprite横向缩放倍数
                CT_Repaint = 1; //请求重绘
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置索引sprite竖向缩放
//--------------------------------------------------------------------
function isprite_set_scaley(si,sy)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(si < CT_ContainerSpriteLength) //如果sprite索引小于sprite容器长度
        {
            var data_i = si * 25; //sprite数据索引
            if(CT_ContainerSprite[data_i] !== 0) //如果指定索引的sprite不为空
            {
                CT_ContainerSprite[data_i+24] = sy; //设置指定索引sprite竖向缩放倍数
                CT_Repaint = 1; //请求重绘
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置索引sprite旋转
//--------------------------------------------------------------------
function isprite_set_rotate(si,rot)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(si < CT_ContainerSpriteLength) //如果sprite索引小于sprite容器长度
        {
            var data_i = si * 25; //sprite数据索引
            if(CT_ContainerSprite[data_i] !== 0) //如果指定索引的sprite不为空
            {
                if(rot >= 0 && rot <= 359) //如果旋转角度正确
                {
                    CT_ContainerSprite[data_i+14] = rot; //设置指定索引sprite旋转角度
                    CT_Repaint = 1; //请求重绘
                }
                else
                {
                    cprint("ERROR : The rotation angle is error.");
                }
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 索引sprite变量赋值 数字
//--------------------------------------------------------------------
function ispritenum_set(si,i,n)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(si < CT_ContainerSpriteLength) //如果sprite索引小于sprite容器长度
        {
            if(CT_ContainerSprite[si*25] !== 0) //如果指定索引的sprite不为空
            {
                CT_TaskSetNum(si,i,n); //sprite程序数字变量赋值
            }
            else
            {
                cprint("ERROR : Sprite is null.");
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 索引sprite变量赋值 小数
//--------------------------------------------------------------------
function ispritedec_set(si,i,d)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(si < CT_ContainerSpriteLength) //如果sprite索引小于sprite容器长度
        {
            if(CT_ContainerSprite[si*25] !== 0) //如果指定索引的sprite不为空
            {
                CT_TaskSetDec(si,i,d); //sprite程序小数变量赋值
            }
            else
            {
                cprint("ERROR : Sprite is null.");
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 索引sprite变量赋值 字符串
//--------------------------------------------------------------------
function ispritestr_set(si,i,s)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(si < CT_ContainerSpriteLength) //如果sprite索引小于sprite容器长度
        {
            if(CT_ContainerSprite[si*25] !== 0) //如果sprite不为空
            {
                CT_TaskSetStr(si,i,s); //sprite程序字符串变量赋值
            }
            else
            {
                cprint("ERROR : Sprite is null.");
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 索引sprite变量 数字
//--------------------------------------------------------------------
function ispritenum(si,i)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(si < CT_ContainerSpriteLength) //如果sprite索引小于sprite容器长度
        {
            if(CT_ContainerSprite[si*25] !== 0) //如果sprite不为空
            {
                return CT_TaskNum(si,i); //sprite程序数字变量值
            }
            else
            {
                cprint("ERROR : Sprite is null.");
            }
        }
    }
    return 0;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 索引sprite变量 小数
//--------------------------------------------------------------------
function ispritedec(si,i)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(si < CT_ContainerSpriteLength) //如果sprite索引小于sprite容器长度
        {
            if(CT_ContainerSprite[si*25] !== 0) //如果sprite不为空
            {
                return CT_TaskDec(si,i); //sprite程序小数变量值
            }
            else
            {
                cprint("ERROR : Sprite is null.");
            }
        }
    }
    return 0;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 索引sprite变量 字符串
//--------------------------------------------------------------------
function ispritestr(si,i)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(si < CT_ContainerSpriteLength) //如果sprite索引小于sprite容器长度
        {
            if(CT_ContainerSprite[si*25] !== 0) //如果列表中sprite不为空
            {
                return CT_TaskStr(si,i); //获取sprite程序字符串变量值
            }
            else
            {
                cprint("ERROR : Sprite is null.");
            }
        }
    }
    return "";
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 销毁所有sprite
//--------------------------------------------------------------------
function sprite_destroy_all(sprite)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var id = sprite.id; //sprite id
        if(sprite.type === -2) //如果对象是sprite
        {
            var i;
            var data_i;
            var i2;
            for(i=0;i<CT_ContainerSpriteLength;i++) //遍历sprite容器
            {
                data_i = i * 25; //sprite数据索引
                if(CT_ContainerSprite[data_i] !== 0) //如果当前sprite不为空
                {
                    var spr_id = CT_ContainerSprite[data_i+1]; //当前sprite id
                    if(spr_id === id) //如果当前sprite id等于sprite id
                    {
                        for(i2=0;i2<25;i2++) //遍历sprite数据
                        {
                            CT_ContainerSprite[data_i+i2] = 0; //清除sprite数据
                        }
                        CT_TaskDestroy(i); //销毁sprite子程序
                        CT_Repaint = 1; //请求重绘
                    }
                }
            }
            for(i2=CT_ContainerSpriteLength-1;i2>=-1;i2--) //反向遍历sprite容器
            {
                if(i2 >= 0) //如果sprite索引大于等于0
                {
                    data_i = i2 * 25; //sprite数据索引
                    if(CT_ContainerSprite[data_i] !== 0) //如果当前sprite不为空
                    {
                        CT_ContainerSpriteLength = i2 + 1; //确定sprite容器长度
                        break; //中断
                    }
                }
                else
                {
                    CT_ContainerSpriteLength = 0; //sprite容器长度为0
                }
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置所有sprite位置x
//--------------------------------------------------------------------
function sprite_all_set_x(sprite,x)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var id = sprite.id; //sprite id
        if(sprite.type === -2) //如果对象是sprite
        {
            var i;
            var data_i;
            for(i=0;i<CT_ContainerSpriteLength;i++) //遍历sprite容器
            {
                data_i = i * 25; //sprite数据索引
                if(CT_ContainerSprite[data_i] !== 0) //如果当前sprite不为空
                {
                    var spr_id = CT_ContainerSprite[data_i+1]; //当前sprite id
                    if(spr_id === id) //如果当前sprite id等于sprite id
                    {
                        CT_ContainerSprite[data_i+3] = x; //设置当前sprite位置x
                        CT_Repaint = 1; //请求重绘
                    }
                }
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置所有sprite位置y
//--------------------------------------------------------------------
function sprite_all_set_y(sprite,y)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var id = sprite.id; //sprite id
        if(sprite.type === -2) //如果对象是sprite
        {
            var i;
            var data_i;
            for(i=0;i<CT_ContainerSpriteLength;i++) //遍历sprite容器
            {
                data_i = i * 25; //sprite数据索引
                if(CT_ContainerSprite[data_i] !== 0) //如果当前sprite不为空
                {
                    var spr_id = CT_ContainerSprite[data_i+1]; //当前sprite id
                    if(spr_id === id) //如果当前sprite id等于sprite id
                    {
                        CT_ContainerSprite[data_i+4] = y; //设置当前sprite位置y
                        CT_Repaint = 1; //请求重绘
                    }
                }
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置所有sprite层
//--------------------------------------------------------------------
function sprite_all_set_layer(sprite,l)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var id = sprite.id; //sprite id
        if(sprite.type === -2) //如果对象是sprite
        {
            var i;
            var data_i;
            for(i=0;i<CT_ContainerSpriteLength;i++) //遍历sprite容器
            {
                data_i = i * 25; //sprite数据索引
                if(CT_ContainerSprite[data_i] !== 0) //如果当前sprite不为空
                {
                    var spr_id = CT_ContainerSprite[data_i+1]; //当前sprite id
                    if(spr_id === id) //如果当前sprite id等于sprite id
                    {
                        CT_ContainerSprite[data_i+2] = l; //设置当前sprite层
                        CT_SpriteLayerStatusList[l] = 1; //将sprite层状态标记为1
                        CT_Repaint = 1; //请求重绘
                    }
                }
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置所有sprite子图像
//--------------------------------------------------------------------
function sprite_all_set_subimg(sprite,subi)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var id = sprite.id; //sprite id
        if(sprite.type === -2) //如果对象是sprite
        {
            var i;
            var data_i;
            for(i=0;i<CT_ContainerSpriteLength;i++) //遍历sprite容器
            {
                data_i = i * 25; //sprite数据索引
                if(CT_ContainerSprite[data_i] !== 0) //如果当前sprite不为空
                {
                    var spr_id = CT_ContainerSprite[data_i+1]; //当前sprite id
                    if(spr_id === id) //如果当前sprite id等于sprite id
                    {
                        var spr_subnum = CT_ContainerSprite[data_i+7]; //当前sprite子图像数量
                        if(subi <= spr_subnum - 1) //如果sprite子图像索引小于sprite子图像数量-1
                        {
                            CT_ContainerSprite[data_i+6] = subi; //设置sprite子图像索引
                            CT_Repaint = 1; //请求重绘
                        }
                        else
                        {
                            cprint("ERROR : The sprite subimage greater than the number of subimage.");
                        }
                    }
                }
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置所有sprite透明度
//--------------------------------------------------------------------
function sprite_all_set_colora(sprite,alp)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var id = sprite.id; //sprite id
        if(sprite.type === -2) //如果对象是sprite
        {
            var i;
            var data_i;
            for(i=0;i<CT_ContainerSpriteLength;i++) //遍历sprite容器
            {
                data_i = i * 25; //sprite数据索引
                if(CT_ContainerSprite[data_i] !== 0) //如果当前sprite不为空
                {
                    var spr_id = CT_ContainerSprite[data_i+1]; //当前sprite id
                    if(spr_id === id) //如果当前sprite id等于sprite id
                    {
                        CT_ContainerSprite[data_i+22] = alp; //设置当前sprite透明度
                        CT_Repaint = 1; //请求重绘
                    }
                }
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置所有sprite横向缩放
//--------------------------------------------------------------------
function sprite_all_set_scalex(sprite,sx)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var id = sprite.id; //sprite id
        if(sprite.type === -2) //如果对象是sprite
        {
            var i;
            var data_i;
            for(i=0;i<CT_ContainerSpriteLength;i++) //遍历sprite容器
            {
                data_i = i * 25; //sprite数据索引
                if(CT_ContainerSprite[data_i] !== 0) //如果当前sprite不为空
                {
                    var spr_id = CT_ContainerSprite[data_i+1]; //当前sprite id
                    if(spr_id === id) //如果当前sprite id等于sprite id
                    {
                        CT_ContainerSprite[data_i+23] = sx; //设置当前sprite横向缩放倍数
                        CT_Repaint = 1; //请求重绘
                    }
                }
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置所有sprite竖向缩放
//--------------------------------------------------------------------
function sprite_all_set_scaley(sprite,sy)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var id = sprite.id; //sprite id
        if(sprite.type === -2) //如果对象是sprite
        {
            var i;
            var data_i;
            for(i=0;i<CT_ContainerSpriteLength;i++) //遍历sprite容器
            {
                data_i = i * 25; //sprite数据索引
                if(CT_ContainerSprite[data_i] !== 0) //如果当前sprite不为空
                {
                    var spr_id = CT_ContainerSprite[data_i+1]; //当前sprite id
                    if(spr_id === id) //如果当前sprite id等于sprite id
                    {
                        CT_ContainerSprite[data_i+24] = sy; //设置当前sprite竖向缩放倍数
                        CT_Repaint = 1; //请求重绘
                    }
                }
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置所有sprite旋转
//--------------------------------------------------------------------
function sprite_all_set_rotate(sprite,rot)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var id = sprite.id; //sprite id
        if(sprite.type === -2) //如果对象是sprite
        {
            var i;
            var data_i;
            for(i=0;i<CT_ContainerSpriteLength;i++) //遍历sprite容器
            {
                data_i = i * 25; //sprite数据索引
                if(CT_ContainerSprite[data_i] !== 0) //如果当前sprite不为空
                {
                    var spr_id = CT_ContainerSprite[data_i+1]; //当前sprite id
                    if(spr_id === id) //如果当前sprite id等于sprite id
                    {
                        if(rot >= 0 && rot <= 359) //如果旋转角度正确
                        {
                            CT_ContainerSprite[data_i+14] = rot; //设置当前sprite旋转角度
                            CT_Repaint = 1; //请求重绘
                        }
                    }
                }
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 所有sprite变量赋值 数字
//--------------------------------------------------------------------
function spritenum_all_set(sprite,vi,n)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var id = sprite.id; //sprite id
        if(sprite.type === -2) //如果对象是sprite
        {
            var i;
            var data_i;
            for(i=0;i<CT_ContainerSpriteLength;i++) //遍历sprite容器
            {
               data_i = i * 25; //sprite数据索引
               if(CT_ContainerSprite[data_i] !== 0) //如果当前sprite不为空
                {
                    var spr_id = CT_ContainerSprite[data_i+1]; //当前sprite id
                    if(spr_id === id) //如果当前sprite id等于sprite id
                    {
                        CT_TaskSetNum(i,vi,n); //sprite程序数字变量赋值
                    }
                }
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 所有sprite变量赋值 小数
//--------------------------------------------------------------------
function spritedec_all_set(sprite,vi,d)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var id = sprite.id; //sprite id
        if(sprite.type === -2) //如果对象是sprite
        {
            var i;
            var data_i;
            for(i=0;i<CT_ContainerSpriteLength;i++) //遍历sprite容器
            {
               data_i = i * 25; //sprite数据索引
               if(CT_ContainerSprite[data_i] !== 0) //如果当前sprite不为空
                {
                    var spr_id = CT_ContainerSprite[data_i+1]; //当前sprite id
                    if(spr_id === id) //如果当前sprite id等于sprite id
                    {
                        CT_TaskSetDec(i,vi,d); //sprite程序小数变量赋值
                    }
                }
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 所有sprite变量赋值 字符串
//--------------------------------------------------------------------
function spritestr_all_set(sprite,vi,s)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var id = sprite.id; //sprite id
        if(sprite.type === -2) //如果对象是sprite
        {
            var i;
            var data_i;
            for(i=0;i<CT_ContainerSpriteLength;i++) //遍历sprite容器
            {
                data_i = i * 25; //sprite数据索引
                if(CT_ContainerSprite[data_i] !== 0) //如果当前sprite不为空
                {
                    var spr_id = CT_ContainerSprite[data_i+1]; //当前sprite id
                    if(spr_id === id) //如果当前sprite id等于sprite id
                    {
                        CT_TaskSetStr(i,vi,s); //sprite程序字符串变量赋值
                    }
                }
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 所有sprite设置矩形碰撞盒
//--------------------------------------------------------------------
function sprite_all_set_rectbox(sprite,x,y,w,h)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var id = sprite.id; //sprite id
        if(sprite.type === -2) //如果对象是sprite
        {
            var i;
            var data_i;
            for(i=0;i<CT_ContainerSpriteLength;i++) //遍历sprite容器
            {
                data_i = i * 25; //sprite数据索引
                if(CT_ContainerSprite[data_i] !== 0) //如果当前sprite不为空
                {
                    var spr_id = CT_ContainerSprite[data_i+1]; //当前sprite id
                    if(spr_id === id) //如果当前sprite id等于sprite id
                    {
                        CT_ContainerSprite[data_i+15] = x; //当前sprite碰撞盒位置x
                        CT_ContainerSprite[data_i+16] = y; //当前sprite碰撞盒位置y
                        CT_ContainerSprite[data_i+17] = w; //当前sprite碰撞盒宽度
                        CT_ContainerSprite[data_i+18] = h; //当前sprite碰撞盒高度
                    }
                }
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 所有sprite设置圆形碰撞盒
//--------------------------------------------------------------------
function sprite_all_set_cirbox(sprite,cx,cy,r)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var id = sprite.id; //sprite id
        if(sprite.type === -2) //如果对象是sprite
        {
            var i;
            var data_i;
            for(i=0;i<CT_ContainerSpriteLength;i++) //遍历sprite容器
            {
                data_i = i * 25; //sprite数据索引
                if(CT_ContainerSprite[data_i] !== 0) //如果当前sprite不为空
                {
                    var spr_id = CT_ContainerSprite[data_i+1]; //当前sprite id
                    if(spr_id === id) //如果当前sprite id等于sprite id
                    {
                        CT_ContainerSprite[data_i+19] = cx; //当前sprite碰撞盒中心位置x
                        CT_ContainerSprite[data_i+20] = cy; //当前sprite碰撞盒中心位置y
                        CT_ContainerSprite[data_i+21] = r; //当前sprite碰撞盒半径
                    }
                }
            }
        }
    }
}
//--------------------------------------------------------------------