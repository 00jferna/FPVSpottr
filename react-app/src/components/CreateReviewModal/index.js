import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as ReviewActions from "../../store/reviews";

export const CreateReviewModal = ({ item, spot, onIsloaded }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [review, setReview] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const payload = {
      spot_id: spot.id,
      review,
    };

    const newReview = await dispatch(
      ReviewActions.createSpotReviewsThunk(payload)
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
      <h1>Create a Review</h1>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <textarea
                  type="text"
                  rows="5"
                  placeholder="Spot Review"
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
        <button>Create Review!</button>
      </form>
    </div>
  );
};

export default CreateReviewModal;
