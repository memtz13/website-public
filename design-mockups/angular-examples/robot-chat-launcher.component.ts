import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { KENDO_BUTTONS } from "@progress/kendo-angular-buttons";
import { KENDO_CONVERSATIONAL_UI, Message, User } from "@progress/kendo-angular-conversational-ui";
import { SVGIcon } from "@progress/kendo-svg-icons";

// Custom robot icon — Kendo's built-in icon set has no "robot" glyph,
// so we hand it a plain SVGIcon (name + content + viewBox).
const robotIcon: SVGIcon = {
  name: "robot",
  viewBox: "0 0 24 24",
  content: `
    <rect x="6" y="9" width="12" height="10" rx="3" fill="currentColor"/>
    <rect x="10.25" y="3" width="1.5" height="4" fill="currentColor"/>
    <circle cx="11" cy="2.5" r="1.5" fill="currentColor"/>
    <circle cx="9.5" cy="13.5" r="1.5" fill="#fff"/>
    <circle cx="14.5" cy="13.5" r="1.5" fill="#fff"/>
    <rect x="9" y="16.5" width="6" height="1.4" rx="0.7" fill="#fff"/>
    <rect x="3" y="12" width="2" height="4" rx="1" fill="currentColor"/>
    <rect x="19" y="12" width="2" height="4" rx="1" fill="currentColor"/>
  `,
};

const chatUser: User = { id: 1 };
const botUser: User = { id: 0 };

@Component({
  standalone: true,
  selector: "robot-chat-launcher",
  imports: [CommonModule, KENDO_BUTTONS, KENDO_CONVERSATIONAL_UI],
  template: `
    <!-- Chat window: only rendered once the launcher has been opened -->
    <div class="chat-panel" *ngIf="chatOpen">
      <div class="chat-panel-header">
        <span>Assistant</span>
        <button kendoButton fillMode="flat" size="small" (click)="toggleChat()" aria-label="Close chat">
          &times;
        </button>
      </div>
      <kendo-chat
        [messages]="messages"
        [user]="chatUser"
        (sendMessage)="onSendMessage($event)"
      ></kendo-chat>
    </div>

    <!-- Robot launcher: floating action button, fixed bottom-right -->
    <kendo-floatingactionbutton
      class="chat-launcher"
      [svgIcon]="robotIcon"
      themeColor="primary"
      shape="pill"
      size="large"
      positionMode="fixed"
      [align]="{ horizontal: 'end', vertical: 'bottom' }"
      [attr.aria-label]="chatOpen ? 'Close chat' : 'Open chat'"
      (click)="toggleChat()"
    ></kendo-floatingactionbutton>
  `,
  styles: [
    `
      .chat-launcher {
        z-index: 1001;
      }

      .chat-panel {
        position: fixed;
        right: 24px;
        bottom: 96px;
        width: 340px;
        height: 460px;
        display: flex;
        flex-direction: column;
        background: #fff;
        border: 1px solid #e1e3e8;
        border-radius: 16px;
        box-shadow: 0 12px 28px rgba(16, 24, 40, 0.18);
        overflow: hidden;
        z-index: 1000;
      }

      .chat-panel-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 14px;
        font-weight: 600;
        font-size: 14px;
        border-bottom: 1px solid #e1e3e8;
      }

      .chat-panel kendo-chat {
        flex: 1;
        min-height: 0;
      }
    `,
  ],
})
export class RobotChatLauncherComponent {
  chatOpen = false;
  robotIcon = robotIcon;
  chatUser = chatUser;

  messages: Message[] = [
    {
      author: botUser,
      text: "Hi! How can I help?",
      timestamp: new Date(),
    },
  ];

  toggleChat(): void {
    this.chatOpen = !this.chatOpen;
  }

  onSendMessage(event: { message: Message }): void {
    this.messages = [...this.messages, event.message];
  }
}
