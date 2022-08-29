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
            if(image !== -1) //如果sprite有图像
            {
                var res_type = CT_ResourceList[image][1]; //获取资源类型
                if(res_type === 0) //如果资源类型是图像
                {
                    image_w = CT_ResourceList[image][2]; //sprite图像宽度
                    image_h = CT_ResourceList[image][3]; //sprite图像高度
                }
                else
                { 
                    image = -1; //sprite无图像
                    cprint("ERROR 4 : The resource index corresponding to the resource file is not a image. ResIndex : " + String(image));
                }
            }
            var layer = CTsprite.layer; //sprite层
            var subimg = CTsprite.subimg; //sprite默认子图像索引
            var subnum = CTsprite.subnum; //sprite子图像数量
            var coll_t = CTsprite.collision_type; //sprite碰撞类型
            var coll_e = CTsprite.collision_edge; //sprite边缘碰撞
            if(subnum >= 1) //如果sprite子图像数量大于等于1
            {
                if(subimg <= subnum - 1) //如果子图像索引小于最大
                {
                    var subimg_w = parseInt(image_w / subnum); //sprite子图像宽度
                    var subimg_h = image_h; //sprite子图像高度
                    var conspr_i = CT_ContainerSpriteIndex; //sprite容器sprite层的当前索引
                    if(CT_ContainerSpriteIndex > 0) //如果sprite容器长度大于0
                    {
                        var i;
                        for(i=0;i<CT_ContainerSpriteIndex;i++) //遍历sprite容器
                        {
                            if(CT_ContainerSprite[i] == null) //如果当前sprite为空
                            {
                                CT_ContainerSprite[i] = [id,layer,x,y,image,subimg,subnum,subimg_w,subimg_h,x,y,coll_t,coll_e]; //将sprite数据写入sprite容器
                                CT_TaskCreated(i,CTsprite.main,CTsprite.loop); //创建sprite程序
                                CT_InterfaceRepaint(); //请求重绘
                                return i; //中断
                           }
                        }
                        CT_ContainerSprite[conspr_i] = [id,layer,x,y,image,subimg,subnum,subimg_w,subimg_h,x,y,coll_t,coll_e]; //将sprite数据写入sprite容器
                        CT_TaskCreated(conspr_i,CTsprite.main,CTsprite.loop); //创建sprite程序
                        CT_ContainerSpriteIndex ++; //sprite容器索引 +1
                        CT_InterfaceRepaint(); //请求重绘
                        return conspr_i; //返回sprite索引
                    }
                    else
                    {
                        CT_ContainerSprite[conspr_i] = [id,layer,x,y,image,subimg,subnum,subimg_w,subimg_h,x,y,coll_t,coll_e]; //将sprite数据sprite容器
                        CT_TaskCreated(conspr_i,CTsprite.main,CTsprite.loop); //创建sprite程序
                        CT_ContainerSpriteIndex ++; //sprite容器索引 +1
                        CT_InterfaceRepaint(); //请求重绘
                        return conspr_i; //返回sprite索引
                    }
                }
                else
                {
                    cprint("ERROR 206 : The sprite subimage index is greater than the number of subimage. SubimageIndex : " + String(subimg));
                }
            }
            else
            {
                cprint("ERROR 207 : Sprite subimage number error. SubimageIndex : " + String(subimg));
            }
        }
        else
        {
            cprint("ERROR 208 : Not is sprite object. SpriteID : " + String(id));
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
        CT_TaskDestroy(CT_TaskRunIndex); //销毁sprite程序
        CT_InterfaceRepaint(); //请求重绘
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
            CT_InterfaceRepaint(); //请求重绘
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
            CT_InterfaceRepaint(); //请求重绘
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
                CT_InterfaceRepaint(); //请求重绘
            }
            else
            {
                cprint("ERROR 206 : The sprite subimage index is greater than the number of subimage. SubimageIndex : " + String(index)); //输出错误
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
                var spr_x = CT_ContainerSprite[CT_TaskRunIndex][2]; //sprite位置x
                var spr_y = CT_ContainerSprite[CT_TaskRunIndex][3]; //sprite位置y
                var spr_collw = CT_ContainerSprite[CT_TaskRunIndex][7]; //sprite碰撞区宽度
                var spr_collh = CT_ContainerSprite[CT_TaskRunIndex][8]; //sprite碰撞区高度
                var spr_l = CT_ContainerSprite[CT_TaskRunIndex][1]; //sprite层
                var i;
                for(i=0;i<CT_ContainerSpriteIndex;i++) //遍历sprite容器
                {
                    if(CT_ContainerSprite[i] != null) //如果当前sprite不为空
                    {
                        var cspr_x = CT_ContainerSprite[i][2]; //当前sprite位置x
                        var cspr_y = CT_ContainerSprite[i][3]; //当前sprite位置y
                        var cspr_collw = CT_ContainerSprite[i][7]; //当前sprite碰撞区宽度
                        var cspr_collh = CT_ContainerSprite[i][8]; //当前sprite碰撞区高度
                        var cspr_l = CT_ContainerSprite[i][1]; //当前sprite层
                        var cspr_id = CT_ContainerSprite[i][0]; //当前sprite id
                        var cspr_coll_t = CT_ContainerSprite[i][11]; //当前sprite碰撞类型
                        var cspr_coll_e = CT_ContainerSprite[i][12]; //当前sprite边缘碰撞
                        if(cspr_id === collspr.id) //如果当前sprite id等于碰撞的sprite id
                        {
                            if(cspr_coll_t === 0) //如果碰撞的sprite碰撞类型是矩形碰撞
                            {
                                if(cspr_coll_e === 0) //如果碰撞的sprite不是边缘碰撞
                                {
                                    if(spr_l === cspr_l) //如果sprite层等于碰撞的sprite层
                                    {
                                        if(spr_x + spr_collw > cspr_x && spr_x < cspr_x + cspr_collw && spr_y + spr_collh > cspr_y && spr_y < cspr_y + cspr_collh) //如果sprite图像与碰撞的sprite图像相交
                                        {
                                            return 1;
                                        }
                                    }
                                }
                                if(cspr_coll_e === 1) //如果碰撞的sprite是边缘碰撞
                                {
                                    if(spr_l === cspr_l) //如果sprite层等于碰撞的sprite层
                                    {
                                        if(spr_x + spr_collw > cspr_x && spr_x < cspr_x + cspr_collw && spr_y + spr_collh > cspr_y && spr_y < cspr_y + cspr_collh) //如果sprite图像与碰撞的sprite图像相交
                                        {
                                            var spr_lx = CT_ContainerSprite[CT_TaskRunIndex][9]; //sprite上次位置x
                                            var spr_ly = CT_ContainerSprite[CT_TaskRunIndex][10]; //sprite上次位置y
                                            CT_ContainerSprite[CT_TaskRunIndex][2] = spr_lx; //设置sprite位置x为上次位置x
                                            CT_ContainerSprite[CT_TaskRunIndex][3] = spr_ly; //设置sprite位置y为上次位置y
                                            CT_InterfaceRepaint(); //请求重绘
                                            return 1;
                                        }
                                    }
                                }
                            }
                            if(cspr_coll_t === 1) //如果碰撞的sprite碰撞类型是圆形碰撞
                            {
                                var spr_r = parseInt(spr_collw / 2); //sprite半径
                                var spr_cx = spr_x + spr_r; //sprite中心x
                                var spr_cy = spr_y + spr_r; //sprite中心y
                                var cspr_r = parseInt(cspr_collw / 2); //碰撞的sprite半径
                                var cspr_cx = cspr_x + cspr_r; //碰撞的sprite中心x
                                var cspr_cy = cspr_y + cspr_r; //碰撞的sprite中心y
                                var spr_distance = Math.sqrt(Math.pow(spr_cx-cspr_cx,2)+Math.pow(spr_cy-cspr_cy,2)); //sprite与碰撞的sprite的距离
                                if(cspr_coll_e === 0) //如果碰撞的sprite不是边缘碰撞
                                {
                                    if(spr_l === cspr_l) //如果sprite层等于碰撞的sprite层
                                    {
                                        if(spr_distance < spr_r + cspr_r) //如果sprite图像在碰撞的sprite图像半径内
                                        {
                                            return 1;
                                        }
                                    }
                                }
                                if(cspr_coll_e === 1) //如果碰撞的sprite是边缘碰撞
                                {
                                    if(spr_l === cspr_l) //如果sprite层等于碰撞的sprite层
                                    {
                                        if(spr_distance < spr_r + cspr_r) //如果sprite图像在碰撞的sprite图像半径内
                                        {
                                            var spr_lx = CT_ContainerSprite[CT_TaskRunIndex][9]; //sprite上次位置x
                                            var spr_ly = CT_ContainerSprite[CT_TaskRunIndex][10]; //sprite上次位置y
                                            CT_ContainerSprite[CT_TaskRunIndex][2] = spr_lx; //设置sprite位置x为上次位置x
                                            CT_ContainerSprite[CT_TaskRunIndex][3] = spr_ly; //设置sprite位置y为上次位置y
                                            CT_InterfaceRepaint(); //请求重绘
                                            return 1;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }        
        }
        else
        {
            cprint("ERROR 208 : Not is sprite object. ObjectID : "+String(collspr.id));
        }
    }
    return 0;
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
            for(i=0;i<CT_ContainerSpriteIndex;i++) //遍历sprite容器
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
            cprint("ERROR 208 : Not is sprite object. ObjectID : "+String(id));
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
        if(CT_ContainerSprite[si] != null) //如果指定索引的sprite不为空
        {
            CT_ContainerSprite[si] = null; //清空sprite
            CT_TaskDestroy(si); //销毁sprite程序
            CT_InterfaceRepaint(); //请求重绘
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
        if(CT_ContainerSprite[si] != null) //如果指定索引的sprite不为空
        {
            var x = CT_ContainerSprite[si][2]; //sprite位置x
            return x; //返回sprite位置x
        }
        else
        {
            cprint("ERROR 209 : The sprite is null. SpriteIndex : " + String(si));
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
        if(CT_ContainerSprite[si] != null) //如果指定索引的sprite不为空
        {
            var y = CT_ContainerSprite[si][3]; //sprite位置y
            return y; //返回sprite位置y
        }
        else
        {
            cprint("ERROR 209 : The sprite is null. SpriteIndex : " + String(si));
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
        if(CT_ContainerSprite[si] != null) //如果指定索引的sprite不为空
        {
            CT_ContainerSprite[si][2] = x; //设置sprite位置x
            CT_InterfaceRepaint(); //请求重绘
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
        if(CT_ContainerSprite[si] != null) //如果指定索引的sprite不为空
        {
            CT_ContainerSprite[si][3] = y; //设置sprite位置y
            CT_InterfaceRepaint(); //请求重绘
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置索引Sprite子图像
//--------------------------------------------------------------------
function isprite_set_subimg(si,index)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CT_ContainerSprite[si] != null) //如果指定索引的sprite不为空
        {
            var spr_subnum = CT_ContainerSprite[si][6]; //sprite子图像数量
            if(index <= spr_subnum - 1) //如果sprite子图像索引小于sprite子图像数量-1
            {
                CT_ContainerSprite[si][5] = index; //设置sprite子图像索引
                CT_InterfaceRepaint(); //请求重绘
            }
            else
            {
                cprint("ERROR 206 : The sprite subimage index is greater than the number of subimage. SubimageIndex : " + String(index)); //输出错误
            }
        }
        else
        {
            cprint("ERROR 209 : The sprite is null. SpriteIndex : " + String(si));
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
        if(CT_ContainerSprite[si] != null) //如果指定索引的sprite不为空
        {
            CT_TaskSetNum(si,i,n); //sprite程序数字变量赋值
        }
        else
        {
            cprint("ERROR 209 : The sprite is null. SpriteIndex : " + String(si));
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
        if(CT_ContainerSprite[si] != null) //如果指定索引的sprite不为空
        {
            CT_TaskSetStr(si,i,s); //sprite程序字符串变量赋值
        }
        else
        {
            cprint("ERROR 209 : The sprite is null. SpriteIndex : " + String(si));
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
        if(CT_ContainerSprite[si] != null) //如果指定索引的sprite不为空
        {
            var var_n = CT_TaskNum(si,i); //sprite程序数字变量值
            return var_n; //返回sprite程序数字变量值
        }
        else
        {
            cprint("ERROR 209 : The sprite is null. SpriteIndex : " + String(si));
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
        if(CT_ContainerSprite[si] != null) //如果指定索引的sprite不为空
        {
            var var_s = CT_TaskStr(si,i); //sprite程序字符串变量值
            return var_s; //返回sprite程序字符串变量值
        }
        else
        {
            cprint("ERROR 209 : The sprite is null. SpriteIndex : " + String(si));
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
            for(i=0;i<CT_ContainerSpriteIndex;i++) //遍历sprite容器
            {
                if(CT_ContainerSprite[i] != null) //如果当前sprite不为空
                {
                    var spr_id = CT_ContainerSprite[i][0]; //当前sprite id
                    if(spr_id === id) //如果当前sprite id等于sprite id
                    {
                        CT_ContainerSprite[i] = null; //清空当前sprite
                        CT_TaskDestroy(i); //销毁sprite程序
                        CT_InterfaceRepaint(); //请求重绘
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
            for(i=0;i<CT_ContainerSpriteIndex;i++) //遍历sprite容器
            {
                if(CT_ContainerSprite[i] != null) //如果当前sprite不为空
                {
                    var spr_id = CT_ContainerSprite[i][0]; //当前sprite id
                    if(spr_id === id) //如果当前sprite id等于sprite id
                    {
                        CT_ContainerSprite[i][2] = x; //设置当前sprite位置x
                        CT_InterfaceRepaint(); //请求重绘
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
            for(i=0;i<CT_ContainerSpriteIndex;i++) //遍历sprite容器
            {
                if(CT_ContainerSprite[i] != null) //如果当前sprite不为空
                {
                    var spr_id = CT_ContainerSprite[i][0]; //当前sprite id
                    if(spr_id === id) //如果当前sprite id等于sprite id
                    {
                        CT_ContainerSprite[i][3] = y; //设置当前sprite位置y
                        CT_InterfaceRepaint(); //请求重绘
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
            for(i=0;i<CT_ContainerSpriteIndex;i++) //遍历sprite容器
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
                            CT_InterfaceRepaint(); //请求重绘
                        }
                        else
                        {
                           cprint("ERROR 206 : The sprite subimage index is greater than the number of subimage. SubimageIndex : " + String(index)); //输出错误
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
            for(i=0;i<CT_ContainerSpriteIndex;i++) //遍历sprite容器
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
            for(i=0;i<CT_ContainerSpriteIndex;i++) //遍历sprite容器
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
// 设置sprite层
//--------------------------------------------------------------------
function sprite_set_layer(l)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(CT_ContainerSprite[CT_TaskRunIndex] != null) //如果sprite不为空
        {
            CT_ContainerSprite[CT_TaskRunIndex][1] = l; //设置sprite层
            CT_InterfaceRepaint(); //请求重绘
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
        if(CT_ContainerSprite[si] != null) //如果指定索引的sprite不为空
        {
            CT_ContainerSprite[si][1] = l; //设置指定索引sprite层
            CT_InterfaceRepaint(); //请求重绘
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
            for(i=0;i<CT_ContainerSpriteIndex;i++) //遍历sprite容器
            {
                if(CT_ContainerSprite[i] != null) //如果当前sprite不为空
                {
                    var spr_id = CT_ContainerSprite[i][0]; //当前sprite id
                    if(spr_id === id) //如果当前sprite id等于sprite id
                    {
                        CT_ContainerSprite[i][1] = l; //设置当前sprite层
                        CT_InterfaceRepaint(); //请求重绘
                    }
                }
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
        if(CT_ContainerSprite[CT_TaskRunIndex] != null) //如果sprite不为空
        {
            var spr_x = CT_ContainerSprite[CT_TaskRunIndex][2]; //sprite位置x
            var spr_y = CT_ContainerSprite[CT_TaskRunIndex][3]; //sprite位置y
            var spr_l = CT_ContainerSprite[CT_TaskRunIndex][1]; //sprite层
            var spr_collw = CT_ContainerSprite[CT_TaskRunIndex][7]; //sprite碰撞区宽度
            var spr_collh = CT_ContainerSprite[CT_TaskRunIndex][8]; //sprite碰撞区高度
            if(CT_ContainerSprite[si] != null) //如果碰撞的sprite不为空
            {
                var cspr_x = CT_ContainerSprite[si][2]; //碰撞的sprite位置x
                var cspr_y = CT_ContainerSprite[si][3]; //碰撞的sprite位置y
                var cspr_l = CT_ContainerSprite[si][1]; //碰撞的sprite层
                var cspr_collw = CT_ContainerSprite[si][7]; //碰撞的sprite碰撞区宽度
                var cspr_collh = CT_ContainerSprite[si][8]; //碰撞的sprite碰撞区高度
                var cspr_coll_t = CT_ContainerSprite[si][11]; //碰撞的sprite碰撞类型
                var cspr_coll_e = CT_ContainerSprite[si][12]; //碰撞的sprite边缘碰撞
                if(cspr_coll_t === 0) //如果碰撞的sprite碰撞类型是矩形碰撞
                {
                    if(cspr_coll_e === 0) //如果碰撞的sprite不是边缘碰撞
                    {
                        if(spr_l === cspr_l) //如果sprite层等于碰撞的sprite层
                        {
                            if(spr_x + spr_collw > cspr_x && spr_x < cspr_x + cspr_collw && spr_y + spr_collh > cspr_y && spr_y < cspr_y + cspr_collh) //如果sprite图像与碰撞的sprite图像相交
                            {
                                return 1;
                            }
                        }
                    }
                    if(cspr_coll_e === 1) //如果碰撞的sprite是边缘碰撞
                    {
                        if(spr_l === cspr_l) //如果sprite层等于碰撞的sprite层
                        {
                            if(spr_x + spr_collw > cspr_x && spr_x < cspr_x + cspr_collw && spr_y + spr_collh > cspr_y && spr_y < cspr_y + cspr_collh) //如果sprite图像与碰撞的sprite图像相交
                            {
                                var spr_lx = CT_ContainerSprite[CT_TaskRunIndex][9]; //sprite上次位置x
                                var spr_ly = CT_ContainerSprite[CT_TaskRunIndex][10]; //sprite上次位置y
                                CT_ContainerSprite[CT_TaskRunIndex][2] = spr_lx; //设置sprite位置x为上次位置x
                                CT_ContainerSprite[CT_TaskRunIndex][3] = spr_ly; //设置sprite位置y为上次位置y
                                CT_InterfaceRepaint(); //请求重绘
                                return 1;
                            }
                        }
                    }
                }
                if(cspr_coll_t === 1) //如果碰撞的sprite碰撞类型是圆形碰撞
                {
                    var spr_r = parseInt(spr_collw / 2); //sprite半径
                    var spr_cx = spr_x + spr_r; //sprite中心x
                    var spr_cy = spr_y + spr_r; //sprite中心y
                    var cspr_r = parseInt(cspr_collw / 2); //碰撞的sprite半径
                    var cspr_cx = cspr_x + cspr_r; //碰撞的sprite中心x
                    var cspr_cy = cspr_y + cspr_r; //碰撞的sprite中心y
                    var spr_distance = Math.sqrt(Math.pow(spr_cx-cspr_cx,2)+Math.pow(spr_cy-cspr_cy,2)); //sprite与碰撞的sprite的距离
                    if(cspr_coll_e === 0) //如果碰撞的sprite不是边缘碰撞
                    {
                        if(spr_l === cspr_l) //如果sprite层等于碰撞的sprite层
                        {
                            if(spr_distance < spr_r + cspr_r) //如果sprite图像在碰撞的sprite图像半径内
                            {
                                return 1;
                            }
                        }
                    }
                    if(cspr_coll_e === 1) //如果碰撞的sprite是边缘碰撞
                    {
                        if(spr_l === cspr_l) //如果sprite层等于碰撞的sprite层
                        {
                            if(spr_distance < spr_r + cspr_r) //如果sprite图像在碰撞的sprite图像半径内
                            {
                                var spr_lx = CT_ContainerSprite[CT_TaskRunIndex][9]; //sprite上次位置x
                                var spr_ly = CT_ContainerSprite[CT_TaskRunIndex][10]; //sprite上次位置y
                                CT_ContainerSprite[CT_TaskRunIndex][2] = spr_lx; //设置sprite位置x为上次位置x
                                CT_ContainerSprite[CT_TaskRunIndex][3] = spr_ly; //设置sprite位置y为上次位置y
                                CT_InterfaceRepaint(); //请求重绘
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
// sprite检查
//--------------------------------------------------------------------
function isprite_check(x,y,si)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
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
    return 0;
}
//--------------------------------------------------------------------