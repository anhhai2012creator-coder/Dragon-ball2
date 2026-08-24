class CombatUnit {
  // ...
  // Hào quang giảm sát thương toàn đội từ F.Hit (Bị động 3)
  getTeamAuraReduction(myTeam) {
    if (!myTeam) return 0;
    const hitUnit = myTeam.find(u => u.heroId === "hit" && u.isAlive());
    if (!hitUnit || hitUnit.level < 100) return 0;

    let reduction = 0.05; // 5% cơ bản
    const hasDeadAlly = myTeam.some(u => !u.isAlive());
    if (hasDeadAlly || hitUnit.hasRevived) {
      reduction += 0.08; // Tăng thêm 8% (tổng 13%)
    }
    return reduction;
  }

  takeDamage(rawDamage, attacker = null, myTeam = null) {
    const defReduction = this.getDefDamageReduction();
    const auraReduction = this.getTeamAuraReduction(myTeam);
    const totalReduction = Math.min(0.95, defReduction + auraReduction);
    const finalDamage = Math.max(1, Math.floor(rawDamage * (1 - totalReduction)));

    // Bị động 1 của F.Hit: Hồi sinh nhận 80% HP tối đa (1 lần/trận)
    if (this.currentHp - finalDamage <= 0 && this.heroId === "hit" && !this.hasRevived && this.level >= 50) {
      this.hasRevived = true;
      this.currentHp = Math.floor(this.maxHp * 0.80);
      return { finalDamage, isDead: false, revived: true, reductionPercent: (totalReduction * 100).toFixed(1) };
    }

    this.currentHp = Math.max(0, this.currentHp - finalDamage);
    return { finalDamage, isDead: !this.isAlive(), revived: false, reductionPercent: (totalReduction * 100).toFixed(1) };
  }

  // Xử lý sát thương DoT Ăn Mòn đầu mỗi hiệp
  processTurnStartDoT(callbacks) {
    if (!this.isAlive() || this.corrosionStacks <= 0) return;
    
    const dmgPerStack = Math.min(this.maxHp * 0.03, this.corrosionCasterAtk * 0.23);
    const totalCorrosionDmg = Math.max(1, Math.floor(dmgPerStack * this.corrosionStacks));
    this.currentHp = Math.max(0, this.currentHp - totalCorrosionDmg);
    
    callbacks.onDamage(this, totalCorrosionDmg, false, "corrosion");
    callbacks.onLog(`   ☣️ [${this.name}] chịu ${totalCorrosionDmg.toLocaleString()} ST từ [ĂN MÒN] (${this.corrosionStacks} tầng).`);
    
    this.corrosionDuration--;
    if (this.corrosionDuration <= 0) this.corrosionStacks = 0;
  }
}
