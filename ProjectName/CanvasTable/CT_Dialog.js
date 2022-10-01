"use strict";

var CT_dialog; //对话框

//--------------------------------------------------------------------
// 创建对话框
//--------------------------------------------------------------------
function CT_DialogCreate(val,name,max,pass,numb)
{
    if(CT_DialogShow === 0) //如果对话框没有显示
    {
        //div
        CT_dialog = document.createElement("div");
        CT_dialog.style.position = "absolute";
        CT_dialog.style.width = "50%";
        CT_dialog.style.height = "150px";
        CT_dialog.style.left = "0px";
        CT_dialog.style.right = "0px";
        CT_dialog.style.top = "20%";
        CT_dialog.style.margin = "auto";
        CT_dialog.style.backgroundColor = "#ece9d8";
        CT_dialog.style.border = "solid";
        CT_dialog.style.borderColor = "#aca899";
        CT_dialog.align = "center";
        document.body.appendChild(CT_dialog);
        //标题
        var title = document.createElement("p");
        title.textContent = name;
        title.style.font = "16px Arial";
        CT_dialog.appendChild(title);
        //文本框
        var textbox = document.createElement("input");
        if(pass === 1)
        {
            textbox.type = "password";
        }
        else
        {
            textbox.type = "text";
        }
        textbox.style.width = "90%";
        textbox.style.font = "16px Arial";
        textbox.value = val;
        textbox.maxLength = max;
        textbox.oninput = function() //文本框输入
        {
            if(numb === 1) //如果是数字文本框
            {
                var diabox_l = textbox.value.length; //文本框当前字符数
                var char = textbox.value[diabox_l-1]; //文本框当前输入的字符
                if(char !== "0" && char !== "1" && char !== "2" && char !== "3" && char !== "4" && char !== "5" && char !== "6" && char !== "7" && char !== "8" && char !== "9") //如果当前输入的字符不是数字
                {
                    var new_str = textbox.value.slice(0,diabox_l-2); //复制文本框前面所有的字符
                    textbox.value = new_str;
                }
            }
        };
        CT_dialog.appendChild(textbox);
        //分隔
        var div_compart = document.createElement("div");
        div_compart.style.height = "20px";
        CT_dialog.appendChild(div_compart);
        //确定按钮
        var button = document.createElement("input");
        button.type = "button";
        button.style.width = "30%";
        button.style.font = "22px Arial";
        button.value = "✔";
        CT_dialog.appendChild(button);
        button.onclick = function() //按钮点击
        {
            CT_DialogReturn(textbox.value); //返回对话框
        };
        CT_DialogShow = 1;
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 销毁对话框
//--------------------------------------------------------------------
function CT_DialogDestroy()
{
    if(CT_DialogShow === 1) //如果对话框显示
    {
        document.body.removeChild(CT_dialog); //移除对话框
        CT_dialog = null; //销毁对话框
        CT_DialogShow = 0; //对话框不显示
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 对话框返回
//--------------------------------------------------------------------
function CT_DialogReturn(val)
{
    if(CT_ContainerUI[CT_Dialog_Index] != null) //如果对话框对应文本框的窗口不为空
    {
        CT_ContainerUI[CT_Dialog_Index][14] = val; //将对话框输入的内容返回给文本框
    }
    CT_DialogDestroy(); //销毁对话框
    CT_InterfaceRepaint(); //请求重绘
}
//--------------------------------------------------------------------