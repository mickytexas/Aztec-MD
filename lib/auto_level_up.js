async function levelUp(vorterx, citel) {
  const levelUpEnabled = process.env.LEVEL_UP === 'enabled'; // Check if auto level up is enabled in the configuration

    if (!levelUpEnabled) {
    console.log("Auto level up is disabled. Skipping...");
    return;
    }

  const xpThresholds = [0, 10, 25, 50, 100, 200];
  const shipsHuntedThresholds = [0, 3, 5, 10, 15, 20];
  const dragonBallCharacters = ["Goku", "Vegeta", "Piccolo", "Gohan", "Trunks", "Krillin"];
  const userXp = await getUserXp(vorterx.sender);
  const userProfilePic = await getUserProfilePic(vorterx.sender); 
  const userShipsHunted = await getUserShipsHunted(vorterx.sender);
  const userCountry = await getUserCountry(vorterx.sender);

  const currentLevel = calculateLevel(userXp);
  const nextLevel = currentLevel + 1;

    if (levelUpEnabled && userXp >= xpThresholds[nextLevel] && userShipsHunted >= shipsHuntedThresholds[nextLevel]) {
    const newLevel = nextLevel;
    const role = getRole(newLevel);
    const character = getDragonBallCharacter(newLevel); 
    const diamondsEarned = getDiamondsEarned(newLevel);
    const goldEarned = getGoldEarned(newLevel);
    const moneyEarned = getMoneyEarned(newLevel);
    const userDateTime = await getUserDateTime(userCountry);

    await updateUserLevel(vorterx.sender, newLevel);
    await updateUserRole(vorterx.sender, role);
    await updateUserDiamonds(vorterx.sender, diamondsEarned);
    await updateUserGold(vorterx.sender, goldEarned);
    await updateUserMoney(vorterx.sender, moneyEarned);

    const caption = `[ *LEVEL_UP ENGINE* ]\n
|*(♻️)Congratulations! You've leveled up to Level ${newLevel}!*\n\n
|   
|*[🎰]New role is* ${role}.\n
|*[🏦]Diamonds earned* ${diamondsEarned}\n
|*[🏦]Gold earned*${goldEarned}\n
|*[🏦]Rewards money*${moneyEarned}\n
|*[🐏]Hunted Ships* ${userShipsHunted}\n
|*[😁]Dragon Ball character is* ${character}.\n
|*[👋Current Date*${userCountry}: ${userDateTime}\n
|  
| [👍]Keep up the good work!
└───────────◉`;
    await vorterx.sendMessage(m.from, { image: { url: userProfilePic },caption: caption}, { quoted: m }); }
   }

  const vorterx = {
  sender: "user123",
  chat: "chat123",
 };

const citel = {};

levelUp(vorterx, citel);
