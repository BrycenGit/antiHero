import { useState } from "react";

const Hero = {
  name: "hero",
  health: 100,
  exp: 0,
  type: "water",
};

const Enemy = {
  name: "hero",
  health: 100,
  exp: 0,
  type: "water",
};
const Rpg = () => {
  const [character, setCharacter] = useState(Hero);
  const [enemy, setEnemy] = useState(Enemy);

  const handleDamage = () => {
    setCharacter({ ...character, health: character.health - 10 });
    console.log(character);
  };

  return (
    <div>
      <div>Rpg</div>
      <div>Character: {character.name}</div>
      <div>Health: {character.health}</div>
      <button onClick={handleDamage}>Damage</button>
    </div>
  );
};

export default Rpg;
