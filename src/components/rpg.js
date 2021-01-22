import { useState } from "react";
import styled from "styled-components";

const Hero = {
  name: "hero",
  health: 100,
  exp: 0,
  type: "water",
  attack: 20,
};

const antiHero = {
  name: "anti-hero",
  health: 100,
  exp: 0,
  type: "water",
  attack: 20,
};
const Rpg = () => {
  const [character, setCharacter] = useState(Hero);
  const [enemy, setEnemy] = useState(antiHero);

  const checkHealth = (player) => {
    if (player.health <= 0) {
      alert(`${player.name} lost`);
    }
  };

  const characterReceiveDamage = async () => {
    setCharacter({ ...character, health: character.health - enemy.attack });
    await checkHealth(character);
  };

  const enemyReceiveDamage = () => {
    setEnemy({ ...enemy, health: enemy.health - character.attack });
    checkHealth(enemy);
  };

  return (
    <>
      <div>Rpg</div>
      <Box>
        <div className="hero">
          <div>Character: {character.name}</div>
          <div>Health: {character.health}</div>
          <button onClick={enemyReceiveDamage}>Damage</button>
        </div>
        <div className="enemy">
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
`;