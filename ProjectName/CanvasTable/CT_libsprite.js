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
    this.subimg_o = 0; //sprite子图像偏移
    this.collision_type = 0; //sprite碰撞方式
    this.collision_edge = 0; //sprite边缘碰撞
    this.cbox_x = 0; //碰撞盒位置x
    this.cbox_y = 0; //碰撞盒位置y
    this.cbox_w = 0; //碰撞盒宽度
    this.cbox_h = 0; //碰撞盒高度
    this.cbox_cx = 0; //碰撞盒中心位置x
    this.cbox_cy = 0; //碰撞盒中心位置y
    this.cbox_r = 0; //碰撞盒半径
    this.colora = 255; //sprite透明度
    this.scale_x = 1; //sprite横向缩放
    this.scale_y = 1; //sprite竖向缩放
    this.rotate = 0; //sprite旋转
    this.main = function(){}; //sprite程序main函数
    this.loop = function(){}; //sprite程序loop函数
//--------------------------------------------------------------------
    this.id = CT_SpriteGetId(); //sprite id
    this.type = -2; //类型
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 创建Sprite
//--------------------------------------------------------------------
function sprite_create(x,y,CTsprite)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var id = CTsprite.id; //sprite id
        if(CTsprite.type === -2) //如果对象类型是sprite
        {
            var image = CTsprite.image; //sprite图像
            var image_w = 0; //sprite图像宽度
            var image_h = 0; //sprite图像高度
            var subimg_w = 0; //sprite子图像宽度
            var subimg_h = 0; //sprite子图像高度
            var conspr_i = CT_ContainerSpriteLength; //sprite容器sprite层的当前索引
            var layer = CTsprite.layer; //sprite层
            var subimg = CTsprite.subimg; //sprite默认子图像索引
            var subimg_o = CTsprite.subimg_o; //sprite子图像偏移
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
            if(image !== -1) //如果sprite有图像
            {
                var res_type = CT_ResourceList[image][1]; //获取资源类型
                if(res_type === 0) //如果资源类型是图像
                {
                    image_w = CT_ResourceList[image][2]; //sprite图像宽度
                    image_h = CT_ResourceList[image][3]; //sprite图像高度
                    subimg_w = parseInt(image_w / subnum - subimg_o * 2); //sprite子图像宽度
                    subimg_h = image_h - subimg_o * 2; //子图像高度
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
                    cprint("ERROR : The resource index corresponding to the resource file is not a image.");
                }
            }
            if(subnum >= 1 && subimg <= subnum - 1) //如果sprite属性正确
            {
                var i;
                for(i=0;i<CT_ContainerSpriteLength;i++) //遍历sprite容器
                {
                    if(CT_ContainerSprite[i] == null) //如果当前sprite为空
                    {   
                        CT_ContainerSprite[i] = [id,layer,x,y,image,subimg,subnum,subimg_w,subimg_h,x,y,coll_t,coll_e,subimg_o,box_x,box_y,box_w,box_h,box_cx,box_cy,box_r,alpha,scale_x,scale_y,rotate]; //将sprite数据写入sprite容器
                        CT_TaskCreated(i,CTsprite.main,CTsprite.loop); //创建sprite子程序
                        CT_Repaint = 1; //请求重绘
                        return i; //中断
                    }
                }
                CT_ContainerSprite[conspr_i] = [id,layer,x,y,image,subimg,subnum,subimg_w,subimg_h,x,y,coll_t,coll_e,subimg_o,box_x,box_y,box_w,box_h,box_cx,box_cy,box_r,alpha,scale_x,scale_y,rotate]; //将sprite数据写入sprite容器
                CT_TaskCreated(conspr_i,CTsprite.main,CTsprite.loop); //创建sprite子程序
                CT_ContainerSpriteLength ++; //sprite容器索引 +1
                CT_Repaint = 1; //请求重绘
                return conspr_i; //返回sprite索引
            }
            else
            {
                cprint("ERROR : The sprite property have error.");
            }
        }
    }
    return -1;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 销毁Sprite
//--------------------------------------------------------------------
function sprite_destroy()
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        CT_ContainerSprite[CT_TaskRunIndex] = null; //清除sprite数据
        CT_TaskDestroy(CT_TaskRunIndex); //销毁sprite子程序
        CT_Repaint = 1; //请求重绘
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// Sprite位置x
//--------------------------------------------------------------------
function sprite_x()
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CT_ContainerSprite[CT_TaskRunIndex] != null) //如果sprite不为空
        {
            var x = CT_ContainerSprite[CT_TaskRunIndex][2]; //sprite位置x
            return x; //返回sprite位置x
        }
    }
    return -1;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// Sprite位置y
//--------------------------------------------------------------------
function sprite_y()
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CT_ContainerSprite[CT_TaskRunIndex] != null) //如果sprite不为空
        {
            var y = CT_ContainerSprite[CT_TaskRunIndex][3]; //sprite位置y
            return y; //返回sprite位置y
        }
    }
    return -1;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置Sprite位置x
//--------------------------------------------------------------------
function sprite_set_x(x)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CT_ContainerSprite[CT_TaskRunIndex] != null) //如果sprite不为空
        {
            CT_ContainerSprite[CT_TaskRunIndex][2] = x; //设置sprite位置x
            CT_Repaint = 1; //请求重绘
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置Sprite位置y
//--------------------------------------------------------------------
function sprite_set_y(y)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CT_ContainerSprite[CT_TaskRunIndex] != null) //如果sprite不为空
        {
            CT_ContainerSprite[CT_TaskRunIndex][3] = y; //设置sprite位置y
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
        if(CT_ContainerSprite[CT_TaskRunIndex] != null) //如果sprite不为空
        {
            CT_ContainerSprite[CT_TaskRunIndex][1] = l; //设置sprite层
            CT_Repaint = 1; //请求重绘
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 碰撞检测
//--------------------------------------------------------------------
function sprite_collision(collspr)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(collspr.type === -2) //如果对象是sprite
        {
            if(CT_ContainerSprite[CT_TaskRunIndex] != null) //如果sprite不为空
            {
                var collision = 0;
                var spr_l = CT_ContainerSprite[CT_TaskRunIndex][1]; //sprite层
                var spr_x = CT_ContainerSprite[CT_TaskRunIndex][2]; //sprite位置x
                var spr_y = CT_ContainerSprite[CT_TaskRunIndex][3]; //sprite位置y
                var box_x = CT_ContainerSprite[CT_TaskRunIndex][14]; //sprite碰撞盒位置x
                var box_y = CT_ContainerSprite[CT_TaskRunIndex][15]; //sprite碰撞盒位置y
                var box_w = CT_ContainerSprite[CT_TaskRunIndex][16]; //sprite碰撞盒宽度
                var box_h = CT_ContainerSprite[CT_TaskRunIndex][17]; //sprite碰撞盒高度
                var box_cx = CT_ContainerSprite[CT_TaskRunIndex][18]; //sprite碰撞盒中心位置x
                var box_cy = CT_ContainerSprite[CT_TaskRunIndex][19]; //sprite碰撞盒中心位置y
                var box_r = CT_ContainerSprite[CT_TaskRunIndex][20]; //sprite碰撞盒半径
                var i;
                for(i=0;i<CT_ContainerSpriteLength;i++) //遍历sprite容器
                {
                    if(CT_ContainerSprite[i] != null) //如果当前sprite不为空
                    {
                        var cspr_id = CT_ContainerSprite[i][0]; //当前sprite id
                        var cspr_l = CT_ContainerSprite[i][1]; //当前sprite层
                        var cspr_x = CT_ContainerSprite[i][2]; //当前sprite位置x
                        var cspr_y = CT_ContainerSprite[i][3]; //当前sprite位置y
                        var cspr_coll_t = CT_ContainerSprite[i][11]; //当前sprite碰撞类型
                        var cspr_coll_e = CT_ContainerSprite[i][12]; //当前sprite边缘碰撞
                        var cbox_x = CT_ContainerSprite[i][14]; //当前sprite碰撞盒位置x
                        var cbox_y = CT_ContainerSprite[i][15]; //当前sprite碰撞盒位置y
                        var cbox_w = CT_ContainerSprite[i][16]; //当前sprite碰撞盒宽度
                        var cbox_h = CT_ContainerSprite[i][17]; //当前sprite碰撞盒高度
                        var cbox_cx = CT_ContainerSprite[i][18]; //当前sprite碰撞盒中心位置x
                        var cbox_cy = CT_ContainerSprite[i][19]; //当前sprite碰撞盒中心位置y
                        var cbox_r = CT_ContainerSprite[i][20]; //当前sprite碰撞盒半径
                        if(cspr_id === collspr.id) //如果当前sprite id等于碰撞的sprite id
                        {
                            if(spr_l === cspr_l) //如果sprite层等于碰撞的sprite层
                            {
                                if(cspr_coll_t === 0) //如果碰撞的sprite碰撞类型是矩形碰撞
                                {
                                    if(spr_x + box_x + box_w > cspr_x + cbox_x && spr_x + box_x < cspr_x + cbox_x + cbox_w && spr_y + box_y + box_h > cspr_y + cbox_y && spr_y + box_y < cspr_y + cbox_y + cbox_h) //如果sprite图像与碰撞的sprite图像相交
                                    {
                                        collision = 1;
                                        if(cspr_coll_e === 1) //如果碰撞的sprite是边缘碰撞
                                        {
                                            var spr_lx = CT_ContainerSprite[CT_TaskRunIndex][9]; //sprite上次位置x
                                            var spr_ly = CT_ContainerSprite[CT_TaskRunIndex][10]; //sprite上次位置y
                                            var dx = Math.abs(spr_lx-spr_x);
                                            var dy = -Math.abs(spr_ly-spr_y);
                                            var sx = spr_x < spr_lx ? 1 : -1;
                                            var sy = spr_y < spr_ly ? 1 : -1;
                                            var dd = dx + dy;
                                            var dd2;
                                            while(1)
                                            {
                                                if(!(spr_x + box_x + box_w > cspr_x + cbox_x && spr_x + box_x < cspr_x + cbox_x + cbox_w && spr_y + box_y + box_h > cspr_y + cbox_y && spr_y + box_y < cspr_y + cbox_y + cbox_h)) //如果sprite图像与碰撞的sprite图像不相交
                                                {
                                                    CT_ContainerSprite[CT_TaskRunIndex][2] = spr_x; //设置sprite位置
                                                    CT_ContainerSprite[CT_TaskRunIndex][3] = spr_y; //设置sprite位置
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
                                    if(spr_distance < box_r + cbox_r) //如果sprite图像在碰撞的sprite图像半径内
                                    {
                                        collision = 1;
                                        if(cspr_coll_e === 1) //如果碰撞的sprite是边缘碰撞
                                        {
                                            var spr_lx = CT_ContainerSprite[CT_TaskRunIndex][9]; //sprite上次位置x
                                            var spr_ly = CT_ContainerSprite[CT_TaskRunIndex][10]; //sprite上次位置y
                                            var dx = Math.abs(spr_lx-spr_x);
                                            var dy = -Math.abs(spr_ly-spr_y);
                                            var sx = spr_x < spr_lx ? 1 : -1;
                                            var sy = spr_y < spr_ly ? 1 : -1;
                                            var dd = dx + dy;
                                            var dd2;
                                            while(1)
                                            {
                                                var spr_distance = Math.sqrt(Math.pow((spr_x+box_cx)-(cspr_x+cbox_cx),2)+Math.pow((spr_y+box_cy)-(cspr_y+cbox_cy),2));
                                                if(spr_distance >= box_r + cbox_r) //如果sprite图像在碰撞的sprite图像半径内
                                                {
                                                    CT_ContainerSprite[CT_TaskRunIndex][2] = spr_x; //设置sprite位置
                                                    CT_ContainerSprite[CT_TaskRunIndex][3] = spr_y; //设置sprite位置
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
                if(collision === 1)
                {
                    CT_Repaint = 1; //请求重绘
                    return 1;
                }
            }        
        }
        else
        {
            cprint("ERROR : Not is sprite object.");
        }
    }
    return 0;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// Sprite设置矩形碰撞盒
//--------------------------------------------------------------------
function sprite_set_rectbox(x,y,w,h)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CT_ContainerSprite[CT_TaskRunIndex] != null) //如果列表中sprite不为空
        {
            CT_ContainerSprite[CT_TaskRunIndex][14] = x; //sprite碰撞盒位置x
            CT_ContainerSprite[CT_TaskRunIndex][15] = y; //sprite碰撞盒位置y
            CT_ContainerSprite[CT_TaskRunIndex][16] = w; //sprite碰撞盒宽度
            CT_ContainerSprite[CT_TaskRunIndex][17] = h; //sprite碰撞盒高度
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// Sprite设置圆形碰撞盒
//--------------------------------------------------------------------
function sprite_set_cirbox(cx,cy,r)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CT_ContainerSprite[CT_TaskRunIndex] != null) //如果列表中sprite不为空
        {
            CT_ContainerSprite[CT_TaskRunIndex][18] = cx; //sprite碰撞盒中心位置x
            CT_ContainerSprite[CT_TaskRunIndex][19] = cy; //sprite碰撞盒中心位置y
            CT_ContainerSprite[CT_TaskRunIndex][20] = r; //sprite碰撞盒半径
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置Sprite子图像
//--------------------------------------------------------------------
function sprite_set_subimg(index)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CT_ContainerSprite[CT_TaskRunIndex] != null) //如果sprite不为空
        {
            var spr_subnum = CT_ContainerSprite[CT_TaskRunIndex][6]; //sprite子图像数量
            if(index <= spr_subnum - 1) //如果sprite子图像索引小于sprite子图像数量-1
            {
                CT_ContainerSprite[CT_TaskRunIndex][5] = index; //设置sprite子图像索引
                CT_Repaint = 1; //请求重绘
            }
            else
            {
                cprint("ERROR : The sprite subimage index is greater than the number of subimage."); //输出错误
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置Sprite透明度
//--------------------------------------------------------------------
function sprite_set_colora(alpha)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CT_ContainerSprite[CT_TaskRunIndex] != null) //如果sprite不为空
        {
            CT_ContainerSprite[CT_TaskRunIndex][21] = alpha; //设置sprite颜色
            CT_Repaint = 1; //请求重绘
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置Sprite横向缩放
//--------------------------------------------------------------------
function sprite_set_scalex(sx)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CT_ContainerSprite[CT_TaskRunIndex] != null) //如果sprite不为空
        {
            CT_ContainerSprite[CT_TaskRunIndex][22] = sx; //设置sprite横向缩放
            CT_Repaint = 1; //请求重绘
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置Sprite竖向缩放
//--------------------------------------------------------------------
function sprite_set_scaley(sy)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CT_ContainerSprite[CT_TaskRunIndex] != null) //如果sprite不为空
        {
            CT_ContainerSprite[CT_TaskRunIndex][23] = sy; //设置sprite竖向缩放
            CT_Repaint = 1; //请求重绘
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置Sprite旋转
//--------------------------------------------------------------------
function sprite_set_rotate(rot)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CT_ContainerSprite[CT_TaskRunIndex] != null) //如果sprite不为空
        {
            if(rot >= 0 && rot <= 359) //如果旋转角度正确   
            {
                CT_ContainerSprite[CT_TaskRunIndex][24] = rot; //设置sprite旋转
                CT_Repaint = 1; //请求重绘
            }
            else
            {
                cprint("ERROR : Rotation angle is error.");
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// Sprite变量赋值 数字
//--------------------------------------------------------------------
function spritenum_set(i,n)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CT_ContainerSprite[CT_TaskRunIndex] != null) //如果sprite不为空
        {
            CT_TaskSetNum(CT_TaskRunIndex,i,n); //sprite程序数字变量赋值
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// Sprite变量赋值 字符串
//--------------------------------------------------------------------
function spritestr_set(i,s)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CT_ContainerSprite[CT_TaskRunIndex] != null) //如果sprite不为空
        {
            CT_TaskSetStr(CT_TaskRunIndex,i,s); //sprite程序字符串变量赋值
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// Sprite变量 数字
//--------------------------------------------------------------------
function spritenum(i)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CT_ContainerSprite[CT_TaskRunIndex] != null) //如果sprite不为空
        {
            var var_n = CT_TaskNum(CT_TaskRunIndex,i); //sprite程序数字变量值
            return var_n; //返回sprite程序数字变量值
        }
    }
    return 0;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// Sprite变量 字符串
//--------------------------------------------------------------------
function spritestr(i)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CT_ContainerSprite[CT_TaskRunIndex] != null) //如果列表中sprite不为空
        {
            var var_s = CT_TaskStr(CT_TaskRunIndex,i); //sprite程序字符串变量值
            return var_s; //返回sprite程序字符串变量值
        }
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
            for(i=0;i<CT_ContainerSpriteLength;i++) //遍历sprite容器
            {
                if(CT_ContainerSprite[i] != null) //如果当前sprite不为空
                {
                    var spr_id = CT_ContainerSprite[i][0]; //当前sprite id
                    if(spr_id === id) //如果当前sprite id等于sprite id
                    {
                        var spr_x = CT_ContainerSprite[i][2]; //当前sprite位置x
                        var spr_y = CT_ContainerSprite[i][3]; //当前sprite位置y
                        var spr_collw = CT_ContainerSprite[i][7]; //当前sprite碰撞区宽度
                        var spr_collh = CT_ContainerSprite[i][8]; //当前sprite碰撞区高度
                        if(x >= spr_x && y >= spr_y && x < spr_x + spr_collw && y < spr_y + spr_collh) //如果当前sprite在指定位置中
                        {
                            return 1;
                        }
                    }
                }
            }
        }
        else
        {
            cprint("ERROR : Not is sprite object.");
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
// 销毁索引Sprite
//--------------------------------------------------------------------
function isprite_destroy(si)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(si < CT_ContainerSpriteLength) //如果sprite索引小于sprite容器长度
        {
            if(CT_ContainerSprite[si] != null) //如果指定索引的sprite不为空
            {
                CT_ContainerSprite[si] = null; //清空sprite
                CT_TaskDestroy(si); //销毁sprite子程序
                CT_Repaint = 1; //请求重绘
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 索引Sprite位置x
//--------------------------------------------------------------------
function isprite_x(si)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(si < CT_ContainerSpriteLength) //如果sprite索引小于sprite容器长度
        {
            if(CT_ContainerSprite[si] != null) //如果指定索引的sprite不为空
            {
                var x = CT_ContainerSprite[si][2]; //sprite位置x
                return x; //返回sprite位置x
            }
            else
            {
                cprint("ERROR : The sprite is null.");
            }
        }
    }
    return -1;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 索引Sprite位置y
//--------------------------------------------------------------------
function isprite_y(si)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(si < CT_ContainerSpriteLength) //如果sprite索引小于sprite容器长度
        {
            if(CT_ContainerSprite[si] != null) //如果指定索引的sprite不为空
            {
                var y = CT_ContainerSprite[si][3]; //sprite位置y
                return y; //返回sprite位置y
            }
            else
            {
                cprint("ERROR : The sprite is null.");
            }
        }
    }
    return -1;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置索引Sprite位置x
//--------------------------------------------------------------------
function isprite_set_x(si,x)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(si < CT_ContainerSpriteLength) //如果sprite索引小于sprite容器长度
        {
            if(CT_ContainerSprite[si] != null) //如果指定索引的sprite不为空
            {
                CT_ContainerSprite[si][2] = x; //设置sprite位置x
                CT_Repaint = 1; //请求重绘
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置索引Sprite位置y
//--------------------------------------------------------------------
function isprite_set_y(si,y)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(si < CT_ContainerSpriteLength) //如果sprite索引小于sprite容器长度
        {
            if(CT_ContainerSprite[si] != null) //如果指定索引的sprite不为空
            {
                CT_ContainerSprite[si][3] = y; //设置sprite位置y
                CT_Repaint = 1; //请求重绘
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置索引Sprite层
//--------------------------------------------------------------------
function isprite_set_layer(si,l)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(si < CT_ContainerSpriteLength) //如果sprite索引小于sprite容器长度
        {
            if(CT_ContainerSprite[si] != null) //如果指定索引的sprite不为空
            {
                CT_ContainerSprite[si][1] = l; //设置指定索引sprite层
                CT_Repaint = 1; //请求重绘
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 索引Sprite碰撞检测
//--------------------------------------------------------------------
function isprite_collision(si)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(si < CT_ContainerSpriteLength) //如果sprite索引小于sprite容器长度
        {
            if(CT_ContainerSprite[CT_TaskRunIndex] != null) //如果sprite不为空
            {
                var spr_l = CT_ContainerSprite[CT_TaskRunIndex][1]; //sprite层
                var spr_x = CT_ContainerSprite[CT_TaskRunIndex][2]; //sprite位置x
                var spr_y = CT_ContainerSprite[CT_TaskRunIndex][3]; //sprite位置y
                var box_x = CT_ContainerSprite[CT_TaskRunIndex][14]; //sprite碰撞盒位置x
                var box_y = CT_ContainerSprite[CT_TaskRunIndex][15]; //sprite碰撞盒位置y
                var box_w = CT_ContainerSprite[CT_TaskRunIndex][16]; //sprite碰撞盒宽度
                var box_h = CT_ContainerSprite[CT_TaskRunIndex][17]; //sprite碰撞盒高度
                var box_cx = CT_ContainerSprite[CT_TaskRunIndex][18]; //sprite碰撞盒中心位置x
                var box_cy = CT_ContainerSprite[CT_TaskRunIndex][19]; //sprite碰撞盒中心位置y
                var box_r = CT_ContainerSprite[CT_TaskRunIndex][20]; //sprite碰撞盒半径
                if(CT_ContainerSprite[si] != null) //如果当前sprite不为空
                {
                    var cspr_l = CT_ContainerSprite[si][1]; //当前sprite层
                    var cspr_x = CT_ContainerSprite[si][2]; //当前sprite位置x
                    var cspr_y = CT_ContainerSprite[si][3]; //当前sprite位置y
                    var cspr_coll_t = CT_ContainerSprite[si][11]; //当前sprite碰撞类型
                    var cspr_coll_e = CT_ContainerSprite[si][12]; //当前sprite边缘碰撞
                    var cbox_x = CT_ContainerSprite[si][14]; //sprite碰撞盒位置x
                    var cbox_y = CT_ContainerSprite[si][15]; //sprite碰撞盒位置y
                    var cbox_w = CT_ContainerSprite[si][16]; //sprite碰撞盒宽度
                    var cbox_h = CT_ContainerSprite[si][17]; //sprite碰撞盒高度
                    var cbox_cx = CT_ContainerSprite[si][18]; //sprite碰撞盒中心位置x
                    var cbox_cy = CT_ContainerSprite[si][19]; //sprite碰撞盒中心位置y
                    var cbox_r = CT_ContainerSprite[si][20]; //sprite碰撞盒半径
                    if(spr_l === cspr_l) //如果sprite层等于碰撞的sprite层
                    {
                        if(cspr_coll_t === 0) //如果碰撞的sprite碰撞类型是矩形碰撞
                        {
                            if(spr_x + box_x + box_w > cspr_x + cbox_x && spr_x + box_x < cspr_x + cbox_x + cbox_w && spr_y + box_y + box_h > cspr_y + cbox_y && spr_y + box_y < cspr_y + cbox_y + cbox_h) //如果sprite图像与碰撞的sprite图像相交
                            {
                                if(cspr_coll_e === 0) //如果碰撞的sprite不是边缘碰撞
                                {
                                    return 1;
                                }
                                if(cspr_coll_e === 1) //如果碰撞的sprite是边缘碰撞
                                {
                                    var spr_lx = CT_ContainerSprite[CT_TaskRunIndex][9]; //sprite上次位置x
                                    var spr_ly = CT_ContainerSprite[CT_TaskRunIndex][10]; //sprite上次位置y
                                    var dx = Math.abs(spr_lx-spr_x);
                                    var dy = -Math.abs(spr_ly-spr_y);
                                    var sx = spr_x < spr_lx ? 1 : -1;
                                    var sy = spr_y < spr_ly ? 1 : -1;
                                    var dd = dx + dy;
                                    var dd2;
                                    while(1)
                                    {
                                        if(!(spr_x + box_x + box_w > cspr_x + cbox_x && spr_x + box_x < cspr_x + cbox_x + cbox_w && spr_y + box_y + box_h > cspr_y + cbox_y && spr_y + box_y < cspr_y + cbox_y + cbox_h)) //如果sprite图像与碰撞的sprite图像不相交
                                        {
                                            CT_ContainerSprite[CT_TaskRunIndex][2] = spr_x; //设置sprite位置
                                            CT_ContainerSprite[CT_TaskRunIndex][3] = spr_y; //设置sprite位置
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
                            var spr_distance = parseInt(Math.sqrt(Math.pow((spr_x+box_cx)-(cspr_x+cbox_cx),2)+Math.pow((spr_y+box_cy)-(cspr_y+cbox_cy),2))); //sprite与碰撞的sprite的距离
                            if(spr_distance < box_r + cbox_r) //如果sprite图像在碰撞的sprite图像半径内
                            {
                                if(cspr_coll_e === 0) //如果碰撞的sprite不是边缘碰撞
                                {
                                    return 1;
                                }
                                if(cspr_coll_e === 1) //如果碰撞的sprite是边缘碰撞
                                {
                                    var spr_lx = CT_ContainerSprite[CT_TaskRunIndex][9]; //sprite上次位置x
                                    var spr_ly = CT_ContainerSprite[CT_TaskRunIndex][10]; //sprite上次位置y
                                    var dx = Math.abs(spr_lx-spr_x);
                                    var dy = -Math.abs(spr_ly-spr_y);
                                    var sx = spr_x < spr_lx ? 1 : -1;
                                    var sy = spr_y < spr_ly ? 1 : -1;
                                    var dd = dx + dy;
                                    var dd2;
                                    while(1)
                                    {
                                        var spr_distance = Math.sqrt(Math.pow((spr_x+box_cx)-(cspr_x+cbox_cx),2)+Math.pow((spr_y+box_cy)-(cspr_y+cbox_cy),2));
                                        if(spr_distance >= box_r + cbox_r) //如果sprite图像在碰撞的sprite图像半径内
                                        {
                                            CT_ContainerSprite[CT_TaskRunIndex][2] = spr_x; //设置sprite位置
                                            CT_ContainerSprite[CT_TaskRunIndex][3] = spr_y; //设置sprite位置
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
    }
    return 0;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 索引Sprite设置矩形碰撞盒
//--------------------------------------------------------------------
function isprite_set_rectbox(si,x,y,w,h)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(si < CT_ContainerSpriteLength) //如果sprite索引小于sprite容器长度
        {
            if(CT_ContainerSprite[si] != null) //如果列表中sprite不为空
            {
                CT_ContainerSprite[si][14] = x; //sprite碰撞盒位置x
                CT_ContainerSprite[si][15] = y; //sprite碰撞盒位置y
                CT_ContainerSprite[si][16] = w; //sprite碰撞盒宽度
                CT_ContainerSprite[si][17] = h; //sprite碰撞盒高度
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 索引Sprite设置圆形碰撞盒
//--------------------------------------------------------------------
function isprite_set_cirbox(si,cx,cy,r)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(si < CT_ContainerSpriteLength) //如果sprite索引小于sprite容器长度
        {
            if(CT_ContainerSprite[si] != null) //如果列表中sprite不为空
            {
                CT_ContainerSprite[si][18] = cx; //sprite碰撞盒中心位置x
                CT_ContainerSprite[si][19] = cy; //sprite碰撞盒中心位置y
                CT_ContainerSprite[si][20] = r; //sprite碰撞盒半径
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// Sprite检查
//--------------------------------------------------------------------
function isprite_check(x,y,si)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(si < CT_ContainerSpriteLength) //如果sprite索引小于sprite容器长度
        {
            if(CT_ContainerSprite[si] != null) //如果当前sprite不为空
            {
                var spr_x = CT_ContainerSprite[si][2]; //sprite位置x
                var spr_y = CT_ContainerSprite[si][3]; //sprite位置y
                var spr_collw = CT_ContainerSprite[si][7]; //sprite碰撞区宽度
                var spr_collh = CT_ContainerSprite[si][8]; //sprite碰撞区高度
                if(x >= spr_x && y >= spr_y && x < spr_x + spr_collw && y < spr_y + spr_collh) //如果sprite在指定位置中
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
// 设置索引Sprite子图像
//--------------------------------------------------------------------
function isprite_set_subimg(si,index)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(si < CT_ContainerSpriteLength) //如果sprite索引小于sprite容器长度
        {
            if(CT_ContainerSprite[si] != null) //如果指定索引的sprite不为空
            {
                var spr_subnum = CT_ContainerSprite[si][6]; //sprite子图像数量
                if(index <= spr_subnum - 1) //如果sprite子图像索引小于sprite子图像数量-1
                {
                    CT_ContainerSprite[si][5] = index; //设置sprite子图像索引
                    CT_Repaint = 1; //请求重绘
                }
                else
                {
                    cprint("ERROR : The sprite subimage index is greater than the number of subimage."); //输出错误
                }
            }
            else
            {
                cprint("ERROR : The sprite is null.");
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置索引Sprite透明度
//--------------------------------------------------------------------
function isprite_set_colora(si,alpha)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(si < CT_ContainerSpriteLength) //如果sprite索引小于sprite容器长度
        {
            if(CT_ContainerSprite[si] != null) //如果指定索引的sprite不为空
            {
                CT_ContainerSprite[si][21] = alpha; //设置sprite颜色
                CT_Repaint = 1; //请求重绘
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置索引Sprite横向缩放
//--------------------------------------------------------------------
function isprite_set_scalex(si,sx)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(si < CT_ContainerSpriteLength) //如果sprite索引小于sprite容器长度
        {
            if(CT_ContainerSprite[si] != null) //如果指定索引的sprite不为空
            {
                CT_ContainerSprite[si][22] = sx; //设置sprite横向缩放
                CT_Repaint = 1; //请求重绘
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置索引Sprite竖向缩放
//--------------------------------------------------------------------
function isprite_set_scaley(si,sy)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(si < CT_ContainerSpriteLength) //如果sprite索引小于sprite容器长度
        {
            if(CT_ContainerSprite[si] != null) //如果指定索引的sprite不为空
            {
                CT_ContainerSprite[si][23] = sy; //设置sprite竖向缩放
                CT_Repaint = 1; //请求重绘
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置索引Sprite旋转
//--------------------------------------------------------------------
function isprite_set_rotate(si,rot)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(si < CT_ContainerSpriteLength) //如果sprite索引小于sprite容器长度
        {
            if(CT_ContainerSprite[si] != null) //如果指定索引的sprite不为空
            {
                if(rot >= 0 && rot <= 359) //如果旋转角度正确   
                {
                    CT_ContainerSprite[si][24] = rot; //设置sprite旋转
                    CT_Repaint = 1; //请求重绘
                }
                else
                {
                    cprint("ERROR : Rotation angle is error.");
                }
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 索引Sprite变量赋值 数字
//--------------------------------------------------------------------
function ispritenum_set(si,i,n)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(si < CT_ContainerSpriteLength) //如果sprite索引小于sprite容器长度
        {
            if(CT_ContainerSprite[si] != null) //如果指定索引的sprite不为空
            {
                CT_TaskSetNum(si,i,n); //sprite程序数字变量赋值
            }
            else
            {
                cprint("ERROR : The sprite is null.");
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 索引Sprite变量赋值 字符串
//--------------------------------------------------------------------
function ispritestr_set(si,i,s)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(si < CT_ContainerSpriteLength) //如果sprite索引小于sprite容器长度
        {
            if(CT_ContainerSprite[si] != null) //如果指定索引的sprite不为空
            {
                CT_TaskSetStr(si,i,s); //sprite程序字符串变量赋值
            }
            else
            {
                cprint("ERROR : The sprite is null.");
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 索引Sprite变量 数字
//--------------------------------------------------------------------
function ispritenum(si,i)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(si < CT_ContainerSpriteLength) //如果sprite索引小于sprite容器长度
        {
            if(CT_ContainerSprite[si] != null) //如果指定索引的sprite不为空
            {
                var var_n = CT_TaskNum(si,i); //sprite程序数字变量值
                return var_n; //返回sprite程序数字变量值
            }
            else
            {
                cprint("ERROR : The sprite is null.");
            }
        }
    }
    return 0;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 索引Sprite变量 字符串
//--------------------------------------------------------------------
function ispritestr(si,i)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(si < CT_ContainerSpriteLength) //如果sprite索引小于sprite容器长度
        {
            if(CT_ContainerSprite[si] != null) //如果指定索引的sprite不为空
            {
                var var_s = CT_TaskStr(si,i); //sprite程序字符串变量值
                return var_s; //返回sprite程序字符串变量值
            }
            else
            {
                cprint("ERROR : The sprite is null.");
            }
        }
    }
    return "";
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 销毁所有Sprite
//--------------------------------------------------------------------
function sprite_destroy_all(sprite)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var id = sprite.id; //sprite id
        if(sprite.type === -2) //如果对象是sprite
        {
            var i;
            for(i=0;i<CT_ContainerSpriteLength;i++) //遍历sprite容器
            {
                if(CT_ContainerSprite[i] != null) //如果当前sprite不为空
                {
                    var spr_id = CT_ContainerSprite[i][0]; //当前sprite id
                    if(spr_id === id) //如果当前sprite id等于sprite id
                    {
                        CT_ContainerSprite[i] = null; //清空当前sprite
                        CT_TaskDestroy(i); //销毁sprite子程序
                        CT_Repaint = 1; //请求重绘
                    }
                }
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置所有Sprite位置x
//--------------------------------------------------------------------
function sprite_all_set_x(sprite,x)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var id = sprite.id; //sprite id
        if(sprite.type === -2) //如果对象是sprite
        {
            var i;
            for(i=0;i<CT_ContainerSpriteLength;i++) //遍历sprite容器
            {
                if(CT_ContainerSprite[i] != null) //如果当前sprite不为空
                {
                    var spr_id = CT_ContainerSprite[i][0]; //当前sprite id
                    if(spr_id === id) //如果当前sprite id等于sprite id
                    {
                        CT_ContainerSprite[i][2] = x; //设置当前sprite位置x
                        CT_Repaint = 1; //请求重绘
                    }
                }
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置所有Sprite位置y
//--------------------------------------------------------------------
function sprite_all_set_y(sprite,y)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var id = sprite.id; //sprite id
        if(sprite.type === -2) //如果对象是sprite
        {
            var i;
            for(i=0;i<CT_ContainerSpriteLength;i++) //遍历sprite容器
            {
                if(CT_ContainerSprite[i] != null) //如果当前sprite不为空
                {
                    var spr_id = CT_ContainerSprite[i][0]; //当前sprite id
                    if(spr_id === id) //如果当前sprite id等于sprite id
                    {
                        CT_ContainerSprite[i][3] = y; //设置当前sprite位置y
                        CT_Repaint = 1; //请求重绘
                    }
                }
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置所有Sprite层
//--------------------------------------------------------------------
function sprite_all_set_layer(sprite,l)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var id = sprite.id; //sprite id
        if(sprite.type === -2) //如果对象是sprite
        {
            var i;
            for(i=0;i<CT_ContainerSpriteLength;i++) //遍历sprite容器
            {
                if(CT_ContainerSprite[i] != null) //如果当前sprite不为空
                {
                    var spr_id = CT_ContainerSprite[i][0]; //当前sprite id
                    if(spr_id === id) //如果当前sprite id等于sprite id
                    {
                        CT_ContainerSprite[i][1] = l; //设置当前sprite层
                        CT_Repaint = 1; //请求重绘
                    }
                }
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置所有Sprite子图像
//--------------------------------------------------------------------
function sprite_all_set_subimg(sprite,index)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var id = sprite.id; //sprite id
        if(sprite.type === -2) //如果对象是sprite
        {
            var i;
            for(i=0;i<CT_ContainerSpriteLength;i++) //遍历sprite容器
            {
                if(CT_ContainerSprite[i] != null) //如果当前sprite不为空
                {
                    var spr_id = CT_ContainerSprite[i][0]; //当前sprite id
                    if(spr_id === id) //如果当前sprite id等于sprite id
                    {
                        var spr_subnum = CT_ContainerSprite[i][6]; //当前sprite子图像数量
                        if(index <= spr_subnum - 1) //如果sprite子图像索引小于sprite子图像数量-1
                        {
                            CT_ContainerSprite[i][5] = index; //设置sprite子图像索引
                            CT_Repaint = 1; //请求重绘
                        }
                        else
                        {
                           cprint("ERROR : The sprite subimage index is greater than the number of subimage."); //输出错误
                        }
                    }
                }
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置所有Sprite透明度
//--------------------------------------------------------------------
function sprite_all_set_colora(sprite,alpha)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var id = sprite.id; //sprite id
        if(sprite.type === -2) //如果对象是sprite
        {
            var i;
            for(i=0;i<CT_ContainerSpriteLength;i++) //遍历sprite容器
            {
                if(CT_ContainerSprite[i] != null) //如果当前sprite不为空
                {
                    var spr_id = CT_ContainerSprite[i][0]; //当前sprite id
                    if(spr_id === id) //如果当前sprite id等于sprite id
                    {
                        CT_ContainerSprite[i][21] = alpha; //设置sprite颜色
                        CT_Repaint = 1; //请求重绘
                    }
                }
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置所有Sprite横向缩放
//--------------------------------------------------------------------
function sprite_all_set_scalex(sprite,sx)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var id = sprite.id; //sprite id
        if(sprite.type === -2) //如果对象是sprite
        {
            var i;
            for(i=0;i<CT_ContainerSpriteLength;i++) //遍历sprite容器
            {
                if(CT_ContainerSprite[i] != null) //如果当前sprite不为空
                {
                    var spr_id = CT_ContainerSprite[i][0]; //当前sprite id
                    if(spr_id === id) //如果当前sprite id等于sprite id
                    {
                        CT_ContainerSprite[i][22] = sx; //设置sprite横向缩放
                        CT_Repaint = 1; //请求重绘
                    }
                }
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置所有Sprite竖向缩放
//--------------------------------------------------------------------
function sprite_all_set_scaley(sprite,sy)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var id = sprite.id; //sprite id
        if(sprite.type === -2) //如果对象是sprite
        {
            var i;
            for(i=0;i<CT_ContainerSpriteLength;i++) //遍历sprite容器
            {
                if(CT_ContainerSprite[i] != null) //如果当前sprite不为空
                {
                    var spr_id = CT_ContainerSprite[i][0]; //当前sprite id
                    if(spr_id === id) //如果当前sprite id等于sprite id
                    {
                        CT_ContainerSprite[i][23] = sy; //设置sprite竖向缩放
                        CT_Repaint = 1; //请求重绘
                    }
                }
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置所有Sprite旋转
//--------------------------------------------------------------------
function sprite_all_set_rotate(sprite,rot)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var id = sprite.id; //sprite id
        if(sprite.type === -2) //如果对象是sprite
        {
            var i;
            for(i=0;i<CT_ContainerSpriteLength;i++) //遍历sprite容器
            {
                if(CT_ContainerSprite[i] != null) //如果当前sprite不为空
                {
                    var spr_id = CT_ContainerSprite[i][0]; //当前sprite id
                    if(spr_id === id) //如果当前sprite id等于sprite id
                    {
                        if(rot >= 0 && rot <= 359) //如果旋转角度正确   
                        {
                            CT_ContainerSprite[i][24] = rot; //设置sprite旋转
                            CT_Repaint = 1; //请求重绘
                        }
                        else
                        {
                            cprint("ERROR : Rotation angle is error.");
                        }
                    }
                }
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 所有Sprite变量赋值 数字
//--------------------------------------------------------------------
function spritenum_all_set(sprite,vi,n)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var id = sprite.id; //sprite id
        if(sprite.type === -2) //如果对象是sprite
        {
            var i;
            for(i=0;i<CT_ContainerSpriteLength;i++) //遍历sprite容器
            {
               if(CT_ContainerSprite[i] != null) //如果当前sprite不为空
                {
                    var spr_id = CT_ContainerSprite[i][0]; //当前sprite id
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
// 所有Sprite变量赋值 字符串
//--------------------------------------------------------------------
function spritestr_all_set(sprite,vi,s)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var id = sprite.id; //sprite id
        if(sprite.type === -2) //如果对象是sprite
        {
            var i;
            for(i=0;i<CT_ContainerSpriteLength;i++) //遍历sprite容器
            {
                if(CT_ContainerSprite[i] != null) //如果当前sprite不为空
                {
                    var spr_id = CT_ContainerSprite[i][0]; //当前sprite id
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
// 所有Sprite设置矩形碰撞盒
//--------------------------------------------------------------------
function sprite_all_set_rectbox(sprite,x,y,w,h)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var id = sprite.id; //sprite id
        if(sprite.type === -2) //如果对象是sprite
        {
            var i;
            for(i=0;i<CT_ContainerSpriteLength;i++) //遍历sprite容器
            {
                if(CT_ContainerSprite[i] != null) //如果当前sprite不为空
                {
                    var spr_id = CT_ContainerSprite[i][0]; //当前sprite id
                    if(spr_id === id) //如果当前sprite id等于sprite id
                    {
                        CT_ContainerSprite[i][14] = x; //当前sprite碰撞盒位置x
                        CT_ContainerSprite[i][15] = y; //当前sprite碰撞盒位置y
                        CT_ContainerSprite[i][16] = w; //当前sprite碰撞盒宽度
                        CT_ContainerSprite[i][17] = h; //当前sprite碰撞盒高度
                    }
                }
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 所有Sprite设置圆形碰撞盒
//--------------------------------------------------------------------
function sprite_all_set_cirbox(sprite,cx,cy,r)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        var id = sprite.id; //sprite id
        if(sprite.type === -2) //如果对象是sprite
        {
            var i;
            for(i=0;i<CT_ContainerSpriteLength;i++) //遍历sprite容器
            {
                if(CT_ContainerSprite[i] != null) //如果当前sprite不为空
                {
                    var spr_id = CT_ContainerSprite[i][0]; //当前sprite id
                    if(spr_id === id) //如果当前sprite id等于sprite id
                    {
                        CT_ContainerSprite[i][18] = cx; //当前sprite碰撞盒位置x
                        CT_ContainerSprite[i][19] = cy; //当前sprite碰撞盒位置y
                        CT_ContainerSprite[i][20] = r; //当前sprite碰撞盒宽度
                    }
                }
            }
        }
    }
}
//--------------------------------------------------------------------