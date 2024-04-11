/*

  ██████╗░████████╗██╗░░██╗           
  ██╔══██╗╚══██╔══╝╚██╗██╔╝          
  ██████╔╝░░░██║░░░░╚███╔╝░          
  ██╔══██╗░░░██║░░░░██╔██╗░          
  ██║░░██║░░░██║░░░██╔╝╚██╗          
  ╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░╚═╝          

   
   # MADE BY RTX!! FEEL FREE TO USE ANY PART OF CODE
   ## FOR HELP CONTACT ME ON DISCORD
   ## Contact    [ DISCORD SERVER :  https://discord.gg/FUEHs7RCqz ]
   ## YT : https://www.youtube.com/channel/UCPbAvYWBgnYhliJa1BIrv0A
*/
const db = require("../mongoDB");
module.exports = {
  name: "loop",
  description: "เปิดหรือปิดโหมดวนเพลง",
  permissions: "0x0000000000000800",
  options: [],
  voiceChannel: true,
  run: async (client, interaction) => {

    try {
      const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
      const queue = client.player.getQueue(interaction.guild.id);
      if (!queue || !queue.playing) return interaction.reply({ content: '⚠️ไม่พบเพลงที่กำลังเล่น', ephemeral: true }).catch(e => { })

      let button = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel("ลูปคิวเพลง")
          .setStyle(ButtonStyle.Secondary)
          .setCustomId("queue"),
        new ButtonBuilder()
          .setLabel("ลูปเพลงปัจจุบัน")
          .setStyle(ButtonStyle.Secondary)
          .setCustomId("nowplaying"),
        new ButtonBuilder()
          .setLabel("หยุดลูป")
          .setStyle(ButtonStyle.Danger)
          .setCustomId("close")
      )

      const embed = new EmbedBuilder()
        .setColor('#fc4e03')
        .setAuthor({
        name: 'วนท่วงทำนองของคุณ',
        iconURL: 'https://cdn.discordapp.com/attachments/1156866389819281418/1157318080670728283/7905-repeat.gif?ex=65182bf4&is=6516da74&hm=9ae58f40fcea5dc42a2a992bbd159d50116b3bafe5c5f7728e3a5276442efd2a&', 
        url: 'https://discord.gg/FUEHs7RCqz'
    })
        .setDescription('**วนลูป! ปล่อยให้เพลงเล่นไปเรื่อยๆ**')

      interaction?.reply({ embeds: [embed], components: [button], fetchReply: true }).then(async Message => {

        const filter = i => i.user.id === interaction.user.id
        let col = await Message.createMessageComponentCollector({ filter, time: 120000 });

        col.on('collect', async (button) => {
          if (button.user.id !== interaction.user.id) return
          const queue1 = client.player.getQueue(interaction.guild.id);
          if (!queue1 || !queue1.playing) {
            await interaction?.editReply({ content: '⚠️ ไม่มีเพลงที่กำลังเล่น!!', ephemeral: true }).catch(e => { })
            await button?.deferUpdate().catch(e => {})
          }
          switch (button.customId) {
            case 'queue':
              const success = queue.setRepeatMode(2);
              interaction?.editReply({ content: `✅ เปิดใช้ลูปคิวเพลงแล้ว!!` }).catch(e => { })
              await button?.deferUpdate().catch(e => {})
              break
            case 'nowplaying':
              const success2 = queue.setRepeatMode(1);
              interaction?.editReply({ content: `✅ เปิดใช้ลูปเพลงปัจจุบันแล้ว!!` }).catch(e => { })
              await button?.deferUpdate().catch(e => {})
              break
            case 'close':
              if (queue.repeatMode === 0) {
                await button?.deferUpdate().catch(e => {})
                return interaction?.editReply({ content: '⚠️ ปิดการลูปแล้ว!!', ephemeral: true }).catch(e => { })
              }
              const success4 = queue.setRepeatMode(0);
              interaction?.editReply({ content: '▶️ กำลังวนลูปอยู่' }).catch(e => { })
              await button?.deferUpdate().catch(e => {})
              break
          }
        })
        col.on('end', async (button) => {
          button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setLabel("หมดเวลา")
              .setCustomId("timeend")
              .setDisabled(true))

          const embed = new EmbedBuilder()
            .setColor('#fc5203')
            .setTitle('▶️ กำลังวนลูปอยู่!!')
            .setTimestamp()

          await interaction?.editReply({ content: "", embeds: [embed], components: [button] }).catch(e => { });
        })
      }).catch(e => { })

    } catch (e) {
    console.error(e); 
  }
  }
}
/*

  ██████╗░████████╗██╗░░██╗           
  ██╔══██╗╚══██╔══╝╚██╗██╔╝          
  ██████╔╝░░░██║░░░░╚███╔╝░          
  ██╔══██╗░░░██║░░░░██╔██╗░          
  ██║░░██║░░░██║░░░██╔╝╚██╗          
  ╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░╚═╝          

   
   # MADE BY RTX!! FEEL FREE TO USE ANY PART OF CODE
   ## FOR HELP CONTACT ME ON DISCORD
   ## Contact    [ DISCORD SERVER :  https://discord.gg/FUEHs7RCqz ]
   ## YT : https://www.youtube.com/channel/UCPbAvYWBgnYhliJa1BIrv0A
*/