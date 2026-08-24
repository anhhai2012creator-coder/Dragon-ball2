const GAME_CONSTANTS = {
  MAX_ACCOUNT_LEVEL: 150,
  MAX_HERO_LEVEL: 250,
  TICK_INTERVAL_MS: 1000,
  STARTER_RESOURCES: { diamonds: 300, coins: 1000, vpnc: 1000, vntb: 2 },
  DEF_REDUCTION_FACTOR: 100000 // DEF / 100,000
};

const HERO_TEMPLATES = {
  kangu: {
    id: "kangu", name: "Kangu", role: "DEF", avatar: "🛡️",
    baseStats: { hp: 150000000, atk: 13275000, def: 6400, spd: 145, maxEn: 4.0 },
    growth: { hp: 0.018, atk: 0.016, def: 25, spd: 0.2 },
    skills: {
      normal: { name: "Đòn Đập Khiên", atkPercent: 0.85, energyGain: 1.7 },
      active: { name: "Tia Năng Lượng Phá Giáp", energyCost: 4.0, atkPercent: 2.00, bonusHpRate: 0.05, healReduce: 0.40 }
    },
    passives: [
      { id: "kangu_p1", unlockLevel: 50, desc: "Mỗi 7% HP mất đi, ST tăng 1%." },
      { id: "kangu_p2", unlockLevel: 80, desc: "Đánh thường có 10% tỉ lệ làm Choáng 1 hiệp." },
      { id: "kangu_p3", unlockLevel: 100, desc: "75% tỉ lệ kỹ năng chủ động phóng thêm tia thứ 2 gây 75% ST." }
    ]
  },
  mega_ner: {
    id: "mega_ner", name: "Mega Ner", role: "ATK", avatar: "⚔️",
    baseStats: { hp: 220000000, atk: 14175000, def: 1900, spd: 150, maxEn: 5.0 },
    growth: { hp: 0.016, atk: 0.022, def: 12, spd: 0.25 },
    skills: {
      normal: { name: "Nộ Hoả Quét Sạch", atkPercent: 0.95, energyGain: 1.4, isAoE: true },
      active: { name: "Dịch Chuyển Trảm", energyCost: 5.0, atkPercent: 2.80, selfBuff: 0.15 }
    },
    passives: [
      { id: "mega_p1", unlockLevel: 50, desc: "Đầu trận nhận sẵn 2 năng lượng." },
      { id: "mega_p2", unlockLevel: 80, desc: "Nhận hiệu ứng 'Song Bích' (+15% ATK, +10% SPD)." },
      { id: "mega_p3", unlockLevel: 100, desc: "Khi HP dưới 20%, tăng 10% ST." }
    ]
  },
  jaco: {
    id: "jaco", name: "Jaco", role: "SKL", avatar: "✨",
    baseStats: { hp: 190000000, atk: 11475000, def: 3200, spd: 155, maxEn: 4.5 },
    growth: { hp: 0.017, atk: 0.018, def: 18, spd: 0.3 },
    skills: {
      normal: { name: "Ánh Sáng Ban Phước", atkPercent: 0.88, energyGain: 1.2, markHp: true },
      active: { name: "Đại Phục Hồi Thần Thánh", energyCost: 4.5, atkPercent: 1.05, teamHealPercent: 1.50 }
    },
    passives: [
      { id: "jaco_p1", unlockLevel: 50, desc: "Khi dùng kỹ năng chủ động, 1 đồng đội nhận +18% ST 1 hiệp." },
      { id: "jaco_p2", unlockLevel: 80, desc: "Đồng đội < 50% HP nhận thêm +20% hồi phục từ Jaco." },
      { id: "jaco_p3", unlockLevel: 100, desc: "Đồng đội có 3 dấu 'HP' nhận thêm +10% hồi phục." }
    ]
  }
};

const HIDDEN_GIFTCODES = {
  "CODETUAN001": { diamonds: 400, coins: 2000, vpnc: 500, vntb: 1 }
};
