// ===== GLOBAL VARIABLES =====
let currentTheme = 'klassika';
let currentDifficulty = 'medium';
let board = initBoard();
let cellOwner = initCellOwners(); // Initialize cell owners properly
let currentPlayer = 'p1';
let selectedCell = null;
let validMoves = [];
let timerSeconds = 600;
let playerTimers = { p1: 600, p2: 600 };
let activePlayerTimer = 'p1';
let timerInterval = null;
let gameActive = false;
let pendingMove = null;
let playerNames = { p1: "1-o'yinchi", p2: "2-o'yinchi" };
let comboCount = { p1: 0, p2: 0 };
let checkmateBonus = null;
let questionTimer = null;
let questionTimeLeft = 0;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Set up time buttons
    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            if (AudioSystem && AudioSystem.play) AudioSystem.play('click');
        });
    });
    
    // Prevent zoom on double tap
    document.addEventListener('touchstart', (e) => {
        if (e.touches.length > 1) e.preventDefault();
    }, { passive: false });
    
    // Handle orientation change
    window.addEventListener('orientationchange', () => {
        setTimeout(renderBoard, 100);
    });
    
    // Set default theme
    setTheme('klassika', document.querySelector('.theme-dot[data-t="klassika"]'));
    
    // Initialize scores display
    updateScores();
});

// ===== THEME FUNCTIONS =====
function setTheme(t, dotEl) {
    currentTheme = t;
    document.documentElement.setAttribute('data-theme', t);
    document.querySelectorAll('.theme-dot').forEach(d => d.classList.remove('active'));
    if (dotEl) {
        dotEl.classList.add('active');
        if (AudioSystem && AudioSystem.play) AudioSystem.play('click');
    }
}

// ===== DIFFICULTY FUNCTIONS =====
function selectDifficulty(difficulty, btn) {
    currentDifficulty = difficulty;
    document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    if (AudioSystem && AudioSystem.play) AudioSystem.play('click');
}

// ===== SCORE FUNCTIONS =====
function updateScores() {
    const sc = countControlledSquares(board);
    document.getElementById('score-p1').textContent = sc.p1;
    document.getElementById('score-p2').textContent = sc.p2;
    
    // Add animation to scores
    document.getElementById('score-p1').classList.add('score-pop');
    document.getElementById('score-p2').classList.add('score-pop');
    setTimeout(() => {
        document.getElementById('score-p1').classList.remove('score-pop');
        document.getElementById('score-p2').classList.remove('score-pop');
    }, 300);
}

// ===== GAME FUNCTIONS =====
function startGame() {
    // Get player names
    const p1 = document.getElementById('p1-name').value.trim() || "1-o'yinchi";
    const p2 = document.getElementById('p2-name').value.trim() || "2-o'yinchi";
    playerNames = { p1, p2 };
    
    // Get time setting
    const tb = document.querySelector('.time-btn.selected');
    const totalTime = parseInt(tb?.dataset.time || 600);
    timerSeconds = totalTime;
    playerTimers = { p1: totalTime, p2: totalTime };
    activePlayerTimer = 'p1';
    
    // Reset game state
    board = initBoard();
    cellOwner = initCellOwners(); // Initialize cell owners properly
    currentPlayer = 'p1';
    selectedCell = null;
    validMoves = [];
    pendingMove = null;
    comboCount = { p1: 0, p2: 0 };
    checkmateBonus = null;
    usedQuestions = [];
    
    // Update UI
    document.getElementById('name-p1').textContent = p1;
    document.getElementById('name-p2').textContent = p2;
    updateScores();
    document.getElementById('combo-p1').style.display = 'none';
    document.getElementById('combo-p2').style.display = 'none';
    
    gameActive = true;
    showScreen('game-screen');
    renderBoard();
    updateHeader();
    startTimer();
    
    if (AudioSystem && AudioSystem.play) AudioSystem.play('click');
}

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function startTimer() {
    clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        if (!gameActive) return;
        
        // Decrease active player's time
        playerTimers[activePlayerTimer]--;
        timerSeconds = playerTimers[activePlayerTimer];
        
        updateTimerDisplay();
        
        // Check if time ran out
        if (playerTimers[activePlayerTimer] <= 0) {
            clearInterval(timerInterval);
            endGame(activePlayerTimer === 'p1' ? 'p2' : 'p1');
        }
        
        // Play tick sound in last 10 seconds
        if (playerTimers[activePlayerTimer] <= 10 && playerTimers[activePlayerTimer] > 0) {
            if (AudioSystem && AudioSystem.play) AudioSystem.play('tick');
        }
    }, 1000);
}

function updateTimerDisplay() {
    const m = Math.floor(timerSeconds / 60);
    const s = timerSeconds % 60;
    const timerEl = document.getElementById('timer-display');
    
    timerEl.textContent = `${m}:${s.toString().padStart(2, '0')}`;
    
    // Warning colors
    if (timerSeconds <= 10) {
        timerEl.classList.add('warning');
    } else if (timerSeconds <= 30) {
        timerEl.style.color = '#e67e22';
    } else {
        timerEl.classList.remove('warning');
        timerEl.style.color = 'var(--accent)';
    }
}

function updateHeader() {
    updateScores(); // Use the new score function
    
    // Update active panel
    document.getElementById('panel-p1').classList.toggle('active', currentPlayer === 'p1');
    document.getElementById('panel-p2').classList.toggle('active', currentPlayer === 'p2');
    
    // Update turn indicator
    document.getElementById('turn-indicator').textContent = `Navbat: ${playerNames[currentPlayer]}`;
    
    // Update active timer
    activePlayerTimer = currentPlayer;
    timerSeconds = playerTimers[currentPlayer];
    updateTimerDisplay();
    
    // Update combo counters
    if (comboCount.p1 > 0) {
        document.getElementById('combo-p1').style.display = 'flex';
        document.getElementById('combo-p1').textContent = comboCount.p1;
    } else {
        document.getElementById('combo-p1').style.display = 'none';
    }
    
    if (comboCount.p2 > 0) {
        document.getElementById('combo-p2').style.display = 'flex';
        document.getElementById('combo-p2').textContent = comboCount.p2;
    } else {
        document.getElementById('combo-p2').style.display = 'none';
    }
    
    // Check for check/checkmate
    const inCheck = isInCheck(board, currentPlayer);
    const checkmate = isCheckmate(board, currentPlayer);
    
    if (checkmate) {
        document.getElementById('status-bar').textContent = 'Shoh mot!';
        document.getElementById('status-bar').className = 'status-bar checkmate';
    } else if (inCheck) {
        document.getElementById('status-bar').textContent = 'Shoh!';
        document.getElementById('status-bar').className = 'status-bar check';
    } else {
        document.getElementById('status-bar').textContent = 'Yurish uchun figurani tanlang';
        document.getElementById('status-bar').className = 'status-bar';
    }
}

function renderBoard() {
    const el = document.getElementById('chess-board');
    el.innerHTML = '';
    
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            
            // Set cell owner class for background color
            if (cellOwner[r][c] === 'p1') {
                cell.classList.add('p1');
            } else if (cellOwner[r][c] === 'p2') {
                cell.classList.add('p2');
            } else {
                cell.classList.add('neutral');
            }
            
            // Selected cell highlight
            if (selectedCell && selectedCell[0] === r && selectedCell[1] === c) {
                cell.classList.add('selected');
            }
            
            // Valid moves
            if (validMoves.some(([vr, vc]) => vr === r && vc === c)) {
                cell.classList.add(board[r][c] ? 'valid-capture' : 'valid-move');
            }
            
            // Check indicator
            if (isInCheck(board, currentPlayer) && board[r][c] === (currentPlayer === 'p1' ? 'wK' : 'bK')) {
                cell.classList.add('check');
            }
            
            // Add piece image
            const piece = board[r][c];
            if (piece) {
                const img = document.createElement('img');
                img.src = getPieceImage(piece);
                img.alt = piece;
                img.className = 'piece-image';
                img.draggable = false;
                
                // Add fallback in case image doesn't load
                img.onerror = function() {
                    this.style.display = 'none';
                    const span = document.createElement('span');
                    span.className = 'piece-fallback';
                    span.textContent = PIECES[piece] || '?';
                    this.parentNode.appendChild(span);
                };
                
                cell.appendChild(img);
            }
            
            cell.addEventListener('click', () => onCellClick(r, c));
            el.appendChild(cell);
        }
    }
}

function onCellClick(r, c) {
    if (!gameActive) return;
    
    const piece = board[r][c];
    const isMine = piece && ((currentPlayer === 'p1' && piece[0] === 'w') || (currentPlayer === 'p2' && piece[0] === 'b'));
    
    // If a piece is selected and clicked on a valid move
    if (selectedCell && validMoves.some(([vr, vc]) => vr === r && vc === c)) {
        initiateMove(selectedCell[0], selectedCell[1], r, c);
        return;
    }
    
    // Select own piece
    if (isMine) {
        selectedCell = [r, c];
        validMoves = getLegalMoves(r, c, board);
        
        // Check if any move is legal (considering check)
        validMoves = validMoves.filter(([toR, toC]) => {
            const testBoard = makeMove(board, r, c, toR, toC);
            return !isInCheck(testBoard, currentPlayer);
        });
        
        setStatus(`${piece} tanlandi — ${validMoves.length} ta yurish mumkin`);
        if (AudioSystem && AudioSystem.play) AudioSystem.play('click');
    } else {
        selectedCell = null;
        validMoves = [];
        setStatus("O'z figurangizni tanlang");
        if (AudioSystem && AudioSystem.play) AudioSystem.play('click');
    }
    
    renderBoard();
}

function setStatus(m) {
    document.getElementById('status-bar').textContent = m;
}

function initiateMove(fr, fc, tr, tc) {
    // Check if move is legal (considering check)
    const testBoard = makeMove(board, fr, fc, tr, tc);
    if (isInCheck(testBoard, currentPlayer)) {
        setStatus("Bu yurish shoh qoldiradi!");
        selectedCell = null;
        validMoves = [];
        renderBoard();
        return;
    }
    
    pendingMove = { fr, fc, tr, tc };
    
    // Get question based on difficulty
    let question;
    if (currentDifficulty === 'easy') {
        // Easy: 2 options, no timer
        question = getRandomQuestion('easy');
        if (question && question.options.length > 2) {
            question.options = question.options.slice(0, 2);
        }
    } else if (currentDifficulty === 'hard') {
        // Hard: 4 options + timer
        question = getRandomQuestion('hard');
        questionTimeLeft = 15; // 15 seconds to answer
    } else {
        // Medium: 4 options, no timer
        question = getRandomQuestion('medium');
    }
    
    showModal(question);
}

function showModal(q) {
    if (!q) {
        // Fallback if no question available
        q = {
            q: "Qadimgi janglarda qanday qurol ishlatilgan?",
            options: ["Kamon", "Qilich", "Nayza", "Gurzi"],
            correct: 0
        };
    }
    
    document.getElementById('modal-question').textContent = q.q;
    document.getElementById('modal-question').classList.add('question-fade-in');
    
    // Setup timer for hard mode
    if (currentDifficulty === 'hard' && questionTimeLeft > 0) {
        document.getElementById('question-timer').style.display = 'block';
        document.getElementById('question-timer').textContent = `⏱ ${questionTimeLeft}s`;
        
        if (questionTimer) clearInterval(questionTimer);
        questionTimer = setInterval(() => {
            questionTimeLeft--;
            document.getElementById('question-timer').textContent = `⏱ ${questionTimeLeft}s`;
            
            if (questionTimeLeft <= 0) {
                clearInterval(questionTimer);
                // Auto-wrong answer
                checkAnswer(false, null, null, q.correct);
            }
        }, 1000);
    } else {
        document.getElementById('question-timer').style.display = 'none';
    }
    
    // Setup answer options
    const opts = document.getElementById('answer-options');
    opts.innerHTML = '';
    
    // Shuffle options
    const shuffled = q.options.map((text, idx) => ({ text, idx }))
        .sort(() => Math.random() - 0.5);
    
    shuffled.forEach(({ text, idx }) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = text;
        btn.addEventListener('click', () => checkAnswer(idx === q.correct, btn, shuffled, q.correct));
        opts.appendChild(btn);
    });
    
    document.getElementById('modal-result').className = 'modal-result';
    document.getElementById('modal-result').textContent = '';
    document.getElementById('modal-continue').style.display = 'none';
    document.getElementById('modal').classList.add('active');
}

function checkAnswer(isCorrect, clickedBtn, shuffled, correctIdx) {
    // Clear question timer
    if (questionTimer) {
        clearInterval(questionTimer);
        questionTimer = null;
    }
    
    // Disable all buttons
    document.querySelectorAll('.answer-btn').forEach(b => b.disabled = true);
    
    // Show correct answer
    document.querySelectorAll('.answer-btn').forEach((b, i) => {
        if (shuffled && shuffled[i] && shuffled[i].idx === correctIdx) {
            b.classList.add('correct');
        }
    });
    
    if (!isCorrect && clickedBtn) {
        clickedBtn.classList.add('wrong');
    }
    
    const result = document.getElementById('modal-result');
    
    if (isCorrect) {
        result.className = 'modal-result success';
        result.textContent = "✓ To'g'ri! Yurish amalga oshiriladi.";
        if (AudioSystem && AudioSystem.play) AudioSystem.play('correct');
        
        // Increase combo
        comboCount[currentPlayer]++;
        if (comboCount[currentPlayer] >= 3) {
            // Combo bonus: +30 seconds
            playerTimers[currentPlayer] += 30;
            result.textContent += " +30 sekund (3 to'g'ri)";
            comboCount[currentPlayer] = 0;
        }
    } else {
        result.className = 'modal-result fail';
        result.textContent = "✗ Noto'g'ri. Navbat raqibga o'tadi.";
        if (AudioSystem && AudioSystem.play) AudioSystem.play('wrong');
        
        // Reset combo
        comboCount[currentPlayer] = 0;
    }
    
    document.getElementById('modal-continue').dataset.correct = isCorrect ? '1' : '0';
    document.getElementById('modal-continue').style.display = 'block';
}

function continueAfterAnswer() {
    const ok = document.getElementById('modal-continue').dataset.correct === '1';
    document.getElementById('modal').classList.remove('active');
    
    if (ok && pendingMove) {
        const { fr, fc, tr, tc } = pendingMove;
        
        // Check if capture
        const isCapture = board[tr][tc] !== null;
        
        // Make move
        board = makeMove(board, fr, fc, tr, tc);
        
        // Update cell owner - the moving player conquers the destination square
        cellOwner[tr][tc] = currentPlayer;
        
        // If the piece moved from its original square, that square becomes neutral
        // unless it's still occupied (which it isn't after move)
        cellOwner[fr][fc] = null;
        
        // Update scores immediately
        updateScores();
        
        // Play sound
        if (isCapture) {
            if (AudioSystem && AudioSystem.play) AudioSystem.play('capture');
        } else {
            if (AudioSystem && AudioSystem.play) AudioSystem.play('move');
        }
        
        // Add capture animation
        const cells = document.querySelectorAll('.cell');
        const targetCell = cells[tr * 8 + tc];
        targetCell.classList.add('capture-animation');
        setTimeout(() => targetCell.classList.remove('capture-animation'), 500);
        
        setStatus(`Yurish muvaffaqiyatli! ${playerNames[currentPlayer]} katakchani egalladi.`);
    } else {
        setStatus(`Noto'g'ri javob. Navbat ${currentPlayer === 'p1' ? playerNames.p2 : playerNames.p1} ga o'tadi.`);
    }
    
    // Check for checkmate
    const opponent = currentPlayer === 'p1' ? 'p2' : 'p1';
    if (isCheckmate(board, opponent)) {
        checkmateBonus = currentPlayer;
        endGame(currentPlayer);
        return;
    }
    
    // Switch player
    currentPlayer = currentPlayer === 'p1' ? 'p2' : 'p1';
    selectedCell = null;
    validMoves = [];
    pendingMove = null;
    
    renderBoard();
    updateHeader();
}

function endGame(winner) {
    gameActive = false;
    clearInterval(timerInterval);
    if (questionTimer) clearInterval(questionTimer);
    
    const scores = countControlledSquares(board);
    let finalScores = { ...scores };
    
    // Add checkmate bonus
    if (checkmateBonus) {
        if (checkmateBonus === 'p1') {
            finalScores.p1 += 5;
        } else {
            finalScores.p2 += 5;
        }
        document.getElementById('checkmate-bonus').style.display = 'block';
    } else {
        document.getElementById('checkmate-bonus').style.display = 'none';
    }
    
    // Determine winner
    let winnerText = '';
    let subtitleText = '';
    
    if (winner === 'p1' || winner === 'p2') {
        winnerText = playerNames[winner];
        
        if (checkmateBonus === winner) {
            subtitleText = `Shoh mot! +5 bonus — ${finalScores[winner]} katakcha`;
        } else if (playerTimers[winner === 'p1' ? 'p2' : 'p1'] <= 0) {
            subtitleText = "Raqib vaqti tugadi — g'alaba!";
        } else {
            subtitleText = `${finalScores[winner]} katakcha — hudud nazorati`;
        }
    } else {
        if (finalScores.p1 > finalScores.p2) {
            winnerText = playerNames.p1;
            subtitleText = `${finalScores.p1} katakcha — g'alaba!`;
        } else if (finalScores.p2 > finalScores.p1) {
            winnerText = playerNames.p2;
            subtitleText = `${finalScores.p2} katakcha — g'alaba!`;
        } else {
            winnerText = 'Durrang!';
            subtitleText = 'Bilim va strategiyada tenglik';
        }
    }
    
    // Update end screen
    document.getElementById('end-name-p1').textContent = playerNames.p1;
    document.getElementById('end-name-p2').textContent = playerNames.p2;
    document.getElementById('end-num-p1').textContent = finalScores.p1;
    document.getElementById('end-num-p2').textContent = finalScores.p2;
    document.getElementById('end-winner').textContent = winnerText;
    document.getElementById('end-subtitle').textContent = subtitleText;
    
    // Play checkmate sound if applicable
    if (checkmateBonus && AudioSystem && AudioSystem.play) {
        AudioSystem.play('checkmate');
    }
    
    setTimeout(() => showScreen('end-screen'), 500);
}

function endGameEarly() {
    if (confirm('Jangni tugatishni xohlaysizmi?')) {
        endGame(null);
        if (AudioSystem && AudioSystem.play) AudioSystem.play('click');
    }
}

function resetGame() {
    clearInterval(timerInterval);
    if (questionTimer) clearInterval(questionTimer);
    gameActive = false;
    showScreen('setup-screen');
    if (AudioSystem && AudioSystem.play) AudioSystem.play('click');
}