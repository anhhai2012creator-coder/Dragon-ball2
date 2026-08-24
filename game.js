// Cấu hình thông số như cũ
let player = { level: 1, exp: 0, kc: 300, xu: 1000, vpnc: 1000, vntb: 2, inventory: [], giftcodesUsed: [] };
const db_characters = {
    'kangu': { name: 'Kangu', type: 'DEF', base_hp: 150000000, base_atk: 13275000, base_def: 6400, spd: 145, max_en: 4 },
    'mega_ner': { name: 'Mega Ner', type: 'ATK', base_hp: 220000000, base_atk: 14175000, base_def: 1900, spd: 150, max_en: 5 },
    'jaco': { name: 'Jaco', type: 'SKL', base_hp: 190000000, base_atk: 11475000, base_def: 3200, spd: 155, max_en: 4.5 }
};
let player_roster = [{ id: 'kangu', level: 1 }, { id: 'mega_ner', level: 1 }, { id: 'jaco', level: 1 }];
let player_team = ['kangu', 'mega_ner', 'jaco'];

// ==========================================
// HỆ THỐNG TOAST (Thay thế hoàn toàn alert)
// ==========================================
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerText = message;
    container.appendChild(toast);
    
    // Tự động xóa khỏi DOM sau 2 giây
    setTimeout(() => { toast.remove(); }, 2000);
}

// ==========================================
// HỆ THỐNG GIAO DIỆN & TIỆN ÍCH
// ==========================================
function updateUI() {
    document.getElementById('player-lv').innerText = player.level;
    document.getElementById('player-exp').innerText = player.exp;
    document.getElementById('res-kc').innerText = player.kc;
    document.getElementById('res-xu').innerText = player.xu;
    document.getElementById('res-vpnc').innerText = player.vpnc;
    document.getElementById('res-vntb').innerText = player.vntb;
}

function navTo(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    if(screenId === 'screen-stage') renderStages();
    if(screenId === 'screen-roster') renderRoster();
}

setInterval(() => {
    let now = new Date();
    let eventTimeElem = document.getElementById('event-time');
    if(eventTimeElem) eventTimeElem.innerText = "Giờ máy chủ: " + now.toLocaleString('vi-VN');
}, 1000);

// ==========================================
// SỰ KIỆN & GACHA
// ==========================================
function claimGiftcode() {
    let code = document.getElementById('giftcode-input').value.toUpperCase().trim();
    if(code === 'CODETUAN001' && !player.giftcodesUsed.includes(code)) {
        player.kc += 400;
        player.giftcodesUsed.push(code);
        showToast("Nhận thành công 400 Kim Cương!", "success");
        updateUI();
    } else {
        showToast("Code sai hoặc đã sử dụng!", "error");
    }
}

function switchGachaTab(tab, btnElem) {
    document.querySelectorAll('.gacha-content').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('gacha-tab-' + tab).classList.add('active');
    btnElem.classList.add('active');
}

function dailyLogin() { 
    player.kc += 50; player.xu += 100; 
    showToast("Điểm danh thành công! +50 KC, +100 Xu"); 
    updateUI(); 
}

function summon() {
    if(player.vntb < 1) return showToast("Không đủ Viên Ngọc Thần Bí!", "error");
    player.vntb -= 1;
    let roll = Math.random() * 100;
    
    if(roll < 50) { player.xu += 5000; showToast("Triệu hồi ra: 5000 Xu!"); }
    else if(roll < 90) { player.kc += 100; showToast("Triệu hồi ra: 100 Kim Cương!"); }
    else { showToast("Nhân phẩm bùng nổ! Nhận được Mảnh Tướng!", "warn"); }
    
    updateUI();
}

// ==========================================
// HỆ THỐNG ẢI & NÂNG CẤP TƯỚNG
// ==========================================
function renderStages() {
    let container = document.getElementById('chapters-container');
    container.innerHTML = "";
    for(let c = 1; c <= 5; c++) {
        let chapDiv = document.createElement('div');
        chapDiv.className = 'panel';
        chapDiv.innerHTML = `<h3>Chương ${c}</h3>`;
        let btnHTML = '';
        for(let s = 1; s <= 7; s++) {
            let bossTxt = (s === 7) ? " 💀" : "";
            btnHTML += `<button class="back-btn" style="display:inline-block; margin:5px; width:auto; background:#475569;" onclick="startBattle(${c}, ${s})">Ải ${s}${bossTxt}</button>`;
        }
        chapDiv.innerHTML += btnHTML;
        container.appendChild(chapDiv);
    }
}

function renderRoster() {
    let list = document.getElementById('roster-list');
    list.innerHTML = "";
    player_roster.forEach(char => {
        let db = db_characters[char.id];
        let cost = char.level * 100;
        
        // Tính toán nhẹ chỉ số tăng lên (Ví dụ)
        let hp = Math.floor(db.base_hp * (1 + char.level * 0.05));
        let atk = Math.floor(db.base_atk * (1 + char.level * 0.05));
        
        list.innerHTML += `
        <div class="char-card">
            <h3>${db.name} <span style="font-size:0.7em; color:#fff;">[${db.type}]</span></h3>
            <div class="char-stats">
                <b>Cấp độ:</b> ${char.level} / 250<br>
                <b>HP:</b> ${hp.toLocaleString()} <br>
                <b>ATK:</b> ${atk.toLocaleString()} <br>
                <b>DEF:</b> ${db.base_def}
            </div>
            <button class="upgrade-btn" onclick="upgradeChar('${char.id}')">Nâng cấp (${cost} ⭐)</button>
        </div>`;
    });
}

function upgradeChar(id) {
    let char = player_roster.find(c => c.id === id);
    let cost = char.level * 100;
    if(char.level >= 250) return showToast("Tướng đã đạt cấp 250 (MAX)!", "error");
    
    if(player.vpnc >= cost) {
        player.vpnc -= cost;
        char.level++;
        showToast(`Nâng cấp ${db_characters[id].name} lên Lv ${char.level} thành công!`);
        updateUI();
        renderRoster();
    } else {
        showToast(`Cần thêm ${cost - player.vpnc} VPNC để nâng cấp!`, "error");
    }
}

// ==========================================
// HỆ THỐNG CHIẾN ĐẤU (Không đổi logic cũ, chỉ ẩn thông báo)
// ==========================================
let battleInterval;

function startBattle(chapter, stage) {
    showToast(`Bắt đầu mô phỏng đánh Ải ${stage} - Chương ${chapter}`, "warn");
    navTo('screen-battle');
    document.getElementById('end-battle-btn').style.display = 'none';
    document.getElementById('battle-log').innerHTML = ''; // Reset log
    
    let allyTeam = initTeam(player_team, true);
    let enemyTeam = initTeam(['jaco', 'mega_ner', 'kangu'], false); 
    let allFighters = [...allyTeam, ...enemyTeam];
    allFighters.sort((a, b) => b.spd - a.spd);
    
    logBattle(`[Hệ Thống] Trận đấu bắt đầu!`);
    renderBattleArena(allyTeam, enemyTeam);
    
    let currentTurnIndex = 0;
    
    battleInterval = setInterval(() => {
        let aliveAllies = allyTeam.filter(c => c.hp > 0);
        let aliveEnemies = enemyTeam.filter(c => c.hp > 0);
        
        if(aliveAllies.length === 0 || aliveEnemies.length === 0) {
            clearInterval(battleInterval);
            let win = aliveAllies.length > 0;
            logBattle(`<br><b>====== KẾT QUẢ ======</b>`);
            logBattle(win ? `<span style="color:#10b981">🎉 CHIẾN THẮNG! +50 EXP</span>` : `<span style="color:#ef4444">💀 THẤT BẠI.</span>`);
            if(win) { player.exp += 50; updateUI(); }
            document.getElementById('end-battle-btn').style.display = 'block';
            return;
        }

        let actor = allFighters[currentTurnIndex % allFighters.length];
        currentTurnIndex++;
        if(actor.hp <= 0) return; 
        
        let targetTeam = actor.isAlly ? aliveEnemies : aliveAllies;
        let myTeam = actor.isAlly ? aliveAllies : aliveEnemies;
        
        if(actor.en >= actor.max_en) castActiveSkill(actor, targetTeam, myTeam);
        else castNormalAttack(actor, targetTeam, myTeam);
        
        renderBattleArena(allyTeam, enemyTeam);
        
    }, 1000);
}

function initTeam(ids, isAlly) {
    return ids.map((id, index) => {
        let db = db_characters[id];
        let charData = player_roster.find(c => c.id === id); // Lấy level thật của người chơi
        let lvl = isAlly ? charData.level : 1; // Bot mặc định lv 1
        
        let hp = Math.floor(db.base_hp * (1 + lvl * 0.05));
        let atk = Math.floor(db.base_atk * (1 + lvl * 0.05));

        return {
            id: id, name: db.name, isAlly: isAlly,
            hp: hp, max_hp: hp,
            atk: atk, def: db.base_def, spd: db.spd,
            en: db.id === 'mega_ner' ? 2 : 0, 
            max_en: db.max_en, pos: index + 1
        };
    });
}

function calcDamage(atk, mult, def) {
    let raw = atk * mult;
    let defRed = Math.min((def / 100) * 0.001, 0.9);
    return Math.floor(raw * (1 - defRed));
}

function castNormalAttack(actor, enemies, allies) {
    let target = enemies[0]; let dmg = 0;
    if(actor.id === 'kangu') { dmg = calcDamage(actor.atk, 0.85, target.def); target.hp -= dmg; actor.en += 1.7; logBattle(`🛡️ ${actor.name} chém ${target.name} (-${dmg.toLocaleString()} HP)`); } 
    else if(actor.id === 'mega_ner') { logBattle(`🔥 ${actor.name} tung đòn diện rộng!`); enemies.forEach(e => { dmg = calcDamage(actor.atk, 0.95, e.def); e.hp -= dmg; }); actor.en += 1.4; }
    else if(actor.id === 'jaco') { dmg = calcDamage(actor.atk, 0.88, target.def); target.hp -= dmg; actor.en += 1.2; logBattle(`✨ ${actor.name} bắn ${target.name} (-${dmg.toLocaleString()} HP)`); }
}

function castActiveSkill(actor, enemies, allies) {
    actor.en = 0; let target = enemies[0]; let dmg = 0;
    if(actor.id === 'kangu') { dmg = calcDamage(actor.atk, 2.0, target.def) + (target.hp * 0.05); target.hp -= dmg; logBattle(`☄️ <b>Kangu</b> phóng tia năng lượng (-${Math.floor(dmg).toLocaleString()} HP)`); }
    else if(actor.id === 'mega_ner') { dmg = calcDamage(actor.atk, 2.8, target.def); target.hp -= dmg; logBattle(`⚔️ <b>Mega Ner</b> dịch chuyển chém (-${dmg.toLocaleString()} HP)`); }
    else if(actor.id === 'jaco') { dmg = calcDamage(actor.atk, 1.05, target.def); target.hp -= dmg; let heal = actor.atk * 1.5; allies.forEach(a => { a.hp = Math.min(a.max_hp, a.hp + heal); }); logBattle(`🌿 <b>Jaco</b> tấn công và Hồi toàn đội (+${Math.floor(heal).toLocaleString()} HP)`); }
}

function logBattle(msg) {
    let logBox = document.getElementById('battle-log');
    logBox.innerHTML += `<div>${msg}</div>`;
    logBox.scrollTop = logBox.scrollHeight;
}

function renderBattleArena(allies, enemies) {
    let allyHtml = '', enemyHtml = '';
    allies.forEach(c => {
        let hpPct = Math.max(0, (c.hp / c.max_hp) * 100);
        allyHtml += `<div class="char-card" style="text-align:left;">
            <b>${c.name}</b> <small>(Vị trí ${c.pos})</small><br>
            <small style="color:#60a5fa">EN: ${c.en.toFixed(1)}/${c.max_en}</small>
            <div class="health-bar"><div class="health-fill" style="width:${hpPct}%"></div></div>
        </div>`;
    });
    enemies.forEach(c => {
        let hpPct = Math.max(0, (c.hp / c.max_hp) * 100);
        enemyHtml += `<div class="char-card" style="text-align:left;">
            <b>${c.name}</b> <small>(Vị trí ${c.pos})</small><br>
            <div class="health-bar"><div class="health-fill" style="width:${hpPct}%"></div></div>
        </div>`;
    });
    document.getElementById('team-player').innerHTML = allyHtml;
    document.getElementById('team-enemy').innerHTML = enemyHtml;
}

updateUI();
