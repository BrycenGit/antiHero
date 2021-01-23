import { useState, useEffect } from "react";
import styled from "styled-components";

const saberSon = {
  name: "saber-son",
  attack: 10,
};

const Hero = {
  name: "hero",
  level: 1,
  health: 100,
  exp: 0,
  type: "water",
  attack: 20,
  weapon: null,
  armor: null,
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
  const [expThreshold, setExpThreshold] = useState(100);

  useEffect(() => {
    if (character.health <= 0) {
      alert(`${character.name} lost`);
    }
    if (enemy.health <= 0) {
      alert(`${enemy.name} lost`);
      addExp();
    }
    checkExp();
    console.log(character);
  });

  const equipWeapon = (weaponParam) => {
    setCharacter({ ...character, weapon: { ...weaponParam } });
    alert(`${weaponParam.name} equipped`);
  };

  const unEquipWeapon = () => {
    setCharacter({ ...character, weapon: null });
    alert("weapon unequiped");
  };

  const characterReceiveDamage = () => {
    setCharacter({ ...character, health: character.health - enemy.attack });
  };

  const enemyReceiveDamage = () => {
    setEnemy({
      ...enemy,
      health:
        enemy.health -
        (character.weapon
          ? character.weapon.attack + character.attack
          : character.attack),
    });
  };

  const addExp = () => {
    setCharacter({ ...character, exp: character.exp + 55 });
    setEnemy(antiHero);
  };

  const checkExp = () => {
    if (character.exp >= expThreshold) {
      levelUp();
    }
  };

  const levelUp = () => {
    setCharacter({
      ...character,
      exp: character.exp - expThreshold,
      level: character.level + 1,
    });
    setExpThreshold(Math.round(expThreshold * 1.2));
    console.log(Math.round(expThreshold * 1.2));
  };

  return (
    <>
      <div>Rpg</div>
      <Box>
        <div className="hero player">
          <div>Character: {character.name}</div>
          <div>Level: {character.level}</div>
          <div>Exp: {character.exp}</div>
          <div>Health: {character.health}</div>
          <button onClick={enemyReceiveDamage}>Damage</button>
          <button
            onClick={() => {
              equipWeapon(saberSon);
            }}
          >
            Equip Weapon
          </button>
          <button onClick={unEquipWeapon}>Unequip Weapon</button>
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
