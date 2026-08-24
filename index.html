// Dữ liệu người chơi
let player = {
    level: 1, exp: 0,
    kc: 300, xu: 1000, vpnc: 1000, vntb: 2,
    inventory: [],
    giftcodesUsed: []
};

// Cơ sở dữ liệu tướng chuẩn
const db_characters = {
    'kangu': { name: 'Kangu', type: 'DEF', base_hp: 150000000, base_atk: 13275000, base_def: 6400, spd: 145, max_en: 4 },
    'mega_ner': { name: 'Mega Ner', type: 'ATK', base_hp: 220000000, base_atk: 14175000, base_def: 1900, spd: 150, max_en: 5 },
    'jaco': { name: 'Jaco', type: 'SKL', base_hp: 190000000, base_atk: 11475000, base_def: 3200, spd: 155, max_en: 4.5 }
};

// Đội hình sở hữu của người chơi
let player_roster = [
    { id: 'kangu', level: 1 },
    { id: 'mega_ner', level: 1 },
    { id: 'jaco', level: 1 }
];

let player_team = ['kangu', 'mega_ner', 'jaco']; // Đội hình ra trận (Vị trí 1, 2, 3)

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

// Cập nhật ngày giờ thực tế cho mục Sự kiện
setInterval(() => {
    let now = new Date();
    let eventTimeElem = document.getElementById('event-time');
    if(eventTimeElem) eventTimeElem.innerText = "Thời gian Server: " + now.toLocaleString('vi-VN');
}, 1000);

// ==========================================
// HỆ THỐNG SỰ KIỆN & GIFTCODE
// ==========================================
function claimGiftcode() {
    let code = document.getElementById('giftcode-input').value.toUpperCase().trim();
    if(code === 'CODETUAN001' && !player.giftcodesUsed.includes(code)) {
        player.kc += 400;
        player.giftcodesUsed.push(code);
        alert("Sử dụng Giftcode thành công! Bạn nhận được 400 Kim Cương.");
        updateUI();
    } else {
        alert("Giftcode không hợp lệ hoặc đã được sử dụng!");
    }
}

// ==========================================
// HỆ THỐNG TRIỆU HỒI (GACHA)
// ==========================================
function switchGachaTab(tab) {
    document.querySelectorAll('.gacha-content').forEach(s => s.classList.remove('active'));
    document.getElementById('gacha-tab-' + tab).classList.add('active');
}

function dailyLogin() { alert("Điểm danh thành công! Nhận 50 KC, 100 Xu."); player.kc+=50; player.xu+=100; updateUI(); }

function summon() {
    if(player.vntb < 1) return alert("Không đủ Viên Ngọc Thần Bí (VNTB)!");
    player.vntb -= 1;
    let roll = Math.random() * 100;
    let resText = "";
    
    // Tỉ lệ: 50% ra Xu, 40% ra KC, 10% ra Mảnh Tướng (Ví dụ đơn giản)
    if(roll < 50) { player.xu += 5000; resText = "Nhận được 5000 Xu!"; }
    else if(roll < 90) { player.kc += 100; resText = "Nhận được 100 Kim Cương!"; }
    else { resText = "Wow! Bạn nhận được Mảnh Tướng ngẫu nhiên!"; }
    
    document.getElementById('summon-result').innerText = resText;
    updateUI();
}

// ==========================================
// HỆ THỐNG ẢI & NÂNG CẤP
// ==========================================
function renderStages() {
    let container = document.getElementById('chapters-container');
    container.innerHTML = "";
    for(let c = 1; c <= 5; c++) {
        let chapDiv = document.createElement('div');
        chapDiv.className = 'chapter';
        chapDiv.innerHTML = `<h3>Chương ${c}</h3>`;
        for(let s = 1; s <= 7; s++) {
            let bossTxt = (s === 7) ? " (BOSS)" : "";
            chapDiv.innerHTML += `<button class="stage-btn" onclick="startBattle(${c}, ${s})">Ải ${s}${bossTxt} - Chưa hoạt động</button>`;
        }
        container.appendChild(chapDiv);
    }
}

function renderRoster() {
    let list = document.getElementById('roster-list');
    list.innerHTML = "";
    player_roster.forEach(char => {
        let db = db_characters[char.id];
        list.innerHTML += `<div class="char-card">
            <b>${db.name}</b> (${db.type}) - Lv: ${char.level}<br>
            HP: ${db.base_hp} | ATK: ${db.base_atk} | DEF: ${db.base_def}<br>
            <button onclick="upgradeChar('${char.id}')">Nâng cấp (Tốn VPNC)</button>
        </div>`;
    });
}

function upgradeChar(id) {
    let char = player_roster.find(c => c.id === id);
    let cost = char.level * 100; // Công thức tính cost cơ bản
    if(char.level >= 250) return alert("Tướng đã đạt cấp tối đa!");
    if(player.vpnc >= cost) {
        player.vpnc -= cost;
        char.level++;
        alert(`Nâng cấp ${db_characters[id].name} lên Lv ${char.level} thành công!`);
        updateUI();
        renderRoster();
    } else {
        alert(`Không đủ VPNC! Cần ${cost} VPNC.`);
    }
}

// ==========================================
// HỆ THỐNG CHIẾN ĐẤU (BATTLE ENGINE)
// ==========================================
let battleInterval;

function startBattle(chapter, stage) {
    alert(`Bạn đã bấm vào Ải ${stage} Chương ${chapter}. Hệ thống ải hiện Đang Phát Triển. Bắt đầu mô phỏng đánh thử với Bot mặc định!`);
    navTo('screen-battle');
    document.getElementById('end-battle-btn').style.display = 'none';
    
    // Khởi tạo thực thể chiến đấu
    let allyTeam = initTeam(player_team, true);
    let enemyTeam = initTeam(['jaco', 'mega_ner', 'kangu'], false); // Bot
    
    let allFighters = [...allyTeam, ...enemyTeam];
    // Sắp xếp tốc độ đánh (SPD cao đánh trước)
    allFighters.sort((a, b) => b.spd - a.spd);
    
    // Đầu trận random đội đi trước (Boost nhẹ tốc độ tạm thời cho đội đó)
    let firstStrikeTeam = Math.random() > 0.5 ? 'ally' : 'enemy';
    logBattle(`[Hệ Thống] Đội ${firstStrikeTeam === 'ally' ? 'Người Chơi' : 'Kẻ Địch'} giành quyền ra tay trước!`);
    
    renderBattleArena(allyTeam, enemyTeam);
    
    let currentTurnIndex = 0;
    
    // Auto Combat Loop (1s / 1 hành động)
    battleInterval = setInterval(() => {
        let aliveAllies = allyTeam.filter(c => c.hp > 0);
        let aliveEnemies = enemyTeam.filter(c => c.hp > 0);
        
        // Check Win/Lose
        if(aliveAllies.length === 0 || aliveEnemies.length === 0) {
            clearInterval(battleInterval);
            let win = aliveAllies.length > 0;
            logBattle(`====== TRẬN ĐẤU KẾT THÚC ======`);
            logBattle(win ? `🎉 CHIẾN THẮNG! Nhận 50 EXP.` : `💀 THẤT BẠI.`);
            if(win) { player.exp += 50; updateUI(); }
            document.getElementById('end-battle-btn').style.display = 'block';
            return;
        }

        // Lấy nhân vật đánh lượt này
        let actor = allFighters[currentTurnIndex % allFighters.length];
        currentTurnIndex++;
        
        if(actor.hp <= 0) return; // Đã chết thì bỏ qua
        
        let targetTeam = actor.isAlly ? aliveEnemies : aliveAllies;
        let myTeam = actor.isAlly ? aliveAllies : aliveEnemies;
        
        // Logic ra chiêu
        if(actor.en >= actor.max_en) {
            castActiveSkill(actor, targetTeam, myTeam);
        } else {
            castNormalAttack(actor, targetTeam, myTeam);
        }
        
        renderBattleArena(allyTeam, enemyTeam);
        
    }, 1000);
}

function initTeam(ids, isAlly) {
    return ids.map((id, index) => {
        let db = db_characters[id];
        // Trong thực tế sẽ scale chỉ số theo level, ở đây lấy base
        return {
            id: id, name: db.name, isAlly: isAlly,
            hp: db.base_hp, max_hp: db.base_hp,
            atk: db.base_atk, def: db.base_def, spd: db.spd,
            en: db.id === 'mega_ner' ? 2 : 0, // Mega Ner Passive 1: Start 2 EN (Lv50)
            max_en: db.max_en,
            pos: index + 1 // 1: Front, 2: Back, 3: Side
        };
    });
}

function calcDamage(atk, skillMultiplier, targetDef) {
    let rawDmg = atk * skillMultiplier;
    // Cứ 100 DEF giảm 0.1% ST => DEF * 0.001 % giảm
    let defReductionPercent = (targetDef / 100) * 0.001; 
    if(defReductionPercent > 0.9) defReductionPercent = 0.9; // Max 90% giảm ST
    return Math.floor(rawDmg * (1 - defReductionPercent));
}

function castNormalAttack(actor, enemies, allies) {
    let target = enemies[0]; // Mặc định đánh vị trí 1
    let dmg = 0;
    
    if(actor.id === 'kangu') {
        dmg = calcDamage(actor.atk, 0.85, target.def);
        target.hp -= dmg;
        actor.en += 1.7;
        logBattle(`🛡️ ${actor.name} chém ${target.name} gây ${dmg} ST.`);
    } 
    else if(actor.id === 'mega_ner') {
        logBattle(`🔥 ${actor.name} tung đòn diện rộng!`);
        enemies.forEach(e => {
            dmg = calcDamage(actor.atk, 0.95, e.def);
            e.hp -= dmg;
        });
        actor.en += 1.4;
    }
    else if(actor.id === 'jaco') {
        dmg = calcDamage(actor.atk, 0.88, target.def);
        target.hp -= dmg;
        actor.en += 1.2;
        logBattle(`✨ ${actor.name} bắn ${target.name} gây ${dmg} ST, đánh dấu HP!`);
    }
}

function castActiveSkill(actor, enemies, allies) {
    actor.en = 0; // Xoá Năng lượng
    let target = enemies[0];
    let dmg = 0;
    logBattle(`💥 [KỸ NĂNG] ${actor.name} kích hoạt tuyệt chiêu!`);
    
    if(actor.id === 'kangu') {
        dmg = calcDamage(actor.atk, 2.0, target.def) + (target.hp * 0.05); // 200% ATK + 5% HP còn lại
        target.hp -= dmg;
        logBattle(`☄️ Kangu phóng tia năng lượng gây ${Math.floor(dmg)} ST, gây Suy Giảm!`);
    }
    else if(actor.id === 'mega_ner') {
        dmg = calcDamage(actor.atk, 2.8, target.def);
        target.hp -= dmg;
        logBattle(`⚔️ Mega Ner dịch chuyển chém ${target.name} gây ${dmg} ST!`);
    }
    else if(actor.id === 'jaco') {
        dmg = calcDamage(actor.atk, 1.05, target.def);
        target.hp -= dmg;
        let heal = actor.atk * 1.5; // Hồi 150% ATK
        allies.forEach(a => { a.hp += heal; if(a.hp > a.max_hp) a.hp = a.max_hp; });
        logBattle(`🌿 Jaco gây ${dmg} ST và Hồi toàn đội ${heal} HP!`);
    }
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
        allyHtml += `<div class="char-card">
            <b>${c.name}</b> (Pos ${c.pos})<br>
            EN: ${c.en.toFixed(1)} / ${c.max_en}<br>
            <div class="health-bar"><div class="health-fill" style="width:${hpPct}%"></div></div>
        </div>`;
    });
    
    enemies.forEach(c => {
        let hpPct = Math.max(0, (c.hp / c.max_hp) * 100);
        enemyHtml += `<div class="char-card" style="border-color:#e74c3c;">
            <b>${c.name}</b> (Pos ${c.pos})<br>
            <div class="health-bar"><div class="health-fill" style="width:${hpPct}%"></div></div>
        </div>`;
    });
    
    document.getElementById('team-player').innerHTML = allyHtml;
    document.getElementById('team-enemy').innerHTML = enemyHtml;
}

// Khởi chạy UI ban đầu
updateUI();
