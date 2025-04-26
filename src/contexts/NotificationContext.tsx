
import { createContext, useContext, useReducer, ReactNode } from "react";
import { toast } from "@/components/ui/use-toast";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  timestamp: Date;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
}

type NotificationAction =
  | { type: "ADD_NOTIFICATION"; payload: Omit<Notification, "id" | "read" | "timestamp"> }
  | { type: "MARK_AS_READ"; payload: string }
  | { type: "MARK_ALL_AS_READ" }
  | { type: "REMOVE_NOTIFICATION"; payload: string }
  | { type: "CLEAR_ALL" };

interface NotificationContextType {
  state: NotificationState;
  addNotification: (notification: Omit<Notification, "id" | "read" | "timestamp">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

function notificationReducer(state: NotificationState, action: NotificationAction): NotificationState {
  switch (action.type) {
    case "ADD_NOTIFICATION": {
      const newNotification: Notification = {
        ...action.payload,
        id: Date.now().toString(),
        read: false,
        timestamp: new Date(),
      };
      return {
        ...state,
        notifications: [newNotification, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      };
    }
    case "MARK_AS_READ": {
      const notifications = state.notifications.map((notification) =>
        notification.id === action.payload ? { ...notification, read: true } : notification
      );
      const unreadCount = notifications.filter((notification) => !notification.read).length;
      return {
        ...state,
        notifications,
        unreadCount,
      };
    }
    case "MARK_ALL_AS_READ": {
      const notifications = state.notifications.map((notification) => ({
        ...notification,
        read: true,
      }));
      return {
        ...state,
        notifications,
        unreadCount: 0,
      };
    }
    case "REMOVE_NOTIFICATION": {
      const notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
      const unreadCount = notifications.filter((notification) => !notification.read).length;
      return {
        ...state,
        notifications,
        unreadCount,
      };
    }
    case "CLEAR_ALL": {
      return {
        ...state,
        notifications: [],
        unreadCount: 0,
      };
    }
    default:
      return state;
  }
}

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(notificationReducer, {
    notifications: [],
    unreadCount: 0,
  });

  const addNotification = (notification: Omit<Notification, "id" | "read" | "timestamp">) => {
    dispatch({ type: "ADD_NOTIFICATION", payload: notification });
    
    // Also show a toast notification
    toast({
      title: notification.title,
      description: notification.message,
      variant: notification.type === "error" ? "destructive" : "default",
    });
  };

  const markAsRead = (id: string) => {
    dispatch({ type: "MARK_AS_READ", payload: id });
  };

  const markAllAsRead = () => {
    dispatch({ type: "MARK_ALL_AS_READ" });
  };

  const removeNotification = (id: string) => {
    dispatch({ type: "REMOVE_NOTIFICATION", payload: id });
  };

  const clearAll = () => {
    dispatch({ type: "CLEAR_ALL" });
  };

  return (
    <NotificationContext.Provider
      value={{
        state,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAll,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};
