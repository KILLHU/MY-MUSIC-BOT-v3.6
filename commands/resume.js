const db = require("../mongoDB");
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "resume",
  description: "เริ่มเพลงที่หยุดชั่วคราว",
  permissions: "0x0000000000000800",
  options: [],
  voiceChannel: true,
  run: async (client, interaction) => {
    const queue = client.player.getQueue(interaction.guild.id);

    try {
      if (!queue) {
        return interaction.reply({ content: '⚠️ คิวว่าง!!', ephemeral: true });
      }

      if (!queue.paused) {
        return interaction.reply({ content: '⚠️ ไม่มีเพลงที่หยุดชั่วคราว!!', ephemeral: true });
      }

      const success = queue.resume();

      const embed = new EmbedBuilder()
        .setColor('#7645fe')
        .setAuthor({
          name: 'เพลงดำเนินการต่อ',
          iconURL: 'https://cdn.discordapp.com/attachments/1156866389819281418/1157296313549983846/8929-purple-play-icon.png?ex=651817ae&is=6516c62e&hm=55fc041718da9277d1cdb13ef25ebf043d90588ee33c4bc838d9634ecfbc8e99&',
          url: 'https://discord.gg/FUEHs7RCqz'
        })
        .setDescription(success ? '**ดนตรีก็กลับมามีชีวิตอีกครั้ง!!**' : '❌ Error: Unable to resume song')


      return interaction.reply({ embeds: [embed] });
    } catch (e) {
      console.error(e);
    }
  },
};