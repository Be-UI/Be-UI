/*
* @be-message-service.tsx
* @deprecated 
* @author czh
* @update (czh 2021/11/12)
*/
import {IMessage, IMsgInst} from "./be-message-type";
import {BeNotify} from "../../notification/src/be-notification-service";
import {INotfiyInst} from "../../notification/src/be-notification-type";
const createMessage = function (options:IMessage) :IMsgInst {
    let option:IMessage = {
        titles:options.titles || 'message',
        msgType:options.msgType || 'info',
        offsetTop: options.offsetTop,
        close:(options.close) || false,
        placement:'topCenter',
        compType:'message',
        customClass: options.customClass,
        duration: options.duration,
        key: options.key,
        onClose: options.onClose,
        iconPreRender: options.iconPreRender,
        closeRender:options.closeRender,
    }
    let notifyInst:INotfiyInst = BeNotify(option)
    return {
        message:notifyInst.notify,
        close:notifyInst.close
    }
}
export const BeMessage = (options:IMessage):object =>{
    return createMessage(options)
};