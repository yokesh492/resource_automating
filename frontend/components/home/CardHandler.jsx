import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import ModalComponent from "../shared/ModalComponent";
import { useCardModal } from "../../store/store";
import { Chip } from "@mui/material";

const style = "text-gray-600 text-base mb-2";
const style2 = "text-sm text-black";

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#F9F9F9',
  borderColor:'#F9F9F9',
  boxShadow: 24,
  maxHeight: 770,
  borderRadius:16,
  width: '40%',
  overflowY: 'auto',
  padding:'10px',
};

const CardHandler = () => {
  const { open, handleClose, data } = useCardModal();

  return (
    <ModalComponent open={open} handleClose={handleClose} style={styleModal}>
      <div className="m-3">
        <h2 className="font-bold text-2xl mb-1 p-2">{data.asset_name}</h2>

        <div className="px-3 py-2.5">
          <p className={style}> {data.description}</p>
        </div>
        <div className="px-3 ">
          <h5 className={style}>Type</h5>
          <Chip
          label={<p className={style2}>{data.type}</p>}
          color="default"
          size="large"
        />
        </div>
        <div className="px-3 py-2.5">
          <h5 className={style}>Category</h5>
          <Chip
          label={<p className={style2}>{data.category}</p>}
          color="default"
          size="large"
        />
        </div>
        <div className="px-3">
          <h5 className={style}>Tags</h5>
          <div className="flex flex-row gap-1 flex-wrap items-center mt-2">
            {data.tags.map((tag, index) => {
              return (
                <Chip
                label={
                  <p key={index} className="text-sm text-black">
                    {tag}
                  </p>
                }
                color="default"
                size="large"
              />
              );
            })}
          </div>
        </div>
        <div className="px-3 pt-2.5">
          <h5 className={style}>Link</h5>
          <div onClick={(e) => e.stopPropagation()}>
            <a
              href={data.link}
              target="_blank"
              className="text-sm my-2 text-blue-500 font-semibold hover:underline"
            >
              {data.link}
            </a>
          </div>
        </div>
        <div className="px-3 py-2.5">
          <h5 className={style}>Author</h5>
          <p className="text-sm my-2 text-black">
            <span className="pr-2">
              <AccountCircleIcon color="disabled" />
            </span>
            {data.addedBy}
          </p>
        </div>
      </div>
    </ModalComponent>
  );
};

export default CardHandler;
