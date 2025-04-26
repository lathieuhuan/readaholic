import { Notifier } from "@app/_types/notifier";
import { toast } from "sonner";

export const notifier: Notifier = {
  notify: (input) => {
    const notification = typeof input === "string" ? { message: input } : input;
    const { title, message, type = "info" } = notification;

    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "info":
        toast.info(message);
        break;
      default:
        toast(message);
        break;
    }
  },
};
