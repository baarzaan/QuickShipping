import React from "react";
import { hideScrollBar } from "../../../hooks/hideScrollBar";

const DeleteAttributeModal = ({
  showDeleteModal,
  setShowDeleteModal,
  attribute,
  deleteFunction,
}) => {
  hideScrollBar(showDeleteModal);

  return (
    <div
      onClick={() => setShowDeleteModal(!showDeleteModal)}
      className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 h-screen w-full bg-black/50 backdrop-blur-sm"
      style={{ zIndex: 3 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[150px] rounded-md bg-white flex flex-col justify-center items-center gap-7 p-1"
      >
        <h3 className="text-lg font-font-semibold">
          Are you sure you want to delete{" "}
          <strong>{attribute.attributeName}</strong> attribute?
        </h3>

        <div className="flex justify-around items-center w-full">
          <button
            onClick={() => setShowDeleteModal(!showDeleteModal)}
            className="text-red-700 hover:text-red-800 transform transition-all ease-in-out duration-100 active:scale-95"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              deleteFunction(attribute);
              setShowDeleteModal(false);
            }}
            className="bg-red-700 text-white p-2 rounded-md hover:bg-red-800 transform transition-all ease-in-out duration-100 active:scale-95"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAttributeModal;
