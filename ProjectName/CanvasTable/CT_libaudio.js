"use strict";

//--------------------------------------------------------------------
// 播放音频
//--------------------------------------------------------------------
function audio_play(a,l)
{
    if(a !== -1) //如果资源不为空
    {
        var res_type = CT_ResourceList[a][1]; //资源类型
        if(res_type === 1) //如果资源类型是音频
        {
            CT_ContainerResource[a].play(); //播放资源容器中指定的音频
            CT_ContainerResource[a].currentTime = 0; //音频位置0
            CT_ContainerResource[a].loop = l; //设置播放循环
    	}
        else //如果资源类型不是音频
        {
            cprint("ERROR 5 : The resource index corresponding to the resource file is not a audio. ResIndex : " + String(a));
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 停止播放音频
//--------------------------------------------------------------------
function audio_stop(a)
{
    if(a !== -1) //如果资源不为空
    {
        var res_type = CT_ResourceList[a][1]; //资源类型
        if(res_type === 1) //如果资源类型是音频
        {
            CT_ContainerResource[a].pause(); //停止播放资源容器中指定的音频
    	}
        else //如果资源类型不是音频
        {
            cprint("ERROR 5 : The resource index corresponding to the resource file is not a audio. ResIndex : " + String(a));
        }
    }

}
//--------------------------------------------------------------------