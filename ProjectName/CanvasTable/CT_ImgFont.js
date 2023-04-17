"use strict";

//--------------------------------------------------------------------
// 绘制图像字符串(离屏)
//--------------------------------------------------------------------
function CT_OffCanvas_ImgString(x,y,a,str,font_img,font_number,font_gap,font_charlist,font_glyphlist)
{
    var _char = ""; //当前字符
    var list_char = ""; //列表当前字符
    var str_l = str.length; //字符串长度
    var offset = 1; //字符串偏移量
    var str_i = 0; //字符串索引
    var cx = x; //字符绘制位置x
    while(str_i < str_l) //遍历字符串
    {
        var find_char = 0; //找到字符
        var tree_l = font_number; //树长度
        var tree_li = 0; //树的左节点索引
        var tree_le = parseInt(tree_l / 2 - 1); //树的左节点长度
        var tree_ri = tree_le + 1; //树的右节点索引
        var tree_re = tree_l - 1; //树的右节点索引
        var tree_end = 0; //搜索树结束
        _char = str[str_i]; //当前字符
        while(tree_end < 2) //如果搜索树没有结束
        {
            if(font_charlist[tree_li] === _char) //如果在树的左节点中找到当前字符
            {
                var gx = font_glyphlist[tree_li][0]; //字形位置x
                var gy = font_glyphlist[tree_li][1]; //字形位置y
                var gw = font_glyphlist[tree_li][2]; //字形高度
                var gh = font_glyphlist[tree_li][3]; //字形宽度
                CT_OffCanvas_Glyph(cx,y,font_img,gx,gy,gw,gh,a); //绘制字形
                cx += gw + font_gap; //绘制下一个字符的位置
                find_char = 1; //已找到字符
                break; //中断
            }
            if(font_charlist[tree_ri] === _char) //如果在树的右节点中找到当前字符
            {
                var gx = font_glyphlist[tree_ri][0]; //字形位置x
                var gy = font_glyphlist[tree_ri][1]; //字形位置y
                var gw = font_glyphlist[tree_ri][2]; //字形高度
                var gh = font_glyphlist[tree_ri][3]; //字形宽度
                CT_OffCanvas_Glyph(cx,y,font_img,gx,gy,gw,gh,a); //绘制字形
                cx += gw + font_gap; //绘制下一个字符的位置
                find_char = 1; //已找到字符
                break; //中断
            }
            if(tree_li < tree_le) //如果树的左节点索引小于树的左节点长度
            {
                tree_li ++; //树的左节点索引+1
            }
            else
            {
                tree_end ++;
            }
            if(tree_ri < tree_re) //如果树的右节点索引小于树的右节点长度
            {
                tree_ri ++; //树的右节点索引+1
            }
            else
            {
                tree_end ++;
            }
        }
        str_i += offset; //字符串偏移到下一个字符
        _char = ""; //清除当前字符
        if(find_char === 0) //如果没有找到字符
        {
            cprint("ERROR : Not find char in charlist.");
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制字形(离屏)
//--------------------------------------------------------------------
function CT_OffCanvas_Glyph(x,y,i,ix,iy,iw,ih,a)
{
    CT_OCtx.globalAlpha = a / 255; //设置全局透明度
    CT_OCtx.drawImage(CT_ContainerResource[i],ix,iy,iw,ih,x,y,iw,ih); //将字形绘制到离屏画布
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 测量图像字符串宽度
//--------------------------------------------------------------------
function CT_ImgStringMeasure(font_number,font_gap,font_charlist,font_glyphlist,str)
{
    var _char = ""; //当前字符
    var list_char = ""; //列表当前字符
    var str_l = str.length; //字符串长度
    var offset = 1; //字符串偏移量
    var str_i = 0; //字符串索引
    var gw = 0; //字形宽度
    var imgstr_w = 0;
    if(str_l === 0) //如果字符串长度为0
    {
        return 0;
    }
    while(str_i < str_l) //遍历字符串
    {
        _char = str[str_i]; //当前字符
        var tree_l = font_number; //树长度
        var tree_li = 0; //树的左节点索引
        var tree_le = parseInt(tree_l / 2 - 1); //树的左节点长度
        var tree_ri = tree_le + 1; //树的右节点索引
        var tree_re = tree_l - 1; //树的右节点索引
        var tree_end = 0; //搜索树结束
        while(tree_end < 2) //如果搜索树结束
        {
            if(font_charlist[tree_li] === _char) //如果在树的左节点中找到当前字符
            {
                gw = font_glyphlist[tree_li][2]; //字形宽度
                imgstr_w += gw + font_gap; //字符串宽度增加一个字符的宽度
                break; //中断
            }
            if(font_charlist[tree_ri] === _char) //如果在树的右节点中找到当前字符
            {
                gw = font_glyphlist[tree_ri][2]; //字形宽度
                imgstr_w += gw + font_gap; //字符串宽度增加一个字符的宽度
                break; //中断
            }
            if(tree_li < tree_le) //如果树的左节点索引小于树的左节点长度
            {
                tree_li ++; //树的左节点索引+1
            }
            else
            {
                tree_end ++;
            }
            if(tree_ri < tree_re) //如果树的右节点索引小于树的右节点长度
            {
                tree_ri ++; //树的右节点索引+1
            }
            else
            {
                tree_end ++;
            }
        }
        str_i += offset; //字符串偏移到下一个字符
        _char = ""; //清除当前字体
    }
    if(imgstr_w > 1) //如果图像字符串宽度大于1
    {
        imgstr_w -= font_gap; //图像字符串-字体间隙
    }
    return imgstr_w;
}
//--------------------------------------------------------------------