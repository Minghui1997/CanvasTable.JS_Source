"use strict";

//--------------------------------------------------------------------
// 图像字体对象
//--------------------------------------------------------------------
function CTimgfont()
{
    this.FontImg = 0; //字体图像
    this.CharNumber = 0; //字体字符数量
    this.CharGap = 1; //字体字符间隙
    this.CharHeight = 0; //字体字符高度
    this.CharList = null; //字体字符列表
    this.GlyphList = null; //字体字形列表
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 获取图像字符串宽度
//--------------------------------------------------------------------
function istring_pxwidth(font,str)
{
    var is_w = 0; //图像字符串宽度
    if(font != null) //如果不是默认字体
    {
        var font_charnum = font.CharNumber; //字体字符数量
        var font_chargap = font.CharGap; //字体字符间隙
        var font_charlist = font.CharList; //字体字符列表
        var font_glyphlist = font.GlyphList; //字体字形列表
        is_w = CT_ImgStringMeasure(font_charnum,font_chargap,font_charlist,font_glyphlist,str); //测量图像字符串宽度
        return is_w;
    }
    return 0;
}
//--------------------------------------------------------------------