﻿"use strict";

//--------------------------------------------------------------------
// 读取文本数据
//--------------------------------------------------------------------
function textdata_read(t)
{
    if(t !== -1) //如果资源不为空
    {
        var res_type = CT_ResourceList[t][1]; //资源类型
        if(res_type === 2) //如果资源是文本
        {
            return CT_ContainerResource[t]; //返回文本数据
        }
        else //如果资源不是文本
        {
            cprint("ERROR 21 : The resource index corresponding to the resource file is not a text. ResIndex : " + String(t));
        }
    }
    return "";
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 获取文本数据行数
//--------------------------------------------------------------------
function textdata_line(t)
{
    if(t !== -1) //如果资源不为空
    {
        var res_type = CT_ResourceList[t][1]; //资源类型
        if(res_type === 2) //如果资源是文本
        {
            var line = 1;
            var text_l = CT_ContainerResource[t].length;
            var char_c = "";
            var char_i = 0;
            if(text_l === 0)
            {
                return 0;
            }
            while(char_i < text_l)
            {
                char_c = CT_ContainerResource[t][char_i];
                if(char_c === "\n")
                {
                    line ++;
                }
                char_i ++;
            }
            return line;
        }
        else //如果资源不是文本
        {
            cprint("ERROR 21 : The resource index corresponding to the resource file is not a text. ResIndex : " + String(t));
        }
    }
    return 0;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 读取文本数据指定行
//--------------------------------------------------------------------
function textdata_read_line(t,l)
{
    if(t !== -1) //如果资源不为空
    {
        var res_type = CT_ResourceList[t][1]; //资源类型
        if(res_type === 2) //如果资源是文本
        {
            var text_len = CT_ContainerResource[t].length; //文本数据长度
            if(text_len === 0)
            {
                return "";
            }
            var line = 1;
            var char_i = 0;
            var char_ls = 0;
            var char_le = 0;
            var char_c = "";
            var text_slice = "";
            while(char_i < text_len)
            {
                char_c = CT_ContainerResource[t][char_i];
                if(char_c === "\n")
                {
                    char_le = char_i;
                    if(line === l)
                    {
                        text_slice = CT_ContainerResource[t].slice(char_ls,char_le);
                        return text_slice;
                    }
                    line ++;
                    char_ls = char_i + 1;
                }
                if(char_i === text_len - 1)
                {
                    char_le = text_len;
                    text_slice = CT_ContainerResource[t].slice(char_ls,char_le);
                    return text_slice;
                }
                char_i ++;
            }
            if(line === 1)
            {
                text_slice = CT_ContainerResource[t].slice(char_ls,char_le);
                return text_slice;
            }
        }
        else //如果资源不是文本
        {
            cprint("ERROR 21 : The resource index corresponding to the resource file is not a text. ResIndex : " + String(t));
        }
    }
    return "";
}
//--------------------------------------------------------------------