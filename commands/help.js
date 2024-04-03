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
const { ApplicationCommandOptionType } = require('discord.js');
const db = require("../mongoDB");

const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { ButtonStyle } = require('discord.js');

module.exports = {
  name: "help",
  description: "รับข้อมูลเกี่ยวกับบอทและคำสั่ง.",
  permissions: "0x0000000000000800",
  options: [],

  run: async (client, interaction) => {
    try {
      const musicCommandsEmbed = new EmbedBuilder()
        .setColor(client.config.embedColor)
        .setTitle('🎸 **คำสั่งสำหรับเล่นเพลง**')
        .addFields(
          { name: '🎹 /play normal', value: 'สตรีมเพลงจากลิงก์ที่กำหนดหรือชื่อเพลงที่ให้มา' },
          { name: '🔎 /search', value: 'ค้นหาเพลงจากYoutubeและเล่นเพลงจากรายการที่เลือก โดยมีให้เลือก10รายการ' },
          { name: '⏹️ /stop', value: 'ทำให้บอทหยุดเล่นเพลง' },
          { name: '📊 /queue', value: 'ดูและจัดการคิวเพลงของเซิร์ฟเวอร์นี้' },
          { name: '⏭️ /skip', value: 'ข้ามเพลงที่กำลังเล่นอยู่' },
          { name: '⏸️ /pause', value: 'หยุดเพลงที่กำลังเล่นชั่วคราว' },
          { name: '▶️ /resume', value: 'เล่นเพลงที่หยุดชั่วคราวปัจจุบันต่อ' },
          { name: '🔁 /loop', value: 'สลับโหมดวนซ้ำสำหรับคิวและเพลงปัจจุบัน' },
          { name: '🔄 /autoplay', value: 'เปิดหรือปิดการเล่นอัตโนมัติ [เล่นเพลงแบบสุ่ม]' },
          { name: '⏩ /seek', value: 'ค้นหาเวลาที่เจาะจงในเพลงปัจจุบัน' },
          { name: '⏮️ /previous', value: 'เล่นเพลงก่อนหน้าในคิว' },
          { name: '🔀 /shuffle', value: 'สุ่มเพลงในคิว' },
          { name: '📑 playlist', value: 'จัดการเพลย์ลิสต์' },
          { name: '🎹 /play playlist', value: 'เล่นเพลงจากplaylistที่คุณสร้างไว้' },
          { name: '📃 /playlist create', value: 'สร้างplaylistของคุณเอง' },
          { name: '📝 /playlist add-music', value: 'เพิ่มเพลงลงในplaylistที่คุณสร้างไว้' },
          { name: '🗑 /playlist delete', value: 'ลบplaylistที่คุณสร้าง' },
          { name: '📄 /playlist list', value: 'เรียกดูเพลงในplaylistของคุณ' },
        )
        .setImage(`https://cdn.discordapp.com/attachments/1004341381784944703/1165201249331855380/RainbowLine.gif?ex=654f37ba&is=653cc2ba&hm=648a2e070fab36155f4171962e9c3bcef94857aca3987a181634837231500177&`); 

      const basicCommandsEmbed = new EmbedBuilder()
        .setColor(client.config.embedColor)
        .setTitle('✨ **คำสั่งพื้นฐาน**')
        .addFields(
          { name: '🏓 Ping', value: "เช็คปิงหรือเวลาแฝงของบอท" },
          { name: '🗑️ Clear', value: 'ล้างคิวเพลงของเซิร์ฟเวอร์นี้' },
          { name: '⏱️ Time', value: 'แสดงเวลาเล่นเพลงปัจจุบัน' },
          { name: '🎧 Filter', value: 'ใช้ฟิลเตอร์เพื่อเพิ่มคุณภาพเสียงตามที่คุณต้องการ' },
           { name: '🎵 Now Playing', value: 'แสดงข้อมูลเพลงที่กำลังเล่นอยู่' },
          { name: '🔊 Volume', value: 'ปรับระดับเสียงเพลง [ การได้ยินที่ระดับเสียงสูงมีความเสี่ยง ]' }
        ) 
        .setImage(`https://lh3.googleusercontent.com/pw/AP1GczOw9HA27PmQGezP_S-BU2J1Na6LRLXQ5qHcz9vxk0Xs4nDYug-p4HugXrLbKPNN52cVk_ZBIr4P6iQ_dZFpai1M8OVeIxZUBRyCBFVomi1ssCFgudV0_3J1z73vQR1_COCGDPo9D2Ksx9Hi1kkGWD7HqA=w1080-h606-s-no-gm`);

await interaction.reply({
        embeds: [musicCommandsEmbed, basicCommandsEmbed]
      });
    } catch (e) {
      console.error(e);
    }
  },
};

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
