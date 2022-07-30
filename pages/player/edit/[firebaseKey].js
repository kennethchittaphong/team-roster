/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePlayer } from '../../../api/playerData';
import PlayerForm from '../../../components/PlayerForm';

export default function EditPlayer() {
  const [editPlayers, setEditPlayers] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSinglePlayer(firebaseKey).then(setEditPlayers);
  }, [firebaseKey]);
  return (
    <PlayerForm obj={editPlayers} />
  );
}
