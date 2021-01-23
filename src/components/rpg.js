import { useState, useEffect } from "react";
import styled from "styled-components";

const saberSon = {
  name: "saber-son",
  attack: 10,
};

const weaponInventory = [saberSon, saberSon, saberSon, saberSon];

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
  const [selectedWeapon, setSelectedWeapon] = useState(null);

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
    console.log(selectedWeapon);
  });

  const handleSelectingWeapon = (e) => {
    const index = parseInt(e.target.value);
    setSelectedWeapon(weaponInventory[index]);
  };

  const equipWeapon = () => {
    if (selectedWeapon) {
      setCharacter({ ...character, weapon: { ...selectedWeapon } });
      alert(`${selectedWeapon.name} equipped`);
    } else {
      alert("no weapon selected");
    }
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
        <div onChange={handleSelectingWeapon} className="weapons player">
          {weaponInventory &&
            weaponInventory.map((weapon, index) => {
              return (
                <>
                  {" "}
                  <div>
                    <input type="radio" value={index} /> {weapon.name}
                  </div>
                </>
              );
            })}
        </div>
        <div className="hero player">
          <div>Character: {character.name}</div>
          <div>Level: {character.level}</div>
          <div>Exp: {character.exp}</div>
          <div>Health: {character.health}</div>
          <div>
            <button onClick={enemyReceiveDamage}>Damage</button>
          </div>
          <div>
            <button
              onClick={() => {
                equipWeapon(saberSon);
              }}
            >
              Equip Weapon
            </button>
          </div>
          <div>
            <button onClick={unEquipWeapon}>Unequip Weapon</button>
          </div>
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
