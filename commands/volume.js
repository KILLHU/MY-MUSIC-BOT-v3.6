const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const maxVol = require("../config.js").opt.maxVol;
const db = require("../mongoDB");

module.exports = {
  name: "volume",
  description: "ช่วยให้คุณปรับระดับเสียงเพลงได้",
  permissions: "0x0000000000000800",
  options: [{
    name: 'volume',
    description: 'พิมพ์ตัวเลขเพื่อปรับระดับเสียง',
    type: ApplicationCommandOptionType.Integer,
    required: true
  }],
  voiceChannel: true,
  run: async (client, interaction) => {
    try {
      const queue = client.player.getQueue(interaction.guild.id);
      if (!queue || !queue.playing) {
        return interaction.reply({ content: '⚠️ไม่พบเพลงที่กำลังเล่น', ephemeral: true });
      }

      const vol = parseInt(interaction.options.getInteger('volume'));

      if (!vol) {
        return interaction.reply({
          content: `ระดับเสียงปัจจุบัน: **${queue.volume}** 🔊\nหากต้องการเปลี่ยนระดับเสียง ให้พิมพ์ตัวเลขระหว่างn \`1\` and \`${maxVol}\`.`,
          ephemeral: true
        });
      }

      if (queue.volume === vol) {
        return interaction.reply({ content: 'ระดับเสียงปัจจุบันตั้งค่าเป็นแล้ว **' + vol + '**!', ephemeral: true });
      }

      if (vol < 1 || vol > maxVol) {
        return interaction.reply({
          content: `กรุณาพิมพ์ตัวเลขระหว่าง \`1\` and \`${maxVol}\`.`,
          ephemeral: true
        });
      }

      const success = queue.setVolume(vol);

      if (success) {
        const embed = new EmbedBuilder()
          .setColor('#d291fe')
          .setAuthor({
        name: 'เพลงของคุณ! กฎของคุณ!',
        iconURL: 'https://cdn.discordapp.com/attachments/1156866389819281418/1157528025739563088/5657-volume-icon.png?ex=6518ef7b&is=65179dfb&hm=1797c2830537a28b5c6a57564517cc509146d02383a69fb4239d7b5d55aceeed&', 
        url: 'https://discord.gg/FUEHs7RCqz'
    })
          .setDescription(`**การปรับระดับเสียง : ** **${vol}/${maxVol}**`);

        return interaction.reply({ embeds: [embed] });
      } else {
        return interaction.reply({ content: '❌เกิดข้อผิดพลาดขณะเปลี่ยนระดับเสียง', ephemeral: true });
      }
    } catch (e) {
      console.error(e);
    }
  },
};