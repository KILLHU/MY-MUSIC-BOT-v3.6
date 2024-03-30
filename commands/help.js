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
          { name: '🎹 Play', value: 'สตรีมเพลงจากลิงก์ที่กำหนดหรือข้อความจากแหล่งที่มา' },
          { name: '⏹️ Stop', value: 'ทำให้บอทหยุดเล่นเพลงและทิ้งเสียงไว้' },
          { name: '📊 Queue', value: 'ดูและจัดการคิวเพลงของเซิร์ฟเวอร์นี้' },
          { name: '⏭️ Skip', value: 'ข้ามเพลงที่กำลังเล่นอยู่' },
          { name: '⏸️ Pause', value: 'หยุดเพลงที่กำลังเล่นชั่วคราว' },
          { name: '▶️ Resume', value: 'เล่นเพลงที่หยุดชั่วคราวปัจจุบันต่อ' },
          { name: '🔁 Loop', value: 'สลับโหมดวนซ้ำสำหรับคิวและเพลงปัจจุบัน' },
          { name: '🔄 Autoplay', value: 'เปิดหรือปิดการเล่นอัตโนมัติ [เล่นเพลงแบบสุ่ม]' },
          { name: '⏩ Seek', value: 'ค้นหาเวลาที่เจาะจงในเพลงปัจจุบัน' },
          { name: '⏮️ Previous', value: 'เล่นเพลงก่อนหน้าในคิว' },
          { name: '🔀 Shuffle', value: 'สุ่มเพลงในคิว' },
          { name: '📃 playlist', value: 'จัดการเพลย์ลิสต์' }
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
        .setImage(`https://lh3.googleusercontent.com/pw/AP1GczMEVh6rthROR9I-Q5mu-akyZ8_kt8zzhBsxvIe1IWXXt7AhpTeDiTIMeL1MpMYnuDOhfEHPc5FV_13-jzgZ3F74lf7hx8sClKnDVld0Iu5lma1dYsy8e-NUKDipAlwdmWFT6okl8KgcjberU9S5fW5Wvg=w1080-h606-s-no-gm?authuser=0`);

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
