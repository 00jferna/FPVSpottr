import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as SpotActions from "../../store/spots";
import * as ReviewActions from "../../store/reviews";
import OpenModalButton from "../OpenModalButton";
import OpenModalCard from "../OpenModalCard";
import DeleteModal from "../DeleteModal";
import UpdateSpotModal from "../UpdateSpotModal";
import AddFavoriteModal from "../AddFavoriteModal";
import CreateReviewModal from "../CreateReviewModal";
import ReviewModal from "../ReviewModal";

function SpotDetail() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.spotDetail);
  const reviews = useSelector((state) => state.reviews.SpotReviews);
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(SpotActions.getSpotDetailsThunk(spotId))
      .then((spot) => dispatch(ReviewActions.getSpotReviewsThunk(spot)))
      .then(() => {
        setIsLoaded(true);
      });
  }, [dispatch, spotId, isLoaded]);

  return (
    isLoaded && (
      <div>
        <div className="spot__cont">
          <div className="spot__detail__cont">
            <img src={spot.preview_img} alt="Spot preview" />
            <div className="spot__detail">
              <div className="spot__name__list">
                <h2>{spot.name}</h2>
                <ul>
                  <li>
                    {spot.spot_type.split("_").map((word) => {
                      return " " + word[0].toUpperCase() + word.slice(1);
                    })}
                  </li>
                  <li>{spot.owner.callsign}</li>
                  <li>
                    {spot.spots_status.split("_").map((word) => {
                      return " " + word[0].toUpperCase() + word.slice(1);
                    })}
                  </li>
                </ul>
              </div>

              {user && user.id === spot.owner.id && (
                <div className="spot__actions">
                  <OpenModalButton
                    buttonText="Update Spot"
                    modalComponent={<UpdateSpotModal spot={spot} />}
                  />
                  <OpenModalButton
                    buttonText="Delete Spot"
                    modalComponent={<DeleteModal type="spot" item={spot} />}
                  />
                </div>
              )}
              <h3>Spot Description</h3>
              <div className="spot__desc">
                <p>{spot.desc}</p>
              </div>
            </div>
          </div>
        </div>
        {
          <div className="spot__reviews__cont">
            <div className="spot__reviews__actions">
              <h3>Spot Reviews</h3>
              {user && (
                <div>
                  <OpenModalButton
                    buttonText="Create Review"
                    modalComponent={
                      <CreateReviewModal
                        type="spot"
                        spot={spot}
                        onIsloaded={setIsLoaded}
                      />
                    }
                  />
                  {/* <OpenModalButton
                    buttonText="Add to Favorites"
                    modalComponent={<AddFavoriteModal spot={spot} />}
                  /> */}
                </div>
              )}
            </div>
            <ul className="spot__reviews">
              {reviews.map((review) => {
                return (
                  <li className="spot__reviews_details" key={review.id}>
                    <OpenModalCard
                      buttonText={
                        <>
                          <p>{review.review}</p>
                          <h4>{review.reviewer.callsign}</h4>
                          <h5>
                            {review.createdAt.split(" ")[2] +
                              " " +
                              review.createdAt.split(" ")[1] +
                              ", " +
                              review.createdAt.split(" ")[3]}
                          </h5>
                        </>
                      }
                      modalComponent={
                        <ReviewModal
                          review={review}
                          user={user}
                          onIsloaded={setIsLoaded}
                        />
                      }
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        }
      </div>
    )
  );
}

export default SpotDetail;
