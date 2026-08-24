class CombatUnit {
  // ...
  getDefDamageReduction() {
    const def = this.getDef();
    // Cứ 100 DEF giảm 0.1% ST => DEF / 100,000
    const reduction = def / _GAME_CONSTANTS.DEF_REDUCTION_FACTOR;
    return Math.min(0.90, reduction);
  }

  takeDamage(rawDamage, attacker = null) {
    const reduction = this.getDefDamageReduction();
    const finalDamage = Math.max(1, Math.floor(rawDamage * (1 - reduction)));
    this.currentHp = Math.max(0, this.currentHp - finalDamage);
    return { finalDamage, isDead: !this.isAlive(), reductionPercent: (reduction * 100).toFixed(1) };
  }

  heal(amount, healer = null) {
    let effectiveAmount = amount * this.getHealingMultiplier();
    // Jaco P2 (Lv 80): Đồng đội < 50% HP tăng thêm 20% lượng hồi phục từ Jaco
    if (healer && healer.heroId === "jaco" && healer.level >= 80 && (this.currentHp / this.maxHp) < 0.50) {
      effectiveAmount *= 1.20;
    }
    // Jaco P3 (Lv 100): Đồng đội đủ 3 dấu "HP" tăng thêm 10% lượng hồi phục
    if (healer && healer.heroId === "jaco" && healer.level >= 100 && this.hpMarks >= 3) {
      effectiveAmount *= 1.10;
    }
    const actualHeal = Math.min(this.maxHp - this.currentHp, Math.floor(effectiveAmount));
    this.currentHp = Math.min(this.maxHp, this.currentHp + actualHeal);
    return actualHeal;
  }
}
