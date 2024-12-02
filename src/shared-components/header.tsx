import { useSelector } from "react-redux";
import notificationImg from "../assets/notification.svg";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import tickWhite from "../assets/tick-white.svg";
import tickGreen from "../assets/tick-green.svg";
import { UpdateNotifications } from "../apis/updateNotification";
export function Header() {
  const user = useSelector((state: any) => state.user);
  const [isNotificationBox, setIsNotificationBox] = useState(false);
  const [isNotificationAlert, setIsNotificationAlert] = useState(false);
  type Notification = {
    id: string;
    title: string;
    description: string;
    isRead: boolean;
    userId: string;
    createdAt: string; // Use string for ISO date format
    reminderAt: string; // Use string for ISO date format
  };
  const [notification, setNotification] = useState<Notification[] | null>(null);

  const notificationBox = () => {
    if (isNotificationBox) {
      setIsNotificationBox(false);
    } else {
      setIsNotificationBox(true);
    }
  };
  const UpdateNotificationStatus = async (userId: string, id: string) => {
    let response = await UpdateNotifications({ userId, id });
    if (response) {
      let updatedNotifications = notification;
      updatedNotifications =
        updatedNotifications?.filter((item) => {
          if (item.id === id) {
            item.isRead = true;
          }
          return item;
        }) || null;
      if (updatedNotifications) {
        setIsNotificationAlert(
          updatedNotifications.every((item) => item.isRead)
        );
        setNotification(updatedNotifications.sort(sortNotification));
      }
    }
  };

  function sortNotification(a: Notification, b: Notification) {
    const A = a.isRead ? 1 : 0;
    const B = b.isRead ? 1 : 0;
    return A - B;
  }

  useEffect(() => {
    const socket = io(import.meta.env.VITE_BASEURL, {
      path: "/expense-notification",
      query: { userId: user.id },
      withCredentials: true,
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on(`notification`, (notification) => {
      console.log("Received notification:", notification);
      setIsNotificationAlert(
        notification.result.every((item: any) => item.isRead)
      );
      setNotification(notification.result.sort(sortNotification));
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
  }, [user.id]);
  return (
    <>
      <div className="w-full px-4 flex justify-end items-center mb-8">
        <div
          onClick={notificationBox}
          className="bg-white flex justify-center items-center p-2 rounded-full cursor-pointer"
        >
          <img src={notificationImg} className="w-[30px]" alt="notification" />
          <div
            className={`w-[12px] h-[12px] absolute rounded-full top-[19px] right-[59px] bg-orange-500 animate-ping ${
              isNotificationAlert ? "hidden" : "block"
            }`}
          ></div>
        </div>
      </div>
      {isNotificationBox && (
        <div className="bg-white w-[30%] right-14 top-16 h-[500px] absolute shadow-md rounded-xl p-4 overflow-hidden">
          <h4 className="text-accent border-b-2 border-secondary mb-2 ">
            Notifications
          </h4>
          <div className="overflow-y-auto h-[430px] pe-2">
            {notification?.map((notify) => {
              return (
                <div
                  key={notify.id}
                  className="p-2 mb-2  border  rounded-lg bg-bgMain"
                >
                  <h5>{notify.title}</h5>
                  <p className=" line-clamp-2">{notify.description}</p>
                  <button
                    onClick={() =>
                      UpdateNotificationStatus(notify.userId, notify.id)
                    }
                    className={`flex justify-center items-center gap-2 border font-semibold rounded w-full my-2 py-1 ${
                      !notify.isRead
                        ? "border-accent bg-accent text-white"
                        : "border-green-500"
                    }   `}
                  >
                    {!notify.isRead ? "Marked as Read" : "Readed"}{" "}
                    <img
                      src={!notify.isRead ? tickWhite : tickGreen}
                      className="w-[25px]"
                      alt="tick"
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
