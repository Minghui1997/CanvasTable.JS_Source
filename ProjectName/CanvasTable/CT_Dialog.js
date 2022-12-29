"use strict";

var CT_dialog; //对话框
var CT_dialogBack; //对话框背景
var CT_dialogTitle;
var CT_dialogTextbox;
var CT_dialogButton;
//--------------------------------------------------------------------
// 创建对话框
//--------------------------------------------------------------------
function CT_DialogCreate(val,name,max,pass,numb)
{
    var font_s = parseInt(CT_ClientH * 0.5 * 0.1);
    if(CT_DialogShow === 0) //如果对话框没有显示
    {
        CT_dialogBack = document.createElement("div");
        CT_dialogBack.style.position = "absolute";
        CT_dialogBack.style.width = "100%";
        CT_dialogBack.style.height = "100%";
        CT_dialogBack.style.left = "0%";
        CT_dialogBack.style.top = "0%";
        CT_dialogBack.style.backgroundColor = "#d0cfcb7f";
        document.body.appendChild(CT_dialogBack);
        //对话框
        CT_dialog = document.createElement("div");
        CT_dialog.style.position = "absolute";
        CT_dialog.style.width = "80%";
        CT_dialog.style.height = "50%";
        CT_dialog.style.left = "10%";
        CT_dialog.style.top = "25%";
        CT_dialog.style.backgroundColor = "#ece9d8";
        CT_dialog.style.border = "solid";
        CT_dialog.style.borderColor = "#aca899";
        CT_dialogBack.appendChild(CT_dialog);
        //标题
        CT_dialogTitle = document.createElement("div");
        CT_dialogTitle.textContent = name;
        CT_dialogTitle.style.position = "absolute";
        CT_dialogTitle.style.left = "10%";
        CT_dialogTitle.style.top = "5%";
        CT_dialogTitle.style.font = String(font_s) + "px Arial";
        CT_dialog.appendChild(CT_dialogTitle);
        //文本框
        CT_dialogTextbox = document.createElement("input");
        CT_dialogTextbox.style.position = "absolute";
        CT_dialogTextbox.style.left = "10%";
        CT_dialogTextbox.style.top = "25%";
        CT_dialogTextbox.style.width = "80%";
        CT_dialogTextbox.style.height = "15%";
        CT_dialogTextbox.style.font = String(font_s) + "px Arial";
        CT_dialogTextbox.type = "text";
        if(pass === 1)
        {
            CT_dialogTextbox.type = "password";
        }
        if(numb === 1)
        {
            CT_dialogTextbox.type = "number";
        }
        CT_dialogTextbox.value = val;
        CT_dialogTextbox.maxLength = max;
        CT_dialog.appendChild(CT_dialogTextbox);
        //确定按钮
        CT_dialogButton = document.createElement("input");
        CT_dialogButton.type = "button";
        CT_dialogButton.style.position = "absolute";
        CT_dialogButton.style.left = "35%";
        CT_dialogButton.style.top = "50%";
        CT_dialogButton.style.width = "30%";
        CT_dialogButton.style.height = "20%";
        CT_dialogButton.style.font = String(font_s) + "px Arial";
        CT_dialogButton.value = "✔";
        CT_dialog.appendChild(CT_dialogButton);
        CT_dialogButton.onclick = function() //按钮点击
        {
            CT_DialogReturn(); //返回对话框
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
        document.body.removeChild(CT_dialogBack); //移除对话框
        CT_dialog = null; //销毁对话框
        CT_DialogShow = 0; //对话框不显示
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 对话框返回
//--------------------------------------------------------------------
function CT_DialogReturn()
{
    if(CT_ContainerUI[CT_Dialog_Index] != null) //如果对话框对应文本框的窗口不为空
    {
        CT_ContainerUI[CT_Dialog_Index][14] = CT_dialogTextbox.value; //将对话框输入的内容返回给文本框
    }
    CT_DialogDestroy(); //销毁对话框
    CT_Repaint = 1; //请求重绘
}
//--------------------------------------------------------------------