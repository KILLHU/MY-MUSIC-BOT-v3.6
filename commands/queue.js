const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const db = require("../mongoDB");

module.exports = {
  name: "queue",
  description: "แสดงรายการคิวเพลง",
  permissions: "0x0000000000000800",
  options: [],
  run: async (client, interaction) => {
    try {
      const queue = client.player.getQueue(interaction.guild.id);
      if (!queue || !queue.playing) {
        return interaction.reply({ content: '⚠️ไม่พบเพลงที่กำลังเล่น', ephemeral: true }).catch(e => console.error(e));
      }
      if (!queue.songs[1]) {
        return interaction.reply({ content: '⚠️ คิวว่าง!!', ephemeral: true }).catch(e => console.error(e));
      }

      const trackl = queue.songs.slice(1).map((track, i) => ({
        title: track.name,
        author: track.uploader.name,
        user: track.user,
        url: track.url,
        duration: track.duration
      }));

      const backId = "emojiBack";
      const forwardId = "emojiForward";
      const backButton = new ButtonBuilder({
        style: ButtonStyle.Secondary,
        emoji: "⬅️",
        customId: backId
      });

      const deleteButton = new ButtonBuilder({
        style: ButtonStyle.Secondary,
        emoji: "❌",
        customId: "close"
      });

      const forwardButton = new ButtonBuilder({
        style: ButtonStyle.Secondary,
        emoji: "➡️",
        customId: forwardId
      });

      let itemsPerPage = 8;
      let page = 1;
      let totalPages = Math.ceil(trackl.length / itemsPerPage);

      const generateEmbed = async (start) => {
        let index = start + 1;
        const current = trackl.slice(start, start + itemsPerPage);
        if (current.length === 0) {
          return interaction.editReply({ content: '⚠️ คิวว่าง!!', ephemeral: true }).catch(e => console.error(e));
        }
        return new EmbedBuilder()
          .setTitle(`${interaction.guild.name} Queue`)
          .setThumbnail(interaction.guild.iconURL({ size: 2048, dynamic: true }))
          .setColor(client.config.embedColor)
          .setDescription(`▶️ ตอนนี้กำลังเล่น: \`${queue.songs[0].name}\`
            ${current.map((data, i) => `\n\`${index + i}\` | [${data.title}](${data.url}) | (ขอเพลงโดย <@${data.user.id}>)`).join('')}`)
          .setFooter({ text: `Page ${page}/${totalPages}` });
      }

      const canFitOnOnePage = trackl.length <= itemsPerPage;

      await interaction.reply({
        embeds: [await generateEmbed(0)],
        components: canFitOnOnePage
          ? []
          : [new ActionRowBuilder({ components: [deleteButton, forwardButton] })],
        fetchReply: true
      }).then(async Message => {
        const filter = i => i.user.id === interaction.user.id;
        const collector = Message.createMessageComponentCollector({ filter, time: 120000 });

        let currentIndex = 0;
        collector.on("collect", async (button) => {
          if (button.customId === "close") {
            collector.stop();
            return button.reply({ content: 'Command Cancelled', ephemeral: true }).catch(e => console.error(e));
          } else {
            if (button.customId === backId) {
              page--;
              currentIndex -= itemsPerPage;
            }
            if (button.customId === forwardId) {
              page++;
              currentIndex += itemsPerPage;
            }

            await interaction.editReply({
              embeds: [await generateEmbed(currentIndex)],
              components: [
                new ActionRowBuilder({
                  components: [
                    ...(currentIndex > 0 ? [backButton] : []),
                    deleteButton,
                    ...(currentIndex + itemsPerPage < trackl.length ? [forwardButton] : []),
                  ],
                }),
              ],
            }).catch(e => console.error(e));
            await button.deferUpdate().catch(e => console.error(e));
          }
        });

        collector.on("end", async () => {
          const disabledButtons = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setEmoji("⬅️")
              .setCustomId(backId)
              .setDisabled(true),
            new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setEmoji("❌")
              .setCustomId("close")
              .setDisabled(true),
            new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setEmoji("➡️")
              .setCustomId(forwardId)
              .setDisabled(true)
          );

          const embed = new EmbedBuilder()
            .setTitle('Command Timeout')
            .setColor(`#ecfc03`)
            .setDescription('▶️ ดำเนินการคำสั่งคิวอีกครั้ง!!');
          return interaction.editReply({ embeds: [embed], components: [disabledButtons] }).catch(e => console.error(e));
        });
      }).catch(e => console.error(e));
    } catch (e) {
      console.error(e);
    }
  }
};