import { Moment } from 'moment';
import find from 'lodash/find';

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
  public id!: number;
  public expandedRecipients!: User[];
  public displayedMessages!: Message[];

  constructor(conversation: {
    id: number;
    expandedRecipients: User[];
    displayedMessages: Message[];
  }) {
    this.id = conversation.id;
    this.expandedRecipients = conversation.expandedRecipients;
    this.displayedMessages = conversation.displayedMessages;
  }

  public getRecipient(recipientId: number) {
    return find(this.expandedRecipients, (recipient) => {
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
