import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useCardModal } from "../../store/store";
import { Chip } from "@mui/material";

const style = "text-gray-600 text-base mb-2";
const style2 = "text-sm text-black";

function Card(props) {
  const { handleOpen } = useCardModal();
  return (
    <div
      className="rounded-xl bg-white p-4 shadow-md hover:cursor-pointer"
      onClick={() => handleOpen(props)}
    >
      <h2 className="font-bold sm:text-2xl mb-1 p-2">{props.asset_name.length > 100
            ? `${props.asset_name.slice(0, 100)}...`
            : props.asset_name}</h2>

      <div className="px-3 py-1.5">
        <p className={style}>
          {props.description.length > 100
            ? `${props.description.slice(0, 100)}...`
            : props.description}
        </p>
      </div>
      <div className="px-3 py-1.5">
        <h5 className={style}>Type</h5>
        <Chip
          label={<p className={style2}>{props.type}</p>}
          color="default"
          size="large"
        />
      </div>
      <div className="px-3 py-1.5">
        <h5 className={style}>Category</h5>
        <Chip
          label={<p className={style2}>{props.category}</p>}
          color="default"
          size="large"
        />
      </div>
      <div className="px-3 pt-1.5">
        <h5 className={style}>Tags</h5>
        <div className="flex flex-row gap-1 flex-wrap items-center my-2">
          {props.tags.map((tag, index) => {
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
      <div className="px-3">
        <h5 className={style}>Link</h5>
        <div onClick={(e) => e.stopPropagation()}>
          <a
            href={props.link}
            target="_blank"
            className="text-base my-2 hover:text-blue-500 hover:underline"
          >
            {props.link}
          </a>
        </div>
      </div>
      <div className="px-3 py-1.5">
        <h5 className={style}>Author</h5>
        <p className="text-base my-2">
          <span className="pr-2">
            <AccountCircleIcon color="disabled" />
          </span>
          {props.addedBy}
        </p>
      </div>
    </div>
  );
}

export default Card;
