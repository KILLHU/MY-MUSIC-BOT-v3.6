const db = require("../mongoDB");
module.exports = {
  name: "previous",
  description: "เล่นเพลงก่อนหน้า",
  permissions: "0x0000000000000800",
  options: [],
  voiceChannel: true,
  run: async (client, interaction) => {
    try {
      const queue = client.player.getQueue(interaction.guild.id);
      if (!queue || !queue.playing) return interaction.reply({ content: `⚠️ไม่เปิดเพลง!!`, ephemeral: true }).catch(e => { })
      try {
        let song = await queue.previous()
        interaction.reply({ content: `**Behold, the enchanting melody of the past!!**` }).catch(e => { })
      } catch (e) {
        return interaction.reply({ content: `❌ไม่มีเพลงก่อนหน้า!!`, ephemeral: true }).catch(e => { })
      }
    } catch (e) {
    console.error(e); 
  }
  },
};
