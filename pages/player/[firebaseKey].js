import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import viewPlayerDetails from '../../api/mergedData';

export default function ViewPlayer() {
  const [playerDetails, setPlayerDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewPlayerDetails(firebaseKey).then(setPlayerDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column" />
      <div className="text-white ms-5 details">
        <h5>
          {playerDetails.name}
        </h5>
      </div>
    </div>
  );
}
