
import { useState } from "react";
import { Bell, Check, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useNotification, Notification } from "@/contexts/NotificationContext";

const NotificationItem = ({ notification, onRead, onRemove }: {
  notification: Notification;
  onRead: () => void;
  onRemove: () => void;
}) => {
  const getBgColor = () => {
    if (notification.read) return "bg-background";
    
    switch (notification.type) {
      case "success": return "bg-green-50 dark:bg-green-900/10";
      case "error": return "bg-red-50 dark:bg-red-900/10";
      case "warning": return "bg-yellow-50 dark:bg-yellow-900/10";
      default: return "bg-blue-50 dark:bg-blue-900/10";
    }
  };
  
  const getIconColor = () => {
    switch (notification.type) {
      case "success": return "text-green-500";
      case "error": return "text-red-500";
      case "warning": return "text-yellow-500";
      default: return "text-blue-500";
    }
  };
  
  return (
    <div className={`p-3 ${getBgColor()} rounded-md mb-2 relative`}>
      <div className="flex justify-between">
        <h4 className="font-medium text-sm">
          {notification.title}
        </h4>
        <div className="flex gap-1">
          {!notification.read && (
            <Button variant="ghost" size="icon" className="h-5 w-5" onClick={onRead}>
              <Check className="h-3 w-3" />
              <span className="sr-only">Mark as read</span>
            </Button>
          )}
          <Button variant="ghost" size="icon" className="h-5 w-5" onClick={onRemove}>
            <X className="h-3 w-3" />
            <span className="sr-only">Remove</span>
          </Button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
      <div className="text-[10px] text-muted-foreground mt-1">
        {new Date(notification.timestamp).toLocaleString()}
      </div>
    </div>
  );
};

export const NotificationCenter = () => {
  const { state, markAsRead, markAllAsRead, removeNotification, clearAll } = useNotification();
  const [open, setOpen] = useState(false);
  
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };
  
  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {state.unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary">
              {state.unreadCount > 9 ? '9+' : state.unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="flex items-center justify-between pb-2">
          <h3 className="font-medium">Notifications</h3>
          <div className="flex gap-2">
            {state.unreadCount > 0 && (
              <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={markAllAsRead}>
                <Check className="h-3 w-3 mr-1" /> Mark all read
              </Button>
            )}
            {state.notifications.length > 0 && (
              <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={clearAll}>
                <Trash2 className="h-3 w-3 mr-1" /> Clear all
              </Button>
            )}
          </div>
        </div>
        <Separator />
        <ScrollArea className="h-[300px] mt-2">
          {state.notifications.length > 0 ? (
            state.notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onRead={() => markAsRead(notification.id)}
                onRemove={() => removeNotification(notification.id)}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <Bell className="h-8 w-8 mb-2 opacity-20" />
              <p className="text-sm">No notifications</p>
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
