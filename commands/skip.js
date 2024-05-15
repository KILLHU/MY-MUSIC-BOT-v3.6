const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const db = require("../mongoDB");

module.exports = {
  name: "skip",
  description: "ข้ามเพลงที่กำลังเล่น",
  permissions: "0x0000000000000800",
  options: [{
    name: "number",
    description: "ต้องการข้ามไปเพลงที่เท่าไหร่",
    type: ApplicationCommandOptionType.Number,
    required: false
  }],
  voiceChannel: true,
  run: async (client, interaction) => {
    try {
      const queue = client.player.getQueue(interaction.guild.id);
      if (!queue || !queue.playing) {
        return interaction.reply({ content: '⚠️ ไม่พบเพลงที่กำลังเล่น', ephemeral: true }).catch(e => { });
      }

      let number = interaction.options.getNumber('number');
      if (number) {
        if (number > queue.songs.length) {
          return interaction.reply({ content: '⚠️ เกินจำนวนเพลงในปัจจุบัน', ephemeral: true }).catch(e => { });
        }
        if (isNaN(number) || number < 1) {
          return interaction.reply({ content: '⚠️ หมายเลขไม่ถูกต้อง', ephemeral: true }).catch(e => { });
        }

        try {
          let old = queue.songs[0];
          await client.player.jump(interaction, number).then(song => {
            return interaction.reply({ content: `⏯️ ข้ามเพลง : **${old.name}**` }).catch(e => { });
          });
        } catch (e) {
          return interaction.reply({ content: '❌ คิวว่าง!!', ephemeral: true }).catch(e => { });
        }
      } else {
        try {
          let old = queue.songs[0];
          const success = await queue.skip();

          const embed = new EmbedBuilder()
            .setColor('#3498db')
            .setAuthor({
              name: 'ข้ามเพลงไป',
              iconURL: 'https://cdn.discordapp.com/attachments/1156866389819281418/1157269773118357604/giphy.gif?ex=6517fef6&is=6516ad76&hm=f106480f7d017a07f75d543cf545bbea01e9cf53ebd42020bd3b90a14004398e&',
              url: 'https://discord.gg/FUEHs7RCqz'
            })
            .setDescription(success ? ` **ข้ามไป** : **${old.name}**` : '❌ คิวว่าง!')
            .setTimestamp();

          return interaction.reply({ embeds: [embed] }).catch(e => { });
        } catch (e) {
          return interaction.reply({ content: '❌ คิวว่าง!!', ephemeral: true }).catch(e => { });
        }
      }
    } catch (e) {
      console.error(e);
      return interaction.reply({ content: '❌ เกิดข้อผิดพลาดบางอย่าง', ephemeral: true }).catch(e => { });
    }
  },
};