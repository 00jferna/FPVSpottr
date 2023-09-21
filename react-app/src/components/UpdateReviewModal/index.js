import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as ReviewActions from "../../store/reviews";

export const UpdateReviewModal = ({ item, onIsloaded }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [review, setReview] = useState(item.review);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const payload = {
      id: item.id,
      spot_id: item.spot_id,
      review,
    };
    console.log(payload);
    const newReview = await dispatch(
      ReviewActions.updateSpotReviewThunk(payload)
    );

    if (newReview.id) {
      setReview("");
      setErrors({});
      onIsloaded(false);
      closeModal();
    } else {
      console.log(newReview.errors);
      setErrors(newReview.errors);
    }
  };

  return (
    <div className="modal">
      <div className="modal__headers">
        <h1>Update Review</h1>
        <i onClick={() => closeModal()} className="fas fa-times-circle"></i>
      </div>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <textarea
                  type="text"
                  rows="5"
                  // placeholder="Spot Review"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
              </td>
            </tr>
            {errors.review && (
              <tr className="errors">
                <td>{errors.review[0]}</td>
              </tr>
            )}
          </tbody>
        </table>
        <button>Update Review!</button>
      </form>
    </div>
  );
};

export default UpdateReviewModal;
