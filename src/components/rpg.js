import { useState, useEffect } from "react";
import styled from "styled-components";

const saberSon = {
  name: "saber-son",
  attack: 10,
};
const pettyBlade = {
  name: "petty-blade",
  attack: 2,
};
const prettySavage = {
  name: "pretty-savage",
  attack: 15,
};
const bamf = {
  name: "bamf",
  attack: 30,
};

const weaponInventory = [pettyBlade, saberSon, prettySavage, bamf];

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
    const random = Math.floor(Math.random() * 11);
    const luck = 5;
    let critical = 1;
    if (luck >= random) {
      critical = 1.5;
      alert("critical");
    }
    console.log(random);
    setEnemy({
      ...enemy,
      health:
        enemy.health -
        (character.weapon
          ? character.weapon.attack + character.attack
          : character.attack) *
          critical,
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
          <div>Weapons Inventory</div>
          <select>
            <option value="">None</option>
            {weaponInventory &&
              weaponInventory.map((weapon, index) => {
                return (
                  <>
                    <option value={index}>
                      {weapon.name} - atk: {weapon.attack}
                    </option>
                  </>
                );
              })}
          </select>
        </div>
        <div className="hero player">
          <div>Character: {character.name}</div>
          <div>Exp until next Level: {expThreshold - character.exp}</div>
          <div>Level: {character.level}</div>
          <div>Exp: {character.exp}</div>
          <div>Health: {character.health}</div>
          <div>Weapon: {character.weapon ? character.weapon.name : "None"}</div>
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
