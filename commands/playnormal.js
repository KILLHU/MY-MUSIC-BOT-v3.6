const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const db = require("../mongoDB");
module.exports = {
  name: "playsong",
  description: "เล่นเพลง",
  permissions: "0x0000000000000800",
  options: [
    {
      name: "normal",
      description: "เปิดเพลงจากแพลตฟอร์มอื่น",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "name",
          description: "เขียนชื่อเพลงของคุณ",
          type: ApplicationCommandOptionType.String,
          required: true
        }
      ]
    },
    {
      name: "playlist",
      description: "เขียนชื่อเพลย์ลิสต์ของคุณ",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "name",
          description: "เขียนชื่อเพลย์ลิสต์ที่คุณต้องการสร้าง",
          type: ApplicationCommandOptionType.String,
          required: true
        }
      ]
    },
  ],
  voiceChannel: true,
  run: async (client, interaction) => {




    try {
      let stp = interaction.options.getSubcommand()

      if (stp === "playlist") {
        let playlistw = interaction.options.getString('name')
        let playlist = await db?.playlist?.find().catch(e => { })
        if (!playlist?.length > 0) return interaction.reply({ content: `ไม่มีเพลย์ลิสต์ ❌`, ephemeral: true }).catch(e => { })

        let arr = 0
        for (let i = 0; i < playlist.length; i++) {
          if (playlist[i]?.playlist?.filter(p => p.name === playlistw)?.length > 0) {

            let playlist_owner_filter = playlist[i].playlist.filter(p => p.name === playlistw)[0].author
            let playlist_public_filter = playlist[i].playlist.filter(p => p.name === playlistw)[0].public

            if (playlist_owner_filter !== interaction.member.id) {
              if (playlist_public_filter === false) {
                return interaction.reply({ content: `คุณไม่ได้รับอนุญาตให้เล่นเพลย์ลิสต์นี้ ❌`, ephemeral: true }).catch(e => { })
              }
            }

            const music_filter = playlist[i]?.musics?.filter(m => m.playlist_name === playlistw)
            if (!music_filter?.length > 0) return interaction.reply({ content: `No music with Name`, ephemeral: true }).catch(e => { })
                const listembed = new EmbedBuilder()
                .setTitle('กำลังโหลดอัลบั้มของคุณ')
                .setColor('#FF0000')
                .setDescription('**🎸 เตรียมพร้อมสำหรับการเดินทางทางดนตรี!**');
            interaction.reply({ content : '', embeds: [listembed] }).catch(e => { })

            let songs = []
            music_filter.map(m => songs.push(m.music_url))

            setTimeout(async () => {
              const playl = await client?.player?.createCustomPlaylist(songs, {
                member: interaction.member,
                properties: { name: playlistw, source: "custom" },
                parallel: true
              });
              const qembed = new EmbedBuilder()
        .setAuthor({
        name: 'เพิ่มเพลงอัลบั้มลงในคิว',
        iconURL: 'https://cdn.discordapp.com/attachments/1156866389819281418/1157218651179597884/1213-verified.gif', 
        url: 'https://discord.gg/FUEHs7RCqz'
    })
        .setColor('#14bdff')
        .setFooter({ text: 'ใช้ /queue เพื่อดูคิวเพลง' });

              await interaction.editReply({ content: '',embeds: [qembed] }).catch(e => {
                  console.error('Error  reply:', e);
                });

              try {
                await client.player.play(interaction.member.voice.channel, playl, {
                  member: interaction.member,
                  textChannel: interaction.channel,
                  interaction
                })
              } catch (e) {
                await interaction.editReply({ content: `❌ ไม่พบผลลัพธ์!!`, ephemeral: true }).catch(e => { })
              }

              playlist[i]?.playlist?.filter(p => p.name === playlistw).map(async p => {
                await db.playlist.updateOne({ userID: p.author }, {
                  $pull: {
                    playlist: {
                      name: playlistw
                    }
                  }
                }, { upsert: true }).catch(e => { })

                await db.playlist.updateOne({ userID: p.author }, {
                  $push: {
                    playlist: {
                      name: p.name,
                      author: p.author,
                      authorTag: p.authorTag,
                      public: p.public,
                      plays: Number(p.plays) + 1,
                      createdTime: p.createdTime
                    }
                  }
                }, { upsert: true }).catch(e => { })
              })
            }, 3000)
          } else {
            arr++
            if (arr === playlist.length) {
              return interaction.reply({ content: `ไม่มีอัลบั้ม ❌`, ephemeral: true }).catch(e => { })
            }
          }
        }
      }

      if (stp === "normal") {
  const name = interaction.options.getString('name');
  if (!name) {
    return interaction.reply({ content: '▶️ ให้ข้อความหรือลิงค์', ephemeral: true }).catch(e => {});
  }

  const embed = new EmbedBuilder()
    .setColor('#FF0000')
    .setDescription('**🎸 เตรียมพร้อมสำหรับการเดินทางทางดนตรี!**');

  await interaction.reply({ embeds: [embed] }).catch(e => {});

  try {
    await client.player.play(interaction.member.voice.channel, name, {
      member: interaction.member,
      textChannel: interaction.channel,
      interaction
    });
  } catch (e) {
    const errorEmbed = new EmbedBuilder()
      .setColor('#FF0000')
      .setDescription('❌ ไม่พบผลลัพธ์!!');

    await interaction.editReply({ embeds: [errorEmbed], ephemeral: true }).catch(e => {});
  }
}

    }  catch (e) {
    console.error(e); 
  }
  },
};