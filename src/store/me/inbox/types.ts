import { Moment } from 'moment';
import * as _ from 'lodash';

export interface Message {
  senderId: number;
  createdAt: Moment;
  message: string;
  displaySide?: 'right' | 'left';
}

interface ConversationBase {
  id: number;
  expandedRecipients: User[];
}

export interface ConversationPreview extends ConversationBase {
  lastMessagePreview: string;
}

export class Conversation implements ConversationBase {
  id!: number;
  expandedRecipients!: User[];
  displayedMessages!: Message[];

  constructor(conversation: {id: number, expandedRecipients: User[], displayedMessages: Message[]}) {
      this.id = conversation.id;
      this.expandedRecipients = conversation.expandedRecipients;
      this.displayedMessages = conversation.displayedMessages;
  }

  getRecipient(recipientId: number) {
    return _.find(this.expandedRecipients, (recipient) => {
      return recipient.id === recipientId;
    });
  }
}

export interface User {
  id: number;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  mood: string;
  position: string;
}

export interface MeInboxState {
  conversationPreviews: ConversationPreview[];
  currentConversation?: Conversation;
  fetching: boolean;
}
