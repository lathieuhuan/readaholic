type Notification = {
  title?: string;
  message: string;
  /** Default to 'info' */
  type?: "success" | "error" | "info";
};

export type Notifier = {
  notify(noti: string | Notification): void;
};
