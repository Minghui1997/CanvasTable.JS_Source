"use strict";

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
            cprint("ERROR 21 : The resource index corresponding to the resource file is not a text.");
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
            var line = 1; //文本行
            var text_l = CT_ContainerResource[t].length; //获取文本长度
            var char_c = ""; //当前字符
            var char_i = 0; //字符索引
            if(text_l === 0) //如果文本长度为0
            {
                return 0;
            }
            while(char_i < text_l) //当字符索引小于文本长度
            {
                char_c = CT_ContainerResource[t][char_i]; //获取当前字符
                if(char_c === "\n") //如果当前字符是换行符
                {
                    line ++; //文本行 +1
                }
                char_i ++; //字符索引 +1
            }
            return line;
        }
        else //如果资源不是文本
        {
            cprint("ERROR 21 : The resource index corresponding to the resource file is not a text.");
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
            if(text_len === 0) //如果文本数据长度为0
            {
                return ""; //返回
            }
            var line = 1; //文本行
            var char_i = 0; //字符索引
            var char_ls = 0; //文本行开始的索引
            var char_le = 0; //文本行结束的索引
            var char_c = ""; //当前字符
            var text_slice = ""; //文本片段
            while(char_i < text_len) //当字符索引小于文本长度
            {
                char_c = CT_ContainerResource[t][char_i]; //获取当前字符
                if(char_c === "\n") //如果当前字符是换行符
                {
                    char_le = char_i; //文本行结束的索引等于当前字符索引
                    if(line === l) //如果当前文本行等于文本行(参数)
                    {
                        text_slice = CT_ContainerResource[t].slice(char_ls,char_le); //获取文本数据当前行的文本
                        return text_slice;
                    }
                    line ++; //文本行 +1
                    char_ls = char_i + 1; //文本行开始的索引等于当前字符索引+1
                }
                if(char_i === text_len - 1) //如果当前字符索引是最后一个字符
                {
                    char_le = text_len; //文本行结束的索引为最后一个字符
                    text_slice = CT_ContainerResource[t].slice(char_ls,char_le); //获取文本数据当前行的文本
                    return text_slice;
                }
                char_i ++; //字符索引 +1
            }
            if(line === 1) //如果文本数据只有1行文本
            {
                text_slice = CT_ContainerResource[t].slice(char_ls,char_le); //获取文本数据当前行的文本
                return text_slice;
            }
        }
        else //如果资源不是文本
        {
            cprint("ERROR 21 : The resource index corresponding to the resource file is not a text.");
        }
    }
    return "";
}
//--------------------------------------------------------------------