"use strict";

//--------------------------------------------------------------------
// 记录打开
//--------------------------------------------------------------------
function rectab_open(name)
{
    if(name !== "") //如果记录表名称不为空
    {
        if(name.indexOf("/") === -1 && name.indexOf("*") === -1 && name.indexOf(":") === -1 && name.indexOf("?") === -1 && name.indexOf("<") === -1 && name.indexOf(">") === -1 && name.indexOf("|") === -1) //如果记录表名称格式正确
        {
            if(CT_RectabName === "") //如果没有打开记录表
            {
                CT_RectabData = localStorage.getItem(name); //从本地读取记录表;
                CT_RectabName = name; //记录表名称
            }
            else
            {
                cprint("ERROR 22 : The record table is opened : " + CT_RectabName); //输出错误
            }
        }
        else
        {
            cprint("ERROR 10 : The record table name is error : " + name); //输出错误
        }
    }
    else
    {
        cprint("ERROR 10 : The record table name is error : " + name); //输出错误
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 记录关闭
//--------------------------------------------------------------------
function rectab_close()
{
    CT_RectabData = ""; //清除记录表数据
    CT_RectabName = ""; //清除记录表名称
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 记录删除
//--------------------------------------------------------------------
function rectab_delete(name)
{
    if(name !== "") //如果记录表名称不为空
    {
        if(name.indexOf("/") === -1 && name.indexOf("*") === -1 && name.indexOf(":") === -1 && name.indexOf("?") === -1 && name.indexOf("<") === -1 && name.indexOf(">") === -1 && name.indexOf("|") === -1) //如果记录表名称格式正确
        {
            if(CT_RectabName !== name) //如果当前打开的记录表不是要删除的记录表
            {
                localStorage.setItem(name,""); //删除记录表
            }
            else
            {
                cprint("ERROR 22 : The record table is opened : " + name); //输出错误
            }
        }
        else
        {
            cprint("ERROR 10 : The record table name is error : " + name); //输出错误
        }
    }
    else
    {
        cprint("ERROR 10 : The record table name is error : " + name); //输出错误
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 记录写入
//--------------------------------------------------------------------
function rectab_write(title,text)
{
    if(title !== "" && text !== "") //如果记录表标题和记录表数据不为空
    {
        if(title.indexOf("&") === -1 && title.indexOf("=") === -1) //如果参数title没有 "&" 和 "="
        {
            if(text.indexOf("&") === -1 && title.indexOf("=") === -1) //如果参数text没有 "&" 和 "="
            {
                if(CT_RectabData === null || CT_RectabData === "") //如果记录表为空
                {
                    CT_RectabData = title + "=" + text + "&"; //在记录表中增加一个新数据
                }
                else //如果记录表不为空
                {
                    var title_pos = CT_RectabData.indexOf(title+"="); //记录表中标题的位置
                    if(title_pos === -1) //如果记录表中没有指定标题
                    {
                        CT_RectabData += title + "=" + text + "&"; //在记录表中增加一个新数据
                    }
                    else //如果记录表中有指定标题
                    {
                        var data_pos = title_pos + title.length + 1; //记录表中数据的位置
                        var rectab_l = CT_RectabData.length; //记录表长度
                        var data_end_pos = 0; //记录表中数据结束符的位置
                        var i = data_pos;
                        while(i <= rectab_l) //从数据的位置开始向后查找整个记录表
                        {
                            if(CT_RectabData[i] === "&") //如果找到数据结束符
                            {
                                data_end_pos = i; //数据结束符的位置
                                break;
                            }
                            i += 1;
                        }
                        var replace_data = CT_RectabData.slice(data_pos,data_end_pos); //将要替换的数据
                        var replace_part = title + "=" + replace_data + "&"; //将要替换的数据段
                        CT_RectabData = CT_RectabData.replace(replace_part,title+"="+text+"&"); //替换记录表中的数据段
                    }
                }
            }
            else
            {
                cprint("ERROR 12 : The record table text is error : " + text); //输出错误
            }
        }
        else //如果参数title有 "&"
        {
            cprint("ERROR 11 : The record table title is error : " + title); //输出错误
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 记录读取
//--------------------------------------------------------------------
function rectab_read(title)
{
    if(title !== "") //如果记录表标题不为空
    {
        if(title.indexOf("&") === -1 && title.indexOf("=") === -1) //如果参数title没有 "&" 和 "="
        {
            if(CT_RectabData !== null && CT_RectabData !== "") //如果记录表不为空
            {
                var title_pos = CT_RectabData.indexOf(title+"="); //记录表中标题的位置
                if(title_pos !== -1) //如果记录表中有标题
                {
                    var data_pos = title_pos + title.length + 1; //记录表中数据的位置
                    var rectab_list_l = CT_RectabData.length; //记录表长度
                    var data_end_pos = 0; //数据结束符的位置
                    var i = data_pos;
                    while(i <= rectab_list_l) //从数据的位置开始向后查找整个记录表
                    {
                       if(CT_RectabData[i] === "&") //如果找到数据结束符
                       {
                           data_end_pos = i; //数据结束符的位置
                           break;
                       }
                       i += 1;
                    }
                    var re = CT_RectabData.slice(data_pos,data_end_pos); //从记录表中指定数据
                    return re; //返回数据
                }
            }
        }
        else
        {
            cprint("ERROR 11 : The record table title is error : " + title); //输出错误
        }
    }
    return "";
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 清除指定标题的数据
//--------------------------------------------------------------------
function rectab_null(title)
{
    if(title !== "") //如果记录表标题不为空
    {
        if(title.indexOf("&") === -1 && title.indexOf("=") === -1) //如果参数title没有 "&" 和 "="
        {
            if(CT_RectabData !== null && CT_RectabData !== "") //如果记录表不为空
            {
                var title_pos = CT_RectabData.indexOf(title+"="); //记录表中标题的位置
                if(title_pos !== -1) //如果记录表中有指定标题
                {
                    var data_pos = title_pos + title.length + 1; //记录表中数据的位置
                    var rectab_l = CT_RectabData.length; //记录表长度
                    var data_end_pos; //记录表中数据结束符的位置
                    var i = data_pos;
                    while(i <= rectab_l) //从数据的位置开始向后查找整个记录表
                    {
                        if(CT_RectabData[i] === "&") //如果找到数据结束符
                        {
                            data_end_pos = i; //数据结束符的位置
                            break;
                        }
                        i += 1;
                    }
                    var delete_data = CT_RectabData.slice(title_pos,data_end_pos+1); //将要删除的数据
                    CT_RectabData = CT_RectabData.replace(delete_data,""); //替换记录表中的数据段
                }
            }
        }
        else //如果参数title有 "&" 和 "="
        {
            cprint("ERROR 11 : The record table title is error : " + title); //输出错误
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 保存记录表
//--------------------------------------------------------------------
function rectab_save()
{
    if(CT_RectabName !== "") //如果打开了记录表
    {
        localStorage.setItem(CT_RectabName,CT_RectabData); //保存当前记录表
    }
}
//--------------------------------------------------------------------