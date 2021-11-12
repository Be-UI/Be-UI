/*
* @be-message-service.tsx
* @deprecated 
* @author czh
* @update (czh 2021/11/12)
*/
import {IMessage, IMsgInst} from "./be-message-type";
import {BeNotify} from "../../notification/src/be-notification-service";
import {INotfiyInst} from "../../notification/src/be-notification-type";
const notifyDict = {}
const createMessage = function (options:IMessage) :IMsgInst {
    let optionInner = {
        titles:'Notification',
        bodyRender:()=>{
            return <p style="font-size:14px;font-weight:400;font-family: Microsoft YaHei;letter-spacing: 2px;">
                        您的体验时间仅剩
                   </p>
        },
        msgType:'info',
        onClick:()=>console.log('click'),
        onClose:()=>console.log('close'),
        offsetBottom:10,
        placement:'bottomRight',
        duration:0,
        key:'1',
    }
    let notifyInst:INotfiyInst = BeNotify(optionInner)
    return {
        message:notifyInst.notify,
        close:notifyInst.close
    }
}
export const BeMessage = (options:IMessage):object =>{
    return createMessage(options)
};