import { useState, useEffect } from "react";
import styled from "styled-components";

const Hero = {
  name: "hero",
  level: 1,
  health: 100,
  exp: 0,
  type: "water",
  attack: 20,
};

const antiHero = {
  name: "anti-hero",
  level: 1,
  health: 100,
  exp: 0,
  type: "water",
  attack: 20,
};
const Rpg = () => {
  const [character, setCharacter] = useState(Hero);
  const [enemy, setEnemy] = useState(antiHero);

  useEffect(() => {
    if (character.health <= 0) {
      alert(`${character.name} lost`);
    }
    if (enemy.health <= 0) {
      alert(`${enemy.name} lost`);
    }
  });

  const characterReceiveDamage = async () => {
    setCharacter({ ...character, health: character.health - enemy.attack });
  };

  const enemyReceiveDamage = () => {
    setEnemy({ ...enemy, health: enemy.health - character.attack });
  };

  return (
    <>
      <div>Rpg</div>
      <Box>
        <div className="hero player">
          <div>Character: {character.name}</div>
          <div>Health: {character.health}</div>
          <button onClick={enemyReceiveDamage}>Damage</button>
        </div>
        <div className="enemy player">
          <div>Enemy: {enemy.name}</div>
          <div>Health: {enemy.health}</div>
          <button onClick={characterReceiveDamage}>Damage</button>
        </div>
      </Box>
    </>
  );
};

export default Rpg;
const Box = styled.div`
  margin: 80px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  .player {
    margin: 20px;
  }
`;
