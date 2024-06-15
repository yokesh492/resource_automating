import React from "react";
import ModalComponent from "../shared/ModalComponent";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNotificationModal } from "../../store/store";
import { notiData } from "../../data/Notification";

const style = {
  position: "relative",
  flexGrow: 1,
  top: "10%",
  left: "47%",
  bgcolor: "#F9F9F9",
  borderColor: "#F9F9F9",
  boxShadow: 24,
  maxHeight: 470,
  borderRadius: "16px",
  width: "581px",
  overflowY: "auto",
  padding: "24px",
};

const NotificationModal = () => {
  const { open, handleClose } = useNotificationModal();
  return (
    <ModalComponent open={open} handleClose={handleClose} style={style}>
      <div className="mb-5">
        <div className="flex flex-row align-middle">
          <p className="bg-dropDown rounded-md p-2 mb-2">
            <NotificationsNoneIcon />
          </p>
          <h2 className="text-2xl mt-1 pl-3 font-bold"> Notifications</h2>
        </div>
        {notiData.map((data) => (
          <div>
            <hr className="mt-2" />
            <div className="flex flex-row justify-between mt-4">
              <div>
                <p className="text-sm text-gray-500">
                  {data.addedBy} added a new asset
                </p>
                <p className="text-lg">{data.asset_name}</p>
              </div>
              <button className="bg-buttonBlue px-1 py-0 hover:bg-buttonHover rounded-md ">
                <ChevronRightIcon className="text-white" fontSize="large" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ModalComponent>
  );
};

export default NotificationModal;
