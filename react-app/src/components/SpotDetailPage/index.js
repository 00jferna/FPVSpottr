import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as SpotActions from "../../store/spots";
import OpenModalButton from "../OpenModalButton";
import DeleteSpotModal from "../DeleteSpotModal";
import UpdateSpotModal from "../UpdateSpotModal";

function SpotDetail() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.spotDetail);
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(SpotActions.getSpotDetailsThunk(spotId)).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch, spotId]);

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
                  <li>{spot.spot_type.toUpperCase()}</li>
                  <li>{spot.owner.callsign}</li>
                  <li>{spot.spots_status.toUpperCase()}</li>
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
                    modalComponent={<DeleteSpotModal spot={spot} />}
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
        {/* <div className="spot__reviews__cont">
          <div className="spot__reviews__actions">
            <h3>Spot Reviews</h3>
            {user && (
              <div>
                <a
                  onClick={() => {
                    alert(`Feature coming Soon!`);
                  }}
                >
                  Create Review
                </a>
                <a
                  onClick={() => {
                    alert(`Feature coming Soon!`);
                  }}
                >
                  Add to Favorites
                </a>
              </div>
            )}
          </div>
          <ul className="spot__reviews">
            <li>Review Placeholder</li>
            <li>Review Placeholder</li>
            <li>Review Placeholder</li>
          </ul>
        </div> */}
      </div>
    )
  );
}

export default SpotDetail;
