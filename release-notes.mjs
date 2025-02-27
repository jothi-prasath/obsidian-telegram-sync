export const version = "1.9.0";
// TODO add Demo gif and screenshots to readme.md
// TODO add thanks for last patrons in donation section
// TODO add notification about new version of Telegram Sync and link to the channel
// TODO add channel link to readme.md
// ## Demo
//![](https://raw.githubusercontent.com/vslinko/obsidian-outliner/main/demos/demo1.gif)<br>
export const showNewFeatures = true;
export let showBreakingChanges = false;

const newFeatures =
	"This release introduces new template variables {{chat:name}}, {{forwardFrom:name}}, and {{topic:name}}, and also fixes unexpected connection loss along with many other bugs.";
export const breakingChanges =
	"⚠️ <b><i>If you were connected as a user, due to API changes, the user has been disconnected and needs to be reconnected! Apologies</i></b> ⚠️";

const telegramChannelLink = "<a href='https://t.me/obsidian_telegram_sync_insider'>channel</a>";
const telegramChannelIntroduction = `Find the complete list of new features on the plugin's ${telegramChannelLink}.`;
const telegramChatLink = "<a href='https://t.me/ObsidianTelegramSync'>chat</a>";
const telegramChatIntroduction = `For discussions, please feel free to join the plugin's ${telegramChatLink}.`;
const donation =
	"If you appreciate this plugin and would like to support its continued development, please consider donating through the buttons below!";
const bestRegards = "Best regards,\nYour soberhacker🍃🧘💻\n⌞";

export const notes = `
<u><b>Telegram Sync ${version}</b></u>\n
🆕 ${newFeatures}\n
💡 ${telegramChannelIntroduction}\n
💬 ${telegramChatIntroduction}\n
🦄 ${donation}\n
${bestRegards}`;

export function showBreakingChangesInReleaseNotes() {
	showBreakingChanges = true;
}

// if undefined then equal
export function versionALessThanVersionB(versionA, versionB) {
	let partsA = versionA.split(".").map(Number);
	let partsB = versionB.split(".").map(Number);

	for (let i = 0; i < partsA.length && i < partsB.length; i++) {
		if (partsA[i] > partsB[i]) return false;
		if (partsA[i] < partsB[i]) return true;
	}

	if (partsA.length > partsB.length) return false;
	if (partsA.length < partsB.length) return true;

	return undefined;
}

const check = process.argv[2] === "check";

if (check) {
	const packageVersion = process.env.npm_package_version;

	if (packageVersion !== version) {
		console.error(`Failed! Release notes are outdated! ${packageVersion} !== ${version}`);
		process.exit(1);
	}
}
