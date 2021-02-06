import { useState, useEffect } from "react";
import styled from "styled-components";
import { saberSon, pettyBlade, prettySavage, bamf } from "./Weapons";
import { Hero, antiHero } from "./Characters";
import { highPotion, regPotion, weakPotion } from "./Potions";
const weaponInventory = [pettyBlade, saberSon, prettySavage, bamf];

const potionsInventory = [highPotion, regPotion, weakPotion];

const Rpg = () => {
  const [character, setCharacter] = useState(Hero);
  const [enemy, setEnemy] = useState(antiHero);
  const [expThreshold, setExpThreshold] = useState(100);
  const [selectedWeapon, setSelectedWeapon] = useState(null);
  const [expGained, setExpGained] = useState(20);
  const [selectedPotion, setSelectedPotion] = useState(null);

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

  const handleSelectingPotion = (e) => {
    const index = parseInt(e.target.value);
    setSelectedPotion(potionsInventory[index]);
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

  const usePotion = () => {
    selectedPotion &&
      setCharacter({
        ...character,
        health: character.health + selectedPotion.health,
      });
  };

  const enemyReceiveDamage = () => {
    const random = Math.floor(Math.random() * 11);
    let critical = 1;
    if (Hero.luck >= random) {
      critical = 1.2;
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
    setCharacter({ ...character, exp: character.exp + expGained });
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
        <div className="enemy player">
          <div>Enemy: {enemy.name}</div>
          <div>Health: {enemy.health}</div>
          <button onClick={characterReceiveDamage}>Damage</button>
        </div>
      </Box>
      <Dashboard>
        {/* CHaracter Info */}
        <div>
          <div>Character: {character.name}</div>
          <div>Exp until next Level: {expThreshold - character.exp}</div>
          <div>Level: {character.level}</div>
          <div>Exp: {character.exp}</div>
          <div>Health: {character.health}</div>
        </div>
        {/* Buttons */}
        <div>
          <div>
            <button onClick={enemyReceiveDamage}>Damage</button>
          </div>
        </div>

        {/* Weapons selector */}
        <div onChange={handleSelectingWeapon} className="weapons player">
          <div>Weapon: {character.weapon ? character.weapon.name : "None"}</div>
          <select>
            <option value="">Weapons Inventory</option>
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
        <div>Armor:</div>
        <div onChange={handleSelectingPotion}>
          <div>Potion: </div>
          <select>
            <option value="">potions Inventory</option>
            {potionsInventory &&
              potionsInventory.map((potion, index) => {
                return (
                  <>
                    <option value={index}>
                      {potion.name} - health: {potion.health}
                    </option>
                  </>
                );
              })}
          </select>
          <div>
            <button onClick={usePotion}>Use Potion</button>
          </div>
        </div>
      </Dashboard>
    </>
  );
};

export default Rpg;

const Box = styled.div`
  background-color: blue;
  /* margin: 80px; */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  .player {
    margin: 20px;
  }
`;

const Dashboard = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
`;
