/* ─────────────────────────────────────────
   INTELLEKT DUELI – game.js
   Savollarni questions.js yoki localStorage orqali qo'shing.
   ───────────────────────────────────────── */

'use strict';

// ═══════════════════════════════════════════
// QUESTIONS — bu yerga o'z savollaringizni yozing
// Har bir savol quyidagi formatda bo'lishi kerak:
// {
//   id: "q1",                         // noyob id
//   question: "Savol matni?",          // savol
//   answers: ["A","B","C","D"],        // 2 dan 4 tagacha javob
//   correct: 0,                        // to'g'ri javob indeksi (0=A)
//   topic: "history",                  // mavzu (ixtiyoriy)
//   difficulty: "medium"               // "easy" | "medium" | "hard"
// }
// ═══════════════════════════════════════════
const DEFAULT_QUESTIONS = [
  {id:"q1", question:"Jaloliddin Manguberdi to‘liq ismi?", answers:["Jalol ad-Din Abu-l-Muzaffar Manguberdi","Jaloliddin Xorazmshoh","Muhammad ibn Tekish","Alouddin Xorazmiy"], correct:0, topic:"history", difficulty:"medium"},
  {id:"q2", question:"'Manguberdi' so‘zi ma'nosi?", answers:["Tug‘ma dog‘li","Temir qo‘l","Botir yurak","Qilich ustasi"], correct:0, topic:"history", difficulty:"easy"},
  {id:"q3", question:"Jaloliddin qaysi sulolaga mansub?", answers:["Anushteginiylar","Saljuqiylar","Boburiylar","Mongollar"], correct:0, topic:"history", difficulty:"easy"},
  {id:"q4", question:"U qaysi yili tug‘ilgan?", answers:["1199","1205","1185","1210"], correct:0, topic:"history", difficulty:"medium"},
  {id:"q5", question:"Otasining ismi?", answers:["Alovuddin Muhammad II","Jalaluddin","Manguberdi","Temur Malik"], correct:0, topic:"history", difficulty:"easy"},
  {id:"q6", question:"Jaloliddin Xorazmshoh bo‘lib qachon taxtga o‘tirdi?", answers:["1220","1218","1225","1230"], correct:0, topic:"history", difficulty:"hard"},
  {id:"q7", question:"Qaysi jangda mongollarga birinchi yirik mag‘lubiyat berdi?", answers:["Parvon jangi","Ishfahon jangi","Ind daryosi","Qunduz"], correct:0, topic:"military", difficulty:"medium"},
  {id:"q8", question:"Parvon jangi qaysi yilda bo‘lgan?", answers:["1221","1220","1223","1225"], correct:0, topic:"military", difficulty:"hard"},
  {id:"q9", question:"Ind daryosidagi jangda kim bilan jang qilgan?", answers:["Chingizxon","Subutoy","Jebe","O‘gedey"], correct:0, topic:"military", difficulty:"medium"},
  {id:"q10", question:"Ind daryosida necha askar bilan qolgan edi?", answers:["30 ming","10 ming","50 ming","4 ming"], correct:3, topic:"military", difficulty:"hard"},
  {id:"q11", question:"Chingizxon Jaloliddin haqida nima degan?", answers:["'Bunday farzandli ota baxtli'","'O‘limga tayyor'","'Qochoq'","'Ayyor'"], correct:0, topic:"history", difficulty:"medium"},
  {id:"q12", question:"Jaloliddin Hindistonda necha yil yashadi?", answers:["3 yil","2 yil","5 yil","1 yil"], correct:0, topic:"history", difficulty:"easy"},
  {id:"q13", question:"1225 yilda qaysi shaharni egalladi?", answers:["Tabriz","Isfahon","Hamadon","Ray"], correct:0, topic:"military", difficulty:"medium"},
  {id:"q14", question:"Gruziya poytaxti Tbilisi qachon olinadi?", answers:["1226","1225","1227","1228"], correct:0, topic:"military", difficulty:"hard"},
  {id:"q15", question:"Jaloliddin qanday taktika bilan mashhur?", answers:["Yarim oy shakli","To‘g‘ri hujum","Pistirma","Qamal"], correct:0, topic:"military", difficulty:"easy"},
  {id:"q16", question:"Yassi Chemen jangi qaysi yil?", answers:["1230","1229","1231","1228"], correct:0, topic:"military", difficulty:"hard"},
  {id:"q17", question:"Yassi Chemenda kim bilan jang qilgan?", answers:["Kayqubod va Ayyubiylar","Mongollar","Ruslar","Xorazmiylar"], correct:0, topic:"history", difficulty:"medium"},
  {id:"q18", question:"Jaloliddin vafot etgan yil?", answers:["1231","1232","1230","1229"], correct:0, topic:"history", difficulty:"easy"},
  {id:"q19", question:"Qayerda vafot etgan?", answers:["Kurdiston tog‘lari","Bag‘dod","Tabriz","Merv"], correct:0, topic:"geo", difficulty:"medium"},
  {id:"q20", question:"Uning sarkardalaridan biri?", answers:["Temur Malik","Jebe","Chag‘atoy","Batu"], correct:0, topic:"history", difficulty:"easy"},
  {id:"q21", question:"O‘zbekistonda qaysi orden uning nomi bilan ataladi?", answers:["Jaloliddin Manguberdi ordeni","Amir Temur ordeni","Mustaqillik","Do‘stlik"], correct:0, topic:"history", difficulty:"easy"},
  {id:"q22", question:"Qaysi shaharda uning haykali bor?", answers:["Urganch","Xiva","Buxoro","Samarqand"], correct:0, topic:"geo", difficulty:"easy"},
  {id:"q23", question:"U qaysi turkiy qabiladan?", answers:["Begdili","Qang‘li","Qipchoq","Barlos"], correct:0, topic:"history", difficulty:"hard"},
  {id:"q24", question:"Onasining ismi?", answers:["Aychichek","Turkon xotun","O‘ljay","Muhsina"], correct:0, topic:"history", difficulty:"hard"},
  {id:"q25", question:"Jaloliddin necha jangda qatnashgan (taxminan)?", answers:["300 dan ortiq","100","50","200"], correct:0, topic:"military", difficulty:"hard"},
  {id:"q26", question:"Uning harbiy bo‘linmasi nomi?", answers:["Xorazmiylar","Mamluklar","Qorachilar","G‘ulomlar"], correct:0, topic:"military", difficulty:"medium"},
  {id:"q27", question:"Qaysi sulton unga boshpana bermadi?", answers:["Iltutmish","Kayqubod","Malik Kamil","Saladin"], correct:0, topic:"history", difficulty:"hard"},
  {id:"q28", question:"Jaloliddin qanday asarda tilga olinadi?", answers:["Jahongushoy","Boburnoma","Temur tuzuklari","Shohnoma"], correct:0, topic:"history", difficulty:"medium"},
  {id:"q29", question:"Uning ukasi kim edi?", answers:["G‘iyosiddin","Muhammad","O‘zloqshoh","Porso"], correct:2, topic:"history", difficulty:"hard"},
  {id:"q30", question:"Qaysi hukmdor uning dushmani bo‘lgan?", answers:["Bag‘dod xalifi Nosir","Abulfida","Al-Muazzam","Qilich Arslon"], correct:0, topic:"history", difficulty:"hard"},
  {id:"q31", question:"Jaloliddin qaysi yilda Isfahonga hujum qilgan?", answers:["1227","1226","1228","1229"], correct:0, topic:"military", difficulty:"hard"},
  {id:"q32", question:"Uning otasi qayerda vafot etgan?", answers:["Orol dengizi oroli","Xorazm","Tabriz","Nishopur"], correct:0, topic:"geo", difficulty:"hard"},
  {id:"q33", question:"Jaloliddin qaysi yilda G‘aznaga qaytgan?", answers:["1224","1223","1225","1226"], correct:0, topic:"military", difficulty:"hard"},
  {id:"q34", question:"Qaysi jangda 10 ming kishilik qo‘shin bilan 30 ming mongolni yenggan?", answers:["Parvon","Ind","Qunduz","Bomiyon"], correct:0, topic:"military", difficulty:"medium"},
  {id:"q35", question:"Uning xotini kim bo‘lgan?", answers:["To‘g‘on xotun","Gulbadan","Nurjahon","Mahpari"], correct:0, topic:"history", difficulty:"hard"},
  {id:"q36", question:"Jaloliddin yurishlarida qaysi usulni qo‘llagan?", answers:["Tezkor otliq hujum","Uzoq mudofaa","Suv boshi","O‘t qo‘yish"], correct:0, topic:"military", difficulty:"easy"},
  {id:"q37", question:"Uning eng ishonchli sarkardasi?", answers:["Temur Malik","Qutlug‘","Bektursun","O‘qtoy"], correct:0, topic:"history", difficulty:"medium"},
  {id:"q38", question:"Jaloliddin haqidagi film nomi?", answers:["Men Jaloliddin","Sohibqiron","Manguberdi","Jangchi"], correct:0, topic:"history", difficulty:"easy"},
  {id:"q39", question:"U qayerda dafn etilgan?", answers:["Silvan (Turkiya)","Urganch","Tabriz","Shohrisabz"], correct:0, topic:"geo", difficulty:"hard"},
  {id:"q40", question:"Uning davrida Xorazmshohlar davlati qaysi yillarda parchalanib ketdi?", answers:["1220-1231","1215-1225","1225-1240","1200-1220"], correct:0, topic:"history", difficulty:"hard"},
  {id:"q41", question:"'Qilichning farzandi' unvoni kimga berilgan?", answers:["Jaloliddin","Chingizxon","Temur Malik","Kayqubod"], correct:0, topic:"history", difficulty:"medium"},
  {id:"q42", question:"Uning bolalari haqida nima ma'lum?", answers:["O‘g‘li Qutlug‘ va qizi","Yo‘q","Bir o‘g‘il","Ikki qiz"], correct:0, topic:"history", difficulty:"hard"},
  {id:"q43", question:"Jaloliddin qaysi yili Ozarbayjonni bosib olgan?", answers:["1225","1224","1226","1227"], correct:0, topic:"military", difficulty:"hard"},
  {id:"q44", question:"Uning yurishlari haqida kim yozgan?", answers:["Juvayniy","Rashididdin","Ibn Asir","All of them"], correct:0, topic:"history", difficulty:"medium"},
  {id:"q45", question:"Jaloliddin qaysi din vakili?", answers:["Islom","Xristian","Buddizm","Tengrichilik"], correct:0, topic:"history", difficulty:"easy"},
  {id:"q46", question:"Uning sharafiga nechanchi maktablar bor?", answers:["Ko‘plab","10","50","5"], correct:0, topic:"history", difficulty:"easy"},
  {id:"q47", question:"Jaloliddin qanday xislati bilan ajralib turgan?", answers:["Jasur va adolatli","Zolim","Qo‘rqoq","Faqir"], correct:0, topic:"history", difficulty:"easy"},
  {id:"q48", question:"Uning otasining vafoti sababi?", answers:["Zotiljam","Jangda","Qasddan zaharlangan","Muzlash"], correct:0, topic:"history", difficulty:"hard"},
  {id:"q49", question:"Mongollar qaysi taktikani qo‘llagan?", answers:["Yolg‘on chekinish","To‘g‘ri hujum","Sug‘orish","Qamal"], correct:0, topic:"military", difficulty:"medium"},
  {id:"q50", question:"Jaloliddin necha yil yashagan?", answers:["32","40","45","38"], correct:0, topic:"history", difficulty:"easy"},
  {id:"q51", question:"U qaysi yili Dehli sultonligiga bostirib kirgan?", answers:["1224","1225","1226","1223"], correct:0, topic:"military", difficulty:"hard"},
  {id:"q52", question:"Uning hayoti haqida doston yozgan shoir?", answers:["Mavlono","Nizomiy","Firdavsiy","Jomiy"], correct:0, topic:"history", difficulty:"hard"},
  {id:"q53", question:"Jaloliddin davrida qaysi fan rivojlangan?", answers:["Harbiy san'at","Tibbiyot","Astronomiya","Matematika"], correct:0, topic:"science", difficulty:"easy"},
  {id:"q54", question:"Uning o‘limi haqida qanday rivoyat bor?", answers:["Yolg‘iz jangda halok bo‘lgan","Kasallik","Otlangan","Suvga cho‘kkan"], correct:0, topic:"history", difficulty:"medium"},
  {id:"q55", question:"Qaysi shahar Jaloliddin tomonidan qayta mustahkamlangan?", answers:["Urganch","Merv","Nishopur","Balkh"], correct:0, topic:"history", difficulty:"medium"},
  {id:"q56", question:"Uning qilichi haqida afsona?", answers:["Qilichida dog‘ bor","Oltin qilich","Jinni qilich","Uzunligi 2m"], correct:0, topic:"history", difficulty:"hard"},
  {id:"q57", question:"Jaloliddin xotini qanday o‘lgan?", answers:["Hind daryosiga sakrab","Jangda","Qamalda","Kasallikdan"], correct:0, topic:"history", difficulty:"hard"},
  {id:"q58", question:"U qaysi turkiy tilni bilgan?", answers:["Qipchoq","O‘zbek","Uyg‘ur","Turkiy"], correct:3, topic:"history", difficulty:"hard"},
  {id:"q59", question:"Uning otasining ismi Alovuddin Muhammad II nechanchi Xorazmshoh?", answers:["7","5","8","6"], correct:0, topic:"history", difficulty:"hard"},
  {id:"q60", question:"Jaloliddin necha farzand qoldirgan?", answers:["1 o‘g‘il","2 o‘g‘il","3 qiz","Yo‘q"], correct:0, topic:"history", difficulty:"hard"},
  {id:"q61", question:"Uning asosiy dushmani kim edi?", answers:["Chingizxon","Kayqubod","Bag‘dod xalifi","Rus knyazi"], correct:0, topic:"history", difficulty:"easy"},
  {id:"q62", question:"Jaloliddin necha marta yarador bo‘lgan?", answers:["Ko‘p marotaba","Bir","Hech","Uch"], correct:0, topic:"military", difficulty:"hard"},
  {id:"q63", question:"Uning eng katta g‘alabasi qaysi?", answers:["Parvon","Ind","Yassi Chemen","G‘azna"], correct:0, topic:"military", difficulty:"medium"},
  {id:"q64", question:"U qaysi yili o‘z davlatini qayta tikladi?", answers:["1224","1225","1226","1227"], correct:0, topic:"history", difficulty:"hard"},
  {id:"q65", question:"Jaloliddin haqidagi birinchi tarixiy asar muallifi?", answers:["Juvayniy","Rashididdin","Ibn Battuta","Beyhaqi"], correct:0, topic:"history", difficulty:"hard"},
  {id:"q66", question:"Uning qabri topilganmi?", answers:["Yo‘q, noma'lum","Ha, Urganchda","Ha, Turkiyada","Ha, Eronda"], correct:0, topic:"geo", difficulty:"hard"},
  {id:"q67", question:"Jaloliddin qaysi yo‘nalishda ko‘proq jang qilgan?", answers:["G‘arb","Sharq","Janub","Shimol"], correct:0, topic:"military", difficulty:"medium"},
  {id:"q68", question:"U qanday otga mingan?", answers:["Qorabayir","Arab zoti","To‘rt ko‘z","Oq ot"], correct:0, topic:"history", difficulty:"hard"},
  {id:"q69", question:"Uning o‘limidan keyin sarkardalari qayerga ketgan?", answers:["Misr","Hindiston","Rum","Iroq"], correct:0, topic:"history", difficulty:"hard"},
  {id:"q70", question:"Jaloliddin qaysi yili vafot etgan (hijriy)?", answers:["628","630","625","632"], correct:0, topic:"history", difficulty:"hard"},
  {id:"q71", question:"Uning yoshi 33 da vafoti sababi?", answers:["Yolg‘iz jang","Suyanchiq","Qasd","Kasallik"], correct:0, topic:"history", difficulty:"medium"},
  {id:"q72", question:"Uning otasi qanday vafot etgan?", answers:["Orol orolida","Jangda","Zaharlangan","Qatl"], correct:0, topic:"history", difficulty:"hard"},
  {id:"q73", question:"Jaloliddin haqida she'r yozgan shoir?", answers:["A.Navoiy","Fuzuliy","Mashrab","Ogahiy"], correct:0, topic:"history", difficulty:"hard"},
  {id:"q74", question:"U qaysi xalq qahramoni hisoblanadi?", answers:["O‘zbek","Turk","Fors","Afg‘on"], correct:0, topic:"history", difficulty:"easy"},
  {id:"q75", question:"Jaloliddin Manguberdi qachon tug‘ilgan (milodiy)?", answers:["1199","1200","1198","1201"], correct:0, topic:"history", difficulty:"medium"}
];

// ═══════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════
let board        = Array(8).fill(null).map(() => Array(8).fill(null));
let owned        = Array(8).fill(null).map(() => Array(8).fill(0));
let turn         = 1;          // 1 = oq, 2 = qora
let selected     = null;
let possibleMoves= [];
let scores       = [0, 0];
let timers       = [600, 600];
let combo        = [0, 0];
let gameRunning  = false;
let timerInterval= null;
let pendingMove  = null;
let playerNames  = ["Sarkarda", "Botir"];
let difficulty   = "medium";
let questions    = [];
let usedQuestions= new Set();
let currentTheme = "classic";

// ═══════════════════════════════════════════
// BACKGROUND CANVAS (subtle particle field)
// ═══════════════════════════════════════════
(function initBgCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const particles = [];
  const COUNT = 55;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.4 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      a: Math.random() * 0.5 + 0.1
    });
  }

  function getAccentColor() {
    const style = getComputedStyle(document.body);
    return style.getPropertyValue('--accent').trim() || '#c9a84c';
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const accent = getAccentColor();
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = accent;
      ctx.globalAlpha = p.a;
      ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
})();

// ═══════════════════════════════════════════
// BOARD LOGIC
// ═══════════════════════════════════════════
function initCheckersBoard() {
  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 8; j++) { board[i][j] = null; owned[i][j] = 0; }

  // Qora donalar (yuqori)
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 8; j++)
      if ((i + j) % 2 === 1) { board[i][j] = { color: "black", king: false }; owned[i][j] = 2; }

  // Oq donalar (pastki)
  for (let i = 5; i < 8; i++)
    for (let j = 0; j < 8; j++)
      if ((i + j) % 2 === 1) { board[i][j] = { color: "white", king: false }; owned[i][j] = 1; }
}

function getPieceMoves(r, c, piece, captureOnly = false) {
  const moves = [];
  let dirs = piece.color === "white" ? [[-1,-1],[-1,1]] : [[1,-1],[1,1]];
  if (piece.king) dirs = [[-1,-1],[-1,1],[1,-1],[1,1]];

  // Normal moves
  for (const [dr, dc] of dirs) {
    const nr = r + dr, nc = c + dc;
    if (nr < 0 || nr > 7 || nc < 0 || nc > 7) continue;
    if (!board[nr][nc]) {
      if (!captureOnly) moves.push({ r: nr, c: nc, capture: false });
    } else if (board[nr][nc].color !== piece.color) {
      const jr = nr + dr, jc = nc + dc;
      if (jr >= 0 && jr < 8 && jc >= 0 && jc < 8 && !board[jr][jc])
        moves.push({ r: jr, c: jc, capture: true, capR: nr, capC: nc });
    }
  }

  // King long-range moves
  if (piece.king) {
    for (const [dr, dc] of [[-1,-1],[-1,1],[1,-1],[1,1]]) {
      let nr = r + dr, nc = c + dc;
      while (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
        if (board[nr][nc]) {
          if (board[nr][nc].color !== piece.color) {
            const jr = nr + dr, jc = nc + dc;
            if (jr >= 0 && jr < 8 && jc >= 0 && jc < 8 && !board[jr][jc])
              moves.push({ r: jr, c: jc, capture: true, capR: nr, capC: nc });
          }
          break;
        }
        if (!captureOnly) moves.push({ r: nr, c: nc, capture: false });
        nr += dr; nc += dc;
      }
    }
  }
  return moves;
}

function getAllCaptureMoves(color) {
  const caps = [];
  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 8; j++)
      if (board[i][j] && board[i][j].color === color) {
        const m = getPieceMoves(i, j, board[i][j], true);
        caps.push(...m.map(mv => ({ ...mv, from: { r: i, c: j } })));
      }
  return caps;
}

function getAllMovesForPiece(r, c, piece) {
  const caps = getAllCaptureMoves(piece.color);
  if (caps.length > 0) return caps.filter(m => m.from.r === r && m.from.c === c);
  return getPieceMoves(r, c, piece, false);
}

function applyMove(from, to, moveInfo) {
  const piece = board[from.r][from.c];
  if (!piece) return false;
  if (moveInfo.capture) {
    board[moveInfo.capR][moveInfo.capC] = null;
    owned[moveInfo.capR][moveInfo.capC] = 0;
  }
  board[to.r][to.c] = piece;
  board[from.r][from.c] = null;
  owned[to.r][to.c] = turn;
  owned[from.r][from.c] = 0;
  if ((piece.color === "white" && to.r === 0) || (piece.color === "black" && to.r === 7))
    piece.king = true;
  return true;
}

function countTerritory(player) {
  let count = 0;
  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 8; j++)
      if (owned[i][j] === player) count++;
  return count;
}

function countPieces(color) {
  let count = 0;
  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 8; j++)
      if (board[i][j] && board[i][j].color === color) count++;
  return count;
}

// ═══════════════════════════════════════════
// RENDER
// ═══════════════════════════════════════════
function renderBoard() {
  const container = document.getElementById('checkers-board');
  if (!container) return;

  const avail = Math.min(window.innerWidth - 40, window.innerHeight - 180);
  const cellSize = Math.max(38, Math.floor(avail / 8));

  container.style.width = (cellSize * 8) + 'px';
  container.style.gridTemplateColumns = `repeat(8, ${cellSize}px)`;
  container.innerHTML = '';

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const cell = document.createElement('div');
      const isLight = (r + c) % 2 === 0;
      cell.className = `cell ${isLight ? 'light' : 'dark'}`;
      cell.style.width = cell.style.height = cellSize + 'px';

      if (owned[r][c] === 1) cell.classList.add('owned-p1');
      if (owned[r][c] === 2) cell.classList.add('owned-p2');

      if (selected && selected.r === r && selected.c === c)
        cell.classList.add('selected');

      const moveMatch = possibleMoves.find(m => m.r === r && m.c === c);
      if (moveMatch) cell.classList.add(moveMatch.capture ? 'capture-move' : 'possible-move');

      if (board[r][c]) {
        const piece = board[r][c];
        const symbol = piece.king ? '♛' : '●';
        const cls = piece.color === 'white' ? 'white' : 'black';
        cell.innerHTML = `<div class="piece ${cls}${piece.king ? ' king' : ''}">${symbol}</div>`;
      }

      cell.addEventListener('click', () => handleCellClick(r, c));
      container.appendChild(cell);
    }
  }
}

// ═══════════════════════════════════════════
// CLICK HANDLER
// ═══════════════════════════════════════════
async function handleCellClick(r, c) {
  if (!gameRunning) return;
  const piece = board[r][c];
  const currentColor = turn === 1 ? 'white' : 'black';

  if (selected) {
    const move = possibleMoves.find(m => m.r === r && m.c === c);
    if (move) {
      pendingMove = { from: selected, to: { r, c }, move };
      selected = null; possibleMoves = [];
      renderBoard();
      await showQuestion();
      return;
    }
    if (piece && piece.color === currentColor) {
      selected = { r, c };
      possibleMoves = getAllMovesForPiece(r, c, piece);
      renderBoard();
      return;
    }
    selected = null; possibleMoves = [];
    renderBoard();
    return;
  }

  if (piece && piece.color === currentColor) {
    selected = { r, c };
    possibleMoves = getAllMovesForPiece(r, c, piece);
    renderBoard();
  }
}

async function executePendingMove() {
  const { from, to, move } = pendingMove;
  const success = applyMove(from, to, move);
  if (success) {
    // Check win: opponent has no pieces
    const nextColor = turn === 1 ? 'black' : 'white';
    if (countPieces(nextColor) === 0) { endGame('noPieces'); pendingMove = null; return; }

    const capsAfter = getAllCaptureMoves(turn === 1 ? 'white' : 'black');
    if (capsAfter.length > 0 && move.capture && !move.endChain) {
      const nextCaps = capsAfter.filter(m => m.from.r === to.r && m.from.c === to.c);
      if (nextCaps.length > 0) {
        selected = to; possibleMoves = nextCaps;
        renderBoard(); pendingMove = null; return;
      }
    }

    scores[turn - 1] = countTerritory(turn);
    updateUI();
    switchTurn();
    renderBoard();
    setStatus();
  } else {
    switchTurn(); renderBoard();
  }
  pendingMove = null;
}

function switchTurn() {
  turn = turn === 1 ? 2 : 1;
  updateUI();
}

// ═══════════════════════════════════════════
// UI UPDATE
// ═══════════════════════════════════════════
function updateUI() {
  document.getElementById('p1-name-disp').textContent = playerNames[0];
  document.getElementById('p2-name-disp').textContent = playerNames[1];
  document.getElementById('p1-score').textContent = scores[0];
  document.getElementById('p2-score').textContent = scores[1];
  document.getElementById('turn-label').textContent = (turn === 1 ? playerNames[0] : playerNames[1]) + ' yurishi';

  document.getElementById('p1-panel').classList.toggle('active-turn', turn === 1);
  document.getElementById('p2-panel').classList.toggle('active-turn', turn === 2);

  const t1 = document.getElementById('p1-timer');
  const t2 = document.getElementById('p2-timer');
  t1.textContent = formatTime(timers[0]);
  t2.textContent = formatTime(timers[1]);
  t1.classList.toggle('low', timers[0] <= 30);
  t2.classList.toggle('low', timers[1] <= 30);

  // Combo badges
  for (let i = 0; i < 2; i++) {
    const cb = document.getElementById(`p${i+1}-combo`);
    if (combo[i] > 0) { cb.style.display = 'inline'; cb.textContent = `🔥×${combo[i]}`; }
    else cb.style.display = 'none';
  }
}

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec < 10 ? '0' : ''}${sec}`;
}

function setStatus() {
  document.getElementById('status-bar').textContent = playerNames[turn - 1] + ' — harakat qiling';
}

function showToast(msg, type) {
  const t = document.getElementById('toast');
  t.className = 'toast';
  void t.offsetWidth; // reflow
  t.textContent = msg;
  if (type) t.classList.add(type);
  t.classList.add('show');
  clearTimeout(t._tid);
  t._tid = setTimeout(() => t.classList.remove('show'), 2400);
}

// ═══════════════════════════════════════════
// QUESTIONS
// ═══════════════════════════════════════════
function loadQuestions() {
  const stored = localStorage.getItem('intellekt_dueli_questions');
  if (stored) {
    try { questions = JSON.parse(stored); } catch(e) { questions = []; }
  }
  if (!questions || questions.length === 0) questions = DEFAULT_QUESTIONS.slice();
}

function getQuestion() {
  let filtered = questions.filter(q =>
    !usedQuestions.has(q.id) &&
    (difficulty === 'all' || q.difficulty === difficulty)
  );
  if (filtered.length === 0) {
    usedQuestions.clear();
    filtered = questions.filter(q => difficulty === 'all' || q.difficulty === difficulty);
  }
  if (filtered.length === 0) filtered = questions;
  if (filtered.length === 0) return null;
  const q = filtered[Math.floor(Math.random() * filtered.length)];
  usedQuestions.add(q.id);
  return q;
}

async function showQuestion() {
  const q = getQuestion();
  if (!q) { await executePendingMove(); return; }

  document.getElementById('q-player-name').textContent = playerNames[turn - 1] + ' — SAVOL';

  const diffLabels = { easy: 'OSON', medium: "O'RTA", hard: 'QIYIN' };
  document.getElementById('q-difficulty-badge').textContent = diffLabels[q.difficulty] || q.difficulty.toUpperCase();

  document.getElementById('q-text').textContent = q.question;

  // Build answer list
  let answers = [...q.answers];
  let correctIndex = q.correct;

  // Easy mode: show only 2 options
  if (difficulty === 'easy') {
    const wrongs = answers.filter((_, i) => i !== correctIndex);
    const wrongPick = wrongs[Math.floor(Math.random() * wrongs.length)];
    answers = [answers[correctIndex], wrongPick];
    correctIndex = 0;
  }

  // Shuffle
  for (let i = answers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [answers[i], answers[j]] = [answers[j], answers[i]];
  }
  const newCorrect = answers.indexOf(q.answers[q.correct]);

  const answersDiv = document.getElementById('q-answers');
  answersDiv.innerHTML = answers.map((a, i) => `
    <button class="answer-btn" onclick="handleAnswer(${i}, ${newCorrect})">
      <span class="a-letter">${String.fromCharCode(65 + i)}</span>
      <span>${a}</span>
    </button>
  `).join('');

  // Hard mode timer
  const timerBar = document.getElementById('q-timer-bar');
  if (difficulty === 'hard') {
    let t = 15;
    const fill = document.getElementById('q-timer-fill');
    timerBar.style.display = 'block';
    fill.style.width = '100%';
    window.qTimer = setInterval(() => {
      t--;
      fill.style.width = (t / 15 * 100) + '%';
      if (t <= 0) { clearInterval(window.qTimer); handleAnswer(-1, newCorrect); }
    }, 1000);
  } else {
    timerBar.style.display = 'none';
  }

  document.getElementById('question-modal').classList.add('open');
}

function handleAnswer(chosen, correct) {
  if (window.qTimer) { clearInterval(window.qTimer); window.qTimer = null; }
  document.getElementById('q-timer-bar').style.display = 'none';

  const isCorrect = (chosen === correct);
  const btns = document.querySelectorAll('.answer-btn');
  btns.forEach(b => b.disabled = true);

  // Highlight result
  if (chosen >= 0) btns[chosen].classList.add(isCorrect ? 'correct' : 'wrong');
  if (!isCorrect) btns[correct].classList.add('correct');

  if (isCorrect) {
    combo[turn - 1]++;
    if (combo[turn - 1] >= 3) {
      timers[turn - 1] += 30;
      combo[turn - 1] = 0;
      showToast('🔥 KOMBO! +30 soniya', 'success');
    } else {
      showToast("✅ To'g'ri javob!", 'success');
    }
  } else {
    combo[turn - 1] = 0;
    showToast(chosen === -1 ? '⏰ Vaqt tugadi!' : "❌ Noto'g'ri!", 'error');
  }

  updateUI();

  setTimeout(() => {
    document.getElementById('question-modal').classList.remove('open');
    if (isCorrect) executePendingMove();
    else { switchTurn(); renderBoard(); setStatus(); pendingMove = null; }
  }, 950);
}

// ═══════════════════════════════════════════
// GAME FLOW
// ═══════════════════════════════════════════
function startGame() {
  playerNames = [
    document.getElementById('p1-name').value.trim() || 'Sarkarda',
    document.getElementById('p2-name').value.trim() || 'Botir'
  ];
  difficulty = document.getElementById('difficulty').value;
  const timeMin = parseInt(document.getElementById('time-limit').value);

  timers = [timeMin * 60, timeMin * 60];
  scores = [0, 0];
  combo  = [0, 0];
  turn   = 1;
  selected = null; possibleMoves = [];
  usedQuestions.clear();
  gameRunning = true;

  initCheckersBoard();
  loadQuestions();
  updateUI();
  renderBoard();
  setStatus();

  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (!gameRunning) return;
    timers[turn - 1]--;
    if (timers[turn - 1] <= 0) endGame('timeout');
    updateUI();
  }, 1000);

  document.getElementById('setup-screen').classList.remove('active');
  document.getElementById('game-screen').classList.add('active');
}

function endGame(reason) {
  gameRunning = false;
  clearInterval(timerInterval);

  const winner = scores[0] > scores[1] ? 1 : scores[1] > scores[0] ? 2 : 0;
  const reasonText = {
    timeout:  '⏰ Vaqt tugadi',
    noPieces: '♟ Donalar tugadi',
    manual:   '🏳 O\'yin tugatildi'
  }[reason] || '';

  document.getElementById('go-trophy').textContent = winner ? '🏆' : '🤝';
  document.getElementById('go-label').textContent  = winner ? "G'OLIB" : 'DURRANG';
  document.getElementById('go-winner').textContent =
    winner ? playerNames[winner - 1] + " — G'alaba!" : 'Teng natija · ' + reasonText;

  document.getElementById('go-name1').textContent = playerNames[0];
  document.getElementById('go-num1').textContent  = scores[0];
  document.getElementById('go-name2').textContent = playerNames[1];
  document.getElementById('go-num2').textContent  = scores[1];

  document.getElementById('gameover-screen').classList.add('active');
  document.getElementById('game-screen').classList.remove('active');
}

function confirmEndGame() {
  if (confirm("Jangni tugatishga ishonchingiz komilmi?")) endGame('manual');
}

function goToSetup() {
  clearInterval(timerInterval);
  gameRunning = false;
  document.getElementById('gameover-screen').classList.remove('active');
  document.getElementById('setup-screen').classList.add('active');
}

// ═══════════════════════════════════════════
// TEACHER / QUESTION MANAGER
// ═══════════════════════════════════════════
let allLocal = {};

function openTeacher() {
  document.getElementById('teacher-modal').classList.add('open');
  loadTeacherList();
}
function closeTeacher() {
  document.getElementById('teacher-modal').classList.remove('open');
}

function loadTeacherList() {
  const stored = localStorage.getItem('intellekt_dueli_questions');
  allLocal = stored ? JSON.parse(stored) : {};
  if (Object.keys(allLocal).length === 0)
    DEFAULT_QUESTIONS.forEach(q => { allLocal[q.id] = q; });
  renderQuestionList();
}

function renderQuestionList() {
  const listDiv = document.getElementById('questions-list');
  const search = (document.getElementById('search-q')?.value || '').toLowerCase();
  const filtered = Object.values(allLocal).filter(q =>
    q.question.toLowerCase().includes(search)
  );
  if (filtered.length === 0) {
    listDiv.innerHTML = '<p style="color:var(--text3);font-size:.88rem;text-align:center;padding:16px;">Savollar topilmadi</p>';
    return;
  }
  listDiv.innerHTML = filtered.map(q => `
    <div class="q-item">
      <span title="${q.question}">${q.question.substring(0, 65)}${q.question.length > 65 ? '…' : ''}</span>
      <button class="q-delete" onclick="deleteTeacherQuestion('${q.id}')" title="O'chirish">🗑</button>
    </div>
  `).join('');
}

function saveTeacherQuestion() {
  const qtext   = document.getElementById('new-question').value.trim();
  const a1      = document.getElementById('ans1').value.trim();
  const a2      = document.getElementById('ans2').value.trim();
  const a3      = document.getElementById('ans3').value.trim();
  const a4      = document.getElementById('ans4').value.trim();
  const answers = [a1, a2, a3, a4].filter(Boolean);
  const correct = parseInt(document.getElementById('correct-ans').value);

  if (!qtext || answers.length < 2) {
    showToast("⚠ Savol va kamida 2 ta javob kiriting", 'error'); return;
  }

  const id = 'q_' + Date.now();
  allLocal[id] = {
    id, question: qtext, answers, correct,
    topic:      document.getElementById('q-topic').value,
    difficulty: document.getElementById('q-diff').value
  };
  localStorage.setItem('intellekt_dueli_questions', JSON.stringify(allLocal));
  renderQuestionList();
  showToast('✅ Savol saqlandi', 'success');

  // Clear form
  document.getElementById('new-question').value = '';
  ['ans1','ans2','ans3','ans4'].forEach(id => { document.getElementById(id).value = ''; });
}

function deleteTeacherQuestion(id) {
  if (!confirm("Bu savolni o'chirishga ishonchingiz komilmi?")) return;
  delete allLocal[id];
  localStorage.setItem('intellekt_dueli_questions', JSON.stringify(allLocal));
  renderQuestionList();
  showToast("O'chirildi", 'info');
}

function exportQuestions() {
  const data = JSON.stringify(Object.values(allLocal), null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'savollar.json';
  a.click();
}

function importQuestions(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const arr = JSON.parse(e.target.result);
      let count = 0;
      arr.forEach(q => {
        const id = q.id || ('q_' + Date.now() + Math.random());
        allLocal[id] = { ...q, id };
        count++;
      });
      localStorage.setItem('intellekt_dueli_questions', JSON.stringify(allLocal));
      renderQuestionList();
      showToast(`✅ ${count} ta savol import qilindi`, 'success');
    } catch(e) {
      showToast('❌ Fayl o\'qib bo\'lmadi', 'error');
    }
  };
  reader.readAsText(file);
  input.value = '';
}

function switchTab(tab) {
  ['add', 'list', 'ie'].forEach(t => {
    document.getElementById('tab-' + t).style.display = t === tab ? 'block' : 'none';
    const btn = document.getElementById('tbtn-' + t);
    if (btn) btn.classList.toggle('active', t === tab);
  });
  if (tab === 'list') renderQuestionList();
}

// ═══════════════════════════════════════════
// THEMES
// ═══════════════════════════════════════════
document.querySelectorAll('.theme-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const t = btn.dataset.t;
    document.body.setAttribute('data-theme', t === 'classic' ? '' : t);
    currentTheme = t;
    document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ═══════════════════════════════════════════
// RESIZE
// ═══════════════════════════════════════════
window.addEventListener('resize', () => {
  if (gameRunning) renderBoard();
});

// Hide "Back to Hub" button during gameplay, show only on setup screen
const backBtn = document.getElementById('backToHubBtn');
const setupScreen = document.getElementById('setup-screen');
const gameScreen = document.getElementById('game-screen');

function updateBackButtonVisibility() {
  if (backBtn) {
    // Show button only when setup screen is active
    backBtn.style.display = (setupScreen && setupScreen.classList.contains('active')) ? 'inline-flex' : 'none';
  }
}

// Call initially and whenever screens change
if (setupScreen && gameScreen) {
  // Observe class changes on screens (when active class toggles)
  const observer = new MutationObserver(() => updateBackButtonVisibility());
  observer.observe(setupScreen, { attributes: true, attributeFilter: ['class'] });
  observer.observe(gameScreen, { attributes: true, attributeFilter: ['class'] });
  updateBackButtonVisibility();
}

// Also call after any manual screen change (like startGame, resetGame)
// You can simply call updateBackButtonVisibility() inside startGame() and resetGame().
// For example, inside your existing startGame() function, add:
//   updateBackButtonVisibility();
// And inside resetGame() (or when returning to setup), add:
//   updateBackButtonVisibility();