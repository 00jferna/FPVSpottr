import React from "react";
import OpenModalButton from "../../OpenModalButton";
import DeleteModal from "../../DeleteModal";
import { useModal } from "../../../context/Modal";
import UpdateReviewModal from "../UpdateReviewModal";

const ReviewModal = ({ review, user, onIsloaded }) => {
  const { closeModal } = useModal();

  return (
    <div className="modal">
      <div className="spot__review__modal">
        <div className="modal__headers">
          <h3>{review.reviewer.callsign}</h3>
          <i onClick={() => closeModal()} className="fas fa-times-circle"></i>
        </div>

        <p>{review.review}</p>
        {user && review.reviewer.id == user.id && (
          <div className="spot__review__modal__actions">
            <OpenModalButton
              buttonText="Update Review"
              modalComponent={
                <UpdateReviewModal
                  item={review}
                  onIsloaded={onIsloaded}
                />
              }
            />
            <OpenModalButton
              buttonText="Delete Review"
              modalComponent={
                <DeleteModal
                  type="review"
                  item={review}
                  onIsloaded={onIsloaded}
                />
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewModal;
