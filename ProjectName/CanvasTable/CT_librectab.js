"use strict";

//--------------------------------------------------------------------
// 记录打开
//--------------------------------------------------------------------
function rectab_open(name)
{
    if(name.indexOf("/") === -1 && name.indexOf("*") === -1 && name.indexOf(":") === -1 && name.indexOf("?") === -1 && name.indexOf("<") === -1 && name.indexOf(">") === -1 && name.indexOf("|") === -1) //如果记录表名称格式正确
    {
        CT_RectabName = name; //设置记录表名称
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
    CT_RectabName = "default"; //重置记录表名称
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 记录删除
//--------------------------------------------------------------------
function rectab_delete(name)
{
    if(name.indexOf("/") === -1 && name.indexOf("*") === -1 && name.indexOf(":") === -1 && name.indexOf("?") === -1 && name.indexOf("<") === -1 && name.indexOf(">") === -1 && name.indexOf("|") === -1) //如果记录表名称格式正确
    {
        localStorage.setItem(name,""); //删除记录表
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
    var rectab_list = localStorage.getItem(CT_RectabName); //从本地读取记录表
    if(title.indexOf("┘") === -1) //如果参数title没有 "┘"
    {
        if(text.indexOf("┘") === -1)
        {
            if(rectab_list === null) //如果记录表为空
            {
                localStorage.setItem(CT_RectabName,title+"="+text+"┘"); //将记录表写入本地
            }
            else //如果记录表不为空
            {
                var title_pos = rectab_list.indexOf(title); //记录表中标题的位置
                if(title_pos === -1) //如果记录表中没有指定标题
                {
                    var rectab_list = rectab_list + title + "=" + text + "┘"; //在记录表中增加一个新数据
                    localStorage.setItem(CT_RectabName,rectab_list); //将记录表写入本地
                }
                else //如果记录表中有指定标题
                {
                    var title_pos = rectab_list.indexOf(title); //记录表中标题的位置
                    var data_pos = title_pos + title.length + 1; //记录表中数据的位置
                    var rectab_list_l = rectab_list.length; //记录表长度
                    var data_end_pos; //记录表中数据结束符的位置
                    var i = data_pos;
                    while(i <= rectab_list_l) //从数据的位置开始向后查找整个记录表
                    {
                        if(rectab_list[i] === "┘") //如果找到数据结束符
                        {
                            data_end_pos = i; //数据结束符的位置
                            break;
                        }    
                        i += 1;
                    }
                    var replace_data = rectab_list.slice(data_pos,data_end_pos); //将要替换的数据
                    var replace_part = title + "=" + replace_data + "┘"; //将要替换的数据段
                    rectab_list = rectab_list.replace(replace_part,title+"="+text+"┘"); //替换记录表中的数据段
                    localStorage.setItem(CT_RectabName,rectab_list); //将记录表写入本地
                }
            }
        }
        else
        {
            cprint("ERROR 12 : The record table text is error : " + text); //输出错误
        }
    }
    else //如果参数title有 "┘"
    {
        cprint("ERROR 11 : The record table title is error : " + title); //输出错误
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 记录读取
//--------------------------------------------------------------------
function rectab_read(title)
{
    var rectab_list = localStorage.getItem(CT_RectabName); //从本地读取记录表
    if(rectab_list === null) //如果记录表为空
    {
        return ""; //返回空字符
    }
    else //如果记录表不为空
    {
        if(title.indexOf("┘") === -1) //如果参数title没有 "┘"
        {
            var title_pos = rectab_list.indexOf(title); //记录表中标题的位置
            var data_pos = title_pos + title.length + 1; //记录表中数据的位置
            var rectab_list_l = rectab_list.length; //记录表长度
            var data_end_pos; //数据结束符的位置
            var i = data_pos;
            while(i <= rectab_list_l) //从数据的位置开始向后查找整个记录表
            {
                if(rectab_list[i] === "┘") //如果找到数据结束符
                {
                    data_end_pos = i; //数据结束符的位置
                    break;
                }
                i += 1;
            }
            var re = rectab_list.slice(data_pos,data_end_pos); //从记录表中指定数据
            return re; //返回数据
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
    var rectab_list = localStorage.getItem(CT_RectabName); //从本地读取记录表
    if(title.indexOf("┘") === -1) //如果参数title没有 "┘"
    {
        if(rectab_list != null) //如果记录表不为空
        {
            var title_pos = rectab_list.indexOf(title); //记录表中标题的位置
            if(title_pos !== -1) //如果记录表中有指定标题
            {
                var title_pos = rectab_list.indexOf(title); //记录表中标题的位置
                var data_pos = title_pos + title.length + 1; //记录表中数据的位置
                var rectab_list_l = rectab_list.length; //记录表长度
                var data_end_pos; //记录表中数据结束符的位置
                var i = data_pos;
                while(i <= rectab_list_l) //从数据的位置开始向后查找整个记录表
                {
                    if(rectab_list[i] === "┘") //如果找到数据结束符
                    {
                        data_end_pos = i; //数据结束符的位置
                        break;
                    }
                    i += 1;
                }
                var delete_data = rectab_list.slice(title_pos,data_end_pos+1); //将要删除的数据
                rectab_list = rectab_list.replace(delete_data,""); //替换记录表中的数据段
                localStorage.setItem(CT_RectabName,rectab_list); //将记录表写入本地
            }
        }
    }
    else //如果参数title有 "┘"
    {
        cprint("ERROR 11 : The record table title is error : " + title); //输出错误
    }
}
//--------------------------------------------------------------------