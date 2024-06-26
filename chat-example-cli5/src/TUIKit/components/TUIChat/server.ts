import TUICore, { TUIConstants } from '@tencentcloud/tui-core';
import {
  IMessageModel,
  TUIStore,
  StoreName,
  TUIChatService,
} from '@tencentcloud/chat-uikit-engine';
import TUIChatConfig from './config';

export default class TUIChatServer {
  public currentConversationID: string = '';
  public currentMessageList: IMessageModel[] = [];

  constructor() {
    // register service
    TUICore.registerService(TUIConstants.TUIChat.SERVICE.NAME, this);
    // watch current conversationID
    TUIStore.watch(StoreName.CONV, {
      currentConversationID: (id: string) => {
        this.currentConversationID = id;
      },
    });
    // watch current conversation message list
    TUIStore.watch(StoreName.CHAT, {
      messageList: (list: IMessageModel[]) => {
        this.currentMessageList = list;
      },
    });
  }

  public onCall(method: string, params: any, callback: any): any {
    let message;
    switch (method) {
      case TUIConstants.TUIChat.SERVICE.METHOD.UPDATE_MESSAGE_LIST:
        message = params.message;
        // 两种上屏情况
        // 1. 如果 call 消息 conversationID 为 currentConversation,
        //    需要借助 UPDATE_MESSAGE_LIST 更新 engine 中 TUIStore 的 messageList 进行上屏
        //    （因为此时无法获得自己发送的消息）
        // 2. 如果 call 消息 conversationID 不是 currentConversation,
        //    下次切换到 call 消息所在会话时， getMessageList 可以获得 所有自己发送的 call 消息
        //    无需此处处理
        if (message?.conversationID === this.currentConversationID) {
          const messageList = [...this.currentMessageList, message];
          TUIStore.update(StoreName.CHAT, 'messageList', messageList);
        }
        break;
      case TUIConstants.TUIChat.SERVICE.METHOD.SEND_CUSTOM_MESSAGE:
        TUIChatService.sendCustomMessage(params).then((res: any) => {
          callback && callback(res);
        });
        break;
      case TUIConstants.TUIChat.SERVICE.METHOD.SEND_TEXT_MESSAGE:
        TUIChatService.sendTextMessage(params).then((res: any) => {
          callback && callback(res);
        });
        break;
      case TUIConstants.TUIChat.SERVICE.METHOD.SET_CHAT_TYPE:
        TUIChatConfig.setChatType(params?.chatType);
        break;
      case TUIConstants.TUIChat.SERVICE.METHOD.CLOSE_MESSAGE_POP_MENU:
        TUIStore.update(StoreName.CUSTOM, 'isShowMessagePopMenu', false);
        break;
      default:
        break;
    }
  }
}
