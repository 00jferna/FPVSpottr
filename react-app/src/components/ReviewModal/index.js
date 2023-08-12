import React from "react";
import OpenModalButton from "../OpenModalButton";
import DeleteModal from "../DeleteModal";

const ReviewModal = ({ review, user, onIsloaded }) => {
  return (
    <div className="modal">
      <div className="spot__review__modal">
        <h3>{review.reviewer.callsign}</h3>
        <p>{review.review}</p>
        {user && review.reviewer.id == user.id && (
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
        )}
      </div>
    </div>
  );
};

export default ReviewModal;
