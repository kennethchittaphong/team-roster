import React, { useEffect, useState } from 'react';
import TeamCard from '../components/TeamCard';
import { getTeams } from '../api/teamData';
import { useAuth } from '../utils/context/authContext';

export default function Player() {
  const [teams, setTeams] = useState([]);

  const { user } = useAuth();

  const getAllTeams = (() => {
    getTeams(user.uid).then(setTeams);
  });

  useEffect(() => {
    getAllTeams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {teams.map((team) => (
        <TeamCard key={team.firebaseKey} teamObj={team} onUpdate={getAllTeams} />
      ))}
    </div>
  );
}
