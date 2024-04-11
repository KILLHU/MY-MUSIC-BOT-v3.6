const { EmbedBuilder } = require('discord.js');
const db = require("../mongoDB");
module.exports = {
  name: "nowplaying",
  description: "รับข้อมูลเพลงปัจจุบัน",
  permissions: "0x0000000000000800",
  options: [],
  run: async (client, interaction) => {
    try {

      const queue = client.player.getQueue(interaction.guild.id);
      if (!queue || !queue.playing) return interaction.reply({ content: `⚠️ไม่พบเพลงที่กำลังเล่น`, ephemeral: true }).catch(e => { })

      const track = queue.songs[0];
      if (!track) return interaction.reply({ content: `⚠️ไม่พบเพลงที่กำลังเล่น`, ephemeral: true }).catch(e => { })

      const embed = new EmbedBuilder();
      embed.setColor(client.config.embedColor);
      embed.setThumbnail(track.thumbnail);
      embed.setTitle(track.name)
      embed.setDescription(`> **ระดับเสียง** \`%${queue.volume}\`
> **ระยะเวลา :** \`${track.formattedDuration}\`
> **URL :** **${track.url}**
> **โหมดลูป :** \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'คิวทั้งหมด' : 'เพลงนี้') : 'Off'}\`
> **ฟิลเตอร์เสียง**: \`${queue.filters.names.join(', ') || 'Off'}\`
> **ขอโดย :** <@${track.user.id}>`);


      interaction.reply({ embeds: [embed] }).catch(e => { })

    }  catch (e) {
    console.error(e); 
  }
  },
};