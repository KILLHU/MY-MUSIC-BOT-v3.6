const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const db = require("../mongoDB");
module.exports = {
  name: "seek",
  description: "ข้ามไปที่การประทับเวลา",
  permissions: "0x0000000000000800",
  options: [{
    name: "time",
    description: "ป้อนการประทับเวลา",
    type: ApplicationCommandOptionType.String,
    required: true
  }],
  voiceChannel: true,
  run: async (client, interaction) => {
    try {

      const queue = client.player.getQueue(interaction.guild.id);
      if (!queue || !queue.playing) return interaction.reply({ content: `⚠️ไม่พบเพลงที่กำลังเล่น`, ephemeral: true }).catch(e => { })

      let position = getSeconds(interaction.options.getString("position"))
      if(isNaN(position)) return interaction.reply({ content: `usage : 2:40`, ephemeral: true }).catch(e => { })

      queue.seek(position)
      interaction.reply({ content: `▶️ **พาคุณเดินทางข้ามเวลาไปสู่การประทับเวลาที่กำหนด**`}).catch(e => { })

    } catch (e) {
      console.error(e);
    }
  },
};

function getSeconds(str) {
    if (!str) {
        return 0; 
    }
    
    var p = str.split(':');
    var s = 0;
    var m = 1;
    while (p.length > 0) {
        s += m * parseInt(p.pop(), 10);
        m *= 60;
    }
    return s;
}