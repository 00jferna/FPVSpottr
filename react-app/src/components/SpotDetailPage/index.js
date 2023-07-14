import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as SpotActions from "../../store/spots";

function SpotDetail() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.spotDetail);
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    dispatch(SpotActions.getSpotDetailsThunk(spotId)).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch, spotId]);

  return (
    isLoaded && (
      <div>
        <div className="spot__detail__cont">
          <img src={spot.preview_img} />
          <div>
            <div>
              <h2>{spot.name}</h2>
              <h3>{spot.spot_type}</h3>
              <h3>{spot.owner}</h3>
              <h3>{spot.spots_status}</h3>
            </div>
            {user && user.user.id == spot.owner && (
              <div>
                {console.log(user.user.id,spot.owner)}
                <button>Update Spot</button>
                <button>Delete Spot</button>
              </div>
            )}
            <div>
              <h3>Spot Description</h3>
              <p>{spot.desc}</p>
            </div>
          </div>
        </div>
        <div className="spot__reviews__cont">
          <div>
            <h3>Spot Reviews</h3>
            {user && (
              <div>
                <button>Create Review</button>
                <button>Add to Favorites</button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default SpotDetail;
